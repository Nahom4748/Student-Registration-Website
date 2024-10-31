import React, { useEffect, useState } from "react";
import axios from "axios";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/students/${selectedStudent._id}`,
        formData
      );
      onUpdate(formData);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full h-full">
      <h3 className="text-xl font-semibold mb-2">Edit Student</h3>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-2">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-1 rounded w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="border border-gray-300 p-1 rounded w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Course</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="border border-gray-300 p-1 rounded w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-700">Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="border border-gray-300 p-1 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-1 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
