import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignupPage.css";

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    company: "",
    agency: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "radio" ? value : value,
    });
  };

const handlePasswordBlur = () => {
  if (!validatePassword(formData.password)) {
    setPasswordError(
      "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
    );
  } else {
    setPasswordError("");
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

if (!validatePassword(formData.password)) {
  setPasswordError(
    "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character."
  );
  return;
}


    const mailboxlayerKey = "575216f737d05f88c2de31407436c902";
    const emailToValidate = formData.email;
    const validationURL = `https://apilayer.net/api/check?access_key=${mailboxlayerKey}&email=${emailToValidate}`;

    try {
      const response = await axios.get(validationURL);
      const data = response.data;

      if (data.format_valid && data.mx_found && data.smtp_check) {
        await axios.post("http://localhost:5000/api/signup", formData);
        localStorage.setItem("user", JSON.stringify(formData));
        navigate("/account", {
          state: {
            fullName: formData.fullName,
            email: formData.email,
          },
        });
      } else {
        setError("Invalid or undeliverable email address.");
      }
    } catch (err) {
      setError("Email validation service unavailable. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="signup-page-wrapper">
        <div className="signup-container">
          <h2>Create your </h2>
          <h3>PopX account</h3>
          <form className="signup-form" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}

            <label>Full Name*</label>
            <input
              type="text"
              placeholder="Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <label>Phone number*</label>
            <input
              type="tel"
              placeholder="Phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label>Email address*</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password *</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handlePasswordBlur}
              required
            />
            {passwordError && <p className="error">{passwordError}</p>}


            <label>Company name</label>
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />

            <p>Are you an Agency?*</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="agency"
                  value="Yes"
                  onChange={handleChange}
                  required
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="agency"
                  value="No"
                  onChange={handleChange}
                  required
                />{" "}
                No
              </label>
            </div>

            <button className="primary-btn" type="submit">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
