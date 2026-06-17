import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Global Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

// Lazy-loaded Pages
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Services = lazy(() => import('./pages/Services/Services'));
const Quiz = lazy(() => import('./pages/Quiz/Quiz'));
const Results = lazy(() => import('./pages/Results/Results'));
const Testimonials = lazy(() => import('./pages/Testimonials/Testimonials'));
const Gallery = lazy(() => import('./pages/Gallery/Gallery'));
const Book = lazy(() => import('./pages/Book/Book'));
const BookingSuccess = lazy(() => import('./pages/BookingSuccess/BookingSuccess'));

// Page Transition Wrapper
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const location = useLocation();

  return (
    <div className="app-wrapper">
      {/* Resets scroll position when page changes */}
      <ScrollToTop />

      {/* Shared Header Navigation */}
      <Navbar />

      {/* Router Viewport with Transitions and lazy-load Suspense */}
      <main className="main-content">
        <Suspense fallback={
          <div style={{
            minHeight: '100vh',
            background: '#EDE7DB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '2px solid #DDCCB7',
              borderTop: '2px solid #4D342D',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
          </div>
        }>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
              <Route path="/quiz" element={<PageWrapper><Quiz /></PageWrapper>} />
              <Route path="/results" element={<PageWrapper><Results /></PageWrapper>} />
              <Route path="/testimonials" element={<PageWrapper><Testimonials /></PageWrapper>} />
              <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
              <Route path="/book" element={<PageWrapper><Book /></PageWrapper>} />
              <Route path="/booking-success" element={<PageWrapper><BookingSuccess /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Shared Footer Details */}
      <Footer />
    </div>
  );
}

