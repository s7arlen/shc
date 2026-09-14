import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight } from 'lucide-react';
import { galleryImages as seedGallery } from '../../data/gallery';
import InfiniteGalleryMarquee from '../common/InfiniteGalleryMarquee';
import Lightbox from '../common/Lightbox';
import './GallerySection.css';

const GallerySection = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const imagesList = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('thodambila-admin-gallery') || 'null') || seedGallery; }
    catch { return seedGallery; }
  }, []);

  const galleryItems = imagesList.map((img) => ({
    id: img.id,
    image: img.src || img.image,
    title: img.title,
    alt: img.alt || img.title,
    category: img.category,
  }));

  const handleItemClick = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => setLightboxIndex(null);
  const handlePrev = () =>
    setLightboxIndex((prev) =>
      prev > 0 ? prev - 1 : galleryItems.length - 1
    );
  const handleNext = () =>
    setLightboxIndex((prev) =>
      prev < galleryItems.length - 1 ? prev + 1 : 0
    );

  return (
    <section className="gallery-section section section--white" aria-label="Photo Gallery">
      <div className="container">
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
