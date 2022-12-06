import { useCallback, useContext, useEffect, useState } from "react"
import { DragContext } from "../../context/DragContext"
import Word from '../Word/Word'
import { SettingContext } from "../../context/SettingContext"


function deleteAttr (el) {
    el.removeAttribute("data-word")
    el.removeAttribute("data-question")
    if (el.getAttribute('data-direction')) {
        el.removeAttribute('data-direction')
    }
    if (Number(el.getAttribute('data-countword')) == 2) {
        el.setAttribute('data-word', el.getAttribute('data-word2'))
        el.removeAttribute('data-word2')
        el.setAttribute('data-countword', 1)
    }
    else {
        el.removeAttribute('data-countword')
        el.removeAttribute('data-word')
        el.getElementsByTagName('span')[0].innerHTML = ""
    }
}


function deleteAttr2 (el) {
    el.removeAttribute("data-word2")
    el.removeAttribute("data-question")
    if (Number(el.getAttribute('data-countword')) == 2) {
        el.setAttribute('data-countword', 1)
    }
    else {
        el.removeAttribute('data-countword')
        el.getElementsByTagName('span')[0].innerHTML = ""
    }
}

export const ListWords = () => {
    const {dataWord, updateDataQuestionId, context} = useContext(DragContext)
    const {wordDB, scanword, getWordDBFromDB,listwords, filter, changeFilter, updateListwords, updateWordDB, updateScanword} = useContext(SettingContext)

    // const [filter, setFilter] = useState({
    //     filterImage: false, filterMelody: false
    // })

    // const changeFilter = (event) => {
    //     if (event.target.checked) {
    //         setFilter({...filter, [event.target.name]:true})
    //     }
    //     else {
    //         setFilter({...filter, [event.target.name]:false})
    //     }
    // }

    useEffect(() => {
        if (wordDB) {
            if (filter.filterMelody && filter.filterImage) {
                const newListwords = wordDB.filter((worddb) => {
                    if (worddb.srcAudio || worddb.src) {
                        if (worddb != null) {
                            const elementInScanword = scanword.find((elem) => {
                                if (Number(elem.questionId) === worddb.id) {
                                    return elem
                                }
                            })
                            if (!elementInScanword) {
                                return worddb
                            }
                        }
                    }
                })
                updateListwords(newListwords)
            }
            else if (filter.filterImage) {
                const newListwords = wordDB.filter((worddb) => {
                    if (worddb.src) {
                        if (worddb != null) {
                            const elementInScanword = scanword.find((elem) => {
                                if (Number(elem.questionId) === worddb.id) {
                                    return elem
                                }
                            })
                            if (!elementInScanword) {
                                return worddb
                            }
                        }
                    }
                })
                updateListwords(newListwords)
            }
            else if (filter.filterMelody) {
                const newListwords = wordDB.filter((worddb) => {
                    if (worddb.srcAudio) {
                        if (worddb != null) {
                            const elementInScanword = scanword.find((elem) => {
                                if (Number(elem.questionId) === worddb.id) {
                                    return elem
                                }
                            })
                            if (!elementInScanword) {
                                return worddb
                            }
                        }
                    }
                })
                updateListwords(newListwords)
            }
            else {
                updateListwords(wordDB.filter(elem => {
                    if (!scanword.find(el => {
                        if (Number(el.questionId) === elem.id) {
                            return true
                        }
                    })) {
                        return elem
                    }
                }))
            }
        }
    }, [filter])

    const handlerDropWords = () => {
        let div=document.querySelector(".words");
        let vedro
        const cells=document.querySelectorAll(`[data-word='${dataWord}']`);
        
    
        if (cells) {
            cells.forEach (cell => {
                if(cell.getAttribute('data-question')) {
                    updateDataQuestionId(cell.getAttribute('data-question'))
                    vedro = cell.getAttribute('data-question')
                }
                deleteAttr(cell)
            })
        }
    
        const cells2=document.querySelectorAll(`[data-word2='${dataWord}']`);
        if (cells2) {
            cells2.forEach (cell => {
                if(cell.getAttribute('data-question')) {
                    updateDataQuestionId(cell.getAttribute('data-question'))
                    vedro = cell.getAttribute('data-question')
                }
                deleteAttr2(cell)
            })
        }
        const wordik = wordDB.find((element) => element.id === Number(vedro))
        updateScanword(scanword.filter((elem) => {
            if(Number(elem.questionId) !== wordik.id) {
                return elem
            }
        }))
        if (filter.filterImage && filter.filterMelody) {
            if (wordik.src || wordik.srcAudio) {
                updateListwords([...listwords, wordik])
            }
        }
        else if(filter.filterImage){
            if (wordik.src) {
                updateListwords([...listwords, wordik])
            }
        }
        else if(filter.filterMelody) {
            if (wordik.srcAudio) {
                updateListwords([...listwords, wordik])
            }
        }
        else {
            updateListwords([...listwords, wordik])
        }
    }


    const handlerDragOverWords = (event) => {
        if((context.getAttribute("class") == "zone") &&  (context.getAttribute("data-word") || context.getAttribute("data-word2")) ) {
            event.preventDefault()
        }
    }


    return (
        <div 
            onDragOver={ handlerDragOverWords}
            onDrop={handlerDropWords}
            className="words"
        >
            <div>
                <label htmlFor="sort_image">По наличию картинки</label>
                <input
                    type="checkbox"
                    id="sort_image"
                    name="filterImage"
                    onChange={changeFilter}
                />
            </div>
            <div>
                <label htmlFor="sort_melody">По наличию мелодии</label>
                <input
                    type="checkbox"
                    id="sort_melody"
                    name="filterMelody"
                    onChange={changeFilter}
                />
            </div>
            {
                listwords && 
                listwords.map(word => <Word word={word} key={word.id}/>)
            }
        </div>
    )
}