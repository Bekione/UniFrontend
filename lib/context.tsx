"use client";

import axios from "axios";
import { decodeJwt } from "jose";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  token: string;
  setToken: (token: string) => void;
  user: { id: number } | null;
  setUser: (user: { id: number } | null) => void;
  getUser: () => void;
  logout: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => {},
  user: null,
  setUser: () => {},
  getUser: () => {},
  logout: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ id: number } | null>(null);
  const [token, setToken] = useState<string>("");

  const logout = () => {
    setToken("");
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/login");
  };

  const getUser = async () => {
    if (!token) {
      logout();
      return;
    }

    try {
      const decodedToken: any = decodeJwt(token);
      const userId = decodedToken.user_id;

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setUser(res.data);
        setIsLoggedIn(true);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token,]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        logout,
        user,
        setUser,
        getUser,
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
