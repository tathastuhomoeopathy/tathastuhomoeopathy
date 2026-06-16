import { useRef, useState, useEffect } from 'react';
import styles from './VideoReel.module.css';
import { videoTestimonials } from '../../data/testimonials';

export default function VideoReel() {
  const [activeId, setActiveId] = useState(null);
  const [loadedIds, setLoadedIds] = useState([]);
  const videoRefs = useRef({});

  const handleUnmute = (id) => {
    // Mute all other videos first
    Object.entries(videoRefs.current).forEach(([key, vid]) => {
      if (vid && parseInt(key) !== id) {
        vid.muted = true;
      }
    });
    // Toggle current
    const current = videoRefs.current[id];
    if (current) {
      current.muted = !current.muted;
      setActiveId(current.muted ? null : id);
    }
  };

  const handleLoaded = (id) => {
    setLoadedIds(prev => [...prev, id]);
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>TESTIMONIALS</span>
        <h2 className={styles.title}>Hear It From Them</h2>
      </div>

      <div className={styles.reelStrip}>
        {videoTestimonials.map((item) => {
          const isLoaded = loadedIds.includes(item.id);
          const isActive = activeId === item.id;

          return (
            <div key={item.id} className={styles.reelCard}>

              {/* Loading skeleton */}
              {!isLoaded && (
                <div className={styles.skeleton}>
                  <div className={styles.skeletonPulse} />
                </div>
              )}

              {/* Video */}
              {/* NOTE: .mov files (like item id 4) may not play in all browsers. In production, consider converting to/specifying video/mp4 fallback. */}
              <video
                ref={el => videoRefs.current[item.id] = el}
                src={item.url}
                className={`${styles.video} ${isLoaded ? styles.videoVisible : ''}`}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                onLoadedData={() => handleLoaded(item.id)}
              />

              {/* Unmute button */}
              <button
                className={`${styles.unmuteBtn} ${isActive ? styles.unmuteBtnActive : ''}`}
                onClick={() => handleUnmute(item.id)}
                aria-label={isActive ? 'Mute video' : 'Unmute video'}
              >
                {isActive ? (
                  // Sound on icon
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>
                    <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  // Sound off icon
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>
                    <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </button>

              {/* Gradient overlay at bottom */}
              <div className={styles.overlay} />

            </div>
          );
        })}
      </div>

      <p className={styles.swipeHint}>SWIPE / DRAG LEFT ↔</p>
    </section>
  );
}
