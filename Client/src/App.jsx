// App.jsx

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentForm from "./Components/StudentForm/StudentForm";
import StudentList from "./Components/StudentList/StudentList";
import Banner from "./Components/Banner/Banner";
import Header from "./Components/Header/Header";
import About from "./Components/About/About";
import Loading from "./Components/Loading/Loading";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Set loading time for 2 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (loading) {
    return <Loading />; // Show loading screen while loading
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/register" element={<StudentForm />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
