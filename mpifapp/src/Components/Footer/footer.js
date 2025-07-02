
import React from "react";
import { Link } from "react-router-dom";
import "./footer.css"; 

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
          <div className="logo">
          <img
            src="/images/n4.png"
            alt="MPIF SkillHub Logo"
            className="logo-img"
          />
        </div>

         <section className="contact-box">
  <div className="contact-row">
    <h1>Get In Touch With Us</h1>
    <Link to="/contact">
    <button className="c-btn">Contact Us</button>
    </Link>
  </div>
</section>

        <nav className="footer-links">
          <Link to="/courses">Courses</Link>
          <Link to="/about">About</Link>
          <Link to="/collaborate">Collaborate</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/sign-in">Login</Link>
        </nav>
        <p className="footer-contact">Polo Ground, INDORE | 9997775656</p>
      </div>
      <hr></hr>
       <p>© All Rights Reserved 2025 - MPIF SkillHub</p>
    </footer>
  );
};

export default Footer;
