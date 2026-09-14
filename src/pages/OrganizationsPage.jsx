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

  const allMinistries = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('thodambila-admin-organizations') || 'null') || ministries;
    } catch {
      return ministries;
    }
  }, []);

  const pageHeader = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('thodambila-orgs-page-header') || 'null') || {
        title: 'Parish Organizations & Associations',
        subtitle: 'Living out the Gospel through faith, service, and youth leadership in Thodambila.'
      };
    } catch {
      return {
        title: 'Parish Organizations & Associations',
        subtitle: 'Living out the Gospel through faith, service, and youth leadership in Thodambila.'
      };
    }
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(allMinistries.map((m) => m.category).filter(Boolean))];
    return cats;
  }, [allMinistries]);

  // Filtered organizations
  const filteredMinistries = useMemo(() => {
    return allMinistries.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.shortName?.toLowerCase().includes(q) ||
        item.konkaniName?.toLowerCase().includes(q) ||
        (item.description || '').toLowerCase().includes(q) ||
        item.tagline?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.activities?.some((act) => act.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [allMinistries, searchQuery, selectedCategory]);

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
            Showing {filteredMinistries.length} of {allMinistries.length} associations
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
              </div>

              <div className="org-card__body">
                {org.konkaniName && (
                  <span className="org-card__eyebrow">{org.konkaniName}</span>
                )}
                <h3 className="org-card__title" style={{ marginBottom: 0 }}>{org.name}</h3>
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

// Subcomponent: Minimal Office Bearers View for Single Association
const OrganizationDetail = ({ org }) => {
  const currentIndex = ministries.findIndex((m) => m.slug === org.slug);
  const prevOrg = currentIndex > 0 ? ministries[currentIndex - 1] : null;
  const nextOrg = currentIndex < ministries.length - 1 ? ministries[currentIndex + 1] : null;

  return (
    <div className="org-detail-container org-detail-container--minimal">
      {/* Office Bearers Section (ಹುದ್ದೆದಾರ್) */}
      <div className="org-detail-section org-detail-section--minimal">
        <div className="org-detail-minimal-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 className="org-detail-section__title" style={{ justifyContent: 'center', fontSize: '1.8rem', color: 'var(--text-accent)' }}>
            <Award size={26} />
            <span>ಹುದ್ದೇದಾರ್ • Office Bearers & Committee</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Executive leaders and committee members serving {org.name}
          </p>
        </div>

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
          <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#FFFDF9', borderRadius: '12px', border: '1px solid var(--border-gold)' }}>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', margin: 0 }}>
              Office bearers list for {org.name} will be updated soon.
            </p>
          </div>
        )}
      </div>

      {/* Minimal Navigation Bar */}
      <div className="org-detail-bottom-nav" style={{ marginTop: '3.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(221, 176, 122, 0.4)' }}>
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
  const allMinistries = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('thodambila-admin-organizations') || 'null') || ministries;
    } catch {
      return ministries;
    }
  }, []);

  const selectedOrg = slug
    ? allMinistries.find(
        (m) =>
          m.slug === slug ||
          String(m.id) === String(slug) ||
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


