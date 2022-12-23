import { useContext, useEffect, useRef } from "react"
import { CommonHeader } from "../components/CommonHeader/CommonHeader"
import { HeaderAdmin } from "../components/HeaderAdmin/HeaderAdmin"
import { SettingContext } from "../context/SettingContext"

export const GalleryPage = () => {
    const {gallery, updateGallery, getGalleryFromDB,setGalleryInDB} = useContext(SettingContext)
    const fileInput = useRef()

    useEffect(() => {
        getGalleryFromDB()
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
                        updateGallery([...gallery, {id: Number(new Date()), picture: path}])
                    } else {
                        updateGallery([{id: Number(new Date()), picture: path}])
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
        updateGallery(gallery.filter((el) => {
            if (el.id !== id) {
                return el
            }
        }))
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