import React from 'react';
import GalleryReels from '../../components/GalleryReels/GalleryReels';
import { achievementImages } from '../../data/gallery';
import './Gallery.css';

export default function Gallery() {
  return (
    <div className="gallery-page">
      
      {/* HERO TITLE */}
      <section className="pageHero">
        <div className="pageHeroInner">
          <span className="pageHeroEyebrow">MOMENTS & MILESTONES</span>
          <h1 className="pageHeroTitle">Gallery</h1>
          <p className="pageHeroSubtitle">Explore our clinical facilities, public wellness events, achievements, and educational reels from Dr. Helee Patel.</p>
        </div>
      </section>

      {/* GALLERY REELS SECTION */}
      <GalleryReels />

      {/* ACHIEVEMENTS SECTION */}
      <section className="achievementsSection">
        <div className="achievementsHeader">
          <span className="eyebrow">COLLECTION</span>
          <h2 className="achievementsTitle">Achievements</h2>
        </div>

        <div className="achievementsStrip">
          {achievementImages.map((item) => (
            <div key={item.id} className="achievementCard">
              <img
                src={item.url}
                alt="Achievement"
                className="achievementImg"
              />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
