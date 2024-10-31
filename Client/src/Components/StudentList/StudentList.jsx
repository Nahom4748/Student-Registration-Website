import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentForm from "./StudentEditForm/StudentEditForm";
import StudentService from "../../Service/Student.service";

const StudentList = () => {
  const [students, setStudents] = useState([]); // State to manage the list of students
  const [selectedStudent, setSelectedStudent] = useState(null); // State to manage the selected student for editing
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage the delete confirmation modal
  const [studentToDelete, setStudentToDelete] = useState(null); // State to manage the student to delete
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error messages

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await StudentService.getAllStudent();
        setStudents(response);
      } catch (err) {
        setError("Error fetching students. Please try again.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setSelectedStudent(student); // Set the selected student for editing
  };

  const handleUpdate = (updatedStudent) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === selectedStudent._id
          ? { ...student, ...updatedStudent }
          : student
      )
    );
    setSelectedStudent(null); // Reset the selected student after update
  };

  const handleDelete = (student) => {
    setStudentToDelete(student); // Set the student to be deleted
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const confirmDelete = async () => {
    if (studentToDelete) {
      try {
        await StudentService.deleteStudent(studentToDelete._id); // Pass the student ID for deletion

        setStudents(
          students.filter((student) => student._id !== studentToDelete._id)
        );
        setIsDeleteModalOpen(false);
        setStudentToDelete(null); // Reset the student to delete after deletion
      } catch (error) {
        console.error("Error deleting student:", error);
        setError("Error deleting student. Please try again."); // Set error message if deletion fails
      }
    }
  };

  if (loading) {
    return <div className="text-center">Loading students...</div>; // Loading state
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>; // Error state
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
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Age</th>
              <th className="py-3 px-4 border-b">Course</th>
              <th className="py-3 px-4 border-b">Contact</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student._id}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">{student.age}</td>
                <td className="py-2 px-4">{student.course}</td>
                <td className="py-2 px-4">{student.contact}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Display the StudentForm next to the table */}
      <div className="w-2/5 ml-6 flex-shrink-0">
        {selectedStudent && (
          <StudentForm
            selectedStudent={selectedStudent}
            onUpdate={handleUpdate}
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete {studentToDelete?.name}?</p>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsDeleteModalOpen(false)}
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
