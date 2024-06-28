import React, { useContext } from 'react'
import { AuthContext } from '../auth/context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({children}) => {
    const {authState} = useContext( AuthContext );
    const {pathname, search} = useLocation();
    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath);
  return (authState.user)
    ? children
    : <Navigate to='/login' />
}
