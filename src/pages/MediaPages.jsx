import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import LatestNewsSection from '../components/home/LatestNewsSection';
import UpcomingEventsSection from '../components/home/UpcomingEventsSection';
import GallerySection from '../components/home/GallerySection';
import VideoSection from '../components/home/VideoSection';
import NewsletterSection from '../components/home/NewsletterSection';
import { news as seedNews } from '../data/news';
import { ArrowLeft, Calendar, Share2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const NewsPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <h1 className="page-hero__title">Latest News & Updates</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>News & Events</span> <span>/</span> <span>Latest News</span>
        </div>
      </div>
    </section>
    <LatestNewsSection />
  </main>
);

export const EventsPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <h1 className="page-hero__title">Upcoming & Past Events</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>News & Events</span> <span>/</span> <span>Events</span>
        </div>
      </div>
    </section>
    <UpcomingEventsSection />
  </main>
);

export const GalleryPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <h1 className="page-hero__title">Photo Gallery</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Media</span> <span>/</span> <span>Gallery</span>
        </div>
      </div>
    </section>
    <GallerySection />
  </main>
);

export const VideosPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <h1 className="page-hero__title">Parish Videos</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Media</span> <span>/</span> <span>Videos</span>
        </div>
      </div>
    </section>
    <VideoSection />
  </main>
);

export const NewsletterPage = () => (
  <main className="inner-page">
    <section className="page-hero">
      <div className="page-hero__content container">
        <h1 className="page-hero__title">Parish Newsletter</h1>
        <div className="page-hero__breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>Media</span> <span>/</span> <span>Newsletter</span>
        </div>
      </div>
    </section>
    <NewsletterSection />
  </main>
);

/* ─── Single News Article Page ─── */
export const SingleNewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lightboxIdx, setLightboxIdx] = React.useState(null);

  const newsList = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('thodambila-admin-news') || 'null') || seedNews; }
    catch { return seedNews; }
  }, []);

  // Support both numeric id and slug
  const article = React.useMemo(() => {
    return newsList.find((n) => String(n.id) === String(id) || n.slug === id);
  }, [newsList, id]);

  const subImages = article?.subImages || [];
  const allImages = article?.image ? [article.image, ...subImages] : subImages;

  if (!article) {
    return (
      <main className="inner-page">
        <section className="page-hero">
          <div className="page-hero__content container">
            <h1 className="page-hero__title">Article Not Found</h1>
          </div>
        </section>
        <section className="section section--white">
          <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              This article could not be found. It may have been removed or the link may be incorrect.
            </p>
            <Link to="/news" className="btn btn--primary">← Back to News</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="inner-page">
      <section className="page-hero">
        <div className="page-hero__content container">
          <span className="page-hero__label">{article.category}</span>
          <h1 className="page-hero__title" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)' }}>{article.title}</h1>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <Link to="/news">News</Link> <span>/</span> <span>{article.category}</span>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container" style={{ maxWidth: '820px' }}>

          {/* Back & Meta */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button
              onClick={() => navigate(-1)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: '1px solid var(--border-gold)', borderRadius: '7px', padding: '8px 16px', cursor: 'pointer', fontWeight: 600, color: 'var(--brown-primary)', fontSize: '0.88rem' }}
            >
              <ArrowLeft size={15} /> Back
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <Calendar size={14} />
              <span>{article.displayDate}</span>
            </div>
          </div>

          {/* Cover Image */}
          {article.image && (
            <div
              style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem', maxHeight: '420px', cursor: allImages.length > 1 ? 'zoom-in' : 'default', boxShadow: 'var(--shadow-med)' }}
              onClick={() => allImages.length >= 1 && setLightboxIdx(0)}
            >
              <img src={article.image} alt={article.title} style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }} />
            </div>
          )}

          {/* Body Content */}
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', lineHeight: '1.85', color: 'var(--text-body)', marginBottom: '2rem' }}>
            {(article.content || article.excerpt || '').split('\n').map((para, i) =>
              para.trim() ? <p key={i} style={{ marginBottom: '1.1em' }}>{para}</p> : <br key={i} />
            )}
          </div>

          {/* Sub Images Gallery */}
          {subImages.length > 0 && (
            <div style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--brown-primary)', fontSize: '1.3rem', marginBottom: '1rem' }}>
                Photo Gallery
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
                {subImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxIdx(idx + 1)}
                    style={{ borderRadius: '8px', overflow: 'hidden', aspectRatio: '4/3', cursor: 'zoom-in', border: '1px solid var(--border-gold)', boxShadow: 'var(--shadow-soft)' }}
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Share row */}
          <div style={{ borderTop: '1px solid var(--border-beige)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <Link to="/news" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--wine)', textDecoration: 'none', fontSize: '0.9rem' }}>
              <ArrowLeft size={14} /> All News
            </Link>
            <button
              onClick={() => { try { navigator.share({ title: article.title, url: window.location.href }); } catch { navigator.clipboard.writeText(window.location.href); } }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: '1px solid var(--border-gold)', borderRadius: '7px', padding: '7px 14px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: 'var(--brown-primary)' }}
            >
              <Share2 size={14} /> Share
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          onClick={() => setLightboxIdx(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIdx(null); }}
            style={{ position: 'absolute', top: '16px', right: '20px', background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={20} />
          </button>
          {allImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + allImages.length) % allImages.length); }}
              style={{ position: 'absolute', left: '12px', background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronLeft size={22} />
            </button>
          )}
          <img
            src={allImages[lightboxIdx]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 8px 50px rgba(0,0,0,0.6)' }}
          />
          {allImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % allImages.length); }}
              style={{ position: 'absolute', right: '12px', background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronRight size={22} />
            </button>
          )}
          <div style={{ position: 'absolute', bottom: '16px', color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>
            {lightboxIdx + 1} / {allImages.length}
          </div>
        </div>
      )}
    </main>
  );
};

