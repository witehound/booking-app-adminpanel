import { createContext, useReducer, useEffect } from "react";

let user = localStorage.getItem("user");

const InitialState = {
  user: user !== null ? JSON.parse(user) : null,
  loading: false,
  err: null,
};

export const AuthContext = createContext(InitialState);

const searchReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        err: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        err: null,
      };

    case "LOGIN_FAIL":
      return {
        user: null,
        loading: false,
        err: action.payload,
      };
    case "LOGOUT":
      return InitialState;

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, InitialState);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        err: state.err,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
