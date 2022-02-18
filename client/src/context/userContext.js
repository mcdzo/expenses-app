import React, { useReducer } from "react";

const userContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "IS_LOGGED":
      return true;

    default:
      return state;
  }
};

const initialState = false;

export function UserContextProvider({ children }) {
  const [isLogged, setIsLogged] = useReducer(reducer, initialState);

  return (
    <userContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </userContext.Provider>
  );
}

export default userContext;
