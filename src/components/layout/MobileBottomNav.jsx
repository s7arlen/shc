import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Home, Church, Calendar, Image as ImageIcon, MoreHorizontal } from 'lucide-react';
import MobileMoreSheet from './MobileMoreSheet';
import './MobileBottomNav.css';

const navItems = [
  { id: 'home', label: 'HOME', path: '/', icon: Home },
  { id: 'parish', label: 'PARISH', path: '/about/our-parish', icon: Church },
  { id: 'events', label: 'EVENTS', path: '/events', icon: Calendar },
  { id: 'gallery', label: 'GALLERY', path: '/media/gallery', icon: ImageIcon },
];

const MobileBottomNav = () => {
  const location = useLocation();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const isActive = (path) => {
    const current = location.pathname;
    if (path === '/') return current === '/';
    if (path === '/about/our-parish') return current.startsWith('/about') || current.startsWith('/parish');
    if (path === '/events') return current.startsWith('/events') || current.startsWith('/news');
    if (path === '/media/gallery') return current.startsWith('/media');
    return current.startsWith(path);
  };

  const navContent = (
    <>
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation Bar">
        <div className="mobile-bottom-nav__container">
          {/* Main 4 Navigation Items */}
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
                <Icon size={20} className="mobile-bottom-nav__icon" />
                <span className="mobile-bottom-nav__label">{item.label}</span>
              </Link>
            );
          })}

          {/* 5th Item: MORE Button (Opens Bottom Sheet) */}
          <button
            type="button"
            className={`mobile-bottom-nav__item ${isMoreOpen ? 'mobile-bottom-nav__item--active' : ''}`}
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            aria-label="More navigation options"
            aria-expanded={isMoreOpen}
          >
            {isMoreOpen && <span className="mobile-bottom-nav__active-bar" />}
            <MoreHorizontal size={20} className="mobile-bottom-nav__icon" />
            <span className="mobile-bottom-nav__label">MORE</span>
          </button>
        </div>
      </nav>

      {/* Bottom Sheet Directory Drawer */}
      <MobileMoreSheet isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)} />
    </>
  );

  return ReactDOM.createPortal(navContent, document.body);
};

export default MobileBottomNav;
