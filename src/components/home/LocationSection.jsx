import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Navigation, ExternalLink } from 'lucide-react';
import './LocationSection.css';

const LocationSection = () => {
  return (
    <section className="location-section section section--white" aria-label="Our Location">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__label">Find Us</span>
          <h2 className="section-heading__title">Our Location</h2>
          <p className="section-heading__subtitle">
            Visit Sacred Heart of Jesus Church in Thodambila, Bantwal
          </p>
        </div>

        <div className="location-section__grid">
          <motion.div
            className="location-section__map-col"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="location-section__map-frame">
              {/* Google Maps Embed iframe with Thodambila coordinates */}
              <iframe
                title="Sacred Heart of Jesus Church Thodambila Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.378!2d75.02!3d12.89!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDUzJzI0LjAiTiA3NcKwMDEnMTIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          <motion.div
            className="location-section__info-col"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="location-info-card">
              <h3 className="location-info-card__title">Sacred Heart of Jesus Church</h3>
              <p className="location-info-card__subtitle">Thodambila • Diocese of Mangalore</p>
              
              <ul className="location-info-card__list">
                <li>
                  <MapPin className="location-info-card__icon" />
                  <div>
                    <strong>Address</strong>
                    <p>Thodambila, Pachinadka, Kallige Post<br />Bantwal Taluk, D.K. — 574219, Karnataka, India</p>
                  </div>
                </li>
                <li>
                  <Phone className="location-info-card__icon" />
                  <div>
                    <strong>Parish Office Phone</strong>
                    <p>+91 94484 28561</p>
                  </div>
                </li>
                <li>
                  <Mail className="location-info-card__icon" />
                  <div>
                    <strong>Email Address</strong>
                    <p>thodambilashjc@gmail.com</p>
                  </div>
                </li>
              </ul>

              <div className="location-info-card__actions">
                <a
                  href="https://maps.app.goo.gl/Tv7VroNUgoAnRYy28"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--gold"
                >
                  <Navigation size={16} />
                  Get Directions
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
