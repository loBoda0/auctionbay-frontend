import { createContext, useContext, useState } from "react";
import { PassChildren } from "../interfaces";
import { AuthContextType } from "../interfaces/auth";
import { User } from "../interfaces/user";

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider: React.FC<PassChildren> = ({children}) => {
  const [user, setUser] = useState<User|null>(null)
  const [token, setToken] = useState<string|null>(null)

  const login = (newUser: User, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
  };

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};