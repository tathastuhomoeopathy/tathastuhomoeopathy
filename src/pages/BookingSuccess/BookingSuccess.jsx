import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './BookingSuccess.module.css'

export default function BookingSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const { name, email, paymentId, amount } = location.state || {}

  // PROTECTION — bina payment ke direct access block
  useEffect(() => {
    if (!paymentId) {
      navigate('/', { replace: true })
    }
  }, [paymentId, navigate])

  // Calendly event → Google Sheets update
  useEffect(() => {
    const handleCalendly = async (e) => {
      if (e.data?.event === 'calendly.event_scheduled') {
        const startTime = e.data.payload?.event?.start_time || ''
        const dateObj = new Date(startTime)
        const date = dateObj.toLocaleDateString('en-IN')
        const time = dateObj.toLocaleTimeString('en-IN', {
          hour: '2-digit', minute: '2-digit', hour12: true
        })

        try {
          await fetch(import.meta.env.VITE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'calendly',
              email: email,
              date: date,
              time: time,
            })
          })
        } catch (err) {
          console.error('Calendly sheet update error:', err)
        }
      }
    }

    window.addEventListener('message', handleCalendly)
    return () => window.removeEventListener('message', handleCalendly)
  }, [email])

  if (!paymentId) return null

  return (
    <div className={styles.successPage}>

      <section className={styles.successHero}>
        <div className={styles.successInner}>
          <div className={styles.checkCircle}>✓</div>
          <h1 className={styles.successTitle}>Payment Confirmed!</h1>
          <p className={styles.successSubtitle}>
            Thank you <strong>{name}</strong>! Your payment of <strong>Rs. {amount}</strong> was successful.
            Now please book your preferred consultation slot below.
          </p>
          <p className={styles.paymentId}>Payment ID: {paymentId}</p>
        </div>
      </section>

      <section className={styles.calendlySection}>
        <div className={styles.calendlyHeader}>
          <span className={styles.eyebrow}>BOOK YOUR SLOT</span>
          <h2 className={styles.calendlyTitle}>Choose Your Preferred Date & Time</h2>
          <p className={styles.calendlySubtitle}>
            Select a slot that works best for you. Dr. Helee Patel will meet you at the chosen time.
          </p>
        </div>

        <div className={styles.calendlyEmbed}>
          <iframe
            src={`https://calendly.com/tathastuhomoeopathy/30min?hide_gdpr_banner=1&primary_color=4D342D&name=${encodeURIComponent(name || '')}&email=${encodeURIComponent(email || '')}`}
            width="100%"
            style={{ width: '100%', minHeight: '700px', border: 'none', display: 'block' }}
            frameBorder="0"
            scrolling="yes"
            title="Book a slot with Dr. Helee Patel"
          />
        </div>
      </section>

      <section className={styles.noteSection}>
        <p className={styles.noteText}>
          Once you book your slot, Dr. Helee Patel will send you a confirmation before the session.
        </p>
        <button className={styles.homeBtn} onClick={() => navigate('/')}>
          Back to Home
        </button>
      </section>

    </div>
  )
}
