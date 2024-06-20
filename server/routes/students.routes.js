const router = require("express").Router();
const Student = require("../models/Student.model");

router.get("/", (req, res) => {
  Student.find()
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

router.get("/cohort/:cohortId", (req, res) => {
  // Returns all the students of a specified cohort in JSON format
  Student.find({ cohort: req.params.cohortId })
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students for this cohort ->", students);
      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

router.get("/:studentId", (req, res) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

router.post("/", (req, res) => {
  Student.create(req.body)
    .then((createdStudent) => {
      console.log("Created student ->", createdStudent);
      res.status(201).json(createdStudent);
    })
    .catch((error) => {
      console.error("Error while creating student ->", error);
      res
        .status(500)
        .json({
          error: `Failed to create student with name ${req.body.firstName}`,
        });
    });
});

router.put("/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((updatedStudent) => {
      console.log("Updated student ->", updatedStudent);
      res.status(201).json(updatedStudent);
    })
    .catch((error) => {
      console.error("Error while updating student ->", error);
      res
        .status(500)
        .json({ error: `Failed to update student: , ${error["message"]}` });
    });
});

router.delete("/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then((deletedStudent) => {
      console.log("Deleted student ->", deletedStudent);
      res
        .status(200)
        .json(`Student with id ${req.params.studentId} was deleted`);
    })
    .catch((error) => {
      console.error("Error while deleting student ->", error);
      res
        .status(500)
        .json({ error: `Failed to delete student: , ${error["message"]}` });
    });
});

module.exports = router;
