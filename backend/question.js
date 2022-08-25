const { Router } = require("express");
const { getDB } = require("./db");
const { ObjectId } = require("mongodb");

const QuestionRouter = Router();

QuestionRouter.post("/upload", async function (req, res, next) {
  const reqBody = req.body;
  let { question, ownerId, courseCode, courseTitle } = reqBody;

  ownerId = new ObjectId(ownerId);

  try {
    const db = await getDB();
    const col = db
      .collection("questions")
      .insertOne({ ownerId, question, courseCode, courseTitle });

    res.status(201).json({ message: "success" });
  } catch (e) {
    console.log("ERROR: ", e.message);
    next(new Error());
  }
});

QuestionRouter.post("/download", async function (req, res, next) {
  const reqBody = req.body;
  let { ownerId } = reqBody;

  ownerId = new ObjectId(ownerId);

  try {
    const db = await getDB();
    const result = await db.collection("questions").find({ ownerId }).toArray();

    if (result.length < 1) {
      res.status(400).json({ message: "No question uploaded" });
      return;
    }

    res.status(200).json({ result });
  } catch (e) {
    console.log("ERROR: ", e.message);
    next(new Error());
  }
});

QuestionRouter.post("/get-one", async function (req, res, next) {
  const reqBody = req.body;
  let { courseCode } = reqBody;

  try {
    const db = await getDB();
    const result = await db.collection("questions").findOne({ courseCode });

    if (!result) {
      res
        .status(200)
        .json({ message: "No question found with the course code" });
      return;
    }

    res
      .status(200)
      .json({ question: result.question, ownerId: result.ownerId });
  } catch (e) {
    console.log("ERROR: ", e.message);
    next(new Error());
  }
});

QuestionRouter.post("/save-result", async function (req, res, next) {
  const reqBody = req.body;
  let { studentID, lecturerID, courseCode, score } = reqBody;

  try {
    const db = await getDB();
    await db
      .collection("results")
      .insertOne({ studentID, lecturerID, courseCode, score });

    res.status(200).json({ mesage: "uploaded" });
  } catch (e) {
    console.log("ERROR: ", e.message);
    next(new Error());
  }
});

QuestionRouter.post("/get-student-result", async function (req, res, next) {
  const reqBody = req.body;
  let { studentID } = reqBody;

  try {
    const db = await getDB();
    const re = await db.collection("results").find({ studentID }).toArray();

    res.status(200).json({ result: re });
  } catch (e) {
    console.log("ERROR: ", e.message);
    next(new Error());
  }
});

QuestionRouter.post("/get-lecturer-result", async function (req, res, next) {
  const reqBody = req.body;
  let { lecturerID } = reqBody;

  try {
    const db = await getDB();
    const re = await db.collection("results").find({ lecturerID }).toArray();

    res.status(200).json({ result: re });
  } catch (e) {
    console.log("ERROR: ", e.message);
    next(new Error());
  }
});

module.exports = QuestionRouter;
