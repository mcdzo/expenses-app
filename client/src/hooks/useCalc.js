import transactionContext from "../context/transactionContext";
import { useContext } from "react";

const Calc = () => {
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

  const total = income - outcome;
  return { total };
};

export default Calc;
