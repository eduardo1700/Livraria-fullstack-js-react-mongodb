require("dotenv").config();
require("./db");  // Ensure this file sets up a mongoose connection to your MongoDB database.
const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors());

require("./config")(app);


const livroRoutes = require("./routes/livro.routes");
app.use("/livro",livroRoutes)

module.exports = app;

