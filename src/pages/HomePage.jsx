import React from 'react';

import HeroSlider from '../components/home/HeroSlider';
import WelcomeSection from '../components/home/WelcomeSection';
import OurPatronessSection from '../components/home/OurPatronessSection';
import PriestMessageSection from '../components/home/PriestMessageSection';
import LatestNewsSection from '../components/home/LatestNewsSection';
import SpecialCelebrationsSection from '../components/home/SpecialCelebrationsSection';
import GallerySection from '../components/home/GallerySection';
import MassTimesStrip from '../components/home/MassTimesStrip';
import LocationSection from '../components/home/LocationSection';

import './HomePage.css';

/* ================================================================
   HOME PAGE — Clean, Spacious & Focused Layout
   Sections:
   1. Hero Slider
   2. Welcome to Sacred Heart of Jesus Church, Thodambila
   3. Our Patroness
   4. Message from Parish Priest
   5. Latest News & Announcements (Dedicated Grid Section)
   6. Special Celebrations (Feast banner)
   7. Photo Gallery Highlight
   8. Mass Times Strip
   9. Our Location
================================================================ */
const HomePage = () => {
  return (
    <main id="main-content">
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Welcome to Sacred Heart of Jesus Church, Thodambila */}
      <WelcomeSection />

      {/* 3. Our Patroness */}
      <OurPatronessSection />

      {/* 4. Message from Parish Priest */}
      <PriestMessageSection />

      {/* 5. Latest News & Announcements */}
      <LatestNewsSection />

      {/* 6. Special Celebrations */}
      <SpecialCelebrationsSection />

      {/* 7. Photo Gallery Highlight */}
      <GallerySection />

      {/* 8. Mass Times Strip */}
      <MassTimesStrip />

      {/* 9. Our Location */}
      <LocationSection />
    </main>
  );
};

export default HomePage;
