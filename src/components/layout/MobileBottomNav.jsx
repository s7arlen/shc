import React from 'react';
import ReactDOM from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Home, Church, MapPin, Image as ImageIcon, PhoneCall } from 'lucide-react';
import './MobileBottomNav.css';

const navItems = [
  { id: 'home', label: 'HOME', path: '/', icon: Home },
  { id: 'parish', label: 'PARISH', path: '/about/our-parish', icon: Church },
  { id: 'wards', label: 'WARDS', path: '/parish/wards', icon: MapPin },
  { id: 'gallery', label: 'GALLERY', path: '/media/gallery', icon: ImageIcon },
  { id: 'contact', label: 'CONTACT', path: '/contact', icon: PhoneCall },
];

const MobileBottomNav = () => {
  const location = useLocation();

  const isActive = (path) => {
    const current = location.pathname;
    if (path === '/') return current === '/';
    if (path === '/about/our-parish') return (current.startsWith('/about') || current.startsWith('/parish')) && !current.startsWith('/parish/wards') && !current.startsWith('/wards');
    if (path === '/parish/wards') return current.startsWith('/parish/wards') || current.startsWith('/wards');
    if (path === '/media/gallery') return current.startsWith('/media');
    if (path === '/contact') return current.startsWith('/contact');
    return current.startsWith(path);
  };

  const navContent = (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation Bar">
      <div className="mobile-bottom-nav__container">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`mobile-bottom-nav__item ${active ? 'mobile-bottom-nav__item--active' : ''}`}
              aria-label={item.label}
            >
              {active && <span className="mobile-bottom-nav__active-bar" />}
              <span className="mobile-bottom-nav__icon-wrap">
                <Icon size={19} className="mobile-bottom-nav__icon" />
              </span>
              <span className="mobile-bottom-nav__label">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );

  return ReactDOM.createPortal(navContent, document.body);
};

export default MobileBottomNav;
