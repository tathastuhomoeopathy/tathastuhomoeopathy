import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { GiLotus, GiMeditation, GiSprout } from 'react-icons/gi';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { resultsData } from '../../data/results';
import VideoReel from '../../components/VideoReel/VideoReel';
import './Home.css';

// Framer Motion Animation Settings
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, damping: 15 }
  }
};



export default function Home() {
  const navigate = useNavigate();
  const homeResults = resultsData.slice(0, 5);

  return (
    <div className="home-page">
      
      {/* SECTION 1: HERO (DARK gradient with animated orbs) */}
      <section className="hero">
        <div className="hero-orb-1"></div>
        <div className="hero-orb-2"></div>
        <div className="hero-orb-3"></div>

        <div className="hero-content">
          <motion.div 
            className="hero-content-wrapper"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="hero-glass-card glass-card">
              <motion.div className="hero-tag" variants={itemVariants}>
                Homeopathy · PCOS · Wellness
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="hero-h1">
                Heal From Within, <br /><em>Naturally</em>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="hero-sub">
                Embark on a personalized healing journey. We treat hormonal imbalances, PCOS/PCOD, and mental exhaustion through the gentle, root-cause science of classical homeopathy under Dr. Helee Patel.
              </motion.p>
              
              <motion.div variants={itemVariants} className="hero-btns">
                <Link to="/book" className="btn-primary">
                  Book a Clarity Call
                </Link>
                <Link to="/quiz?type=pcos" className="btn-ghost">
                  Take Free Quiz <FiArrowRight className="btn-icon" />
                </Link>
              </motion.div>
            </div>

            {/* Stats Row */}
            <motion.div className="hero-stats" variants={itemVariants}>
              <div className="stat-card">
                <div className="stat-number">200+</div>
                <div className="stat-label">Women Healed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">5★</div>
                <div className="stat-label">Rating</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">3+ Years</div>
                <div className="stat-label">Experience</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Natural Care</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-image-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="hero-photo-box">
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
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: ABOUT SNIPPET (WHITE background) */}
      <section className="section section-light">
        <div className="section-container">
          <div className="snippet-grid">
            <ScrollReveal y={40}>
              <div className="snippet-image-wrapper">
                <div className="snippet-img-box">
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
                <div className="snippet-image-accent"></div>
              </div>
            </ScrollReveal>

            <ScrollReveal y={40} delay={0.2}>
              <div className="snippet-content">
                <span className="eyebrow">Meet The Doctor</span>
                <h2 className="section-title">Rooted in Science, Guided by Nature</h2>
                <p className="snippet-text">
                  Dr. Helee Patel is a registered homeopathic consultant specializing in women's endocrine health and neuropsychological wellness. With an integrative approach, she combines traditional constitutional homeopathy with clinical coaching.
                </p>
                <p className="snippet-text">
                  Her philosophy is centered on the principle that symptoms are just signposts. By understanding your unique biological blueprint, she prescribes natural restoratives that address chronic issues from their foundations.
                </p>
                <div className="snippet-credentials">
                  <div className="cred-tag">BHMS Degree</div>
                  <div className="cred-tag">Hormonal Health Specialist</div>
                  <div className="cred-tag">Mindfulness Coach</div>
                </div>
                <Link to="/about" className="btn-link">
                  Read Full Story <FiArrowRight />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 3: SPECIALISATIONS (EGG SHELL background) */}
      <section className="section section-soft">
        <div className="section-container">
          <div className="center-header">
            <span className="eyebrow">Specialisations</span>
            <h2 className="section-title">Restoring Holistic Health</h2>
          </div>

          <div className="services-preview-grid">
            {/* Card 1: PCOS / PCOD Reversal */}
            <ScrollReveal y={30} delay={0.1}>
              <div className="service-preview-card default-card glass-card">
                <div className="service-icon-box">
                  <GiLotus size={32} />
                </div>
                <h3>PCOS / PCOD Reversal</h3>
                <p>Comprehensive hormonal rebalancing using classical homeopathic therapeutics targeting menstrual cycles, thyroid balance, and metabolic health.</p>
                <Link to="/services#pcos-pcod" className="card-link">Learn More</Link>
              </div>
            </ScrollReveal>

          {/* Card 2: Classical Homeopathy */}
          <ScrollReveal y={30} delay={0.2}>
            <div className="service-preview-card default-card glass-card">
              <div className="service-icon-box">
                <GiSprout size={32} />
              </div>
              <h3>Classical Homeopathy</h3>
              <p>Root-cause constitutional treatment using potentised remedies tailored to your unique physical, mental and emotional state.</p>
              <Link to="/services#one-on-one" className="card-link">Learn More</Link>
            </div>
          </ScrollReveal>

          {/* Card 3: Mental & Emotional Wellness */}
          <ScrollReveal y={30} delay={0.3}>
            <div className="service-preview-card default-card glass-card">
              <div className="service-icon-box">
                <GiMeditation size={32} />
              </div>
              <h3>Mental & Emotional Wellness</h3>
              <p>Gentle homeopathic protocols for anxiety, grief, burnout, panic attacks and emotional imbalances — no side effects, no dependency.</p>
              <Link to="/services#mental-wellness" className="card-link">Learn More</Link>
            </div>
          </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: FREE HEALTH QUIZ CTA (DARK gradient) */}
      <section className="section section-dark">
        <div className="noise-overlay"></div>
        <div className="orb-container">
          <div className="orb orb-1"></div>
          <div className="orb orb-3"></div>
        </div>
        
        <div className="section-container">
          <ScrollReveal y={40}>
            <div className="quiz-cta-card glass-card">
              <span className="eyebrow">Instant Self-Assessment</span>
              <h2 className="section-title">Know Your Health Status — Free</h2>
              <p className="section-subtitle text-center" style={{ marginBottom: '24px' }}>
                Take our 2-minute diagnostic questionnaire to identify subtle physical or mental stressors. Receive an immediate score and targeted suggestions from Dr. Helee Patel.
              </p>
              <div className="quiz-cta-options">
                <Link to="/quiz?type=pcos" className="quiz-opt-btn glass-card">
                  <span className="quiz-opt-icon">🌿</span>
                  <div className="quiz-opt-text">
                    <h4>PCOS/PCOD Health Check</h4>
                    <p>For Women's Cycle & Hormonal Health</p>
                  </div>
                </Link>
                <Link to="/quiz?type=mental" className="quiz-opt-btn glass-card">
                  <span className="quiz-opt-icon">🧠</span>
                  <div className="quiz-opt-text">
                    <h4>Mental Wellness Check</h4>
                    <p>For Stress, Anxiety & Sleep Evaluation</p>
                  </div>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 5: CLIENT RESULTS (LINEN background) */}
      <section className="resultsSection">
        <div className="resultsHeader">
          <span className="eyebrow">TRANSFORMATIONS</span>
          <h2 className="sectionTitle">Real Results, Real Women</h2>
        </div>

        <div className="reelStrip">
          {homeResults.map((item) => (
            <div key={item.id} className="reelCard">
              <img
                src={item.image}
                alt="Client Result"
                className="reelImg"
              />
            </div>
          ))}
        </div>

        <div className="viewMoreWrap">
          <button className="viewMoreBtn" onClick={() => navigate('/results')}>
            View More Results →
          </button>
        </div>
      </section>

      {/* SECTION 6: VIDEO TESTIMONIALS (WHITE background) */}
      <VideoReel />

      {/* SECTION 7: BOOK CONSULTATION CTA (DARK gradient) */}
      <section className="section section-dark book-cta-section">
        <div className="noise-overlay"></div>
        <div className="orb-container">
          <div className="orb orb-2"></div>
          <div className="orb orb-4"></div>
        </div>

        <div className="section-container">
          <ScrollReveal y={40}>
            <div className="book-cta-card glass-card">
              <div className="botanical-accent botanical-1">🍃</div>
              <div className="botanical-accent botanical-2">✨</div>
              
              <h2 className="section-title text-center" style={{ color: '#EDE7DB' }}>Ready to Start Your Healing Journey?</h2>
              <p className="section-subtitle text-center" style={{ color: 'rgba(237, 231, 219, 0.75)', marginBottom: '16px' }}>
                Book a personalized, one-on-one Clarity Call with Dr. Helee Patel. Map out your symptoms and identify the root biological blockages holding your health back.
              </p>
              <Link to="/book" className="btn-primary">
                Book a One-on-One Call
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
