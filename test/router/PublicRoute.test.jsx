import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
const { render, screen } = require("@testing-library/react");
const { AuthContext } = require("../../src/auth/context/AuthContext");
const { PublicRoute } = require("../../src/router/PublicRoute");

describe("test in <PublicRoute />", () => {
  test("should show the children if the user is not auth", () => {
    const authState = {
      logged: false,
    };
    render(
      <AuthContext.Provider value={{ authState }}>
        <PublicRoute>
          <h1>Esto es una prueba</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    const children = screen.getByText("Esto es una prueba");

    expect(children).toBeTruthy();
  });

  test("should navigate if the user is auth", () => {
    const authState = {
      user: {
        name: "steven",
        id: "123",
      },
      logged: true,
    };
    render(
      <AuthContext.Provider value={{ authState }}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="login" element={
                <PublicRoute>
                  <h1>Pagina publica</h1>
                </PublicRoute>
              }
            />
            <Route path="marvel" element = {<h1>Pagina Privada</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    const privateElement = screen.getByText('Pagina Privada');
    expect(privateElement).toBeTruthy();
  });
});
