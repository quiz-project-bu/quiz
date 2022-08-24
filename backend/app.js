const express = require("express");
const AuthRouter = require("./auth");
const { getDB } = require("./db");
const QuestionRouter = require("./question");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.status(200).send();
    return;
  }
  next();
});

app.use("/auth", AuthRouter);

app.use("/question", QuestionRouter);

app.use(function (_, _, res, _) {
  res.status(500).json("Operaton failed. Please try again later.");
});

app.listen(3000, async () => await getDB());
