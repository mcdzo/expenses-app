import "./App.css";
import { Route } from "wouter";
import { TransactionContextProvider } from "./context/transactionContext";

import Home from "./pages/Home/Home";
import Transactions from "./pages/AllTransactions/AllTransactions";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <div className="App">
      <TransactionContextProvider>
        <Route path="/home" component={Home}></Route>
        <Route path="/all-transactions" component={Transactions}></Route>
      </TransactionContextProvider>

      <Route path="/" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
    </div>
  );
}

export default App;
