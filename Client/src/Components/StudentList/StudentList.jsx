import React, { useEffect, useState } from "react";
import StudentForm from "./StudentEditForm/StudentEditForm";
import StudentService from "../../Service/Student.service";
import { FaEdit, FaTrash } from "react-icons/fa";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await StudentService.getAllStudent();
        setStudents(response);
      } catch (err) {
        setError("Error fetching students. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setSelectedStudent(student);
  };
  //This code updates a student in the students state array. It finds the student to update by matching the _id of the selectedStudent and merges the updated student data into the existing student object, leaving other students unchanged. After updating, it resets the selectedStudent to null.
  const handleUpdate = (updatedStudent) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === selectedStudent._id
          ? { ...student, ...updatedStudent }
          : student
      )
    );
    setSelectedStudent(null);
  };

  const handleDelete = (student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (studentToDelete) {
      try {
        await StudentService.deleteStudent(studentToDelete._id);
        setStudents(
          students.filter((student) => student._id !== studentToDelete._id)
        );
        setIsDeleteModalOpen(false);
        setStudentToDelete(null);
      } catch (error) {
        console.error("Error deleting student:", error);
        setError("Error deleting student. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-600">
        Loading students...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center text-lg">{error}</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row p-6 pt-28 bg-gray-50 rounded-lg shadow-lg h-screen">
      <div className="overflow-x-auto flex-grow w-full lg:w-3/5">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Registered Students
        </h2>

        {students.length === 0 ? (
          <div className="text-center text-lg text-gray-600">
            No student records yet.
          </div>
        ) : (
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
                      onClick={() => handleEdit(student)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200 flex items-center"
                    >
                      <FaEdit className="mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200 flex items-center"
                    >
                      <FaTrash className="mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="w-full lg:w-2/5 ml-0 lg:ml-6 flex-shrink-0 flex flex-col mt-4 lg:mt-0">
        {selectedStudent && (
          <StudentForm
            selectedStudent={selectedStudent}
            onUpdate={handleUpdate}
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
