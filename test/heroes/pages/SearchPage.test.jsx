import React from 'react'
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

describe('test in <SearchPage />', () => { 
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
 });