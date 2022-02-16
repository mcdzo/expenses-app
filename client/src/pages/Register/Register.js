import "./Register.css";
import { useLocation, Link } from "wouter";
import { useState } from "react";
import RegisterService from "../../services/Register/RegisterService";

const Register = () => {
  const [, navigate] = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (name === "" || surname === "" || username === "" || password === "") {
      setModalMessage("Faltan campos del formulario por completar");
      setShowModal(!showModal);
    } else {
      RegisterService({ name, surname, username, password }).then((data) => {
        console.log(data);
        if (data.value) {
          const jwt = data.jwt;
          const loggedUser = data.user;
          window.sessionStorage.setItem("jwt", jwt);
          window.sessionStorage.setItem("user", JSON.stringify(loggedUser));
          navigate("/home");
        } else {
          setModalMessage(
            "Ya existe un usuario registrado con ese nombre de usuario."
          );
          setShowModal(!showModal);
        }
      });
    }
  };
  return (
    <>
      <div className="register">
        <div className="register-container">
          <div className="register-presentation">
            <div className="register-title">
              <h2>CHALLENGE FULL STACK - Javascript</h2>
              <h4>App de control de gastos</h4>
            </div>

            <p>
              Esta app forma parte del challenge FULLSTACK de Alkemy,
              registrate!
            </p>
          </div>
          <form className="register-form" type="submit" onSubmit={onSubmit}>
            <div className="register-form-title">
              <h2>Registrate: </h2>
            </div>

            <div className="form-control">
              <label>Nombre: (*)</label>
              <input
                type="text"
                placeholder=""
                onChange={(evt) => setName(evt.target.value)}
              ></input>
            </div>
            <div className="form-control">
              <label>Apellido: (*)</label>
              <input
                type="text"
                placeholder=""
                onChange={(evt) => setSurname(evt.target.value)}
              ></input>
            </div>
            <div className="form-control">
              <label>Nombre de usuario: (*)</label>
              <input
                type="text"
                placeholder=""
                onChange={(evt) => setUsername(evt.target.value)}
              ></input>
            </div>
            <div className="form-control">
              <label>Contraseña: (*)</label>
              <input
                type="password"
                placeholder=""
                onChange={(evt) => setPassword(evt.target.value)}
              ></input>
            </div>
            <button>Registrarme</button>
            <Link to="/">Ya tengo cuenta</Link>
          </form>
        </div>
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
    </>
  );
};

export default Register;
