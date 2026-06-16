import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { resultsData } from '../../data/results';
import './Results.css';

export default function Results() {
  const allResults = resultsData;

  return (
    <div className="results-page">
      
      {/* HERO TITLE */}
      <section className="pageHero">
        <div className="pageHeroInner">
          <span className="pageHeroEyebrow">TRANSFORMATION JOURNEYS</span>
          <h1 className="pageHeroTitle">Real Women, Real Results</h1>
          <p className="pageHeroSubtitle">Explore detailed case records demonstrating recovery from PCOS/PCOD, endocrine disorders, and neural fatigue under constitutional homeopathy care.</p>
        </div>
      </section>

      {/* RESULTS GRID SECTION */}
      <section className="resultsGridSection">
        <div className="resultsGrid">
          {allResults.map((item) => (
            <div key={item.id} className="resultCard">
              <img
                src={item.image}
                alt="Client Result"
                className="resultImg"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION (DARK GRADIENT) */}
      <section className="section section-dark results-cta">
        <div className="noise-overlay"></div>
        <div className="orb-container">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
        </div>

        <div className="section-container">
          <div className="results-cta-card glass-card">
            <h2 className="section-title">Begin Your Healing Journey</h2>
            <p className="section-subtitle" style={{ color: 'rgba(237, 231, 219, 0.75)', marginBottom: '24px' }}>Your body is fully capable of restoring its natural balance. Schedule your constitutional case evaluation with Dr. Helee Patel today.</p>
            <Link to="/book" className="btn-ghost">
              Book Your Clarity Consultation <FiArrowRight style={{ marginLeft: '6px' }} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
