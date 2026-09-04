import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Quote, ArrowRight } from 'lucide-react';
import { leadership } from '../../data/leadership';
import './PriestMessageSection.css';

const PriestMessageSection = () => {
  const { parishPriest } = leadership;

  return (
    <section className="priest-message section section--white" aria-label="Message from Parish Priest">
      <div className="container">
        <div className="priest-message__card">
          <motion.div
            className="priest-message__photo-col"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="priest-message__circle-frame">
              <div
                className="priest-message__photo"
                style={{ backgroundImage: `url(${parishPriest.image})` }}
                role="img"
                aria-label={`Photo of ${parishPriest.designation} ${parishPriest.name}`}
              />
              <div className="priest-message__ring" aria-hidden="true" />
            </div>
            <div className="priest-message__name-tag">
              <span className="priest-message__desig">{parishPriest.designation}</span>
              <h3 className="priest-message__name">{parishPriest.name}</h3>
              <span className="priest-message__title-label">{parishPriest.title}</span>
            </div>
          </motion.div>

          <motion.div
            className="priest-message__content-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="section-heading__label">Pastoral Greeting</span>
            <h2 className="priest-message__heading">Message from Our Parish Priest</h2>
            <div className="priest-message__divider" aria-hidden="true" />
            
            <div className="priest-message__quote-wrapper">
              <Quote className="priest-message__quote-mark" size={32} />
              <p className="priest-message__text">
                {parishPriest.shortMessage}
              </p>
            </div>

            <div className="priest-message__cta">
              <Link to="/parish/parish-priest" className="btn btn--outline">
                Read Full Message
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PriestMessageSection;
