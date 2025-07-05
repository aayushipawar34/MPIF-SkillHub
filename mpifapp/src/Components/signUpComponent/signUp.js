import React, { useState, useRef } from "react";
import { signup, verifyOtp, googleAuth } from "../../Utils/api";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./signUp.css";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showVerify, setShowVerify] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [verifyError, setVerifyError] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");
  const inputsRef = useRef([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await signup(form);
      setMessage(response.data.message || "Signup successful! Check your email for OTP.");
      setVerifyEmail(form.email);
      setShowVerify(true);
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong");
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;
    const newOtpArray = [...otpArray];
    newOtpArray[index] = value;
    setOtpArray(newOtpArray);
    if (index < 5 && value) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtpArray = [...otpArray];
      newOtpArray[index] = "";
      setOtpArray(newOtpArray);
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    const otp = otpArray.join("");
    setVerifyError("");
    setVerifyMessage("");

    try {
      const response = await verifyOtp({ email: verifyEmail, otp });
      setVerifyMessage(response.data.message || "OTP verified successfully!");
      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    } catch (err) {
      setVerifyError(err?.response?.data?.error || "Invalid OTP or expired.");
    }
  };

 const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // 🔐 Get ID token as a string (very important!)
    const idToken = await user.getIdToken(); // ✅

    const res = await googleAuth(idToken); // ✅ no need to wrap in another object

    const { token, user: userData } = res.data;

    if (token) {
      const { googleId, ...filteredUser } = userData;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(filteredUser));

      alert(res.data.message || "Google login successful");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      alert('Token missing from server response');
    }
  } catch (err) {
    console.error("Google Signup Error:", err);
    alert('Google Signup Failed');
  }
};




  // OTP 
  if (showVerify) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center mb-4">Verify OTP</h2>
          {verifyError && <div className="alert alert-danger">{verifyError}</div>}
          {verifyMessage && <div className="alert alert-success">{verifyMessage}</div>}
          <form onSubmit={handleVerifySubmit}>
            <div className="d-flex justify-content-between mb-3">
              {otpArray.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  ref={(el) => (inputsRef.current[index] = el)}
                  className="form-control text-center mx-1"
                  style={{ width: "45px", height: "50px", fontSize: "22px" }}
                />
              ))}
            </div>
            <button type="submit" className="btn btn-primary w-100">Verify</button>
             <button
          type="button"
          className="btn btn-secondary w-100 mt-3"
          onClick={() => navigate("/sign-up")}
        >
          Back to Home
        </button>
          </form>
        </div>
      </div>
    );
  }

  
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            className="form-control mb-3"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contact"
            className="form-control mb-3"
            placeholder="Contact Number"
            value={form.contact}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary w-100 mb-3">Sign Up</button>
          <h6>Already have an account? <Link to="/sign-in">Sign in</Link></h6>
          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </form>

        <div className="text-center mt-3">Or</div>
        <button className="google-btn" type="button" onClick={handleGoogleSignIn}>
          <FaGoogle className="google-icon" /> Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
