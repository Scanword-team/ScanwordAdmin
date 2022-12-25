import { useContext } from "react"

import { AuthContext } from "../context/AuthContext"
import { CommonHeader } from "../components/CommonHeader/CommonHeader"
import { HeaderAdmin } from "../components/HeaderAdmin/HeaderAdmin"
const crc32 =require('crc-32')




const htmlTrue = `181852628`

export const InstructionPage = () => {
    const {isAuthenticated} = useContext(AuthContext)


    

    

    const clickHandler = () => {
        const reqToPath = async() => {
            try {
                const res = await fetch('/about.html', {method:'GET', headers: {['Content-type']:'application/html'}})
                if (res.status === 404) {
                    alert('Нет такого файла')
                } else {
                    const info = await res.text()
                    const hash = crc32.str(info)
                    console.log(hash)
                    if (String(hash) === htmlTrue) {
                        const link = document.createElement('a')
                        link.setAttribute('href', '/about.html')
                        link.setAttribute('target', 'blank')
                        link.click()
                    } else {
                        alert('Файл справочной информации со сведениями о системе был повреждён')
                    }
                }
            } catch (e) {
                alert("Ошибка при отправке запроса - "+e)
            }
        }
        reqToPath()
    }

    return (
        <>
            <CommonHeader/>
            <div className="container">
                {isAuthenticated && <HeaderAdmin/>}
                <div className="instruction">
                    <span>Сведения о разработчиках</span>
                    <p>Самарский университет</p>
                    <p>Институт информатики и кибернетики</p>
                    <span>Курсовой проект по дисциплине "Программная инженерия"</span>
                    <span>по теме: "Автоматизированная система составления сканворда на заданную тему"</span>
                    <p></p>
                    <p>Разработчики (студенты группы 6415-020302D):</p>
                    <span>Кочетков А.В.</span>
                    <span>Пирюшов А.С.</span>
                    <span>Пирюшов М.С.</span>
                    <span>Трофимов М.В.</span>
                    <span className="instruction-year">2022г.</span>
                    <button onClick={clickHandler}>Перейти к сведениям о системе</button>
                </div>
            </div>
        </>
    )

}