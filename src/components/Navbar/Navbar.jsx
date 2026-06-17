import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="nav-logo">
            <img
              src="https://res.cloudinary.com/dglf2h0t1/image/upload/f_auto,q_auto/v1781119066/Screenshot_2026-06-11_003316_kgutnv.png"
              alt="Dr. Helee Homeopathy"
              className="nav-logo-img"
            />
          </Link>

          {/* Desktop nav — hidden on mobile via CSS */}
          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
              About
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>
              Services
            </NavLink>
            <NavLink to="/results" className={({ isActive }) => isActive ? 'active' : ''}>
              Results
            </NavLink>
            <NavLink to="/gallery" className={({ isActive }) => isActive ? 'active' : ''}>
              Gallery
            </NavLink>
          </div>

          <div className="navbar-actions">
            <Link to="/book" className="nav-book-btn">
              Book a Call
            </Link>
            {/* Mobile hamburger button */}
            <button className="hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — only renders/shows when open */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
        <Link to="/services" onClick={() => setIsOpen(false)}>Services</Link>
        <Link to="/results" onClick={() => setIsOpen(false)}>Results</Link>
        <Link to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
        <Link to="/book" onClick={() => setIsOpen(false)}>
          <button className="nav-book-btn">Book a Call</button>
        </Link>
      </div>
    </>
  );
}
