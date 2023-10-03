import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { User } from '../interfaces/User';
const rootUrl = 'http://localhost:3001';

export const AuthContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (username: string, password: string) => Promise<User | null>;
  logout: () => void;
}>({
  user: null,
  setUser: () => {},
  login: () => Promise.resolve(null),
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios
        .get(`${rootUrl}/user-profile`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Failed to fetch user data: ', error);
        });
    }

  }, [isLoggedIn]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<User | null> => {
    try {
      const response = await axios.post(`${rootUrl}/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        const tokenData = response.data;
        const { token } = tokenData;

        const userData: User = { token };

        Cookies.set('token', token as string, { expires: 1 });
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        userData.favourites = [];
        setUser(userData);
        setIsLoggedIn(true);
        return userData;
      } else {
        console.error(
          'Login failed: Unexpected response status',
          response.status
        );
        return null;
      }
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  };

  const logout = () => {
    Cookies.remove('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsLoggedIn(false);
  };

  const contextValue = {
    user,
    setUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
