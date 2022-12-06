const config = require('config')
const jwt = require('jsonwebtoken')

const {Router} = require('express')
const router = Router()


let users = [{id:"1", login:'sashamax', password:'123456'}]


// /api/auth/register
router.post(
    '/register', 
    async (req, res) => {
    try {
        
        const {login, password} = req.body

        if (String(login).length < 4 || String(login).length > 8) {
            return res.status(400).json({ message: "Некорректные данные при регистрации" })
        }

        if (String(password).length < 4 || String(password).length > 8) {
            return res.status(400).json({ message: "Некорректные данные при регистрации" })
        } else {
            users.forEach((el) => {
                if (String(el.login) === String(login)) {
                    return res.status(400).json({ message: "Пользователь с таким логином уже зарегистрирован" })
                }
            })

            users.push({id:String(new Date()), login:login, password:password})
            return res.status(201).json({message: "Пользователь создан!"})
        }
    }
    catch (e) {
        res.status(500).json({message: "что-то пошло не так, попробуйте снова"})
    }
})

// /api/auth/login
router.post(
    '/login',
    async (req, res) => {
    try {
        const {login, password} = req.body
        let idUser = null
        users.forEach((user) => {
            if (String(user.login)===String(login) && String(user.password) === String(password) ) {
                idUser = user.id
            }
        })
        if (idUser) {
            const token = jwt.sign(
                { userId: idUser },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )
            return res.json({ token, userId: idUser })
        }
        else {
            return res.status(400).json({ message: "Неверные данные, попробуйте снова" })
        }
        
    }
    catch (e) {
        res.status(500).json({message: "что-то пошло не так, попробуйте снова"})
    }
})


module.exports = router