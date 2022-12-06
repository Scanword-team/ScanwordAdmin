import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
// import 'materialize-css'
import './app.css'
import { ModalState } from './context/ModalContext'
import { DragState } from './context/DragContext'
import { SettingState } from './context/SettingContext'


function App() {

  const {login, logout, userId, token} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value = {{
      login, logout, token, userId, isAuthenticated
    }}>
      <Router>
        <ModalState>
              <DragState>
                <SettingState>
                    <div className='container'>
                      {routes}
                    </div>
                  </SettingState>
              </DragState>
        </ModalState>
      </Router>
    </AuthContext.Provider>
  ) 
}

export default App;
