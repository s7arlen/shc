import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Calendar } from 'lucide-react';
import { events } from '../../data/events';
import './UpcomingEventsSection.css';

const UpcomingEventsSection = () => {
  return (
    <section className="upcoming-events section section--white" aria-label="Upcoming Events">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__label">Calendar of Faith</span>
          <h2 className="section-heading__title">Events & Parish Life</h2>
          <p className="section-heading__subtitle">
            Gather with our parish community for spiritual celebrations, feast days, and ministry gatherings
          </p>
        </div>

        <div className="upcoming-events__grid">
          {events.slice(0, 3).map((item, index) => (
            <motion.div
              key={item.id}
              className="event-card"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="event-card__header">
                <div className="event-card__date-badge">
                  <span className="event-card__day">{item.day}</span>
                  <span className="event-card__month">{item.month}</span>
                </div>
                <span className="event-card__category">{item.category}</span>
              </div>

              <div className="event-card__body">
                <h3 className="event-card__title">{item.title}</h3>
                <p className="event-card__desc">{item.description}</p>
                
                <div className="event-card__meta">
                  <div className="event-card__meta-item">
                    <Clock size={14} className="event-card__icon" />
                    <span>{item.time}</span>
                  </div>
                  <div className="event-card__meta-item">
                    <MapPin size={14} className="event-card__icon" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              <div className="event-card__footer">
                <Link to={`/events#event-${item.id}`} className="event-card__link">
                  <span>View Details</span>
                  <ArrowRight size={15} className="event-card__arrow" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="upcoming-events__cta">
          <Link to="/events" className="btn btn--outline">
            <Calendar size={16} /> Explore All Events
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
