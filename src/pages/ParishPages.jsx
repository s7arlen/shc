import React from 'react';
import { Link } from 'react-router-dom';
import { leadership } from '../data/leadership';

export const ParishPriestPage = () => {
  const parishPriest = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('thodambila-admin-priest') || 'null') || leadership.parishPriest; }
    catch { return leadership.parishPriest; }
  }, []);
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

export const ParishCouncilPage = () => {
  const council = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('thodambila-admin-sections') || '{}')?.council || leadership.parishCouncil; }
    catch { return leadership.parishCouncil; }
  }, []);
  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="page-hero__content container">
          <span className="page-hero__label">ಫಿರ್ಗಜ್ ಗೊವ್ಳಿಕ್ ಪರಿಷದ್ • Governance</span>
          <h1 className="page-hero__title">Parish Council</h1>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Parish</span> <span>/</span> <span>Parish Council</span>
          </div>
        </div>
      </section>

      <section className="section section--white" style={{ background: '#fffdf9', padding: '3.5rem 0 4.5rem' }}>
        <div className="container" style={{ maxWidth: '1240px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '28px'
            }}
          >
            {council.map((member, i) => {
              const nameMatch = (member.name || '').match(/^(.*?)(?:\s*\((.*?)\))?$/);
              const engName = nameMatch ? nameMatch[1].trim() : member.name;
              const konkaniName = nameMatch && nameMatch[2] ? nameMatch[2].trim() : null;

              return (
                <div
                  key={member.id || i}
                  style={{
                    background: '#fffdf9',
                    border: '2px solid #d0a047',
                    borderRadius: '16px',
                    padding: '2rem 1.5rem 1.75rem',
                    textAlign: 'center',
                    boxShadow: '0 8px 24px rgba(123, 28, 42, 0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    alignItems: 'center'
                  }}
                  className="council-honor-card"
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '6px',
                      background: 'linear-gradient(90deg, #d0a047 0%, #7b1c2a 50%, #d0a047 100%)'
                    }}
                  />

                  <div>
                    <div style={{ position: 'relative', margin: '0.5rem auto 1.25rem', width: '118px', height: '118px' }}>
                      <img
                        src={member.image}
                        alt={engName}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '3px solid #d0a047',
                          boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                          outline: '2px solid rgba(123, 28, 42, 0.25)',
                          outlineOffset: '2px'
                        }}
                      />
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#7b1c2a', margin: '0 0 0.35rem', fontWeight: 700, lineHeight: 1.25 }}>
                      {engName}
                    </h3>

                    {konkaniName && (
                      <p style={{ fontSize: '0.92rem', color: '#966d36', margin: '0 0 0.85rem', fontWeight: 600 }}>
                        ({konkaniName})
                      </p>
                    )}
                  </div>

                  <div
                    style={{
                      marginTop: '1.25rem',
                      background: '#fcf6ec',
                      border: '1px solid #d0a047',
                      color: '#7b1c2a',
                      borderRadius: '25px',
                      padding: '8px 16px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      width: '100%',
                      boxShadow: 'inset 0 1px 2px rgba(208, 160, 71, 0.15)'
                    }}
                  >
                    {member.position}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

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

import { seedObituaries } from '../data/obituaries';

export const ObituariesPage = () => {
  const obituaries = React.useMemo(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('thodambila-admin-sections') || '{}')?.obituary;
      return (stored && stored.length > 0) ? stored : seedObituaries;
    } catch {
      return seedObituaries;
    }
  }, []);

  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="page-hero__content container">
          <span className="page-hero__label">In Loving Memory</span>
          <h1 className="page-hero__title">Parish Obituaries & Memorials</h1>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <Link to="/parish">Parish</Link> <span>/</span> <span>Obituaries</span>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container" style={{ maxWidth: '950px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
              “I am the resurrection and the life. The one who believes in me will live, even though they die.” — John 11:25
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
            {obituaries.map((person) => (
              <article key={person.id} style={{ background: '#fffdf9', border: '1px solid var(--border-gold)', borderRadius: '12px', padding: '1.75rem', boxShadow: 'var(--shadow-soft)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <img
                    src={person.photo || person.image || `${import.meta.env.BASE_URL}images/priest-portrait.png`}
                    alt={person.name}
                    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-antique)', flexShrink: 0 }}
                  />
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold-antique)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{person.ward || 'Thodambila Parish'}</span>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--brown-primary)', margin: '0.2rem 0' }}>{person.name}</h3>
                    {person.age && <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>Age: <strong>{person.age} years</strong></p>}
                    {(person.dateOfDeath || person.displayDate) && (
                      <p style={{ fontSize: '0.85rem', color: 'var(--wine)', fontWeight: 600, marginTop: '2px' }}>
                        Passed Away: {person.displayDate || person.dateOfDeath}
                      </p>
                    )}
                  </div>
                </div>

                {(person.funeralDetails || person.funeral) && (
                  <div style={{ background: 'var(--cream)', padding: '0.9rem 1.1rem', borderRadius: '8px', borderLeft: '3px solid var(--wine)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                    <strong>Funeral & Services:</strong> {person.funeralDetails || person.funeral}
                  </div>
                )}

                {person.tribute && (
                  <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-body)', lineHeight: '1.6', margin: 0 }}>
                    "{person.tribute}"
                  </p>
                )}
              </article>
            ))}
          </div>

          {!obituaries.length && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No obituary notices at this time.
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

