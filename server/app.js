const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5005;
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

const app = express();

// STATIC DATA
// const cohorts = require("./cohorts.json");
// const students = require("./students.json");

// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"], // Add the URLs of allowed origins to this array
  })
);

// DATABASE
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// ROUTES
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// Cohorts

app.get("/api/cohorts", (req, res) => {
  Cohort.find()
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    });
});

app.get("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findById(req.params.cohortId)
    .then((cohort) => {
      console.log("Retrieved cohort ->", cohort);
      res.json(cohort);
    })
    .catch((error) => {
      console.error("Error while retrievin cohort ->", error);
      res.status(500).json({ error: "Failed to retrieve cohort" });
    });
});

app.post("/api/cohorts", (req, res) => {
  Cohort.create(req.body)
    .then((newCohort) => {
      console.log("Created cohort ->", newCohort);
      res.json(newCohort);
    })
    .catch((error) => {
      console.error("Error while creating cohort ->", error);
      res.status(500).json({ error: "Failed to create a new cohort" });
    });
});

app.put("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      console.log("Updated cohort ->", updatedCohort);
      res.json(updatedCohort);
    })
    .catch((error) => {
      console.error("Error while updating cohort ->", error);
      res.status(500).json({ error: `Failed to update cohort: , ${error["message"]}` });
    });
});

app.delete("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then((deletedCohort) => {
      console.log("Deleted cohort ->", deletedCohort);
      res.json(`Cohort with id ${req.params.cohortId} was deleted`);
    })
    .catch((error) => {
      console.error("Error while deleting cohort ->", error);
      res.status(500).json({ error: `Failed to delete cohort: , ${error["message"]}` });
    });
});

// Students

app.get("/api/students", (req, res) => {
  Student.find()
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

app.get("/api/students/cohort/:cohortId", (req, res) => { // Returns all the students of a specified cohort in JSON format
  Student.find({cohort: req.params.cohortId})
    .then((students) => {
      console.log("Retrieved students for this cohort ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

app.get("/api/students/:studentId", (req, res) => {
  Student.findById(req.params.studentId)
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

app.post("/api/students", (req, res) => {
  Student.create(req.body)
    .then((createdStudent) => {
      console.log("Created student ->", createdStudent);
      res.json(createdStudent);
    })
    .catch((error) => {
      console.error("Error while creating student ->", error);
      res.status(500).json({ error: `Failed to create student with name ${req.body.firstName}` });
    });
});

app.put("/api/students/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((updatedStudent) => {
      console.log("Updated student ->", updatedStudent);
      res.json(updatedStudent);
    })
    .catch((error) => {
      console.error("Error while updating student ->", error);
      res.status(500).json({ error: `Failed to update student: , ${error["message"]}` });
    });
});

app.delete("/api/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then((deletedStudent) => {
      console.log("Deleted student ->", deletedStudent);
      res.json(`Student with id ${req.params.studentId} was deleted`);
    })
    .catch((error) => {
      console.error("Error while deleting student ->", error);
      res.status(500).json({ error: `Failed to delete student: , ${error["message"]}` });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});