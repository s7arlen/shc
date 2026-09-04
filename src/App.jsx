import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileBottomNav from './components/layout/MobileBottomNav';
import ScrollToTop from './components/common/ScrollToTop';
import ScrollUpButton from './components/common/ScrollUpButton';

import HomePage from './pages/HomePage';
import { OurParishPage, HistoryPage, PatronessPage, DiocesePage } from './pages/AboutPages';
import { ParishPriestPage, PastoralTeamPage, ParishCouncilPage, WardsPage, ParishOfficePage } from './pages/ParishPages';
import { MassTimingsPage, SacramentsPage, CatechismPage, PrayerPage } from './pages/FaithPages';
import OrganizationsPage from './pages/OrganizationsPage';
import { NewsPage, EventsPage, GalleryPage, VideosPage, NewsletterPage } from './pages/MediaPages';
import { ContactPage, NotFoundPage } from './pages/ContactPage';

import './styles/global.css';
import './pages/Organizations.css';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <div className="app-layout">
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* About */}
          <Route path="/about" element={<OurParishPage />} />
          <Route path="/about/our-parish" element={<OurParishPage />} />
          <Route path="/about/history" element={<HistoryPage />} />
          <Route path="/about/our-patroness" element={<PatronessPage />} />
          <Route path="/about/diocese" element={<DiocesePage />} />

          {/* Parish */}
          <Route path="/parish" element={<ParishPriestPage />} />
          <Route path="/parish/parish-priest" element={<ParishPriestPage />} />
          <Route path="/parish/pastoral-team" element={<PastoralTeamPage />} />
          <Route path="/parish/parish-council" element={<ParishCouncilPage />} />
          <Route path="/parish/wards" element={<WardsPage />} />
          <Route path="/parish/wards/:slug" element={<WardsPage />} />
          <Route path="/wards" element={<WardsPage />} />
          <Route path="/wards/:slug" element={<WardsPage />} />
          <Route path="/parish/office" element={<ParishOfficePage />} />

          {/* Faith */}
          <Route path="/faith" element={<MassTimingsPage />} />
          <Route path="/faith/mass-timings" element={<MassTimingsPage />} />
          <Route path="/faith/sacraments" element={<SacramentsPage />} />
          <Route path="/faith/catechism" element={<CatechismPage />} />
          <Route path="/faith/prayer" element={<PrayerPage />} />

          {/* Organizations */}
          <Route path="/organizations" element={<OrganizationsPage />} />
          <Route path="/organizations/:slug" element={<OrganizationsPage />} />

          {/* News & Events */}
          <Route path="/news" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />

          {/* Media */}
          <Route path="/media" element={<GalleryPage />} />
          <Route path="/media/gallery" element={<GalleryPage />} />
          <Route path="/media/videos" element={<VideosPage />} />
          <Route path="/media/newsletter" element={<NewsletterPage />} />

          {/* Contact */}
          <Route path="/contact" element={<ContactPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
      <MobileBottomNav />
      <ScrollUpButton />
    </Router>
  );
}

export default App;
