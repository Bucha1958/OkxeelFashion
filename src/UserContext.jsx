import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const API_AUTH = import.meta.env.VITE_AUTH_SERVICE_URL;


  // Fetch user data when the component mounts
  useEffect(() => {
    fetch(`${API_AUTH}/api/auth/profile`, {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(userInfo => {
        console.log('Fetched user info from context:', userInfo);
        setUserInfo(userInfo);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
