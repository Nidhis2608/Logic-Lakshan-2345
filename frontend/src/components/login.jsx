// import React from "react";
import "../Styles/login.css";
import loginImage from "../assets/Images/login.webp";
import signupImage from "../assets/Images/login.webp";
import { useEffect, useRef } from "react";
import axios from "axios";

const Login = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const signInBtn = document.querySelector("#sign-in-btn");
    const signUpBtn = document.querySelector("#sign-up-btn");

    const container = containerRef.current;

    const handleSignUpClick = () => {
      container.classList.add("sign-up-mode");
    };

    const handleSignInClick = () => {
      container.classList.remove("sign-up-mode");
    };

    signUpBtn.addEventListener("click", handleSignUpClick);
    signInBtn.addEventListener("click", handleSignInClick);

    return () => {
      signUpBtn.removeEventListener("click", handleSignUpClick);
      signInBtn.removeEventListener("click", handleSignInClick);
    };
  }, []);

  useEffect(() => {
    const signInForm = document.getElementById("signInForm");
    const signUpForm = document.getElementById("signUpForm");
    const messageWrapper = document.getElementById("messageWrapper");
    const signUpMessageWrapper = document.getElementById(
      "signUpMessageWrapper"
    );

    const showMessage = (wrapper, message, color) => {
      const messageContainer = document.createElement("p");
      messageContainer.textContent = message;
      messageContainer.style.color = color;

      wrapper.innerHTML = "";

      wrapper.appendChild(messageContainer);
    };

    const handleSignInSubmit = (event) => {
      event.preventDefault();

      const email = signInForm.querySelector('input[type="text"]').value;
      const password = signInForm.querySelector('input[type="password"]').value;

      const formData = {
        email: email,
        password: password,
      };

      axios
        .post(
          "https://cyan-clumsy-haddock.cyclic.app/users/login",
          formData
        )
        .then((response) => {
          const data = response.data;
          if (data.token) {
            localStorage.setItem("token", data.token);
            showMessage(messageWrapper, "Login Successful", "green");
            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 1000);
          } else {
            showMessage(
              messageWrapper,
              "Login Failed. Please check your credentials.",
              "red"
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          showMessage(
            messageWrapper,
            "An error occurred. Please try again later.",
            "red"
          );
        });
    };

    const handleSignUpSubmit = async (event) => {
      event.preventDefault();

      const username = signUpForm.elements.username.value;
      const email = signUpForm.elements.email.value;
      const password = signUpForm.elements.password.value;

      if (!username || !email || !password ) {
        showMessage(
          signUpMessageWrapper,
          "Please fill in all required fields.",
          "red"
        );
        return;
      }

      const requestData = {
        username,
        email,
        password,
      };

      try {
        const response = await axios.post(
          "https://cyan-clumsy-haddock.cyclic.app/users/register",
          requestData
        );
        if (response.status === 200) {
          const data = response.data;
          showMessage(signUpMessageWrapper, data.message, "green");
        } else {
          const errorData = response.data;
          showMessage(
            signUpMessageWrapper,
            errorData.message || "An error occurred.",
            "red"
          );
        }
      } catch (error) {
        console.error("Error:", error);
        showMessage(
          signUpMessageWrapper,
          "An error occurred. Please try again later.",
          "red"
        );
      }
    };

    signInForm.addEventListener("submit", handleSignInSubmit);
    signUpForm.addEventListener("submit", handleSignUpSubmit);

    return () => {
      signInForm.removeEventListener("submit", handleSignInSubmit);
      signUpForm.removeEventListener("submit", handleSignUpSubmit);
    };
  }, []);

  return (
    <div>
      <div className="container" ref={containerRef}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form" id="signInForm">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input type="text" placeholder="Email" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input type="password" placeholder="Password" />
              </div>
              <div id="messageWrapper"> </div>
              <input type="submit" defaultValue="Login" className="btn solid" />
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </form>
            <form action="#" className="sign-up-form" id="signUpForm">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input type="text" name="username" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope" />
                <input type="email" name="email" placeholder="Email" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input type="password" name="password" placeholder="Password" />
              </div>
              {/* <div class="input-field">
                    <i class="fas fa-image"></i>
                    <input type="file" id="imageUpload" name="imageUpload" accept="image/*" />
                  </div> */}
              <input type="submit" className="btn" defaultValue="Sign up" />
              <div id="signUpMessageWrapper" className="message-wrapper" />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Join Coding Community</h3>
              <p>
                Sign up to participate in coding quizzes, connect with
                developers, and expand your coding network.
              </p>
              <button className="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img src={loginImage} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Ready for a coding challenge? Log in to test your coding
                knowledge and skills.
              </p>
              <button className="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
            <img src={signupImage} className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
