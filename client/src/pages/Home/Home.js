import "./Home.css";
import { useEffect, useContext, useState } from "react";
import { Link } from "wouter";

import Header from "../../components/Header/Header";
import Display from "../../components/Display/Display";
import List from "../../components/LastTransactions/List";
import NewTransactionForm from "../../components/NewTransactionForm/NewTransactionForm";

import transactionContext from "../../context/transactionContext";
import UserTransactions from "../../services/Transactions/UserTransactions";

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const { dispatch } = useContext(transactionContext);
  const body = document.querySelector("body");
  useEffect(() => {
    UserTransactions().then((transactions) => {
      dispatch({
        type: "GET_TRANSACTIONS",
        transactions: transactions,
      });
    });
  }, []);

  const onShowForm = () => {
    setShowForm(!showForm);
    body.style.overflow = "hidden";
  };

  const onCloseForm = () => {
    setShowForm(!showForm);
    body.style.overflow = "auto";
  };

  return (
    <>
      <Header></Header>
      <section className="app-content">
        <Display></Display>
        <div className="home-options-section">
          <button onClick={onShowForm}>Nueva Transaccion</button>
          <Link to="/all-transactions">Ver todas las transacciones</Link>
        </div>
        <List></List>

        {showForm && (
          <NewTransactionForm onCloseForm={onCloseForm}></NewTransactionForm>
        )}
      </section>
    </>
  );
};

export default Home;
