import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { massTimes } from '../../data/massTimes';
import './MassTimesStrip.css';

const MassTimesStrip = () => {
  return (
    <div className="mass-strip" aria-label="Mass times quick reference">
      <div className="container mass-strip__inner">
        <div className="mass-strip__label">
          <Clock size={14} aria-hidden="true" />
          <span>Sunday Masses</span>
        </div>

        <ul className="mass-strip__times" role="list">
          {massTimes.sunday.map((item, idx) => (
            <li key={idx} className="mass-strip__time-pill">
              <span className="mass-strip__time">{item.time}</span>
              <span className="mass-strip__lang">{item.language}</span>
            </li>
          ))}
        </ul>

        <Link to="/faith/mass-timings" className="mass-strip__link">
          Full Schedule
          <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};

export default MassTimesStrip;
