import React, { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import { isUserLogged } from "./actions/isUserLogged";
import "@/lib/auth/client";

export const Context = createContext();

const initialState = {
  isLoading: true
};

const GlobalContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = isUserLogged(dispatch);
    return () => unsubscribe();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default GlobalContext;
