import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Search,
  X,
  Calendar,
  MapPin,
  Users,
  Phone,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  HeartHandshake,
  Clock,
  ShieldAlert,
  UserCheck,
  Award,
  BookOpen
} from 'lucide-react';
import { ministries } from '../data/ministries';
import './Organizations.css';

// Subcomponent: Image with graceful fallback placeholder
const OrgCardImage = ({ src, alt, category }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError || !src) {
    return (
      <div className="org-card__placeholder">
        <div className="org-card__placeholder-icon">
          <span>✝</span>
        </div>
        <span style={{ fontSize: '0.78rem', opacity: 0.9, letterSpacing: '0.04em' }}>
          {category || 'Parish Association'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="org-card__image"
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
};

// Subcomponent: Office Bearer Avatar with Initials / Placeholder
const BearerAvatar = ({ photo, name, role }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError || !photo) {
    // Generate initials from name or role
    const getInitials = () => {
      if (role?.includes('Director') || role?.includes('Priest')) return '✝';
      if (role?.includes('President')) return 'PR';
      if (role?.includes('Secretary')) return 'SC';
      if (role?.includes('Treasurer')) return 'TR';
      if (role?.includes('Master')) return 'CM';
      if (role?.includes('Coordinator') || role?.includes('Animator')) return 'AN';
      return '★';
    };

    return (
      <div className="org-bearer-avatar__placeholder">
        <span className="org-bearer-avatar__icon">{getInitials()}</span>
      </div>
    );
  }

  return (
    <img
      src={photo}
      alt={name}
      className="org-bearer-avatar__img"
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
};

// Subcomponent: Organizations List & Grid View (All Associations)
const OrganizationsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(ministries.map((m) => m.category).filter(Boolean))];
    return cats;
  }, []);

  // Filtered organizations
  const filteredMinistries = useMemo(() => {
    return ministries.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.shortName?.toLowerCase().includes(q) ||
        item.konkaniName?.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tagline?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.activities?.some((act) => act.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div>
      {/* Controls: Search and Category Filter */}
      <div className="org-controls">
        <div className="org-controls__top">
          <div className="org-search">
            <Search size={18} className="org-search__icon" />
            <input
              type="text"
              className="org-search__input"
              placeholder="Search associations, office bearers, activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search organizations"
            />
            {searchQuery && (
              <button
                className="org-search__clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <span className="org-count">
            Showing {filteredMinistries.length} of {ministries.length} associations
          </span>
        </div>

        {/* Categories Tabs */}
        <ul className="org-categories" role="tablist">
          {categories.map((cat) => (
            <li key={cat} role="presentation">
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`org-category-btn ${
                  selectedCategory === cat ? 'org-category-btn--active' : ''
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Grid of Cards */}
      {filteredMinistries.length > 0 ? (
        <div className="org-grid">
          {filteredMinistries.map((org) => (
            <Link
              key={org.id}
              to={`/organizations/${org.slug}`}
              className="org-card"
              aria-label={`View details of ${org.name}`}
            >
              <div className="org-card__image-wrap">
                <OrgCardImage src={org.image} alt={org.name} category={org.category} />
                {org.category && (
                  <span className="org-card__badge">{org.category}</span>
                )}
              </div>

              <div className="org-card__body">
                {org.konkaniName && (
                  <span className="org-card__eyebrow">{org.konkaniName}</span>
                )}
                <h3 className="org-card__title">{org.name}</h3>
                <p className="org-card__desc">{org.description}</p>

                <div className="org-card__footer">
                  {org.meetingDay ? (
                    <span className="org-card__meta-pill" title={org.meetingDay}>
                      <Clock size={13} />
                      <span>{org.meetingDay.split(' at ')[0].replace('after Morning Mass', '').replace('after 7:30 AM Mass', '')}</span>
                    </span>
                  ) : (
                    <span className="org-card__meta-pill">
                      <Users size={13} />
                      <span>Active Committee</span>
                    </span>
                  )}
                  <span className="org-card__link">
                    <span>View Details</span>
                    <ArrowRight size={13} className="org-card__arrow" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="org-empty">
          <ShieldAlert size={44} className="org-empty__icon" />
          <h3 className="org-empty__title">No Associations Found</h3>
          <p className="org-empty__desc">
            We couldn't find any associations matching your search "{searchQuery}".
          </p>
          <button
            className="btn btn--primary"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

// Subcomponent: Detailed Single Association View (Thodambila Aligned)
const OrganizationDetail = ({ org }) => {
  const currentIndex = ministries.findIndex((m) => m.slug === org.slug);
  const prevOrg = currentIndex > 0 ? ministries[currentIndex - 1] : null;
  const nextOrg = currentIndex < ministries.length - 1 ? ministries[currentIndex + 1] : null;

  return (
    <div className="org-detail-container">
      <div className="org-detail-layout">
        {/* Main Content Area */}
        <div className="org-detail-main">
          {/* Main Association Banner */}
          <div className="org-detail-banner">
            <OrgCardImage src={org.image} alt={org.name} category={org.category} />
          </div>

          {/* Motto Banner */}
          {org.motto && (
            <div className="org-motto-banner">
              <span className="org-motto-banner__label">ಧ್ಯೇಯ್ • Motto</span>
              <p className="org-motto-banner__text">"{org.motto}"</p>
            </div>
          )}

          {/* 1. Office Bearers Section (ಹುದ್ದೆದಾರ್) */}
          <div className="org-detail-section">
            <h2 className="org-detail-section__title">
              <Award size={22} />
              <span>ಹುದ್ದೆದಾರ್ • Office Bearers & Committee</span>
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Executive leaders serving our {org.shortName || org.name} unit.
            </p>

            {org.officeBearers && org.officeBearers.length > 0 ? (
              <div className="org-bearers-grid">
                {org.officeBearers.map((bearer, idx) => (
                  <div key={idx} className="org-bearer-card">
                    <div className="org-bearer-avatar">
                      <BearerAvatar photo={bearer.photo} name={bearer.name} role={bearer.role} />
                    </div>

                    <span
                      className={`org-bearer-role ${
                        bearer.role?.includes('Director') ? 'org-bearer-role--director' : ''
                      }`}
                    >
                      {bearer.role}
                    </span>

                    {bearer.konkaniRole && (
                      <span className="org-bearer-konkani-role">{bearer.konkaniRole}</span>
                    )}

                    <h4 className="org-bearer-name">{bearer.name}</h4>

                    {bearer.ward && <span className="org-bearer-ward">{bearer.ward}</span>}

                    {bearer.phone && (
                      <a
                        href={`tel:${bearer.phone.replace(/\s+/g, '')}`}
                        className="org-bearer-phone"
                        title={`Call ${bearer.name}`}
                      >
                        <Phone size={12} />
                        <span>{bearer.phone}</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Office bearers list will be updated soon.
              </p>
            )}
          </div>

          {/* 2. About Section (ಪರಿಚಯ್) */}
          <div className="org-detail-section">
            <h3 className="org-detail-section__title">
              <BookOpen size={20} />
              <span>ಪರಿಚಯ್ • About {org.shortName || org.name}</span>
            </h3>
            <p className="org-detail-lead">
              {org.fullDescription || org.description}
            </p>
          </div>

          {/* 3. Objectives Section (ಉದ್ದೇಶಾಂ) */}
          {org.objectives && org.objectives.length > 0 && (
            <div className="org-detail-section">
              <h3 className="org-detail-section__title">
                <HeartHandshake size={20} />
                <span>ಉದ್ದೇಶಾಂ • Aims & Objectives</span>
              </h3>
              <ul className="org-feature-list">
                {org.objectives.map((obj, idx) => (
                  <li key={idx} className="org-feature-item">
                    <span className="org-feature-bullet">✓</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 4. Activities Section (ಮುಖೆಲ್ ಕಾರ್ಯಕ್ರಮಾಂ) */}
          {org.activities && org.activities.length > 0 && (
            <div className="org-detail-section">
              <h3 className="org-detail-section__title">
                <CheckCircle2 size={20} />
                <span>ಕಾರ್ಯಕ್ರಮಾಂ • Key Activities & Initiatives</span>
              </h3>
              <ul className="org-feature-list">
                {org.activities.map((act, idx) => (
                  <li key={idx} className="org-feature-item">
                    <span className="org-feature-bullet">{idx + 1}</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 5. How to Join Section (ಸದಸ್ಯತ್ವ್) */}
          {org.howToJoin && (
            <div className="org-join-card">
              <h3 className="org-join-card__title">ಸದಸ್ಯತ್ವ್ • Membership & Joining Information</h3>
              <p className="org-join-card__desc">{org.howToJoin}</p>
              <div className="org-join-actions">
                <Link to="/contact" className="btn btn--primary">
                  Contact Parish Office
                </Link>
                {org.officeBearers?.[0]?.phone && (
                  <a
                    href={`tel:${org.officeBearers[0].phone.replace(/\s+/g, '')}`}
                    className="btn btn--outline"
                  >
                    Contact Coordinator
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Information Card */}
        <aside className="org-detail-sidebar">
          {/* Quick Facts Card */}
          <div className="org-facts-card">
            <div className="org-facts-card__header">
              <Calendar size={18} />
              <h3>ಜಮಾತ್ • Meeting & Details</h3>
            </div>
            <div className="org-facts-card__body">
              {org.meetingDay && (
                <div className="org-fact-item">
                  <Clock size={18} className="org-fact-icon" />
                  <div className="org-fact-content">
                    <h4>Meeting Schedule / ಜಮಾತ್</h4>
                    <p>{org.meetingDay}</p>
                  </div>
                </div>
              )}

              {org.venue && (
                <div className="org-fact-item">
                  <MapPin size={18} className="org-fact-icon" />
                  <div className="org-fact-content">
                    <h4>Gathering Place / ಜಾಗೊ</h4>
                    <p>{org.venue}</p>
                  </div>
                </div>
              )}

              {org.targetGroup && (
                <div className="org-fact-item">
                  <Users size={18} className="org-fact-icon" />
                  <div className="org-fact-content">
                    <h4>Eligibility / ಅರ್ಹತಾ</h4>
                    <p>{org.targetGroup}</p>
                  </div>
                </div>
              )}

              {org.spiritualDirector && (
                <div className="org-fact-item">
                  <Sparkles size={18} className="org-fact-icon" />
                  <div className="org-fact-content">
                    <h4>Spiritual Director / ನಿರ್ದೇಶಕ್</h4>
                    <p>{org.spiritualDirector}</p>
                  </div>
                </div>
              )}

              {org.officeBearers?.[1]?.name && (
                <div className="org-fact-item">
                  <UserCheck size={18} className="org-fact-icon" />
                  <div className="org-fact-content">
                    <h4>{org.officeBearers[1].role} / {org.officeBearers[1].konkaniRole}</h4>
                    <p>{org.officeBearers[1].name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Navigation to Other Organizations (All 11) */}
          <div className="org-sidebar-nav">
            <h4 className="org-sidebar-nav__title">ಸರ್ವ್ ಸಂಘಟನಾಂ • All Associations</h4>
            <ul className="org-sidebar-nav__list">
              {ministries.map((m) => (
                <li key={m.id}>
                  <Link
                    to={`/organizations/${m.slug}`}
                    className={`org-sidebar-nav__link ${
                      m.slug === org.slug ? 'org-sidebar-nav__link--active' : ''
                    }`}
                  >
                    <span>
                      {m.konkaniName ? `${m.konkaniName} (${m.shortName || m.name})` : m.shortName || m.name}
                    </span>
                    <ArrowRight size={13} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Detail Bottom Navigation */}
      <div className="org-detail-bottom-nav">
        <Link to="/organizations" className="btn btn--outline">
          <ArrowLeft size={16} />
          <span>Back to All Organizations / ಸಂಘಟನಾಂ</span>
        </Link>

        <div className="org-prev-next">
          {prevOrg && (
            <Link
              to={`/organizations/${prevOrg.slug}`}
              className="org-nav-pill"
              title={prevOrg.name}
            >
              <ArrowLeft size={14} />
              <span>Prev: {prevOrg.shortName || prevOrg.name}</span>
            </Link>
          )}
          {nextOrg && (
            <Link
              to={`/organizations/${nextOrg.slug}`}
              className="org-nav-pill"
              title={nextOrg.name}
            >
              <span>Next: {nextOrg.shortName || nextOrg.name}</span>
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Organizations Page Controller
const OrganizationsPage = () => {
  const { slug } = useParams();
  const selectedOrg = slug
    ? ministries.find(
        (m) =>
          m.slug === slug ||
          (m.slug === 'sthree-sanghatan' && slug === 'stree-sanghatan') ||
          (m.slug === 'choir-group' && slug === 'parish-choir') ||
          (m.slug === 'extraordinary-ministers' && slug === 'eucharistic-ministers')
      )
    : null;

  return (
    <main className="inner-page">
      {/* Dynamic Page Hero */}
      <section className="page-hero">
        <div className="page-hero__content container">
          <span className="page-hero__label">
            {selectedOrg
              ? `${selectedOrg.category || 'Parish Association'} • ಸಂಘಟನಾಂ`
              : 'ಸಂಘಟನಾಂ • Associations & Ministries'}
          </span>
          <div className="org-bilingual-title">
            {selectedOrg && selectedOrg.konkaniName && (
              <span className="org-bilingual-title__konkani">{selectedOrg.konkaniName}</span>
            )}
            <h1 className="page-hero__title">
              {selectedOrg ? selectedOrg.name : 'Parish Organizations (ಸಂಘಟನಾಂ)'}
            </h1>
          </div>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span>{' '}
            {selectedOrg ? (
              <>
                <Link to="/organizations">Organizations</Link> <span>/</span>{' '}
                <span>{selectedOrg.shortName || selectedOrg.name}</span>
              </>
            ) : (
              <span>Organizations</span>
            )}
          </div>
        </div>
      </section>

      {/* Page Body */}
      <section className="section section--cream">
        <div className="container">
          {slug ? (
            selectedOrg ? (
              <OrganizationDetail org={selectedOrg} />
            ) : (
              <div className="org-empty">
                <ShieldAlert size={48} className="org-empty__icon" />
                <h2 className="org-empty__title">Organization Not Found</h2>
                <p className="org-empty__desc">
                  The association you are looking for does not exist or may have been renamed.
                </p>
                <Link to="/organizations" className="btn btn--primary">
                  ← Back to All Organizations
                </Link>
              </div>
            )
          ) : (
            <OrganizationsList />
          )}
        </div>
      </section>
    </main>
  );
};

export default OrganizationsPage;


