import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { pcosQuiz, mentalQuiz, quizReports } from '../../data/quizData';
import './Services.css';

const letters = ['A', 'B', 'C', 'D'];

export default function Services() {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  // States for Inline PCOS Quiz
  const [pcosActive, setPcosActive] = useState(false);
  const [pcosIdx, setPcosIdx] = useState(0);
  const [pcosAnswers, setPcosAnswers] = useState({});
  const [pcosSelectedOpt, setPcosSelectedOpt] = useState(null);
  const [pcosFinished, setPcosFinished] = useState(false);
  const [pcosScore, setPcosScore] = useState(0);

  // States for Inline Mental Wellness Quiz
  const [mentalActive, setMentalActive] = useState(false);
  const [mentalIdx, setMentalIdx] = useState(0);
  const [mentalAnswers, setMentalAnswers] = useState({});
  const [mentalSelectedOpt, setMentalSelectedOpt] = useState(null);
  const [mentalFinished, setMentalFinished] = useState(false);
  const [mentalScore, setMentalScore] = useState(0);

  // Helper to determine risk level key based on score
  const getRiskKey = (score) => {
    if (score <= 6) return 'low';
    if (score <= 12) return 'mild';
    if (score <= 18) return 'moderate';
    return 'high';
  };

  // Smooth scroll handler to Section C
  const scrollToSectionC = () => {
    const sectionC = document.getElementById('consultation-section');
    if (sectionC) {
      sectionC.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // PCOS Inline Quiz Handlers
  const handlePcosSelect = (oIdx, score) => {
    setPcosSelectedOpt(oIdx);
    setPcosAnswers({ ...pcosAnswers, [pcosIdx]: score });
  };

  const handlePcosNext = () => {
    if (pcosSelectedOpt === null) return;
    if (pcosIdx < pcosQuiz.length - 1) {
      setPcosIdx(pcosIdx + 1);
      const nextSavedScore = pcosAnswers[pcosIdx + 1];
      if (nextSavedScore !== undefined) {
        const savedOptIdx = pcosQuiz[pcosIdx + 1].options.findIndex(o => o.score === nextSavedScore);
        setPcosSelectedOpt(savedOptIdx);
      } else {
        setPcosSelectedOpt(null);
      }
    } else {
      const finalScore = Object.values(pcosAnswers).reduce((sum, v) => sum + v, 0);
      setPcosScore(finalScore);
      setPcosFinished(true);
    }
  };

  const handlePcosPrev = () => {
    if (pcosIdx > 0) {
      setPcosIdx(pcosIdx - 1);
      const prevSavedScore = pcosAnswers[pcosIdx - 1];
      const savedOptIdx = pcosQuiz[pcosIdx - 1].options.findIndex(o => o.score === prevSavedScore);
      setPcosSelectedOpt(savedOptIdx);
    }
  };

  const resetPcosQuiz = () => {
    setPcosIdx(0);
    setPcosAnswers({});
    setPcosSelectedOpt(null);
    setPcosFinished(false);
    setPcosScore(0);
    setPcosActive(false);
  };

  // Mental Inline Quiz Handlers
  const handleMentalSelect = (oIdx, score) => {
    setMentalSelectedOpt(oIdx);
    setMentalAnswers({ ...mentalAnswers, [mentalIdx]: score });
  };

  const handleMentalNext = () => {
    if (mentalSelectedOpt === null) return;
    if (mentalIdx < mentalQuiz.length - 1) {
      setMentalIdx(mentalIdx + 1);
      const nextSavedScore = mentalAnswers[mentalIdx + 1];
      if (nextSavedScore !== undefined) {
        const savedOptIdx = mentalQuiz[mentalIdx + 1].options.findIndex(o => o.score === nextSavedScore);
        setMentalSelectedOpt(savedOptIdx);
      } else {
        setMentalSelectedOpt(null);
      }
    } else {
      const finalScore = Object.values(mentalAnswers).reduce((sum, v) => sum + v, 0);
      setMentalScore(finalScore);
      setMentalFinished(true);
    }
  };

  const handleMentalPrev = () => {
    if (mentalIdx > 0) {
      setMentalIdx(mentalIdx - 1);
      const prevSavedScore = mentalAnswers[mentalIdx - 1];
      const savedOptIdx = mentalQuiz[mentalIdx - 1].options.findIndex(o => o.score === prevSavedScore);
      setMentalSelectedOpt(savedOptIdx);
    }
  };

  const resetMentalQuiz = () => {
    setMentalIdx(0);
    setMentalAnswers({});
    setMentalSelectedOpt(null);
    setMentalFinished(false);
    setMentalScore(0);
    setMentalActive(false);
  };

  // Get current reports based on type & score
  const pcosReport = quizReports.pcos[getRiskKey(pcosScore)];
  const mentalReport = quizReports.mental[getRiskKey(mentalScore)];

  return (
    <div className="services-page">
      
      {/* HERO SECTION — CENTER ALIGNED */}
      <section className="page-hero services-hero">
        <div className="page-hero-content services-hero-content">
          <span className="page-hero-eyebrow">Our Practices</span>
          <h1 className="page-hero-title services-hero-title">Our Healing Services</h1>
          <p className="page-hero-subtitle services-hero-subtitle">
            Experience specialized natural medicine designed around diagnostics. Choose an interactive self-assessment checkup or book a constitutional clinical consultation with Dr. Helee Patel.
          </p>
        </div>
      </section>

      <section className="section section-soft" id="pcos-quiz-section">
        <div className="section-container">
          <div className="services-block-item service-quiz-inline-wrapper">
            
            {/* Initial info card */}
            <div className="quiz-section-card">
              <span className="page-hero-eyebrow" style={{ color: '#9B9879', marginBottom: '8px' }}>Section A</span>
              <h2 className="page-hero-title" style={{ color: '#4D342D', fontSize: 'clamp(28px, 3.5vw, 40px)', marginBottom: '12px' }}>PCOS / PCOD Health Check</h2>
              <p className="page-hero-subtitle" style={{ color: '#6A6A53', maxWidth: '100%', marginBottom: '0' }}>
                Answer 8 quick questions about your symptoms and get your personalised health score.
              </p>
              {!pcosActive && (
                <button className="quiz-start-btn" onClick={() => setPcosActive(true)}>
                  Start the Quiz →
                </button>
              )}
            </div>

            {/* Quiz active screen */}
            {pcosActive && !pcosFinished && (
              <div className="quiz-wrapper">
                <div className="quiz-progress-bar-track">
                  <div 
                    className="quiz-progress-bar-fill" 
                    style={{ width: `${((pcosIdx + 1) / pcosQuiz.length) * 100}%` }}
                  ></div>
                </div>

                <span className="quiz-question-label">
                  Question {pcosIdx + 1} of {pcosQuiz.length}
                </span>
                
                <h3 className="quiz-question-text">
                  {pcosQuiz[pcosIdx].question}
                </h3>

                <div className="quiz-options">
                  {pcosQuiz[pcosIdx].options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`quiz-option ${pcosSelectedOpt === oIdx ? 'selected' : ''}`}
                      onClick={() => handlePcosSelect(oIdx, opt.score)}
                    >
                      <span className="quiz-option-letter">{letters[oIdx]}</span>
                      <span className="quiz-option-text">{opt.label}</span>
                    </div>
                  ))}
                </div>

                <div className="quiz-nav">
                  <button 
                    className="quiz-nav-prev" 
                    onClick={handlePcosPrev} 
                    disabled={pcosIdx === 0}
                    style={{ opacity: pcosIdx === 0 ? 0.4 : 1, cursor: pcosIdx === 0 ? 'not-allowed' : 'pointer' }}
                  >
                    ← Prev
                  </button>
                  <button 
                    className="quiz-nav-next" 
                    onClick={handlePcosNext} 
                    disabled={pcosSelectedOpt === null}
                    style={{ opacity: pcosSelectedOpt === null ? 0.6 : 1 }}
                  >
                    {pcosIdx === pcosQuiz.length - 1 ? 'Finish →' : 'Next →'}
                  </button>
                </div>
              </div>
            )}

            {/* Quiz result screen */}
            {pcosActive && pcosFinished && (
              <div style={{
                background: 'rgba(15, 9, 4, 0.80)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(237, 231, 219, 0.25)',
                borderRadius: '24px',
                padding: isMobile ? '28px 20px' : '48px',
                boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
                width: '100%',
                maxWidth: '640px',
                margin: isMobile ? '0 16px' : '0 auto',
                color: '#EDE7DB',
                textAlign: 'left'
              }}>

                {/* Score Badge */}
                <div style={{
                  width: '96px', height: '96px', borderRadius: '50%',
                  background: 'rgba(237,231,219,0.1)',
                  border: '2px solid rgba(237,231,219,0.4)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 14px'
                }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '38px', color: '#EDE7DB', lineHeight: 1 }}>
                    {pcosScore}
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(237,231,219,0.55)' }}>
                    / 24
                  </span>
                </div>

                {/* Risk Label */}
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
                  letterSpacing: '3px', textTransform: 'uppercase',
                  color: '#DDCCB7', textAlign: 'center', marginBottom: '36px'
                }}>
                  {pcosReport?.level}
                </p>

                {/* Section 1 — What This Means */}
                <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(237,231,219,0.15)' }}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '20px',
                    color: '#EDE7DB',
                    marginBottom: '10px',
                    fontWeight: '500',
                    display: 'block'
                  }}>
                    What This Means
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    color: 'rgba(237,231,219,0.85)',
                    lineHeight: '1.8',
                    margin: 0
                  }}>
                    {pcosReport?.whatThisMeans}
                  </p>
                </div>

                {/* Section 2 — What Is Happening In Your Body */}
                <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(237,231,219,0.15)' }}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '20px',
                    color: '#EDE7DB',
                    marginBottom: '10px',
                    fontWeight: '500',
                    display: 'block'
                  }}>
                    What Is Happening In Your Body
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    color: 'rgba(237,231,219,0.85)',
                    lineHeight: '1.8',
                    margin: 0
                  }}>
                    {pcosReport?.whatIsHappening}
                  </p>
                </div>

                {/* Section 3 — Suggested Precautions */}
                <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(237,231,219,0.15)' }}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '20px',
                    color: '#EDE7DB',
                    marginBottom: '14px',
                    fontWeight: '500',
                    display: 'block'
                  }}>
                    Suggested Precautions
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {pcosReport?.precautions.map((item, i) => (
                      <li key={i} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '12px',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '14px',
                        color: 'rgba(237,231,219,0.85)',
                        lineHeight: '1.7'
                      }}>
                        <span style={{ color: '#DDCCB7', fontSize: '10px', marginTop: '5px', flexShrink: 0 }}>✦</span>
                        <span style={{ color: 'rgba(237,231,219,0.85)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 4 — Dr. Helee's Recommendation */}
                <div style={{ marginBottom: '8px', paddingBottom: '24px', borderBottom: '1px solid rgba(237,231,219,0.15)' }}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '20px',
                    color: '#EDE7DB',
                    marginBottom: '10px',
                    fontWeight: '500',
                    display: 'block'
                  }}>
                    Dr. Helee's Recommendation
                  </p>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '16px',
                    fontStyle: 'italic',
                    color: '#DDCCB7',
                    lineHeight: '1.8',
                    margin: 0
                  }}>
                    {pcosReport?.recommendation}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => navigate('/book')}
                  style={{
                    display: 'block', width: '100%',
                    background: '#EDE7DB', color: '#4D342D',
                    border: 'none', padding: '18px 32px',
                    borderRadius: '40px', fontSize: '15px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: '500', cursor: 'pointer',
                    textAlign: 'center', marginTop: '32px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.25)'
                  }}
                >
                  Get Your Full Report — Book a 1-on-1 with Dr. Helee ↓
                </button>

                {/* Retake */}
                <button
                  onClick={resetPcosQuiz}
                  style={{
                    display: 'block', margin: '16px auto 0',
                    background: 'none', border: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '12px',
                    color: 'rgba(237,231,219,0.45)',
                    cursor: 'pointer'
                  }}
                >
                  Retake Quiz
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* SECTION B — Mental Wellness Quiz (LINEN) */}
      <section className="section section-warm" id="mental-quiz-section">
        <div className="section-container">
          <div className="services-block-item service-quiz-inline-wrapper">
            
            {/* Initial info card */}
            <div className="quiz-section-card">
              <span className="page-hero-eyebrow" style={{ color: '#9B9879', marginBottom: '8px' }}>Section B</span>
              <h2 className="page-hero-title" style={{ color: '#4D342D', fontSize: 'clamp(28px, 3.5vw, 40px)', marginBottom: '12px' }}>Mental Wellness Check</h2>
              <p className="page-hero-subtitle" style={{ color: '#6A6A53', maxWidth: '100%', marginBottom: '0' }}>
                A quick self-assessment to understand your current mental and emotional health.
              </p>
              {!mentalActive && (
                <button className="quiz-start-btn" onClick={() => setMentalActive(true)}>
                  Start the Quiz →
                </button>
              )}
            </div>

            {/* Quiz active screen */}
            {mentalActive && !mentalFinished && (
              <div className="quiz-wrapper">
                <div className="quiz-progress-bar-track">
                  <div 
                    className="quiz-progress-bar-fill" 
                    style={{ width: `${((mentalIdx + 1) / mentalQuiz.length) * 100}%` }}
                  ></div>
                </div>

                <span className="quiz-question-label">
                  Question {mentalIdx + 1} of {mentalQuiz.length}
                </span>
                
                <h3 className="quiz-question-text">
                  {mentalQuiz[mentalIdx].question}
                </h3>

                <div className="quiz-options">
                  {mentalQuiz[mentalIdx].options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className={`quiz-option ${mentalSelectedOpt === oIdx ? 'selected' : ''}`}
                      onClick={() => handleMentalSelect(oIdx, opt.score)}
                    >
                      <span className="quiz-option-letter">{letters[oIdx]}</span>
                      <span className="quiz-option-text">{opt.label}</span>
                    </div>
                  ))}
                </div>

                <div className="quiz-nav">
                  <button 
                    className="quiz-nav-prev" 
                    onClick={handleMentalPrev} 
                    disabled={mentalIdx === 0}
                    style={{ opacity: mentalIdx === 0 ? 0.4 : 1, cursor: mentalIdx === 0 ? 'not-allowed' : 'pointer' }}
                  >
                    ← Prev
                  </button>
                  <button 
                    className="quiz-nav-next" 
                    onClick={handleMentalNext} 
                    disabled={mentalSelectedOpt === null}
                    style={{ opacity: mentalSelectedOpt === null ? 0.6 : 1 }}
                  >
                    {mentalIdx === mentalQuiz.length - 1 ? 'Finish →' : 'Next →'}
                  </button>
                </div>
              </div>
            )}

            {/* Quiz result screen */}
            {mentalActive && mentalFinished && (
              <div style={{
                background: 'rgba(15, 9, 4, 0.80)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(237, 231, 219, 0.25)',
                borderRadius: '24px',
                padding: isMobile ? '28px 20px' : '48px',
                boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
                width: '100%',
                maxWidth: '640px',
                margin: isMobile ? '0 16px' : '0 auto',
                color: '#EDE7DB',
                textAlign: 'left'
              }}>

                {/* Score Badge */}
                <div style={{
                  width: '96px', height: '96px', borderRadius: '50%',
                  background: 'rgba(237,231,219,0.1)',
                  border: '2px solid rgba(237,231,219,0.4)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 14px'
                }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '38px', color: '#EDE7DB', lineHeight: 1 }}>
                    {mentalScore}
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(237,231,219,0.55)' }}>
                    / 24
                  </span>
                </div>

                {/* Risk Label */}
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
                  letterSpacing: '3px', textTransform: 'uppercase',
                  color: '#DDCCB7', textAlign: 'center', marginBottom: '36px'
                }}>
                  {mentalReport?.level}
                </p>

                {/* Section 1 — What This Means */}
                <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(237,231,219,0.15)' }}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '20px',
                    color: '#EDE7DB',
                    marginBottom: '10px',
                    fontWeight: '500',
                    display: 'block'
                  }}>
                    What This Means
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    color: 'rgba(237,231,219,0.85)',
                    lineHeight: '1.8',
                    margin: 0
                  }}>
                    {mentalReport?.whatThisMeans}
                  </p>
                </div>

                {/* Section 2 — What Is Happening In Your Body */}
                <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(237,231,219,0.15)' }}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '20px',
                    color: '#EDE7DB',
                    marginBottom: '10px',
                    fontWeight: '500',
                    display: 'block'
                  }}>
                    What Is Happening In Your Body
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    color: 'rgba(237,231,219,0.85)',
                    lineHeight: '1.8',
                    margin: 0
                  }}>
                    {mentalReport?.whatIsHappening}
                  </p>
                </div>

                {/* Section 3 — Suggested Precautions */}
                <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(237,231,219,0.15)' }}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '20px',
                    color: '#EDE7DB',
                    marginBottom: '14px',
                    fontWeight: '500',
                    display: 'block'
                  }}>
                    Suggested Precautions
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {mentalReport?.precautions.map((item, i) => (
                      <li key={i} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '12px',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '14px',
                        color: 'rgba(237,231,219,0.85)',
                        lineHeight: '1.7'
                      }}>
                        <span style={{ color: '#DDCCB7', fontSize: '10px', marginTop: '5px', flexShrink: 0 }}>✦</span>
                        <span style={{ color: 'rgba(237,231,219,0.85)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 4 — Dr. Helee's Recommendation */}
                <div style={{ marginBottom: '8px', paddingBottom: '24px', borderBottom: '1px solid rgba(237,231,219,0.15)' }}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '20px',
                    color: '#EDE7DB',
                    marginBottom: '10px',
                    fontWeight: '500',
                    display: 'block'
                  }}>
                    Dr. Helee's Recommendation
                  </p>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '16px',
                    fontStyle: 'italic',
                    color: '#DDCCB7',
                    lineHeight: '1.8',
                    margin: 0
                  }}>
                    {mentalReport?.recommendation}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => navigate('/book')}
                  style={{
                    display: 'block', width: '100%',
                    background: '#EDE7DB', color: '#4D342D',
                    border: 'none', padding: '18px 32px',
                    borderRadius: '40px', fontSize: '15px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: '500', cursor: 'pointer',
                    textAlign: 'center', marginTop: '32px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.25)'
                  }}
                >
                  Get Your Full Report — Book a 1-on-1 with Dr. Helee ↓
                </button>

                {/* Retake */}
                <button
                  onClick={resetMentalQuiz}
                  style={{
                    display: 'block', margin: '16px auto 0',
                    background: 'none', border: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '12px',
                    color: 'rgba(237,231,219,0.45)',
                    cursor: 'pointer'
                  }}
                >
                  Retake Quiz
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* SECTION C — One-on-One Consultation (DARK GRADIENT) */}
      <section className="section section-dark" id="consultation-section">
        <div className="noise-overlay"></div>
        <div className="orb-container">
          <div className="orb orb-2"></div>
          <div className="orb orb-4"></div>
        </div>
        
        <div className="section-container">
          <div className="services-block-item">
            <div className="consultation-details-card glass-card">
              <span className="eyebrow">Section C</span>
              <h2 className="section-title">Book a One-on-One Consultation</h2>
              <p className="section-subtitle" style={{ marginBottom: '24px' }}>
                A deep constitutional review of all your symptoms, lifestyle, triggers and emotional patterns. Dr. Helee Patel creates a fully personalised homeopathic treatment plan for you.
              </p>

              <div>
                <button onClick={() => navigate('/book')} className="consult-book-btn">
                  Book a 1-on-1 with Dr. Helee →
                </button>
              </div>

              <div className="consult-steps-grid">
                <h3 className="section-title" style={{ fontSize: '1.8rem' }}>What to Expect</h3>
                <div className="steps-container">
                  <div className="step-item glass-card">
                    <span className="step-num">01</span>
                    <div className="step-txt">
                      <h4>Book</h4>
                      <p>Secure checkout on our booking page.</p>
                    </div>
                  </div>
                  <div className="step-item glass-card">
                    <span className="step-num">02</span>
                    <div className="step-txt">
                      <h4>Consult</h4>
                      <p>60-min depth analysis with Dr. Helee Patel.</p>
                    </div>
                  </div>
                  <div className="step-item glass-card">
                    <span className="step-num">03</span>
                    <div className="step-txt">
                      <h4>Receive Your Plan</h4>
                      <p>Get remedies & integrated coaching guidelines.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
