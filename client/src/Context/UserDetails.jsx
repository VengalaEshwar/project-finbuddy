import React, { createContext, useState } from "react";

export const UserDetailsContext = createContext(null);

export const UserDetailsProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <UserDetailsContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
