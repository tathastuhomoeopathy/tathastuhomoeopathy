import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { faqs } from '../../data/faqs'
import styles from './FAQSection.module.css'

export default function FAQSection() {
  const [openId, setOpenId] = useState(1)
  const shouldReduceMotion = useReducedMotion()

  const toggleFaq = (id) => {
    setOpenId(prev => prev === id ? null : id)
  }

  return (
    <section className={styles.section}>
      <div className={styles.faqWrap}>
        <span className={styles.eyebrow}>FAQS</span>
        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>

        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <div key={faq.id} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFaq(faq.id)}
              >
                <span>{faq.question}</span>
                <span className={`${styles.faqIcon} ${openId === faq.id ? styles.faqIconOpen : ''}`}>
                  +
                </span>
              </button>

              <motion.div
                className={styles.faqAnswerWrap}
                initial={false}
                animate={{
                  height: openId === faq.id ? 'auto' : 0,
                  opacity: openId === faq.id ? 1 : 0
                }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
