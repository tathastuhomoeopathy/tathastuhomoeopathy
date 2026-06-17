import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Book.module.css'

export default function Book() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', concern: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const saveToSheets = async (paymentId) => {
    const sheetsUrl = import.meta.env.VITE_SHEETS_URL

    // Debug log 1 — check if URL exists
    console.log('Sheets URL:', sheetsUrl)

    if (!sheetsUrl) {
      console.error('ERROR: VITE_SHEETS_URL is not set in .env file!')
      return
    }

    const payload = {
      type: 'payment',
      name: form.name,
      email: form.email,
      phone: form.phone,
      concern: form.concern,
      paymentId: paymentId,
    }

    // Debug log 2 — check payload
    console.log('Sending payload:', JSON.stringify(payload))

    try {
      const response = await fetch(sheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      // Debug log 3 — response
      console.log('Response type:', response.type)
      console.log('Sheets request sent successfully')

    } catch (err) {
      // Debug log 4 — exact error
      console.error('FETCH ERROR:', err)
      console.error('Error name:', err.name)
      console.error('Error message:', err.message)
    }
  }

  const handlePayment = () => {
    if (!form.name || !form.email || !form.phone) {
      setError('Please fill all required fields.')
      return
    }
    setError('')

    console.log('handlePayment called') // debug

    // Call saveToSheets with test ID
    saveToSheets('TEST-' + Date.now())

    navigate('/booking-success', {
      state: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        paymentId: 'TEST-' + Date.now()
      }
    })

    /* RAZORPAY BLOCK — uncomment when key is ready
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: 50000,
      currency: 'INR',
      name: 'Dr. Helee Homeopathy',
      description: '1-on-1 Consultation with Dr. Helee Patel',
      handler: async function (response) {
        await saveToSheets(response.razorpay_payment_id)
        navigate('/booking-success', {
          state: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            paymentId: response.razorpay_payment_id
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
        ondismiss: () => setLoading(false)
      }
    }
    const razor = new window.Razorpay(options)
    razor.open()
    */
  }

  return (
    <div className={styles.bookPage}>

      {/* Hero */}
      <section className={`${styles.bookHero} gradient-bg`}>
        <div className={styles.bookHeroInner}>
          <span className={styles.eyebrow}>ONE-ON-ONE CONSULTATION</span>
          <h1 className={styles.bookTitle}>Book Your Session with Dr. Helee Patel</h1>
          <p className={styles.bookSubtitle}>Fill your details below, complete the payment, and you will be taken to book your preferred time slot directly.</p>
        </div>
      </section>

      {/* What you get */}
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
            <p className={styles.featureDesc}>Secure payment via RazorPay. Your slot is confirmed only after payment.</p>
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
          <p className={styles.formSubtitle}>All fields marked * are required</p>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Full Name *</label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="Your full name"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Email Address *</label>
            <input
              type="email"
              className={styles.formInput}
              placeholder="your@email.com"
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Phone Number *</label>
            <input
              type="tel"
              className={styles.formInput}
              placeholder="+91 XXXXX XXXXX"
              value={form.phone}
              onChange={e => handleChange('phone', e.target.value)}
            />
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

          {error && (
            <p className={styles.errorMsg}>{error}</p>
          )}

          <button
            className={styles.submitBtn}
            onClick={handlePayment}
          >
            Book Consultation →
          </button>
        </div>
      </section>

    </div>
  )
}
