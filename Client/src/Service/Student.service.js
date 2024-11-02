import axios from "axios";

// Base URL for the API endpoints
const api_url = "http://localhost:5000/api";
//This is a JavaScript function named createStudent that sends a POST request to an API to create a new student. It takes studentData as input, sends the request, and returns the server's response data if successful. If an error occurs, it logs the error and re-throws it for further handling.
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
//This JavaScript function, getAllStudent, makes a GET request to the /students endpoint at the specified api_url using Axios. It logs the response data to the console and returns it. If the request fails, it logs the error and re-throws it for further error handling.
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

//This is a JavaScript function named deleteStudent that sends a DELETE request to a server to delete a student by their ID. It uses the axios library to make the request and handles any errors that may occur.
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

//This is a JavaScript function named updateStudent that sends a PUT request to a server to update a student by their ID. It uses the axios library to make the request, passing in the student's ID and updated data. The function returns the server's response data if successful, or logs and re-throws an error if the request fails.
const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${api_url}/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};
const StudentService = {
  createStudent,
  getAllStudent,
  deleteStudent,
  updateStudent,
};

export default StudentService;
