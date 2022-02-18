import { Redirect, Route } from "wouter";

const isAuth = () => {
  const jwt = window.sessionStorage.getItem("jwt");
  if (jwt === null) {
    return { isLogged: false };
  } else {
    return {
      isLogged: true,
    };
  }
};

const PrivateRoute = ({ ...rest }) => {
  const { isLogged } = isAuth();

  return isLogged ? <Route {...rest}></Route> : <Redirect to="/" />;
};

export default PrivateRoute;
