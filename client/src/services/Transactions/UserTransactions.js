import axios from "axios";

const UserTransactions = () => {
  const jwt = window.sessionStorage.getItem("jwt");
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const url = "http://localhost:3001/api/user-transactions";
  return axios
    .post(url, {
      token: jwt,
      user_id: user.id,
    })
    .then((res) => {
      const data = res.data.result;
      return data;
    });
};

export default UserTransactions;
