"use client";

import React, { createContext, useContext, useState } from "react";

interface SimpleAuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const SimpleAuthContext = createContext<SimpleAuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

export const useSimpleAuth = () => {
  const context = useContext(SimpleAuthContext);
  if (context === undefined) {
    throw new Error("useSimpleAuth must be used within a SimpleAuthProvider");
  }
  return context;
};

export const SimpleAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username: string, password: string): boolean => {
    // 환경변수에서 관리자 계정 정보 가져오기
    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (username === adminUsername && password === adminPassword) {
      setIsAuthenticated(true);
      // 로컬스토리지에 인증 상태 저장 (새로고침 시에도 유지)
      localStorage.setItem("admin_authenticated", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
  };

  // 초기화 시 로컬스토리지에서 인증 상태 확인
  React.useEffect(() => {
    const saved = localStorage.getItem("admin_authenticated");
    if (saved === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <SimpleAuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </SimpleAuthContext.Provider>
  );
};
