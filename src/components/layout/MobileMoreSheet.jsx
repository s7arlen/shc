import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Info,
  Clock,
  Users,
  UserCheck,
  Heart,
  Newspaper,
  PhoneCall,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import './MobileBottomNav.css';

const moreNavItems = [
  { label: 'About Our Parish', path: '/about/our-parish', icon: Info, desc: 'History, patroness & parish overview' },
  { label: 'Mass Timings', path: '/faith/mass-timings', icon: Clock, desc: 'Daily & Sunday Holy Mass schedule' },
  { label: 'Ministries & Youth', path: '/organizations', icon: Users, desc: 'ICYM, Choir, Altar Servers & associations' },
  { label: 'Parish Leadership', path: '/parish/parish-priest', icon: UserCheck, desc: 'Parish priest & pastoral council' },
  { label: 'Sacraments', path: '/faith/sacraments', icon: Heart, desc: 'Baptism, Holy Communion, Matrimony' },
  { label: 'News & Events', path: '/news', icon: Newspaper, desc: 'Announcements & upcoming celebrations' },
  { label: 'Contact & Office', path: '/contact', icon: PhoneCall, desc: 'Office hours, phone & location map' },
];

const MobileMoreSheet = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Close sheet when navigation occurs
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // Lock body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            className="mobile-sheet__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Bottom Sheet Drawer */}
          <motion.div
            className="mobile-sheet__drawer"
            role="dialog"
            aria-modal="true"
            aria-label="More Navigation Menu"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          >
            {/* Top Handle Bar */}
            <div className="mobile-sheet__handle-bar">
              <span className="mobile-sheet__handle" />
            </div>

            {/* Header */}
            <div className="mobile-sheet__header">
              <div className="mobile-sheet__brand">
                <Sparkles size={16} className="mobile-sheet__sparkle" />
                <span className="mobile-sheet__title">PARISH DIRECTORY</span>
              </div>
              <button
                type="button"
                className="mobile-sheet__close-btn"
                onClick={onClose}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Directory List */}
            <div className="mobile-sheet__content">
              <ul className="mobile-sheet__list">
                {moreNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    location.pathname === item.path ||
                    (item.path !== '/' && location.pathname.startsWith(item.path));
                  return (
                    <li key={item.label} className="mobile-sheet__item">
                      <Link
                        to={item.path}
                        className={`mobile-sheet__link ${isActive ? 'mobile-sheet__link--active' : ''}`}
                      >
                        <div className="mobile-sheet__link-icon-box">
                          <Icon size={18} className="mobile-sheet__link-icon" />
                        </div>
                        <div className="mobile-sheet__link-text">
                          <span className="mobile-sheet__link-label">{item.label}</span>
                          <span className="mobile-sheet__link-desc">{item.desc}</span>
                        </div>
                        <ChevronRight size={16} className="mobile-sheet__link-arrow" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMoreSheet;
