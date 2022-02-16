import "./Transactions.css";
import { Link } from "wouter";
import { useContext, useEffect, useState } from "react";

import transactionContext from "../../context/transactionContext";
import Transaction from "../../components/Transaction/Transaction";
import UserTransactions from "../../services/Transactions/UserTransactions";

const Transactions = () => {
  const { transactions, dispatch } = useContext(transactionContext);
  const [TransactionsByCategory, setCategory] = useState([]);
  useEffect(() => {
    UserTransactions().then((transactions) => {
      console.log(transactions);
      dispatch({
        type: "GET_TRANSACTIONS",
        transactions: transactions,
      });
      setCategory(transactions);
    });
  }, []);

  const handleCategory = (evt) => {
    const keyword = evt.target.value;
    if (keyword === "all") {
      setCategory(transactions);
    } else {
      setCategory(transactions.filter((el) => el.category === keyword));
    }
  };
  return (
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
            </select>
          </div>
        </div>
        <div className="all-transactions-container">
          {TransactionsByCategory.map((transaction) => (
            <Transaction
              transaction={transaction}
              key={transaction.id}
            ></Transaction>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Transactions;
