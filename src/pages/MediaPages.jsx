import React from 'react';
import { Link } from 'react-router-dom';
import LatestNewsSection from '../components/home/LatestNewsSection';
import UpcomingEventsSection from '../components/home/UpcomingEventsSection';
import GallerySection from '../components/home/GallerySection';
import VideoSection from '../components/home/VideoSection';
import NewsletterSection from '../components/home/NewsletterSection';

export const NewsPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <span className="page-hero__label">Parish Communications</span>
        <h1 className="page-hero__title">Latest News & Updates</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>News & Events</span> <span>/</span> <span>Latest News</span>
        </div>
      </div>
    </section>
    <LatestNewsSection />
  </main>
);

export const EventsPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <span className="page-hero__label">Parish Calendar</span>
        <h1 className="page-hero__title">Upcoming & Past Events</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>News & Events</span> <span>/</span> <span>Events</span>
        </div>
      </div>
    </section>
    <UpcomingEventsSection />
  </main>
);

export const GalleryPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <span className="page-hero__label">Visual Archive</span>
        <h1 className="page-hero__title">Photo Gallery</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Media</span> <span>/</span> <span>Gallery</span>
        </div>
      </div>
    </section>
    <GallerySection />
  </main>
);

export const VideosPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <span className="page-hero__label">Video Archive</span>
        <h1 className="page-hero__title">Parish Videos</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Media</span> <span>/</span> <span>Videos</span>
        </div>
      </div>
    </section>
    <VideoSection />
  </main>
);

export const NewsletterPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <span className="page-hero__label">Parish Monthly Voice</span>
        <h1 className="page-hero__title">Parish Newsletter</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Media</span> <span>/</span> <span>Newsletter</span>
        </div>
      </div>
    </section>
    <NewsletterSection />
  </main>
);
