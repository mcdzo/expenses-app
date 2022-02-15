import "./Home.css";
import { useEffect, useContext, useState } from "react";

import Header from "../../components/Header/Header";
import Display from "../../components/Display/Display";
import List from "../../components/ListOfTransactions/List";
import NewTransactionForm from "../../components/NewTransactionForm/NewTransactionForm";

import transactionContext from "../../context/transactionContext";
import UserTransactions from "../../services/Transactions/UserTransactions";

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const { dispatch } = useContext(transactionContext);
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

  return (
    <>
      <Header></Header>
      <section className="app-content">
        <Display></Display>
        <List></List>
        <button onClick={onShowForm}>Nueva Transaccion</button>
        {showForm && (
          <NewTransactionForm onCloseForm={onCloseForm}></NewTransactionForm>
        )}
      </section>
    </>
  );
};

export default Home;
