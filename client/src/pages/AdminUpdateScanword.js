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
        changeId_scanword
    } = useContext(SettingContext)

    useEffect(() => {
        updateListScanwords()
    }, [])


    const clickItemScanword = (itemScanword) => {
        updateScanword(itemScanword.questions)
        changeInputHorizon('', itemScanword.size[0],1)
        changeInputVertical('', itemScanword.size[1],1)
        changeHint('', itemScanword.hint)
        changeBoolUpdate(true)
        changeId_scanword(itemScanword.id)
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
                                    <Link onClick={e => clickItemScanword(itemScanword)} to="/params-creating-scanword">
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