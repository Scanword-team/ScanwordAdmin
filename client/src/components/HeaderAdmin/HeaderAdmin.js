import { useContext } from "react"
import { Link } from "react-router-dom"
import { SettingContext } from "../../context/SettingContext"

export const HeaderAdmin = () => {
    const {boolUpdate, changeBoolUpdate} = useContext(SettingContext)
    return (
        <div className="header-admin">
            <div><Link to="/params-creating-scanword" onClick={e => changeBoolUpdate(false)} >Создание сканворда</Link></div>
            <div><Link to="/admin-update-scanword" onClick={e => changeBoolUpdate(false)}>Редактирование сканворда</Link></div>
            <div><Link to="/dictionary"  onClick={e => changeBoolUpdate(false)}>Словарь понятий</Link></div>
            <div><Link to='/gallery' onClick={e => changeBoolUpdate(false)}>Галерея</Link></div>
            <div><Link to='/audio' onClick={e => changeBoolUpdate(false)}>Медиатека</Link></div>
        </div>
    )
}