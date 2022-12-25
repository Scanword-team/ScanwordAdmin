import { useCallback, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CommonHeader } from "../components/CommonHeader/CommonHeader"
import { HeaderAdmin } from "../components/HeaderAdmin/HeaderAdmin"
import { SettingContext } from "../context/SettingContext"


export const AdminUpdateScanword = () => {
    const {
        updateListScanwords, 
        listScanwords,
        updateScanword,
        changeInputHorizon,
        changeInputVertical,
        changeHint,
        changeBoolUpdate,
        changeId_scanword,
        changeDict
    } = useContext(SettingContext)

    useEffect(() => {
        updateListScanwords()
    }, [])


    const clickItemScanword = (itemScanword) => {
        console.log(itemScanword)
        const vScanword = []
        itemScanword.questions.forEach(el => {
            const newEl = {}
            newEl.questionId = el.question.id
            newEl.dict = el.question.dictionary.id
            newEl.direction = el.direction === true ? 0 : 1
            newEl.number = el.number
            newEl.x = el.x
            newEl.y = el.y
            vScanword.push(newEl)
        })
        console.log(vScanword)
        updateScanword(vScanword)
        changeInputHorizon('', itemScanword.width,1)
        changeInputVertical('', itemScanword.height,1)
        changeHint('', itemScanword.prompt)
        changeBoolUpdate(true)
        changeId_scanword(itemScanword.id)
        changeDict(vScanword[0].dict)
    }

    return (
            <>
                <CommonHeader/>
                <div className="container">
                <HeaderAdmin/>
                {listScanwords && listScanwords.length!==0 && 
                    <div className="list-updating-scanwords">
                        {listScanwords && listScanwords.map((itemScanword) => {
                            return (
                                <div className="link-to-scanword" key={itemScanword.id}>
                                    <Link onClick={e => clickItemScanword(itemScanword)} to="/admin-create-scanword">
                                            <div className="itemScanword">
                                                <img src="scanword.jpg" alt="Сканворд"/>
                                                <span>{itemScanword.id}</span>
                                            </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                }

                {listScanwords && listScanwords.length===0 && 
                    <div className="center-header-div">Список сканвордов пуст</div>
                }
                    
                </div>
            </>
    )
}