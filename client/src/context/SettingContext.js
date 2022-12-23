import { createContext, useContext, useState, useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import { DragContext } from "./DragContext";
import {useAuth} from "../hooks/auth.hook";

export const SettingContext = createContext({
    hvalue: 10,
    vvalue: 10, 
    onHorizon: true,
    onVertical: false,
    dict: null,
    hint: 1,
    wordDB: null,
    listwords: null,
    listdicts:null,
    scanword: null,
    filter: null,
    listScanwords: null,
    boolUpdate: false,
    gallery: null,
    image: null,
    audio: null,
    id_scanword: null,
    changeId_scanword: () => {},
    changeListDicts: () => {},
    updateAudio: () => {},
    updateGallery: () => {},
    changeBoolUpdate: () => {},
    updateListScanwords: () => {},
    changeFilter: () => {},
    updateScanword: () => {},
    updateListDicts: () => {},
    updateListwords: () => {},
    changeHint: () => {},
    changeDict: () => {},
    changeOnVertical: () => {},
    changeOnHorizon: () => {},
    changeInputVertical: () => {},
    changeInputHorizon: () => {},
    getGalleryFromDB: () => {},
    setGalleryInDB: () => {},
    setAudioInDB: () => {},
    getAudioFromDB: () => {},
    getWordDBFromDB: () => {},
    updateWordDB: () => {}
})

export const SettingState = ({children}) => {

    
    const {request} = useHttp()
    const {token} = useAuth()
    const [audio, setAudio] = useState(null) // ['/src/e.mp3', '' , '']
    const [gallery, setGallery] = useState(null) // ['/src/e.png', '' , '']
    const [hvalue, setHValue] = useState(10) // количество ячеек по вертикали
    const [vvalue, setVValue] = useState(10) // количество ячеек по горизонтали
    const [hint, setHint] = useState(1) // количество подсказок
    const [onHorizon, setOnHorizon] = useState(true) // вставить слово по горизонтали
    const [onVertical, setOnVertical] = useState(false) // вставить слово по вертикали
    const [dict, setDict] = useState("") // выбранный словарь из списка
    const [wordDB, setWordDB] = useState(null) // список всех слов из выбранного словаря
    const [listwords, setListwords] = useState(null) // список слов, отображающихся в правом блоке
    const [listdicts, setListDicts] = useState(null) // список словарей 
    const [scanword, setScanword] = useState([]) // объект сканворд: [{questionId: '1', dict: 1, direction: 0, x: 5, y: 4}]
    const [filter, setFilter] = useState({
        filterImage: false, filterMelody: false
    }) // фильтрация списка слов: по наличию картинки, по наличию мелодии
    const [listScanwords, setListScanwords] = useState(null)
    const [boolUpdate, setBoolUpdate] = useState(false)
    const [id_scanword, setId_scanword] = useState(null) // id сканворда при редактировании

    const changeId_scanword = (id_scan) => {
        setId_scanword(id_scan)
    }

    const updateAudio = (newAudio) => {
        setAudio(newAudio)
    }

    const setAudioInDB = async() => {
        try {
            const res = await request('/api/audio/saveAll', 'POST', audio, {['Authorization']:token})
        } catch(e) { }
    }

    const getAudioFromDB = async() => {
        try {
            const res = await request('/api/audio/','GET',null,  {['Authorization']:token})
            console.log(res)
            if (res && res.length !== 0) {
                setAudio(res)
            }
        } catch(e) { }
    }

    const updateGallery = (newGallery) => {
        setGallery(newGallery)
    }

    const changeBoolUpdate = (key) => {
        setBoolUpdate(key)
    }

    const updateListScanwords = async () =>{
        try {

            const res = await request('/api/scanword', 'GET', null, {['Authorization']:token})
            
            for (const s of res) {
                const links = await request('/api/scanwordQuestion/getAllByScanword', 'POST', s, {['Authorization']:token})
                delete links.scanword
                s.questions = links
            }

            console.log(res)


            // const res = await request('/api/scanword/getscanwords')
            setListScanwords([...res])
        } catch(e) { }
    }

    const changeFilter = (event) => {
        if (event.target.checked) {
            setFilter({...filter, [event.target.name]:true})
        }
        else {
            setFilter({...filter, [event.target.name]:false})
        }
    }

    const updateScanword = (newScanword) => {
        setScanword([...newScanword])
    }

    const updateListDicts = async () =>{
        try {
            // const headers = new Headers();
            // headers.append('Authorization',token);
            const res = await request('/api/dict','GET',null,  {['Authorization']:token})
            // const res = await request('/api/dict','GET',null,headers)
            setListDicts([...res])
        } catch(e) { }
    }

    const changeListDicts = () => {
        setListDicts(null)
    }
 
    const updateListwords = (newListwords) => {
        setListwords(()=>newListwords)
    }


    const changeDict = (value, key = null) => {
        if (!key) {
            setDict(Number(value))
        } else {
            setDict(value)
        }
    }

    const setGalleryInDB = async() => {
        try {
            const res = await request('/api/image/saveAll', 'POST', gallery, {['Authorization']:token})
        } catch(e) { }
    }

    const getGalleryFromDB = async() => {
        try {
            const res = await request('/api/image','GET',null,  {['Authorization']:token})
            if (res && res.length !== 0) {
                setGallery(res)
            }
        } catch(e) { }
    }

    const getWordDBFromDB = async (localId = null) =>{
        if (!localId) {
            try {
                if (boolUpdate) {
                    // const res = await request('/api/scanword/wordsdb', "POST", {idDict: dict, idsWords: scanword.map(element => element.questionId)})
                    // setListwords([...res.words])
                    // setWordDB([...res.words])
                }
                else {
                    console.log("ggg", boolUpdate)
                    const res = await request('/api/question/getByDictId/'+ dict, "GET", null,{"Authorization": token})
                    setListwords([...res])
                    setWordDB([...res])
                }
            } catch(e) { }
        } else {            
            const res = await request('/api/question/getByDictId/'+ localId, "GET", null,{"Authorization": token})
            setListwords([...res])
            setWordDB([...res])
        }
    }

    const updateWordDB = (newWordDB) => {
        setWordDB(() => newWordDB)
    }



    const changeInputVertical = (event, value=null, key=null) => {
        if (value) {
            setVValue(value)
        }
        else {
            if(Number(event.target.value)>=10 && Number(event.target.value)<=20) {
                setVValue(Number(event.target.value))
            }
            else if (Number(event.target.value)<10) {
                setVValue(10)
            }
            else if (Number(event.target.value)>20) {
                setVValue(20)
            }
        }
        setFilter({
            filterImage:false, filterMelody: false
        })
        if (document.getElementById('sort_image') && document.getElementById('sort_melody')) {
            document.getElementById('sort_image').checked = false
            document.getElementById('sort_melody').checked = false
        }
        // if (!boolUpdate) {
        //     setScanword([])
        // }
        // 
        if (!key) {
            setScanword([])
        }
    }

    const changeHint = (event, value=null) => {
        if (value) {
            setHint(value)
        }
        else {
            if(Number(event.target.value)>=1 && Number(event.target.value)<=3) {
                setHint(Number(event.target.value))        
            }
            else if (Number(event.target.value)<1) {
                setHint(1)
            }
            else if (Number(event.target.value)>3) {
                setHint(3)
            }
        }
    }

    const changeInputHorizon = (event, value=null, key=null) => {
        if (value) {
            setHValue(value)
        }
        else {
            if(Number(event.target.value)>=10 && Number(event.target.value)<=20) {
                setHValue(Number(event.target.value))        
            }
            else if (Number(event.target.value)<10) {
                setHValue(10)
            }
            else if (Number(event.target.value)>20) {
                setHValue(20)
            }
        }
        setFilter({
            filterImage:false, filterMelody: false
        })
        if (document.getElementById('sort_image') && document.getElementById('sort_melody')) {
            document.getElementById('sort_image').checked = false
            document.getElementById('sort_melody').checked = false
        }
        if (!key) {
            setScanword([])
        }
    }

    const changeOnVertical = () => {
        setOnHorizon(false)
        setOnVertical(true)
    }

    const changeOnHorizon = () => {
        setOnVertical(false)
        setOnHorizon(true)
    }

    return (
        <SettingContext.Provider 
        value={{
                hvalue, vvalue, 
                onHorizon, onVertical, 
                dict, hint,wordDB, 
                listwords,listdicts, 
                scanword, filter, listScanwords, 
                boolUpdate, gallery, audio, id_scanword,
                setAudioInDB, getAudioFromDB, 
                updateAudio, getGalleryFromDB, 
                setGalleryInDB, updateGallery,
                changeBoolUpdate, updateListScanwords, 
                changeFilter,updateScanword, 
                updateListDicts , changeHint, 
                changeDict, changeOnVertical, 
                changeOnHorizon, changeInputVertical, 
                changeInputHorizon, getWordDBFromDB, 
                updateListwords, updateWordDB,
                changeListDicts, changeId_scanword
            }}>
            { children }
        </SettingContext.Provider>
    )
}