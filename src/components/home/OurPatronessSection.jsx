import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import './OurPatronessSection.css';

const OurPatronessSection = () => {
  return (
    <section className="patroness section section--dark" aria-label="Our Patron Sacred Heart of Jesus">
      <div className="container">
        <div className="patroness__grid">
          <motion.div
            className="patroness__content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-heading__label" style={{ color: 'var(--gold-light)' }}>
              Patron of Our Parish
            </span>
            <h2 className="patroness__title">Sacred Heart of Jesus</h2>
            <div className="patroness__gold-line" aria-hidden="true" />
            
            <blockquote className="patroness__quote">
              <Sparkles size={18} className="patroness__quote-icon" />
              <span>"SACRED HEART OF JESUS, HAVE MERCY ON US."</span>
            </blockquote>

            <p className="patroness__text">
              ಕ್ರಿಸ್ತಾಂವಾಂ ಮಧೆಂ ಪ್ರತ್ಯೇಕ್ ಜಾವ್ನ್ ಕಥೊಲಿಕಾಂ ಮಧೆಂ ಜೆಜುಚ್ಯಾ ಪವಿತ್ರ್ ಕಾಳ್ಜಾಚೆಂ ಭಕ್ತಿಪಣ್ ಮಾನಾಪಾತ್ರ್ ಆನಿಂ ಚಡ್ ಲೊಕಾನಿಂ ವರ್ತ್ಯಾ ದೆವಸ್ಪಣಾನ್ ಆದರ‍್ಚೆಂ ಭಕ್ತಿಪಣ್ ಮ್ಹಣ್ಯೆತ್. ಜೆಜುಚೆಂ ಪವಿತ್ರ್ ಕಾಳಿಜ್ ಪಿಂತ್ರಾಯ್ತಾನಾಂ ಕಾಳ್ಜಾ ಭಂವಾರಿ ಉಜೊ, ಭಾಲ್ಯಾನ್ ಘಾಯೆಲ್ಲೆಂ ಆನಿಂ ಕಾಂಟ್ಯಾಚ್ಯಾ ಮುಕುಟಾನ್ ವಿಣ್ಲೆಲೆಂ ದಾಕಯ್ತಾತ್.
            </p>

            <p className="patroness__text">
              Dedicated to the Sacred Heart of Jesus (ಜೆಜುಚ್ಯಾ ಪವಿತ್ರ್ ಕಾಳ್ಜಾಚಿ ಫಿರ್ಗಜ್, ತೊಡಂಬಿಲ್), the faithful of Thodambila parish place their families, intentions, and entire parish community under His burning furnace of divine charity and grace.
            </p>

            <div className="patroness__feast-badge">
              <div className="patroness__feast-icon-wrap" aria-hidden="true">
                <Sparkles size={18} className="patroness__feast-icon" />
              </div>
              <div className="patroness__feast-info">
                <span className="patroness__feast-label">Parish Feast Day</span>
                <span className="patroness__feast-date">Solemnity of the Sacred Heart</span>
              </div>
            </div>

            <div className="patroness__cta">
              <Link to="/about/our-patroness" className="btn btn--gold">
                Explore Devotion & History
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="patroness__image-container"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="patroness__gold-frame" aria-hidden="true">
              <div className="patroness__gold-frame-corner top-left" />
              <div className="patroness__gold-frame-corner top-right" />
              <div className="patroness__gold-frame-corner bottom-left" />
              <div className="patroness__gold-frame-corner bottom-right" />
            </div>
            <img
              src={`${import.meta.env.BASE_URL}images/patroness-mary.jpg`}
              alt="Sacred Heart of Jesus Statue and Devotion"
              className="patroness__image"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurPatronessSection;
