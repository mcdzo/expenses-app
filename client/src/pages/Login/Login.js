import { useLocation, Link } from "wouter";
import "./Login.css";
import { useState } from "react";
import LoginService from "../../services/Login/LoginService";

const Login = () => {
  const [, navigate] = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const onChangeUsername = (evt) => {
    setUsername(evt.target.value);
  };
  const onChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    if (username === "" || password === "") {
      setModalMessage("Faltan datos por completar.");
      setShowModal(!showModal);
    } else {
      LoginService({ username, password }).then((data) => {
        if (data.value) {
          const jwt = data.jwt;
          const loggedUser = data.user;
          window.sessionStorage.setItem("jwt", jwt);
          window.sessionStorage.setItem("user", JSON.stringify(loggedUser));
          navigate("/home");
        } else {
          setModalMessage("Nombre de usuario o contraseña incorrecto.");
          setShowModal(!showModal);
        }
      });
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-presentation">
          <div className="app-title">
            <h2>CHALLENGE FULL STACK - Javascript</h2>
            <h4>App de control de gastos</h4>
          </div>

          <p>
            Esta app forma parte del challenge FULLSTACK de Alkemy, para poder
            utilizarla necesitas logearte.
          </p>
        </div>
        <form className="login-form" type="submit" onSubmit={onSubmit}>
          <div className="login-form-title">
            <h2>Ingresá: </h2>
          </div>

          <div className="form-control">
            <label>Nombre de usuario: (*)</label>
            <input
              type="text"
              placeholder=""
              onChange={onChangeUsername}
            ></input>
          </div>
          <div className="form-control">
            <label>Contraseña: (*)</label>
            <input
              type="password"
              placeholder=""
              onChange={onChangePassword}
            ></input>
          </div>
          <button>Ingresar</button>
          <Link to="/register">Registrarse</Link>
        </form>
      </div>
      {showModal && (
        <div className="form-modal">
          <div className="error-modal">
            <strong>{modalMessage}</strong>
            <div className="delete-form-options">
              <button onClick={() => setShowModal(!showModal)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
