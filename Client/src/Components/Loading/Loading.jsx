// Loading.jsx
import React from "react";
import graduationHat from "../../assets/images/3d-illustration-academic-hat-with-golden-tassel.png"; // Adjust the path as necessary

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      {/* Animated Graduation Hat */}
      <img
        src={graduationHat}
        alt="Loading..."
        className="w-32 h-auto animate-bounce mb-4"
      />

      {/* Loading Text */}
      <h1 className="text-3xl font-bold animate-pulse">Loading...</h1>

      {/* Subtext */}
      <p className="text-lg mt-2">
        Please wait while we prepare the best experience for you.
      </p>

      {/* Optional Spinner */}
      <div className="mt-6">
        <div className="w-10 h-10 border-4 border-t-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
