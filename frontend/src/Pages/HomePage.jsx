import './HomeStyle.css'
import { Link } from 'react-router-dom';
import animation from "../assets/Images/Animation.gif"



function HomePage() {
  return (
    <div>
      {/* Header */}
      <header className="header">
        <nav id="nav-menu">
          <div className="logo-cont">
            <img id="logo-img" src="../Images/QuizLogo.png" alt="logo" />
            <h1>Quiz App</h1>
          </div>
          <div className="logo-menu">
            <img className="menu-icon" src="./assets/images/menu.svg" alt="menu icon" />
          </div>
          <div className="logo-close hid">
            <img className="menu-icon" src="./assets/images/close.svg" alt="close icon" />
          </div>
          <div className="menu hid">
            <div className="nav-links">
            <Link to="/" className="nav-link home">Home</Link> 
              <Link to="/about" className="nav-link about">About</Link>
              <Link to="/services" className="nav-link services">Services</Link>
              <Link to="/contact" className="nav-link contact">Contact</Link>
            </div>
            <button id="resume-button-1" className="login-signup">
              <a href="./pages/login.html">Login/Signup</a>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-cont">
          <h1>The Best <span className="salmonpink">Quiz App</span></h1>
          <p>Quezzo is a comprehensive online quiz learning platform designed to facilitate interactive learning experiences for individuals seeking to improve their coding skills and expand their knowledge in various programming languages and computer science concepts.</p>
          <button><Link to="/about" >About</Link></button>
        </div>
        <div className="hero-img">
          <img src={animation} alt="hero image" />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
      <div className="touch">
        <h3>Get in Touch</h3>
        <p>Don't miss any updates of our Coding Quiz Challenges!</p>
        <form action="https://formspree.io/f/mbjnozop" className="f_subscribe_two mailchimp" method="post" noValidate>
          <input type="text" name="email" className="form-control memail" placeholder="Email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className="footer-menu">
        <h3>Menu</h3>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div className="footer-help">
        <h3>Help</h3>
        <ul>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Term & Conditions</a></li>
          <li><a href="#">Reporting</a></li>
          <li><a href="#">Documentation</a></li>
          <li><a href="#">Support Policy</a></li>
          <li><a href="#">Privacy</a></li>
        </ul>
      </div>
      <div className="footer-team">
        <h3>Team Solutions</h3>
        <div className="socials">
          <a href="#" className="fab fa-facebook"></a>
          <a href="#" className="fab fa-twitter"></a>
          <a href="https://www.linkedin.com/in/shlok-gaikwad-667b431a6/" className="fab fa-linkedin"></a>
          <a href="#" className="fab fa-pinterest"></a>
        </div>
      </div>
      <div className="footer-bg">
        <div className="footer-bg-one"></div>
        <div className="footer-bg-two"></div>
      </div>
    </footer>
    </div>
  );
}

export default HomePage;
