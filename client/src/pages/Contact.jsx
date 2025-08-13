import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact">
      {/* Contact Hero */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch for the best fireworks experience</p>
        </div>
      </section>

      {/* Contact Main Section */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form">
              <h2>Send us a Message</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" name="phone" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
            
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <div className="info-item">
                <h3>📍 Address</h3>
                <p>123 Fireworks Street<br />Celebration City, CC 12345</p>
              </div>
              <div className="info-item">
                <h3>📞 Phone</h3>
                <p>+91 98765 43210</p>
              </div>
              <div className="info-item">
                <h3>✉️ Email</h3>
                <p>info@mahalaxmifireworks.com</p>
              </div>
              <div className="info-item">
                <h3>🕒 Hours</h3>
                <p>Monday - Saturday: 9:00 AM - 8:00 PM<br />Sunday: 10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
