import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './WelcomeSection.css';

const WelcomeSection = () => {
  return (
    <section className="welcome section section--white" aria-label="About Our Church">
      <div className="container">
        <div className="welcome__grid">
          {/* Left Column: Text & Content */}
          <motion.div
            className="welcome__content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-heading__label">Peace & Goodness</span>
            <h2 className="welcome__title">Our Parish, Our Community</h2>
            <div className="welcome__gold-divider" aria-hidden="true" />
            
            <h3 className="welcome__subheading">
              A sanctuary of Catholic faith, heritage, and Christian service in Thodambila, Bantwal.
            </h3>
            
            <p className="welcome__text">
              Sacred Heart of Jesus Church, Thodambila (ಜೆಜುಚ್ಯಾ ಪವಿತ್ರ್ ಕಾಳ್ಜಾಚಿ ಫಿರ್ಗಜ್, ತೊಡಂಬಿಲ್) is a vibrant Catholic parish under the Roman Catholic Diocese of Mangalore. Situated near the Thodambila Pachinadka junction on the Polali Highway, our parish family gathers to celebrate the Holy Mass, grow together through the Sacraments, and extend Christ’s love through prayer, community fellowship, and active outreach.
            </p>
            
            <p className="welcome__text">
              Whether you are a lifelong parishioner, a newcomer seeking a spiritual home, or a visitor seeking peace, we open our arms and hearts to welcome you into our parish family.
            </p>

            <div className="welcome__cta-wrapper">
              <Link to="/about/our-parish" className="btn btn--primary">
                Learn More About Us
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Photo with Gold Decorative Frame */}
          <motion.div
            className="welcome__image-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="welcome__image-frame">
              <div
                className="welcome__image"
                style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/welcome-church.jpg')` }}
                role="img"
                aria-label="Sacred Heart of Jesus Church Thodambila exterior"
              />
              <div className="welcome__gold-border" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
