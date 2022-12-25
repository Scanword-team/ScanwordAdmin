import { useContext, useEffect, useRef } from "react"
import { CommonHeader } from "../components/CommonHeader/CommonHeader"
import { HeaderAdmin } from "../components/HeaderAdmin/HeaderAdmin"
import { SettingContext } from "../context/SettingContext"

export const AudioPage = () => {
    const {audio, updateAudio, getAudioFromDB,setAudioInDB} = useContext(SettingContext)
    const fileInput = useRef()

    useEffect(() => {
        getAudioFromDB()
    }, [])



    const fileHandler = () => {
        const file = fileInput.current.files[0]
        if (file) {
            const reader = new FileReader()
            reader.addEventListener("load", async() => {
                let path = reader.result // path - то, что хранится в БД
                const audio1 = new Audio()
                audio1.src = path
                console.log(path)
                let playPromise = audio1.play()
                if (playPromise!==undefined) {
                    playPromise.then(function() {
                        if (audio && audio.length !== 0) {
                            updateAudio([...audio, {id: Number(new Date()), audio: path}])
                        } else {
                            updateAudio([{id: Number(new Date()), audio: path}])
                        }
                        audio1.pause()
                    }).catch(function(error) {
                        alert('Некорректное содержимое файла аудио')
                    });
                }
                // audio1.play().then(() => {
                    
                // })
                
                // audio1.onerror = function() {
                //     alert('Некорректное содержимое файла аудио')
                // }
            })
            
            reader.readAsDataURL(file)
        }
        
    }

    const saveHandler = () => {
        setAudioInDB()
    }

    const deleteHandler = (id) => {
        updateAudio(audio.filter((el) => {
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
                    <input className="input-image" ref={fileInput} onChange={e => fileHandler(e)} type="file" accept=".mp3" id="fileInput"/>
                    {audio && audio.map((src) => {
                        return (
                            <div className="item-in-list" key={src.id}>
                                <div className="itemListik">
                                        <div className="itemScanword">
                                            <audio src={src.audio} controls={true}></audio>
                                        </div>
                                        <button onClick={e => deleteHandler(src.id)}>Удалить</button>
                                </div>
                            </div>
                        )
                    })}
                    {audio && audio.length===0 &&
                        <div className="center-header-div">Медиатека пустая</div>
                    }
                </div>
            </div>
        </>
    )
}