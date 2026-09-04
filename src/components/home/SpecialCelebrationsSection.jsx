import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import './SpecialCelebrationsSection.css';

const SpecialCelebrationsSection = () => {
  return (
    <section className="celebrations section section--cream" aria-label="Special Parish Celebrations">
      <div className="container">
        <div className="celebrations__banner">
          <div
            className="celebrations__bg"
            style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/hero-community.jpg')` }}
            role="img"
            aria-label="Parish Feast Procession"
          />
          <div className="celebrations__overlay" />

          <motion.div
            className="celebrations__content"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="celebrations__tag">
              <Sparkles size={14} />
              <span>Annual Parish Festivities</span>
            </div>

            <h2 className="celebrations__title">Feast of Sacred Heart of Jesus</h2>
            
            <p className="celebrations__text">
              Every year, the parish family comes together with profound devotion to celebrate the feast day of our patron, Sacred Heart of Jesus. The festivity features solemn Nine-Day Novenas, grand concelebrated High Mass, traditional procession, illuminations, and vibrant parish community fellowship.
            </p>

            <div className="celebrations__details">
              <div className="celebrations__detail-item">
                <Calendar className="celebrations__icon" size={18} />
                <span>Novenas: 9 Days Prior</span>
              </div>
              <div className="celebrations__detail-item">
                <Sparkles className="celebrations__icon" size={18} />
                <span>Feast Day: Solemnity of Sacred Heart</span>
              </div>
            </div>

            <div className="celebrations__cta">
              <Link to="/events" className="btn btn--gold">
                View Feast Schedule & Photos
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SpecialCelebrationsSection;
