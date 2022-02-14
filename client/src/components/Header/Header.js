import { useLocation } from "wouter";

import "./Header.css";

const Header = () => {
  const [, navigate] = useLocation();
  const onLogout = () => {
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("jwt");
    navigate("/");
  };
  return (
    <header className="header">
      <div className="user-menu">
        <button onClick={onLogout}>Cerrar Sesión</button>
      </div>
      Control de gastos - Alkemy Challenge
    </header>
  );
};

export default Header;
