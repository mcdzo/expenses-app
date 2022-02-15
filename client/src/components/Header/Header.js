import { Link, useLocation } from "wouter";

import "./Header.css";

const Header = () => {
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [, navigate] = useLocation();
  const onLogout = () => {
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("jwt");
    navigate("/");
  };
  return (
    <header className="header">
      <div className="app-title">
        <Link to="/home">
          Control de gastos de:
          <strong>
            {user.name} {user.surname}
          </strong>
        </Link>
      </div>

      <div className="user-menu">
        <button onClick={onLogout}>Cerrar Sesión</button>
      </div>
    </header>
  );
};

export default Header;
