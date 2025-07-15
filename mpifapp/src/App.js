import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import SignUp from './Components/signUpComponent/signUp';
import SignIn from './Components/signInComponent/signIn';
import Home from "./Components/homepageComponent/home";
import ViewProfile from "./Components/Profile/MyProfile";
import EditProfile from "./Components/Profile/EditProfile";
import Courses from "./Components/Course/course";
import AboutUs from "./Components/About/about";
import Contact from "./Components/Contact/Contact";
import Addmision from "./Components/Addmision/Admision";
import CollaborationPage from "./Components/Collaborate/Collaborate";
import AdminDashboard from "./Admin/Components/admin";
import ManageAdmissions from "./Admin/Components/manageaddmission";
import ManageCourses from "./Admin/Components/admincourse/managecourse";
import ManageContact from "./Admin/Components/admincourse/reports";
import ManageCollaboration from "./Admin/Components/admincourse/collaborationreports";
import CourseOne from './Components/Course/courseone';
import CourseTwo from './Components/Course/coursetwo';
import AdminBatchPanel from "./Admin/Components/adminaddbatch";
import ForgotOrResetPassword from "./Components/signInComponent/ForgotPassword";
const AutoLogout = () => {
  const navigate = useNavigate();


useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/sign-in");
      }
    } catch (error) {
      console.error("Invalid token", error);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/sign-in");
    }
  }
}, [navigate]);

  return null;
};

const App = () => {
  return (
    <Router>
      <AutoLogout />
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotOrResetPassword />} />
        <Route path="/__/auth/handler" element={<div>Redirecting...</div>} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/my-profile" element={<ViewProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admission" element={<Addmision />} />
        <Route path="/collaborate" element={<CollaborationPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/admissions" element={<ManageAdmissions />} />
        <Route path="admin/courses" element={<ManageCourses />} />
        <Route path="admin/reports" element={<ManageContact />} />
        <Route path="admin/collaborationreports" element={<ManageCollaboration />} />
        <Route path="/course/relationship-excellence" element={<CourseOne />} />
        <Route path="/course/it-excellence" element={<CourseTwo />} />
        <Route path="/admin/batch" element={<AdminBatchPanel/>} />
        
      </Routes>
    </Router>
  );
};

export default App;
