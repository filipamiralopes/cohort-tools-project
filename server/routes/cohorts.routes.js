const router = require("express").Router();
const Cohort = require("../models/Cohort.model");

router.get("/", (req, res) => {
  Cohort.find()
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    });
});

router.get("/:cohortId", (req, res) => {
  Cohort.findById(req.params.cohortId)
    .then((cohort) => {
      console.log("Retrieved cohort ->", cohort);
      res.status(200).json(cohort);
    })
    .catch((error) => {
      console.error("Error while retrievin cohort ->", error);
      res.status(500).json({ error: "Failed to retrieve cohort" });
    });
});

router.post("/", (req, res) => {
  Cohort.create(req.body)
    .then((newCohort) => {
      console.log("Created cohort ->", newCohort);
      res.status(201).json(newCohort);
    })
    .catch((error) => {
      console.error("Error while creating cohort ->", error);
      res.status(500).json({ error: "Failed to create a new cohort" });
    });
});

router.put("/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      console.log("Updated cohort ->", updatedCohort);
      res.status(201).json(updatedCohort);
    })
    .catch((error) => {
      console.error("Error while updating cohort ->", error);
      res
        .status(500)
        .json({ error: `Failed to update cohort: , ${error["message"]}` });
    });
});

router.delete("/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then((deletedCohort) => {
      console.log("Deleted cohort ->", deletedCohort);
      res.status(200).json(`Cohort with id ${req.params.cohortId} was deleted`);
    })
    .catch((error) => {
      console.error("Error while deleting cohort ->", error);
      res
        .status(500)
        .json({ error: `Failed to delete cohort: , ${error["message"]}` });
    });
});

module.exports = router;
