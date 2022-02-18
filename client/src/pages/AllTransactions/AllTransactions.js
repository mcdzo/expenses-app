import "./AllTransactions.css";
import { Link, useLocation } from "wouter";
import { useContext, useEffect, useState } from "react";

import transactionContext from "../../context/transactionContext";
import userContext from "../../context/userContext";
import Transaction from "../../components/Transaction/Transaction";
import UserTransactions from "../../services/Transactions/UserTransactions";

const Transactions = () => {
  const { isLogged } = useContext(userContext);
  const [, navigate] = useLocation();
  const { transactions } = useContext(transactionContext);
  const [AllTransactions, setAllTransactions] = useState([]);
  const [TransactionsByCategory, setCategory] = useState([]);
  useEffect(() => {
    if (isLogged) {
      UserTransactions().then((transactions) => {
        setAllTransactions(transactions);
        setCategory(transactions);
      });
    } else {
      navigate("/");
    }
  }, [transactions]);

  const handleCategory = (evt) => {
    const keyword = evt.target.value;
    if (keyword === "all") {
      setCategory(AllTransactions);
    } else {
      setCategory(AllTransactions.filter((el) => el.category === keyword));
    }
  };
  return (
    <>
      {isLogged && (
        <>
          <div className="all-transactions">
            <div className="all-transactions-menu">
              <Link to="/home">Volver</Link>
            </div>
            <section className="all-transactions-section">
              <div className="all-transactions-list-title">
                <h4>Todas las transacciones: </h4>
                <div className="all-transactions-category-list">
                  <label>Categorías: </label>
                  <select onClick={handleCategory}>
                    <option value="all">Todas</option>
                    <option value="food">Comida</option>
                    <option value="streaming">Streaming</option>
                    <option value="market">Supermercado</option>
                    <option value="shopping">Shopping</option>
                    <option value="drugstore">Farmacia</option>
                    <option value="taxes">Impuestos</option>
                  </select>
                </div>
              </div>
              <div className="all-transactions-container">
                {TransactionsByCategory.length === 0 && (
                  <div className="empty-message">
                    <h2>No hay transacciones que mostrar</h2>
                  </div>
                )}
                {TransactionsByCategory.map((transaction) => (
                  <Transaction
                    transaction={transaction}
                    key={transaction.id}
                  ></Transaction>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Transactions;
