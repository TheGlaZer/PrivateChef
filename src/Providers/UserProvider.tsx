import { getUser, googleLoginAPI, loginAPI, updateProfileAPI } from '../api/users';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of the user data
interface User {
  fullName: string;
  email: string;
  image?: string;
  allergies?: string[];
}

// Define the shape of the context
interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  updateUser: (userData: FormData) => void;
  loginUser: (values: { email: string, password: string }) => void;
  googleLogin: (response: any) => void;
}

// Create the context with an initial value
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
        updateLoggedUser();
    }
    else {
        localStorage.removeItem('user');
    }
  }, []);

  const updateLoggedUser = async () => {
    const user = await getUser();
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
}


  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    // You can also invalidate the session on the server here if needed
  };

  const loginUser = async (values: { email: string, password: string }) => {
    const response = await loginAPI(values);
    localStorage.setItem('accessToken', response.accessToken);
    setUser(response.user);
  }
  
  const googleLogin =  async (response: any) => {
      const serverResponse = await googleLoginAPI(response);
      localStorage.setItem('accessToken', serverResponse.accessToken);
      setUser(response.user);
  }

  const updateUser = async (userData: FormData) => {
    const response = await updateProfileAPI(userData);
    
    setUser(response.user);
}

  return (
    <UserContext.Provider value={{ user, setUser, logout, updateUser, loginUser , googleLogin}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
