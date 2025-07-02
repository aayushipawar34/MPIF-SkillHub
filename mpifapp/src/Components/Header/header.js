import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
const [role, setRole] = useState(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
     localStorage.removeItem("user");
     localStorage.removeItem("role"); 
    setIsLoggedIn(false);
    setRole(null);
    navigate("/");
    window.location.reload();
  };

  const handleCollaborateClick = () => {
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/collaborate");
  } else {
    navigate("/sign-in");
  }
};

  return (
    <header>
      <div className="navbar">
        <div className="logo">
          <img
            src="/images/n4.png"
            alt="MPIF SkillHub Logo"
            className="logo-img"
          />
        </div>

        <nav>
  <Link to="/">Home</Link>

  {role !== "admin" && (
    <>
      <Link to="/courses">Courses</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <span onClick={handleCollaborateClick} className="nav-link">
        Collaborate
      </span>
    </>
  )}
  {isLoggedIn && role !== "admin" && (
  <Link to="/admission">Admission</Link>
)}

  {role === "admin" && (
    <>
      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/courses">Manage Courses</Link>
      <Link to="/admin/batch">Manage Batch</Link>
      <Link to="/admin/admissions">Manage Admissions</Link>
      <Link to="/admin/reports">Contact Reports</Link>
      <Link to="/admin/collaborationreports">Collaboration Reports</Link>
    </>
  )}

  {!isLoggedIn ? (
    <>
      <Link to="/sign-in">Sign In</Link>
      <Link to="/sign-up" className="signup-btn">Sign Up</Link>
    </>
  ) : (
    <>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <Link to="/my-profile" className="profile-link">
  <FontAwesomeIcon icon={faUserCircle} size="lg" />
</Link>
    </>
  )}
</nav>
  </div>
    </header>
  );
};

export default Header;
