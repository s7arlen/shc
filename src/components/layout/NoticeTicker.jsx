import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { news as seedNews } from '../../data/news';
import './NoticeTicker.css';

const NoticeTicker = () => {
  const newsList = useMemo(() => {
    try {
      const stored = localStorage.getItem('thodambila-admin-news');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // fallback
    }
    return seedNews;
  }, []);

  // Duplicate items so the scroll loops seamlessly
  const items = [...newsList, ...newsList];

  return (
    <div className="notice-ticker" role="region" aria-label="Latest parish news">
      {/* Left label badge */}
      <div className="notice-ticker__label" aria-hidden="true">
        <span className="notice-ticker__label-dot" />
        <span>Latest News</span>
      </div>

      {/* Scrolling track */}
      <div className="notice-ticker__track-wrapper">
        <ul className="notice-ticker__track" aria-live="off">
          {items.map((item, idx) => (
            <li key={`${item.id}-${idx}`} className="notice-ticker__item">
              <span className="notice-ticker__category">{item.category}</span>
              <Link
                to={`/news/${item.id}`}
                className="notice-ticker__text"
                tabIndex={idx < newsList.length ? 0 : -1}
              >
                {item.title}
              </Link>
              <span className="notice-ticker__sep" aria-hidden="true">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoticeTicker;
