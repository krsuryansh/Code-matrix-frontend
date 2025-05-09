import React, { createContext, useState } from "react";

// Create Context
const DataContext = createContext();

// Create Provider Component
const DataProvider = ({ children }) => {
  const [data, setData] = useState("Initial Data");
   const [islogin, setIslogin] = useState();

  return (
    <DataContext.Provider value={{ data, setData,islogin,setIslogin }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
