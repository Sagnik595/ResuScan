import React, { createContext, useEffect, useState } from "react";
import {
  clearAuth,
  getRole,
  getToken,
  isAuthenticated,
  setRole,
  setToken,
} from "../utils/storage";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setTokenState] = useState(getToken());
  const [role, setRoleState] = useState(getRole());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTokenState(getToken());
    setRoleState(getRole());
    setLoading(false);
  }, []);
  

  const login = (jwtToken, userRole = "user") => {
    setToken(jwtToken);
    setRole(userRole);

    setTokenState(jwtToken);
    setRoleState(userRole);
  };

  const logout = () => {
    clearAuth();
    setTokenState(null);
    setRoleState(null);
  };

  const value = {
    token,
    role,
    loading,
    login,
    logout,
    isLoggedIn: isAuthenticated(),
    isAdmin: role === "admin",
    isUser: role === "user",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
