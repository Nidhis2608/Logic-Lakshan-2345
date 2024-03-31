import '../Styles/HomeStyle.css'
import { Link } from 'react-router-dom';
import loginImage from "../assets/Images/login.webp";
import Navbar from './Navbar';
import FooterPage from './FooterPage';



function HomePage() {
  return (
    <div>
       <Navbar />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-cont">
          <h1>The Best <span className="salmonpink">Quiz App</span></h1>
          <p>Quezzo is a comprehensive online quiz learning platform designed to facilitate interactive learning experiences for individuals seeking to improve their coding skills and expand their knowledge in various programming languages and computer science concepts.</p>
          <button><Link to="/about" >About</Link></button>
        </div>
        <div className="hero-img">
          <img src={loginImage} alt="hero image" />
        </div>
      </section>

       <FooterPage />
    </div>
  );
}

export default HomePage;
