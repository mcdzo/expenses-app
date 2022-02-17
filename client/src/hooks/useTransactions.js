import { useContext } from "react";
import transactionContext from "../context/transactionContext";
import UserTransactions from "../services/Transactions/UserTransactions";
import NewTransaction from "../services/Transactions/NewTransaction";
import EditTransaction from "../services/Transactions/EditTransaction";
import DeleteTransaction from "../services/Transactions/DeleteTransaction";

const useTransactions = () => {
  const { dispatch } = useContext(transactionContext);

  const addTransaction = ({ concept, amount, date, type, category }) => {
    const transaction = {
      concept,
      amount,
      date,
      type,
      category,
    };

    NewTransaction(transaction).then((tr) => {
      dispatch({
        type: "ADD_TRANSACTION",
        transaction: tr,
      });
    });
  };
  const onEdit = ({ concept, amount, date, id }) => {
    const editedTransaction = {
      id: id,
      concept: concept,
      amount: amount,
      date: date,
    };

    EditTransaction(editedTransaction).then((res) => {
      if (res) {
        UserTransactions().then((transactions) => {
          dispatch({
            type: "GET_TRANSACTIONS",
            transactions: transactions,
          });
        });
      }
    });
  };

  const onDelete = (id) => {
    DeleteTransaction(id).then((res) => {
      if (res) {
        dispatch({
          type: "DELETE_TRANSACTION",
          id: id,
        });
      }
    });
  };

  return {
    addTransaction,
    onEdit,
    onDelete,
  };
};

export default useTransactions;
