import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsCheckCircle } from 'react-icons/bs'
import styles from './BookingSuccess.module.css'

export default function BookingSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const { name, email, paymentId } = location.state || {}

  // If someone lands here directly without payment — redirect
  useEffect(() => {
    if (!paymentId) navigate('/')
  }, [paymentId, navigate])

  return (
    <div className={styles.successPage}>

      {/* Top confirmation */}
      <section className={`${styles.successHero} gradient-bg`}>
        <div className={styles.successInner}>
          <div className={styles.checkCircle}>
            <BsCheckCircle style={{ color: '#EDE7DB', fontSize: '32px' }} />
          </div>
          <h1 className={styles.successTitle}>Payment Confirmed!</h1>
          <p className={styles.successSubtitle}>
            Thank you {name}! Your payment was successful. Now please book your preferred consultation slot below.
          </p>
          <p className={styles.paymentId}>Payment ID: {paymentId}</p>
        </div>
      </section>

      {/* Calendly embed */}
      <section className={styles.calendlySection}>
        <div className={styles.calendlyHeader}>
          <span className={styles.eyebrow}>BOOK YOUR SLOT</span>
          <h2 className={styles.calendlyTitle}>Choose Your Preferred Date & Time</h2>
          <p className={styles.calendlySubtitle}>Select a slot that works best for you. Dr. Helee Patel will meet you at the chosen time.</p>
        </div>

        <div className={styles.calendlyEmbed}>
          <iframe
            src={`https://calendly.com/tathastuhomoeopathy/30min?hide_gdpr_banner=1&primary_color=4D342D&name=${encodeURIComponent(name || '')}&email=${encodeURIComponent(email || '')}`}
            width="100%"
            style={{
              width: '100%',
              minHeight: '700px',
              border: 'none',
              display: 'block'
            }}
            frameBorder="0"
            scrolling="yes"
            title="Book a slot with Dr. Helee Patel"
          />
        </div>
      </section>

      <section className={styles.noteSection}>
        <p className={styles.noteText}>
          Once you book your slot, Dr. Helee Patel will send you a confirmation on your email and WhatsApp before the session.
        </p>
        <button className={styles.homeBtn} onClick={() => navigate('/')}>
          Back to Home
        </button>
      </section>

    </div>
  )
}
