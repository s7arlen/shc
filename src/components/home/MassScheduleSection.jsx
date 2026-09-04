import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, ShieldAlert, Heart, ArrowRight } from 'lucide-react';
import { massTimes } from '../../data/massTimes';
import './MassScheduleSection.css';

const MassScheduleSection = () => {
  const [activeTab, setActiveTab] = useState('sunday');

  return (
    <section className="mass-schedule section section--cream" aria-label="Mass and Worship Schedule">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__label">Holy Eucharist & Prayer</span>
          <h2 className="section-heading__title">Mass & Worship Times</h2>
          <p className="section-heading__subtitle">
            Gather with us in holy reverence and community prayer at Sacred Heart of Jesus Church, Thodambila
          </p>
        </div>

        {/* Highlight Cards Grid: Sunday, Weekday, Confession, Adoration */}
        <div className="mass-schedule__highlights">
          <div className="mass-card">
            <div className="mass-card__header">
              <Calendar className="mass-card__icon" size={22} />
              <h3>Sunday Masses</h3>
            </div>
            <ul className="mass-card__list">
              <li><span>6:00 AM</span> <small>Konkani</small></li>
              <li><span>7:30 AM</span> <small>English</small></li>
              <li><span>9:00 AM</span> <small>Kannada</small></li>
              <li><span>10:30 AM</span> <small>English (Family Mass)</small></li>
            </ul>
          </div>

          <div className="mass-card">
            <div className="mass-card__header">
              <Clock className="mass-card__icon" size={22} />
              <h3>Weekday Masses</h3>
            </div>
            <ul className="mass-card__list">
              <li><span>Mon – Fri 6:30 AM</span> <small>Konkani</small></li>
              <li><span>Mon – Fri 7:30 AM</span> <small>English</small></li>
              <li><span>Sat Vigil 5:30 PM</span> <small>Konkani / English</small></li>
            </ul>
          </div>

          <div className="mass-card">
            <div className="mass-card__header">
              <ShieldAlert className="mass-card__icon" size={22} />
              <h3>Reconciliation</h3>
            </div>
            <ul className="mass-card__list">
              <li><span>Saturday</span> <small>4:30 PM – 5:15 PM</small></li>
              <li><span>Sunday</span> <small>30 min before each Mass</small></li>
              <li><span>By Appointment</span> <small>Contact Parish Office</small></li>
            </ul>
          </div>

          <div className="mass-card">
            <div className="mass-card__header">
              <Heart className="mass-card__icon" size={22} />
              <h3>Adoration & Devotions</h3>
            </div>
            <ul className="mass-card__list">
              <li><span>1st Friday</span> <small>Adoration after 7:30 AM Mass</small></li>
              <li><span>Novena to Our Lady</span> <small>Wednesdays after Mass</small></li>
              <li><span>Rosary</span> <small>Daily before Morning Mass</small></li>
            </ul>
          </div>
        </div>

        {/* Detailed Tabs Box */}
        <div className="mass-schedule__tabs-container">
          <div className="mass-schedule__tabs" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'sunday'}
              className={`mass-schedule__tab ${activeTab === 'sunday' ? 'active' : ''}`}
              onClick={() => setActiveTab('sunday')}
            >
              Sunday Schedule
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'weekday'}
              className={`mass-schedule__tab ${activeTab === 'weekday' ? 'active' : ''}`}
              onClick={() => setActiveTab('weekday')}
            >
              Weekday Schedule
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'special'}
              className={`mass-schedule__tab ${activeTab === 'special' ? 'active' : ''}`}
              onClick={() => setActiveTab('special')}
            >
              Special Celebrations
            </button>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mass-schedule__tab-content"
          >
            {activeTab === 'sunday' && (
              <div className="mass-table-wrapper">
                <table className="mass-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Language</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {massTimes.sunday.map((item, idx) => (
                      <tr key={idx}>
                        <td className="mass-table__time">{item.time}</td>
                        <td className="mass-table__lang">{item.language}</td>
                        <td className="mass-table__note">{item.note || 'Regular Mass'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'weekday' && (
              <div className="mass-table-wrapper">
                <table className="mass-table">
                  <thead>
                    <tr>
                      <th>Days</th>
                      <th>Time</th>
                      <th>Language</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {massTimes.weekday.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.day}</td>
                        <td className="mass-table__time">{item.time}</td>
                        <td className="mass-table__lang">{item.language}</td>
                        <td className="mass-table__note">{item.note || 'Daily Mass'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'special' && (
              <div className="mass-special-grid">
                <div className="mass-special-col">
                  <h4>Feast Days & Solemnities</h4>
                  <ul>
                    {massTimes.special.map((item, idx) => (
                      <li key={idx}>
                        <strong>{item.occasion}:</strong> {item.time} {item.note && `(${item.note})`}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <div className="mass-schedule__footer-cta">
          <Link to="/faith/mass-timings" className="btn btn--primary">
            View Complete Mass Schedule
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MassScheduleSection;
