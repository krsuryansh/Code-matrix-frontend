import React, { createContext, useState } from "react";

// Create Context
const DataContext = createContext();

// Create Provider Component
const DataProvider = ({ children }) => {
  const [user, setUser] = useState({});
   const [islogin, setIslogin] = useState();
   const [userId, setUserId] = useState();

  return (
    <DataContext.Provider value={{ user, setUser, islogin,setIslogin, userId, setUserId }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
