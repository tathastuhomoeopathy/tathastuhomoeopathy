import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      
      {/* HERO BANNER (DARK gradient with animated orbs) */}
      <section className="pageHero">
        <div className="pageHeroInner">
          <span className="pageHeroEyebrow">THE HEART BEHIND THE PRACTICE</span>
          <h1 className="pageHeroTitle">Dedicated to Natural Restorative Medicine</h1>
          <p className="pageHeroSubtitle">Dr. Helee Patel believes in treating the individual, not just the disease. Discover her story, clinical path, and commitment to classical homeopathy.</p>
        </div>
      </section>

      {/* DOCTOR STORY (WHITE background) */}
      <section className="section section-light">
        <div className="section-container">
          <div className="story-grid">
            <ScrollReveal y={30}>
              <div className="story-content">
                <span className="eyebrow">My Journey</span>
                <h2 className="section-title text-wine">Restoring Balance, Whispering to the Vital Force</h2>
                <p className="story-p">
                  I began my medical journey with a simple observation: modern health challenges are increasingly complex, metabolic, and stress-induced. Conventional therapeutics often manage symptoms by suppressing them, which can leave patients dependent on treatments that carry unwanted side-effects.
                </p>
                <p className="story-p">
                  My search for a deeper, curative science led me to classical homeopathy. By observing the intricate links between the mind, the endocrine system, and the body's defensive response, I realized that true recovery occurs from within.
                </p>
                <p className="story-p">
                  Over the past three years, my practice has focused on empowering women with PCOS/PCOD and helping individuals recover from mental burnout and fatigue. Seeing patients reclaim their cycles, sleep, and emotional peace is my absolute driving force.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal y={30} delay={0.2}>
              <div className="story-box-wrapper">
                <div className="story-img-box">
                  <img
                    src="https://res.cloudinary.com/dglf2h0t1/image/upload/v1781118110/IMG_2064_qpmzlu.jpg"
                    alt="Dr. Helee Patel"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      display: 'block',
                      borderRadius: 'inherit'
                    }}
                  />
                </div>
                <div className="quote-badge glass-card">
                  <p className="badge-quote">"Homeopathy cure does not suppress symptoms; it gently wakes the body's natural defense systems to achieve permanent balance."</p>
                  <span className="badge-author">— Dr. Helee Patel</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CREDENTIALS (EGG SHELL background) */}
      <section className="section section-soft">
        <div className="section-container">
          <div className="center-header">
            <span className="eyebrow">Qualifications</span>
            <h2 className="section-title text-wine">Academic & Clinical Credentials</h2>
          </div>

          <div className="credentials-grid">
            <ScrollReveal y={20} delay={0.1}>
              <div className="cred-card default-card glass-card">
                <span className="cred-icon">🎓</span>
                <h4>BHMS Degree</h4>
                <p>Bachelor of Homeopathic Medicine and Surgery, representing standard, clinical training in modern pathology, diagnostics, and homeopathic therapeutics.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal y={20} delay={0.2}>
              <div className="cred-card default-card glass-card">
                <span className="cred-icon">🎗️</span>
                <h4>Endocrine & PCOS Specialist</h4>
                <p>Advanced clinical certification in reproductive endocrinology, specializing in natural management protocols for insulin resistance, hirsutism, and amenorrhea.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal y={20} delay={0.3}>
              <div className="cred-card default-card glass-card">
                <span className="cred-icon">🧠</span>
                <h4>Neuropsychology Focus</h4>
                <p>In-depth specialization in behavioral homeopathy and neuro-linguistic coaching to resolve psychosomatic anxiety, chronic insomnia, and stress disorders.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY (LINEN background) */}
      <section className="section section-warm">
        <div className="section-container">
          <div className="philosophy-card default-card glass-card">
            <div className="philosophy-accent">🌿</div>
            <ScrollReveal y={30}>
              <span className="eyebrow">Our Philosophy</span>
              <h2 className="section-title text-wine">Why Classical Homeopathy?</h2>
              <div className="philosophy-text-grid">
                <div className="phil-col">
                  <h4>Constitutional Prescription</h4>
                  <p>We do not give generic medicines. Each remedy is selected based on your physical constitution, emotional profile, thermal sensitivities, and chronic symptoms. This ensures the medicine fits you, not just your condition.</p>
                </div>
                <div className="phil-col">
                  <h4>Minimalist & Gentle</h4>
                  <p>By using micro-dosed natural stimulants, homeopathy prompts a self-corrective vital response. It is non-habit forming, carries zero toxicity, and is completely safe for teenagers, pregnant mothers, and seniors alike.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Photo Strip (WHITE background) */}
      <section className="section section-light">
        <div className="section-container">
          <div className="center-header">
            <span className="eyebrow">Our Spaces</span>
            <h2 className="section-title text-wine">Dr. Helee Patel in Practice</h2>
          </div>

          <div className="gallery-strip">
            <ScrollReveal y={20} delay={0.1}>
              <div className="gallery-placeholder">
                <img
                  src="https://res.cloudinary.com/dglf2h0t1/image/upload/v1781118110/IMG_2064_qpmzlu.jpg"
                  alt="Dr. Helee Patel"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                    borderRadius: 'inherit'
                  }}
                />
              </div>
            </ScrollReveal>
            <ScrollReveal y={20} delay={0.2}>
              <div className="gallery-placeholder">
                <img
                  src="https://res.cloudinary.com/dglf2h0t1/image/upload/v1781118110/IMG_2064_qpmzlu.jpg"
                  alt="Dr. Helee Patel"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                    borderRadius: 'inherit'
                  }}
                />
              </div>
            </ScrollReveal>
            <ScrollReveal y={20} delay={0.3}>
              <div className="gallery-placeholder">
                <img
                  src="https://res.cloudinary.com/dglf2h0t1/image/upload/v1781118110/IMG_2064_qpmzlu.jpg"
                  alt="Dr. Helee Patel"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                    borderRadius: 'inherit'
                  }}
                />
              </div>
            </ScrollReveal>
            <ScrollReveal y={20} delay={0.4}>
              <div className="gallery-placeholder">
                <img
                  src="https://res.cloudinary.com/dglf2h0t1/image/upload/v1781118110/IMG_2064_qpmzlu.jpg"
                  alt="Dr. Helee Patel"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                    borderRadius: 'inherit'
                  }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA SECTION (DARK gradient) */}
      <section className="section section-dark about-cta">
        <div className="noise-overlay"></div>
        <div className="orb-container">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
        </div>
        
        <div className="section-container">
          <div className="about-cta-card glass-card">
            <h2 className="section-title" style={{ color: '#EDE7DB' }}>Ready to Consult with Dr. Helee Patel?</h2>
            <p style={{ color: 'rgba(237,231,219,0.75)', marginBottom: '16px' }}>Schedule your one-on-one session and receive your personalized natural recovery blueprint.</p>
            <Link to="/book" className="btn-primary">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
