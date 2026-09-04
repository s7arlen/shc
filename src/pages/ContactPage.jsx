import React from 'react';
import { Link } from 'react-router-dom';
import ContactSection from '../components/home/ContactSection';
import LocationSection from '../components/home/LocationSection';

export const ContactPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <span className="page-hero__label">Reach Out To Us</span>
        <h1 className="page-hero__title">Contact & Location</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Contact</span>
        </div>
      </div>
    </section>
    <ContactSection />
    <LocationSection />
  </main>
);

export const NotFoundPage = () => (
  <main className="inner-page">
    <section className="section section--white" style={{ textAlign: 'center', padding: '6rem 0' }}>
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '5rem', color: 'var(--gold-antique)' }}>404</h1>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--brown-primary)', marginBottom: '1rem' }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="btn btn--primary">Return to Home Page</Link>
      </div>
    </section>
  </main>
);
