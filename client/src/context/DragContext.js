import { createContext, useContext, useState } from "react";
import { SettingContext } from "./SettingContext";


export const DragContext = createContext({
    listwords: '',
    context: '',
    dragitem: '',
    dragonFlag: '',
    dataQuestionId: '',
    classesForZones: 'zone',
    dragword: '',
    dataWord: '',
    updateDataWord: () => {},
    updateDragword: () => {},
    updateClassesForZones: () => {},
    updateContext: () => {},
    updateDragitem: () => {},
    updateDragonFlag: () => {},
    updateDataQuestionId: () => {},
    updateListwords: () => {}
})

export const DragState = ({children}) => {
    const [context, setContext] = useState('')
    const [dragitem, setDragitem] = useState('')
    const [dragonFlag, setDragonFlag] = useState('')
    const [dataQuestionId, setDataQuestionId] = useState('')
    // const [listwords, setListwords] = useState(words)
    const [classesForZones, setClassesForZones] = useState('zone')
    const [dragword, setDragword] = useState('')
    const [dataWord, setDataWord] = useState('')

    const updateContext = (newContext) => {
        setContext((prev) => {
            return newContext
        })
    }

    const updateDragitem = (newDragItem) => {
        setDragitem(()=>newDragItem)
    }
    
    const updateDragonFlag = (newDragonFlag) => {
        setDragonFlag(()=>newDragonFlag)
    }

    const updateDataQuestionId = (newDataQuestionId) => {
        setDataQuestionId(()=>newDataQuestionId)
    }

    // const updateListwords = (newListwords) => {
    //     setListwords(()=>newListwords)
    // }
    
    const updateClassesForZones = (newClassesForZones) => {
        setClassesForZones(()=>newClassesForZones)
    }

    const updateDragword = (newDragword) => {
        setDragword(()=>newDragword)
    }

    const updateDataWord = (newDataWord) => {
        setDataWord(()=>newDataWord)
    }

    return (
        <DragContext.Provider value={{context, dragitem, dragonFlag, dataQuestionId, classesForZones,
        updateContext, updateDragitem, updateDragonFlag, updateDataQuestionId,
        updateClassesForZones, updateDragword, dragword, dataWord, updateDataWord}}>
            {children}
        </DragContext.Provider>
    )
}