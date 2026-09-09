import React from 'react';

import HeroSlider from '../components/home/HeroSlider';
import WelcomeSection from '../components/home/WelcomeSection';
import PatronPriestCombinedSection from '../components/home/PatronPriestCombinedSection';
import LatestNewsSection from '../components/home/LatestNewsSection';
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

      {/* 3. Our Patron & Pastoral Message (Combined Desktop Section) */}
      <PatronPriestCombinedSection />

      {/* 5. Latest News & Announcements */}
      <LatestNewsSection />

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
