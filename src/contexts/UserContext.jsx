import React, {createContext, useState, useEffect} from "react";
import Cookies from "js-cookie";

export const UserContext = createContext(undefined);

export const UserProvider = ({children}) => {
  const [auth, setAuth] = useState({
    token: null,
    isAuthenticated: false
  });
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  const fetchAndSetUser = () => {
    const userRole = Cookies.get("role");
    const loginUser = Cookies.get("loginUser");
    const user = loginUser ? JSON.parse(loginUser) : null;
    setAuth({
      token: Cookies.get("token"),
      isAuthenticated: !!Cookies.get("token")
    });
    setRole(userRole);
    setActiveUser(user);
    setUserId(user?.id || null);
    return user;
  };

  useEffect(() => {
    fetchAndSetUser();
  }, []);

  const updateUser = () => {
    return fetchAndSetUser();
  };

  const login = async (responseData) => {
    const {userType, userData} = responseData;
    const {token} = userData;

    Cookies.set("token", userData.token);
    Cookies.set("role", userType);
    Cookies.set("loginUser", JSON.stringify(userData));

    setAuth({
      token,
      isAuthenticated: true
    });
    setRole(userType);
    setUserId(userData.id);
    setActiveUser(userData);
  };

  const logout = () => {
    Cookies.remove('token');
    sessionStorage.clear();

    setAuth({
      token: null,
      isAuthenticated: false
    });
    setRole(null);
    setUserId(null);
    setActiveUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        ...auth,
        role,
        userId,
        activeUser,
        updateUser,
        login,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};