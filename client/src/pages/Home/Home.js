import "./Home.css";
import { useEffect, useContext, useState } from "react";
import { Link, useLocation } from "wouter";

import Header from "../../components/Header/Header";
import Display from "../../components/Display/Display";
import List from "../../components/LastTransactions/List";
import NewTransactionForm from "../../components/NewTransactionForm/NewTransactionForm";

import transactionContext from "../../context/transactionContext";
import UserTransactions from "../../services/Transactions/UserTransactions";
import userContext from "../../context/userContext";

const Home = () => {
  const { isLogged } = useContext(userContext);
  const [, navigate] = useLocation();
  const { dispatch } = useContext(transactionContext);
  const [showForm, setShowForm] = useState(false);

  const body = document.querySelector("body");
  useEffect(() => {
    if (isLogged) {
      UserTransactions().then((transactions) => {
        dispatch({
          type: "GET_TRANSACTIONS",
          transactions: transactions,
        });
      });
    } else {
      navigate("/");
    }
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
      {isLogged && (
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
              <NewTransactionForm
                onCloseForm={onCloseForm}
              ></NewTransactionForm>
            )}
          </section>
        </>
      )}
    </>
  );
};

export default Home;
