import { useContext, useEffect } from "react"
import { ModalContext } from "../context/ModalContext"

export const Modal = () => {
    const {src, answer, question, modal, srcAudio} = useContext(ModalContext)

    useEffect(() => {
        if (srcAudio) {
            if (document.getElementById('audio')) {
                document.getElementById('audio').play()
            }
        }
        else {
            if (document.getElementById('audio')) {
                document.getElementById('audio').pause()
            }
        }
    }, [srcAudio])

    return (
        <div className="modal">
            {modal && <>
                {srcAudio && 
                    <audio 
                        controls
                        id="audio"
                    >
                        <source src={srcAudio} type="audio/mp3"/>
                    </audio>
                }
                {src && <img className="image-in-modal" name="image" src={src} alt={answer}/>}
                <span>{question}</span>
            </>}
        </div>
    )
}