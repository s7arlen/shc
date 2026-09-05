import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { RotateCcw, Maximize2, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';
import './SwipeStackGallery.css';

const SwipeStackCard = ({ item, index, isTop, onSwipe, onItemClick }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-22, 22]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.4, 0.9, 1, 0.9, 0.4]);

  // Card depth transformation for stacked layers
  const scale = 1 - index * 0.05;
  const translateY = index * 14;

  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 400) {
      const direction = info.offset.x > 0 ? 1 : -1;
      onSwipe(direction);
    }
  };

  return (
    <motion.div
      className={`swipe-card ${isTop ? 'swipe-card--top' : ''}`}
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        scale,
        y: translateY,
        zIndex: 30 - index,
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileTap={isTop ? { cursor: 'grabbing' } : {}}
      initial={{ scale: scale * 0.9, opacity: 0 }}
      animate={{ scale, opacity: 1, y: translateY }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="swipe-card__inner">
        <img
          src={item.image || item.src}
          alt={item.alt || item.label || item.title || ''}
          className="swipe-card__img"
          draggable="false"
        />

        {/* Card Overlay Gradient */}
        <div className="swipe-card__overlay">
          <div className="swipe-card__badge">
            <Sparkles size={12} className="swipe-card__badge-icon" />
            <span>{index === 0 ? 'Featured' : `Photo ${index + 1}`}</span>
          </div>
          <h3 className="swipe-card__title">{item.label || item.title || 'Church Memory'}</h3>
          {item.subtitle && <p className="swipe-card__subtitle">{item.subtitle}</p>}
        </div>

        {/* Lightbox Expand Quick-Action */}
        {isTop && (
          <button
            type="button"
            className="swipe-card__expand-btn"
            onClick={(e) => {
              e.stopPropagation();
              onItemClick(item);
            }}
            aria-label="Expand image preview"
          >
            <Maximize2 size={16} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

const SwipeStackGallery = ({ items = [], onItemClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedMap, setLikedMap] = useState({});

  if (!items || items.length === 0) return null;

  const handleSwipe = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  const toggleLike = (idx) => {
    setLikedMap((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Stack slice of up to 3 cards visible at once
  const visibleCards = [];
  for (let i = 0; i < Math.min(3, items.length); i++) {
    const itemIndex = (currentIndex + i) % items.length;
    visibleCards.push({
      item: items[itemIndex],
      itemIndex,
      stackPosition: i,
    });
  }

  const isLiked = likedMap[currentIndex];

  return (
    <div className="swipe-gallery" aria-label="Interactive 3D Swipe Gallery Deck">
      {/* Header Helper Note */}
      <div className="swipe-gallery__indicator">
        <span className="swipe-gallery__chip">
          {currentIndex + 1} / {items.length}
        </span>
        <span className="swipe-gallery__hint">Swipe card left or right</span>
      </div>

      {/* Card Stack Container */}
      <div className="swipe-gallery__deck">
        <AnimatePresence mode="popLayout">
          {visibleCards.map(({ item, itemIndex, stackPosition }) => (
            <SwipeStackCard
              key={`${itemIndex}-${stackPosition}`}
              item={item}
              index={stackPosition}
              isTop={stackPosition === 0}
              onSwipe={handleSwipe}
              onItemClick={() => onItemClick && onItemClick(itemIndex, item)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Simplified Controls: Left/Right arrows with Pagination Dots */}
      <div className="swipe-gallery__simple-controls">
        <button
          type="button"
          className="swipe-gallery__arrow-btn"
          onClick={handlePrev}
          aria-label="Previous card"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="swipe-gallery__dots">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`swipe-gallery__dot ${idx === currentIndex ? 'swipe-gallery__dot--active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="swipe-gallery__arrow-btn"
          onClick={handleNext}
          aria-label="Next card"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default SwipeStackGallery;
