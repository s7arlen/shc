import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Bell } from 'lucide-react';
import { news } from '../../data/news';
import './LatestNewsSection.css';

const LatestNewsSection = () => {
  return (
    <section className="latest-news section section--cream" aria-label="Latest News & Announcements">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__label">Announcements & Updates</span>
          <h2 className="section-heading__title">News & Announcements</h2>
          <p className="section-heading__subtitle">
            Stay informed with current events, parish notices, and pastoral updates
          </p>
        </div>

        <div className="latest-news__grid">
          {news.slice(0, 3).map((item, index) => (
            <motion.article
              key={item.id}
              className="news-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <div className="news-card__image-container">
                <div
                  className="news-card__image"
                  style={{ backgroundImage: `url(${item.image})` }}
                  role="img"
                  aria-label={item.title}
                />
                <span className="news-card__category">{item.category}</span>
              </div>

              <div className="news-card__body">
                <div className="news-card__date">
                  <Calendar size={13} className="news-card__date-icon" />
                  <span>{item.displayDate}</span>
                </div>

                <h3 className="news-card__title">
                  <Link to={`/news#${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="news-card__excerpt">{item.excerpt}</p>

                <div className="news-card__footer">
                  <Link to={`/news#${item.slug}`} className="news-card__read-more">
                    <span>Read Announcement</span>
                    <ArrowRight size={14} className="news-card__arrow" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="latest-news__cta">
          <Link to="/news" className="btn btn--outline">
            <Bell size={16} /> Browse All News
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestNewsSection;
