import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLogin().then((token) => {
      console.log(token, "<<< token");
      setIsLoggedIn(token ? true : false);
    });
  }, []);

  const checkLogin = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      return token;
    } catch (error) {
      throw error;
    }
  };

  const setTokenLogin = async (token) => {
    try {
      await SecureStore.setItemAsync("token", token);
      // const checkToken = await SecureStore.getItemAsync("token");
      // console.log(checkToken, "<<< token");
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const removeTokenLogin = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, setTokenLogin, removeTokenLogin }}
    >
      {children}
    </LoginContext.Provider>
  );
};
