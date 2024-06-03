const cors = require("cors");
const express = require("express");
const app = express();
const routes = require("./src/routes/routes.js");
require("dotenv").config({ path: "server.env" });
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use("/joyas", routes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
