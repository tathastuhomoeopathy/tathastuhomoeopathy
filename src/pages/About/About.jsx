import React from 'react';
import { Link } from 'react-router-dom';
import { GiLotus, GiDiploma, GiHealthNormal } from 'react-icons/gi';
import { FaBrain } from 'react-icons/fa';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { achievementImages } from '../../data/gallery';
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

      {/* DOCTOR STORY (EGG SHELL background) */}
      <section className="section section-soft">
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
                    src="https://res.cloudinary.com/dglf2h0t1/image/upload/f_auto,q_auto/v1782375640/WhatsApp_Image_2026-06-25_at_13.48.39_nuqlqy.jpg"
                    loading="lazy"
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

      {/* CREDENTIALS (WHITE background) */}
      <section className="section section-light">
        <div className="section-container">
          <div className="center-header">
            <span className="eyebrow">Qualifications</span>
            <h2 className="section-title text-wine">Academic & Clinical Credentials</h2>
          </div>

          <div className="credentials-grid">
            <ScrollReveal y={20} delay={0.1}>
              <div className="cred-card default-card glass-card">
                <span className="cred-icon"><GiDiploma style={{ color: '#9B9879', fontSize: '32px' }} /></span>
                <h4>BHMS Degree</h4>
                <p>Bachelor of Homeopathic Medicine and Surgery, representing standard, clinical training in modern pathology, diagnostics, and homeopathic therapeutics.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal y={20} delay={0.2}>
              <div className="cred-card default-card glass-card">
                <span className="cred-icon"><GiHealthNormal style={{ color: '#9B9879', fontSize: '32px' }} /></span>
                <h4>Endocrine & PCOS Specialist</h4>
                <p>Advanced clinical certification in reproductive endocrinology, specializing in natural management protocols for insulin resistance, hirsutism, and amenorrhea.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal y={20} delay={0.3}>
              <div className="cred-card default-card glass-card">
                <span className="cred-icon"><FaBrain style={{ color: '#9B9879', fontSize: '32px' }} /></span>
                <h4>Neuropsychology Focus</h4>
                <p>In-depth specialization in behavioral homeopathy and neuro-linguistic coaching to resolve psychosomatic anxiety, chronic insomnia, and stress disorders.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section: Mission & Vision */}
      <ScrollReveal y={30}>
        <section className="missionSection">
          <div className="missionGrid">
            <div className="missionCard">
              <span className="missionLabel">MY MISSION</span>
              <p className="missionText">
                To help individuals achieve lasting health by addressing the root cause of disease through personalized homoeopathic treatment, patient education, and holistic healing.
              </p>
            </div>
            <div className="missionCard">
              <span className="missionLabel">MY VISION</span>
              <p className="missionText">
                To create a healthier world where people understand their bodies, trust their healing potential, and receive individualized care that treats them as a whole person.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section: Treatment Philosophy */}
      <ScrollReveal y={30}>
        <section className="philosophySection">
          <span className="eyebrow">DOCTOR'S PHILOSOPHY</span>
          <h2 className="philosophyTitle">My Treatment Philosophy</h2>
          <p className="philosophySubtitle">At Tathastu Homoeopathy Clinic, I believe:</p>

          <div className="philosophyList">
            <div className="philosophyItem">
              <span className="philosophyNum">01</span>
              <p>Every patient is unique.</p>
            </div>
            <div className="philosophyItem">
              <span className="philosophyNum">02</span>
              <p>Disease begins long before symptoms appear.</p>
            </div>
            <div className="philosophyItem">
              <span className="philosophyNum">03</span>
              <p>Emotional health influences physical health.</p>
            </div>
            <div className="philosophyItem">
              <span className="philosophyNum">04</span>
              <p>Healing should be gentle and sustainable.</p>
            </div>
            <div className="philosophyItem">
              <span className="philosophyNum">05</span>
              <p>True treatment addresses the cause, not just the diagnosis.</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Achievements Section */}
      <ScrollReveal y={30}>
        <section className="achievementsSection">
          <div className="achievementsHeader">
            <span className="eyebrow">COLLECTION</span>
            <h2 className="achievementsTitle">Achievements</h2>
          </div>

          <div className="achievementsStrip">
            {achievementImages.map((item) => (
              <div key={item.id} className="achievementCard">
                <img
                  src={item.url}
                  alt="Achievement"
                  className="achievementImg"
                />
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Our Space section */}
      {/* <section className="section section-light">
        <div className="section-container">
          <div className="center-header">
            <span className="eyebrow">Our Spaces</span>
            <h2 className="section-title text-wine">Dr. Helee Patel in Practice</h2>
          </div>

          <div className="gallery-strip">
            <ScrollReveal y={20} delay={0.1}>
              <div className="gallery-placeholder">
                <img
                  src="https://res.cloudinary.com/dglf2h0t1/image/upload/f_auto,q_auto/v1781118110/IMG_2064_qpmzlu.jpg"
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
                  src="https://res.cloudinary.com/dglf2h0t1/image/upload/f_auto,q_auto/v1781118110/IMG_2064_qpmzlu.jpg"
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
                  src="https://res.cloudinary.com/dglf2h0t1/image/upload/f_auto,q_auto/v1781118110/IMG_2064_qpmzlu.jpg"
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
                  src="https://res.cloudinary.com/dglf2h0t1/image/upload/f_auto,q_auto/v1781118110/IMG_2064_qpmzlu.jpg"
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
      </section> */}

      {/* CTA SECTION (DARK gradient) */}
      <section className="section section-dark about-cta gradient-bg">
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
