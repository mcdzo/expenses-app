import "./List.css";

import { useState, useEffect, useContext } from "react";

import Transaction from "../Transaction/Transaction";
import NewTransactionForm from "../NewTransactionForm/NewTransactionForm";
import UserTransactions from "../../services/Transactions/UserTransactions";
import transactionContext from "../../context/transactionContext";
import NewTransaction from "../../services/Transactions/NewTransaction";

const List = () => {
  const [showForm, setShowForm] = useState(false);
  const { transactions, dispatch } = useContext(transactionContext);

  useEffect(() => {
    UserTransactions().then((transactions) => {
      console.log(transactions);
      dispatch({
        type: "GET_TRANSACTIONS",
        transactions: transactions,
      });
    });
  }, []);

  const onShowForm = () => {
    setShowForm(!showForm);
  };

  const onCloseForm = () => {
    setShowForm(!showForm);
  };

  const addTransaction = ({ concept, amount, date, type }) => {
    const transaction = {
      concept,
      amount,
      date,
      type,
    };

    NewTransaction(transaction).then((tr) => {
      console.log(tr);
      dispatch({
        type: "ADD_TRANSACTION",
        transaction: tr,
      });
    });
  };
  const onEdit = ({ concept, amount, date, id }) => {
    const editedTransaction = {
      id,
      concept,
      amount,
      date,
    };
    console.log(editedTransaction);

    //accion de editar en la base de datos
  };

  const onDelete = (id) => {
    console.log(id);

    // setTransactions(transactions.filter((element) => element.id !== id));
  };

  return (
    <section className="transactions-section">
      <div className="list-title">
        <h4>Últimas Tansacciones: </h4>
        <div className="category-list">
          <label>Ordenar por: </label>
          <select>
            <option value="Fecha">Fecha</option>
            <option value="Comida">Comida</option>
            <option value="income">Ingreso</option>
            <option value="outcome">Egreso</option>
          </select>
        </div>
      </div>
      <div className="transactions-container">
        {transactions.map((transaction) => (
          <Transaction
            onEdit={onEdit}
            onDelete={onDelete}
            transaction={transaction}
            key={transaction.id}
          ></Transaction>
        ))}
      </div>
      <button onClick={onShowForm}>Nueva Transaccion</button>
      {showForm && (
        <NewTransactionForm
          onCloseForm={onCloseForm}
          addTransaction={addTransaction}
        ></NewTransactionForm>
      )}
    </section>
  );
};

export default List;
