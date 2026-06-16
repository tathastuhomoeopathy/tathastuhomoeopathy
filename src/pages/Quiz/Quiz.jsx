import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';
import { pcosQuiz, mentalQuiz, scoreRanges, quizReports } from '../../data/quizData';
import './Quiz.css';

export default function Quiz() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const quizType = searchParams.get('type'); // 'pcos' or 'mental'

  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionIdx]: score }
  const [selectedOptIdx, setSelectedOptIdx] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [resultOutcome, setResultOutcome] = useState(null);

  // Initialize questions list based on quiz type
  useEffect(() => {
    if (quizType === 'pcos') {
      setQuestions(pcosQuiz);
    } else if (quizType === 'mental') {
      setQuestions(mentalQuiz);
    } else {
      setQuestions([]);
    }
    // Reset state
    setCurrentIdx(0);
    setAnswers({});
    setSelectedOptIdx(null);
    setIsFinished(false);
    setTotalScore(0);
    setResultOutcome(null);
  }, [quizType]);

  // Handle option select
  const handleSelectOption = (optIdx, score) => {
    setSelectedOptIdx(optIdx);
    setAnswers({
      ...answers,
      [currentIdx]: score
    });
  };

  // Next Question
  const handleNext = () => {
    if (selectedOptIdx === null) return;
    
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      // Retrieve previous selected option index for next question if already answered
      const nextSavedScore = answers[currentIdx + 1];
      if (nextSavedScore !== undefined) {
        const nextQuestion = questions[currentIdx + 1];
        const savedOptIdx = nextQuestion.options.findIndex(opt => opt.score === nextSavedScore);
        setSelectedOptIdx(savedOptIdx >= 0 ? savedOptIdx : null);
      } else {
        setSelectedOptIdx(null);
      }
    } else {
      // Calculate final score
      const finalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
      setTotalScore(finalScore);
      
      // Determine score range matching the final score
      const outcome = scoreRanges.find(range => finalScore >= range.min && finalScore <= range.max);
      setResultOutcome(outcome);
      setIsFinished(true);
    }
  };

  // Previous Question
  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      const prevSavedScore = answers[currentIdx - 1];
      const prevQuestion = questions[currentIdx - 1];
      const savedOptIdx = prevQuestion.options.findIndex(opt => opt.score === prevSavedScore);
      setSelectedOptIdx(savedOptIdx >= 0 ? savedOptIdx : null);
    }
  };

  // If no valid type is chosen, show the selector menu
  if (!quizType || (quizType !== 'pcos' && quizType !== 'mental')) {
    return (
      <div className="quiz-selection-page">
        <div className="orb-container">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
        </div>
        <div className="selection-container">
          <div className="selection-card glass-card">
            <span className="eyebrow">Interactive Diagnostic Checkups</span>
            <h2>Select Your Health Assessment</h2>
            <p>
              Choose one of our clinical checkup quizzes. The questions are designed to trace vital symptoms and evaluate deep-seated stresses.
            </p>
            <div className="selection-options">
              <button className="select-btn glass-card" onClick={() => setSearchParams({ type: 'pcos' })}>
                <span className="select-btn-icon">🌿</span>
                <div className="select-btn-text">
                  <h3>PCOS/PCOD Health Assessment</h3>
                  <p>Analyzes cycle intervals, hormonal acne, hair changes, metabolic fatigue, and family history.</p>
                </div>
              </button>
              
              <button className="select-btn glass-card" onClick={() => setSearchParams({ type: 'mental' })}>
                <span className="select-btn-icon">🧠</span>
                <div className="select-btn-text">
                  <h3>Mental Wellness Assessment</h3>
                  <p>Evaluates sleep patterns, anxiety frequencies, energy blocks, emotional resilience, and concentration difficulties.</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];
  const progressPercent = questions.length ? Math.round(((currentIdx + 1) / questions.length) * 100) : 0;

  const resultData = quizReports[quizType]?.[totalScore <= 6 ? 'low' : totalScore <= 12 ? 'mild' : totalScore <= 18 ? 'moderate' : 'high'];
  const resultLevel = resultData?.level;
  const score = totalScore;
  const handleRetake = () => setSearchParams({ type: quizType });
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="quiz-play-page">
      <div className="orb-container">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      <div className="quiz-play-container">
        <Link to="/quiz" className="back-link">
          <FiArrowLeft /> Back to Selection
        </Link>

        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div 
              key="quiz-card"
              className="quiz-card glass-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress Bar */}
              <div className="progress-header">
                <span className="progress-label">
                  {quizType === 'pcos' ? 'PCOS Health Quiz' : 'Mental Wellness Quiz'} · Question {currentIdx + 1} of {questions.length}
                </span>
                <div className="progress-bar-bg glass-card">
                  <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>

              {/* Question & Options Slide */}
              <div className="question-slide-wrapper">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIdx}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="question-slide"
                  >
                    <h3 className="quiz-question-title">{currentQuestion?.question}</h3>
                    
                    <div className="quiz-options-list">
                      {currentQuestion?.options.map((opt, oIdx) => {
                        const isSelected = selectedOptIdx === oIdx;
                        return (
                          <button
                            key={oIdx}
                            className={`quiz-option-btn glass-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleSelectOption(oIdx, opt.score)}
                          >
                            <span className="option-indicator">
                              {isSelected ? <FiCheck /> : String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="option-label">{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="quiz-controls">
                <button 
                  className="control-btn prev-btn" 
                  onClick={handlePrev}
                  disabled={currentIdx === 0}
                >
                  <FiArrowLeft /> Prev
                </button>
                
                <button 
                  className="control-btn next-btn btn-wine" 
                  onClick={handleNext}
                  disabled={selectedOptIdx === null}
                >
                  {currentIdx === questions.length - 1 ? 'Finish Assessment' : 'Next'} <FiArrowRight />
                </button>
              </div>
            </motion.div>
          ) : (
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
                  {score}
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
                {resultLevel}
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
                  {resultData.whatThisMeans}
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
                  {resultData.whatIsHappening}
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
                  {resultData.precautions.map((item, i) => (
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
                  {resultData.recommendation}
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
                onClick={handleRetake}
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
        </AnimatePresence>
      </div>
    </div>
  );
}
