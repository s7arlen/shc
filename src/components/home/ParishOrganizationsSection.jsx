import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Shield, HeartHandshake, Heart, Music, UserCheck, Sparkles, ArrowRight } from 'lucide-react';
import { ministries } from '../../data/ministries';
import './ParishOrganizationsSection.css';

// Map icons to ministries
const ministryIcons = {
  'icym': Users,
  'ycs': GraduationCap,
  'catholic-sabha': Shield,
  'sthree-sanghatan': HeartHandshake,
  'marian-sodality': Heart,
  'choir-group': Music,
  'altar-servers': Shield,
  'svp': HeartHandshake,
  'franciscan-third-order': Sparkles,
};

const ParishOrganizationsSection = () => {
  return (
    <section className="organizations section section--cream" aria-label="Community Ministries and Organizations">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">Community & Ministries</h2>
          <p className="section-heading__subtitle">
            Active associations fostering faith, spiritual growth, and dedicated service in our parish family
          </p>
        </div>

        <div className="organizations__grid">
          {ministries.map((org, index) => {
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
