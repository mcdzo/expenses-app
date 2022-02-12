const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const { Op } = require("sequelize");

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
        if (data !== null) {
          console.log("That username alredy exists");
          return res.status(200).send({
            message: ">>> That username alredy exists",
          });
        }
        const id = uuidv4();
        const encryptedPassword = bcrypt.hashSync(params.password, 10);
        User.create({
          id: id,
          name: params.name,
          surname: params.surname,
          username: params.username,
          password: encryptedPassword,
        }).then(() => {
          return res.status(500).send({
            message: ">>> User created successfully",
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
      }).then((user) => {
        if (user === null) {
          return res.status(500).send({
            error: ">>> That username doesn´t exists ",
          });
        }

        console.log(user);

        if (bcrypt.compareSync(params.password, user.password)) {
          console.log("la contraseña es correcta");

          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          user.token = token;
          res.status(200).send({
            status: "success",
            value: true,
            user: user, ///hace falta que devuelva el user?
            jwt: user.token,
          });
          console.log(user.token);
        } else {
          console.log("la contraseña no es correcta");
          res.status(400).send(">>> (!) Contraseña incorrecta");
        }
      });
    }
  },
};

module.exports = controller;

/*
    
      where: {
          [Op.or]: [{ email: params.email }, { username: params.username }],
        }, 
        
        */
