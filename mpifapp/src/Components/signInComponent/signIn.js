import React, { useState, useEffect } from "react";
import { signIn, googleAuth } from "../../Utils/api";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";

const SignIn = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await signIn(userData);
      const { token, message: msg, user } = response.data;

      if (!user.verified) {
        setError("Your email is not verified. Please check your email and verify with OTP.");
        return;
      }

      const { _id, username, role } = user;
      localStorage.setItem("user", JSON.stringify({ _id, username, role }));
      localStorage.setItem("role", role);
      localStorage.setItem("token", token);

      setMessage(msg);
      navigate(role === "admin" ? "/admin" : "/");
      window.location.reload();
    } catch (err) {
      setError(err?.response?.data?.error || "Invalid credentials or server error");
    }
  };

  // 🔁 Google Redirect Login Result
  useEffect(() => {
  const handleRedirectResult = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result?.user) {
        const token = await result.user.getIdToken(); // 🔥 Get Firebase ID token

        const res = await googleAuth({ token }); // ✅ Send only token to backend

        const { token: authToken, user: userData } = res.data;

        if (authToken) {
          const { _id, username, role } = userData;
          localStorage.setItem("user", JSON.stringify({ _id, username, role }));
          localStorage.setItem("role", role);
          localStorage.setItem("token", authToken);

          alert(res.data.message || "Google login successful");
          navigate(role === "admin" ? "/admin" : "/");
          window.location.reload();
        }
      }
    } catch (err) {
      console.error("Google Redirect Error:", err);
    }
  };

  handleRedirectResult();
}, []);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (err) {
      console.error("Google Sign-In Redirect Error:", err);
      alert("Google Sign-In Failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Sign In</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Sign In
          </button>

          <h6>Don’t have an account? <Link to="/sign-up">Sign Up</Link></h6>
          <h6><Link to="/forgot-password">Forgot Password?</Link></h6>
        </form>

        <button type="button" className="btn btn-secondary w-100 mt-3" onClick={() => navigate("/")}>
          Back to Home
        </button>

        <div className="text-center mt-3">Or</div>

        <button className="google-btn" type="button" onClick={handleGoogleSignIn}>
          <FaGoogle className="google-icon" /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
