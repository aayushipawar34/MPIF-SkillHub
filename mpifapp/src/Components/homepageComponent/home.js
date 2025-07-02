import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import { useNavigate } from "react-router-dom";



const teamMembers = [
  {
    name: "Ritika Sharma",
    role: "Frontend Developer @ Wipro",
    img: "./images/s1.png",
    batch:"2024",
  },
  {
    name: "Aditya Verma",
    role: "Software Engineer @ Infosys ",
    img: "./images/s3.png",
     batch:"2024",
  },
  {
    name: "Sanya Gupta",
    role: "UI/UX Designer @ infoBeans",
    img: "./images/s4.png",
     batch:"2024",
  },
  {
    name: "Ravi Mehta",
    role: "Project Manager @ TCS",
    img: "./images/s2.png",
     batch:"2024",
  },
   {
    name: "Kanchan Yadav",
    role: "Backend Developer @ Cognizant",
    img: "./images/s5.png",
     batch:"2024",
  },
  {
    name: "Jyoti Panse",
    role: "Full Stack Developer @ IBM",
    img: "./images/s6.png",
     batch:"2024",
  }
];

const Home = () => {
  const navigate = useNavigate();

const handleClick = () => {
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/admission");
  } else {
    navigate("/sign-in");
  }
};
  return (
    <div>
      <header>
      <Header />
        <div className="hero-h">
          
          <div className="hero-h-text">
            <h3 className="wel">Welcome to</h3>
            <h1>EDUCATION IN IT & BUSINESS</h1>
            <p>
              We offer specialized programs to help you excel in the fields of
              information technology and business.
            </p>
            <Link to="/about">
              <button>Learn More</button>
            </Link>
          </div>
          <div className="hero-h-image">
            <img src="/images/front.png" alt="Hero" />
          </div>
        </div>
      </header>
      <section className="features">
        <div className="features-header">
          <h2>Our Special Features</h2>
        </div>
        <div className="features-grid">
          {[
            { img: "/images/project.png", text: "Live Project Based Training" },
            { img: "/images/p.png", text: "100% Placement Assistance" },
            { img: "/images/p1.png", text: "1-1 Practical Training" },
            { img: "/images/p2.png", text: "Certified professional Faculties" },
            { img: "/images/p4.png", text: "Soft Skills" },
            { img: "/images/p5.png", text: "Interview Training" },
            { img: "/images/p3.jpg", text: "Internationally Valid Certificate" },
            { img: "/images/p6.png", text: "Doubt Clearing Sessions" },
            { img: "/images/p7.png", text: "Career Counselling Support" },
            { img: "/images/p10.webp", text: "Resume Building & Portfolio Support" },
          ].map((feature, index) => (
            <div key={index} className="feature-box">
              <img src={feature.img} alt={feature.text} />
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="courses">
        <div className="course-header">
          <h2>Our Courses</h2>
        </div>
        <div className="course-list">
          <div className="course">
            <img className="course-image" src="/images/co1.png" />
            <h3> Information Technology Excellence Program</h3>
            <p>
              A comprehensive program, covering key areas of information
              technology.
            </p>
            <Link to="/course/it-excellence">
            <button>Learn More</button>
           </Link>
          </div>
          <div className="course">
             <img className="course-image" src="/images/co2.png" />
            <h3>Business Relationship Excellence Program</h3>
            <p>
              Develop the skills needed to effectively manage and lead
              organizations.
            </p>
           <Link to="/course/relationship-excellence">
            <button>Learn More</button>
           </Link>
          </div>
        </div>
      </section>
      <h2 className="enroll">How to Enroll</h2>
      <div className="enroll-section">
        <div className="enroll-image">
          <img
            src="/images/enroll.webp"
            width="400"
            height="300"
            alt="Enrollment Process"
          />
        </div>
        <div className="enroll-steps">
          <h2>Follow These Steps</h2>
          <ul>
            <li>Fill the Registration Form</li>
            <li>Attend Counselling Session</li>
            <li>Choose Your Course</li>
          </ul>
           <button className="enroll-button" onClick={handleClick}>Learn More</button>
        </div>
      </div>
       <div className="w">
       <h2>What Our Students Say</h2>
       </div> 

      <div className="testimonial container my-5">
   

  <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active text-center p-4">
        <img src="./images/harshita.jpg"/>
        <p> "MPIF SkillHub changed my life! I received free high-quality coaching, and the mentors supported me at every step. After completing the training, I got placed in a reputed IT company. Today, I’m proud to support my family."</p>
        <h5>— Harsita Rai</h5>
      </div>
      <div className="carousel-item text-center p-4">
         <img src="./images/adi.jpg"/>
        <p>"MPIF SkillHub didn’t just teach me technical skills — they also helped with interview preparation and personality development. Now, I’m working at a software company. None of this would have been possible without them."</p>
        <h5>— Aditya Bhokare</h5>
      </div>
      <div className="carousel-item text-center p-4">
         <img src="./images/aayu.jpeg"/>
        <p>  "Coming from a small town, I never thought I’d get access to IT training. But thanks to MPIF SkillHub, I learned web development for free. After completing the course, I got a job at a startup. It feels like a dream come true!"</p>
        <h5>— Aayushi Pawar</h5>
      </div>
    </div>

   <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
  <span className="custom-arrow">&larr;</span>
  <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
  <span className="custom-arrow">&rarr;</span>
  <span className="visually-hidden">Next</span>
</button>

  </div>
</div>


  <h1>Our Proud Placed Students</h1>
<h4 className="h">Congratulations to our talented achievers!</h4>
  <div className="scroll-container">
  <div className="team-container">
    {[...teamMembers, ...teamMembers].map((member, index) => (
      <div className="team-card" key={index}>
        <img src={member.img} alt={member.name || "Team Member"} />
        <h3>{member.name}</h3>
        <p className="role">{member.role}</p>
        <p>{member.batch}</p>
      </div>
    ))}
  </div>
</div>

      <Footer />
    </div>
  );
};

export default Home;
