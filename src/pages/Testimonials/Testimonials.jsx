import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { testimonials } from '../../data/testimonials';
import './Testimonials.css';

const categories = ['All', 'PCOS', 'Mental Wellness', 'General'];

export default function Testimonials() {
  const [selectedCat, setSelectedCat] = useState('All');

  const filteredItems = selectedCat === 'All'
    ? testimonials
    : testimonials.filter(item => item.category === selectedCat);

  return (
    <div className="testimonials-page">
      
      {/* HERO SECTION */}
      <section className="testimonials-hero">
        <div className="noise-overlay"></div>
        <div className="orb-container">
          <div className="orb orb-1"></div>
          <div className="orb orb-3"></div>
        </div>
        
        <div className="testimonials-hero-container">
          <span className="eyebrow eggshell-eyebrow">Patient Success Stories</span>
          <h1>Clinical Healing Testimonials</h1>
          <p>
            Read heartfelt stories from individuals who recovered their cycles, mental wellness, and overall physical equilibrium under Dr. Helee Patel's care.
          </p>
        </div>
      </section>

      {/* FILTER & GRID */}
      <section className="testimonials-grid-section">
        <div className="section-container">
          
          {/* Category Filter Pills */}
          <div className="testimonials-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill glass-card ${selectedCat === cat ? 'active' : ''}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <motion.div layout className="testimonials-grid">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((test) => (
                <motion.div
                  layout
                  key={test.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="testimonial-card-wrapper"
                >
                  <div className="testimonial-card glass-card">
                    <div className="stars-row">
                      {[...Array(test.rating)].map((_, i) => (
                        <FiStar key={i} className="star-filled" />
                      ))}
                    </div>
                    
                    <p className="test-quote">"{test.quote}"</p>
                    
                    <div className="test-author-box">
                      <h5>{test.name}</h5>
                      <p>{test.city} · <span className="cat-label">{test.category}</span></p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="testimonials-cta">
        <div className="noise-overlay"></div>
        <div className="orb-container">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
        </div>

        <div className="section-container">
          <div className="testimonials-cta-card glass-card">
            <h2>Ready to Write Your Success Story?</h2>
            <p>Schedule your primary case discussion with Dr. Helee Patel. Take the first step toward long-term recovery today.</p>
            <Link to="/book" className="btn btn-glass btn-white-glass btn-large">
              Book a Clarity Call
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
