import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { areasOfInterest } from '../../data/areasOfInterest'
import styles from './AreasOfInterest.module.css'

export default function AreasOfInterest() {
  const location = useLocation()

  // Scroll to specific section if hash is present
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [location])

  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.pageHero}>
        <div className={styles.pageHeroInner}>
          <span className={styles.pageHeroEyebrow}>WHAT WE TREAT</span>
          <h1 className={styles.pageHeroTitle}>Areas of Interest</h1>
          <p className={styles.pageHeroSubtitle}>
            Explore the conditions and concerns Dr. Helee Patel specialises in treating through classical homeopathy.
          </p>
        </div>
      </section>

      {/* Each Area Section */}
      {areasOfInterest.map((area, idx) => (
        <section
          key={area.id}
          id={area.id}
          className={styles.areaSection}
          style={{ background: idx % 2 === 0 ? '#FFFFFF' : '#EDE7DB' }}
        >
          <div className={styles.areaInner}>
            <span className={styles.areaEyebrow}>SPECIALISATION</span>
            <h2 className={styles.areaTitle}>{area.title}</h2>
            <p className={styles.areaSummary}>{area.summary}</p>

            <div className={styles.conditionsList}>
              {area.conditions.map((condition, i) => (
                <div key={i} className={styles.conditionBlock}>
                  <h3 className={styles.conditionName}>{condition.name}</h3>
                  <p className={styles.conditionContent}>{condition.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Not Sure Where to Start?</h2>
          <p className={styles.ctaText}>Book a one-on-one consultation and let Dr. Helee Patel guide you to the right treatment path.</p>
          <a href="/book" className={styles.ctaBtn}>Book a Consultation</a>
        </div>
      </section>

    </div>
  )
}
