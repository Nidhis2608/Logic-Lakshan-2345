// import { Link } from 'react-router-dom';
import '../Styles/About.css';
import Navbar from './Navbar';
import FooterPage from './FooterPage';

function About() {
  return (
    <div>
      <Navbar />
      <section className="about-hero">
        <h1>About Us</h1>
      </section>

      <section id="features">
        <div className="about-cont">
          <h1>Quiz Me</h1>
          <p>
            Quiz Me is a groundbreaking online quiz learning platform that revolutionizes the way individuals engage with coding and computer science education. 
            With an extensive library of quizzes spanning various programming languages, algorithms, data structures, and software development topics, Quiz Me offers 
            users an unparalleled opportunity to expand their knowledge, sharpen their skills, and stay abreast of industry trends. Through its interactive learning 
            experience, Quiz Me challenges users to apply their knowledge in practical scenarios, providing instant feedback on quiz submissions to reinforce learning 
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

       <FooterPage />
    </div>
  );
}

export default About;
