import "./List.css";

import { useState, useEffect, useContext } from "react";
import Transaction from "../Transaction/Transaction";
import transactionContext from "../../context/transactionContext";

const List = () => {
  const { transactions } = useContext(transactionContext);
  const [TransactionsByCategory, setCategory] = useState(transactions);

  useEffect(() => {
    setCategory(transactions);
  }, [transactions]);

  const handleCategory = (evt) => {
    const keyword = evt.target.value;
    if (keyword === "all") {
      setCategory(transactions);
    } else {
      setCategory(transactions.filter((el) => el.category === keyword));
    }
  };

  return (
    <section className="transactions-section">
      <div className="list-title">
        <h4>Últimas Tansacciones: </h4>
        <div className="category-list">
          <label>Categorías: </label>
          <select onClick={handleCategory}>
            <option value="all">Todas</option>
            <option value="food">Comida</option>
            <option value="streaming">Streaming</option>
            <option value="taxes">Impuestos</option>
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
