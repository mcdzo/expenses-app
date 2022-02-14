import "./Transaction.css";
import {
  FaTrashAlt,
  FaPencilAlt,
  FaCheck,
  FaWindowClose,
} from "react-icons/fa";
import { useState } from "react";

const Transaction = ({ transaction, onEdit, onDelete }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleConcept = (evt) => {
    setConcept(evt.target.value);
  };
  const handleAmount = (evt) => {
    setAmount(evt.target.value);
  };
  const handleDate = (evt) => {
    setDate(evt.target.value);
  };
  const handleEdit = () => {
    setEdit(!edit);
  };

  const onConfirmEdit = () => {
    if (concept === "" || amount === "" || date === "") {
      alert("Faltan campos por completar!");
    } else {
      const id = transaction.id;
      onEdit({ concept, amount, date, id });
      setEdit(!edit);
    }
  };
  const handleDeleteModal = () => {
    setShowDelete(!showDelete);
  };

  const handleDelete = (id) => {
    onDelete(id);

    console.log("delete");
    setShowDelete(!showDelete);
  };

  return (
    <div className="transaction">
      <div className="transaction-description">
        <div className="transaction-concept">
          {edit ? (
            <input
              placeholder={transaction.concept}
              type="text"
              onChange={handleConcept}
            />
          ) : (
            <small> {transaction.concept}</small>
          )}
        </div>
        <div className="transaction-amount">
          {edit ? (
            <input
              placeholder={transaction.amount}
              type="number"
              className="transaction-amount-input"
              onChange={handleAmount}
            />
          ) : (
            <small>${transaction.amount}</small>
          )}
        </div>
        <div className="transaction-date">
          {edit ? (
            <input
              type="date"
              className="transaction-date-input"
              onChange={handleDate}
            />
          ) : (
            <small>{transaction.date}</small>
          )}
        </div>
        <div className="transaction-type">
          {!edit && <small>{transaction.type}</small>}
        </div>
      </div>
      <div className="transaction-actions">
        {edit ? (
          <>
            <FaWindowClose
              className="cancel-icon"
              onClick={handleEdit}
            ></FaWindowClose>
            <FaCheck className="confirm-icon" onClick={onConfirmEdit}></FaCheck>
          </>
        ) : (
          <>
            <FaPencilAlt
              className="edit-icon"
              onClick={handleEdit}
            ></FaPencilAlt>

            <FaTrashAlt
              className="delete-icon"
              onClick={handleDeleteModal}
            ></FaTrashAlt>
          </>
        )}
      </div>
      {showDelete && (
        <div className="delete-modal">
          <div className="delete-form">
            <div className="delete-form-header">
              <button onClick={handleDeleteModal}>Cerrar</button>
            </div>
            <div className="delete-form-question">
              <strong>Esta seguro que quiere eliminar esta transaccion?</strong>
              <div className="delete-form-options">
                <button className="button-no" onClick={handleDeleteModal}>
                  No
                </button>
                <button
                  className="button-yes"
                  onClick={() => handleDelete(transaction.id)}
                >
                  Si
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
