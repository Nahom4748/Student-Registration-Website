// Import necessary modules
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

// Define routes for student-related operations
// POST /students - Creates a new student record
router.post("/students", studentController.createStudent);

// GET /students - Retrieves all student records
router.get("/students", studentController.getStudents);

// PUT /students/:id - Updates an existing student record by ID
router.put("/students/:id", studentController.updateStudent);

// DELETE /students/:id - Deletes a student record by ID
router.delete("/students/:id", studentController.deleteStudent);

// Export the router for use in the main application
module.exports = router;
