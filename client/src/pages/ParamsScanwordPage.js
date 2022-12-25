import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CommonHeader } from '../components/CommonHeader/CommonHeader'
import { HeaderAdmin } from '../components/HeaderAdmin/HeaderAdmin'
import { SettingContext } from '../context/SettingContext'

export const ParamsScanwordPage = () => {


    const {
        dict, 
        hvalue, 
        vvalue,
        hint,
        listdicts,
        boolUpdate,
        scanword,
        changeHint, 
        changeDict,
        changeInputVertical, 
        changeInputHorizon,
        updateListDicts, 
        updateScanword,
        updateListwords,
        updateWordDB
    } = useContext(SettingContext)

    useEffect(() => {
        updateListDicts()
        if (!boolUpdate) {
            updateScanword([])
        }
        changeDict(0)
        // console.log(scanword)
    }, [])

    useEffect(() => {
        console.log('dict', dict)
    }, [dict])

    // useEffect(() => {
    //     changeHint('',1) 
    //     changeDict('',"")
    //     changeInputVertical('',10)
    //     changeInputHorizon('',10)
    //     updateListDicts()
    //     updateScanword([])
    //     updateListwords(null),
    //     updateWordDB([])
    // }, [])
    
    const dictHandler = (event) => {
        changeDict(event.target.value)
    }
    


    return (
        <>
            <CommonHeader/>
            <div className="container">
                <HeaderAdmin/>
                <table className='params'>
                    <tbody>
                        <tr>
                                <td>
                                    <label htmlFor="dictInput">Выбрать словарь</label>
                                </td>
                                <td>
                                    <select
                                        id="dictInput"
                                        name="dictInput"
                                        value={dict}
                                        onChange={dictHandler}
                                    >
                                        <option>
                                            ...
                                        </option>
                                        {listdicts && listdicts.map((elem) => {
                                            return (
                                                <option 
                                                    key={elem.id} 
                                                    value={elem.id}
                                                >
                                                    {elem.name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </td>
                        </tr>

                        <tr>
                                <td>
                                    <label htmlFor="horizontalInput">Количество ячеек по горизонтали:</label>
                                </td>
                                <td>
                                    <input 
                                        onChange={changeInputHorizon} 
                                        value={hvalue} 
                                        id="horizontalInput" 
                                        min="10" 
                                        max="20" 
                                        type="number"
                                        disabled={boolUpdate}
                                    />
                                </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="verticalInput">Количество ячеек по вертикали:</label>
                            </td>
                            <td>
                                <input 
                                    onChange={changeInputVertical}
                                    value={vvalue}
                                    id="verticalInput" 
                                    min="10" 
                                    max="20" 
                                    type="number"
                                    disabled={boolUpdate}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="hintInput">Количество подсказок</label>
                            </td>
                            <td>
                                <input 
                                    onChange={changeHint}
                                    value={hint}
                                    id="hintInput" 
                                    min="1" 
                                    max="3" 
                                    type="number"
                                />
                            </td>
                        </tr>



                            
                    </tbody>
                </table>
                {dict === 0 && 
                    <div className='center-main-button' >
                        <button onClick={() => alert('Вы должны выбрать словарь')}>ПЕРЕЙТИ К СОСТАВЛЕНИЮ СКАНВОРДА</button>
                    </div>
                }



                        
                
                {dict !== 0 && 
                    <div className='center-main-button' >
                        <Link to="/admin-create-scanword">ПЕРЕЙТИ К СОСТАВЛЕНИЮ СКАНВОРДА</Link>
                    </div>
                }
            </div>
        </>
    )
}