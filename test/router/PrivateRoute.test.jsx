import React from 'react'
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { MemoryRouter } from "react-router-dom";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe('test in privateroute', () => { 
    test('It should show the children if the user is authenticated', () => { 
        Storage.prototype.setItem = jest.fn();
        const authState = {
            user : {
                name : 'steven',
                id: '133'
            },
            logged : true
        }
        render(
            <AuthContext.Provider value={{authState}}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(screen.getByText('Ruta Privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman');
     })
 });