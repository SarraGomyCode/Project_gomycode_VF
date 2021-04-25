const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
// routes
const usersRouter = require("./routes/users");
const clientsRouter = require("./routes/clients");
const rapportRouter = require("./routes/rapports");

require("dotenv").config();

//create server
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// database
const bdURI = process.env.ATLAS_URI;

mongoose
  .connect(bdURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port))
  .catch((err) => console.log(err.message));

//redirect
app.get("/", (req, res) => {
  res.redirect("/users");
});

//request
app.use("/users", usersRouter);
app.use("/clients", clientsRouter);
app.use("/rapports", rapportRouter);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  });
}

// 404
app.use((req, res) => {
  res.send("404");
  res.status(404);
});
