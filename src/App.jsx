import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Global Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Quiz from './pages/Quiz/Quiz';
import Results from './pages/Results/Results';
import Testimonials from './pages/Testimonials/Testimonials';
import Gallery from './pages/Gallery/Gallery';
import Book from './pages/Book/Book';
import BookingSuccess from './pages/BookingSuccess/BookingSuccess';

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

      {/* Router Viewport with Transitions */}
      <main className="main-content">
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
      </main>

      {/* Shared Footer Details */}
      <Footer />
    </div>
  );
}

