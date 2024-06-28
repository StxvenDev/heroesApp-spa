import { authReducer } from "../../../src/auth";

describe('test in AuthReducer', () => { 
    const initialState = {}
    test('should return default state', () => { 
        const newState = authReducer(initialState, {});
        expect(newState).toEqual(initialState);
     });
 });