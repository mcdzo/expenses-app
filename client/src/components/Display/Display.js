import "./Display.css";
import useCalc from "../../hooks/useCalc";

const Display = () => {
  const { total } = useCalc();
  return (
    <section className="display">
      <div className="display-title">Balance: </div>
      <div className="display-balance">$ {total}</div>
    </section>
  );
};

export default Display;
