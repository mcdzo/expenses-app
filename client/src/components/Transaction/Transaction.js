import "./Transaction.css";
import {
  FaTrashAlt,
  FaPencilAlt,
  FaCheck,
  FaWindowClose,
} from "react-icons/fa";
import { useState } from "react";
import useTransactions from "../../hooks/useTransactions";

const Transaction = ({ transaction }) => {
  const { onEdit, onDelete } = useTransactions();

  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [edit, setEdit] = useState(false);
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const body = document.querySelector("body");

  const typeOp = {
    income: "Ingreso",
    outcome: "Gasto",
  };
  const type = typeOp[transaction.type];

  const colorOp = {
    income: "green",
    outcome: "red",
  };
  const color = colorOp[transaction.type];

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
      handleEDitModal();
    } else {
      const id = transaction.id;
      onEdit({ concept, amount, date, id });
      setEdit(!edit);
    }
  };
  const handleDeleteModal = () => {
    setModalMessage("Esta seguro que quiere eliminar esta transaccion?");
    setShowEdit(!showEdit);
    body.style.overflow = "hidden";
  };
  const onCloseDeleteModal = () => {
    setShowDelete(!showDelete);
    body.style.overflow = "auto";
  };
  const handleEDitModal = () => {
    setModalMessage("Faltan datos por completar.");
    setShowDelete(!showDelete);
    body.style.overflow = "hidden";
  };

  const onCloseEditModal = () => {
    setShowEdit(!showEdit);
    body.style.overflow = "auto";
  };

  const handleDelete = (id) => {
    onDelete(id);

    console.log("delete");
    setShowDelete(!showDelete);
    body.style.overflow = "auto";
  };

  return (
    <div className={`transaction ${color}`}>
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
              placeholder={`$ ${transaction.amount}`}
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
        <div className="transaction-type">{!edit && <small>{type}</small>}</div>
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
            <strong>{modalMessage}</strong>
            <div className="delete-form-options">
              <button className="button-no" onClick={onCloseDeleteModal}>
                Cerrar
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
      )}
      {showEdit && (
        <div className="form-modal">
          <div className="error-modal">
            <strong>{modalMessage}</strong>
            <div className="delete-form-options">
              <button onClick={onCloseEditModal}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
/*  <div className="delete-form-header">
              <button onClick={handleDeleteModal}>Cerrar</button>
            </div>*/
