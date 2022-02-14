import "./Home.css";
import Header from "../../components/Header/Header";
import Display from "../../components/Display/Display";
import List from "../../components/ListOfTransactions/List";

const Home = () => {
  return (
    <>
      <Header></Header>
      <section className="app-content">
        <Display></Display>
        <List></List>
      </section>
    </>
  );
};

export default Home;
