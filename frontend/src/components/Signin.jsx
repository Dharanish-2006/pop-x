import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

const SigninPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      navigate("/account", {
        state: {
          fullName: storedUser.fullName,
          email: storedUser.email,
        },
      });
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="container">

    <div className="signin-page-wrapper">
      <div className="signin-container">
        <h2>Signin to your </h2>
        <h3>PopX account</h3>
        <p className="tagline">Lorem ipsum dolor sit amet,</p>
        <p className="tagline">consectetur adipiscing elit,</p>

        <form className="signin-form" onSubmit={handleLogin}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />

          <button className="primary-btn1" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default SigninPage;
