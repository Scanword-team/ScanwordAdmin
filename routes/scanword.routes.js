const {Router} = require('express')
const router = Router()

const scanwords = []

const dictionaries = [
    {
        id: 1,
        name: "Машины"
    }, 
    {
        id:2,
        name: "Фрукты"
    }
]


let words = [
    {  
        id: 1,
        answer: 'рэпер',
        question: 'Кто сочиняет РЭП',
        idDict: 1
    },

    {  
        id: 2,
        answer: 'река',
        question: 'Что такое Волга',
        srcAudio: "/audio/barbariki.mp3",
        idDict: 1
    },

    {
        id:3,
        answer: 'лада',
        question: 'Какая марка машины которая представлена на данной картинке',
        src: 'https://www.sostav.ru/images/news/2021/09/16/6xw0iddk.png',
        idDict: 1
    },

    {
        id:4,
        answer: 'Лада',
        question: 'Какая марка машины?',
        src: 'https://www.sostav.ru/images/news/2021/09/16/6xw0iddk.png',
        idDict: 2
    }
].map((element => {
    return {...element, answer: element.answer.toLowerCase()}
}))

// /api/scanword/namedicts
router.get(
    '/namedicts',
    async (req, res) => {
    try {
        res.status(200).json({dictionaries: dictionaries})
    }
    catch (e) {
        res.status(500).json({message: "что-то пошло не так, попробуйте снова"})
    }
})

// /api/scanword/wordsdb
router.post(
    '/wordsdb',
    async (req, res) => {
    try {
        const {idDict, idsWords} = req.body
        if (!idsWords) {
            res.status(200).json({words: words.filter((word) => {
                if (word.idDict === Number(idDict)) {
                    return word
                }
            })})
        } else {
            res.status(200).json({words: words.filter((word) => {
                if (word.idDict === Number(idDict)) {
                    return word
                }
                if (idsWords.filter((el) => {
                    if(Number(el) === word.id) {
                        return el
                    }
                }).length !== 0) {
                    return word
                }
            })})
        }
    }
    catch (e) {
        res.status(500).json({message: "что-то пошло не так, попробуйте снова"})
    }
})

// /api/scanword/worddb
router.post(
    '/worddb',
    async (req, res) => {
    try {
        const {idsWords} = req.body
        res.status(200).json({words: words.filter((word) => {
            idsWords.forEach(element => {
                if (Number(element) === word.id) {
                    return word
                }
            })
        })})
    }
    catch (e) {
        res.status(500).json({message: "что-то пошло не так, попробуйте снова"})
    }
})


// /api/scanword/saving
router.post(
    '/saving',
    async (req, res) => {
    try {
        const {scanword, size, hint} = await req.body
        scanwords.push({questions: scanword, size, hint, id: new Date()}) 
        // size[0] = horiszontalvalue, size[1] = verticalvalue 
        // questions = [ {questionId: '2', dict: 1, direction: 0, x: 6, y: 6}, ...]
        res.status(201).json({message: "Успешно"})
    }
    catch (e) {
        res.status(500).json({message: "что-то пошло не так при сохранении сканворда, попробуйте снова"})
    }
})

// /api/scanword/saving
router.put(
    '/saving',
    async (req, res) => {
    try {
        const {scanword, size, hint} = await req.body
        scanwords.push({questions: scanword, size, hint, id: new Date()}) 
        // size[0] = horiszontalvalue, size[1] = verticalvalue 
        // questions = [ {questionId: '2', dict: 1, direction: 0, x: 6, y: 6}, ...]
        res.status(201).json({message: "Успешно"})
    }
    catch (e) {
        res.status(500).json({message: "что-то пошло не так при сохранении сканворда, попробуйте снова"})
    }
})


// /api/scanword/getscanwords
router.get(
    '/getscanwords',
    async (req, res) => {
    try {
        res.status(200).json({scanwords})
    }
    catch (e) {
        res.status(500).json({message: "что-то пошло не так при сохранении сканворда, попробуйте снова"})
    }
})

// /api/scanword/insertindict
router.post(
    '/insertindict',
    async (req, res) => {
    try {
        const {insertWords} = await req.body
        insertWords.forEach((elem) => {
            const newWord = {}
            newWord.id = elem.id
            newWord.answer = elem.answer
            newWord.question = elem.question
            newWord.idDict = elem.idDict
            if (elem.src) {
                newWord.src = elem.src
            }
            if (elem.srcAudio) {
                newWord.srcAudio = elem.srcAudio
            }
            words.push(newWord)
        })
        res.status(201).json({message: "Успешно"})
    }
    catch (e) {
        res.status(500).json({message: "что-то пошло не так при добавлении заданий в словарь, попробуйте снова"})
    }
})

// /api/scanword/updateindict
router.put(
    '/updateindict',
    async (req, res) => {
    try {
        const {updateWords} = await req.body
        updateWords.forEach((elem) => {
            words.filter((el) => {
                if (el.id === elem.id) {
                    el.answer = elem.answer
                    el.question = elem.question
                    if (elem.src) {
                        el.src = elem.src
                    }
                    if (elem.srcAudio) {
                        el.srcAudio = elem.srcAudio
                    }
                }
                return el
            })
        })
        res.status(201).json({message: "Успешно"})
    }
    catch (e) {
        res.status(500).json({message: "что-то пошло не так при обновлении заданий в словарь, попробуйте снова"})
    }
})

// /api/scanword/deleteindict
router.delete(
    '/deleteindict',
    async (req, res) => {
    try {
        const {deleteWords} = await req.body
        words = words.filter((elem) => {
            if (!deleteWords.find((el) => {
                if (el.id === elem.id) {
                    return el
                } 
            })) {
                return elem
            }
        })
        res.status(201).json({message: "Успешно"})
    }
    catch (e) {
        res.status(500).json({message: "что-то пошло не так при удалении заданий из словаря, попробуйте снова"})
    }
})

// /api/scanword/createdict
router.post(
    '/createdict',
    async (req, res) => {
    try {
        const {nameDict} = await req.body
        const newId = dictionaries[dictionaries.length-1].id + 1
        dictionaries.push({id: newId, name: nameDict})
        res.status(201).json({newId: newId})
    }
    catch (e) {
        res.status(500).json({message: "что-то пошло не так при создании нового словаря, попробуйте снова"})
    }
})










module.exports = router