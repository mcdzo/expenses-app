import axios from "axios";

const EditTransaction = (transaction) => {
  const jwt = window.sessionStorage.getItem("jwt");
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const url = "http://localhost:3001/api/edit-transaction";

  return axios
    .post(url, {
      token: jwt,
      id: transaction.id,
      concept: transaction.concept,
      amount: transaction.amount,
      date: transaction.date,
    })
    .then((res) => {
      console.log(res);
      const result = res.data.result;

      return result;
    });
};

export default EditTransaction;
