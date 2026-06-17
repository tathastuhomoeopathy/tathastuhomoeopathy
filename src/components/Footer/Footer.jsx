import { Link } from 'react-router-dom';
import { FiInstagram, FiMessageCircle } from 'react-icons/fi';
import { GiLotus } from 'react-icons/gi';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand Section */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img
              src="https://res.cloudinary.com/dglf2h0t1/image/upload/f_auto,q_auto/v1781119066/Screenshot_2026-06-11_003316_kgutnv.png"
              alt="Dr. Helee Homeopathy"
              className="footer-logo-img"
            />
          </Link>
          <p className="footer-tagline">
            Specialised PCOS/PCOD care, mental wellness, and endocrine restoration. Empowering your body to heal from within, naturally under Dr. Helee Patel.
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com/drhelee_tathastuhomoeopathy" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <FiInstagram size={20} />
            </a>
            <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
              <FiMessageCircle size={20} />
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer-links-grid">
          <div className="footer-col">
            <h4 className="footer-title">Practice</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Dr. Helee Patel</Link></li>
              <li><Link to="/services">Services & Treatments</Link></li>
              <li><Link to="/results">Patient Results</Link></li>
              <li><Link to="/gallery">Clinic Gallery</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Self-Care Quiz</h4>
            <ul className="footer-links">
              <li><Link to="/services?type=pcos">PCOS/PCOD Assessment</Link></li>
              <li><Link to="/services?type=mental">Mental Wellness Check</Link></li>
              <li><Link to="/book">Consultation Pricing</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Get in Touch</h4>
            <p className="footer-info">
              Monday — Saturday<br />
              9:00 AM — 6:00 PM IST<br />
              Instagram: @drhelee_tathastuhomoeopathy
            </p>
            <Link to="/book" className="footer-contact-btn">
              Book a Clarity Call
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-divider">
        <span className="leaf-icon"><GiLotus style={{ color: '#9B9879', fontSize: '20px' }} /></span>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Dr. Helee Homeopathy. All rights reserved.</p>
        <p className="footer-credit">Handcrafted with care for natural healing</p>
      </div>
    </footer>
  );
}
