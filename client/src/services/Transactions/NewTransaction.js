import axios from "axios";

const NewTransaction = (transaction) => {
  const jwt = window.sessionStorage.getItem("jwt");
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const url = "http://localhost:3001/api/new-transaction";
  return axios
    .post(url, {
      token: jwt,
      concept: transaction.concept,
      amount: transaction.amount,
      date: transaction.date,
      type: transaction.type,
      user_id: user.id,
      category: transaction.category,
    })
    .then((res) => {
      const data = res.data.transaction;

      return data;
    });
};

export default NewTransaction;
