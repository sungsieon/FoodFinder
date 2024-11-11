import { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export default function UserProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    // 로컬 스토리지에서 userData 가져오기
    const savedUserData = localStorage.getItem('userData');
    return savedUserData ? JSON.parse(savedUserData) : null;
  });

  // userData가 변경될 때 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}