// backend.js
import express from "express";
import cors from "cors";
import userServices from "./userServices.js"

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(
      `Example app listening at http://localhost:${port}`
    );
});


app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; 
  userServices.findUserById(id)
  .then(users => res.send({users_list:users}))
  .catch(err => res.status(400).send("Resource not found."));
});
  
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userServices.addUser(userToAdd)
  .then(users => res.send({users_list:users}))
  .catch(err => res.status(400).send("Resource not found."));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  userServices.delUser(id)
  .then(users => res.send({users_list:users}))
  .catch(err => res.status(400).send("Resource not found."));
});


app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  userServices.getUsers(name, job)
  .then(users => res.send({users_list:users}))
  .catch(err => res.status(400).send("Resource not found."));
});