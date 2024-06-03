import { useState, createContext, useContext, useEffect, useReducer } from "react";

//context
import { useFetch } from "../context/FetchContext";

//api
import {
  signinRequest,
  signupRequest,
  signoutRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  verifyRequest,
} from "../api/authRequest.js";

//reducer
import { authReducer } from "../reducers/authReducer.js";

//cookie.js
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProviders");
  return context;
};

//initial state
const initialStateAuth = {
  user: {},
  isAuth: false,
}

export function AuthProviders({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialStateAuth)
  const { fetchData } = useFetch();
  const cookies = Cookies.get();

  useEffect(() => {
    verifyUser();
  }, []);

  //register
  function signupUser(userInputs) {
    fetchData(signupRequest(userInputs));
  }
  //login
  async function signinUser(userCredentials) {
    fetchData(signinRequest(userCredentials)).then((res) => {
      dispatch({ type: "SIGNIN_USER", payload: res[0]});
      dispatch({ type: "IS_AUTH", payload: true});
      return;
    });
  }
  //logount
  async function signoutUser() {
    fetchData(signoutRequest()).then((res) => {
      Cookies.remove("accessToken");
      dispatch({ type: "SIGNOUT_USER", payload: {}});
      dispatch({ type: "IS_AUTH", payload: false});
      return;
    });
  }
  //forgot password
  async function forgotPassword(email) {
    fetchData(forgotPasswordRequest(email)).then((res) => {
      alert(res[0].message);
    });
  }

  //resetPassword
  async function resetPassword(password, token) {
    fetchData(resetPasswordRequest(password, token)).then((res) => {
      alert(res[0].message);
    });
  }

  //verify
  async function verifyUser() {
    if (!cookies.accessToken) {
      dispatch({ type: "VERIFY_USER", payload: {}});
      dispatch({ type: "IS_AUTH", payload: false});
      return;
    } else {
      fetchData(verifyRequest()).then((res) => {
        dispatch({ type: "VERIFY_USER", payload: res[0]});
        dispatch({ type: "IS_AUTH", payload: true});
        return;
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signupUser,
        signinUser,
        signoutUser,
        forgotPassword,
        resetPassword,
        verifyUser,
        ...state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
