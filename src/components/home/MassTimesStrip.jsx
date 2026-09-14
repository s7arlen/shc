import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { massTimes } from '../../data/massTimes';
import './MassTimesStrip.css';

const MassTimesStrip = () => {
  const schedule = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('thodambila-admin-mass') || 'null') || [
        { day: 'Mon – Fri', time: '6:30 AM', note: 'Holy Mass' },
        { day: 'Sat', time: '4:00 PM', note: 'Sunday Liturgy' },
        { day: 'Sun', time: '7:30 AM', note: 'Holy Mass' }
      ];
    } catch {
      return [
        { day: 'Mon – Fri', time: '6:30 AM', note: 'Holy Mass' },
        { day: 'Sat', time: '4:00 PM', note: 'Sunday Liturgy' },
        { day: 'Sun', time: '7:30 AM', note: 'Holy Mass' }
      ];
    }
  }, []);

  return (
    <div className="mass-strip" aria-label="Mass times quick reference">
      <div className="container mass-strip__inner">
        <div className="mass-strip__label">
          <Clock size={14} aria-hidden="true" />
          <span>Mass Timings</span>
        </div>

        <ul className="mass-strip__times" role="list">
          {schedule.slice(0, 3).map((item, index) => (
            <li key={index} className="mass-strip__time-pill">
              <span className="mass-strip__time">{item.day}: {item.time}</span>
              {item.note && <span className="mass-strip__lang">{item.note}</span>}
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
