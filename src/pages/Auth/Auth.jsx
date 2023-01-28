import React, { useState, useContext, useEffect } from "react";
import "./Auth.css";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "../../components/Login/Login";

const API_BASE_URL = process.env.REACT_APP_VITE_API_BASE_URL;

const Auth = () => {
  const navigate = useNavigate();
  const [credentials, seetCredentials] = useState({
    userName: undefined,
    password: undefined,
    email: undefined,
  });

  const [isLoggin, setIsLoggin] = useState(true);

  const { loading, err, dispatch, user } = useContext(AuthContext);

  const handleChangeInputValues = (e) => {
    seetCredentials((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        userName: credentials.userName,
        password: credentials.password,
      });
      if (response.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data.details });
        localStorage.setItem("user", JSON.stringify(response.data.details));
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAIL",
          payload: { message: "you are not an admin " },
        });
      }
    } catch (error) {
      let payload = error.response.data.message;
      dispatch({ type: "LOGIN_FAIL", payload });
    }
  };

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  return (
    <div className="auth">
      {isLoggin ? (
        <div>
          <Login
            handleChangeInputValues={handleChangeInputValues}
            err={err}
            handleLogin={handleLogin}
            loading={loading}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Auth;
