import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  // Fetch user data when the component mounts
  useEffect(() => {
    fetch('http://localhost:3000/api/profile', {
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
