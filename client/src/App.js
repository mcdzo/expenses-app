import "./App.css";
import { Route } from "wouter";
import { TransactionContextProvider } from "./context/transactionContext";

import Home from "./pages/Home/Home";
import Transactions from "./pages/Transactions/Transactions";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="App">
      <TransactionContextProvider>
        <Route path="/home" component={Home}></Route>
        <Route path="/all-transactions" component={Transactions}></Route>
      </TransactionContextProvider>

      <Route path="/" component={Login}></Route>
    </div>
  );
}

export default App;
