import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Video } from 'lucide-react';
import { videos } from '../../data/videos';
import './VideoSection.css';

const VideoSection = () => {
  const featuredVideo = videos[0];

  return (
    <section className="parish-videos section section--white" aria-label="Parish Videos">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__label">Media & Devotion</span>
          <h2 className="section-heading__title">From Our Parish</h2>
          <p className="section-heading__subtitle">
            Watch liturgical celebrations, feast day recordings and parish media
          </p>
        </div>

        <motion.div
          className="parish-videos__featured"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="parish-videos__player-container">
            <div
              className="parish-videos__thumbnail"
              style={{ backgroundImage: `url(${featuredVideo.thumbnail})` }}
            >
              <div className="parish-videos__play-overlay">
                <button
                  className="parish-videos__play-btn"
                  aria-label={`Play video: ${featuredVideo.title}`}
                  onClick={() => alert(`Playing: ${featuredVideo.title}`)}
                >
                  <Play size={28} fill="currentColor" />
                </button>
              </div>
              <span className="parish-videos__duration-badge">HD Video</span>
            </div>
          </div>

          <div className="parish-videos__meta">
            <span className="parish-videos__date">{featuredVideo.displayDate}</span>
            <h3 className="parish-videos__title">{featuredVideo.title}</h3>
            <p className="parish-videos__desc">{featuredVideo.description}</p>
            <div className="parish-videos__cta">
              <Link to="/media/videos" className="btn btn--outline">
                <Video size={16} /> View All Videos
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
