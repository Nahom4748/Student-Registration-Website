// Header.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  // State to manage mobile menu visibility

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed  w-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg py-4 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-white text-2xl font-bold">
          <Link to="/" className="hover:text-yellow-400 transition">
            Student<span className="text-yellow-400">Registration</span>
          </Link>
        </div>

        <nav className="space-x-8 hidden md:flex">
          <Link
            to="/register"
            className="text-white text-lg hover:text-yellow-400 hover:underline transition duration-300"
          >
            Register
          </Link>
          <Link
            to="/student-list"
            className="text-white text-lg hover:text-yellow-400 hover:underline transition duration-300"
          >
            Student List
          </Link>
          <Link
            to="/about"
            className="text-white text-lg hover:text-yellow-400 hover:underline transition duration-300"
          >
            About
          </Link>
        </nav>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-gradient-to-r from-purple-600 to-blue-600 mt-2 rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <Link
              to="/register"
              onClick={toggleMenu}
              className="text-white text-lg hover:text-yellow-400 hover:underline transition duration-300 py-2"
            >
              Register
            </Link>
            <Link
              to="/student-list"
              onClick={toggleMenu}
              className="text-white text-lg hover:text-yellow-400 hover:underline transition duration-300 py-2"
            >
              Student List
            </Link>
            <Link
              to="/about"
              onClick={toggleMenu}
              className="text-white text-lg hover:text-yellow-400 hover:underline transition duration-300 py-2"
            >
              About
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
