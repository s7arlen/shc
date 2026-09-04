import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: null, message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields (Name, Email, Message).',
      });
      return;
    }

    // Frontend demo success state
    setStatus({
      type: 'success',
      message: 'Thank you! Your message has been sent to the Parish Office.',
    });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <section className="contact-section section section--cream" aria-label="Contact Parish Office">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__label">Get in Touch</span>
          <h2 className="section-heading__title">Contact Parish Office</h2>
          <p className="section-heading__subtitle">
            We welcome your inquiries, intentions, and feedback
          </p>
        </div>

        <div className="contact-section__grid">
          <motion.div
            className="contact-form-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact-form-card__title">Send Us a Message</h3>

            {status.type && (
              <div className={`contact-status contact-status--${status.type}`}>
                {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="contact-form__row">
                <div className="contact-form__group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="contact-form__group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="contact-form__row">
                <div className="contact-form__group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="contact-form__group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Mass Intentions / Inquiry"
                  />
                </div>
              </div>

              <div className="contact-form__group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  required
                />
              </div>

              <button type="submit" className="btn btn--primary contact-form__submit">
                <Send size={15} /> Submit Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
