import React from 'react'
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))

describe('test in <SearchPage />', () => { 
    beforeEach(() =>  jest.clearAllMocks());
    test('It should show with the default values', () => { 
        const {container} = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )
        expect(container).toMatchSnapshot();
     });

    test('It should show the hero with the querystring value and input value reset', () => { 
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )
        const input = screen.getByRole('textbox');
        const img = screen.getByRole('img');
        const noFound = screen.getByLabelText('noFound');
        expect(input.value).toBe('');
        expect(img.src).toContain('/heroes/dc-batman.jpg');
        expect(noFound.style.display).toBe('none');
     });

    test('It should show the error message if the hero is not registered', () => { 
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )
        const noFound = screen.getByLabelText('noFound');
        expect(noFound.style.display).toBe('');
     });

    test('It should navigate to a new page', () => { 
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )
        const input = screen.getByRole('textbox');
        const form = screen.getByLabelText('form');
        fireEvent.input(input, {target : { value : 'batman' }});
        fireEvent.submit(form);
        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=batman');
     });
 });