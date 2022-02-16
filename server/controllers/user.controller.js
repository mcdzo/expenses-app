const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const User = require("../models/user.model");

const controller = {
  getUsers: async (req, res) => {
    const users = await User.findAll();
    res.status(200).send({
      status: "success",
      users,
    });
  },
  register: (req, res) => {
    //validar los datos

    const params = req.body;

    console.log(params);

    const validate_name = !validator.isEmpty(params.name);
    const validate_surname = !validator.isEmpty(params.surname);
    const validate_username = !validator.isEmpty(params.username);
    const validate_password = !validator.isEmpty(params.password);

    if (
      validate_name &&
      validate_surname &&
      validate_username &&
      validate_password
    ) {
      //verificar que el usuario sea un usuario nuevo

      User.findOne({
        where: {
          username: params.username,
        },
      }).then((data) => {
        console.log(data);
        if (data !== null) {
          console.log("That username alredy exists");
          return res.status(200).send({
            message: ">>> That username alredy exists",
            value: false,
            data,
          });
        }

        const id = uuidv4();
        const encryptedPassword = bcrypt.hashSync(params.password, 10);
        const token = jwt.sign(
          { id: id, username: params.username },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        const user = {
          id: id,
          name: params.name,
          surname: params.surname,
          username: params.username,
        };
        User.create({
          id: id,
          name: params.name,
          surname: params.surname,
          username: params.username,
          password: encryptedPassword,
        }).then(() => {
          return res.status(200).send({
            status: "success",
            message: ">>> User created successfully",
            value: true,
            user: user,
            jwt: token,
          });
        });
      });
    } else {
      return res.status(500).send({
        error: ">>> Some data is missing",
      });
    }
  },

  login: (req, res) => {
    const params = req.body;

    console.log(params);

    const validate_username = !validator.isEmpty(params.username);
    const validate_password = !validator.isEmpty(params.password);

    if (validate_username && validate_password) {
      //verificar que el usuario este registrado y que la contraseña sea correcta

      User.findOne({
        where: {
          username: params.username,
        },
      }).then((result) => {
        if (result === null) {
          console.log("That username doesnt exists");
          return res.status(200).send({
            status: "error",
            value: false,
            result: "invalid username",
          });
        }

        console.log(result);

        if (bcrypt.compareSync(params.password, result.password)) {
          const token = jwt.sign(
            { id: result.id, username: result.username },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          result.token = token;
          const user = {
            id: result.id,
            name: result.name,
            surname: result.surname,
            username: result.username,
          };
          res.status(200).send({
            status: "success",
            value: true,
            user: user,
            jwt: result.token,
          });
        } else {
          console.log("Incorrect password");
          return res.status(200).send({
            status: "invalid password",
            value: false,
          });
        }
      });
    } else {
      return res.status(400).send({
        status: "some data is missing",
        value: false,
      });
    }
  },
};

module.exports = controller;
