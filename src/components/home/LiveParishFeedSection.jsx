import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Bell, Sparkles, Newspaper, PhoneCall, FileText } from 'lucide-react';
import { events } from '../../data/events';
import { news } from '../../data/news';
import './LiveParishFeedSection.css';

const LiveParishFeedSection = () => {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'events' | 'news'

  // Combine items for 'all' stream
  const eventFeed = events.map(item => ({ ...item, feedType: 'event' }));
  const newsFeed = news.map(item => ({ ...item, feedType: 'news' }));

  // Interleave for rich wall experience
  const combinedStream = [];
  const maxLen = Math.max(eventFeed.length, newsFeed.length);
  for (let i = 0; i < maxLen; i++) {
    if (eventFeed[i]) combinedStream.push(eventFeed[i]);
    if (newsFeed[i]) combinedStream.push(newsFeed[i]);
  }

  const getFilteredItems = () => {
    if (activeFilter === 'events') return eventFeed.slice(0, 6);
    if (activeFilter === 'news') return newsFeed.slice(0, 6);
    return combinedStream.slice(0, 6);
  };

  const filteredItems = getFilteredItems();

  return (
    <section className="parish-feed-section" aria-label="Parish Community Feed">
      <div className="container">
        {/* Section Header */}
        <div className="parish-feed-header">
          <div className="parish-feed-header__text">
            <span className="section-heading__label">FAITH IN ACTION • LIVE UPDATES</span>
            <h2 className="parish-feed-header__title">Parish Feed & Announcements</h2>
          </div>

          {/* Interactive Filter Pills */}
          <div className="parish-feed-filters" role="tablist" aria-label="Filter parish updates">
            <button
              className={`parish-feed-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
              role="tab"
              aria-selected={activeFilter === 'all'}
            >
              <Sparkles size={14} aria-hidden="true" />
              <span>All Feed ({events.length + news.length})</span>
            </button>

            <button
              className={`parish-feed-filter-btn ${activeFilter === 'events' ? 'active' : ''}`}
              onClick={() => setActiveFilter('events')}
              role="tab"
              aria-selected={activeFilter === 'events'}
            >
              <Calendar size={14} aria-hidden="true" />
              <span>Events ({events.length})</span>
            </button>

            <button
              className={`parish-feed-filter-btn ${activeFilter === 'news' ? 'active' : ''}`}
              onClick={() => setActiveFilter('news')}
              role="tab"
              aria-selected={activeFilter === 'news'}
            >
              <Newspaper size={14} aria-hidden="true" />
              <span>News ({news.length})</span>
            </button>
          </div>
        </div>

        {/* Live Feed Grid Wall */}
        <motion.div className="parish-feed-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              if (item.feedType === 'event') {
                return (
                  <motion.div
                    key={`event-${item.id}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className="feed-card feed-card--event"
                  >
                    <div className="feed-card__badge-bar">
                      <span className="feed-card__type-tag feed-card__type-tag--event">
                        <Calendar size={11} /> UPCOMING EVENT
                      </span>
                      <span className="feed-card__category">{item.category}</span>
                    </div>

                    <div className="feed-card__event-main">
                      <div className="feed-card__date-box">
                        <span className="feed-card__date-day">{item.day}</span>
                        <span className="feed-card__date-month">{item.month}</span>
                      </div>

                      <div className="feed-card__event-details">
                        <h3 className="feed-card__title">
                          <Link to={`/events#event-${item.id}`}>{item.title}</Link>
                        </h3>

                        <div className="feed-card__meta">
                          <span><Clock size={13} /> {item.time}</span>
                          <span><MapPin size={13} /> {item.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="feed-card__description">{item.description}</p>

                    <div className="feed-card__footer">
                      <Link to={`/events#event-${item.id}`} className="feed-card__link">
                        Event Details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                );
              } else {
                return (
                  <motion.div
                    key={`news-${item.id}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className="feed-card feed-card--news"
                  >
                    <div className="feed-card__image-wrap">
                      <img src={item.image} alt={item.title} className="feed-card__image" />
                      <div className="feed-card__image-overlay">
                        <span className="feed-card__type-tag feed-card__type-tag--news">
                          <Newspaper size={11} /> PARISH NEWS
                        </span>
                        <span className="feed-card__category-chip">{item.category}</span>
                      </div>
                    </div>

                    <div className="feed-card__news-content">
                      <div className="feed-card__date-stamp">
                        <Calendar size={12} /> {item.displayDate}
                      </div>

                      <h3 className="feed-card__title">
                        <Link to={`/news#${item.slug}`}>{item.title}</Link>
                      </h3>

                      <p className="feed-card__excerpt">{item.excerpt}</p>

                      <div className="feed-card__footer">
                        <Link to={`/news#${item.slug}`} className="feed-card__link">
                          Read Story <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              }
            })}

            {/* Special Community Callout Card embedded inside the Wall */}
            {activeFilter === 'all' && (
              <motion.div
                layout
                key="feed-community-callout"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="feed-card feed-card--callout"
              >
                <div className="feed-callout__icon">
                  <Bell size={24} />
                </div>
                <h3 className="feed-callout__title">Stay Connected with Thodambila Parish</h3>
                <p className="feed-callout__desc">
                  Never miss mass timing changes, feast celebrations, or ward announcements. Contact our parish office or request our bulletin.
                </p>
                <div className="feed-callout__actions">
                  <Link to="/parish/office" className="btn btn--primary btn--sm">
                    <PhoneCall size={13} /> Contact Office
                  </Link>
                  <Link to="/newsletter" className="btn btn--outline btn--sm">
                    <FileText size={13} /> Parish Newsletter
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Dual Action Bar */}
        <div className="parish-feed-bottom-bar">
          <Link to="/events" className="btn btn--outline">
            Full Events Calendar <ArrowRight size={15} />
          </Link>
          <Link to="/news" className="btn btn--outline">
            All News Archives <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LiveParishFeedSection;
