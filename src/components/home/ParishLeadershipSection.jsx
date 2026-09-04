import React from 'react';
import { motion } from 'framer-motion';
import { leadership } from '../../data/leadership';
import './ParishLeadershipSection.css';

const ParishLeadershipSection = () => {
  const team = leadership.parishCouncil;

  return (
    <section className="leadership section section--cream" aria-label="Parish Leadership">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__label">Shepherds & Servants</span>
          <h2 className="section-heading__title">Parish Leadership</h2>
          <p className="section-heading__subtitle">
            Dedicated pastoral team and council members serving Sacred Heart of Jesus Parish, Thodambila
          </p>
        </div>

        <div className="leadership__grid">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              className="leadership-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="leadership-card__photo-container">
                <div
                  className="leadership-card__photo"
                  style={{ backgroundImage: `url(${member.image})` }}
                  role="img"
                  aria-label={member.name}
                />
                <div className="leadership-card__ring" aria-hidden="true" />
              </div>
              <h3 className="leadership-card__name">{member.name}</h3>
              <p className="leadership-card__position">{member.position}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParishLeadershipSection;
