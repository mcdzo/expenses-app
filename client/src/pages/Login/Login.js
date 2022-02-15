import { useLocation, Link } from "wouter";
import "./Login.css";
import { useState } from "react";
import LoginService from "../../services/Login/LoginService";

const Login = () => {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (evt) => {
    setUsername(evt.target.value);
  };
  const onChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    if (username === "" || password === "") {
      alert("Hay campos obligatorios");
    } else {
      LoginService({ username, password }).then((data) => {
        if (data.value) {
          const jwt = data.jwt;
          const loggedUser = data.user;
          window.sessionStorage.setItem("jwt", jwt);
          window.sessionStorage.setItem("user", JSON.stringify(loggedUser));
          navigate("/home");
        } else {
          alert("Datos incorrectos");
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
            utilizarla necesitas logearte. Si no estas registrado podes hacerlo:
          </p>
          <Link to="/register">Registrarse</Link>
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
        </form>
      </div>
    </div>
  );
};

export default Login;

/* <div className="login">
      <div className="login-presentation-container">
        <div className="login-presentation">
          <h2>CHALLENGE FULL STACK - Javascript</h2>
          <h4>App de control de gastos</h4>
          <p>
            Esta app forma parte del challenge FULLSTACK de Alkemy, para poder
            utilizarla necesitas logearte. Si no estas registrado podes hacerlo
            clickeando acá.
          </p>
          <small>Desarrollado por ...</small>
        </div>
      </div>
      <div className="login-form-container">
        <form className="login-form" type="submit" onSubmit={onSubmit}>
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
        </form>
      </div>
    </div> */
