import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { news } from '../../data/news';
import './Navbar.css';

const navItems = [
  { label: 'Home', path: '/' },
  {
    label: 'About',
    path: '/about',
    dropdown: [
      { label: 'Our Parish', path: '/about/our-parish' },
      { label: 'Church History', path: '/about/history' },
      { label: 'Our Patroness', path: '/about/our-patroness' },
      { label: 'Diocese', path: '/about/diocese' },
    ],
  },
  {
    label: 'Parish',
    path: '/parish',
    dropdown: [
      { label: 'Parish Priest', path: '/parish/parish-priest' },
      { label: 'Pastoral Team', path: '/parish/pastoral-team' },
      { label: 'Parish Council', path: '/parish/parish-council' },
      { label: 'Mass Timings', path: '/faith/mass-timings' },
      { label: 'Parish Office', path: '/parish/office' },
    ],
  },
  { label: 'Wards', path: '/parish/wards' },
  {
    label: 'Organizations',
    path: '/organizations',
    dropdown: [
      { label: 'ICYM', path: '/organizations/icym' },
      { label: 'YCS', path: '/organizations/ycs' },
      { label: 'Catholic Sabha', path: '/organizations/catholic-sabha' },
      { label: 'Sthree Sanghatan', path: '/organizations/sthree-sanghatan' },
      { label: 'Marian Sodality', path: '/organizations/marian-sodality' },
      { label: 'Choir Group', path: '/organizations/choir-group' },
      { label: 'Altar Servers', path: '/organizations/altar-servers' },
      { label: 'St. Vincent de Paul Sabha', path: '/organizations/svp' },
      { label: 'Franciscan Third Order', path: '/organizations/franciscan-third-order' },
    ],
  },
  {
    label: 'News & Events',
    path: '/news',
    dropdown: [
      { label: 'Latest News', path: '/news' },
      { label: 'Upcoming Events', path: '/events' },
    ],
  },
  {
    label: 'Media',
    path: '/media',
    dropdown: [
      { label: 'Gallery', path: '/media/gallery' },
      { label: 'Parish Newsletter', path: '/media/newsletter' },
    ],
  },
  { label: 'Contact', path: '/contact' },
];

// Duplicate for seamless loop
const tickerItems = [...news, ...news];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const logoUrl = `${import.meta.env.BASE_URL}favicon.png`;

  return (
    <nav
      ref={navRef}
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* ── ROW 1: News Ticker (Full Width on Desktop, with Hamburger on Mobile) ── */}
      <div className="navbar__ticker-row">
        <div className="navbar__ticker" role="region" aria-label="Latest parish news">
          <div className="navbar__ticker-label" aria-hidden="true">
            <span className="navbar__ticker-dot" />
            <span>Latest News</span>
          </div>
          <div className="navbar__ticker-track-wrap">
            <ul className="navbar__ticker-track" aria-live="off">
              {tickerItems.map((item, idx) => (
                <li key={`${item.id}-${idx}`} className="navbar__ticker-item">
                  <span className="navbar__ticker-cat">{item.category}</span>
                  <Link
                    to={`/news#${item.slug}`}
                    className="navbar__ticker-text"
                    tabIndex={idx < news.length ? 0 : -1}
                  >
                    {item.title}
                  </Link>
                  <span className="navbar__ticker-sep" aria-hidden="true">✦</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Toggle Button (only visible on mobile) */}
        <button
          className="navbar__mobile-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-nav"
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── ROW 2: Navigation Links (Desktop view only) ── */}
      <div className="navbar__menu-row">
        <div className="container navbar__menu-container">
          <ul className="navbar__list" role="menubar">
            {navItems.map((item) => (
              <li
                key={item.label}
                className={`navbar__item ${item.dropdown ? 'navbar__item--has-dropdown' : ''} ${isActive(item.path) ? 'navbar__item--active' : ''}`}
                role="none"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.path}
                  className="navbar__link"
                  role="menuitem"
                  aria-haspopup={item.dropdown ? 'true' : undefined}
                  aria-expanded={openDropdown === item.label ? 'true' : 'false'}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown size={13} className="navbar__chevron" aria-hidden="true" />}
                </Link>

                {item.dropdown && (
                  <div
                    className={`navbar__dropdown ${openDropdown === item.label ? 'navbar__dropdown--open' : ''}`}
                    role="menu"
                    aria-label={`${item.label} submenu`}
                  >
                    <div className="navbar__dropdown-inner">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.path}
                          className="navbar__dropdown-link"
                          role="menuitem"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-nav"
        className={`navbar__mobile ${isMobileOpen ? 'navbar__mobile--open' : ''}`}
        aria-hidden={!isMobileOpen}
      >
        <div className="navbar__mobile-header">
          <div className="navbar__mobile-drawer-brand">
            <img src={logoUrl} alt="" className="navbar__mobile-drawer-logo" />
            <span className="navbar__mobile-title">MENU</span>
          </div>
          <button
            className="navbar__mobile-close"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>
        <div className="navbar__mobile-inner">
          <ul className="navbar__mobile-list">
            {navItems.map((item) => (
              <li key={item.label} className="navbar__mobile-item">
                <div className="navbar__mobile-row">
                  <Link to={item.path} className="navbar__mobile-link">
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <button
                      className={`navbar__mobile-expand ${openDropdown === item.label ? 'open' : ''}`}
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      aria-label={`Expand ${item.label}`}
                    >
                      <ChevronDown size={16} />
                    </button>
                  )}
                </div>
                {item.dropdown && openDropdown === item.label && (
                  <ul className="navbar__mobile-sub">
                    {item.dropdown.map((sub) => (
                      <li key={sub.label}>
                        <Link to={sub.path} className="navbar__mobile-sub-link">
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="navbar__overlay"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navbar;
