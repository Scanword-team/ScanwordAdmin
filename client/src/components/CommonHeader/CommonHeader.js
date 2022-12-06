import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { SettingContext} from "../../context/SettingContext"


export const CommonHeader = () => {
    const {isAuthenticated, logout} = useContext(AuthContext)
    const {changeBoolUpdate} = useContext(SettingContext)

    return (
        <header>
            
            {isAuthenticated && 
                <>
                    <Link to="/params-creating-scanword" onClick={e => changeBoolUpdate(false)}>Главная</Link>
                    <Link to='/' onClick={logout}>Выйти</Link>
                </>
            }
            {!isAuthenticated && 
                <>
                    <Link to="/params-creating-scanword" onClick={e => changeBoolUpdate(false)}>Главная</Link>
                    <Link to="/">Авторизация</Link>
                </>
            }
            <Link onClick={e => changeBoolUpdate(false)} to="/instruction">Справка</Link>
        </header>
    )

}