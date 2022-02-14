import "./Display.css";
import useCalc from "../../hooks/useCalc";

const Display = () => {
  const { total } = useCalc();
  return (
    <section className="display">
      <div className="display-title">Balance: </div>
      <div className="display-balance">$ {total}</div>
    </section>
  );
};

export default Display;

/*
  
import transactionContext from "../../context/transactionContext";
import { useContext } from "react";
  
  
  const { transactions } = useContext(transactionContext);
  console.log(transactions);
  const type_income = transactions.filter((tr) => tr.type === "income");
  const type_outcome = transactions.filter((tr) => tr.type === "outcome");

  let income = 0;
  let outcome = 0;
  type_income.forEach((transaction) => {
    income = income + parseInt(transaction.amount);
  });

  type_outcome.forEach((transaction) => {
    outcome = outcome + parseInt(transaction.amount);
  });

  const total = income - outcome;*/
