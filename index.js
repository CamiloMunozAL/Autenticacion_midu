import express from "express";
import { UserRepository } from "./user-repository.js";

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Endpoints
app.post("/login", (req, res) => {
  res.send("<h1>login</h1>");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const id = UserRepository.create({ username, password });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/logout", (req, res) => {
  res.send("<h1>logout</h1>");
});

app.get("/protected", (req, res) => {
  res.send("<h1>protected</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
