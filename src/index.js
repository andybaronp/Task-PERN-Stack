const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// Initialize the app
const app = express();

const taskRoutes = require("./routes/task.routes");
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// Routes
app.use(taskRoutes);

// Errors
app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
