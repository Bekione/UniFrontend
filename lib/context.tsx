"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { decodeJwt } from "jose";

interface AuthContextType {
  token: string;
  setToken: (token: string) => void;
  user: { id: number } | null;
  setUser: (user: { id: number } | null) => void;
  logout: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => {},
  user: null,
  setUser: () => {},
  logout: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ id: number } | null>(null);
  const [token, setToken] = useState<string>(() => {
    return localStorage.getItem("token") || "";
  });

  const logout = async () => {
    setToken("");
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/login");
  };

  const decodeToken = (token: string) => {
    try {
      const decoded = decodeJwt(token);

      console.log("Decoded 1st : ", decoded)
      return decoded;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);

      const decoded = decodeToken(token);
      console.log("Decoded 2nd : ", decoded)
      if (decoded) {
        setUser({ id: typeof decoded.user_id === 'number'? decoded.user_id : 0 });
        setIsLoggedIn(true);
      } else {
        logout();
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        logout,
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
