import axios from "axios";

const RegisterService = ({ name, surname, username, password }) => {
  const url = "http://localhost:3001/api/register";
  return axios
    .post(url, {
      name: name,
      surname: surname,
      username: username,
      password: password,
    })
    .then((res) => {
      const data = res.data;
      return data;
    });
};

export default RegisterService;
