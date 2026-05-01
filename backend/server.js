const express = require ("express");

const {
  readTeachers,
  readStudents,
  addStudent,
  addTeacher,
  deleteTeacher,
  deleteStudent,
  readStudentInfo,
  readTeacherInfo,
  updateStudent,
  updateTeacher,
  dbinitialize
} = require ("./database.js");

const app = express();
const bodyParser = require  ("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/dbinitialize", async function (req, res) {
  console.log("DB is getting initialized");
  try {
    let data = await dbinitialize();
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error("Error in /dbinitialize:", error);
    res.status(500).send(error.message);
  }
});
// ============== Teacher Related endpoints ==============

app.get("/listTeachers", async function (req, res) {
  console.log("Request received to list teachers");
  try {
    let data = await readTeachers();
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error("Error in /listTeachers:", error);
    res.status(500).send(error.message);
  }
});

app.post("/getTeacherInfo", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to get Teacher Info");
  try {
    let data = await readTeacherInfo(reqBody.id);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error("Error in /getTeacherInfo:", error);
    res.status(500).send(error.message);
  }
});

app.post("/addTeacher", async function (req, res) {
  let reqBody = req.body;
  console.log(
    "Request received to add teacher. Req body: " + JSON.stringify(reqBody)
  );
  try {
    let data = await addTeacher(reqBody.id, reqBody.name, reqBody.age);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error("Error in /addTeacher:", error);
    res.status(500).send(error.message);
  }
});

app.post("/editTeacher", async function (req, res) {
  let reqBody = req.body;
  console.log(
    "Request received to update teacher. Req body: " + JSON.stringify(reqBody)
  );
  try {
    let data = await updateTeacher(reqBody.name,reqBody.age,reqBody.id);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error("Error in /editTeacher:", error);
    res.status(500).send(error.message);
  }
});

app.post("/deleteTeacher", async function (req, res) {
  let reqBody = req.body;
  console.log(
    "Request received to delete teacher. Req body: " + JSON.stringify(reqBody)
  );
  try {
    let data = await deleteTeacher(reqBody.id);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error("Error in /deleteTeacher:", error);
    res.status(500).send(error.message);
  }
});

// ============== Student Related endpoints ==============

app.get("/listStudents", async function (req, res) {
  console.log("Request received to list students");
  try {
    let data = await readStudents();
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error("Error in /listStudents:", error);
    res.status(500).send(error.message);
  }
});

app.post("/getStudentInfo", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to get Student Info");
  try {
    let data = await readStudentInfo(reqBody.id);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error("Error in /getStudentInfo:", error);
    res.status(500).send(error.message);
  }
});

app.post("/addStudent", async function (req, res) {
  let reqBody = req.body;
  console.log(
    "Request received to add student. Req body: " + JSON.stringify(reqBody)
  );
  try {
    let data = await addStudent(
      reqBody.id,
      reqBody.name,
      reqBody.age,
      reqBody.hometown
    );
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error("Error in /addStudent:", error);
    res.status(500).send(error.message);
  }
});

app.post("/deleteStudent", async function (req, res) {
  let reqBody = req.body;
  console.log(
    "Request received to delete student. Req body: " + JSON.stringify(reqBody)
  );
  try {
    let data = await deleteStudent(reqBody.id);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error("Error in /deleteStudent:", error);
    res.status(500).send(error.message);
  }
});

app.post("/editStudent", async function (req, res) {
  let reqBody = req.body;
  console.log(
    "Request received to update Student. Req body: " + JSON.stringify(reqBody)
  );
  try {
    let data = await updateStudent(reqBody.name,reqBody.age,reqBody.hometown,reqBody.id);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error("Error in /editStudent:", error);
    res.status(500).send(error.message);
  }
});

module.exports = app;