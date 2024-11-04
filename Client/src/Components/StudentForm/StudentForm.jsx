// StudentForm.js
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaGraduationCap,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";
// Import student service for API calls

import StudentService from "../../Service/Student.service";
const StudentForm = ({ selectedStudent, onUpdate }) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    course: "",
    contact: "",
  });
  // State for success messages
  const [successMessage, setSuccessMessage] = useState("");
  // State for error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Effect to set form data when editing a student
  useEffect(() => {
    if (selectedStudent) {
      setFormData(selectedStudent); // Populate form with selected student data
    } else {
      setFormData({ name: "", age: "", course: "", contact: "" }); // Reset form
    }
  }, [selectedStudent]);
  // Run when selectedStudent changes

  // Handle input changes in the form
  const handleChange = (e) => {
    // If contact field, allow only digits
    if (e.target.name === "contact" && !/^\d*$/.test(e.target.value)) {
      return; // Only allow digits
    }
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update form data state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prevent default form submission
      if (selectedStudent) {
        // If editing a student, call the update API
        await StudentService.updateStudent(selectedStudent._id, formData);
        onUpdate(formData); // Notify parent component to update student list
        setSuccessMessage("Student updated successfully!"); // Success message
      } else {
        // If creating a new student, call the create API
        await StudentService.createStudent(formData);
        setSuccessMessage("Student registered successfully!"); // Success message
      }
      setErrorMessage(""); // Reset error message
      setFormData({ name: "", age: "", course: "", contact: "" }); // Clear form fields
    } catch (error) {
      setErrorMessage(error.message); // Handle error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          {selectedStudent ? "Edit Student" : "Register Student"}
        </h2>
        <div className="flex items-center mb-4">
          <FaUser className="text-gray-400 mr-2" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex items-center mb-4">
          <FaCalendarAlt className="text-gray-400 mr-2" />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex items-center mb-4">
          <FaGraduationCap className="text-gray-400 mr-2" />
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select Course
            </option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="DOM">DOM</option>
            <option value="React">React</option>
            <option value="Next.js">Next.js</option>
            <option value="Tailwind">Tailwind</option>
            <option value="Node.js">Node.js</option>
            <option value="Express.js">Express.js</option>
            <option value="MongoDB">MongoDB</option>
            <option value="MySQL">MySQL</option>
            <option value="Python">Python</option>
          </select>
        </div>
        <div className="flex items-center mb-4">
          <FaPhone className="text-gray-400 mr-2" />
          <input
            type="tel"
            name="contact"
            placeholder="0910000000"
            value={formData.contact}
            onChange={handleChange}
            pattern="\d{10}"
            // Pattern to match exactly 10 digits
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength="10"
            // Limit input length to 10 characters
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
        >
          {selectedStudent ? "Update Student" : "Register Student"}
        </button>
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}{" "}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}{" "}
      </form>
    </div>
  );
};

export default StudentForm;
