import React from 'react';
import './courseone.css';
import Header from '../Header/header';
import Footer from '../Footer/footer';

const CourseOne = () => {
    return (
        <>
            <Header />
            <div className="course-banner">
                <img src="/images/bg1.jpg" alt="Business Banner" />
                <div className="banner-text">
                    <h1>Business Relationship Excellence Program</h1>
                    <p>Master the art of sales, communication, and digital marketing</p>
                </div>
            </div>
            
            <div className="course-detail-container">
                <h2>About the Course</h2>
                <p>
                    The <strong>Business Relationship Excellence Program</strong> is specially curated for ambitious students and recent graduates who aspire to thrive in the professional world. This 6-month journey is designed to equip learners with a balanced combination of technical, communication, and business development skills that are crucial in today’s competitive market.
                </p>

                <p>
                    Participants will get the opportunity to learn directly from seasoned industry mentors through interactive <strong>live sessions</strong>, <strong>real-world case studies</strong>, and <strong>hands-on projects</strong>. Whether it’s mastering the art of persuasive sales, handling and interpreting business data, or building professional relationships—this program ensures holistic development.
                </p>

                <p>
                    With a strong focus on <strong>soft skills</strong> like communication, personality enhancement, and grooming, the program also includes <strong>industry visits</strong> and <strong>placement assistance</strong> to ensure every learner is job-ready. This is not just a course—it's a career transformation journey.
                </p>


                <h3>Modules</h3>
                <ul>
                    <li>
                        <strong>Digital Marketing & Sales:</strong>
                        Learn how to use digital platforms like Google, Facebook, and Instagram to market products and generate leads. Understand SEO, email campaigns, and conversion strategies.
                    </li>
                    <li>
                        <strong>Data Management:</strong>
                        Master tools like Excel, Google Sheets, and CRM software to efficiently manage customer and business data for reporting and analysis.
                    </li>
                    <li>
                        <strong>Case Studies:</strong>
                        Analyze real-life business problems and learn decision-making through practical industry case studies. Improve your analytical and problem-solving abilities.
                    </li>
                    <li>
                        <strong>Communication Skills:</strong>
                        Develop verbal and written communication skills for client meetings, presentations, and teamwork. Includes role-playing and public speaking sessions.
                    </li>
                    <li>
                        <strong>Personality & Grooming:</strong>
                        Learn grooming standards, body language, professional dressing, and workplace etiquette to enhance your corporate presence.
                    </li>
                </ul>

                <h3>Perks</h3>
                <div className="perk-gallery">
                    <div className="perk-card">
                        <img src="/images/bg5.jpeg" alt="Placement Assistance" />
                        <div className="perk-text">
                            <h4>100% Placement Assistance</h4>
                            <p>End-to-end support with resume, interviews & job guidance.</p>
                        </div>
                    </div>

                    <div className="perk-card">
                        <img src="/images/bg6.jpg" alt="Industry Visits" />
                        <div className="perk-text">
                            <h4>Industry Visits</h4>
                            <p>On-site visits to companies to experience real-time processes.</p>
                        </div>
                    </div>

                    <div className="perk-card">
                        <img src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238" alt="Live Sessions" />
                        <div className="perk-text">
                            <h4>Live Sessions</h4>
                            <p>Interactive mentor sessions with doubt-solving & workshops.</p>
                        </div>
                    </div>

                    <div className="perk-card">
                        <img src="/images/bg7.jpg" alt="Soft Skills" />
                        <div className="perk-text">
                            <h4>Soft Skills & Personality Development</h4>
                            <p>Training on communication, grooming, and confidence building.</p>
                        </div>
                    </div>
                </div>

                <h3>Course in Action</h3>
                <div className="image-gallery">
                    <div className="gallery-card">
                        <img src="/images/bg3.jpg" alt="Training Session" />
                        <p>Live Training Session with Industry Experts</p>
                    </div>
                    <div className="gallery-card">
                        <img src="/images/bg2.jpeg" alt="Presentation" />
                        <p>Student Presentation on Marketing Case Study</p>
                    </div>
                    <div className="gallery-card">
                        <img src="/images/bg4.jpeg" alt="Group Discussion" />
                        <p>Group Discussions to Build Communication & Teamwork</p>
                    </div>
                </div>

            </div>

            <Footer />
        </>
    );
};

export default CourseOne;
