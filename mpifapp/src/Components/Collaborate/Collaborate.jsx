import React, { useState } from 'react';
import './Collaborate.css';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { FaCheckCircle } from 'react-icons/fa';
import { submitCollaboration } from '../../Utils/api';

const CollaborationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    joinmessage: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await submitCollaboration(formData);
    if (res.status === 200) {
      alert("Collaboration request submitted successfully!");
      setFormData({
        name: '',
        email: '',
        organization: '',
        joinmessage: '',
      });
    } else {
      alert(res.data.message || "Something went wrong.");
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Please try again later.");
  }
};

  return (
    <>
      <Header />

      <section className="hero">
        Join Our Collaboration Program <br />
        Empower Underprivileged Students with IT Skills
      </section>

      <h2 className='head'>About the Program</h2>
      <p className='pop'>
        The foundation's primary mission is to empower underprivileged individuals through education and skill development, especially in the fields of computer technology and business management.
        Through initiatives like the <strong className='coll'>Information Technology Excellence Program (ITEP)</strong> and the <strong className='coll'>Business Management Excellence Program (MBEP)</strong>, MPIF SkillHub provides free, high-quality training to help individuals gain industry-relevant skills, improve their confidence, and secure better career opportunities.
        MPIF SkillHub collaborates with IT companies, industry mentors, and professional volunteers to ensure students receive both technical knowledge and real-world business understanding. These collaborations help deliver expert-led sessions, career guidance, and job placement assistance for learners from underprivileged backgrounds.
        By supporting both IT-focused learners and those inclined toward business and management roles, MPIF SkillHub aims to create a well-rounded, skilled workforce ready to contribute to the nation's digital and economic growth.
      </p>

      <h2 className='f-w'>Why Collaborate With Us?</h2>
      <section className="benefits">
        <div className="benefit-card">
          <h3>Skill Development</h3>
          <p>Help students gain practical, industry-relevant skills.</p>
        </div>
        <div className="benefit-card">
          <h3>Social Impact</h3>
          <p>Make a meaningful difference in underserved communities.</p>
        </div>
        <div className="benefit-card">
          <h3>Networking</h3>
          <p>Connect with like-minded organizations and professionals.</p>
        </div>
        <div className="benefit-card">
          <h3>Recognition</h3>
          <p>Feature your brand on our platform as a trusted partner.</p>
        </div>
      </section>

      <section className="info-sections">
        <div className="info-row">
          <div className="info-image">
            <img src="/images/how.png" alt="How It Works" />
          </div>
          <div className="info-content">
            <h1>How It Works</h1>
            <p>Start your journey in 4 easy steps:</p>
            <ul>
              <li> <FaCheckCircle className="icon" />Sign Up or Apply for Partnership</li>
              <li> <FaCheckCircle className="icon" />Review & Onboarding</li>
              <li> <FaCheckCircle className="icon" />Training & Mentorship</li>
              <li> <FaCheckCircle className="icon" />Support Placements & Feedback</li>
            </ul>
            <div className="btn-wrapper2">
              <button
                className="info-bt"
                onClick={() => document.getElementById('joinForm').scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started →
              </button>
            </div>
          </div>
        </div>

        <div className="info-row reverse">
          <div className="info-image">
            <img src="/images/how2.png" alt="Eligibility" />
          </div>
          <div className="info-content">
            <h1>Eligibility</h1>
            <p>Who can collaborate with us?</p>
            <ul>
              <li><FaCheckCircle className="icon" />IT companies, startups, educational institutions</li>
              <li><FaCheckCircle className="icon" />Passionate volunteers and mentors</li>
              <li><FaCheckCircle className="icon" />Social impact-driven organizations</li>
            </ul>
            <div className="btn-wrapper">
              <button
                className="info-bt"
                onClick={() => document.getElementById('joinForm').scrollIntoView({ behavior: 'smooth' })}
              >
                Apply Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      <h2 className='f-w'>Join Us Today</h2>
      <div className="form-wrapper" id="joinForm">
        <form className="collab-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Contact Person Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="organization">Organization Name</label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="Your organization name"
          />

          <label htmlFor="joinmessage">Why do you want to collaborate?</label>
          <textarea
            id="joinmessage"
            name="joinmessage"
            value={formData.joinmessage}
            onChange={handleChange}
            placeholder="Your message"
            rows="4"
          ></textarea>

          <button type="submit">Submit Application</button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default CollaborationPage;
