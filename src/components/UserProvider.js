import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export default function UserProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem("userData");
    return savedUserData ? JSON.parse(savedUserData) : null;
  });

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
