const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user.routes");
const transactionRoutes = require("./routes/transaction.routes");
const db = require("./db/database");

const app = express();
const url = "http://localhost:3001";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(cors({ origin: url }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

try {
  db.authenticate();
  console.log("Conexion a la base de datos exitosa!");
  app.listen(3001, (req, res) => {
    console.log("server running on PORT 3001");
  });
} catch (err) {
  if (err) throw err;
}

app.use("/api", userRoutes);
app.use("/api", transactionRoutes);

module.exports = app;
