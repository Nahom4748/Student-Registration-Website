// Banner.jsx

import React from "react";
import bannerImage from "../../assets/images/education-day-arrangement-table-with-copy-space.jpg";
import graduationHat from "../../assets/images/3d-illustration-academic-hat-with-golden-tassel.png"; // Adjust the path as necessary
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>

      {/* Banner Content */}
      <div className="relative z-10 text-center px-6 space-y-6">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white animate-bounce tracking-wide mb-2">
          <span className="text-yellow-500">Welcome</span> to the Student
          Registration Website
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-2xl lg:text-3xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Challenge prepared by Qamer Software Technology PLC
        </p>

        {/* Buttons */}
        <div className="flex space-x-4 justify-center">
          <Link
            to="/register" // Adjust the path as per your routing
            className="px-8 py-3 bg-indigo-600 text-white rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg"
          >
            Register Student
          </Link>
          <Link
            to="/student-list" // Adjust the path as per your routing
            className="px-8 py-3 bg-gray-100 text-indigo-600 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg"
          >
            Student List
          </Link>
        </div>
      </div>

      {/* Graduation Hat Image */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
        <img
          src={graduationHat}
          alt="Graduation Hat"
          className="w-32 h-auto animate-bounce" // Adjust size as needed
        />
      </div>

      {/* Custom CSS for Bounce Animation */}
      <style>
        {`
          .animate-bounce {
            animation: bounce 2s infinite;
          }

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-15px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Banner;