import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  const onLogin = () => {
    login('Steven Bossio');
    navigate("/marvel", {
      replace: true,
    });
  };
  return (
    <>
      <div className="container mt-3">
        <h1>Login</h1>
        <button 
          className="btn btn-success mt-2"
          onClick={onLogin}
        >
          Login
        </button>
      </div>
    </>
  );
};
