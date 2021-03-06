import transactionContext from "../context/transactionContext";
import { useContext } from "react";

const Calc = () => {
  const { transactions } = useContext(transactionContext);

  const type_income = transactions.filter((tr) => tr.type === "income");
  const type_outcome = transactions.filter((tr) => tr.type === "outcome");

  let income = 0;
  let outcome = 0;
  type_income.forEach((transaction) => {
    income = income + parseFloat(transaction.amount);
  });

  type_outcome.forEach((transaction) => {
    outcome = outcome + parseFloat(transaction.amount);
  });

  const total = income - outcome;
  return { total };
};

export default Calc;
