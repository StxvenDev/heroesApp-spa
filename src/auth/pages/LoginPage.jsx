import React from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const onLogin = () => {
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
