import { useContext, useEffect, useRef, useState } from "react"
import { CommonHeader } from "../components/CommonHeader/CommonHeader"
import { HeaderAdmin } from "../components/HeaderAdmin/HeaderAdmin"
import { SettingContext } from "../context/SettingContext"
import { useHttp } from "../hooks/http.hook"

export const GalleryPage = () => {
    const {gallery, updateGallery, getGalleryFromDB,setGalleryInDB} = useContext(SettingContext)
    const fileInput = useRef()
    const {request} = useHttp()

    const [stopList, setStopList] = useState([])

    const ftchStopList = async() => {
        try {
            let token2 = JSON.parse(localStorage.getItem("userData")).token            
            const res = await request('/api/image/used','GET',null,  {['Authorization']:token2})
            setStopList([...res])
        } catch(e) { }
    }

    useEffect(() => {
        getGalleryFromDB()
        ftchStopList()
    }, [])

    const fileHandler = () => {
        const file = fileInput.current.files[0]
        if (file) {
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                let path = reader.result // path - то, что хранится в БД
                const image = new Image()
                image.src = path

                image.onload = function() {
                    if (gallery && gallery.length !== 0) {
                        updateGallery([...gallery, {id: Number(new Date()), image: path}])
                    } else {
                        updateGallery([{id: Number(new Date()), image: path}])
                    }
                }
                image.onerror = function() {
                    alert('Некорректное содержимое файла картинки')
                }
            })
            reader.readAsDataURL(file)
        }
        
    }

    const saveHandler = () => {
        setGalleryInDB()
    }

    const deleteHandler = (id) => {
        const stopElement = stopList.find((el) => {
            if (el.id === id) {
                return el
            }
        })
        if (!stopElement) {
            alert('Эта картинка содержится в сканвордах, её нельзя удалить')
        } else {
            updateGallery(gallery.filter((el) => {
                if (el.id !== id) {
                    return el
                }
            }))
        }
    }

    return (
        <>
        <CommonHeader/>
            <div className="container">
                <HeaderAdmin/>
                <div className="list-updating-scanwords">
                    <div className="list-audio-image">
                        <label htmlFor="fileInput">Добавить</label>
                        
                        <button onClick={saveHandler}>Сохранить</button>
                    </div>
                    <input className="input-image" ref={fileInput} onChange={e => fileHandler(e)} type="file" accept=".png" id="fileInput"/>
                    {gallery && gallery.map((src) => {
                        return (
                            <div className="item-in-list" key={src.id}>
                                <div className="itemListik">
                                        <div className="itemScanword">
                                            <img src={src.image} alt="картинка"/>
                                        </div>
                                        <button onClick={e => deleteHandler(src.id)}>Удалить</button>
                                </div>
                            </div>
                        )
                    })}
                    {gallery && gallery.length===0 &&
                        <div className="center-header-div">Галерея пустая</div>
                    }
                </div>
            </div>
        </>
    )
}