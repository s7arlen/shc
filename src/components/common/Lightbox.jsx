import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Lightbox.css';

const Lightbox = ({ isOpen, image, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !image) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image View">
      <div className="lightbox__backdrop" onClick={onClose} />
      
      <div className="lightbox__container">
        <button className="lightbox__close-btn" onClick={onClose} aria-label="Close image">
          <X size={24} />
        </button>

        <button className="lightbox__nav-btn lightbox__nav-btn--prev" onClick={onPrev} aria-label="Previous image">
          <ChevronLeft size={28} />
        </button>

        <div className="lightbox__content">
          <img src={image.src} alt={image.alt} className="lightbox__image" />
          <div className="lightbox__caption">
            <h3>{image.title}</h3>
            <span>{image.category}</span>
          </div>
        </div>

        <button className="lightbox__nav-btn lightbox__nav-btn--next" onClick={onNext} aria-label="Next image">
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
