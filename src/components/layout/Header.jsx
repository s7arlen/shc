import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const logoUrl = `${import.meta.env.BASE_URL}favicon.png`;

  return (
    <header className="site-header" role="banner">
      <div className="site-header__texture" aria-hidden="true" />
      <div className="container">
        <div className="site-header__inner">
          <Link to="/" className="site-header__brand-link" aria-label="Sacred Heart of Jesus Church Home">
            <img
              src={logoUrl}
              alt="Sacred Heart of Jesus Church Logo"
              className="site-header__logo"
            />
            <div className="site-header__identity">
              <h1 className="site-header__name">
                <span className="site-header__title-text">Sacred Heart of Jesus Church</span>
              </h1>

              <div className="site-header__location">
                <span className="site-header__location-item">Thodambila, Bantwal</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="site-header__gold-line" aria-hidden="true">
        <div className="site-header__gold-line-inner" />
        <span className="site-header__gold-line-diamond">✦</span>
      </div>
    </header>
  );
};

export default Header;
