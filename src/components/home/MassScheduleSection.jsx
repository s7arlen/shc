import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { weeklyMassSchedule, massTimes } from '../../data/massTimes';
import './MassScheduleSection.css';

const MassScheduleSection = () => {
  return (
    <section className="mass-schedule section section--cream" aria-label="Mass and Worship Schedule">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">Mass & Worship Times</h2>
          <p className="section-heading__subtitle">
            Gather with us in holy reverence and community prayer at Sacred Heart of Jesus Church, Thodambila
          </p>
        </div>

        <motion.div
          className="mass-weekly-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Card Header */}
          <div className="mass-weekly-card__header">
            <Clock size={16} className="mass-weekly-card__header-icon" />
            <span className="mass-weekly-card__header-title">WEEKLY SCHEDULE</span>
          </div>

          {/* Card Body Rows */}
          <div className="mass-weekly-card__body">
            {weeklyMassSchedule.map((item, index) => (
              <div key={index} className="mass-weekly-card__row">
                <div className="mass-weekly-card__day">{item.day}</div>
                <div className="mass-weekly-card__time">{item.time}</div>
                <div className="mass-weekly-card__note">{item.note}</div>
              </div>
            ))}
          </div>

          {/* Card Footer Callout Panel */}
          <div className="mass-weekly-card__footer">
            {massTimes.footerNotes.map((note, index) => (
              <p key={index} className="mass-weekly-card__footer-line">
                <strong className="mass-weekly-card__footer-label">{note.label}</strong>{' '}
                <span className="mass-weekly-card__footer-val">{note.value}</span>
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MassScheduleSection;
