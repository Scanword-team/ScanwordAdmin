import { useContext, useMemo, useEffect } from "react"
import { DragContext } from "../../context/DragContext"
import { SettingContext } from "../../context/SettingContext"
import { Row } from "./Row/Row"

export const Matrix = () => {
    const {vvalue,hvalue,updateListwords} = useContext(SettingContext)
    const { updateContext, updateDragitem, updateDragonFlag, updateDataQuestionId} = useContext(DragContext)

    useEffect(() => {
        var zones = document.querySelectorAll('.zone')
        zones.forEach(zone => {
            zone.getElementsByTagName('span')[0].innerHTML = ''
            zone.removeAttribute('data-word')
            zone.removeAttribute('data-question')
            zone.removeAttribute('data-countword')
        })
        updateContext('')
        updateDragitem('')
        updateDragonFlag('')
        updateDataQuestionId('')
        
    },[hvalue,vvalue])

    const arr = useMemo(()=> {
        return new Array(vvalue).fill('')
    }, [vvalue])

    return (
        <>
            {arr.map((_, i) => <Row vvalue={vvalue} id={i} key={i}/>)}
        </>
    )
}