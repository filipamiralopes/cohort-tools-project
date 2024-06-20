const express = require("express");
const PORT = 5005;

const app = express();


// MIDDLEWARE
require("./config")(app)

// DATABASE
require("./db");

// ROUTES
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes)
const cohortRoutes = require("./routes/cohorts.routes");
app.use("/api/cohorts", cohortRoutes)
const studentRoutes = require("./routes/students.routes");
app.use("/api/students", studentRoutes)

// ERROR HANDLING
const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/error-handling");

app.use(errorHandler);
app.use(notFoundHandler);


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});