import axios from "axios";

const LoginService = ({ username, password }) => {
  const url = "http://localhost:3001/api/login";
  return axios
    .post(url, {
      username: username,
      password: password,
    })
    .then((res) => {
      const data = res.data;
      return data;
    });
};

export default LoginService;
