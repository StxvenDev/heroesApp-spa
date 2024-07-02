import React from 'react'
const { render, screen } = require("@testing-library/react");
const { MemoryRouter } = require("react-router-dom");
const { AuthContext } = require("../../src/auth/context/AuthContext");
const { AppRouter } = require("../../src/router/AppRouter");

describe('Pruebas en <AppRouter />', () => { 
    test('should show login if the user is not auth', () => { 
        const authState = {
            logged : false
        }
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={{authState}}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )
        
     });
 });