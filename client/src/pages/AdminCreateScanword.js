import React, { useCallback, useContext, useEffect } from "react"
import { ListWords } from "../components/ListWords/ListWords"
import { Matrix } from "../components/Matrix/Matrix"
import { Modal } from "../components/Modal"
import Setting from "../components/Setting/Setting"
// import { DragState } from "../context/DragContext"
// import { ModalState } from "../context/ModalContext"
// import { SettingContext, SettingState } from "../context/SettingContext"
import {CommonHeader} from '../components/CommonHeader/CommonHeader'
import { DirectionWord } from "../components/DirectionWord/DirectionWord"
import { HeaderAdmin } from "../components/HeaderAdmin/HeaderAdmin"
import { SettingContext } from "../context/SettingContext"
import { Link } from "react-router-dom"
import { useHttp } from "../hooks/http.hook"
import { useAuth } from "../hooks/auth.hook"




export const AdminCreateScanword = () => {
    const {request} = useHttp()
    const {token} = useAuth()
    const {
        getWordDBFromDB, 
        scanword, 
        changeInputHorizon, 
        changeInputVertical, 
        changeHint, 
        hvalue, 
        vvalue, 
        hint,
        boolUpdate,
        listwords,
        changeDict, 
        updateListDicts,
        updateScanword,
        updateListwords,
        changeBoolUpdate,
        updateWordDB,
        wordDB,
        id_scanword, 
        changeId_scanword
    } = useContext(SettingContext)

    useEffect(() => {
        getWordDBFromDB()
    }, [])

    useEffect(() => {
        console.log(listwords)
    }, [listwords])

    useEffect(() => {
        if (scanword.length!==0) {
            if(wordDB && wordDB.length!==0 && wordDB.length === listwords.length) {
                scanword.forEach(element => {
                    let wordik = wordDB.find((worddata) => {
                        if (worddata.id === Number(element.questionId)) {
                            return worddata
                        }
                    })
                    if (document.getElementById(element.y+"_"+element.x)) {
                        document.getElementById(element.y+"_"+element.x).getElementsByTagName('span')[0].innerHTML = '?';
                        document.getElementById(element.y+"_"+element.x).setAttribute('data-word', '' + element.questionId)
                        document.getElementById(element.y+"_"+element.x).setAttribute('data-question', '' + element.questionId)
                        document.getElementById(element.y+"_"+element.x).setAttribute('data-direction', '' + element.direction)
                        if (Number(element.direction) === 0) {
                            for(let i=0; i<wordik.answer.length; i++) {
                                document.getElementById(element.y+"_"+Number(1+element.x+i)).getElementsByTagName('span')[0].innerHTML = wordik.answer[i];
                                document.getElementById(element.y+"_"+Number(1+element.x+i)).setAttribute('data-word', '' + element.questionId)
                                if(document.getElementById(element.y+"_"+Number(1+element.x+i)).getAttribute('data-countword')) {
                                    document.getElementById(element.y+"_"+Number(1+element.x+i)).removeAttribute('data-countword')
                                }
                            }
                        }
                        else {
                            for(let i=0; i<wordik.answer.length; i++) {
                                document.getElementById(Number(1+element.y+i)+"_"+element.x).getElementsByTagName('span')[0].innerHTML = wordik.answer[i];
                                document.getElementById(Number(1+element.y+i)+"_"+element.x).setAttribute('data-word', '' + element.questionId)
                                if( document.getElementById(Number(1+element.y+i)+"_"+element.x).getAttribute('data-countword')) {
                                    document.getElementById(Number(1+element.y+i)+"_"+element.x).removeAttribute('data-countword')
                                }
                            }
                        }
                    }
                })






                scanword.forEach(element => {
                    let wordik = wordDB.find((worddata) => {
                        if (worddata.id === Number(element.questionId)) {
                            return worddata
                        }
                    })
                    if (document.getElementById(element.y+"_"+element.x)) {
                        document.getElementById(element.y+"_"+element.x).getElementsByTagName('span')[0].innerHTML = '?';
                        document.getElementById(element.y+"_"+element.x).setAttribute('data-word', '' + element.questionId)
                        document.getElementById(element.y+"_"+element.x).setAttribute('data-question', '' + element.questionId)
                        document.getElementById(element.y+"_"+element.x).setAttribute('data-direction', '' + element.direction)
                        if (Number(element.direction) === 0) {
                            for(let i=0; i<wordik.answer.length; i++) {
                                document.getElementById(element.y+"_"+Number(1+element.x+i)).getElementsByTagName('span')[0].innerHTML = wordik.answer[i];
                                if(document.getElementById(element.y+"_"+Number(1+element.x+i)).getAttribute('data-countword')) {
                                    document.getElementById(element.y+"_"+Number(1+element.x+i)).setAttribute('data-word2', '' + element.questionId)
                                    document.getElementById(element.y+"_"+Number(1+element.x+i)).setAttribute('data-countword', '' + 2)
                                }
                                else {
                                    document.getElementById(element.y+"_"+Number(1+element.x+i)).setAttribute('data-word', '' + element.questionId)
                                    document.getElementById(element.y+"_"+Number(1+element.x+i)).setAttribute('data-countword', '' + 1)
                                }
                            }
                        }
                        else {
                            for(let i=0; i<wordik.answer.length; i++) {
                                document.getElementById(Number(1+element.y+i)+"_"+element.x).getElementsByTagName('span')[0].innerHTML = wordik.answer[i];
                                if( document.getElementById(Number(1+element.y+i)+"_"+element.x).getAttribute('data-countword')) {
                                    document.getElementById(Number(1+element.y+i)+"_"+element.x).setAttribute('data-word2', '' + element.questionId)
                                    document.getElementById(Number(1+element.y+i)+"_"+element.x).setAttribute('data-countword', '' + 2)
                                }
                                else {
                                    document.getElementById(Number(1+element.y+i)+"_"+element.x).setAttribute('data-word', '' + element.questionId)
                                    document.getElementById(Number(1+element.y+i)+"_"+element.x).setAttribute('data-countword', '' + 1)
                                }
                            }
                        }
                    }
                })

                updateListwords(wordDB.filter(wordinList => {
                    if (!scanword.find(el => Number(wordinList.id) === Number(el.questionId))) {
                        return wordinList
                    }
                }))
            }
        }
    }, [wordDB])

    
    const recursion = (mas, id, zones) => {
        zones.forEach((el) => {
            if (el.id_word1===id) {
                if (el.id_word2) {
                    if (!mas.find((elem) => {
                        if (elem === el.id_word2) {
                            return elem
                        }
                    })) {
                        mas.push(el.id_word2)
                        recursion(mas, el.id_word2, zones)
                    }
                }
            } else if (el.id_word2 === id) {
                if (!mas.find((elem) => {
                    if (elem === el.id_word1) {
                        return elem
                    }
                })) {
                    mas.push(el.id_word1)
                    recursion(mas, el.id_word1, zones)
                }
            }
        })
    }


    const saveScanword = async() => {
        let zones_document = document.querySelectorAll('.zone')
        let zones = []
        zones_document.forEach((el) => {
            zones.push(el)
        })
        zones = zones.map((zone) => {
            const newZone = {}
            newZone.id = zone.id
            if (zone.getAttribute('data-countword')) {
                newZone.id_word1 = Number(zone.getAttribute('data-word'))
            }
            if (Number(zone.getAttribute('data-countword')) === 2) {
                newZone.id_word2 = Number(zone.getAttribute('data-word2'))
            }
            zone = {...newZone}
            return zone
        })

        if (scanword.length!==0) {
            const mas  = []
            mas.push(Number(scanword[0].questionId))
            recursion(mas, Number(scanword[0].questionId), zones)
            if (mas.length === scanword.length) {
                if (!boolUpdate) {
                    let size = [hvalue, vvalue]
                    const id_scan = Number(new Date())
                    const sc = await request('/api/scanword/create', 'POST', {
                        name: id_scan,
                        width: hvalue,
                        height: vvalue,
                        prompt: hint, 
                    }, {['Authorization']:token})
                    let nn = 1
                    scanword.forEach(s => {
                        s.scanword = sc
                        s.number = nn++
                    })
                    const res = await request('/api/scanwordQuestion/createWithAllDTO', 'POST', scanword, {['Authorization']:token} )
                    changeHint('',1) 
                    changeDict('',"")
                    changeInputVertical('',10)
                    changeInputHorizon('',10)
                    updateListDicts()
                    updateScanword([])
                    updateListwords(null)
                    updateWordDB([])
                }
                else {
                    console.log("idscan",id_scanword)
                    let size = [hvalue, vvalue]
                    const sc = await request('/api/scanword/create', 'POST', {
                        id: id_scanword,
                        name: id_scanword,
                        width: hvalue,
                        height: vvalue,
                        prompt: hint, 
                    }, {['Authorization']:token})
                    let nn = 1
                    scanword.forEach(s => {
                        if (s.dict) {
                            delete s.dict
                        }
                        if (s.direction === 1) {
                            s.direction = false
                        } else if (s.direction === 0) {
                            s.direction = true
                        }
                        s.scanword = sc
                        s.number = nn++
                    })

                    const res = await request('/api/scanwordQuestion/createWithAllDTO', 'POST', scanword, {['Authorization']:token} )
                    changeHint('',1) 
                    changeDict('',"")
                    changeInputVertical('',10)
                    changeInputHorizon('',10)
                    updateListDicts()
                    updateScanword([])
                    updateListwords(null)
                    updateWordDB([])
                    changeBoolUpdate(false)
                    changeId_scanword(null)
                }
                window.location.href = '/'
            } else {
                alert('Это не сканворд. Не все слова пересекаются')
            }
        } else {
            alert('Заполните сетку сканворда')
        }
    }



    
    return (
        // <ModalState>
        //     <DragState>
        //         <SettingState>
                    <>
                        <CommonHeader/>
                        <div className="container">
                            <HeaderAdmin/>
                            <DirectionWord/>
                            <div className="flexing">
                                <div className="with-question-field">
                                    <div className="question-field">
                                        <Modal/>
                                    </div>
                                    <Setting/>
                                    <button onClick={saveScanword} className="save">Сохранить сканворд</button>
                                </div>
                                <div className="matrix">
                                    <Matrix/>
                                </div>
                                <div>
                                    <ListWords/>
                                </div>
                            </div>
                        </div>
                    </>
                    
        //         </SettingState>
        //     </DragState>
        // </ModalState>
    )
}