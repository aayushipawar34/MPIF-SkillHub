import React, { useEffect,useState } from 'react';
import './Admision.css';
import {
  FaUserEdit,
  FaFileAlt,
  FaChalkboardTeacher,
  FaHome,
  FaCheckCircle,
} from 'react-icons/fa';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import OpenBatchesNotice from '../batch';


const AdmissionPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    user: '',
    name: '',
    email: '',
    FatherName: '',
    dob: '',
    Gender: '',
    Mobile: '',
    LocalAddress: '',
    PermanentAddress: '',
    State: '',
    Marital: '',
    Qualification: '',
    GrauationYear: '',
    income: '',
    city: '',
    course: '',
    documents: {
      aadhar: null,
      photo: null,
      marksheet_10: null,
      marksheet_12: null,
      last_year: null,
      income_certificate: null,
    },
  });
  const [courses, setCourses] = useState([]);

useEffect(() => {
  axios.get("https://mpif-skillhub.onrender.com/courses").then((res) => {
    setCourses(res.data);
  });
}, []);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("https://mpif-skillhub.onrender.com/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data && data._id) {
        setFormData((prev) => ({ ...prev, user: data._id, name: data.username, email: data.email }));
      }
    } catch (error) {
      console.error("User fetch failed:", error);
    }
  };

  fetchUser();
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [name]: files[0] },
    }));
  };

  const validateStep1 = () => {
    const requiredFields = [
      'name', 'email', 'FatherName', 'dob', 'Gender', 'Mobile',
      'LocalAddress', 'PermanentAddress', 'State', 'Marital',
      'Qualification', 'GrauationYear', 'income', 'city', 'course'
    ];
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        toast.error(`Please fill the ${field} field.`);
        return false;
      }
    }
    return true;
  };

  const validateStep2 = () => {
    const requiredFiles = [
      'aadhar', 'photo', 'marksheet_10', 'marksheet_12', 'last_year', 'income_certificate'
    ];
    for (let file of requiredFiles) {
      if (!formData.documents[file]) {
        toast.error(`Please upload the ${file.replace(/_/g, ' ')} file.`);
        return false;
      }
    }
    return true;
  };

const handleClear = () => {
  setFormData((prev) => ({
    ...prev,
    FatherName: "",
    dob: "",
    Gender: "",
    Mobile: "",
    LocalAddress: "",
    PermanentAddress: "",
    State: "",
    Marital: "",
    Qualification: "",
    GrauationYear: "",
    income: "",
    city: "",
    course: "",
    documents: {
      aadhar: null,
      photo: null,
      marksheet_10: null,
      marksheet_12: null,
      last_year: null,
      income_certificate: null,
    },
  }));
  toast.info("Form cleared (name and email preserved)");
};


  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleBack = () => setStep(1);
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateStep2()) return;

  try {
    const data = new FormData();

    // Append basic fields
    [
      'name','email','FatherName','dob','Gender','Mobile',
      'LocalAddress','PermanentAddress','State','Marital',
      'Qualification','GrauationYear','income','city','course'
    ].forEach(field => {
      data.append(field, formData[field]);
    });

    data.append("user", formData.user); // 👈 required field

    // Append files
    Object.entries(formData.documents).forEach(([key, file]) => {
      data.append(key, file);
    });

    const token = localStorage.getItem("token");

    const response = await fetch('https://mpif-skillhub.onrender.com/admission', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    if (!response.ok) {
      const resData = await response.json();
      throw new Error(resData.message || 'Submission failed');
    }

    toast.success('Form submitted successfully!');
    setShowForm(false);

    // ✅ Clear all fields except name and email
    setFormData((prev) => ({
      ...prev,
      FatherName: "",
      dob: "",
      Gender: "",
      Mobile: "",
      LocalAddress: "",
      PermanentAddress: "",
      State: "",
      Marital: "",
      Qualification: "",
      GrauationYear: "",
      income: "",
      city: "",
      course: "",
      documents: {},
    }));

  } catch (error) {
    toast.error('Error: ' + error.message);
  }
};

  return (
    <>
      <Header />
      < OpenBatchesNotice />

      <div className="admission-container">
        <div className="admission-left">
          <span className="free-tag">#FREE TRAINING</span>
          <h1 className='ah'>Empowering Underprivileged Students with Skill Training</h1>
          <p className='ap'>
            MPIF SkillHub provides a step-by-step admission process to help students
            unlock their potential.
          </p>

          <div className="steps-list">
            <div className="step-item">
              <FaUserEdit className="step-icon" />
              <div>
                <h4 className='ah4'>1. Enroll</h4>
                <p className='ap4'>Fill out the online enrollment form with your basic details.</p>
              </div>
            </div>

            <div className="step-item">
              <FaFileAlt className="step-icon" />
              <div>
                <h4 className='ah4'>2. Written Exam</h4>
                <p className='ap4'>Take a test to help us understand your knowledge level.</p>
              </div>
            </div>

            <div className="step-item">
              <FaChalkboardTeacher className="step-icon" />
              <div>
                <h4 className='ah4'>3. Interview</h4>
                <p className='ap4'>If qualified, appear for an interview with our training team.</p>
              </div>
            </div>

            <div className="step-item">
              <FaHome className="step-icon" />
              <div>
                <h4 className='ah4'>4. House Visit</h4>
                <p className='ap4'>We verify genuine need and eligibility through a home visit.</p>
              </div>
            </div>

            <div className="step-item">
              <FaCheckCircle className="step-icon" />
              <div>
                <h4 className='ah4'>5. Batch Starts</h4>
                <p className='ap4'>Get notified via email about your batch schedule and join us!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="admission-right">
          <img src="./images/add3.jpg" alt="Students" />
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Transform Your Future?</h2>
        <button className="cta-button" onClick={() => setShowForm(true)}>Start Your Application</button>
      </div>

 {showForm && (
  <div className="popup-form">
    <form onSubmit={handleSubmit}>
      <h3>Enrollment Form</h3>

      {step === 1 && (
        <div className="form-step">
          <label>
            Name:<br />
            <input
              type="text"
              name="name"
              disabled
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email:<br />
            <input
              type="email"
              name="email"
              disabled
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Father's Name:<br />
            <input
              type="text"
              name="FatherName"
              value={formData.FatherName}
              onChange={handleChange}
              required
              pattern="^[A-Za-z\s]+$"
              title="Only alphabets allowed"
            />
          </label>

          <label>
            Date of Birth:<br />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Gender:<br />
            <select
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            Mobile:<br />
            <input
              type="text"
              name="Mobile"
              value={formData.Mobile}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              title="Enter valid 10-digit mobile number"
            />
          </label>

          <label>
            Local Address:<br />
            <input
              type="text"
              name="LocalAddress"
              value={formData.LocalAddress}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Permanent Address:<br />
            <input
              type="text"
              name="PermanentAddress"
              value={formData.PermanentAddress}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            State:<br />
            <select
              name="State"
              value={formData.State}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              <option value="BR">Bihar</option>
              <option value="CH">Chandigarh</option>
              <option value="CT">Chhattisgarh</option>
              <option value="DL">Delhi</option>
              <option value="MP">Madhya Pradesh</option>
              <option value="UP">Uttar Pradesh</option>
            </select>
          </label>

          <label>
            City:<br />
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="">Select City</option>
              <option value="Amla">Amla</option>
              <option value="Betul">Betul</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Chhatarpur">Chhatarpur</option>
              <option value="Chhindwara">Chhindwara</option>
              <option value="Dewas">Dewas</option>
              <option value="Hoshangabad">Hoshangabad</option>
              <option value="Indore">Indore</option>
              <option value="Itarsi">Itarsi</option>
              <option value="Jabalpur">Jabalpur</option>
              <option value="Mandideep">Mandideep</option>
              <option value="Mau">Mau</option>
              <option value="Multai">Multai</option>
              <option value="Pithampur">Pithampur</option>
              <option value="Ratlam">Ratlam</option>
              <option value="Rewa">Rewa</option>
              <option value="Sagar">Sagar</option>
              <option value="Ujjain">Ujjain</option>
            </select>
          </label>

          <label>
            Marital Status:<br />
            <select
              name="Marital"
              value={formData.Marital}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </label>

          <label>
            Qualification:<br />
            <select
              name="Qualification"
              value={formData.Qualification}
              onChange={handleChange}
              required
            >
              <option value="">Select Qualification</option>
              <option>BA</option>
              <option>Bsc</option>
              <option>B.com</option>
              <option>BBA</option>
              <option>BCA</option>
              <option>MCA</option>
              <option>Btech</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Graduation Year:<br />
            <select
              name="GrauationYear"
              value={formData.GrauationYear}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </select>
          </label>

          <label>
            Annual Income:<br />
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              min="0"
              required
            />
          </label>

          <label>
            Select Course:<br />
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </label>

          <div className="buttonss">
            <button className="n" type="button" onClick={handleNext}>Next</button>
            <button className="na" type="button" onClick={handleClear}>Clear</button>
          </div>

          <button className="close-btn" type="button" onClick={() => setShowForm(false)}>&times;</button>
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          {['aadhar', 'photo', 'marksheet_10', 'marksheet_12', 'last_year', 'income_certificate'].map((file) => (
            <label key={file}>
              {file.replace(/_/g, ' ')}:<br />
              <input
                type="file"
                name={file}
                onChange={handleFileChange}
                accept=".pdf, .png, .jpg, .jpeg"
                required
              />
            </label>
          ))}

          <div className="buttonss">
            <button className="n" type="button" onClick={handleBack}>Back</button>
            <button className="n" type="submit">Submit</button>
          </div>
        </div>
      )}
    </form>
  </div>
)}

      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};
export default AdmissionPage;
