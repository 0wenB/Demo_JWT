require("dotenv").config();

const cors = require("cors");
const express = require("express");
const Controller = require("./controller/controller");
const authentication = require("./middlewares/authentication");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/login", Controller.login);

app.use(authentication); //all the route below this, will trigger the authentication

app.get("/secret", Controller.secret);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
