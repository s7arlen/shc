import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, HeartHandshake, Music, Shield, BookOpen, UsersRound, ArrowRight } from 'lucide-react';
import { ministries } from '../../data/ministries';
import './ParishOrganizationsSection.css';

// Map icons to ministries
const ministryIcons = {
  'youth-ministry': Users,
  'womens-association': HeartHandshake,
  'mens-association': UsersRound,
  'parish-choir': Music,
  'altar-servers': Shield,
  'catechism': BookOpen,
};

const ParishOrganizationsSection = () => {
  return (
    <section className="organizations section section--cream" aria-label="Community Ministries and Organizations">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__label">Fellowship & Service</span>
          <h2 className="section-heading__title">Community & Ministries</h2>
          <p className="section-heading__subtitle">
            Active associations fostering faith, spiritual growth, and dedicated service in our parish family
          </p>
        </div>

        <div className="organizations__grid">
          {ministries.slice(0, 6).map((org, index) => {
            const Icon = ministryIcons[org.slug] || Users;
            return (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Link to={`/organizations/${org.slug}`} className="org-minimal-card">
                  <div className="org-minimal-card__icon-box">
                    <Icon size={24} className="org-minimal-card__icon" />
                  </div>
                  <div className="org-minimal-card__content">
                    <h3 className="org-minimal-card__title">{org.name}</h3>
                    <p className="org-minimal-card__desc">{org.description}</p>
                    <span className="org-minimal-card__link">
                      Explore Ministry <ArrowRight size={14} className="org-minimal-card__arrow" />
                    </span>
                  </div>
                  <div className="org-minimal-card__gold-accent" aria-hidden="true" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="organizations__cta">
          <Link to="/organizations" className="btn btn--outline">
            View All Parish Organizations
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ParishOrganizationsSection;
