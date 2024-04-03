/* eslint-disable react/no-unescaped-entities */
import '../Styles/HomeStyle.css'
import facebook from "../assets/Images/facebook.svg"
import instagram from "../assets/Images/instagram.svg"
import twitter from "../assets/Images/twitter.svg"

function FooterPage() {
  return (
    <div className='footer-container'>
    <footer className="footer">
      <div className="touch">
        <h3>Get in Touch</h3>
        <p>Don't miss any updates of our Coding Quiz Challenges!</p>
        <form style={{flexDirection:"row", gap:"5px", justifyContent:"start", padding:"0px"}} action="https://formspree.io/f/mbjnozop" className="f_subscribe_two mailchimp" method="post" noValidate>
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
          <li><a href="/contact">Contact</a></li>
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
        <h3>Our Social Sites</h3>
        <ul style={{display:"flex" , gap:"15px" , width:"80px" , height:"30px"}}>
          <li><a href="https://www.facebook.com/login/"><img src={facebook} alt='facebook' /></a></li>
          <li><a href="https://twitter.com/i/flow/login"><img src={twitter} alt='Twitter'/></a></li>
          <li><a href="https://www.instagram.com/accounts/login/" style={{display:"flex"}}><img src={instagram} alt='Instagram'/></a></li>
        </ul>
      </div>
      {/* <div className="footer-team">
        <h3>Team Solutions</h3>
        <div className="socials">
          <a href="https://www.facebook.com/login/" className="fab fa-facebook"></a>
          <a href="https://twitter.com/i/flow/login" className="fab fa-twitter"></a>
          <a href="https://www.linkedin.com/in/" className="fab fa-linkedin"></a>
          <a href="#" className="fab fa-pinterest"></a>
        </div>
      </div> */}
      <div className="footer-bg">
        <div className="footer-bg-one"></div>
        <div className="footer-bg-two"></div>
      </div>
    </footer>
    </div>
  );
}

export default FooterPage;

