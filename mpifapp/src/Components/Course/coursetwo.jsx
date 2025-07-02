import React from 'react';
import './courseone.css';
import Header from '../Header/header';
import Footer from '../Footer/footer';

const CourseTwo = () => {
    return (
        <>
            <Header />

            <div className="course-banner">
                <img src="/images/bgv4.jpg" alt="IT Program Banner" />
                <div className="banner-text">
                    <h1>Information Technology Excellence Program</h1>
                    <p>Master Full-Stack Development, App Building & UI/UX Design</p>
                </div>
            </div>

            <div className="course-detail-container">
                <h2>About the Course</h2>
                <p>
                    The <strong>Information Technology Excellence Program</strong> is designed for aspiring tech professionals who want to excel in software development, app creation, and UI/UX design. Over the course of 1 year, participants will build strong foundations in full-stack technologies, real-world projects, and communication essentials.
                </p>
                <p>
                    This program is completely <strong>free</strong> and best suited for students in 2nd/3rd year or fresh graduates from BA, B.Com, BBA, and BCA backgrounds. It's a unique blend of technical training, hands-on app development, and design thinking, making you job-ready for IT careers.
                </p>

                <h3>Modules</h3>
                <ul>
                    <li>
                        <strong>Full-Stack Web Development:</strong>
                        Learn frontend (HTML, CSS, JavaScript, React) and backend (Node.js, Express.js, MongoDB) technologies to build end-to-end web applications.
                    </li>
                    <li>
                        <strong>App Development:</strong>
                        Build real mobile apps using frameworks like React Native and understand deployment practices.
                    </li>
                    <li>
                        <strong>UI/UX Designing:</strong>
                        Design user-friendly interfaces and experiences using tools like Figma, Adobe XD, and design principles.
                    </li>
                    <li>
                        <strong>Communication Skills:</strong>
                        Enhance presentation, interpersonal, and business communication required in team-based IT roles.
                    </li>
                    <li>
                        <strong>Personality & Grooming:</strong>
                        Professional appearance, confidence, teamwork, and interview preparation for software roles.
                    </li>
                </ul>

                <h3>Perks</h3>
                <div className="perk-gallery">
                    <div className="perk-card">
                        <img src="/images/bg13.jpg" alt="Project Training" />
                        <div className="perk-text">
                            <h4>Project Training</h4>
                            <p>Work on real-world industry projects and get mentorship from experts.</p>
                        </div>
                    </div>

                    <div className="perk-card">
                        <img src="/images/bg9.jpg" alt="Placement" />
                        <div className="perk-text">
                            <h4>Placement Support</h4>
                            <p>Complete guidance for job applications, interview preparation, and resume building.</p>
                        </div>
                    </div>

                    <div className="perk-card">
                        <img src="/images/bg8.jpg" alt="Job Assistance" />
                        <div className="perk-text">
                            <h4>Job Assistance</h4>
                            <p>Our team connects you with companies hiring in IT and software development.</p>
                        </div>
                    </div>
                </div>

                <h3>Course in Action</h3>
                <div className="image-gallery">
                    <div className="gallery-card">
                        <img src="/images/bg10.jpg" alt="Coding Workshop" />
                        <p>Hands-on coding sessions with expert trainers</p>
                    </div>
                    <div className="gallery-card">
                        <img src="/images/bg11.jpg" alt="UI/UX Session" />
                        <p>Designing interfaces and experiences in live workshops</p>
                    </div>
                    <div className="gallery-card">
                        <img src="/images/bg12.jpg" alt="Group Project" />
                        <p>Collaborative group project development and presentations</p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default CourseTwo;
