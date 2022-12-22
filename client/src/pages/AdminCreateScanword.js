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




export const AdminCreateScanword = () => {
    const {request} = useHttp()
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

    

    const saveScanword = async() => {
        if (!boolUpdate) {
            let size = [hvalue, vvalue]
            const id_scan = Number(new Date())
            const res = await request('/api/scanword/saving', 'POST', {scanword:scanword.map((el, index) => {
                el.number = index +1
                return el
            }), size, hint, id: id_scan, name: id_scan})
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
            let size = [hvalue, vvalue]
            const res = await request('/api/scanword/saving', 'PUT', {scanword:scanword.map((el, index) => {
                el.number = index +1
                return el
            }), size, hint, id: id_scanword, name: id_scanword})
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
                                    <Link to="/"><button onClick={saveScanword} className="save">Сохранить сканворд</button></Link>
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