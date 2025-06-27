import React, { createContext, useContext, useState } from "react";

type AuthUser = { email: string; role?: string; provider?: "local" | "google" };

type AuthContextType = {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(
    JSON.parse(localStorage.getItem("authUser") || "null")
  );

  const login = (u: AuthUser) => {
    setUser(u);
    localStorage.setItem("authUser", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
