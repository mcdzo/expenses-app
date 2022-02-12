import "./NewTransactionForm.css";
import { useState } from "react";

const NewTransactionForm = ({ onCloseForm, addTransaction }) => {
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");

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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (concept === "" || amount === "" || date === "" || type === "") {
      alert("Faltan campos por completar!");
    } else {
      addTransaction({ concept, amount, date, type });
      onCloseForm();
    }
  };

  return (
    <div className="form-modal">
      <form
        className="new-transaction-form"
        type="submit"
        onSubmit={handleSubmit}
      >
        <div className="form-header">
          <button onClick={onCloseForm}>Cerrar</button>
        </div>
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
          <label>Tipo de transaccion: </label>
          <div className="transaction-type-container">
            Ingreso
            <input
              type="radio"
              name="type"
              className="type-input"
              value="Ingreso"
              onChange={handleType}
            ></input>
            Egreso
            <input
              type="radio"
              name="type"
              className="type-input"
              value="Egreso"
              onChange={handleType}
            ></input>
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
