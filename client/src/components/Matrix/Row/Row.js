import { useContext, useMemo } from "react"
import { SettingContext } from "../../../context/SettingContext"
import { Zone } from "./Zone/Zone"

export const Row = (props) => {
    const {hvalue} = useContext(SettingContext)

    const arr = useMemo(()=> {
        return new Array(hvalue).fill('')
    }, [hvalue])


    return (
        <div className="row" id={props.id}>
            {arr.map((_,i) => <Zone vvalue={props.vvalue} idstr={props.id} id={i} key={props.id+'_'+ i}/>)}
        </div>
    )
}