import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import WelcomeSection from '../components/home/WelcomeSection';
import OurPatronessSection from '../components/home/OurPatronessSection';
import PriestMessageSection from '../components/home/PriestMessageSection';
import SpecialCelebrationsSection from '../components/home/SpecialCelebrationsSection';
import GallerySection from '../components/home/GallerySection';
import MassTimesStrip from '../components/home/MassTimesStrip';
import LocationSection from '../components/home/LocationSection';
import LiveParishFeedSection from '../components/home/LiveParishFeedSection';

import './HomePage.css';

/* ================================================================
   HOME PAGE — Clean, Spacious & Focused Layout
   Sections (in exact requested order):
   1. Hero Slider
   2. Welcome to Sacred Heart of Jesus Church, Thodambila (Church introduction)
   3. Our Patron (Devotion & History highlight)
   4. Message from Parish Priest (Pastoral greeting)
   5. Upcoming Events + Latest News (Side-by-side two-column updates)
   6. Special Celebrations (Feast banner)
   7. Photo Gallery Highlight (6 photos)
   8. Mass Times Strip (Sits above the map as "Plan Your Visit" info)
   9. Our Location (Map & Parish Address)
================================================================ */
const HomePage = () => {
  return (
    <main id="main-content">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Welcome to Sacred Heart of Jesus Church, Thodambila (Church introduction) */}
      <WelcomeSection />

      {/* 3. Our Patroness (Devotion & History highlight) */}
      <OurPatronessSection />

      {/* 4. Message from Parish Priest (Pastoral greeting) */}
      <PriestMessageSection />

      {/* 5. Live Parish Feed (Concept 9: Combined Social Wall Feed) */}
      <LiveParishFeedSection />

      {/* 6. Special Celebrations (Feast banner) */}
      <SpecialCelebrationsSection />

      {/* 7. Photo Gallery Highlight (6 photos) */}
      <GallerySection />

      {/* 8. Mass Times Strip (Sits naturally as "Plan Your Visit" info right above the map) */}
      <MassTimesStrip />

      {/* 9. Our Location (Map & Parish Address) */}
      <LocationSection />
    </main>
  );
};

export default HomePage;
