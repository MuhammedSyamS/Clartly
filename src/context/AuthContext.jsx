import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setToken(parsed.token);
    }
  }, []);

  const login = (userData, jwtToken) => {
    localStorage.setItem("user", JSON.stringify({ ...userData, token: jwtToken }));
    setUser({ ...userData, token: jwtToken });
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
