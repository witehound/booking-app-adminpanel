import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Login.css";

const Login = ({ handleChangeInputValues, err, handleLogin, loading }) => {
  return (
    <div className="login">
      <div className="ltop">
        <FontAwesomeIcon icon={faUser} />
        <h2>Login</h2>
      </div>
      <div className="lcontainer">
        <input
          type="text"
          placeholder="username"
          name={"userName"}
          className={"linput"}
          onChange={(e) => handleChangeInputValues(e)}
        />
        <input
          type="password"
          placeholder="password"
          name={"password"}
          className={"linput"}
          onChange={(e) => handleChangeInputValues(e)}
        />
        <button
          className="lbutton"
          disabled={loading}
          onClick={(e) => handleLogin(e)}
        >
          {loading ? <>Loading</> : "Login"}
        </button>
        {err && <span>{err.message}</span>}
      </div>
    </div>
  );
};

export default Login;
