import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ArrowRight, Calendar } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './HeroSlider.css';

const slides = [
  {
    id: 1,
    image: `${import.meta.env.BASE_URL}images/hero-exterior.jpg`,
    eyebrow: 'WELCOME TO THODAMBILA CHURCH',
    title: 'A Community of Faith, Hope & Love',
    subtitle: 'Sacred Heart of Jesus Church, Thodambila — living out the Gospel in communion and service.',
    primaryCta: { text: 'Discover Our Parish', to: '/about/our-parish' },
    secondaryCta: { text: 'Mass Schedule', to: '/faith/mass-timings' },
  },
  {
    id: 2,
    image: `${import.meta.env.BASE_URL}images/hero-interior.jpg`,
    eyebrow: 'A SACRED SANCTUARY',
    title: 'Encounter Grace & Divine Mercy',
    subtitle: 'Gather with us for the Holy Sacrifice of the Mass and spiritual renewal in Thodambila.',
    primaryCta: { text: 'View Mass Schedule', to: '/faith/mass-timings' },
    secondaryCta: { text: 'Our Sacraments', to: '/faith/sacraments' },
  },
  {
    id: 3,
    image: `${import.meta.env.BASE_URL}images/hero-marian.jpg`,
    eyebrow: 'OUR SACRED PATRON',
    title: 'Dedicated to the Sacred Heart',
    subtitle: 'Seeking the divine love, peace and intercession of the Sacred Heart of Jesus for our families.',
    primaryCta: { text: 'Our Patron', to: '/about/our-patroness' },
    secondaryCta: { text: 'Parish History', to: '/about/history' },
  },
  {
    id: 4,
    image: `${import.meta.env.BASE_URL}images/hero-community.jpg`,
    eyebrow: 'PARISH FELLOWSHIP',
    title: 'Serving Christ in One Another',
    subtitle: 'Vibrant commissions, active ICYM youth, and community celebrations for all ages in Thodambila.',
    primaryCta: { text: 'Upcoming Events', to: '/events' },
    secondaryCta: { text: 'Our Ministries', to: '/organizations' },
  },
];

const HeroSlider = () => {
  return (
    <section className="hero" aria-label="Hero image carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop
        speed={1200}
        className="hero__swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="hero__slide">
            <div
              className="hero__image"
              style={{ backgroundImage: `url(${slide.image})` }}
              role="img"
              aria-label={`Church photo: ${slide.title}`}
            />
            <div className="hero__burgundy-overlay" aria-hidden="true" />
            
            <div className="hero__content-wrapper">
              <div className="container">
                <div className="hero__content">
                  <span className="hero__eyebrow">{slide.eyebrow}</span>
                  <h1 className="hero__title">{slide.title}</h1>
                  <div className="hero__gold-divider" aria-hidden="true" />
                  <p className="hero__subtitle">{slide.subtitle}</p>
                  
                  <div className="hero__cta-group">
                    <Link to={slide.primaryCta.to} className="btn btn--primary hero__btn-primary">
                      {slide.primaryCta.text}
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                    <Link to={slide.secondaryCta.to} className="btn btn--outline-light hero__btn-secondary">
                      <Calendar size={15} aria-hidden="true" />
                      {slide.secondaryCta.text}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Smooth Wave Bottom Edge — Mobile Only */}
      <div className="hero__mobile-wave" aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="hero__mobile-wave-svg"
        >
          <defs>
            <linearGradient id="hero-wave-gold-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C5A15B" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#D8B875" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#C5A15B" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <path
            d="M 0,22 C 440,22 680,110 1440,82 L 1440,120 L 0,120 Z"
            fill="var(--white)"
          />
          <path
            d="M 0,22 C 440,22 680,110 1440,82"
            fill="none"
            stroke="url(#hero-wave-gold-grad)"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSlider;
