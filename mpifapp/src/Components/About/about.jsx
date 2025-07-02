import React, { useEffect, useRef, useState } from "react";
import "./about.css";
import Header from "../Header/header";
import Footer from "../Footer/footer";

const AboutUs = () => {
  const fadeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (fadeRef.current) observer.observe(fadeRef.current);
    return () => {
      if (fadeRef.current) observer.unobserve(fadeRef.current);
    };
  }, []);

  return (
    <>
      <Header />
      <section className="aboutus-container">
         <h1 className="highlight-title">About Us</h1>
           <div className="image-gallery">
          <div className="main-image">
            <img src="/images/about1.jpg" alt="Main Education" />
          </div>
          <div className="side-images">
            <img src="/images/about2.jpeg" alt="Books" />
            <img src="/images/co2.png" alt="Group Learning" />
          </div>
        </div>
      
        <div className="aboutus-right">
          <p ref={fadeRef} className={`fade-text ${isVisible ? "visible" : ""}`}>
           At MPIF SkillHub, we are deeply committed to empowering underprivileged students by
            providing them with high-quality, hands-on training and personalized mentorship. We
            understand that many talented individuals face financial and social barriers to accessing
            education and career opportunities. That’s why our platform is designed to be inclusive,
            accessible, and practical.
            <br />
            <br />
            We focus on real-world skills that are in demand—ranging from technology and software
            development to communication and entrepreneurship—ensuring that every student, regardless
            of their background, has the tools and guidance needed to succeed in the modern job market.
            <br />
            <br />
            By collaborating with experienced professionals, educational partners, and industry
            experts, we create a nurturing ecosystem where passion meets opportunity, and potential is
            transformed into achievement.

</p>
        </div>
      </section>

      <section className="extra-info">
        <div className="why-join">
          <h2>Why Join Us?</h2>
          <ul>
            <li>Free access to industry-level training programs.</li>
            <li>Learn from mentors with real-world experience.</li>
            <li>Get certified and build job-ready projects.</li>
            <li>Special support for underprivileged students.</li>
            <li>Internships, mock interviews, and placement help.</li>
          </ul>
        </div>

        <div className="our-mission">
          <h2>Our Mission</h2>
          <p>
            To provide accessible, affordable, and high-impact skill development opportunities to youth across India, especially those from underserved communities. We aim to bridge the education-to-employment gap through strong mentorship and practical exposure.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
