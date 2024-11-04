// Import essential modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require("./routes/student.routes");

// Initialize Express application
const app = express();

// Enable Cross-Origin Resource Sharing for all routes
app.use(cors());

// Enable JSON request parsing
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose
  .connect("mongodb://localhost:27017/Test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Use student routes for handling /api requests
app.use("/api", studentRoutes);

// Define the server port and start listening for incoming requests
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
