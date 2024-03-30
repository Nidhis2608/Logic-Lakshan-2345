import { Link } from 'react-router-dom';
import '../Styles/About.css';

function About() {
  return (
    <div>
      <header className="header">
        <nav id="nav-menu">
          <div className="logo-cont">
            <img id="logo-img" src="../assets/images/soloLogo.svg" alt="logo" />
            <h1>Quiz App</h1>
          </div>
          <div className="logo-menu">
            <img className="menu-icon" src="../assets/images/menu.svg" alt="menu icon" />
          </div>
          <div className="logo-close hid">
            <img className="menu-icon" src="../assets/images/close.svg" alt="close icon" />
          </div>
          <div className="menu hid">
            <div className="nav-links">
              {/* <a href="../pages/dashboard.html" className="nav-link home">Home</a> */}
              <Link to="/" className="nav-link home">Home</Link> 
              <a href="#" className="nav-link about">About</a>
              <a href="./services.html" className="nav-link services">Services</a>
              <a href="./contact.html" className="nav-link contact">Contact</a>
            </div>
            <button id="resume-button-1" className="login-signup">
              <a href="./login.html">Login/Signup</a>
            </button>
          </div>
        </nav>
      </header>

      <section className="about-hero">
        <h1>About Us</h1>
      </section>

      <section id="features">
        <div className="about-cont">
          <h1>Quiz App</h1>
          <p>
            Quezzo is a groundbreaking online quiz learning platform that revolutionizes the way individuals engage with coding and computer science education. 
            With an extensive library of quizzes spanning various programming languages, algorithms, data structures, and software development topics, Quezzo offers 
            users an unparalleled opportunity to expand their knowledge, sharpen their skills, and stay abreast of industry trends. Through its interactive learning 
            experience, Quezzo challenges users to apply their knowledge in practical scenarios, providing instant feedback on quiz submissions to reinforce learning 
            and foster deeper understanding.
          </p>
        </div>
        <div className="features-cont">
          <div className="card">
            <i className="bi bi-code-slash fa-3x"></i>
            <h3 className="">Coding Challenges</h3>
            <p className="">Sharpen your coding skills with hands-on challenges. Solve real-world coding problems and enhance your problem-solving abilities.</p>
          </div>
          <div className="card">
            <i className="bi bi-search fa-3x"></i>
            <h3 className="">Algorithm Mastery</h3>
            <p className="">Explore the depths of algorithms through challenging quizzes. Master the art of designing efficient and scalable algorithms.</p>
          </div>
          <div className="card">
            <i className="fa fa-3x fa-laptop-code"></i>
            <h3 className="">Programming Languages</h3>
            <p className="">Immerse yourself in coding languages. From the fundamentals to advanced concepts, level up your coding expertise.</p>
          </div>
        </div>
      </section>

      <section id="banner">
        <div>
          <i className="bi bi-code-slash fa-3x "></i>
          <h1>20</h1>
          <p>Years of Coding Quiz Experience</p>
        </div>
        <div>
          <i className="bi bi-people fa-3x"></i>
          <h1>1234</h1>
          <p>Coding Enthusiasts</p>
        </div>
        <div>
          <i className="bi bi-trophy fa-3x"></i>
          <h1>4500</h1>
          <p>Coding Quiz Challenges Completed</p>
        </div>
        <div>
          <i className="bi bi-check2 fa-3x"></i>
          <h1>1000</h1>
          <p>Successful Coders</p>
        </div>
      </section>

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
            <li><a href="../pages/about.html">About</a></li>
            <li><a href="../pages/services.html">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-help">
          <h3>Help</h3>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Term &amp; Conditions</a></li>
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
            <a href="https://www.linkedin.com/feed/" className="fab fa-linkedin"></a>
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

export default About;
