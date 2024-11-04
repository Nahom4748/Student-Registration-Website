import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendarAlt,
  faBook,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import StudentService from "../../../Service/Student.service";

const StudentForm = ({ selectedStudent, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    course: "",
    contact: "",
  });

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
  //This code updates the formData state by merging the new value of a form field into the existing state. The field to update is determined by the name attribute of the input element that triggered the event (e.target.name).
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //This code snippet defines an asynchronous function named handleSubmit. It is used to handle form submissions. When the function is called, it prevents the default form submission behavior. It then tries to update a student's information using the StudentService.updateStudent method. If the update is successful, it calls the onUpdate function with the updated form data. If there is an error during the update, it logs the error to the console.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await StudentService.updateStudent(selectedStudent._id, formData);
      onUpdate(formData);
    } catch (error) {
      console.error("Error updating student:", error);
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
          <FontAwesomeIcon
            icon={faCalendarAlt}
            className="mr-2 text-gray-600"
          />
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
          className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
        >
          Update Student
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
