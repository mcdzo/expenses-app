import "./App.css";
import { Route, Switch } from "wouter";
import { TransactionContextProvider } from "./context/transactionContext";

import Home from "./pages/Home/Home";
import Transactions from "./pages/AllTransactions/AllTransactions";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import PrivateRoutes from "./PrivateRoutes";

function App() {
  return (
    <div className="App">
      <TransactionContextProvider>
        <Switch>
          <PrivateRoutes path="/home" component={Home}></PrivateRoutes>
          <PrivateRoutes
            path="/all-transactions"
            component={Transactions}
          ></PrivateRoutes>
          <Route path="/" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
        </Switch>
      </TransactionContextProvider>
    </div>
  );
}

export default App;
