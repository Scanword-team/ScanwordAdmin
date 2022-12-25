import { useContext, useEffect, useState } from "react"
import { CommonHeader } from "../components/CommonHeader/CommonHeader"
import { HeaderAdmin } from "../components/HeaderAdmin/HeaderAdmin"
import { SettingContext } from "../context/SettingContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { useAuth } from "../hooks/auth.hook"



export const DictionaryPage = () => {
    const message = useMessage()
    const {request} = useHttp()
    const {token} = useAuth()

    const [nameDict, setNameDict] = useState('')
    const [externalDict, setExternalDict] = useState(null)
    const [lockButtonCreate, setLockButtonCreate] = useState(true)
    const [lockButtonConfirm, setLockButtonConfirm] = useState(true)
    const [pressButton, setPressButton] = useState(false)
    const [search, setSearch] = useState('')
    const [localDict, setLocalDict] = useState(0) // id словаря
    const [localListWords, setLocalListWords] = useState(null) // Слова, которые отображаются пользователю (смысловой нагрузки нет)
    const [clickedItem, setClickedItem] = useState(false)
    const [srcSource, setSrcSource] = useState(false)


    const [modalAnswer, setModalAnswer] = useState('')
    const [modalQuestion, setModalQuestion] = useState('')
    const [radioBtnAudio, setRadioBtnAudio] = useState(false)
    const [radioBtnImage, setRadioBtnImage] = useState(true)
    const [modalSrc, setModalSrc] = useState('')
    const [modalId, setModalId] = useState(null)
    const [modalSrcAudio, setModalSrcAudio] = useState('')

    const [stopList, setStopList] = useState([])



    const {
        updateListDicts, 
        listdicts,
        getWordDBFromDB,
        gallery,
        getGalleryFromDB,
        audio, 
        dict,
        getAudioFromDB,
        wordDB, // слова, которые пришли с БД
        listwords, // слова, которые будут вообще
        updateListwords,
        updateWordDB
    } = useContext(SettingContext)

    const ftchStopList = async(iddict) => {
        try {
            const res = await request('/api/question/getUsedByDictId/'+ iddict, "GET", null,{"Authorization": token})
            setStopList([...res])
        } catch (e) {}
    }

    useEffect(() => {
        updateListDicts() // Получаем список в select
        updateListwords(null)
        updateWordDB(null)
        setPressButton(false)
        setNameDict('')
        setLockButtonCreate(true)
        setLockButtonConfirm(true)
    }, [])

    useEffect(() => {
        if (nameDict.split(' ').join('').length !==0) {
            setLockButtonCreate(false)
        }
        else {
            setLockButtonCreate(true)
        }
    }, [nameDict])

    useEffect(() => {
        if (wordDB) {
            setLocalListWords([...wordDB])
        }
    }, [wordDB])

    useEffect(() => {
        if (listwords) {
            let x = 0
            let resReg = ''
            while (x<search.length) {
                if (search[x] === '?') {
                    if (x===0) {
                        resReg += '^[а-яА-Я]{1}$'
                    } else if (x===search.length-1){
                        resReg += '[а-яА-Я]{1}$'
                    } else {
                        resReg += '[а-яА-Я]{1}$'
                    }
                } else if (search[x] === "*") {
                    resReg += '.+'
                } else {
                    if (x===0) {
                        resReg += `^[${search[x]}]{1}`
                    } else {
                        resReg += `[${search[x]}]{1}`
                    }
                    
                }
                x++
            }
            if (resReg[resReg.length-1] === "$") {
                resReg = resReg.split("$").join("")
                resReg += "$"
            } else { // можно будет убрать
                resReg = resReg.split("$").join("")
            }
            const reg = new RegExp(resReg)
            console.log(resReg)
            setLocalListWords(listwords.filter((elem) => {
                if (reg.test(elem.answer.toLowerCase())) {
                    return elem
                }
            }))
        }

    }, [search])

    const dictHandler = (event) => {
        if (Number(event.target.value)===0) {
            setLockButtonConfirm(true)
            console.log("Пупа")
            setLocalDict("")
        } else {
            setLockButtonConfirm(false)
            console.log("Лупа", event.target.value , event.target)
            setLocalDict(event.target.value)
        }
    }

    const createNewDict = async() => {
        const vedro = []
        if (externalDict) {
            new Promise((resolve,revoke) => {
                let reader = new FileReader()
                reader.readAsText(externalDict, "UTF-8")
                reader.onload = () => {
                    if ((String(reader.result.toLowerCase())).indexOf('img')!= -1 || (String(reader.result.toLowerCase())).indexOf('png')!= -1) {
                        revoke()
                    } else {
                        const descr = reader.result.split("\n")
                        descr.forEach((oneDescr) => {
                            const newWord = {}
                            newWord.answer = oneDescr.slice(0,oneDescr.indexOf(" ")).toLowerCase()
                            newWord.question = oneDescr.slice(oneDescr.indexOf(" ")+1, oneDescr.length-1)
                            newWord.id = new Date() + String(newWord.answer) + String(newWord.question)
                            newWord.src=""
                            if(newWord.answer && newWord.question) {
                                vedro.push(newWord)
                            }
                        })
                        resolve()
                    }
                    
                }
            })
            .then(() => {
                updateListwords([...vedro])
                setLocalListWords([...vedro])
            })
            .catch(() => {
                alert('Некорректное содержимое словаря, поэтому он не был загружен')
            })
        }
        const res = await request('/api/dict/create', 'POST', {name:nameDict}, {"Authorization": token})
        setLocalDict(res.id)
        ftchStopList(res.id)
        setPressButton(true)
    }

    const clickConfirmButton = (e) => {
        const elemDict = listdicts.find((elem) => {
            if(Number(elem.id) === Number(localDict)) {
                return elem
            }
        })
        setNameDict(elemDict.name)
        getWordDBFromDB(localDict)
        console.log(localDict)
        ftchStopList(localDict)
        setPressButton(true)
    }

    const clickDeleteItem = (elem) => {
        const stopElement = stopList.find((el) => {
            if (el.id === elem.id) {
                return el
            }
        })
        if (!stopElement) {
            alert('Это слово содержится в сканвордах, его нельзя удалить или изменить')
        } else {
            updateListwords(listwords.filter((element) => {
                if (elem.id !== element.id) {
                    return element
                }
            }))
            setLocalListWords(listwords.filter((element) => {
                if (elem.id !== element.id) {
                    return element
                }
            }))
        }
    }

    const clickSortAlphabetUp = () => {
        setLocalListWords(prev => {
            let newList = [...prev]
            return newList.sort((a, b) => {
                let answerA = a.answer.toLowerCase()
                let answerB = b.answer.toLowerCase()
                if (answerA < answerB) {
                    return -1
                }
                if (answerA > answerB) {
                    return 1
                }
                return 0
            })
        })
    }

    const clickSortAlphabetDown = () => {
        setLocalListWords(prev => {
            let newList = [...prev]
            return newList.sort((a, b) => {
                let answerA = a.answer.toLowerCase()
                let answerB = b.answer.toLowerCase()
                if (answerA > answerB) {
                    return -1
                }
                if (answerA < answerB) {
                    return 1
                }
                return 0
            })
        })
    }

    const clickSortLengthUp = () => {
        setLocalListWords(prev => {
            let newList = [...prev]
            return newList.sort((a, b) => {
                let answerA = a.answer.toLowerCase()
                let answerB = b.answer.toLowerCase()
                if (answerA.length < answerB.length) {
                    return -1
                }
                if (answerA.length > answerB.length) {
                    return 1
                }
                return 0
            })
        })
    }

    const clickSortLengthDown = () => {
        setLocalListWords(prev => {
            let newList = [...prev]
            return newList.sort((a, b) => {
                let answerA = a.answer.toLowerCase()
                let answerB = b.answer.toLowerCase()
                if (answerA.length > answerB.length) {
                    return -1
                }
                if (answerA.length < answerB.length) {
                    return 1
                }
                return 0
            })
        })
    }

    const clickItem = (elem_v=null) => {
        const stopElement = stopList.find((el) => {
            if (el.id === elem_v.id) {
                return el
            }
        })
        if (!stopElement) {
            alert('Это слово содержится в сканвордах, его нельзя удалить или изменить')
        } else {
            if (elem_v) {
                const elem = {...elem_v}
                setModalAnswer(elem.answer)
                setModalQuestion(elem.question)
                if (elem.audio) {
                    setModalSrcAudio(elem.audio)
                }
                if (elem.image) {
                    setModalSrc(elem.image)
                }
                if (elem.id) {
                    setModalId(elem.id)
                }
            } else {
                setModalAnswer("")
            }
            setClickedItem(true)
        }
    }

    const clickCancelCreateItem = () => {
        setModalAnswer('')
        setModalQuestion('')
        setRadioBtnImage(true)
        setRadioBtnAudio(false)
        setModalSrc('')
        setModalSrcAudio('')
        setModalId(null)
        setClickedItem(false)
    }

    const clickSaveCreateItem = () => {
        
        if (modalAnswer && modalQuestion) {
            if (listwords.find((el) => {
                if ((el.answer).toLowerCase() === modalAnswer.toLowerCase()) {
                    if (modalId && modalId!==el.id) {
                        return el
                    }
                    if (!modalId) {
                        return el
                    }
                }
            })) {
                message('Такое слово уже есть в словаре')
            } else {
                if (modalId) {
                    const ved = listwords.map((elem) => {
                        if (elem.id === modalId) {
                            const newElem = {}
                            newElem.id = modalId
                            newElem.answer = modalAnswer
                            newElem.question = modalQuestion                            
                            if (modalSrc) {
                                newElem.imageId = modalSrc.id
                                newElem.audioId = null
                                newElem.type = 'image'
                                newElem.image = modalSrc
                            } else if (modalSrcAudio) {
                                newElem.audioId = modalSrcAudio.id
                                newElem.imageId = null
                                newElem.type = 'audio'
                                newElem.audio = modalSrcAudio
                            } else {
                                newElem.imageId = null
                                newElem.audioId = null
                                newElem.type = 'text'
                            }
                            if (!newElem.dictionaryId) {
                                // if (Number(localDict)!==0) {
                                    newElem.dictionaryId = Number(localDict)
                                    //newElem.dictionary.name = nameDict
                                // }
                            } 

                            console.log(newElem)
                            return newElem
                            // elem.answer = modalAnswer
                            // elem.question = modalQuestion
                            // if (modalSrc) {
                            //     elem.src = modalSrc
                            //     elem.srcAudio = ''
                            // } else {
                            //     elem.src = ''
                            // }
                            // if (modalSrcAudio) {
                            //     elem.srcAudio = modalSrcAudio
                            //     elem.src = ''
                            // } else {
                            //     elem.srcAudio = ''
                            // }
                        }
                        // if (elem.src === '') {
                        //     delete elem.src
                        // }
                        // if (elem.srcAudio === '') {
                        //     delete elem.srcAudio
                        // }
                        // if (!elem.idDict) {
                        //     if (Number(localDict)!==0) {
                        //         elem.idDict = Number(localDict)
                        //     }
                        // } 
                        return elem
                    })
                    updateListwords([...ved])
                    setLocalListWords([...ved]) // NUUUUUUUUUUUUUUUUUUUUUUULLLLLLLLLLLLLLLLLLLL
                } else {
                    const elem = {}
                    elem.answer = modalAnswer
                    elem.question = modalQuestion
                    elem.type = 'text'
                    if (modalSrc) {
                        elem.imageId = modalSrc.id
                        elem.type = 'image'
                    } else if (modalSrcAudio) {
                        elem.audioId = modalSrcAudio.id
                        elem.type = 'audio'
                    }
                    elem.id = new Date() + String(elem.answer) + String(elem.question)
                    
                    if (!elem.dictionaryId) {
                        // if (Number(localDict)!==0) {
                            elem.dictionaryId = Number(localDict)
                        // }
                    } 
                    if (listwords) {
                        updateListwords([...listwords, elem])
                        setLocalListWords([...localListWords, elem]) // NUUUUUUUUUUUUUUUUUUUUUUULLLLLLLLLLLLLLLLLLLL
                    } else {
                        updateListwords([elem])
                        setLocalListWords([elem]) // NUUUUUUUUUUUUUUUUUUUUUUULLLLLLLLLLLLLLLLLLLL
                    }
                }
                
                
                clickCancelCreateItem()
            }
        } else {
            message('Заполните поля \"Определение\" и \"Описание\"')
        }
    }

    const onImage = () => {
        setRadioBtnAudio(false)
        setRadioBtnImage(true)
    }

    const onAudio = () => {
        setRadioBtnAudio(true)
        setRadioBtnImage(false)
    }

    const clickOpen = () => {
        if (radioBtnImage) {
            getGalleryFromDB()
        } else {
            getAudioFromDB()
        }
        setSrcSource(true)
    }

    const cancelModalBgDarker = () => {
        setSrcSource(false)
    }

    const clickItemInList = (src) => {
        setSrcSource(false)
        if (radioBtnImage) {
            setModalSrc(src)
            setModalSrcAudio('')
        } else {
            setModalSrcAudio(src)
            setModalSrc('')
        }
    }

    const saveDict = async() => {
        
        const updateWords = []
        const insertWords = []
        const deleteWords = []
        if (listwords && listwords.length !==0) {
            listwords.forEach((elem) => {
                if (wordDB) {
                    const elWordDB = wordDB.find((el) => {
                        if (elem.id === el.id) {
                            return {...el}
                        } 
                    })
                    if (elWordDB) { // Если нашлось слово с таким id в массиве слов из БД
                        if ((elem.imageId && elWordDB.imageId && elem.imageId !== elWordDB.imageId) || (elem.audioId && elWordDB.audioId && elem.audioId !== elWordDB.audioId) || (elem.imageId && !elWordDB.imageId) || (elem.audioId && !elWordDB.audioId) || (!elem.imageId && elWordDB.imageId) || (!elem.audioId && elWordDB.audioId) || (elem.answer !== elWordDB.answer) || (elem.question !== elWordDB.question)) {
                            updateWords.push(elem)
                        }
                    } else {
                        elem.id = null
                        insertWords.push(elem)
                    }
                } else {
                    if (!elem.dictionaryId) {
                        elem.id = null
                        elem.dictionaryId = localDict
                    }
                    insertWords.push(elem)
                }
            })
            if (wordDB) {
                wordDB.forEach((elem) => {
                    if (!listwords.find((el) => {
                        if (elem.id === el.id) {
                            return el
                        }
                    })) {
                        deleteWords.push(elem)
                    }
                })
            }
        } else {
            if (wordDB && wordDB.length !==0) {
                wordDB.forEach((elem) => {
                    deleteWords.push(elem)
                })
            }
        }

        console.log(listwords)
        console.log(insertWords)
        console.log(updateWords)
        console.log(deleteWords)

        if (insertWords.length!==0) {
            const res = request('/api/question/saveAll', 'POST', insertWords, {"Authorization": token})
        }

        if (updateWords.length!==0) {
            const res = request('/api/question/saveAll', 'POST', updateWords, {"Authorization": token})
        }

        

        if (deleteWords.length!==0) {
            const res = request('/api/question/deleteAll', 'DELETE', deleteWords, {"Authorization": token})
        }
        
    }


    return (
        <>
        <CommonHeader/>
            <div className="container">
                <HeaderAdmin/>
                { !pressButton && 
                    <div className="form-creating-dict">
                        <div className="fields-creating-dict">
                            <p>Создать новый словарь</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="name-new-dict">Название</label>
                                        </td>
                                        <td>
                                            <input 
                                                id="name-new-dict"
                                                type="text"
                                                value={nameDict}
                                                onChange={e => setNameDict(e.target.value)}
                                            />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label htmlFor="external-dict">Подключить внешний словарь</label>
                                        </td>
                                        <td>
                                            <input 
                                                id="external-dict"
                                                type="file"
                                                accept=".dict"
                                                onChange={e => setExternalDict(e.target.files[0])}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="with-button">
                            <button
                                onClick={createNewDict}
                                disabled={lockButtonCreate}
                            >
                                Создать
                            </button>
                        </div>
                    </div>
                }

                { !pressButton && 
                    <div className="form-creating-dict">
                        <div className="fields-creating-dict">
                            <p>Выберите существующий словарь</p>
                            <div className="flexing">
                                <select
                                    id="dictInput"
                                    name="dictInput"
                                    value={localDict}
                                    onChange={dictHandler}
                                >
                                    <option value={0}>...</option>
                                    {listdicts && listdicts.map((elem) => {
                                        return (
                                            <option 
                                                key={elem.id} 
                                                value={elem.id}
                                            >
                                                {elem.name}
                                            </option>
                                        )
                                    })}
                                </select>
                                <div className="with-button">
                                    <button
                                        disabled={lockButtonConfirm}
                                        onClick={clickConfirmButton}
                                    >
                                        Подтвердить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                { pressButton && 
                    <>
                        <div className="flexing-above-listwords">
                            <div>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="search"
                                    placeholder="Поиск..."
                                />
                            </div>
                            <div>
                                <span>{nameDict}</span>
                            </div>
                            <div className="button-above-listwords">
                                <button onClick={e => clickItem()}>&#10010;</button>
                                <button onClick={e => saveDict()}>&#128190;</button> {/*SAVE*/}
                            </div>
                        </div>

                        <div className="listwords-in-dict">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="first-th-div">
                                                <span>Определение</span>
                                                <div>
                                                    <button onClick={clickSortAlphabetUp}>А-я</button>
                                                    <button onClick={clickSortAlphabetDown}>Я-а</button>
                                                </div>
                                                <div>
                                                    <button onClick={clickSortLengthUp}>N&#8593;</button>
                                                    <button onClick={clickSortLengthDown}>N&#8595;</button>
                                                </div>
                                            </div>
                                        </th>
                                        <th>
                                            <span>Описание</span>
                                        </th>
                                        <th>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { localListWords && localListWords.map((elem) => {
                                        return (
                                            <tr key={new Date() + String(elem.answer) + String(elem.question)}>
                                                <td onClick={e => clickItem(elem)}>
                                                    {elem.answer}
                                                </td>
                                                <td onClick={e => clickItem(elem)}>
                                                    {elem.question}
                                                </td>
                                                <td onClick={e => clickDeleteItem(elem)}>
                                                    &#128465;&#65039;
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>


                        {clickedItem && 
                            <>
                                <div className="bg-dark"></div>
                                <div className="modal-create-item">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <label htmlFor="modalAnswer">Определение</label>
                                                </td>
                                                <td>
                                                    <input
                                                        value={modalAnswer}
                                                        onChange={e => setModalAnswer(e.target.value)}
                                                        id="modalAnswer"
                                                        className="modal-answer"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label htmlFor="modalDesc">Описание</label>
                                                </td>
                                                <td>
                                                    <textarea
                                                        value={modalQuestion}
                                                        onChange={e => setModalQuestion(e.target.value)} 
                                                        id="modalDesc"
                                                        className="textarea-question"
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <input
                                        type="radio"
                                        checked={radioBtnImage}
                                        id="radionbtnImage"
                                        onChange={onImage}
                                    />
                                    <label onClick={onImage} htmlFor="radiobtnImage">Картинка</label>
                                    <input
                                        type="radio"
                                        checked={radioBtnAudio}
                                        id="radionbtnAudio"
                                        onChange={onAudio}
                                    />
                                    <label onClick={onAudio} htmlFor="radiobtnAudio">Аудио</label>
                                    {radioBtnAudio && 
                                        <div>
                                            <button onClick={clickOpen}>Открыть медиатеку</button>
                                        </div>
                                    }
                                    {radioBtnImage && 
                                        <div>
                                            <button onClick={clickOpen}>Открыть галерею</button>
                                        </div>
                                    }
                                    { modalSrc && 
                                        <div className="modal-src">
                                            <img src={modalSrc.image}/>
                                            <button onClick={e => setModalSrc(null)}>&#10060;</button>
                                        </div>
                                    } 
                                    { modalSrcAudio && 
                                        <div className="modal-src">
                                            <button onClick={e => setModalSrcAudio(null)}>&#10060;</button>
                                            <audio src={modalSrcAudio.audio} controls={true}></audio>
                                        </div>
                                    }
                                    <div>
                                        <button onClick={clickSaveCreateItem}>Сохранить</button>
                                        <button onClick={clickCancelCreateItem}>Отмена</button>
                                    </div>
                                </div>
                            </>
                        }


                        { srcSource && 
                            <>
                                <div className="bg-darker"></div>
                                { radioBtnImage &&
                                    <div className="bg-darker-content">
                                        <div className="list-bg-darker">
                                            {gallery && gallery.map((src, index) => {
                                                return (
                                                    <div onClick={e => clickItemInList(src)} className="item-in-list" key={index}>
                                                        <div className="itemListik">
                                                            <div className="itemScanword">
                                                                <img src={src.image} alt="картинка"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <button onClick={cancelModalBgDarker}>Отмена</button>
                                    </div> 
                                    || radioBtnAudio && 
                                    <div className="bg-darker-content">
                                        <div className="list-bg-darker">
                                            {audio && audio.map((src, index) => {
                                                return (
                                                    <div onClick={e => clickItemInList(src)} className="item-in-list" key={index}>
                                                        <div className="itemListik">
                                                            <div className="itemScanword">
                                                                <audio src={src.audio} controls={true}></audio>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <button onClick={cancelModalBgDarker}>Отмена</button>
                                    </div> 
                                }
                            </>
                        }
                    </>
                }
            </div>
        </>
    )
}