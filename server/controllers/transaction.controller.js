const validator = require("validator");
const { v4: uuidv4 } = require("uuid");

const Transaction = require("../models/transaction.model");

const controller = {
  userTransactions: (req, res) => {
    const params = req.body;
    console.log(params);

    Transaction.findAll({ where: { user_id: params.user_id } })
      .then((result) => {
        return res.status(200).send({
          message: "success",
          result,
        });
      })
      .catch((err) => {
        return res.status(200).send({
          message: "Something's gone wrong, check the entries",
          err,
        });
      });
  },
  newTransaction: (req, res) => {
    const params = req.body;

    const validate_concept = validator.isEmpty(params.concept);
    const validate_amount = validator.isEmpty(params.amount);
    const validate_date = validator.isEmpty(params.date);
    const validate_type = validator.isEmpty(params.type);
    const validate_user_id = validator.isEmpty(params.user_id);

    if (
      validate_concept ||
      validate_amount ||
      validate_date ||
      validate_type ||
      validate_user_id
    ) {
      return res.status(500).send({
        error: ">>> Some data is missing",
      });
    } else {
      const id = uuidv4();

      Transaction.create({
        id: id,
        concept: params.concept,
        amount: params.amount,
        date: params.date,
        type: params.type,
        user_id: params.user_id,
      })
        .then((transaction) => {
          console.log("<<<<", transaction);
          return res.status(200).send({
            message: ">>> Transaction created successfully",
            transaction,
          });
        })
        .catch((err) => {
          return res.status(200).send({
            message: "Something's gone wrong, check the entries",
            err,
          });
        });
    }
  },
};

module.exports = controller;
