import React from 'react'
import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "../../../src/ui";
import { AuthContext } from '../../../src/auth';
import { MemoryRouter } from 'react-router-dom';

/**
 * Todo: Nombre de la persona
 * Todo: cuando hace click en el boton "logout" debe llamar 
 *  * 1. navigate con arg 'login' y replace
 *  * 2. logout
 */

describe('test in <Navbar />', () => { 
    test('should show the person name', () => { 
        const authState = {
            logged : true,
            user : {
                id : 'abc',
                name : 'Juan'
            }
        }
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={{authState}}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        screen.debug();
        const userName = screen.getByLabelText('span').innerHTML;
        expect(userName).toBe(authState.user.name);
     });
     test('should call navigate and logout function', () => { 
        const logout = jest.fn();
        const authState = {
            logged : true,
            user : {
                id : 'abc',
                name : 'Juan'
            }
        }
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={{authState, logout}}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        const buttonLogout = screen.getByRole('button');
        fireEvent.click(buttonLogout);
        expect(logout).toHaveBeenCalled();
      });
 });