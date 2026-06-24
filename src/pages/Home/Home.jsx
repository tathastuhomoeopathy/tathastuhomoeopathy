import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { GiLotus, GiMeditation, GiSprout } from 'react-icons/gi';
import { FaBrain } from 'react-icons/fa';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { resultsData } from '../../data/results';
import { areasOfInterest } from '../../data/areasOfInterest';
import VideoReel from '../../components/VideoReel/VideoReel';
import FAQSection from '../../components/FAQSection/FAQSection';
import './Home.css';

const renderIcon = (icon) => {
  switch (icon) {
    case 'flower':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a15 15 0 0 0-3 9 3 3 0 1 0 6 0 15 15 0 0 0-3-9z" />
          <path d="M12 14a15 15 0 0 0-9 3 3 0 1 0 6 6 15 15 0 0 0 3-9z" />
          <path d="M12 14a15 15 0 0 0 9 3 3 0 1 0-6 6 15 15 0 0 0-3-9z" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case 'leaf':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z" />
          <path d="M19 2L12 13" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v18" />
          <path d="M3 12h18" />
          <path d="M18.36 5.64L5.64 18.36" />
          <path d="M5.64 5.64l12.72 12.72" />
        </svg>
      );
    case 'lotus':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-3.3 0-6-2.7-6-6 0-1.8.8-3.4 2.1-4.5C9.2 8.7 10.5 8 12 8s2.8.7 3.9 1.5c1.3 1.1 2.1 2.7 2.1 4.5 0 3.3-2.7 6-6 6zm0-10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
        </svg>
      );
    case 'pulse':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );
    default:
      return null;
  }
};

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

export default function Home() {
  const navigate = useNavigate();
  const homeResults = resultsData.slice(0, 5);
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 80, damping: 15 }
    }
  };

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
                <Link to="/services?type=pcos" className="btn-ghost">
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
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, delay: shouldReduceMotion ? 0 : 0.3 }}
          >
            <div className="hero-photo-box">
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
      <section className="section section-soft specialisationsSection">
        <div className="section-container">
          <div className="center-header specialisationsHeader">
            <span className="eyebrow">SPECIALISATIONS</span>
            <h2 className="section-title specialisationsTitle">Restoring Holistic Health</h2>
          </div>

          <div className="specialisationsStrip">
            {areasOfInterest.map((area) => (
              <div key={area.id} className="specCard">
                <div className="specIcon">
                  {renderIcon(area.icon)}
                </div>
                <h3 className="specTitle">{area.title}</h3>
                <p className="specSummary">{area.summary}</p>
                <button
                  className="specLearnMore"
                  onClick={() => navigate(`/areas-of-interest#${area.id}`)}
                >
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: FREE HEALTH QUIZ CTA (DARK gradient) */}
      <section className="section section-dark gradient-bg">
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
                <Link to="/services?type=pcos" className="quiz-opt-btn glass-card">
                  <span className="quiz-opt-icon"><GiLotus style={{ color: '#9B9879', fontSize: '20px' }} /></span>
                  <div className="quiz-opt-text">
                    <h4>PCOS/PCOD Health Check</h4>
                    <p>For Women's Cycle & Hormonal Health</p>
                  </div>
                </Link>
                <Link to="/services?type=mental" className="quiz-opt-btn glass-card">
                  <span className="quiz-opt-icon"><FaBrain style={{ color: '#9B9879', fontSize: '20px' }} /></span>
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

      <FAQSection />

      {/* SECTION 7: BOOK CONSULTATION CTA (DARK gradient) */}
      <section className="section section-dark book-cta-section gradient-bg">
        <div className="noise-overlay"></div>
        <div className="orb-container">
          <div className="orb orb-2"></div>
          <div className="orb orb-4"></div>
        </div>

        <div className="section-container">
          <ScrollReveal y={40}>
            <div className="book-cta-card glass-card">
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
