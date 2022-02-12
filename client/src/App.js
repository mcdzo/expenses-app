import "./App.css";
import Display from "./components/Display/Display";
import Header from "./components/Header/Header";
import List from "./components/ListOfTransactions/List";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <section className="app-content">
        <Display></Display>
        <List></List>
      </section>
    </div>
  );
}

export default App;
