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
    title: 'Welcome to Sacred Heart of Jesus Church',
    tagline: 'FAITH  •  COMMUNITY  •  FELLOWSHIP',
    subtitle: 'Sacred Heart of Jesus Church, Thodambila — living out the Gospel in communion and service.',
    primaryCta: { text: 'Explore Church', to: '/about/our-parish' },
    secondaryCta: { text: 'Mass Schedule', to: '/faith/mass-timings' },
  },
  {
    id: 2,
    image: `${import.meta.env.BASE_URL}images/hero-interior.jpg`,
    eyebrow: 'A SACRED SANCTUARY',
    title: 'Encounter Grace & Divine Mercy',
    tagline: 'SACRAMENTS  •  PRAYER  •  DEVOTION',
    subtitle: 'Gather with us for the Holy Sacrifice of the Mass and spiritual renewal in Thodambila.',
    primaryCta: { text: 'View Mass Schedule', to: '/faith/mass-timings' },
    secondaryCta: { text: 'Our Sacraments', to: '/faith/sacraments' },
  },
  {
    id: 3,
    image: `${import.meta.env.BASE_URL}images/hero-marian.jpg`,
    eyebrow: 'OUR SACRED PATRON',
    title: 'Dedicated to the Sacred Heart',
    tagline: 'FAITH  •  LOVE  •  PROTECTION',
    subtitle: 'Seeking the divine love, peace and intercession of the Sacred Heart of Jesus for our families.',
    primaryCta: { text: 'Explore Devotion', to: '/about/our-patroness' },
    secondaryCta: { text: 'Parish History', to: '/about/history' },
  },
  {
    id: 4,
    image: `${import.meta.env.BASE_URL}images/hero-community.jpg`,
    eyebrow: 'PARISH FELLOWSHIP',
    title: 'Serving Christ in One Another',
    tagline: 'YOUTH  •  MINISTRIES  •  SERVICE',
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
                  <p className="hero__tagline">{slide.tagline}</p>
                  <p className="hero__subtitle">{slide.subtitle}</p>
                  
                  <div className="hero__cta-group">
                    <Link to={slide.primaryCta.to} className="btn hero__btn-primary">
                      <span>{slide.primaryCta.text}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                    <Link to={slide.secondaryCta.to} className="btn hero__btn-secondary">
                      <Calendar size={15} aria-hidden="true" />
                      <span>{slide.secondaryCta.text}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
