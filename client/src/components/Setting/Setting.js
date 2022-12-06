import React, { useContext } from "react"
import { SettingContext } from "../../context/SettingContext"

const Setting = () => {

    const { 
        hvalue, 
        vvalue, 
        changeInputVertical, 
        changeInputHorizon 
    } = useContext(SettingContext)

    
    

    return (
        <div>
            <div className="setting">
                <table>
                    <tbody>
                        <tr>
                                <td>
                                    <label htmlFor="horizontalInput">Кол-во ячеек по горизонтали:</label>
                                </td>
                                <td>
                                    <input 
                                        onChange={changeInputHorizon} 
                                        value={hvalue} 
                                        id="horizontalInput" 
                                        min="10" 
                                        max="20" 
                                        type="number"
                                    />
                                </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="verticalInput">Кол-во ячеек по вертикали:</label>
                            </td>
                            <td>
                                <input 
                                    onChange={changeInputVertical}
                                    value={vvalue}
                                    id="verticalInput" 
                                    min="10" 
                                    max="20" 
                                    type="number"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Setting