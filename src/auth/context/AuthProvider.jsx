import React, { useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'
import { types } from '../types/types'

const initialState = {
  logged: false
}

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    logged : !!user,
    user : user
  }
}

export const AuthProvider = ({children}) => {
  const [ authState, dispatch] = useReducer(authReducer, {}, init);

  const login = (name = '') => {
    const user = {id:'abc', name:'Steven Bossio'}
    const action = {
      type:types.login,
      payload:user
    }
    dispatch(action); 
    localStorage.setItem('user', JSON.stringify(user));
  }

  const logout = () => {
    localStorage.removeItem('user')
    const action =  {
      types : types.logout,
    }
    dispatch(action)
  }
  return (
    <AuthContext.Provider value={{
      authState,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}
