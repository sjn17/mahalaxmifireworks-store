import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section">
              <div className="footer-logo">
                <Sparkles className="logo-icon" />
                <span>Mahalaxmi Fireworks</span>
              </div>
              <p className="footer-description">
                Illuminating celebrations with joy, safety, and spectacular displays since 1995. 
                Your trusted partner for premium fireworks and unforgettable experiences.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Products */}
            <div className="footer-section">
              <h3>Products</h3>
              <ul className="footer-links">
                <li><Link to="/products">Rockets</Link></li>
                <li><Link to="/products">Crackers</Link></li>
                <li><Link to="/products">Bombs</Link></li>
                <li><Link to="/products">Sparklers</Link></li>
                <li><Link to="/products">Fountains</Link></li>
                <li><Link to="/products">Wheels</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h3>Contact Info</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <Phone size={16} />
                  <span>+91 98765 43210</span>
                </div>
                <div className="contact-item">
                  <Mail size={16} />
                  <span>info@mahalaxmifireworks.com</span>
                </div>
                <div className="contact-item">
                  <MapPin size={16} />
                  <span>123 Fireworks Street, Celebration City, State 12345</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; {currentYear} Mahalaxmi Fireworks. All rights reserved.</p>
              <div className="footer-bottom-links">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/safety">Safety Guidelines</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
