import React, { useContext, useEffect, useState } from "react"
import { CommonHeader } from "../components/CommonHeader/CommonHeader"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"



export const AuthPage = () => {

    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()
    const auth = useContext(AuthContext)

    useEffect( () => {
        message(error)
        clearError()
    }, [error, message,clearError])

    const [form, setForm] = useState({
        login: "",
        password: ""
    })

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
          const data = await request('/api/auth/register', 'POST', {...form})
          message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
          const data = await request('/api/auth/login', 'POST', {...form})
          auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <>
            <CommonHeader/>
            <div className="form-auth">
                <span className="card-title">Авторизация</span>
                <div className="card-section-input">
                    <div className="input-field">
                        <label htmlFor="login" className="label-for-input">Введите логин</label>
                        <input 
                            placeholder="Введите логин"
                            id="login" 
                            type="text" 
                            name="login"
                            className="yellow-input"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password" className="label-for-input">Введите пароль</label>
                        <input 
                            placeholder="Введите пароль"
                            id="password" 
                            type="password" 
                            name="password"
                            className="yellow-input"
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className="my-card-action">
                    <button
                        onClick={loginHandler} 
                        className="btn" 
                        style={{marginRight:80}} 
                        disabled={loading}
                    >
                        Войти
                    </button>
                    <button 
                        onClick={registerHandler} 
                        className="btn"
                        disabled={loading}
                    >
                        Регистрация
                    </button>
                </div>
            </div>
        </>
    )
}