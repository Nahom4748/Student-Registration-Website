// About.jsx
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-4xl bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-600">
          About This Project
        </h2>

        <p className="text-lg text-gray-700">
          This project is a full-stack coding challenge prepared by Qamer
          Software Technology PLC. It aims to evaluate my skills in both
          frontend and backend development.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800">
          Project Overview
        </h3>
        <p className="text-lg text-gray-700">
          This project is a CRUD application for a student system, consisting of
          a Student Registration website with the following main features:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Student Registration Form:</strong> A user-friendly form
            where users can register as students by providing basic details like
            name, age, course, and contact information.
          </li>
          <li>
            <strong>Registered Students List:</strong> A dynamically populated
            page displaying the list of all registered students.
          </li>
          <li>
            <strong>Edit and Delete Functions:</strong> Users can edit or delete
            student records as needed.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">
          Technologies Used
        </h3>
        <h4 className="text-lg font-semibold text-gray-800">Frontend:</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>React: For building the user interface.</li>
          <li>
            Tailwind CSS: For styling the components and ensuring a responsive
            design.
          </li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-800">Backend:</h4>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Node.js: For server-side development.</li>
          <li>Express: For creating the RESTful API to handle student data.</li>
          <li>
            MongoDB: For data persistence, storing all registered students'
            information.
          </li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800">
          Contact Information
        </h3>
        <p className="text-lg text-gray-700">Name: Nahom Hambissa</p>
        <p className="text-lg text-gray-700">
          Email:{" "}
          <a
            href="mailto:Nahom4748@gmail.com"
            className="text-indigo-600 hover:underline"
          >
            Nahom4748@gmail.com
          </a>
        </p>

        <p className="text-lg text-gray-700">
          This project has been a valuable opportunity to apply my knowledge and
          skills in full-stack development. Thank you for viewing my work!
        </p>
      </div>
    </div>
  );
};

export default About;
