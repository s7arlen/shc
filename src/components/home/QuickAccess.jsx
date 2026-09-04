import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Church, Calendar, Image as ImageIcon, ArrowRight } from 'lucide-react';
import './QuickAccess.css';

const quickAccessItems = [
  {
    id: 'mass-schedule',
    title: 'Mass Schedule',
    subtitle: 'View Holy Mass, Confession & Adoration timings.',
    icon: Clock,
    link: '/faith/mass-timings',
  },
  {
    id: 'our-parish',
    title: 'Our Parish',
    subtitle: 'Explore our heritage, patroness & pastoral team.',
    icon: Church,
    link: '/about/our-parish',
  },
  {
    id: 'events-news',
    title: 'Events & News',
    subtitle: 'Stay updated with parish news & celebrations.',
    icon: Calendar,
    link: '/events',
  },
  {
    id: 'gallery',
    title: 'Photo Gallery',
    subtitle: 'Moments of devotion, liturgy & fellowship.',
    icon: ImageIcon,
    link: '/media/gallery',
  },
];

const QuickAccess = () => {
  return (
    <section id="quick-access-section" className="quick-access section section--ivory" aria-label="Quick Actions">
      <div className="container">
        <div className="quick-access__grid">
          {quickAccessItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={item.link} className="quick-card">
                  <div className="quick-card__icon-box">
                    <Icon className="quick-card__icon" size={28} />
                    <span className="quick-card__gold-dot" aria-hidden="true" />
                  </div>
                  
                  <div className="quick-card__content">
                    <h3 className="quick-card__title">{item.title}</h3>
                    <p className="quick-card__subtitle">{item.subtitle}</p>
                  </div>

                  <div className="quick-card__footer">
                    <span className="quick-card__link-text">
                      Explore <ArrowRight size={14} className="quick-card__arrow" />
                    </span>
                  </div>

                  <div className="quick-card__gold-bar" aria-hidden="true" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
