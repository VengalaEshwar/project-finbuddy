import React, { createContext, useState } from "react";

export const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {

  const [user,setUser] = useState({
    "username":"ankith",
    "eamil":"ankithkumar9618@gmail.com"
  });
  const [userDetails,setUserDetails] = useState(null);
  
  return (
    <UserDetailsContext.Provider value={{ user, setUser}}>
      {children}
    </UserDetailsContext.Provider>
  );
};

