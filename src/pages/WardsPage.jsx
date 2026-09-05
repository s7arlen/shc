import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Search,
  X,
  Phone,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Home as HomeIcon,
  Sparkles,
  ShieldAlert,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { wards } from '../data/wards';
import './Wards.css';

// Subcomponent: Leader Avatar with initials fallback
const LeaderAvatar = ({ photo, name, role }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError || !photo) {
    const getInitials = () => {
      if (role?.toLowerCase().includes('gurkar')) return 'ಗು';
      if (role?.toLowerCase().includes('male')) return 'ದಾ';
      if (role?.toLowerCase().includes('female')) return 'ಸ್ತ್ರೀ';
      return '✝';
    };

    return (
      <div className="ward-minimal-avatar__placeholder">
        <span>{getInitials()}</span>
      </div>
    );
  }

  return (
    <img
      src={photo}
      alt={name}
      className="ward-minimal-avatar__img"
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
};

// Subcomponent: Minimal Clean Ward Detail (Thodambila Aligned)
const WardDetail = ({ ward }) => {
  const [showFamilies, setShowFamilies] = useState(false);
  const [familySearch, setFamilySearch] = useState('');

  const currentIndex = wards.findIndex((w) => w.slug === ward.slug);
  const prevWard = currentIndex > 0 ? wards[currentIndex - 1] : null;
  const nextWard = currentIndex < wards.length - 1 ? wards[currentIndex + 1] : null;

  // Filtered families
  const filteredFamilies = useMemo(() => {
    if (!ward.families) return [];
    const q = familySearch.toLowerCase().trim();
    if (!q) return ward.families;
    return ward.families.filter(
      (f) =>
        f.head.toLowerCase().includes(q) ||
        f.konkaniHead?.toLowerCase().includes(q) ||
        f.houseName?.toLowerCase().includes(q) ||
        f.address?.toLowerCase().includes(q)
    );
  }, [ward.families, familySearch]);

  const toggleFamilies = () => {
    setShowFamilies((prev) => !prev);
    if (!showFamilies) {
      setTimeout(() => {
        const el = document.getElementById('ward-families-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="ward-minimal-wrapper">
      {/* 1. Clean Title Header */}
      <div className="ward-minimal-header">
        <h1 className="ward-minimal-title-konkani">{ward.konkaniName}</h1>
        <h2 className="ward-minimal-title-english">{ward.name}</h2>

        <div className="ward-minimal-meta-strip">
          <span className="ward-minimal-meta-item">
            <Sparkles size={14} className="ward-minimal-meta-icon" />
            <span>{ward.patronSaint}</span>
          </span>
          <span className="ward-minimal-meta-sep">•</span>
          <span className="ward-minimal-meta-item">
            <Calendar size={14} className="ward-minimal-meta-icon" />
            <span>Feast: {ward.feastDate}</span>
          </span>
          <span className="ward-minimal-meta-sep">•</span>
          <span className="ward-minimal-meta-item">
            <HomeIcon size={14} className="ward-minimal-meta-icon" />
            <span>{ward.householdsCount} Families</span>
          </span>
        </div>

        {ward.motto && (
          <p className="ward-minimal-motto">"{ward.motto}"</p>
        )}
      </div>

      {/* 2. Office Bearers / Leadership Grid (ಹುದ್ದೆದಾರ್ - 3 Clean Cards) */}
      <div className="ward-minimal-section">
        <div className="ward-minimal-bearers-grid">
          {/* Gurkar */}
          {ward.gurkar && (
            <div className="ward-minimal-bearer-card">
              <div className="ward-minimal-avatar">
                <LeaderAvatar
                  photo={ward.gurkar.photo}
                  name={ward.gurkar.name}
                  role={ward.gurkar.role}
                />
              </div>
              <h4 className="ward-minimal-bearer-konkani-name">
                {ward.gurkar.konkaniName || ward.gurkar.name}
              </h4>
              <p className="ward-minimal-bearer-eng-name">{ward.gurkar.name}</p>
              <span className="ward-minimal-role-badge ward-minimal-role-badge--gurkar">
                {ward.gurkar.konkaniRole || 'ಗುರ್ಕಾರ್'}
              </span>

              {ward.gurkar.phone && (
                <a
                  href={`tel:${ward.gurkar.phone.replace(/\s+/g, '')}`}
                  className="ward-minimal-phone-btn"
                  title={`Call ${ward.gurkar.name}`}
                >
                  <Phone size={12} />
                  <span>{ward.gurkar.phone}</span>
                </a>
              )}
            </div>
          )}

          {/* Representatives */}
          {ward.representatives?.map((rep, idx) => (
            <div key={idx} className="ward-minimal-bearer-card">
              <div className="ward-minimal-avatar">
                <LeaderAvatar photo={rep.photo} name={rep.name} role={rep.role} />
              </div>
              <h4 className="ward-minimal-bearer-konkani-name">
                {rep.konkaniName || rep.name}
              </h4>
              <p className="ward-minimal-bearer-eng-name">{rep.name}</p>
              <span className="ward-minimal-role-badge">
                {rep.konkaniRole || 'ಪ್ರತಿನಿದಿ'}
              </span>

              {rep.phone && (
                <a
                  href={`tel:${rep.phone.replace(/\s+/g, '')}`}
                  className="ward-minimal-phone-btn"
                  title={`Call ${rep.name}`}
                >
                  <Phone size={12} />
                  <span>{rep.phone}</span>
                </a>
              )}
            </div>
          ))}
        </div>

        {/* 3. The Red Banner Button: Click here for Family Photos (Thodambila Reference) */}
        <button
          type="button"
          className={`ward-family-photos-banner-btn ${showFamilies ? 'ward-family-photos-banner-btn--open' : ''}`}
          onClick={toggleFamilies}
          aria-expanded={showFamilies}
          aria-controls="ward-families-section"
        >
          <span>Click here for Family Photos</span>
          {showFamilies ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* 4. Family Photos & Directory (Collapsible / Toggled by Red Button) */}
      {showFamilies && (
        <div id="ward-families-section" className="ward-minimal-families-container">
          <div className="ward-minimal-families-header">
            <div>
              <h3 className="ward-minimal-families-title">
                ವಾಡ್ಯಾಚ್ಯಾ ಕುಟ್ಮಾಂಚಿ ತಸ್ವಿರ್
              </h3>
              <span className="ward-minimal-families-count">
                ಒಟ್ಟು ಕುಟ್ಮಾಂ (Total Families) : {filteredFamilies.length}
              </span>
            </div>

            {/* Family Search */}
            <div className="ward-minimal-family-search">
              <Search size={15} className="org-search__icon" />
              <input
                type="text"
                className="ward-minimal-family-search__input"
                placeholder="Search family name or house..."
                value={familySearch}
                onChange={(e) => setFamilySearch(e.target.value)}
                aria-label="Search families"
              />
              {familySearch && (
                <button
                  className="ward-search__clear"
                  onClick={() => setFamilySearch('')}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Clean Family Cards Grid */}
          {filteredFamilies.length > 0 ? (
            <div className="ward-minimal-families-grid">
              {filteredFamilies.map((family, idx) => (
                <div key={family.id || idx} className="ward-minimal-family-card">
                  {/* Photo Frame Placeholder */}
                  <div className="ward-minimal-family-photo-box">
                    <div className="ward-minimal-family-icon">👨‍👩‍👧‍👦</div>
                    <span className="ward-minimal-family-photo-label">ಕುಟ್ಮಾಚಿ ತಸ್ವಿರ್</span>
                  </div>

                  <div className="ward-minimal-family-info">
                    <span className="ward-minimal-family-num">#{idx + 1}</span>
                    <h4 className="ward-minimal-family-konkani-name">
                      {family.konkaniHead || `${family.head} ಆನಿ ಕುಟಾಮ್`}
                    </h4>
                    <p className="ward-minimal-family-eng-name">{family.head}</p>

                    {family.houseName && (
                      <span className="ward-minimal-family-house">
                        🏠 {family.houseName}
                      </span>
                    )}

                    {family.address && (
                      <span className="ward-minimal-family-addr">
                        📍 {family.address}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="ward-empty" style={{ padding: '2rem 1rem' }}>
              <ShieldAlert size={32} className="ward-empty__icon" />
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                No families matching "{familySearch}".
              </p>
            </div>
          )}
        </div>
      )}

      {/* 5. Ward Feast & Overview Section (Minimal) */}
      <div className="ward-minimal-feast-card">
        <div className="ward-minimal-feast-header">
          <Sparkles size={20} className="ward-minimal-feast-icon" />
          <h3 className="ward-minimal-feast-title">
            ವಾಡ್ಯಾ ಫೆಸ್ತ್ — {ward.konkaniName}, ತೊಡಂಬಿಲ್
          </h3>
        </div>

        <p className="ward-minimal-feast-desc">
          {ward.feastCelebration?.description ||
            `Sacred Heart of Jesus Church, Thodambila — ${ward.name} celebrates its annual patron saint feast day on ${ward.feastDate} with solemn Thanksgiving Holy Mass, nine-day family novena, and fellowship meal.`}
        </p>

        <div className="ward-minimal-quick-details">
          <div className="ward-minimal-detail-item">
            <span className="ward-minimal-detail-label">ಮಯ್ನ್ಯಾಚಿ ಜಮಾತ್ (Monthly SCC) :</span>
            <span className="ward-minimal-detail-value">{ward.meetingSchedule || ward.meetingDay}</span>
          </div>
          <div className="ward-minimal-detail-item">
            <span className="ward-minimal-detail-label">ವ್ಯಾಪ್ತಿ (Area Covered) :</span>
            <span className="ward-minimal-detail-value">{ward.area}</span>
          </div>
        </div>
      </div>

      {/* 6. Clean Bottom Navigation */}
      <div className="ward-minimal-bottom-nav">
        <Link to="/parish/wards" className="ward-minimal-back-link">
          <ArrowLeft size={16} />
          <span>Back to All Wards (ವಾಡೆ)</span>
        </Link>

        <div className="ward-minimal-prev-next">
          {prevWard && (
            <Link
              to={`/parish/wards/${prevWard.slug}`}
              className="ward-minimal-nav-btn"
              title={prevWard.name}
            >
              <ArrowLeft size={14} />
              <span>{prevWard.name.replace(' Ward', '')}</span>
            </Link>
          )}
          {nextWard && (
            <Link
              to={`/parish/wards/${nextWard.slug}`}
              className="ward-minimal-nav-btn"
              title={nextWard.name}
            >
              <span>{nextWard.name.replace(' Ward', '')}</span>
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// Subcomponent: Minimal Wards List (All Wards Hub - Clean Thodambila Layout)
const WardsList = () => {
  const totalHouseholds = useMemo(
    () => wards.reduce((sum, w) => sum + (w.householdsCount || 0), 0),
    []
  );

  return (
    <div className="ward-hub-minimal-wrapper">
      {/* 1. Clean Centered Stats Pill */}
      <div className="ward-hub-minimal-header" style={{ marginBottom: '2rem' }}>
        <div className="ward-hub-minimal-pill">
          <span>{wards.length} Wards (ವಾಡೆ)</span>
          <span>•</span>
          <span>{totalHouseholds}+ Catholic Families (ಕುಟ್ಮಾಂ)</span>
        </div>
      </div>

      {/* 2. Minimal Ward Cards Grid */}
      <div className="ward-hub-grid">
        {wards.map((ward) => (
          <Link
            key={ward.id}
            to={`/parish/wards/${ward.slug}`}
            className="ward-hub-card"
            aria-label={`View details for ${ward.name}`}
          >
            {/* Subtle Faded Background Watermark Patron Image Placeholder */}
            <div className="ward-hub-card__watermark-wrap" aria-hidden="true">
              <img
                src={ward.patronImage || ward.image}
                alt=""
                className="ward-hub-card__watermark-img"
              />
            </div>

            <div className="ward-hub-card__top">
              <h3 className="ward-hub-card__konkani">{ward.konkaniName}</h3>
              <span className="ward-hub-card__english">{ward.name}</span>
            </div>

            <div className="ward-hub-card__info">
              <div className="ward-hub-card__row">
                <span className="ward-hub-card__label">ಆಶೀರ್ವಾದಕ್ (Patron):</span>
                <span className="ward-hub-card__val">{ward.patronSaint}</span>
              </div>

              {ward.gurkar && (
                <div className="ward-hub-card__row">
                  <span className="ward-hub-card__label">ಗುರ್ಕಾರ್ (Gurkar):</span>
                  <span className="ward-hub-card__val">{ward.gurkar.konkaniName || ward.gurkar.name}</span>
                </div>
              )}
            </div>

            <div className="ward-hub-card__footer">
              <span className="ward-hub-card__badge">
                {ward.householdsCount} ಕುಟ್ಮಾಂ (Families)
              </span>
              <span className="ward-hub-card__link">
                <span>View Details</span>
                <ArrowRight size={13} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Main Wards Page Controller
const WardsPage = () => {
  const { slug } = useParams();
  const selectedWard = slug ? wards.find((w) => w.slug === slug) : null;

  return (
    <main className="inner-page">
      {/* Dynamic Page Hero */}
      <section className="page-hero">
        <div className="page-hero__content container">
          <span className="page-hero__label">
            {selectedWard
              ? `${selectedWard.patronSaint} • ವಾಡೆ`
              : 'ವಾಡೆ • Small Christian Communities (SCC)'}
          </span>
          <div className="ward-bilingual-title">
            {selectedWard && selectedWard.konkaniName && (
              <span className="ward-bilingual-title__konkani">{selectedWard.konkaniName}</span>
            )}
            <h1 className="page-hero__title">
              {selectedWard ? selectedWard.name : 'Parish Wards (ವಾಡೆ)'}
            </h1>
          </div>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span>{' '}
            <Link to="/parish">Parish</Link> <span>/</span>{' '}
            {selectedWard ? (
              <>
                <Link to="/parish/wards">Wards</Link> <span>/</span>{' '}
                <span>{selectedWard.name}</span>
              </>
            ) : (
              <span>Wards</span>
            )}
          </div>
        </div>
      </section>

      {/* Page Body */}
      <section className="section section--cream">
        <div className="container">
          {slug ? (
            selectedWard ? (
              <WardDetail ward={selectedWard} />
            ) : (
              <div className="ward-empty">
                <ShieldAlert size={48} className="ward-empty__icon" />
                <h2 className="ward-empty__title">Ward Not Found</h2>
                <p className="ward-empty__desc">
                  The parish ward you are looking for does not exist or may have been renamed.
                </p>
                <Link to="/parish/wards" className="btn btn--primary">
                  ← Back to All Wards
                </Link>
              </div>
            )
          ) : (
            <WardsList />
          )}
        </div>
      </section>
    </main>
  );
};

export default WardsPage;
