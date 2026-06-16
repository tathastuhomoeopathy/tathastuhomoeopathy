import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';
import './Gallery.css';

const reelsData = [
  { id: 1, label: "PCOS Recovery Tips Reel" },
  { id: 2, label: "Homeopathy Science Explained Reel" },
  { id: 3, label: "Mental Stress Relief Protocol Reel" },
  { id: 4, label: "Thyroid Restoration Path Reel" },
  { id: 5, label: "Healthy Menstrual Habits Reel" }
];

const photoGroups = {
  "Clinic": [
    { id: 1, title: 'Therapeutic Consultation Room', label: 'Consultation Room Setup' },
    { id: 2, title: 'Organic Remedy Dispensation Desk', label: 'Natural Extract Titration' },
    { id: 9, title: 'Natural Remedy Specimen Archives', label: 'Biological Mother Tinctures' }
  ],
  "Events": [
    { id: 3, title: 'Endocrine Health Awareness Seminar', label: 'Community Wellness Talk' },
    { id: 4, title: 'Women\'s Hormonal Support Circle', label: 'Group Healing Session' },
    { id: 8, title: 'Professional Medical Keynote Speech', label: 'Vanguard Healing Conference' }
  ],
  "Dr. Helee": [
    { id: 5, title: 'Constitutional Diagnosis Dialogue', label: 'Case Taking Consultation' },
    { id: 7, title: 'Dr. Helee Recording Clinical Files', label: 'Clinical Study Desk' }
  ],
  "Achievements": [
    { id: 10, title: 'Homeopathic Excellence Award', label: 'Vanguard Medical Council Recognition' },
    { id: 11, title: 'Board Certification in Endocrinology', label: 'Clinical Reproductive Wellness Guild' }
  ]
};

export default function Gallery() {
  const reelsReelRef = useRef();
  const [reelsWidth, setReelsWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (reelsReelRef.current) {
        setReelsWidth(reelsReelRef.current.scrollWidth - reelsReelRef.current.offsetWidth);
      }
    };
    
    const timer = setTimeout(handleResize, 500);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="gallery-page">
      
      {/* HERO TITLE */}
      <section className="pageHero">
        <div className="pageHeroInner">
          <span className="pageHeroEyebrow">MOMENTS & MILESTONES</span>
          <h1 className="pageHeroTitle">Gallery</h1>
          <p className="pageHeroSubtitle">Explore our clinical facilities, public wellness events, achievements, and educational reels from Dr. Helee Patel.</p>
        </div>
      </section>

      {/* SECTION 1: WATCH REELS (EGG SHELL) */}
      <section className="section section-soft gallery-reels-section">
        <div className="section-container">
          <div className="section-header-flex">
            <div>
              <span className="eyebrow">VIDEO INTERACTION</span>
              <h2 className="section-title">Watch Our Reels</h2>
            </div>
            <span className="drag-hint">Swipe / Drag Left ⟷</span>
          </div>

          <div className="carousel-wrapper" ref={reelsReelRef}>
            <motion.div 
              className="carousel-inner gallery-reel-strip"
              drag="x"
              dragConstraints={{ right: 0, left: -reelsWidth }}
              whileTap={{ cursor: 'grabbing' }}
            >
              {reelsData.map((reel) => (
                <div key={reel.id} className="gallery-reel-card img-placeholder">
                  <div className="play-button-wrapper">
                    <FiPlay size={24} />
                  </div>
                  <div className="video-card-overlay glass-card">
                    <span>Reel Tips</span>
                  </div>
                  <span className="video-placeholder-lbl">[ Reel Video ]</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PHOTO GALLERY BY GROUPS (LINEN) */}
      <section className="section section-warm gallery-grid-section-page">
        <div className="section-container">
          {Object.entries(photoGroups).map(([groupName, items]) => (
            <div key={groupName} className="gallery-category-block">
              <div className="category-group-header">
                <span className="group-eyebrow">COLLECTION</span>
                <h2 className="group-title">{groupName}</h2>
              </div>
              
              <div className="gallery-grid">
                {items.map((item) => (
                  <div key={item.id} className="gallery-item-wrapper">
                    <div className="gallery-item-card img-placeholder">
                      <div className="gallery-overlay">
                        <span className="gallery-category-tag">{groupName}</span>
                        <h4>{item.title}</h4>
                        <p className="gallery-meta">{item.label}</p>
                      </div>
                      <span className="placeholder-label">[ {item.label} ]</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="gallery-cta-section">
        <div className="section-container">
          <div className="gallery-cta-card">
            <h2 className="gallery-cta-title">Experience Natural Recovery Firsthand</h2>
            <p className="gallery-cta-sub">We are ready to assist you. Consult with Dr. Helee Patel from the comfort of your home or visit our clinic.</p>
            <Link to="/book" className="btn-primary">
              Schedule Your Session
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
