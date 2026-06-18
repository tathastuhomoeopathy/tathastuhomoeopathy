import { useRef, useState } from 'react'
import { galleryReels } from '../../data/gallery'
import styles from './GalleryReels.module.css'

export default function GalleryReels() {
  const [activeId, setActiveId] = useState(null)
  const [loadedIds, setLoadedIds] = useState([])
  const videoRefs = useRef({})

  const handleUnmute = (id) => {
    Object.entries(videoRefs.current).forEach(([key, vid]) => {
      if (vid && parseInt(key) !== id) {
        vid.muted = true
      }
    })
    const current = videoRefs.current[id]
    if (current) {
      current.muted = !current.muted
      setActiveId(current.muted ? null : id)
    }
  }

  const handleLoaded = (id) => {
    setLoadedIds(prev => [...prev, id])
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>VIDEO INTERACTION</span>
        <h2 className={styles.title}>Watch Our Reels</h2>
      </div>

      <p className={styles.swipeHint}>SWIPE / DRAG LEFT ↔</p>

      <div className={styles.reelStrip}>
        {galleryReels.map((item) => {
          const isLoaded = loadedIds.includes(item.id)
          const isActive = activeId === item.id

          return (
            <div key={item.id} className={styles.reelCard}>

              {!isLoaded && (
                <div className={styles.skeleton}>
                  <div className={styles.skeletonPulse} />
                </div>
              )}

              <video
                ref={el => videoRefs.current[item.id] = el}
                src={item.url}
                className={`${styles.video} ${isLoaded ? styles.videoVisible : ''}`}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                onLoadedData={() => handleLoaded(item.id)}
              />

              <button
                className={`${styles.unmuteBtn} ${isActive ? styles.unmuteBtnActive : ''}`}
                onClick={() => handleUnmute(item.id)}
                aria-label={isActive ? 'Mute' : 'Unmute'}
              >
                {isActive ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>
                    <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>
                    <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </button>

              <div className={styles.overlay} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
