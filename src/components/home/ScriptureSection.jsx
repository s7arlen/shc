import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import './ScriptureSection.css';

const ScriptureSection = () => {
  return (
    <section className="scripture section section--dark-burgundy" aria-label="Scripture Reflection">
      <div className="scripture__pattern-overlay" aria-hidden="true" />
      
      <div className="container">
        <motion.div
          className="scripture__inner"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="scripture__quote-icon-box" aria-hidden="true">
            <Quote size={42} className="scripture__quote-icon" />
          </div>

          <blockquote className="scripture__quote">
            <p className="scripture__verse-text">
              "For where two or three gather in my name, there am I with them."
            </p>
            <cite className="scripture__reference">
              <span className="scripture__ref-line" aria-hidden="true" />
              <span className="scripture__ref-name">MATTHEW 18:20</span>
              <span className="scripture__ref-line" aria-hidden="true" />
            </cite>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default ScriptureSection;
