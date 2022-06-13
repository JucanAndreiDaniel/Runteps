import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { UserContext } from "./UserContext";

export default function useAuth() {
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  //set user
  const setUserContext = async (username) => {
    setUser(username);
    navigate("/");
  };

  //register user
  const registerUser = async (data) => {
    const { username, email, password, passwordConfirm } = data;

    return axios
      .post(process.env.REACT_APP_API_URL + "/api/registration/", {
        username,
        email,
        password1: password,
        password2: passwordConfirm,
      })
      .then((response) => {
        setUserContext(response.data.user);
        localStorage.setItem("token", response.data.access_token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //login user
  const loginUser = async (data) => {
    const { username, password } = data;

    return axios
      .post(process.env.REACT_APP_API_URL + "/api/login/", {
        username,
        password,
      })
      .then((response) => {
        setUserContext(response.data.user);
        localStorage.setItem("token", response.data.access_token);
      })
      .catch((err) => {
        setError(err.response.data.non_field_errors[0].toString());
        console.log(err.response.data.non_field_errors[0]);
      });
  };

  return {
    registerUser,
    loginUser,
    error,
  };
}
