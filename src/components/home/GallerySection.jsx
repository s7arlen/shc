import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight } from 'lucide-react';
import { galleryImages } from '../../data/gallery';
import InfiniteGalleryMarquee from '../common/InfiniteGalleryMarquee';
import Lightbox from '../common/Lightbox';
import './GallerySection.css';

const GallerySection = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryItems = galleryImages.map((img) => ({
    id: img.id,
    image: img.src,
    title: img.title,
    alt: img.alt,
    category: img.category,
  }));

  const handleItemClick = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => setLightboxIndex(null);
  const handlePrev = () =>
    setLightboxIndex((prev) =>
      prev > 0 ? prev - 1 : galleryImages.length - 1
    );
  const handleNext = () =>
    setLightboxIndex((prev) =>
      prev < galleryImages.length - 1 ? prev + 1 : 0
    );

  return (
    <section className="gallery-section section section--white" aria-label="Photo Gallery">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">Photo Gallery</h2>
          <p className="section-heading__subtitle">
            Capturing sacred moments of prayer, liturgical celebrations, and community fellowship
          </p>
        </div>

        {/* Auto Horizontal Infinite Loop Gallery (Mobile & Desktop) */}
        <div className="gallery-section__marquee-wrap">
          <InfiniteGalleryMarquee
            items={galleryItems}
            onItemClick={handleItemClick}
          />
        </div>

        <div className="gallery-section__cta">
          <Link to="/media/gallery" className="btn btn--outline">
            <Camera size={16} /> View Complete Gallery
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Lightbox Modal */}
        <Lightbox
          isOpen={lightboxIndex !== null}
          image={lightboxIndex !== null ? galleryImages[lightboxIndex] : null}
          onClose={handleCloseLightbox}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </section>
  );
};

export default GallerySection;
