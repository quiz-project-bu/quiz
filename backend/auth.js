const { Router } = require("express");
const { getDB } = require("./db");

const AuthRouter = Router();

AuthRouter.post("/signup", async function (req, res, next) {
  const reqBody = req.body;
  const { type, id, password } = reqBody;

  try {
    const db = await getDB();
    await db.collection("users").insertOne({
      type,
      id,
      password,
    });

    res.status(201).json({ message: "Account created successfully" });
  } catch (e) {
    console.log("ERROR: ", e.message);
    next(new Error());
  }
});

AuthRouter.post("/signin", async function (req, res, next) {
  const reqBody = req.body;
  const { type, id, password } = reqBody;

  try {
    const db = await getDB();
    const re = await db.collection("users").findOne({
      type,
      id,
      password,
    });

    if (!re) {
      res.status(200).json({ message: "Error" });
      return;
    }

    res.status(200).json({ message: re._id.toString(), type: re.type });
  } catch (e) {
    console.log("ERROR: ", e.message);
    next(new Error());
  }
});

module.exports = AuthRouter;
