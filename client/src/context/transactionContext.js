import React, { useReducer } from "react";

const transactionContext = React.createContext();

const reducer = (transactions, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      return action.transactions;
    case "ADD_TRANSACTION":
      const newTransaction = action.transaction;
      return [...transactions, newTransaction];

    default:
      return transactions;
  }
};

const initialState = [];

export function TransactionContextProvider({ children }) {
  const [transactions, dispatch] = useReducer(reducer, initialState);

  return (
    <transactionContext.Provider value={{ transactions, dispatch }}>
      {children}
    </transactionContext.Provider>
  );
}

export default transactionContext;
