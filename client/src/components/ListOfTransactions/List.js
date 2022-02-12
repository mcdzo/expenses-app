import { useState } from "react";
import Transaction from "../Transaction/Transaction";
import "./List.css";
import NewTransactionForm from "../NewTransactionForm/NewTransactionForm";

const List = () => {
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: "1",
      concept: "Pago de impuestos",
      amount: "1000",
      date: "02/02/2022",
      type: "Egreso",
    },
    {
      id: "2",
      concept: "Pago de impuestos",
      amount: "1000",
      date: "02/03/2022",
      type: "Egreso",
    },
    {
      id: "3",
      concept: "Comida",
      amount: "1000",
      date: "02/03/2022",
      type: "Egreso",
    },
    {
      id: "4",
      concept: "Comida",
      amount: "1000",
      date: "02/03/2022",
      type: "Egreso",
    },
    {
      id: "5",
      concept: "Comida",
      amount: "1000",
      date: "02/03/2022",
      type: "Egreso",
    },
    {
      id: "6",
      concept: "Comida",
      amount: "1000",
      date: "02/03/2022",
      type: "Egreso",
    },
    {
      id: "7",
      concept: "Comida",
      amount: "1000",
      date: "02/03/2022",
      type: "Egreso",
    },
  ]);

  const onShowForm = () => {
    setShowForm(!showForm);
  };

  const onCloseForm = () => {
    setShowForm(!showForm);
  };

  const addTransaction = ({ concept, amount, date, type }) => {
    const id = Math.random() * (10000 - 100) + 100;
    const transaction = {
      concept,
      amount,
      date,
      type,
    };
    const newTransaction = { ...transaction, id };
    console.log(newTransaction);
    setTransactions([...transactions, newTransaction]);
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

    setTransactions(transactions.filter((element) => element.id !== id));
  };

  return (
    <section className="transactions-section">
      <div className="list-title">
        <h4>Últimas Tansacciones: </h4>
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
