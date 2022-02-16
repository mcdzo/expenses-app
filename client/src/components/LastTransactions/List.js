import "./List.css";

import { useState, useEffect, useContext } from "react";
import Transaction from "../Transaction/Transaction";
import transactionContext from "../../context/transactionContext";
import LastTransactions from "../../services/Transactions/LastTransactions";

const List = () => {
  const { transactions } = useContext(transactionContext);
  const [lastTransactions, setLastTransactions] = useState([]);
  const [TransactionsByCategory, setCategory] = useState([]);

  useEffect(() => {
    LastTransactions().then((transactions) => {
      console.log(transactions);
      setLastTransactions(transactions);
      setCategory(transactions);
    });
  }, [transactions]);

  const handleCategory = (evt) => {
    const keyword = evt.target.value;
    if (keyword === "all") {
      setCategory(lastTransactions);
    } else {
      setCategory(lastTransactions.filter((el) => el.category === keyword));
    }
  };

  return (
    <section className="transactions-section">
      <div className="list-title">
        <h4>Últimas Tansacciones: </h4>
        <div className="last-transactions-category-list">
          <label>Categorías: </label>
          <select onClick={handleCategory}>
            <option value="all">Todas</option>
            <option value="food">Comida</option>
            <option value="streaming">Streaming</option>
          </select>
        </div>
      </div>
      <div className="transactions-container">
        {TransactionsByCategory.map((transaction) => (
          <Transaction
            transaction={transaction}
            key={transaction.id}
          ></Transaction>
        ))}
      </div>
    </section>
  );
};

export default List;
