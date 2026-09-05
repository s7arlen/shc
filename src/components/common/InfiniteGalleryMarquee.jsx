import React, { useState } from 'react';
import { Maximize2, Sparkles } from 'lucide-react';
import './InfiniteGalleryMarquee.css';

const InfiniteGalleryMarquee = ({ items = [], onItemClick }) => {
  const [isPaused, setIsPaused] = useState(false);

  if (!items || items.length === 0) return null;

  // Duplicate items twice to ensure a seamless infinite marquee loop
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="infinite-gallery" aria-label="Auto Horizontal Infinite Loop Photo Gallery">
      {/* Outer Marquee Track Wrapper */}
      <div
        className={`infinite-gallery__wrapper ${isPaused ? 'infinite-gallery__wrapper--paused' : ''}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="infinite-gallery__track">
          {marqueeItems.map((item, idx) => {
            const originalIndex = idx % items.length;
            return (
              <div
                key={`${item.id || originalIndex}-${idx}`}
                className="gallery-card"
                onClick={() => onItemClick && onItemClick(originalIndex, item)}
                role="button"
                tabIndex={0}
                aria-label={`View photo ${item.title || item.label}`}
                onKeyDown={(e) => e.key === 'Enter' && onItemClick && onItemClick(originalIndex, item)}
              >
                <div className="gallery-card__image-wrap">
                  <img
                    src={item.image || item.src}
                    alt={item.alt || item.title || item.label || ''}
                    className="gallery-card__img"
                    loading="lazy"
                    draggable="false"
                  />

                  {/* Top Category Badge */}
                  <div className="gallery-card__badge">
                    <Sparkles size={11} className="gallery-card__badge-icon" />
                    <span>{item.category || item.subtitle || 'Parish'}</span>
                  </div>

                  {/* Quick Expand Button */}
                  <button
                    type="button"
                    className="gallery-card__expand"
                    aria-label="Expand image lightbox"
                  >
                    <Maximize2 size={16} />
                  </button>

                  {/* Gradient Info Overlay */}
                  <div className="gallery-card__overlay">
                    <h3 className="gallery-card__title">{item.title || item.label || 'Parish Gallery'}</h3>
                    {item.subtitle && <p className="gallery-card__subtitle">{item.subtitle}</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InfiniteGalleryMarquee;
