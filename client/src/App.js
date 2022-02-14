import { Route } from "wouter";

import "./App.css";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { TransactionContextProvider } from "./context/transactionContext";

function App() {
  return (
    <div className="App">
      <TransactionContextProvider>
        <Route path="/home" component={Home}></Route>
      </TransactionContextProvider>

      <Route path="/" component={Login}></Route>
    </div>
  );
}

export default App;
