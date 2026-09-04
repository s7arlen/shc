import React from 'react';
import { Link } from 'react-router-dom';
import { leadership } from '../data/leadership';

export const ParishPriestPage = () => {
  const { parishPriest } = leadership;
  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="page-hero__content container">
          <span className="page-hero__label">Parish Leadership</span>
          <h1 className="page-hero__title">Parish Priest</h1>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Parish</span> <span>/</span> <span>Parish Priest</span>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem', alignItems: 'flex-start' }}>
            <div style={{ textAlign: 'center' }}>
              <img
                src={parishPriest.image}
                alt={parishPriest.name}
                style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--gold-antique)', margin: '0 auto 1rem', boxShadow: 'var(--shadow-med)' }}
              />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold-antique)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{parishPriest.designation}</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--brown-primary)' }}>{parishPriest.name}</h3>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{parishPriest.title}</span>
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--brown-primary)', marginBottom: '1rem' }}>Welcome Message</h2>
              <p style={{ lineHeight: '1.8', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--text-body)' }}>
                {parishPriest.message}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export const PastoralTeamPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <span className="page-hero__label">Clergy & Leadership</span>
        <h1 className="page-hero__title">Pastoral Team</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Parish</span> <span>/</span> <span>Pastoral Team</span>
        </div>
      </div>
    </section>

    <section className="section section--cream">
      <div className="container">
        <div className="grid-2" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {leadership.pastoralTeam.map((member) => (
            <div key={member.id} style={{ background: 'var(--warm-white)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-gold)', textAlign: 'center', boxShadow: 'var(--shadow-soft)' }}>
              <img src={member.image} alt={member.name} style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-antique)', margin: '0 auto 1rem' }} />
              <span style={{ fontSize: '0.72rem', color: 'var(--gold-antique)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{member.designation}</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--brown-primary)', margin: '0.2rem 0' }}>{member.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export const ParishCouncilPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <span className="page-hero__label">Parish Governance</span>
        <h1 className="page-hero__title">Parish Council</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Parish</span> <span>/</span> <span>Parish Council</span>
        </div>
      </div>
    </section>

    <section className="section section--white">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__label">Council Executive & Members</span>
          <h2 className="section-heading__title">Parish Pastoral Council</h2>
          <p className="section-heading__subtitle">Collaborating in the administration and pastoral growth of the parish</p>
        </div>

        <div className="grid-3">
          {leadership.parishCouncil.map((member) => (
            <div key={member.id} style={{ background: 'var(--cream)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-beige)', textAlign: 'center' }}>
              <img src={member.image} alt={member.name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-antique)', margin: '0 auto 0.75rem' }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--brown-primary)' }}>{member.name}</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--gold-antique)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
);

import WardsPage from './WardsPage';
export { WardsPage };

export const ParishOfficePage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <span className="page-hero__label">Administration & Services</span>
        <h1 className="page-hero__title">Parish Office</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Parish</span> <span>/</span> <span>Parish Office</span>
        </div>
      </div>
    </section>

    <section className="section section--white">
      <div className="container" style={{ maxWidth: '850px' }}>
        <h2 className="section-heading__title" style={{ marginBottom: '1.5rem' }}>Parish Office Information</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
          The Parish Office handles administrative matters including sacrament certificate requests, Mass intention bookings, baptismal registrations, and general parish assistance.
        </p>

        <div className="grid-2">
          <div style={{ background: 'var(--cream)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-gold)' }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--brown-primary)', marginBottom: '0.75rem' }}>Office Hours</h4>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
              <strong>Monday – Saturday:</strong><br />
              9:00 AM – 12:00 PM<br />
              4:00 PM – 6:00 PM<br /><br />
              <strong>Sundays & Public Holidays:</strong><br />
              Closed after Morning Mass
            </p>
          </div>

          <div style={{ background: 'var(--cream)', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-gold)' }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--brown-primary)', marginBottom: '0.75rem' }}>Office Contact</h4>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
              <strong>Address:</strong> Sacred Heart of Jesus Church, Thodambila, Pachinadka, Kallige Post, Bantwal D.K. — 574219<br />
              <strong>Phone:</strong> +91 94484 28561<br />
              <strong>Email:</strong> thodambilashjc@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
);
