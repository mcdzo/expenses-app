import axios from "axios";

const RegisterService = ({ name, surname, email, password }) => {
  const url = "http://localhost:3001/api/register";
  return axios
    .post(url, {
      name: name,
      surname: surname,
      email: email,
      password: password,
    })
    .then((res) => {
      const data = res.data;
      return data;
    });
};

export default RegisterService;
