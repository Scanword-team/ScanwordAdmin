import { createContext, useState } from "react";

export const ModalContext = createContext({
    modal: false,
    src: '',
    srcAudio: '',
    question: '',
    answer: '',
    updateSrcAudio: () => {},
    updateSrc: () => {},
    updateModal: () => {},
    updateQuestion: () => {},
    updateAnswer: () => {},
})

export const ModalState = ({children}) => {
    const [modal, setModal] = useState(false)
    const [src, setSrc] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [srcAudio, setSrcAudio] = useState('')

    const updateSrcAudio = (newSrc) => {
        setSrcAudio(() => newSrc)
    }

    const updateSrc = (newSrc) => {
        setSrc(() => newSrc)
    }

    const updateModal = (newModal) => {
        setModal(() => newModal)
    }

    const updateQuestion = (newQuestion) => {
        setQuestion(() => newQuestion)
    }

    const updateAnswer = (newAnswer) => {
        setAnswer(() => newAnswer)
    }

    return (
    <ModalContext.Provider value={{modal, src, answer, question, srcAudio, updateSrcAudio, updateSrc, updateModal, updateAnswer, updateQuestion}}>
        {children}
    </ModalContext.Provider>
)}