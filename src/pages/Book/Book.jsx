import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Book.module.css'

export default function Book() {
  const navigate = useNavigate()
  const location = useLocation()
  const prefill = location.state || {}

  const [form, setForm] = useState({
    name: prefill.name || '',
    email: prefill.email || '',
    phone: prefill.phone || '',
    concern: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const CONSULTATION_PRICE = 199 // Rs. 199

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setFieldErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const errors = {}
    if (!form.name.trim()) errors.name = 'Name is required'
    if (!form.email.trim()) errors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Enter a valid email'
    if (!form.phone.trim()) errors.phone = 'Phone number is required'
    else if (form.phone.length < 10) errors.phone = 'Enter a valid phone number'
    return errors
  }

  const saveToSheets = async (paymentId, status) => {
    try {
      await fetch(import.meta.env.VITE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'payment',
          name: form.name,
          email: form.email,
          phone: form.phone,
          concern: form.concern,
          paymentId: paymentId,
          status: status,
          amount: CONSULTATION_PRICE,
        })
      })
    } catch (err) {
      console.error('Sheets error:', err)
    }
  }

  const handlePayment = () => {
    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }
    setError('')
    setLoading(true)

    if (!window.Razorpay) {
      setLoading(false)
      setError('Payment system failed to load. Please refresh the page and try again.')
      return
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: CONSULTATION_PRICE * 100, // paise mein
      currency: 'INR',
      name: 'Dr. Helee Homeopathy',
      description: '1-on-1 Consultation with Dr. Helee Patel',
      image: 'https://res.cloudinary.com/dglf2h0t1/image/upload/v1781119066/Screenshot_2026-06-11_003316_kgutnv.png',
      handler: async function (response) {
        await saveToSheets(response.razorpay_payment_id, 'PAID')
        setLoading(false)
        navigate('/booking-success', {
          state: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            paymentId: response.razorpay_payment_id,
            amount: CONSULTATION_PRICE,
          }
        })
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      theme: { color: '#4D342D' },
      modal: {
        ondismiss: async function () {
          await saveToSheets('CANCELLED-' + Date.now(), 'CANCELLED')
          setLoading(false)
          setError('Payment was cancelled. Please try again.')
        }
      }
    }

    try {
      const razor = new window.Razorpay(options)
      razor.on('payment.failed', async function (response) {
        await saveToSheets(response.error.metadata?.payment_id || 'FAILED-' + Date.now(), 'FAILED')
        setLoading(false)
        setError('Payment failed: ' + response.error.description + '. Please try again.')
      })
      razor.open()
    } catch (err) {
      setLoading(false)
      setError('Something went wrong. Please refresh and try again.')
    }
  }

  return (
    <div className={styles.bookPage}>

      {/* Loading overlay */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner} />
          <p className={styles.loadingText}>Opening secure payment...</p>
        </div>
      )}

      {/* Hero */}
      <section className={styles.bookHero}>
        <div className={styles.bookHeroInner}>
          <span className={styles.eyebrow}>ONE-ON-ONE CONSULTATION</span>
          <h1 className={styles.bookTitle}>Book Your Session with Dr. Helee Patel</h1>
          <p className={styles.bookSubtitle}>Fill your details below, complete the payment, and you will be taken to book your preferred time slot directly.</p>
        </div>
      </section>

      {/* Steps */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <span className={styles.featureNum}>01</span>
            <h3 className={styles.featureTitle}>Fill Your Details</h3>
            <p className={styles.featureDesc}>Share your name, contact info and a brief about your concern.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureNum}>02</span>
            <h3 className={styles.featureTitle}>Complete Payment</h3>
            <p className={styles.featureDesc}>Secure payment of <strong>Rs. {CONSULTATION_PRICE}</strong> via RazorPay. Slot confirmed only after payment.</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureNum}>03</span>
            <h3 className={styles.featureTitle}>Book Your Slot</h3>
            <p className={styles.featureDesc}>After payment, choose your preferred date and time with Dr. Helee.</p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className={styles.formSection}>
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Reserve Your Session</h2>
          <p className={styles.formSubtitle}>Consultation Fee: <strong>Rs. {CONSULTATION_PRICE}</strong></p>

          {prefill.name && (
            <div style={{
              background: 'rgba(155,152,121,0.1)',
              border: '1px solid rgba(155,152,121,0.3)',
              borderRadius: '10px',
              padding: '10px 16px',
              marginBottom: '20px'
            }}>
              <p style={{
                fontSize: '13px',
                color: '#6A6A53',
                fontFamily: "'DM Sans', sans-serif",
                margin: 0
              }}>
                ✓ Your details have been prefilled from your quiz
              </p>
            </div>
          )}

          <div className={styles.formField}>
            <label className={styles.formLabel}>Full Name *</label>
            <input
              type="text"
              className={`${styles.formInput} ${fieldErrors.name ? styles.inputError : ''}`}
              placeholder="Your full name"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
            />
            {fieldErrors.name && <span className={styles.errorText}>{fieldErrors.name}</span>}
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Email Address *</label>
            <input
              type="email"
              className={`${styles.formInput} ${fieldErrors.email ? styles.inputError : ''}`}
              placeholder="your@email.com"
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
            />
            {fieldErrors.email && <span className={styles.errorText}>{fieldErrors.email}</span>}
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Phone Number *</label>
            <input
              type="tel"
              className={`${styles.formInput} ${fieldErrors.phone ? styles.inputError : ''}`}
              placeholder="+91 XXXXX XXXXX"
              value={form.phone}
              onChange={e => handleChange('phone', e.target.value)}
            />
            {fieldErrors.phone && <span className={styles.errorText}>{fieldErrors.phone}</span>}
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Brief About Your Concern (Optional)</label>
            <textarea
              className={`${styles.formInput} ${styles.formTextarea}`}
              placeholder="Describe your symptoms or health concern briefly..."
              value={form.concern}
              onChange={e => handleChange('concern', e.target.value)}
            />
          </div>

          {error && <p className={styles.errorMsg}>{error}</p>}

          <button
            className={styles.submitBtn}
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Book Consultation — Rs. ${CONSULTATION_PRICE} →`}
          </button>

          <p className={styles.secureNote}>🔒 Secured by RazorPay. Your data is safe.</p>
        </div>
      </section>

    </div>
  )
}
