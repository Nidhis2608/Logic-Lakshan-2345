import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { requrl } from "../admin/const/const";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      setIsLoggedIn(true);
      setUser({ token, userId });
    }
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${requrl}users/login`, {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);
        setIsLoggedIn(true);
        setUser({ token: response.data.token, userId: response.data.user._id });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const registerUser = async (username, email, password) => {
    try {
      const response = await axios.post(`${requrl}users/register`, {
        username,
        email,
        password,
      });
      if (response.status === 200) {
        return true; // You might want to log in the user directly or handle it differently based on your app's flow
      }
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, loginUser, logoutUser, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
