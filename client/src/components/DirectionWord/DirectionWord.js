import { useContext } from "react"
import { SettingContext } from "../../context/SettingContext"

export const DirectionWord = () => {

    const { 
        onHorizon, 
        onVertical, 
        changeOnVertical, 
        changeOnHorizon, 
    } = useContext(SettingContext)


    return (
        <div className="formRadio" name="formRadio"> 
            <table>
                <tbody>
                    <tr>
                            <td>
                                <label htmlFor="radioButtonHorizon">Расположить по горизонтали</label>
                            </td>
                            <td>
                                <input 
                                    checked={onHorizon}
                                    onChange={changeOnHorizon} 
                                    type="radio" 
                                    id="radioButtonHorizon" 
                                    name="radioWord"
                                />
                            </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="radioButtonVertical">Расположить по вертикали</label>
                        </td>
                        <td>
                            <input 
                                checked={onVertical}
                                onChange={changeOnVertical}
                                type="radio" 
                                id="radioButtonVertical" 
                                name="radioWord"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* <div>
                <label htmlFor="radioButtonHorizon">Расположить по горизонтали</label>
                <input 
                    checked={onHorizon}
                    onChange={changeOnHorizon} 
                    type="radio" 
                    id="radioButtonHorizon" 
                    name="radioWord"
                />
            </div>
            <div>
                <label htmlFor="radioButtonVertical">Расположить по вертикали</label>
                <input 
                    checked={onVertical}
                    onChange={changeOnVertical}
                    type="radio" 
                    id="radioButtonVertical" 
                    name="radioWord"
                />
            </div> */}
        </div>
    )
}