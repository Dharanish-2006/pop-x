import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AccountSettings.css";

const AccountSettings = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const stateUser = location.state;

    if (stateUser && stateUser.fullName && stateUser.email) {
      setUser(stateUser);
    } else if (storedUser && storedUser.fullName && storedUser.email) {
      setUser({
        fullName: storedUser.fullName,
        email: storedUser.email,
      });
    } else {
      navigate("/signup");
    }
  }, [location.state, navigate]);

  return (
    <div className="container">

    <div className="account-settings-wrapper">
      <div className="account-card">
        <h2>Account Settings</h2>

        <div className="account-card-body">
          <div className="profile-row">
            <div className="profile-image">
              <img
                src="https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824144_1280.png"
                alt="Profile"
              />
              <div className="camera-icon">
                <img
                  src="https://img.icons8.com/fluency-systems-filled/24/ffffff/camera.png"
                  alt="Camera Icon"
                  />
              </div>
            </div>

            <div className="profile-info">
              <h3>{user.fullName}</h3>
              <p>{user.email}</p>
            </div>
          </div>

          <p className="description">
            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
            Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam
            Erat, Sed Diam
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AccountSettings;
