import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Heart } from 'lucide-react';
import './OurPatronessSection.css';

const OurPatronessSection = () => {
  return (
    <section className="patroness section" aria-label="Our Patron Sacred Heart of Jesus">
      <div className="container">
        <motion.div
          className="patroness__card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Left: Clean Minimal Image Hero */}
          <div className="patroness__image-col">
            <div className="patroness__image-wrap">
              <img
                src={`${import.meta.env.BASE_URL}images/patroness-mary.jpg`}
                alt="Sacred Heart of Jesus"
                className="patroness__image"
              />
              <div className="patroness__image-badge">
                <Heart size={14} className="patroness__heart-icon" />
                <span>Patron of Our Parish</span>
              </div>
            </div>
          </div>

          {/* Right: Refined Minimal Content */}
          <div className="patroness__content-col">
            <div className="patroness__header">
              <h2 className="patroness__title">Sacred Heart of Jesus</h2>
              <p className="patroness__invocation">
                "Sacred Heart of Jesus, Have Mercy On Us."
              </p>
            </div>

            <div className="patroness__body">
              <p className="patroness__text patroness__text--kannada">
                ಕ್ರಿಸ್ತಾಂವಾಂ ಮಧೆಂ ಪ್ರತ್ಯೇಕ್ ಜಾವ್ನ್ ಕಥೊಲಿಕಾಂ ಮಧೆಂ ಜೆಜುಚ್ಯಾ ಪವಿತ್ರ್ ಕಾಳ್ಜಾಚೆಂ ಭಕ್ತಿಪಣ್ ಮಾನಾಪಾತ್ರ್ ಆನಿಂ ಚಡ್ ಲೊಕಾನಿಂ ವರ್ತ್ಯಾ ದೆವಸ್ಪಣಾನ್ ಆದರ‍್ಚೆಂ ಭಕ್ತಿಪಣ್ ಮ್ಹಣ್ಯೆತ್.
              </p>
              <p className="patroness__text">
                Dedicated to the Sacred Heart of Jesus, the faithful of Thodambila parish place their families, intentions, and community under His furnace of divine charity.
              </p>
            </div>

            {/* Feast Pill & CTA */}
            <div className="patroness__footer">
              <div className="patroness__feast-pill">
                <Calendar size={15} className="patroness__feast-icon" />
                <div>
                  <span className="patroness__feast-title">Parish Feast</span>
                  <span className="patroness__feast-sub">Solemnity of the Sacred Heart</span>
                </div>
              </div>

              <Link to="/about/our-patroness" className="patroness__link-btn">
                <span>Explore Devotion</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurPatronessSection;
