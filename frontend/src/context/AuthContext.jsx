import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const stored = localStorage.getItem("auth");

  const [auth, setAuth] = useState(stored ? JSON.parse(stored) : null);

  const login = (data) => {
    localStorage.setItem("auth", JSON.stringify(data));
    setAuth(data);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: auth?.user,
        token: auth?.token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
