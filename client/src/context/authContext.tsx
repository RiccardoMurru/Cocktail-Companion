import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import axios from 'axios';
import { User } from '../interfaces/User';

export const AuthContext = createContext<{
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    axios
      .get('/user-profile')
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log('Failed to fetch user data: ', error);
      });
  }, []);

  const login = (userData: User) => {
    const { token } = userData;

    localStorage.setItem('token', token!);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const contextValue = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
