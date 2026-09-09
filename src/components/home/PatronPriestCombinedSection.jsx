import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';
import { leadership } from '../../data/leadership';
import './PatronPriestCombinedSection.css';

const PatronPriestCombinedSection = () => {
  const { parishPriest } = leadership;

  return (
    <section className="patron-priest-split" aria-label="Our Patron and Pastoral Message">
      <div className="patron-priest-split__container">
        {/* Left Side: Dark Burgundy - Our Patron */}
        <motion.div
          className="patron-priest-split__left"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="patron-priest-split__inner patron-priest-split__inner--left">
            {/* Symmetrical Arch Patron Header Block */}
            <div className="patron-priest-split__patron-block">
              <div className="patron-priest-split__arch-wrap patron-priest-split__arch-wrap--patron">
                <img
                  src={`${import.meta.env.BASE_URL}images/patroness-mary.jpg`}
                  alt="Sacred Heart of Jesus"
                  className="patron-priest-split__arch-img"
                />
              </div>

              <div className="patron-priest-split__patron-meta">
                <span className="patron-priest-split__subtitle patron-priest-split__subtitle--gold">OUR PATRON</span>
                <h2 className="patron-priest-split__title patron-priest-split__title--light">
                  Sacred Heart of Jesus
                </h2>
                <p className="patron-priest-split__invocation">
                  "SACRED HEART OF JESUS, HAVE MERCY ON US."
                </p>
              </div>
            </div>

            <div className="patron-priest-split__body-text">
              <p className="patron-priest-split__text patron-priest-split__text--kannada">
                ಕ್ರಿಸ್ತಾಂವಾಂ ಮಧೆಂ ಪ್ರತ್ಯೇಕ್ ಜಾವ್ನ್ ಕಥೊಲಿಕಾಂ ಮಧೆಂ ಜೆಜುಚ್ಯಾ ಪವಿತ್ರ್ ಕಾಳ್ಜಾಚೆಂ ಭಕ್ತಿಪಣ್ ಮಾನಾಪಾತ್ರ್ ಆನಿಂ ಚಡ್ ಲೊಕಾನಿಂ ವರ್ತ್ಯಾ ದೆವಸ್ಪಣಾನ್ ಆದರ‍್ಚೆಂ ಭಕ್ತಿಪಣ್ ಮ್ಹಣ್ಯೆತ್.
              </p>
              <p className="patron-priest-split__text">
                Dedicated to the Sacred Heart of Jesus, the faithful of Thodambila parish place their families, intentions, and community under His furnace of divine charity.
              </p>
            </div>

            <div className="patron-priest-split__divider" />

            <div className="patron-priest-split__feast-row">
              <span className="patron-priest-split__feast-label">ANNUAL FEAST DAY</span>
              <span className="patron-priest-split__feast-value">Solemnity of the Sacred Heart</span>
            </div>

            <div className="patron-priest-split__cta">
              <Link to="/about/our-patroness" className="patron-priest-split__btn patron-priest-split__btn--gold">
                <span>Explore Devotion & History</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Soft Cream - Message from Our Parish Priest */}
        <motion.div
          className="patron-priest-split__right"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="patron-priest-split__inner patron-priest-split__inner--right">
            <span className="patron-priest-split__subtitle patron-priest-split__subtitle--muted">FROM THE PULPIT</span>
            <h2 className="patron-priest-split__title patron-priest-split__title--dark">
              Message from Our Parish Priest
            </h2>
            <div className="patron-priest-split__title-underline" />

            {/* Priest Profile Block */}
            <div className="patron-priest-split__priest-block">
              <div className="patron-priest-split__arch-wrap">
                <img
                  src={parishPriest.image}
                  alt={`${parishPriest.designation} ${parishPriest.name}`}
                  className="patron-priest-split__arch-img"
                />
              </div>

              <div className="patron-priest-split__priest-meta">
                <span className="patron-priest-split__designation">{parishPriest.designation}</span>
                <h3 className="patron-priest-split__priest-name">{parishPriest.name}</h3>
                <p className="patron-priest-split__priest-role">{parishPriest.title}</p>
              </div>
            </div>

            {/* Quote Block */}
            <div className="patron-priest-split__quote-wrap">
              <Quote size={28} className="patron-priest-split__quote-mark" />
              <p className="patron-priest-split__quote-text">
                "{parishPriest.shortMessage}"
              </p>
            </div>

            <div className="patron-priest-split__cta">
              <Link to="/parish/parish-priest" className="patron-priest-split__btn patron-priest-split__btn--outline">
                <span>Read Full Message</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PatronPriestCombinedSection;
