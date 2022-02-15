import axios from "axios";

const LastTransactions = () => {
  const jwt = window.sessionStorage.getItem("jwt");
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const url = "http://localhost:3001/api/last-transactions";
  return axios
    .post(url, {
      token: jwt,
      user_id: user.id,
    })
    .then((res) => {
      const data = res.data.result;
      console.log(data);
      return data;
    });
};

export default LastTransactions;
