import React from 'react';
import { Link } from 'react-router-dom';
import { sacraments } from '../data/sacraments';
import MassScheduleSection from '../components/home/MassScheduleSection';

export const MassTimingsPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <span className="page-hero__label">Liturgical Timings</span>
        <h1 className="page-hero__title">Mass Timings & Schedule</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Faith</span> <span>/</span> <span>Mass Timings</span>
        </div>
      </div>
    </section>
    <MassScheduleSection />
  </main>
);

export const SacramentsPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <span className="page-hero__label">Holy Sacraments</span>
        <h1 className="page-hero__title">The Sacraments</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Faith</span> <span>/</span> <span>Sacraments</span>
        </div>
      </div>
    </section>

    <section className="section section--cream">
      <div className="container">
        <div className="grid-2" style={{ gap: '2rem' }}>
          {sacraments.map((sac) => (
            <div key={sac.id} style={{ background: 'var(--warm-white)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-gold)', boxShadow: 'var(--shadow-soft)' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-antique)', fontWeight: 700 }}>Sacrament {sac.id}</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--brown-primary)', margin: '0.3rem 0 0.75rem' }}>{sac.name}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: '1.6', marginBottom: '1rem' }}>{sac.description}</p>
              
              <div style={{ background: 'var(--cream)', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--gold-antique)', marginBottom: '1rem' }}>
                <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--brown-primary)', marginBottom: '0.2rem' }}>Parish Procedure:</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-body)' }}>{sac.parishInfo}</span>
              </div>

              <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--brown-primary)', marginBottom: '0.4rem' }}>Requirements:</strong>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {sac.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export const CatechismPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <span className="page-hero__label">Faith Formation</span>
        <h1 className="page-hero__title">Parish Catechism</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Faith</span> <span>/</span> <span>Catechism</span>
        </div>
      </div>
    </section>

    <section className="section section--white">
      <div className="container" style={{ maxWidth: '850px' }}>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
          Our Catechism programme nurtures Catholic faith in children from Grade 1 through Grade 10, instilling Christian values, scriptural knowledge, and sacramental preparation.
        </p>

        <div style={{ background: 'var(--cream)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-gold)' }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--brown-primary)', marginBottom: '0.5rem' }}>Class Schedule</h4>
          <p style={{ lineHeight: '1.7', fontSize: '0.92rem' }}>
            <strong>Every Sunday:</strong> 8:00 AM – 9:00 AM (Followed by Children's Mass)<br />
            <strong>Location:</strong> Parish Catechism Centre / Hall<br />
            <strong>Coordinators:</strong> Dedicated Team of Catechism Teachers
          </p>
        </div>
      </div>
    </section>
  </main>
);

export const PrayerPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <span className="page-hero__label">Devotional Life</span>
        <h1 className="page-hero__title">Prayers & Devotions</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Faith</span> <span>/</span> <span>Prayer</span>
        </div>
      </div>
    </section>

    <section className="section section--cream">
      <div className="container" style={{ maxWidth: '850px' }}>
        <div style={{ background: 'var(--warm-white)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-gold)', marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--brown-primary)', marginBottom: '0.5rem' }}>Novena & Consecration to the Sacred Heart of Jesus</h3>
          <p style={{ fontStyle: 'italic', lineHeight: '1.8', color: 'var(--brown-primary)' }}>
            "O Most Sacred Heart of Jesus, fountain of all blessings and divine love, we consecrate our families and parish of Thodambila to You. Inflame our hearts with Your love and guide our steps in peace. Amen."
          </p>
        </div>
      </div>
    </section>
  </main>
);
