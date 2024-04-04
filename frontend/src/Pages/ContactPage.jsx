import React from 'react';
import "../Styles/Contact.css"
import emailIcon from '../assets/Images/email.svg';
import phoneIcon from '../assets/Images/phone.svg';
 import locationIcon from '../assets/Images/location.svg';
import FooterPage from "./FooterPage"
import Navbar from './Navbar';

function ContactPage() {
  return (
    <div>
      <Navbar />
      <section id="contact">
        <h1>Contact <span className="boldtext red">Us</span></h1>
        <div className="contact-cont">
          <form action="https://formspree.io/f/mbjnozop" method="POST">
            <div className="contact-form">
              <input type="text" placeholder="Your Name" name="name" />
              <input type="email" placeholder="Email" name="email" />
              <textarea placeholder="Message" rows="5" name="message"></textarea>
              <button type="submit">Submit</button>
            </div>
          </form>
          <div className="contact-info">
            <h2>Let's Connect</h2>
            <p>Got questions or feedback? We're all ears! Reach out to us because your thoughts matter. Together, let's make this quiz experience even better.</p>
            <div id="contact-email">
              <img src={emailIcon} alt="Email icon" />
              <p>admin@gmail.com</p>
            </div>
            <div id="contact-phone">
              <img src={phoneIcon} alt="Phone icon" />
              <span>+91 1234589354</span>
            </div>
            <div id="contact-loc">
              <img src={locationIcon} alt="Location icon" />
              <span>India</span>
            </div>
          </div>
        </div>
      </section>
      <FooterPage />
    </div>
  );
}

export default ContactPage;
