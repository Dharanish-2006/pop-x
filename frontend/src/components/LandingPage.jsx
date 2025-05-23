import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">

    <div className="landing-container">
  <div className="card">
    <div className="card-content">
      <h2>Welcome to PopX</h2>
      <p>Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit,</p>
    </div>

    <button className="primary-btn" onClick={() => navigate("/signup")}>
      Create Account
    </button>
    <button className="secondary-btn" onClick={() => navigate("/signin")}>
      Already Registered? Login
    </button>
  </div>
</div>
</div>

  );
};

export default LandingPage;
