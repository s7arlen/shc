import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Quote, ArrowRight, Sparkles } from 'lucide-react';
import { leadership } from '../../data/leadership';
import './PriestMessageSection.css';

const PriestMessageSection = () => {
  const { parishPriest } = leadership;

  return (
    <section className="priest-message section section--white" aria-label="Message from Parish Priest">
      <div className="container">
        <motion.div
          className="priest-message__container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Left Column: Dark Navy Priest Portrait Panel */}
          <div className="priest-message__portrait-panel">
            <div className="priest-message__cross-badge">✝</div>

            <div className="priest-message__avatar-wrap">
              <img
                src={parishPriest.image}
                alt={`${parishPriest.designation} ${parishPriest.name}`}
                className="priest-message__avatar-img"
              />
              <div className="priest-message__avatar-ring" aria-hidden="true" />
            </div>

            <div className="priest-message__priest-info">
              <span className="priest-message__badge">
                <Sparkles size={11} />
                <span>{parishPriest.designation}</span>
              </span>
              <h3 className="priest-message__priest-name">{parishPriest.name}</h3>
              <p className="priest-message__priest-title">{parishPriest.title}</p>
            </div>
          </div>

          {/* Right Column: Quote Content Panel */}
          <div className="priest-message__quote-panel">
            <div className="priest-message__quote-header">
              <Quote className="priest-message__large-quote-icon" size={44} />
              <h2 className="priest-message__heading">Message from Our Parish Priest</h2>
            </div>

            <div className="priest-message__quote-body">
              <p className="priest-message__text">
                "{parishPriest.shortMessage}"
              </p>
            </div>

            <div className="priest-message__action">
              <Link to="/parish/parish-priest" className="btn btn--outline priest-message__btn">
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

export default PriestMessageSection;
