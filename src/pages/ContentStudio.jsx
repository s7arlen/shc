import React, { useState } from 'react';
import './ContentStudio.css';

const base = import.meta.env.BASE_URL;
const defaults = {
  home: { title: 'Homepage', heroTitle: 'Welcome to Sacred Heart of Jesus Church', heroText: 'Sacred Heart of Jesus Church, Thodambila — living out the Gospel in communion and service.', image: `${base}images/hero-exterior.jpg`, bodyTitle: 'Welcome to Our Parish', body: 'A parish family rooted in faith, prayer, and loving service.' },
  parish: { title: 'Our Parish', heroTitle: 'Our Parish', heroText: 'Welcome to Sacred Heart of Jesus Parish', image: `${base}images/welcome-church.jpg`, bodyTitle: 'Our Parish Mission', body: 'To build a vibrant, prayerful Catholic community rooted in the Word of God and the Eucharist.' },
  patroness: { title: 'Our Patroness', heroTitle: 'Our Patroness', heroText: 'Devotion and intercession', image: `${base}images/patroness-mary.jpg`, bodyTitle: 'Our Patroness', body: 'Our parish nurtures devotion, prayer, and service through the love of Christ.' },
  diocese: { title: 'Diocese', heroTitle: 'Diocese of Mangalore', heroText: 'Our diocesan family', image: `${base}images/church-exterior.jpg`, bodyTitle: 'Diocesan Connection', body: 'Sacred Heart of Jesus Church belongs to the Diocese of Mangalore.' },
  faith: { title: 'Faith & Sacraments', heroTitle: 'Faith Formation', heroText: 'Sacraments, catechism and prayer', image: `${base}images/quick-sacraments.jpg`, bodyTitle: 'Growing in Faith', body: 'Find Mass timings, sacramental preparation, catechism, and prayer resources.' },
  contact: { title: 'Contact & Footer', heroTitle: 'Contact Our Parish', heroText: 'We are here to help.', image: `${base}images/church-exterior.jpg`, bodyTitle: 'Parish Office', body: 'Sacred Heart of Jesus Church, Thodambila, Bantwal.' },
};
const tabs = ['home', 'parish', 'patroness', 'diocese', 'faith', 'contact'];

export default function ContentStudio() {
  const [tab, setTab] = useState('home');
  const [data, setData] = useState(() => { try { return { ...defaults, ...JSON.parse(localStorage.getItem('thodambila-page-content') || '{}') }; } catch { return defaults; } });
  const [notice, setNotice] = useState(''); const page = data[tab];
  const set = (key, value) => setData({ ...data, [tab]: { ...page, [key]: value } });
  const upload = (e) => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => set('image', reader.result); reader.readAsDataURL(file); };
  const save = (e) => { e.preventDefault(); localStorage.setItem('thodambila-page-content', JSON.stringify(data)); setNotice(`${page.title} saved`); setTimeout(() => setNotice(''), 1800); };
  return <main className="content-studio"><header><p>ADMIN CONTENT STUDIO</p><h1>Website Content</h1><span>Manage every public-page heading, image, and written section.</span></header><nav>{tabs.map((key) => <button key={key} className={tab === key ? 'active' : ''} onClick={() => setTab(key)}>{data[key].title}</button>)}</nav><form onSubmit={save}><div className="content-studio__head"><div><h2>{page.title}</h2><p>Changes are saved to the admin content store.</p></div><button>Save Changes</button></div><section className="content-studio__grid"><label>Page hero title<input value={page.heroTitle} onChange={(e) => set('heroTitle', e.target.value)} /></label><label>Section heading<input value={page.bodyTitle} onChange={(e) => set('bodyTitle', e.target.value)} /></label><label className="wide">Hero introduction<textarea value={page.heroText} onChange={(e) => set('heroText', e.target.value)} /></label><label className="wide">Page image<div className="content-studio__image"><input value={page.image} onChange={(e) => set('image', e.target.value)} placeholder="Image URL" /><label className="upload">Choose image<input type="file" accept="image/*" onChange={upload} /></label>{page.image && <img src={page.image} alt="Preview" />}</div></label><label className="wide">Main page content<textarea value={page.body} onChange={(e) => set('body', e.target.value)} /></label></section><footer><button>Save {page.title}</button>{notice && <span>✓ {notice}</span>}</footer></form></main>;
}
