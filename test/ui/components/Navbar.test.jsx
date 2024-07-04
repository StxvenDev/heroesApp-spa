import React from 'react'
import { fireEvent, render, screen } from "@testing-library/react";
import { Navbar } from "../../../src/ui";
import { AuthContext } from '../../../src/auth';
import { MemoryRouter, useNavigate } from 'react-router-dom';


/**
 * Todo: Nombre de la persona
 * Todo: cuando hace click en el boton "logout" debe llamar 
 *  * 1. navigate con arg 'login' y replace
 *  * 2. logout
 */

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate : () => mockedUseNavigate
}));

describe('test in <Navbar />', () => { 
    const authState = {
        logged : true,
        user : {
            id : 'abc',
            name : 'Juan'
        }
    }

    beforeEach(() =>  jest.clearAllMocks())
    test('should show the person name', () => { 
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
        expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {"replace": true});
      });
 });