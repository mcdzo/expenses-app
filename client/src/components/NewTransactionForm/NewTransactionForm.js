import "./NewTransactionForm.css";
import { useState } from "react";
import useTransactions from "../../hooks/useTransactions";

const NewTransactionForm = ({ onCloseForm }) => {
  const { addTransaction } = useTransactions();
  const [showCategory, setShowCategory] = useState({
    income: false,
    outcome: false,
  });
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  const handleConcept = (evt) => {
    setConcept(evt.target.value);
  };
  const handleAmount = (evt) => {
    setAmount(evt.target.value);
  };
  const handleDate = (evt) => {
    setDate(evt.target.value);
  };
  const handleType = (evt) => {
    setType(evt.target.value);
  };
  const handleCategory = (evt) => {
    setCategory(evt.target.value);
  };

  const handleIncomeCategory = () => {
    setShowCategory({ income: true, outcome: false });
  };
  const handleOutcomeCategory = () => {
    setShowCategory({ income: false, outcome: true });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (
      concept === "" ||
      amount === "" ||
      date === "" ||
      type === "" ||
      category === ""
    ) {
      alert("Faltan campos por completar!");
    } else {
      parseFloat(amount);

      addTransaction({ concept, amount, date, type, category });
      onCloseForm();
    }
  };

  return (
    <div className="form-modal">
      <div className="form-header">
        <button onClick={onCloseForm}>Cerrar</button>
      </div>
      <form
        className="new-transaction-form"
        type="submit"
        onSubmit={handleSubmit}
      >
        <h2>Nueva Transaccion</h2>

        <div className="form-control">
          <label>Concepto: </label>
          <input
            type="text"
            placeholder="Ej. Comida en el bar"
            value={concept}
            className="concept-input"
            onChange={handleConcept}
          ></input>
        </div>
        <div className="form-control">
          <label>Monto: </label>
          <div className="amount-input-container">
            $
            <input
              type="number"
              className="amount-input"
              min="0"
              value={amount}
              onChange={handleAmount}
            ></input>
          </div>
        </div>

        <div className="form-control">
          <label>Fecha: </label>
          <input
            type="date"
            className="date-input"
            value={date}
            onChange={handleDate}
          ></input>
        </div>

        <div className="form-control">
          <div className="transaction-type-container">
            <label>Tipo de transacción: </label>
            <div className="transaction-type-options">
              Ingreso
              <input
                id="income"
                type="radio"
                name="type"
                className="type-input"
                value="income"
                onChange={handleType}
                onClick={handleIncomeCategory}
              ></input>
              Gasto
              <input
                id="outcome"
                type="radio"
                name="type"
                className="type-input"
                value="outcome"
                onChange={handleType}
                onClick={handleOutcomeCategory}
              ></input>
            </div>
          </div>
        </div>
        <div className="form-control">
          <div className="category-list">
            {showCategory.income && (
              <>
                <label>Categoría: </label>
                <select onClick={handleCategory}>
                  <option value=""></option>
                  <option value="salary">Sueldo</option>
                  <option value="other">Otras</option>
                </select>
              </>
            )}

            {showCategory.outcome && (
              <>
                <label>Categoría: </label>
                <select onClick={handleCategory}>
                  <option value=""></option>
                  <option value="food">Comida</option>
                  <option value="taxes">Impuestos</option>
                  <option value="streaming">
                    Streaming (Spotify, netflix, etc.)
                  </option>
                  <option value="other">Otras</option>
                </select>
              </>
            )}
          </div>
        </div>

        <div className="form-control">
          <button>Agregar Transaccion</button>
        </div>
      </form>
    </div>
  );
};

export default NewTransactionForm;

/*


*/
