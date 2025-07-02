import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './courses.css';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { Link } from 'react-router-dom';


const teamMembers = [
  {
    name: "Ritik Sharma",
    role: "Java Developer",
    img: "/images/m1.png",
    desc: "Builds strong Java-based applications."
  },
  {
    name: "Aditya Verma",
    role: "MERN Developer",
    img: "/images/m2.png",
    desc: "Frontend and backend using MERN."
  },
  {
    name: "Sanya Gupta",
    role: "SQL Expert",
    img: "/images/m3.png",
    desc: "Manages SQL databases."
  },
  {
    name: "Meenal Sharma",
    role: "Soft Skills",
    img: "/images/m5.png",
    desc: "Boosts communication."
  },
  {
    name: "Rajeev Tiwari",
    role: "Sales Mentor",
    img: "/images/m4.png",
    desc: "Guides sales skills."
  },
  {
    name: "Shreya Singh",
    role: "MongoDB Specialist",
    img: "/images/m6.png",
    desc: "Works with NoSQL data models."
  },
  {
    name: "Sachin Sahu",
    role: "Node.js Developer",
    img: "/images/m7.png",
    desc: "Builds backend services in Node.js."
  }
];

function Courses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("https://mpif-skillhub.onrender.com/courses");
      setCourses(res.data);
    } catch (err) {
      setError('Failed to fetch courses');
    }
  };

  return (
    <>
      <Header />
      <section className="courses-section">
        {error && <p className="error-msg">{error}</p>}
        {!error && courses.length === 0 && <p className="loading-msg">Loading courses...</p>}
        
        <div className="course-grid">
          {courses.map((course) => (
            <div className="course-card" key={course._id}>
              <h4>{course.title}</h4>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Price:</strong> ₹{course.price}</p>
              <p><strong>Eligibility:</strong> {course.eligibility}</p>
              
              {course.modules?.length > 0 && (
                <div>
                  <p><strong>Modules:</strong></p>
                  <ul>{course.modules.map((m, i) => <li key={i}>{m}</li>)}</ul>
                </div>
              )}

              {course.perks?.length > 0 && (
                <div>
                  <p><strong>Perks:</strong></p>
                  <ul>{course.perks.map((p, i) => <li key={i}>{p}</li>)}</ul>
                </div>
                
              )}
        {course.title === "Business Relationship Excellence Program" && (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <Link to="/course/relationship-excellence">
      <button className="btn btn-outline-primary">View Full Details</button>
    </Link>
  </div>
)}

{course.title === "Information Technology Excellence Program" && (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <Link to="/course/it-excellence">
      <button className="btn btn-outline-primary">View Full Details</button>
    </Link>
  </div>
)}


            </div>
          ))}
        </div>
      </section>
      <div className="scroll-container">
        <h2 className="o">Our Team</h2>
  <div className="team-container">
    {[...teamMembers, ...teamMembers].map((member, index) => (
      <div className="team-card" key={index}>
        <img src={member.img} alt={member.name || "Team Member"} />
        <h3>{member.name}</h3>
        <p className="role">{member.role}</p>
        <p>{member.desc}</p>
      </div>
    ))}
  </div>
</div>

      <Footer />
    </>
  );
}

export default Courses;
