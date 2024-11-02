import React, { useEffect, useState } from "react";
import StudentForm from "./StudentEditForm/StudentEditForm"; // Importing student edit form component
import StudentService from "../../Service/Student.service"; // Importing student service for API calls
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for edit and delete

const StudentList = () => {
  // State variables
  const [students, setStudents] = useState([]); // List of students
  const [selectedStudent, setSelectedStudent] = useState(null); // Currently selected student for editing
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Modal visibility state for delete confirmation
  const [studentToDelete, setStudentToDelete] = useState(null); // Student selected for deletion
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [error, setError] = useState(null); // Error state for fetching issues

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await StudentService.getAllStudent(); // Fetching all students
        setStudents(response); // Updating the state with the fetched students
      } catch (err) {
        setError("Error fetching students. Please try again."); // Error handling for fetch
      } finally {
        setLoading(false); // Stop loading state
      }
    };
    fetchStudents(); // Call the fetch function
  }, []);

  // Handle student edit selection
  const handleEdit = (student) => {
    setSelectedStudent(student); // Set the selected student for editing
  };

  // Update student list after edit
  const handleUpdate = (updatedStudent) => {
    setStudents((prevStudents) =>
      prevStudents.map(
        (student) =>
          student._id === selectedStudent._id
            ? { ...student, ...updatedStudent } // Update the student
            : student // Return the unchanged student
      )
    );
    setSelectedStudent(null); // Reset selected student
  };

  // Initiate delete process for a student
  const handleDelete = (student) => {
    setStudentToDelete(student); // Set the student to be deleted
    setIsDeleteModalOpen(true); // Open confirmation modal
  };

  // Confirm deletion of the selected student
  const confirmDelete = async () => {
    if (studentToDelete) {
      try {
        await StudentService.deleteStudent(studentToDelete._id); // Delete the student by ID
        setStudents(
          students.filter((student) => student._id !== studentToDelete._id)
        ); // Remove deleted student from the list
        setIsDeleteModalOpen(false); // Close delete modal
        setStudentToDelete(null); // Reset student to delete
      } catch (error) {
        console.error("Error deleting student:", error);
        setError("Error deleting student. Please try again."); // Error handling for deletion
      }
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="text-center text-xl text-gray-600">
        Loading students...
      </div>
    ); // Loading indicator
  }

  // Render error state
  if (error) {
    return <div className="text-red-500 text-center text-lg">{error}</div>; // Error message
  }

  return (
    <div className="flex p-6 pt-28 bg-gray-50 rounded-lg shadow-lg">
      <div className="w-3/5 overflow-x-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Registered Students
        </h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-indigo-600 text-white text-left">
              <th className="py-3 px-4 border-b text-lg">Name</th>
              <th className="py-3 px-4 border-b text-lg">Age</th>
              <th className="py-3 px-4 border-b text-lg">Course</th>
              <th className="py-3 px-4 border-b text-lg">Contact</th>
              <th className="py-3 px-4 border-b text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student._id}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                <td className="py-2 px-4 text-md">{student.name}</td>
                <td className="py-2 px-4 text-md">{student.age}</td>
                <td className="py-2 px-4 text-md">{student.course}</td>
                <td className="py-2 px-4 text-md">{student.contact}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(student)} // Edit button handler
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200 flex items-center"
                  >
                    <FaEdit className="mr-1" /> {/* Edit icon */}
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student)} // Delete button handler
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200 flex items-center"
                  >
                    <FaTrash className="mr-1" /> {/* Delete icon */}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-2/5 ml-6 flex-shrink-0">
        {selectedStudent && (
          <StudentForm
            selectedStudent={selectedStudent} // Pass selected student for editing
            onUpdate={handleUpdate} // Pass update handler
          />
        )}
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete {studentToDelete?.name}?</p>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmDelete} // Confirm deletion
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsDeleteModalOpen(false)} // Cancel deletion
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
