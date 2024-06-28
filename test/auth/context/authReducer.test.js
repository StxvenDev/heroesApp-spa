import React from 'react'
import { fireEvent, render, screen } from "@testing-library/react";
import { AuthContext, LoginPage, authReducer } from "../../../src/auth";
import { MemoryRouter } from 'react-router-dom';
import { types } from '../../../src/auth/types/types';

describe('test in AuthReducer', () => { 
    const initialState = {}
    test('should return default state', () => { 
        const newState = authReducer(initialState, {});
        expect(newState).toEqual(initialState);
    });

    test('should call login function, auth and set user', () => { 
        const action = {
            type : types.login,
            payload : {
                name : 'Stevn',
                id : '123'
            }
        }
        const state = authReducer({logged: false}, action);
        expect(state).toEqual({
            logged : true,
            user: action.payload
        })
     });
     test('should call logout function, delete username and set logged in false', () => { 
        const initialState = {
            user : {
                name : 'Stevn',
                id : '123'
            },
            logged:true
        }
        const action = {
            type : types.logout
        }
        const state = authReducer(initialState,action);
        expect(state).toEqual({
            logged : false
        })
      })
 });