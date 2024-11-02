import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendarAlt,
  faBook,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import StudentService from "../../../Service/Student.service"; 
// StudentForm component for editing student information
const StudentForm = ({ selectedStudent, onUpdate }) => {
  // State to store form data for a student, initialized with empty fields
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    course: "",
    contact: "",
  });

  // Effect hook to populate form data when a selected student is passed in
  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        name: selectedStudent.name,
        age: selectedStudent.age,
        course: selectedStudent.course,
        contact: selectedStudent.contact,
      });
    }
  }, [selectedStudent]);
   // Dependencies: triggers when `selectedStudent` changes

  // Event handler to capture input changes and update the `formData` state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, 
      // Dynamically update the relevant field
    }));
  };

  // Function to handle form submission for updating student information
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // Prevent default form submission behavior
    try {
      // Sends updated student data to the backend using StudentService
      await StudentService.updateStudent(selectedStudent._id, formData);
      onUpdate(formData); 
      // Calls onUpdate function to notify the parent component of the change
    } catch (error) {
      console.error("Error updating student:", error); 
      // Log any errors encountered during submission
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full h-full">
      <h3 className="text-2xl font-semibold mb-4 text-center text-indigo-700">
        Edit Student
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-4 flex items-center border-b border-gray-300">
          <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-600" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name" 
            className="border-none p-2 w-full focus:outline-none"
            required 
          />
        </div>

        <div className="mb-4 flex items-center border-b border-gray-300">
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-600" />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="border-none p-2 w-full focus:outline-none"
            required
          />
        </div>

        <div className="mb-4 flex items-center border-b border-gray-300">
          <FontAwesomeIcon icon={faBook} className="mr-2 text-gray-600" />
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Course"
            className="border-none p-2 w-full focus:outline-none"
            required
          />
        </div>

        <div className="mb-4 flex items-center border-b border-gray-300">
          <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-600" />
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact"
            className="border-none p-2 w-full focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
