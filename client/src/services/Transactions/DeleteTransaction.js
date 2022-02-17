import axios from "axios";

const DeleteTransaction = (id) => {
  const jwt = window.sessionStorage.getItem("jwt");
  const url = "http://localhost:3001/api/delete-transaction";
  return axios
    .post(url, {
      token: jwt,
      id: id,
    })
    .then((res) => {
      const result = res.data.result;

      return result;
    });
};

export default DeleteTransaction;
