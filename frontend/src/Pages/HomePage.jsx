import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { useNotification } from "../components/NotificationContext"; // Adjust the import path as needed
//import loginImage from "../assets/Images/login.webp";
import Navbar from "./Navbar";
import FooterPage from "./FooterPage";
import "../Styles/HomeStyle.css";

function HomePage() {
  const navigate = useNavigate();
  const { notification, hideNotification } = useNotification();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-cont">
          <h1>
            The Best <span className="salmonpink">Quiz Me</span>
          </h1>
          <p>
            Quiz Me is a comprehensive online quiz learning platform designed to
            facilitate interactive learning experiences for individuals seeking
            to improve their coding skills and expand their knowledge in various
            programming languages and computer science concepts.
          </p>
          <button>
            <Link to="/about">About</Link>
          </button>
        </div>
        <div className="hero-img">
          {/* //<img src={loginImage} alt="hero image" /> */}
        </div>
      </section>

      <FooterPage />

      {/* Snackbar for showing notifications at the top right */}
      <Snackbar
        open={notification.open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={hideNotification}
      >
        {/* Alert inside Snackbar for custom styling */}
        <Alert
          onClose={hideNotification}
          severity="success"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default HomePage;
