import React, { useState } from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { newsletters } from '../../data/newsletter';
import './NewsletterSection.css';

const NewsletterSection = () => {
  const featured = newsletters.find(n => n.featured) || newsletters[0];
  const [selectedYear, setSelectedYear] = useState(2026);
  const filteredArchive = newsletters.filter(n => n.year === selectedYear);

  return (
    <section className="newsletter section section--white" aria-label="Parish Newsletter">
      <div className="container">
        <div className="section-heading">
          <span className="section-heading__label">Official Publication</span>
          <h2 className="section-heading__title">Parish Newsletter</h2>
          <p className="section-heading__subtitle">
            Read the monthly voices, news and reflections of Sacred Heart of Jesus Parish, Thodambila
          </p>
        </div>

        <div className="newsletter__featured-card">
          <div className="newsletter__cover-col">
            <div
              className="newsletter__cover-image"
              style={{ backgroundImage: `url(${featured.image})` }}
              role="img"
              aria-label={featured.title}
            />
            <div className="newsletter__badge">Latest Issue</div>
          </div>

          <div className="newsletter__info-col">
            <div className="newsletter__edition-tag">
              <FileText size={14} />
              <span>{featured.edition} • {featured.displayDate}</span>
            </div>
            <h3 className="newsletter__title">{featured.title}</h3>
            <p className="newsletter__desc">{featured.description}</p>

            <div className="newsletter__actions">
              <a href={featured.readUrl} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
                <Eye size={15} /> Read Online
              </a>
              <a href={featured.pdfUrl} className="btn btn--outline" download>
                <Download size={15} /> Download PDF
              </a>
            </div>
          </div>
        </div>

        {/* Archive Selector */}
        <div className="newsletter__archive">
          <h3 className="newsletter__archive-title">Newsletter Archive</h3>
          <div className="newsletter__year-tabs">
            {[2026, 2025, 2024].map((year) => (
              <button
                key={year}
                className={`newsletter__year-btn ${selectedYear === year ? 'active' : ''}`}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </button>
            ))}
          </div>

          <div className="newsletter__archive-grid">
            {filteredArchive.map((item) => (
              <div key={item.id} className="newsletter__archive-item">
                <FileText size={20} className="newsletter__archive-icon" />
                <div className="newsletter__archive-details">
                  <h4>{item.title}</h4>
                  <span>{item.displayDate}</span>
                </div>
                <a href={item.pdfUrl} className="newsletter__archive-dl" aria-label={`Download ${item.title}`}>
                  <Download size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
