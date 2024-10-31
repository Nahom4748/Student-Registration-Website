import axios from "axios";

// Base URL for the API endpoints
const api_url = "http://localhost:5000/api";

const createStudent = async (studentData) => {
  try {
    // Send a POST request to the API to create a new student
    const response = await axios.post(`${api_url}/students`, studentData);

    // Return the response data, assuming the server responds with JSON
    return response.data;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error creating student:", error);

    // Rethrow the error to allow it to be handled elsewhere in the application
    throw error;
  }
};

const getAllStudent = async () => {
  try {
    const response = await axios.get(`${api_url}/students`);
    console.log(response.data);
    return response.data; // Assuming the server responds with JSON
  } catch (error) {
    console.error("Error fetching Students:", error);
    throw error; // Rethrow the error to handle it elsewhere
  }
};

const deleteStudent = async (id) => {
  console.log(id);
  // Construct the URL for the DELETE request, ensuring the correct format
  const url = `${api_url}/students/${id}`;

  try {
    // Send a DELETE request to the API to delete the student by ID
    const response = await axios.delete(url);

    // Return the response data, assuming the server responds with JSON
    return response.data;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error deleting student:", error);

    // Rethrow the error to allow it to be handled elsewhere in the application
    throw error;
  }
};
const StudentService = {
  createStudent,
  getAllStudent,
  deleteStudent,
};

export default StudentService;
