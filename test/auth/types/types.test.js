import { types } from "../../../src/auth/types/types";

describe('test in types.js', () => { 
    test("should return this types", () => {
      expect(types).toEqual({
        login: "[Auth] login",
        logout: "[Auth] logout",
      });
    });
 })