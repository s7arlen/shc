import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight } from 'lucide-react';
import { galleryImages } from '../../data/gallery';
import AccordionGallery from '../common/AccordionGallery';
import Lightbox from '../common/Lightbox';
import './GallerySection.css';

const GallerySection = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Take top 6 images for the interactive accordion
  const previewImages = galleryImages.slice(0, 6);

  const accordionItems = previewImages.map((img) => ({
    image: img.src,
    label: img.title,
    alt: img.alt,
  }));

  const handleItemClick = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => setLightboxIndex(null);
  const handlePrev = () =>
    setLightboxIndex((prev) =>
      prev > 0 ? prev - 1 : previewImages.length - 1
    );
  const handleNext = () =>
    setLightboxIndex((prev) =>
      prev < previewImages.length - 1 ? prev + 1 : 0
    );

  return (
    <section className="gallery-section section section--white" aria-label="Photo Gallery">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__label">Visual Heritage</span>
          <h2 className="section-heading__title">Photo Gallery</h2>
          <p className="section-heading__subtitle">
            Capturing sacred moments of prayer, liturgical celebrations, and community fellowship
          </p>
        </div>

        {/* Interactive Accordion Gallery */}
        <div className="gallery-section__accordion-wrap">
          <AccordionGallery
            items={accordionItems}
            defaultIndex={2}
            accentColor="#C6A15B"
            overlayColor="#172536"
            textColor="#FAF7F0"
            height={500}
            gap={14}
            radius={18}
            expandRatio={0.48}
            trigger="hover"
            grayscale={true}
            showLabels={true}
            parallax={0.6}
            tilt={6}
            duration={0.65}
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
          image={lightboxIndex !== null ? previewImages[lightboxIndex] : null}
          onClose={handleCloseLightbox}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </section>
  );
};

export default GallerySection;
