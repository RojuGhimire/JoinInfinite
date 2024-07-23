import { createContext, useState } from "react";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState();

  return (
    <UserContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
