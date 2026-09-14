import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BellRing, CalendarDays, CheckCircle2, ChevronDown, Clock3, CloudUpload, Edit3, Eye, EyeOff, FileText, FolderHeart, Image, KeyRound, LayoutGrid, Lock, LogOut, Menu, Plus, RotateCcw, Save, Search, Settings, ShieldCheck, Trash2, UsersRound, X } from 'lucide-react';
import { news as seedNews } from '../data/news';
import { events as seedEvents } from '../data/events';
import { newsletters as seedNewsletters } from '../data/newsletter';
import { wards as seedWards } from '../data/wards';
import { historyTimeline as seedHistory } from '../data/history';
import { galleryImages } from '../data/gallery';
import { ministries } from '../data/ministries';
import { leadership } from '../data/leadership';
import { weeklyMassSchedule } from '../data/massTimes';
import './AdminPage.css';

/** Safe localStorage helper — never throws on corrupt/missing data */
function lsGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function isOrgMatch(org, target) {
  if (!target || target === 'all') return true;
  const tgt = String(target).toLowerCase().trim();
  const id = String(org?.id || '').toLowerCase().trim();
  const slug = String(org?.slug || '').toLowerCase().trim();
  const shortName = String(org?.shortName || '').toLowerCase().trim();
  const name = String(org?.name || '').toLowerCase().trim();
  return id === tgt || slug === tgt || shortName === tgt || name === tgt;
}

const pages = { settings: ['Site Settings', 'Manage public church details, navigation, and homepage hero slides.'], priest: ['Parish Priest', 'Update the parish priest profile and leadership information.'], messages: ['Priest Messages', 'Publish the priest’s welcome and pastoral messages.'], council: ['Parish Council', 'Manage the parish pastoral council and office bearers.'], office: ['Parish Office', 'Manage parish office contacts, hours, and address.'], mass: ['Mass Timings', 'Keep Mass schedules and special liturgies current.'], events: ['Upcoming Events', 'Publish and edit parish events and feast programmes.'], news: ['Parish News & Notices', 'Publish and edit news articles, feast notices, pastoral messages, and parish bulletins.'], newsletter: ['Parish Newsletter', 'Manage parish newsletters and edition links.'], gallery: ['Photo Gallery', 'Organize photos that appear in the parish media gallery.'], obituary: ['Obituaries', 'Publish memorial notices and funeral details.'], organizations: ['Parish Organizations', 'Manage parish associations, their leaders, ministry details, and activity information.'], wards: ['Parish Wards', 'Manage ward details, families, and representatives.'], history: ['Church History', 'Maintain historical facts and the parish timeline.'] };
const categories = ['All', 'Feast', 'Liturgy', 'Youth', 'Catechism', 'Organization', 'Parish', 'Newsletter'];
const PARISH_WARDS = [
  { id: 'sacred-heart', name: 'Sacred Heart of Jesus Ward', shortName: 'Sacred Heart Ward', konkani: 'ಜೆಜುಚ್ಯಾ ಪವಿತ್ರ್ ಕಾಳ್ಜಾ ವಾಡೊ', patron: 'Sacred Heart of Jesus' },
  { id: 'nithyadar', name: 'Nithyadar Ward', shortName: 'Nithyadar Ward', konkani: 'ನಿತ್ಯಾದರ್ ವಾಡೊ', patron: 'Our Lady of Perpetual Help' },
  { id: 'christ-king', name: 'Christ the King Ward', shortName: 'Christ the King Ward', konkani: 'ಜೆಜು ರಾಯ್ ವಾಡೊ', patron: 'Christ the King' },
  { id: 'vailankanni', name: 'Vailankanni Ward', shortName: 'Vailankanni Ward', konkani: 'ವೆಲಂಕಣಿ ವಾಡೊ', patron: 'Our Lady of Good Health, Vailankanni' },
  { id: 'infant-jesus', name: 'Infant Jesus Ward', shortName: 'Infant Jesus Ward', konkani: 'ಬಾಳೊಕ್ ಜೆಜು ವಾಡೊ', patron: 'Infant Jesus' }
];

const base = import.meta.env.BASE_URL;
const defaultSiteSettings = {
  churchName: 'Sacred Heart of Jesus Church',
  location: 'Thodambila, Bantwal',
  officePhone: '',
  tabs: { Home: true, About: true, Parish: true, Wards: true, Organizations: true, 'News & Events': true, Media: true, Contact: true },
  slides: [
    {
      id: 1,
      label: 'Hero Slide 1',
      image: `${base}images/hero-exterior.jpg`,
      eyebrow: 'WELCOME TO THODAMBILA CHURCH',
      title: 'Welcome to Sacred Heart of Jesus Church',
      subtitle: 'Sacred Heart of Jesus Church, Thodambila — living out the Gospel in communion and service.'
    },
    {
      id: 2,
      label: 'Hero Slide 2',
      image: `${base}images/hero-interior.jpg`,
      eyebrow: 'A SACRED SANCTUARY',
      title: 'Encounter Grace & Divine Mercy',
      subtitle: 'Gather with us for the Holy Sacrifice of the Mass and spiritual renewal in Thodambila.'
    }
  ]
};

function WardSelect({ label = 'Parish Ward', value, change, required = false }) {
  const normVal = (value || '').toLowerCase().trim();
  const isMatch = PARISH_WARDS.some(
    (w) => w.name.toLowerCase() === normVal || w.shortName.toLowerCase() === normVal || w.konkani.toLowerCase() === normVal
  );
  const isCustom = value && !isMatch;

  return (
    <label className="loreto-field">
      {label}
      <select
        className="loreto-modal-select"
        value={value || ''}
        onChange={(e) => change(e.target.value)}
        required={required}
        style={{ textTransform: 'none', background: '#fffcf6' }}
      >
        <option value="">-- Select Parish Ward --</option>
        {isCustom && <option value={value}>{value}</option>}
        {PARISH_WARDS.map((w) => (
          <option key={w.id} value={w.name}>
            {w.name} ({w.konkani})
          </option>
        ))}
      </select>
    </label>
  );
}

export default function AdminPage() {
  const [auth, setAuth] = useState(() => {
    return sessionStorage.getItem('thodambila-admin-auth') === 'true' || localStorage.getItem('thodambila-admin-auth') === 'true';
  });
  const [password, setPassword] = useState(() => {
    return localStorage.getItem('thodambila-admin-password') || localStorage.getItem('thodambila-admin-passcode') || '1980';
  });

  const [page, setPage] = useState('news'); const [selectedOrg, setSelectedOrg] = useState('all'); const [sidebar, setSidebar] = useState(false); const [search, setSearch] = useState(''); const [category, setCategory] = useState('All');
  const [news, setNews] = useState(() => lsGet('thodambila-admin-news', null) || seedNews);
  const [priest, setPriest] = useState(() => lsGet('thodambila-admin-priest', null) || leadership.parishPriest);
  const [orgs, setOrgs] = useState(() => lsGet('thodambila-admin-organizations', null) || ministries);
  const [settings, setSettings] = useState(() => lsGet('thodambila-admin-settings', null) || defaultSiteSettings);
  const [modal, setModal] = useState(null); const [message, setMessage] = useState('');
  const [editable, setEditable] = useState(() => lsGet('thodambila-admin-sections', {}));
  const toastTimer = useRef(null);
  const filtered = useMemo(() => news.filter((n) => (category === 'All' || n.category === category) && `${n.title} ${n.category} ${n.content || ''}`.toLowerCase().includes(search.toLowerCase())), [news, category, search]);
  const toast = (text) => { if (toastTimer.current) clearTimeout(toastTimer.current); setMessage(text); toastTimer.current = setTimeout(() => setMessage(''), 2600); };
  const navigate = (next, orgId = 'all') => { setPage(next); setSelectedOrg(orgId); setSidebar(false); };

  const handleLogin = (remember) => {
    if (remember) {
      localStorage.setItem('thodambila-admin-auth', 'true');
    } else {
      sessionStorage.setItem('thodambila-admin-auth', 'true');
    }
    setAuth(true);
    toast('Welcome to Sacred Heart Church Admin Panel.');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('thodambila-admin-auth');
    localStorage.removeItem('thodambila-admin-auth');
    setAuth(false);
  };

  const handleUpdatePassword = (newPass) => {
    setPassword(newPass);
    localStorage.setItem('thodambila-admin-password', newPass);
    toast('Security password updated successfully.');
  };

  const saveNews = (article) => {
    const formattedDate = article.date
      ? new Date(`${article.date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
      : article.displayDate || '';
    const updated = {
      ...article,
      displayDate: formattedDate,
      image: article.image || `${base}images/hero-community.jpg`
    };
    const result = article.id
      ? news.map((n) => (n.id === article.id ? updated : n))
      : [{ ...updated, id: Date.now() }, ...news];
    setNews(result);
    localStorage.setItem('thodambila-admin-news', JSON.stringify(result));
    setModal(null);
    toast('News content saved and published.');
  };
  const remove = (id) => { const result = news.filter((n) => n.id !== id); setNews(result); localStorage.setItem('thodambila-admin-news', JSON.stringify(result)); toast('News item removed.'); };
  const savePriest = (result) => { setPriest(result); localStorage.setItem('thodambila-admin-priest', JSON.stringify(result)); toast('Parish priest details saved and synchronized.'); };
  const [resetKey, setResetKey] = useState(0);
  const saveOrganizations = (result) => { setOrgs(result); localStorage.setItem('thodambila-admin-organizations', JSON.stringify(result)); toast('Organization details saved successfully.'); };
  const saveSettings = (result) => { setSettings(result); localStorage.setItem('thodambila-admin-settings', JSON.stringify(result)); toast('Site settings saved successfully.'); };
  const saveSection = (key, value) => { const result = { ...editable, [key]: value }; setEditable(result); localStorage.setItem('thodambila-admin-sections', JSON.stringify(result)); toast(`${pages[key]?.[0] || key} saved successfully.`); };
  const defaults = { events: seedEvents, newsletter: seedNewsletters, wards: seedWards, history: seedHistory, council: leadership.parishCouncil, messages: [{ id: 1, title: 'Parish Priest Welcome Message', content: priest.message || priest.shortMessage || '' }], office: [{ id: 1, title: 'Parish Office', content: 'Sacred Heart of Jesus Church, Thodambila' }], obituary: [] };

  if (!auth) {
    return <AdminLoginPage password={password} onLogin={handleLogin} />;
  }

  return <div className="loreto-admin"><aside className={`loreto-sidebar ${sidebar ? 'open' : ''}`}><div className="loreto-brand"><img src={`${base}favicon.png`} alt="" /><div><strong>Sacred Heart of<br />Jesus Church</strong><span>ADMIN DASHBOARD</span></div><button onClick={() => setSidebar(false)}><X size={20} /></button></div><div className="loreto-side-scroll"><Sidebar page={page} navigate={navigate} selectedOrg={selectedOrg} orgs={orgs} /></div></aside>{sidebar && <button className="loreto-scrim" onClick={() => setSidebar(false)} aria-label="Close admin menu" />}<main className="loreto-main"><header className="loreto-header"><button className="loreto-menu" onClick={() => setSidebar(true)}><Menu size={23} /></button><h1>{pages[page]?.[0] || page}</h1><div className="loreto-header-actions"><button className="loreto-publish-btn" onClick={() => toast('All saved changes are now published.')}><CloudUpload size={17} /><span>Publish Content</span></button><button className="loreto-header-icon-btn" onClick={() => setModal({ type: 'password' })} title="Change Security Password"><KeyRound size={17} /></button><button className="loreto-header-icon-btn" onClick={() => { localStorage.removeItem('thodambila-admin-news'); localStorage.removeItem('thodambila-admin-priest'); localStorage.removeItem('thodambila-admin-sections'); localStorage.removeItem('thodambila-admin-organizations'); localStorage.removeItem('thodambila-admin-settings'); localStorage.removeItem('thodambila-admin-mass'); setNews(seedNews); setPriest(leadership.parishPriest); setOrgs(ministries); setSettings(defaultSiteSettings); setEditable({}); setResetKey((k) => k + 1); toast('Local admin changes reset.'); }} title="Reset Defaults"><RotateCcw size={17} /></button><button className="loreto-header-icon-btn" onClick={handleLogout} title="Log Out of Admin"><LogOut size={17} /></button><span className="loreto-active"><ShieldCheck size={16} /><span>Admin Active</span></span></div></header><section className="loreto-workspace">{page === 'settings' && <SiteSettings key={resetKey} settings={settings} save={saveSettings} />}{page === 'news' && <News news={filtered} category={category} setCategory={setCategory} search={search} setSearch={setSearch} add={() => setModal({ type: 'news' })} edit={(item) => setModal({ type: 'news', item })} remove={remove} />}{page === 'priest' && <Priest key={resetKey} priest={priest} save={savePriest} />}{page === 'messages' && <PriestMessages key={resetKey} items={editable.messages || defaults.messages} save={(items) => saveSection('messages', items)} />}{page === 'council' && <CouncilManager key={resetKey} items={editable.council || defaults.council} save={(items) => saveSection('council', items)} />}{page === 'office' && <OfficeManager key={resetKey} items={editable.office || defaults.office} save={(items) => saveSection('office', items)} />}{page === 'mass' && <Mass key={resetKey} save={(items) => saveSection('mass', items)} />}{page === 'events' && <EventsManager key={resetKey} items={editable.events || defaults.events} save={(items) => saveSection('events', items)} />}{page === 'newsletter' && <NewsletterManager key={resetKey} items={editable.newsletter || defaults.newsletter} save={(items) => saveSection('newsletter', items)} />}{page === 'obituary' && <ObituaryManager key={resetKey} items={editable.obituary || defaults.obituary} save={(items) => saveSection('obituary', items)} />}{page === 'organizations' && <Organizations key={resetKey} items={orgs} save={saveOrganizations} selectedOrg={selectedOrg} setSelectedOrg={setSelectedOrg} />}{page === 'gallery' && <GalleryManager />}{page === 'wards' && <WardsManager key={resetKey} items={editable.wards || defaults.wards} save={(items) => saveSection('wards', items)} />}{page === 'history' && <HistoryManager key={resetKey} items={editable.history || defaults.history} save={(items) => saveSection('history', items)} />}</section></main>{modal?.type === 'news' && <NewsModal item={modal.item} save={saveNews} close={() => setModal(null)} />}{modal?.type === 'password' && <ChangePasswordModal currentPassword={password} onSave={handleUpdatePassword} close={() => setModal(null)} />}{message && <div className="loreto-toast">{message}</div>}</div>;
}


function Sidebar({ page, navigate, selectedOrg, orgs }) {
  const [open, setOpen] = useState('parish');
  const orgList = orgs || ministries;
  const isOrgActive = (orgId) => {
    if (page !== 'organizations') return false;
    if (orgId === 'all') return selectedOrg === 'all';
    return isOrgMatch({ id: orgId, slug: orgId, shortName: orgId }, selectedOrg);
  };
  const group = (id, label, Icon, links) => <div className="loreto-nav-group"><button className={`loreto-nav-parent ${links.some(([key, , orgId]) => key === page || (id === 'orgs' && page === 'organizations')) ? 'selected' : ''}`} onClick={() => setOpen(open === id ? '' : id)}><Icon size={19} />{label}<ChevronDown size={15} className={open === id ? 'up' : ''} /></button>{open === id && <div className="loreto-nav-children">{links.map(([key, text, orgId]) => { const isActive = id === 'orgs' ? isOrgActive(orgId || key) : page === key; return <button className={isActive ? 'active' : ''} onClick={() => id === 'orgs' ? navigate('organizations', orgId || key) : navigate(key)} key={`${key}-${text}`}>{text}</button>; })}</div>}</div>;
  const orgLinks = [['organizations', 'All Organizations Overview', 'all'], ...orgList.map((org) => ['organizations', org.shortName || org.name, String(org.id)])];
  return <nav className="loreto-nav"><p className="loreto-nav-label">MANAGEMENT PAGES</p><button className={`loreto-nav-single ${page === 'settings' ? 'active' : ''}`} onClick={() => navigate('settings')}><Settings size={19} />Site Settings</button>{group('parish', 'Parish Details (ಫಿರ್ಗಜ್)', FolderHeart, [['priest', 'Parish Priest & Assistant Priest'], ['messages', 'Priest Messages'], ['council', 'Parish Council'], ['office', 'Parish Office'], ['mass', 'Mass Timings']])}{group('media', 'Media & News (ಮಾಧ್ಯಮ್)', BellRing, [['events', 'Upcoming Events (ಕಾರ್ಯಕ್ರಮ್)'], ['news', 'Parish News & Notices (ಖಬ್ರೊ)'], ['newsletter', 'Parish Newsletter (ಪತ್ರಾಂ)'], ['gallery', 'Photo Gallery'], ['obituary', 'Obituaries (ಮರಣಾಂ)']])}{group('orgs', 'Parish Organizations (ಸಂಘಟನಾಂ)', LayoutGrid, orgLinks)}<button className={`loreto-nav-single ${page === 'wards' ? 'active' : ''}`} onClick={() => navigate('wards')}><UsersRound size={19} />Parish Wards (ವಾಡೆ)</button><button className={`loreto-nav-single ${page === 'history' ? 'active' : ''}`} onClick={() => navigate('history')}><FileText size={19} />Church History</button><div className="loreto-nav-footer"><Link to="/" className="loreto-nav-exit"><LogOut size={18} /><span>Exit Admin & Back to Site</span></Link></div></nav>;
}
function SiteSettings({ settings, save }) { const [form, setForm] = useState(settings); const set = (key, value) => setForm({ ...form, [key]: value }); const setTab = (name) => set('tabs', { ...form.tabs, [name]: !form.tabs[name] }); const setSlide = (index, key, value) => set('slides', form.slides.map((slide, current) => current === index ? { ...slide, [key]: value } : slide)); const addSlide = () => set('slides', [...form.slides, { id: Date.now(), label: `Hero Slide ${form.slides.length + 1}`, image: `${base}images/hero-community.jpg`, eyebrow: '', title: '', subtitle: '' }]); const removeSlide = (index) => set('slides', form.slides.filter((_, current) => current !== index)); return <form className="loreto-card loreto-site-settings" onSubmit={(e) => { e.preventDefault(); save(form); }}><div className="loreto-section-head"><div><h2>Site Settings</h2><p>Manage public church details, navigation, and homepage hero slides. Changes are saved to the admin content store.</p></div><button className="loreto-primary" type="submit">Save Site Settings</button></div><div className="loreto-settings-fields"><Field label="Church name" value={form.churchName} change={(value) => set('churchName', value)} /><Field label="Location line" value={form.location} change={(value) => set('location', value)} /><Field label="Parish office phone" value={form.officePhone} change={(value) => set('officePhone', value)} /></div><section className="loreto-settings-section"><h2>Public Navbar Tabs</h2><p>Pause a tab to hide it from public desktop and mobile navigation. Its page route remains available.</p><div className="loreto-tab-toggles">{Object.entries(form.tabs).map(([name, shown]) => <label className={!shown ? 'paused' : ''} key={name}><input type="checkbox" checked={shown} onChange={() => setTab(name)} /><strong>{name}</strong><span>{shown ? 'Shown' : 'Paused'}</span></label>)}</div></section><section className="loreto-settings-section"><div className="loreto-section-head"><div><h2>Homepage Hero Slides</h2><p>Set the image and text displayed over each homepage slide.</p></div><button className="loreto-primary" type="button" onClick={addSlide}><Plus size={16} />Add Slide</button></div><div className="loreto-slide-editors">{form.slides.map((slide, index) => <article key={slide.id}><div className="loreto-slide-preview" style={{ backgroundImage: `url(${slide.image})` }} /><div><h3>{slide.label || `Hero Slide ${index + 1}`}</h3><Field label="Image URL" value={slide.image} change={(value) => setSlide(index, 'image', value)} /><Field label="Eyebrow" value={slide.eyebrow} change={(value) => setSlide(index, 'eyebrow', value)} /><Field label="Heading" value={slide.title} change={(value) => setSlide(index, 'title', value)} /><label className="loreto-field">Subtitle<textarea value={slide.subtitle} onChange={(e) => setSlide(index, 'subtitle', e.target.value)} /></label><button className="loreto-text-delete" type="button" onClick={() => removeSlide(index)}><Trash2 size={15} />Remove slide</button></div></article>)}</div></section><footer className="loreto-settings-footer"><button className="loreto-primary" type="submit">Save Site Settings</button></footer></form>; }
function News({ news, category, setCategory, search, setSearch, add, edit, remove }) { return <div className="loreto-card"><div className="loreto-section-head"><div><h2>Parish News & Announcements</h2><p>Publish and edit news articles, feast notices, pastoral messages, and parish bulletins.</p></div><button className="loreto-primary" onClick={add}><Plus size={18} />Add News Article</button></div><div className="loreto-filter-row"><label><Search size={20} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search news by title, category, or content..." /></label><div className="loreto-chips">{categories.map((item) => <button className={category === item ? 'active' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div></div><div className="loreto-news-grid">{news.map((item) => <article className="loreto-news-card" key={item.id}><div className="loreto-news-image"><img src={item.image} alt="" /><span>{item.category}</span></div><div className="loreto-news-body"><p className="loreto-date"><CalendarDays size={15} />{item.displayDate}</p><h3>{item.title}</h3><p className="loreto-excerpt">{item.excerpt || item.content}</p><div className="loreto-card-actions"><button onClick={() => edit(item)}><Edit3 size={16} />Edit</button><button className="delete" onClick={() => remove(item.id)} aria-label="Delete news"><Trash2 size={17} /></button></div></div></article>)}</div>{!news.length && <div className="loreto-empty">No news matches this search.</div>}</div>; }
function Priest({ priest, save }) {
  const [form, setForm] = useState(priest || leadership.parishPriest);
  const [assistantForm, setAssistantForm] = useState(priest?.assistant || leadership.assistantPriest || {
    name: 'Rev. Fr. Assistant Priest',
    designation: 'Assistant Parish Priest',
    title: 'Fr.',
    phone: '',
    image: `${base}images/priest-portrait.png`,
    bio: ''
  });

  const setMain = (key, val) => setForm({ ...form, [key]: val });
  const setAssis = (key, val) => setAssistantForm({ ...assistantForm, [key]: val });

  const handleSaveAll = (e) => {
    e.preventDefault();
    save({
      ...form,
      assistant: assistantForm
    });
  };

  return (
    <div className="loreto-card loreto-priest">
      <div className="loreto-section-head">
        <div>
          <h2>Parish Clergy & Leadership Details</h2>
          <p>Update the Parish Priest and Assistant Priest details inline. All changes synchronize across the public website.</p>
        </div>
      </div>

      <div className="loreto-sync">
        <RotateCcw size={25} />
        <div>
          <strong>Global Synchronization Enabled</strong>
          <p>Updating clergy profiles automatically updates the Parish Priest page, leadership cards, welcome messages, and contacts.</p>
        </div>
      </div>

      <form onSubmit={handleSaveAll}>
        <div style={{ background: '#fffdf9', border: '1px solid var(--line)', borderRadius: '10px', padding: '22px', marginBottom: '25px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--wine)', fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UsersRound size={19} />Parish Priest Details
          </h3>
          <div className="loreto-priest-layout">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div className="loreto-form-row">
                <Field label="Honorific / Designation" value={form.designation || ''} change={(v) => setMain('designation', v)} />
                <Field label="Official Title" value={form.title || ''} change={(v) => setMain('title', v)} />
              </div>
              <Field label="Parish Priest Full Name *" value={form.name || ''} change={(v) => setMain('name', v)} />
              <ImageInput label="Portrait image" value={form.image || ''} change={(v) => setMain('image', v)} />
              <label className="loreto-field">Welcome Message / Pastoral Note
                <textarea value={form.shortMessage || form.message || ''} onChange={(e) => setMain('shortMessage', e.target.value)} rows={3} />
              </label>
            </div>
            <aside className="loreto-live-preview">
              <p>PARISH PRIEST PREVIEW</p>
              <img src={form.image || `${base}images/priest-portrait.png`} alt="Priest preview" />
              <span>✣ {form.title || 'Fr.'}</span>
              <h3>{form.designation} {form.name}</h3>
              <small>Sacred Heart of Jesus Church, Thodambila</small>
            </aside>
          </div>
        </div>

        <div style={{ background: '#fffdf9', border: '1px solid var(--line)', borderRadius: '10px', padding: '22px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--wine)', fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UsersRound size={19} />Assistant Parish Priest / Clergy Details
          </h3>
          <div className="loreto-priest-layout">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div className="loreto-form-row">
                <Field label="Designation / Role" value={assistantForm.designation || ''} change={(v) => setAssis('designation', v)} />
                <Field label="Official Title" value={assistantForm.title || ''} change={(v) => setAssis('title', v)} />
              </div>
              <Field label="Assistant Priest Full Name" value={assistantForm.name || ''} change={(v) => setAssis('name', v)} />
              <ImageInput label="Portrait Image" value={assistantForm.image || ''} change={(v) => setAssis('image', v)} />
              <Field label="Contact Phone / Email" value={assistantForm.phone || ''} change={(v) => setAssis('phone', v)} />
            </div>
            <aside className="loreto-live-preview">
              <p>ASSISTANT PRIEST PREVIEW</p>
              <img src={assistantForm.image || `${base}images/priest-portrait.png`} alt="Assistant priest preview" />
              <span>✣ {assistantForm.title || 'Fr.'}</span>
              <h3>{assistantForm.designation} {assistantForm.name}</h3>
              <small>Sacred Heart of Jesus Church, Thodambila</small>
            </aside>
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="loreto-primary loreto-save" type="submit" style={{ padding: '12px 24px' }}>
            <Save size={18} />Save Clergy Details & Sync Everywhere
          </button>
        </div>
      </form>
    </div>
  );
}
function Field({ label, value, change, type = 'text', required = false, placeholder = '' }) { return <label className="loreto-field">{label}<input type={type} required={required} placeholder={placeholder} value={value || ''} onChange={(e) => change(e.target.value)} /></label>; }
function ImageInput({ label = 'Image', value, change }) { const pick = (event) => { const file = event.target.files?.[0]; if (!file) return; if (!file.type.startsWith('image/')) return; const reader = new FileReader(); reader.onload = () => change(reader.result); reader.readAsDataURL(file); }; return <div className="loreto-image-input"><label className="loreto-field">{label} URL<input value={value || ''} onChange={(e) => change(e.target.value)} placeholder="Paste an image URL" /></label><label className="loreto-upload-button"><CloudUpload size={16} />Choose image<input type="file" accept="image/*" onChange={pick} /></label>{value && <img src={value} alt="Selected preview" />}</div>; }
function Organizations({ items, save, selectedOrg = 'all', setSelectedOrg }) {
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [pageHeader, setPageHeader] = useState(() => JSON.parse(localStorage.getItem('thodambila-orgs-page-header') || 'null') || {
    title: 'Parish Organizations & Associations',
    subtitle: 'Manage parish associations, their leaders, ministry details, and activity information.'
  });
  const [editingHeader, setEditingHeader] = useState(false);

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditingData({
      ...item,
      officeBearers: item.officeBearers ? item.officeBearers.map(b => ({ ...b })) : []
    });
  };

  const startNew = () => {
    const newOrg = {
      id: Date.now(),
      name: '',
      shortName: '',
      konkaniName: '',
      category: 'Parish Associations',
      image: `${base}images/hero-community.jpg`,
      officeBearers: []
    };
    setEditingId('new');
    setEditingData(newOrg);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingData(null);
  };

  const handleSave = (record) => {
    const formatted = {
      ...record,
      officeBearers: record.officeBearers || []
    };
    const next = items.some((item) => item.id === record.id)
      ? items.map((item) => item.id === record.id ? formatted : item)
      : [formatted, ...items];
    save(next);
    setEditingId(null);
    setEditingData(null);
  };

  const remove = (id) => save(items.filter((item) => item.id !== id));
  const saveHeader = (newHeader) => {
    setPageHeader(newHeader);
    localStorage.setItem('thodambila-orgs-page-header', JSON.stringify(newHeader));
    setEditingHeader(false);
  };

  const handleSelectOrg = (orgId) => {
    setSelectedOrg(orgId);
    setEditingId(null);
    setEditingData(null);
  };

  const displayedItems = selectedOrg === 'all'
    ? items
    : items.filter((item) => isOrgMatch(item, selectedOrg));

  return (
    <>
      <div className="loreto-section-head" style={{ marginBottom: '20px' }}>
        <div>
          {editingHeader ? (
            <div style={{ display: 'grid', gap: '10px', maxWidth: '600px' }}>
              <input
                style={{ fontSize: '22px', fontWeight: 'bold', border: '1px solid var(--line)', padding: '6px 12px', borderRadius: '6px', color: 'var(--wine)' }}
                value={pageHeader.title}
                onChange={(e) => setPageHeader({ ...pageHeader, title: e.target.value })}
              />
              <textarea
                style={{ fontSize: '14px', border: '1px solid var(--line)', padding: '6px 12px', borderRadius: '6px' }}
                value={pageHeader.subtitle}
                onChange={(e) => setPageHeader({ ...pageHeader, subtitle: e.target.value })}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="loreto-primary" type="button" style={{ padding: '6px 14px', fontSize: '12px' }} onClick={() => saveHeader(pageHeader)}>Save Header</button>
                <button type="button" style={{ padding: '6px 14px', fontSize: '12px', border: '1px solid var(--line)', borderRadius: '6px', background: '#fff' }} onClick={() => setEditingHeader(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {pageHeader.title}
                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--wine)', opacity: 0.7 }} onClick={() => setEditingHeader(true)} title="Edit page header inline">
                  <Edit3 size={16} />
                </button>
              </h2>
              <p>{pageHeader.subtitle}</p>
            </div>
          )}
        </div>
        <button className="loreto-primary" onClick={startNew}>
          <Plus size={18} />Add Organization
        </button>
      </div>

      <div className="loreto-chips" style={{ marginBottom: '25px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <button
          className={selectedOrg === 'all' ? 'active' : ''}
          onClick={() => handleSelectOrg('all')}
        >
          All Organizations ({items.length})
        </button>
        {items.map((org) => {
          const isActive = selectedOrg !== 'all' && isOrgMatch(org, selectedOrg);
          return (
            <button
              className={isActive ? 'active' : ''}
              key={org.id || org.slug || org.name}
              onClick={() => handleSelectOrg(String(org.id))}
            >
              {org.shortName || org.name}
            </button>
          );
        })}
      </div>

      {editingId === 'new' && (
        <InlineOrgForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={cancelEdit} isNew={true} />
      )}

      <div className="loreto-org-grid">
        {displayedItems.map((item, i) => (
          <React.Fragment key={item.id || item.slug || i}>
            {editingId === item.id ? (
              <InlineOrgForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={cancelEdit} isNew={false} />
            ) : (
              <article className="loreto-org-card">
                <img src={item.image} alt="" />
                <div>
                  <h2>{item.name}</h2>
                  <b>{item.konkaniName}</b>
                  <div style={{ marginTop: '10px', fontSize: '13.5px', color: 'var(--wine)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <UsersRound size={16} />
                    <span>Office Bearers & Committee: {item.officeBearers?.length || 0} Members</span>
                  </div>
                  <div className="loreto-card-actions" style={{ marginTop: '14px' }}>
                    <button onClick={() => startEdit(item)}>
                      <Edit3 size={16} />Edit
                    </button>
                    <button className="delete" onClick={() => remove(item.id)}>
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </article>
            )}
          </React.Fragment>
        ))}
      </div>
      {!displayedItems.length && editingId !== 'new' && <div className="loreto-empty">No organization found matching this filter.</div>}
    </>
  );
}

function OfficeBearerModal({ bearer, onSave, onClose }) {
  const [data, setData] = useState(() => ({
    role: bearer?.role || 'President',
    konkaniRole: bearer?.konkaniRole || '',
    name: bearer?.name || '',
    photo: bearer?.photo || '',
    ward: bearer?.ward || '',
    phone: bearer?.phone || ''
  }));

  const set = (key, val) => setData((prev) => ({ ...prev, [key]: val }));

  const presets = [
    { role: 'Director', konkani: 'ಆತ್ಮಿಕ್ ದಿರೆಕ್ತೊರ್' },
    { role: 'Animator', konkani: 'ಸಂಚಾಲಕ್ / ಅನಿಮೇಟರ್' },
    { role: 'President', konkani: 'ಅಧ್ಯಕ್ಷ್' },
    { role: 'Vice President', konkani: 'ಉಪಾಧ್ಯಕ್ಷ್' },
    { role: 'Lady Vice President', konkani: 'ಸ್ತ್ರೀ ಉಪಾಧ್ಯಕ್ಷಿಣ್' },
    { role: 'Secretary', konkani: 'ಕಾರ್ಯದರ್ಶಿ / ಸಚಿವ್' },
    { role: 'Joint Secretary', konkani: 'ಸಹ ಸಚಿವ್' },
    { role: 'Treasurer', konkani: 'ಲೆಕ್ಕಾಧಿಕಾರಿ' }
  ];

  const applyPreset = (preset) => {
    setData((prev) => ({
      ...prev,
      role: preset.role,
      konkaniRole: preset.konkani
    }));
  };

  const handleSave = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!data.name.trim()) return;
    onSave(data);
  };

  return (
    <div
      className="loreto-modal-layer"
      style={{ zIndex: 1000, background: 'rgba(30, 10, 14, 0.65)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        className="loreto-modal"
        style={{ width: 'min(640px, 95vw)', maxHeight: '90vh', overflowY: 'auto', background: '#fffdf9', borderRadius: '14px', border: '1px solid var(--line)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid var(--line)', paddingBottom: '14px' }}>
          <div>
            <p style={{ color: 'var(--gold)', fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em', margin: '0 0 2px', textTransform: 'uppercase' }}>HUĐĐĒDĀR • MEMBER EDITOR</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--wine)', fontSize: '24px', margin: 0 }}>
              {bearer ? 'Edit Office Bearer' : 'Add New Office Bearer'}
            </h2>
          </div>
          <button type="button" onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--wine)', padding: '4px' }} title="Close dialog">
            <X size={24} />
          </button>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--wine)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Quick Role Presets
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {presets.map((p) => (
                <button
                  key={p.role}
                  type="button"
                  onClick={() => applyPreset(p)}
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    border: '1px solid var(--line)',
                    background: data.role === p.role ? 'var(--wine)' : '#fff',
                    color: data.role === p.role ? '#fff' : 'var(--wine)',
                    cursor: 'pointer'
                  }}
                >
                  {p.role}
                </button>
              ))}
            </div>
          </div>

          <div className="loreto-form-row">
            <Field label="Role (English) *" value={data.role} change={(v) => set('role', v)} required placeholder="e.g. Director, President, Secretary" />
            <Field label="Konkani Role Title" value={data.konkaniRole} change={(v) => set('konkaniRole', v)} placeholder="e.g. ಆತ್ಮಿಕ್ ದಿರೆಕ್ತೊರ್, ಅಧ್ಯಕ್ಷ್" />
          </div>

          <Field label="Full Name *" value={data.name} change={(v) => set('name', v)} required placeholder="e.g. Rev. Fr. James Dsouza" />

          <div style={{ background: '#fcf6ec', border: '1px solid var(--line)', padding: '16px', borderRadius: '10px' }}>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--wine)', marginBottom: '8px', textTransform: 'uppercase' }}>Member Photo (Upload File or Paste Image URL)</p>
            <ImageInput label="Photo" value={data.photo} change={(v) => set('photo', v)} />
          </div>

          <div className="loreto-form-row">
            <WardSelect label="Parish Ward (Optional)" value={data.ward} change={(v) => set('ward', v)} />
            <Field label="Contact Phone (Optional)" value={data.phone} change={(v) => set('phone', v)} placeholder="e.g. +91 94480 00020" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
            <button type="button" onClick={onClose} style={{ border: '1px solid var(--line)', background: '#fff', padding: '10px 20px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}>
              Cancel
            </button>
            <button className="loreto-primary" type="button" onClick={handleSave} style={{ padding: '10px 24px', fontSize: '14px' }}>
              <Save size={17} /> Save Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InlineOrgForm({ form, setForm, onSave, onCancel, isNew }) {
  const [modalBearerIndex, setModalBearerIndex] = useState(null);
  const [showBulkText, setShowBulkText] = useState(false);

  const bearers = form.officeBearers || [];

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSaveMember = (updatedMember) => {
    let nextList = [...bearers];
    if (modalBearerIndex === 'new') {
      nextList.push(updatedMember);
    } else if (typeof modalBearerIndex === 'number') {
      nextList[modalBearerIndex] = updatedMember;
    }
    set('officeBearers', nextList);
    setModalBearerIndex(null);
  };

  const handleRemoveMember = (index) => {
    const nextList = bearers.filter((_, idx) => idx !== index);
    set('officeBearers', nextList);
  };

  const handleBulkTextChange = (text) => {
    const parsed = text.split('\n').map((s) => s.trim()).filter(Boolean).map((line) => {
      const parts = line.split('|').map((s) => s.trim());
      const roleAndName = parts[0] || '';
      const colonIdx = roleAndName.indexOf(':');
      let role = 'Member';
      let name = roleAndName;
      if (colonIdx !== -1) {
        role = roleAndName.slice(0, colonIdx).trim();
        name = roleAndName.slice(colonIdx + 1).trim();
      }
      return {
        role,
        name,
        ward: parts[1] || '',
        phone: parts[2] || ''
      };
    });
    set('officeBearers', parsed);
  };

  return (
    <form className="loreto-inline-editor" onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
      <h3><Edit3 size={20} />{isNew ? 'Add New Organization' : `Edit ${form.name || 'Organization'}`}</h3>
      <div className="loreto-inline-editor-grid">
        <Field label="Organization Name *" value={form.name || ''} change={(v) => set('name', v)} required />
        <Field label="Konkani Name" value={form.konkaniName || ''} change={(v) => set('konkaniName', v)} />
        <Field label="Short Name / Acronym" value={form.shortName || ''} change={(v) => set('shortName', v)} />
        <Field label="Category" value={form.category || ''} change={(v) => set('category', v)} />
        <div className="full-width">
          <ImageInput label="Organization Image" value={form.image || ''} change={(v) => set('image', v)} />
        </div>

        <div className="full-width" style={{ background: '#fbf8f3', border: '1px solid var(--line)', padding: '24px', borderRadius: '12px', marginTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--wine)', fontSize: '20px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UsersRound size={20} />
                <span>ಹುದ್ದೇದಾರ್ • Office Bearers & Committee ({bearers.length})</span>
              </h4>
              <p style={{ fontSize: '13px', color: '#685954', margin: '4px 0 0' }}>
                Manage executive leadership cards, photos, roles, wards, and contact info.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setShowBulkText(!showBulkText)}
                style={{ border: '1px solid var(--line)', background: '#fff', padding: '8px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: 'var(--wine)', cursor: 'pointer' }}
              >
                {showBulkText ? 'Card Grid View' : 'Bulk Text Mode'}
              </button>
              <button
                type="button"
                className="loreto-primary"
                onClick={() => setModalBearerIndex('new')}
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                <Plus size={16} /> Add Office Bearer
              </button>
            </div>
          </div>

          {showBulkText ? (
            <label className="loreto-field" style={{ margin: 0 }}>
              <span style={{ fontSize: '12px', color: '#666', textTransform: 'none', display: 'block', marginBottom: '6px' }}>
                Format per line: <code>Role: Name | Ward | Phone</code>
              </span>
              <textarea
                value={form.officeBearers ? form.officeBearers.map(b => `${b.role || 'Member'}: ${b.name || ''}${b.ward ? ' | ' + b.ward : ''}${b.phone ? ' | ' + b.phone : ''}`).join('\n') : ''}
                onChange={(e) => handleBulkTextChange(e.target.value)}
                rows={8}
                style={{ fontFamily: 'monospace', fontSize: '13px' }}
              />
            </label>
          ) : (
            <div className="loreto-bearer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {bearers.map((bearer, idx) => {
                const roleUpper = (bearer.role || 'MEMBER').toUpperCase();
                const konkaniRoleText = bearer.konkaniRole ? `(${bearer.konkaniRole})` : '';
                return (
                  <div
                    key={idx}
                    style={{
                      background: '#f3eee6',
                      border: '1px solid #e5dcd0',
                      borderRadius: '12px',
                      padding: '18px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justify: 'space-between',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                    }}
                  >
                    <div>
                      <div style={{ color: '#b38634', fontSize: '12px', fontWeight: '800', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '8px' }}>
                        {roleUpper} {konkaniRoleText}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                        {bearer.photo ? (
                          <img
                            src={bearer.photo}
                            alt={bearer.name}
                            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #d4aa59', flexShrink: 0 }}
                          />
                        ) : null}
                        <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--wine)', fontSize: '19px', fontWeight: '700', margin: 0, lineHeight: '1.25' }}>
                          {bearer.name}
                        </h4>
                      </div>

                      {bearer.ward && (
                        <div style={{ fontSize: '13px', color: '#5b4e4a', marginBottom: '4px' }}>
                          <strong>Ward:</strong> {bearer.ward}
                        </div>
                      )}
                      {bearer.phone && (
                        <div style={{ fontSize: '13px', color: '#5b4e4a', marginBottom: '4px' }}>
                          <strong>Phone:</strong> {bearer.phone}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '18px', width: '100%', alignItems: 'center' }}>
                      <button
                        type="button"
                        className="loreto-bearer-edit-btn"
                        onClick={() => setModalBearerIndex(idx)}
                      >
                        <Edit3 size={16} /> Edit
                      </button>
                      <button
                        type="button"
                        className="loreto-bearer-delete-btn"
                        onClick={() => handleRemoveMember(idx)}
                        title="Delete Office Bearer"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {!bearers.length && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '30px 15px', color: '#7a6a64', background: '#ffffff', border: '1px dashed #d5c8b5', borderRadius: '10px' }}>
                  <UsersRound size={32} style={{ color: 'var(--gold)', marginBottom: '8px' }} />
                  <p style={{ margin: '0 0 10px', fontWeight: 'bold' }}>No office bearers added yet.</p>
                  <button
                    type="button"
                    className="loreto-primary"
                    onClick={() => setModalBearerIndex('new')}
                    style={{ fontSize: '13px', padding: '8px 16px' }}
                  >
                    <Plus size={15} /> Add First Office Bearer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="loreto-inline-editor-actions">
        <button type="button" onClick={onCancel} style={{ border: '1px solid var(--line)', background: '#fff', borderRadius: '7px', padding: '10px 18px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
        <button className="loreto-primary" type="submit">Save Organization</button>
      </div>

      {modalBearerIndex !== null && (
        <OfficeBearerModal
          key={modalBearerIndex}
          bearer={typeof modalBearerIndex === 'number' ? bearers[modalBearerIndex] : null}
          onSave={handleSaveMember}
          onClose={() => setModalBearerIndex(null)}
        />
      )}
    </form>
  );
}
function Mass({ items = weeklyMassSchedule, save }) {
  const [schedule, setSchedule] = useState(() => {
    const stored = localStorage.getItem('thodambila-admin-mass');
    return stored ? JSON.parse(stored) : (items || weeklyMassSchedule);
  });
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const persist = (next) => {
    setSchedule(next);
    localStorage.setItem('thodambila-admin-mass', JSON.stringify(next));
    if (save) save(next);
  };

  const startEdit = (item) => {
    setEditingId(item.id || item.day);
    setEditingData({ ...item });
  };

  const startNew = () => {
    setEditingId('new');
    setEditingData({
      id: Date.now(),
      day: '',
      time: '',
      language: 'Konkani',
      note: ''
    });
  };

  const handleSave = (record) => {
    const next = schedule.some((entry) => entry.id === record.id)
      ? schedule.map((entry) => entry.id === record.id ? record : entry)
      : [...schedule, record];
    persist(next);
    setEditingId(null);
    setEditingData(null);
  };

  const remove = (target) => {
    const next = schedule.filter((entry) => entry.id !== target.id);
    persist(next);
  };

  return (
    <div className="loreto-card">
      <div className="loreto-section-head">
        <div>
          <h2>Weekly Mass Schedule & Liturgical Timings</h2>
          <p>Add, update, or remove weekday, Sunday, and special Mass schedules inline.</p>
        </div>
        <button className="loreto-primary" onClick={startNew}>
          <Plus size={18} />Add Mass Timing
        </button>
      </div>

      {editingId === 'new' && (
        <InlineMassForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={() => setEditingId(null)} isNew={true} />
      )}

      <div className="loreto-mass-list" style={{ marginTop: '20px' }}>
        {schedule.map((item, index) => (
          <React.Fragment key={item.id || item.day || index}>
            {editingId === (item.id || item.day) ? (
              <InlineMassForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={() => setEditingId(null)} isNew={false} />
            ) : (
              <div className="loreto-mass-item">
                <span><Clock3 size={18} />{item.day}</span>
                <strong>{item.time}</strong>
                <p>{item.note || (item.language ? `(${item.language})` : 'Regular weekday Mass')}</p>
                <div className="loreto-card-actions" style={{ padding: 0, margin: 0, justifyContent: 'flex-end' }}>
                  <button onClick={() => startEdit(item)}><Edit3 size={16} />Edit</button>
                  <button className="delete" onClick={() => remove(item)}><Trash2 size={17} /></button>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {!schedule.length && editingId !== 'new' && <div className="loreto-empty">No Mass timings found. Click "Add Mass Timing" to create one.</div>}
    </div>
  );
}

function InlineMassForm({ form, setForm, onSave, onCancel, isNew }) {
  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));
  return (
    <form className="loreto-inline-editor" style={{ margin: '15px 0' }} onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
      <h3><Clock3 size={20} />{isNew ? 'Add Mass Schedule' : `Edit Mass (${form.day || 'Schedule'})`}</h3>
      <div className="loreto-inline-editor-grid">
        <Field label="Day / Occasion * (e.g. Sunday, Weekdays, First Friday)" value={form.day || ''} change={(v) => set('day', v)} />
        <Field label="Mass Time * (e.g. 7:00 AM, 5:30 PM)" value={form.time || ''} change={(v) => set('time', v)} />
        <Field label="Language / Rite (e.g. Konkani, English)" value={form.language || ''} change={(v) => set('language', v)} />
        <div className="full-width">
          <label className="loreto-field">Special Intentions / Notes
            <textarea value={form.note || ''} onChange={(e) => set('note', e.target.value)} rows={2} placeholder="e.g. Followed by Eucharistic Adoration" />
          </label>
        </div>
      </div>
      <div className="loreto-inline-editor-actions">
        <button type="button" onClick={onCancel} style={{ border: '1px solid var(--line)', background: '#fff', borderRadius: '7px', padding: '10px 18px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
        <button className="loreto-primary" type="submit">Save Mass Schedule</button>
      </div>
    </form>
  );
}

function PriestMessages({ items, save }) {
  const [records, setRecords] = useState(items || []);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditingData({ ...item });
  };

  const startNew = () => {
    setEditingId('new');
    setEditingData({
      id: Date.now(),
      title: '',
      author: 'Parish Priest',
      date: new Date().toISOString().slice(0, 10),
      shortMessage: '',
      content: '',
      image: ''
    });
  };

  const handleSave = (record) => {
    const next = records.some((r) => r.id === record.id)
      ? records.map((r) => r.id === record.id ? record : r)
      : [record, ...records];
    setRecords(next);
    save(next);
    setEditingId(null);
    setEditingData(null);
  };

  const remove = (id) => {
    const next = records.filter((r) => r.id !== id);
    setRecords(next);
    save(next);
  };

  return (
    <div className="loreto-card">
      <div className="loreto-section-head">
        <div>
          <h2>Priest Pastoral Messages</h2>
          <p>Publish and edit pastoral letters, feast day greetings, and parish messages inline.</p>
        </div>
        <button className="loreto-primary" onClick={startNew}>
          <Plus size={18} />Add Pastoral Message
        </button>
      </div>

      {editingId === 'new' && (
        <InlineMessageForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={() => setEditingId(null)} isNew={true} />
      )}

      <div className="loreto-manage-list">
        {records.map((item) => (
          <React.Fragment key={item.id}>
            {editingId === item.id ? (
              <InlineMessageForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={() => setEditingId(null)} isNew={false} />
            ) : (
              <article>
                <div>
                  {item.image && <img src={item.image} alt="" />}
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.shortMessage || item.content || item.message || ''}</p>
                    <small style={{ color: 'var(--gold)', fontWeight: 'bold' }}>{item.author || 'Parish Priest'} {item.date ? `· ${item.date}` : ''}</small>
                  </div>
                </div>
                <div className="loreto-card-actions">
                  <button onClick={() => startEdit(item)}><Edit3 size={16} />Edit</button>
                  <button className="delete" onClick={() => remove(item.id)}><Trash2 size={17} /></button>
                </div>
              </article>
            )}
          </React.Fragment>
        ))}
      </div>
      {!records.length && editingId !== 'new' && <div className="loreto-empty">No pastoral messages found. Click "Add Pastoral Message" to publish one.</div>}
    </div>
  );
}

function InlineMessageForm({ form, setForm, onSave, onCancel, isNew }) {
  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));
  return (
    <form className="loreto-inline-editor" onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
      <h3><Edit3 size={20} />{isNew ? 'Add Pastoral Message' : `Edit Message "${form.title}"`}</h3>
      <div className="loreto-inline-editor-grid">
        <Field label="Message Title *" value={form.title || ''} change={(v) => set('title', v)} />
        <Field label="Author / Priest Name" value={form.author || 'Parish Priest'} change={(v) => set('author', v)} />
        <div className="full-width">
          <ImageInput label="Message Banner / Photo" value={form.image || ''} change={(v) => set('image', v)} />
        </div>
        <div className="full-width">
          <label className="loreto-field">Short Summary / Excerpt
            <textarea value={form.shortMessage || form.excerpt || ''} onChange={(e) => set('shortMessage', e.target.value)} rows={2} />
          </label>
        </div>
        <div className="full-width">
          <label className="loreto-field">Full Message Content *
            <textarea required value={form.content || form.message || ''} onChange={(e) => set('content', e.target.value)} rows={5} />
          </label>
        </div>
      </div>
      <div className="loreto-inline-editor-actions">
        <button type="button" onClick={onCancel} style={{ border: '1px solid var(--line)', background: '#fff', borderRadius: '7px', padding: '10px 18px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
        <button className="loreto-primary" type="submit">Save Pastoral Message</button>
      </div>
    </form>
  );
}

function OfficeManager({ items, save }) {
  const defaultOffice = items?.[0] || {
    id: 1,
    title: 'Sacred Heart of Jesus Church Office',
    address: 'Thodambila, Bantwal, Karnataka - 574219',
    phone: '+91 824 234 5678',
    email: 'office@thodambilachurch.org',
    hours: 'Monday – Saturday: 9:00 AM – 5:00 PM\nSunday: 8:00 AM – 1:00 PM',
    secretary: 'Parish Office Staff',
    notes: 'For certificates, Mass intentions, and general inquiries, visit during office hours.'
  };

  const [form, setForm] = useState(defaultOffice);

  const handleSave = (e) => {
    e.preventDefault();
    save([form]);
  };

  return (
    <div className="loreto-card">
      <div className="loreto-section-head" style={{ marginBottom: '25px' }}>
        <div>
          <h2>Parish Office Details & Timings</h2>
          <p>Edit office location, official contact numbers, working hours, and inquiry guidelines inline.</p>
        </div>
      </div>

      <form className="loreto-inline-editor" style={{ margin: 0 }} onSubmit={handleSave}>
        <div className="loreto-inline-editor-grid">
          <Field label="Office Name / Title *" value={form.title || ''} change={(v) => setForm({ ...form, title: v })} />
          <Field label="Contact Phone Number(s) *" value={form.phone || ''} change={(v) => setForm({ ...form, phone: v })} />
          <Field label="Official Email Address" value={form.email || ''} change={(v) => setForm({ ...form, email: v })} />
          <Field label="Office Staff / Secretary" value={form.secretary || ''} change={(v) => setForm({ ...form, secretary: v })} />

          <div className="full-width">
            <label className="loreto-field">Parish Office Physical Address *
              <textarea value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={3} />
            </label>
          </div>

          <div className="full-width">
            <label className="loreto-field">Office Working Hours Schedule (One per line) *
              <textarea value={form.hours || ''} onChange={(e) => setForm({ ...form, hours: e.target.value })} rows={4} placeholder="e.g. Monday – Saturday: 9:00 AM – 5:00 PM&#10;Sunday: 8:00 AM – 1:00 PM" />
            </label>
          </div>

          <div className="full-width">
            <label className="loreto-field">Certificates & General Inquiry Notes
              <textarea value={form.notes || form.content || ''} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} />
            </label>
          </div>
        </div>

        <div className="loreto-inline-editor-actions">
          <button className="loreto-primary" type="submit">
            <Save size={18} />Save Office Details Inline
          </button>
        </div>
      </form>
    </div>
  );
}

function CouncilManager({ items, save }) {
  const [members, setMembers] = useState(items || []);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const startEdit = (member) => {
    setEditingId(member.id);
    setEditingData({ ...member });
  };

  const startNew = () => {
    setEditingId('new');
    setEditingData({
      id: Date.now(),
      name: '',
      position: '',
      ward: '',
      phone: '',
      image: `${base}images/priest-portrait.png`
    });
  };

  const handleSave = (record) => {
    const next = members.some((m) => m.id === record.id)
      ? members.map((m) => m.id === record.id ? record : m)
      : [...members, record];
    setMembers(next);
    save(next);
    setEditingId(null);
    setEditingData(null);
  };

  const remove = (id) => {
    const next = members.filter((m) => m.id !== id);
    setMembers(next);
    save(next);
  };

  return (
    <div className="loreto-card loreto-council">
      <div className="loreto-section-head" style={{ marginBottom: '24px' }}>
        <div>
          <h2>Parish Council Office Bearers & Members (ಫಿರ್ಗಜ್ ಗೊವ್ಳಿಕ್ ಪರಿಷದ್)</h2>
          <p>Manage executive committee office bearers, ward representatives, and council members inline. Cards mirror public Honor Roll design.</p>
        </div>
        <button className="loreto-primary" onClick={startNew}>
          <Plus size={18} />Add Council Member
        </button>
      </div>

      {editingId === 'new' && (
        <InlineCouncilForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={() => setEditingId(null)} isNew={true} />
      )}

      <div
        className="loreto-council-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '24px',
          marginTop: '20px'
        }}
      >
        {members.map((member, i) => {
          const nameMatch = (member.name || '').match(/^(.*?)(?:\s*\((.*?)\))?$/);
          const engName = nameMatch ? nameMatch[1].trim() : member.name;
          const konkaniName = nameMatch && nameMatch[2] ? nameMatch[2].trim() : null;

          return (
            <React.Fragment key={member.id || i}>
              {editingId === member.id ? (
                <InlineCouncilForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={() => setEditingId(null)} isNew={false} />
              ) : (
                <article
                  style={{
                    background: '#fffdf9',
                    border: '2px solid #d0a047',
                    borderRadius: '16px',
                    padding: '24px 20px 20px',
                    textAlign: 'center',
                    boxShadow: '0 6px 20px rgba(123, 28, 42, 0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '5px',
                      background: 'linear-gradient(90deg, #d0a047 0%, #7b1c2a 50%, #d0a047 100%)'
                    }}
                  />

                  <div style={{ width: '100%' }}>
                    <div style={{ position: 'relative', margin: '4px auto 14px', width: '104px', height: '104px' }}>
                      <img
                        src={member.image || `${base}images/priest-portrait.png`}
                        alt={engName}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '3px solid #d0a047',
                          boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                          outline: '2px solid rgba(123, 28, 42, 0.25)',
                          outlineOffset: '2px'
                        }}
                      />
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: '#7b1c2a', margin: '0 0 4px', fontWeight: 700, lineHeight: 1.25 }}>
                      {engName}
                    </h3>

                    {konkaniName && (
                      <p style={{ fontSize: '13px', color: '#966d36', margin: '0 0 10px', fontWeight: 600 }}>
                        ({konkaniName})
                      </p>
                    )}

                    <div
                      style={{
                        marginTop: '10px',
                        background: '#fcf6ec',
                        border: '1px solid #d0a047',
                        color: '#7b1c2a',
                        borderRadius: '20px',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.03em',
                        textTransform: 'uppercase',
                        width: '100%',
                        boxSizing: 'border-box',
                        boxShadow: 'inset 0 1px 2px rgba(208, 160, 71, 0.15)'
                      }}
                    >
                      {member.position || 'Council Member'}
                    </div>

                    {member.ward && (
                      <p style={{ fontSize: '12px', color: '#685954', margin: '8px 0 0', fontWeight: '600' }}>
                        <strong>Ward:</strong> {member.ward}
                      </p>
                    )}
                    {member.phone && (
                      <p style={{ fontSize: '12px', color: '#685954', margin: '2px 0 0' }}>
                        📞 {member.phone}
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '18px', width: '100%', alignItems: 'center' }}>
                    <button
                      type="button"
                      className="loreto-bearer-edit-btn"
                      onClick={() => startEdit(member)}
                    >
                      <Edit3 size={16} /> Edit
                    </button>
                    <button
                      type="button"
                      className="loreto-bearer-delete-btn"
                      onClick={() => remove(member.id)}
                      title="Remove Member"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              )}
            </React.Fragment>
          );
        })}
      </div>
      {!members.length && editingId !== 'new' && <div className="loreto-empty">No council members listed yet. Click "Add Council Member" to add one.</div>}
    </div>
  );
}

function InlineCouncilForm({ form, setForm, onSave, onCancel, isNew }) {
  const nameMatch = (form.name || '').match(/^(.*?)(?:\s*\((.*?)\))?$/);
  const [engName, setEngName] = useState(nameMatch ? nameMatch[1].trim() : (form.name || ''));
  const [konkaniTitle, setKonkaniTitle] = useState(nameMatch && nameMatch[2] ? nameMatch[2].trim() : '');

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalName = engName.trim() + (konkaniTitle.trim() ? ` (${konkaniTitle.trim()})` : '');
    onSave({
      ...form,
      name: finalName
    });
  };

  return (
    <form className="loreto-inline-editor" style={{ gridColumn: '1 / -1' }} onSubmit={handleSubmit}>
      <h3><Edit3 size={20} />{isNew ? 'Add Council Member' : `Edit ${engName || 'Member'}`}</h3>
      <div className="loreto-inline-editor-grid">
        <Field label="Member Full Name (English) *" value={engName} change={setEngName} required placeholder="e.g. Rev. Fr. Paul Dsouza" />
        <Field label="Konkani Subtitle / Title (Optional)" value={konkaniTitle} change={setKonkaniTitle} placeholder="e.g. ವಿಗಾರ್ / ಅಧ್ಯಕ್ಷ್" />
        <Field label="Council Role / Position Title *" value={form.position || ''} change={(v) => set('position', v)} required placeholder="e.g. President / Parish Priest" />
        <WardSelect label="Ward / Representative Area (Optional)" value={form.ward || ''} change={(v) => set('ward', v)} />
        <Field label="Contact Phone Number" value={form.phone || ''} change={(v) => set('phone', v)} placeholder="e.g. +91 94480 00000" />
        <div className="full-width" style={{ background: '#fcf6ec', border: '1px solid var(--line)', padding: '16px', borderRadius: '10px', marginTop: '4px' }}>
          <p style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--wine)', marginBottom: '8px', textTransform: 'uppercase' }}>Member Photo (Upload File or Paste Image URL)</p>
          <ImageInput label="Photo" value={form.image || ''} change={(v) => set('image', v)} />
        </div>
      </div>
      <div className="loreto-inline-editor-actions">
        <button type="button" onClick={onCancel} style={{ border: '1px solid var(--line)', background: '#fff', borderRadius: '7px', padding: '10px 18px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
        <button className="loreto-primary" type="submit"><Save size={16} /> Save Council Member</button>
      </div>
    </form>
  );
}

function NewsModal({ item, save, close }) {
  const [form, setForm] = useState(item || {
    title: '',
    category: 'Parish',
    date: new Date().toISOString().slice(0, 10),
    featured: false,
    image: '',
    subImages: [],
    excerpt: '',
    content: ''
  });

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleCoverUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => set('image', reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubImagesUpload = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    files.forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({
          ...prev,
          subImages: [...(prev.subImages || []), reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeSubImage = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      subImages: (prev.subImages || []).filter((_, idx) => idx !== indexToRemove)
    }));
  };

  return (
    <div className="loreto-modal-layer">
      <form
        className="loreto-modal loreto-news-modal"
        onSubmit={(e) => {
          e.preventDefault();
          save(form);
        }}
      >
        <header className="loreto-news-modal-header">
          <h2>{item?.id ? 'Edit News Article' : 'Add News Article'}</h2>
          <button type="button" onClick={close} className="loreto-news-modal-close" aria-label="Close modal">
            <X size={22} />
          </button>
        </header>

        <div className="loreto-news-modal-body">
          <div>
            <span className="loreto-field-label">ARTICLE HEADLINE / TITLE *</span>
            <input
              className="loreto-modal-input"
              required
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="e.g. Annual Parish Feast Celebrations 2026"
            />
          </div>

          <div className="loreto-form-row">
            <div>
              <span className="loreto-field-label">CATEGORY *</span>
              <select
                className="loreto-modal-select"
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
              >
                {categories.slice(1).map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>

            <div>
              <span className="loreto-field-label">PUBLISH DATE *</span>
              <input
                className="loreto-modal-input"
                type="date"
                required
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
              />
            </div>
          </div>

          <label className="loreto-checkbox-field">
            <input
              type="checkbox"
              checked={!!form.featured}
              onChange={(e) => set('featured', e.target.checked)}
            />
            <span>MARK AS FEATURED NEWS ARTICLE (HIGHLIGHT ON HOME & NEWS SECTION)</span>
          </label>

          <div className="loreto-news-modal-section">
            <span className="loreto-field-label">COVER PHOTO IMAGE *</span>
            <div className="loreto-image-picker-row">
              <input
                className="loreto-modal-input"
                type="text"
                value={form.image || ''}
                onChange={(e) => set('image', e.target.value)}
                placeholder="Paste cover photo image URL or upload image file..."
              />
              <label className="loreto-upload-btn">
                <CloudUpload size={16} />
                <span>Upload Image</span>
                <input type="file" accept="image/*" onChange={handleCoverUpload} hidden />
              </label>
            </div>
            {form.image && (
              <div className="loreto-cover-preview">
                <img src={form.image} alt="Cover preview" />
              </div>
            )}
          </div>

          <div className="loreto-news-modal-section">
            <div className="loreto-subimages-header">
              <div>
                <span className="loreto-field-label">ADDITIONAL NEWS IMAGES</span>
                <p className="loreto-subimages-sub">Upload extra photos to create an article gallery or showcase event highlights</p>
              </div>
              <label className="loreto-upload-btn loreto-upload-btn--sub">
                <CloudUpload size={16} />
                <span>Upload Sub Images</span>
                <input type="file" accept="image/*" multiple onChange={handleSubImagesUpload} hidden />
              </label>
            </div>

            {form.subImages && form.subImages.length > 0 ? (
              <div className="loreto-subimages-grid">
                {form.subImages.map((subImg, idx) => (
                  <div key={idx} className="loreto-subimage-thumb">
                    <img src={subImg} alt={`Sub image ${idx + 1}`} />
                    <button
                      type="button"
                      className="loreto-subimage-remove"
                      onClick={() => removeSubImage(idx)}
                      title="Remove image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="loreto-subimages-empty">
                <Image size={20} style={{ opacity: 0.5, color: 'var(--wine)' }} />
                <span>No sub images added yet. Click "Upload Sub Images" to select photos.</span>
              </div>
            )}
          </div>

          <div>
            <span className="loreto-field-label">SHORT EXCERPT / SUMMARY *</span>
            <textarea
              className="loreto-modal-textarea"
              required
              rows={3}
              value={form.excerpt || ''}
              onChange={(e) => set('excerpt', e.target.value)}
              placeholder="Brief summary displayed on news cards and list items..."
            />
          </div>

          <div>
            <span className="loreto-field-label">FULL ARTICLE CONTENT</span>
            <textarea
              className="loreto-modal-textarea"
              rows={6}
              value={form.content || ''}
              onChange={(e) => set('content', e.target.value)}
              placeholder="Full text of the news article, announcement, or bulletin..."
            />
          </div>
        </div>

        <footer className="loreto-news-modal-footer">
          <button type="button" className="loreto-modal-cancel" onClick={close}>
            Cancel
          </button>
          <button type="submit" className="loreto-modal-save">
            <Save size={16} />
            <span>Save Article</span>
          </button>
        </footer>
      </form>
    </div>
  );
}

/* ─── Events Manager ─── */
function EventsManager({ items, save }) {
  const [records, setRecords] = useState(items || []);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const startNew = () => {
    setEditingId('new');
    setEditingData({ id: Date.now(), title: '', category: 'Parish', date: new Date().toISOString().slice(0, 10), displayDate: '', time: '', location: '', description: '', image: '', featured: false });
  };
  const startEdit = (item) => { setEditingId(item.id); setEditingData({ ...item }); };
  const handleSave = (record) => {
    const displayDate = record.date ? new Date(`${record.date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : record.displayDate || '';
    const formatted = { ...record, displayDate, day: record.date ? new Date(`${record.date}T00:00:00`).getDate().toString().padStart(2, '0') : '', month: record.date ? new Date(`${record.date}T00:00:00`).toLocaleString('en-IN', { month: 'short' }) : '' };
    const next = records.some((r) => r.id === record.id) ? records.map((r) => r.id === record.id ? formatted : r) : [formatted, ...records];
    setRecords(next); save(next); setEditingId(null); setEditingData(null);
  };
  const remove = (id) => { const next = records.filter((r) => r.id !== id); setRecords(next); save(next); };

  return (
    <div className="loreto-card">
      <div className="loreto-section-head">
        <div><h2>Upcoming Events & Feast Programmes</h2><p>Add, edit, and publish parish events, feast celebrations, and programme details.</p></div>
        <button className="loreto-primary" onClick={startNew}><Plus size={18} />Add Event</button>
      </div>
      {editingId === 'new' && <InlineEventForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={() => setEditingId(null)} isNew={true} />}
      <div className="loreto-manage-list">
        {records.map((item) => (
          <React.Fragment key={item.id}>
            {editingId === item.id ? (
              <InlineEventForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={() => setEditingId(null)} isNew={false} />
            ) : (
              <article>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  {item.image && <img src={item.image} alt="" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />}
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.category}</span>
                    <h3 style={{ margin: '2px 0 4px' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
                      {item.displayDate || item.date} {item.time && `• ${item.time}`} {item.location && `• ${item.location}`}
                    </p>
                    <p style={{ fontSize: '0.84rem', marginTop: '4px' }}>{item.description}</p>
                  </div>
                </div>
                <div className="loreto-card-actions">
                  <button onClick={() => startEdit(item)}><Edit3 size={16} />Edit</button>
                  <button className="delete" onClick={() => remove(item.id)}><Trash2 size={17} /></button>
                </div>
              </article>
            )}
          </React.Fragment>
        ))}
      </div>
      {!records.length && editingId !== 'new' && <div className="loreto-empty">No events found. Click "Add Event" to publish one.</div>}
    </div>
  );
}

function InlineEventForm({ form, setForm, onSave, onCancel, isNew }) {
  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));
  const handleImageUpload = (e) => { const file = e.target.files?.[0]; if (!file || !file.type.startsWith('image/')) return; const reader = new FileReader(); reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result })); reader.readAsDataURL(file); };
  return (
    <form className="loreto-inline-editor" onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
      <h3><CalendarDays size={20} />{isNew ? 'Add New Event' : `Edit Event`}</h3>
      <div className="loreto-inline-editor-grid">
        <div className="full-width"><Field label="Event Title *" value={form.title || ''} change={(v) => set('title', v)} /></div>
        <div>
          <span className="loreto-field-label">CATEGORY *</span>
          <select className="loreto-modal-select" value={form.category || 'Parish'} onChange={(e) => set('category', e.target.value)}>
            {['Feast','Liturgy','Youth','Catechism','Organization','Parish'].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div><span className="loreto-field-label">EVENT DATE *</span><input className="loreto-modal-input" type="date" required value={form.date || ''} onChange={(e) => set('date', e.target.value)} /></div>
        <Field label="Time (e.g. 10:00 AM)" value={form.time || ''} change={(v) => set('time', v)} />
        <Field label="Venue / Location" value={form.location || ''} change={(v) => set('location', v)} />
        <div className="full-width">
          <span className="loreto-field-label">EVENT FLYER / COVER IMAGE</span>
          <div className="loreto-image-picker-row">
            <input className="loreto-modal-input" type="text" value={form.image || ''} onChange={(e) => set('image', e.target.value)} placeholder="Paste image URL or upload event flyer..." />
            <label className="loreto-upload-btn"><CloudUpload size={16} /><span>Upload Flyer</span><input type="file" accept="image/*" onChange={handleImageUpload} hidden /></label>
          </div>
          {form.image && <div className="loreto-cover-preview"><img src={form.image} alt="Event flyer preview" /></div>}
        </div>
        <div className="full-width">
          <label className="loreto-field">Event Description / Programme Details
            <textarea value={form.description || ''} onChange={(e) => set('description', e.target.value)} rows={4} placeholder="Full event description, schedule, and programme details..." />
          </label>
        </div>
        <div className="full-width">
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
            <input type="checkbox" checked={!!form.featured} onChange={(e) => set('featured', e.target.checked)} />
            <span>Mark as Featured Event (highlights on homepage and Events page)</span>
          </label>
        </div>
      </div>
      <div className="loreto-inline-editor-actions">
        <button type="button" onClick={onCancel} style={{ border: '1px solid var(--line)', background: '#fff', borderRadius: '7px', padding: '10px 18px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
        <button className="loreto-primary" type="submit"><Save size={16} />Save Event</button>
      </div>
    </form>
  );
}

/* ─── Newsletter Manager ─── */
function NewsletterManager({ items, save }) {
  const [records, setRecords] = useState(items || []);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const startNew = () => {
    setEditingId('new');
    setEditingData({ id: Date.now(), title: '', edition: '', date: new Date().toISOString().slice(0, 10), displayDate: '', description: '', pdfUrl: '', readUrl: '', image: '', featured: false, year: new Date().getFullYear() });
  };
  const startEdit = (item) => { setEditingId(item.id); setEditingData({ ...item }); };
  const handleSave = (record) => {
    const displayDate = record.date ? new Date(`${record.date}T00:00:00`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : record.displayDate || '';
    const formatted = { ...record, displayDate, year: record.date ? new Date(`${record.date}T00:00:00`).getFullYear() : record.year };
    const next = records.some((r) => r.id === record.id) ? records.map((r) => r.id === record.id ? formatted : r) : [formatted, ...records];
    setRecords(next); save(next); setEditingId(null); setEditingData(null);
  };
  const remove = (id) => { const next = records.filter((r) => r.id !== id); setRecords(next); save(next); };

  return (
    <div className="loreto-card">
      <div className="loreto-section-head">
        <div><h2>Parish Newsletter — ಕಾಳ್ಜಾ ಸಮರ್ಪಣ್</h2><p>Manage newsletter editions, PDF uploads, and cover thumbnails. Changes publish to the public Newsletter page.</p></div>
        <button className="loreto-primary" onClick={startNew}><Plus size={18} />Add Edition</button>
      </div>
      {editingId === 'new' && <InlineNewsletterForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={() => setEditingId(null)} isNew={true} />}
      <div className="loreto-manage-list">
        {records.map((item) => (
          <React.Fragment key={item.id}>
            {editingId === item.id ? (
              <InlineNewsletterForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={() => setEditingId(null)} isNew={false} />
            ) : (
              <article style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                {item.image && <img src={item.image} alt="" style={{ width: '70px', height: '90px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--line)', flexShrink: 0 }} />}
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase' }}>{item.edition}</span>
                  <h3 style={{ margin: '2px 0 4px' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>{item.displayDate || item.date}</p>
                  {item.pdfUrl && item.pdfUrl !== '#' && <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.82rem', color: 'var(--wine)', fontWeight: 600 }}>View PDF →</a>}
                  <p style={{ fontSize: '0.84rem', marginTop: '4px' }}>{item.description}</p>
                  <div className="loreto-card-actions">
                    <button onClick={() => startEdit(item)}><Edit3 size={16} />Edit</button>
                    <button className="delete" onClick={() => remove(item.id)}><Trash2 size={17} /></button>
                  </div>
                </div>
              </article>
            )}
          </React.Fragment>
        ))}
      </div>
      {!records.length && editingId !== 'new' && <div className="loreto-empty">No newsletter editions found. Click "Add Edition" to publish one.</div>}
    </div>
  );
}

function InlineNewsletterForm({ form, setForm, onSave, onCancel, isNew }) {
  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));
  const handlePdfUpload = (e) => { const file = e.target.files?.[0]; if (!file || file.type !== 'application/pdf') return; const reader = new FileReader(); reader.onload = () => setForm((prev) => ({ ...prev, pdfUrl: reader.result })); reader.readAsDataURL(file); };
  const handleCoverUpload = (e) => { const file = e.target.files?.[0]; if (!file || !file.type.startsWith('image/')) return; const reader = new FileReader(); reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result })); reader.readAsDataURL(file); };
  return (
    <form className="loreto-inline-editor" onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
      <h3><FileText size={20} />{isNew ? 'Add Newsletter Edition' : 'Edit Newsletter Edition'}</h3>
      <div className="loreto-inline-editor-grid">
        <div className="full-width"><Field label="Newsletter Title *" value={form.title || ''} change={(v) => set('title', v)} /></div>
        <Field label="Edition Label (e.g. Annual Newsletter 2026)" value={form.edition || ''} change={(v) => set('edition', v)} />
        <div><span className="loreto-field-label">PUBLICATION DATE *</span><input className="loreto-modal-input" type="date" required value={form.date || ''} onChange={(e) => set('date', e.target.value)} /></div>
        <div className="full-width">
          <span className="loreto-field-label">COVER THUMBNAIL IMAGE</span>
          <div className="loreto-image-picker-row">
            <input className="loreto-modal-input" type="text" value={form.image || ''} onChange={(e) => set('image', e.target.value)} placeholder="Paste cover image URL or upload..." />
            <label className="loreto-upload-btn"><CloudUpload size={16} /><span>Upload Cover</span><input type="file" accept="image/*" onChange={handleCoverUpload} hidden /></label>
          </div>
          {form.image && <div className="loreto-cover-preview"><img src={form.image} alt="Newsletter cover preview" style={{ maxHeight: '120px', objectFit: 'cover' }} /></div>}
        </div>
        <div className="full-width">
          <span className="loreto-field-label">PDF FILE UPLOAD OR URL</span>
          <div className="loreto-image-picker-row">
            <input className="loreto-modal-input" type="text" value={form.pdfUrl || ''} onChange={(e) => set('pdfUrl', e.target.value)} placeholder="Paste PDF URL (Google Drive, direct link, etc.)" />
            <label className="loreto-upload-btn"><CloudUpload size={16} /><span>Upload PDF</span><input type="file" accept="application/pdf" onChange={handlePdfUpload} hidden /></label>
          </div>
        </div>
        <Field label="Online Read URL (optional)" value={form.readUrl || ''} change={(v) => set('readUrl', v)} />
        <div className="full-width">
          <label className="loreto-field">Newsletter Description / Summary
            <textarea value={form.description || ''} onChange={(e) => set('description', e.target.value)} rows={3} placeholder="Brief description of this edition's contents..." />
          </label>
        </div>
        <div className="full-width">
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
            <input type="checkbox" checked={!!form.featured} onChange={(e) => set('featured', e.target.checked)} />
            <span>Mark as Featured Edition (displays prominently)</span>
          </label>
        </div>
      </div>
      <div className="loreto-inline-editor-actions">
        <button type="button" onClick={onCancel} style={{ border: '1px solid var(--line)', background: '#fff', borderRadius: '7px', padding: '10px 18px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
        <button className="loreto-primary" type="submit"><Save size={16} />Save Newsletter Edition</button>
      </div>
    </form>
  );
}

/* ─── Obituary Manager ─── */
function ObituaryManager({ items, save }) {
  const [records, setRecords] = useState(items || []);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);

  const startNew = () => {
    setEditingId('new');
    setEditingData({ id: Date.now(), name: '', age: '', dateOfDeath: '', displayDate: '', ward: '', photo: '', funeralDetails: '', tribute: '' });
  };
  const startEdit = (item) => { setEditingId(item.id); setEditingData({ ...item }); };
  const handleSave = (record) => {
    const displayDate = record.dateOfDeath ? new Date(`${record.dateOfDeath}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : record.displayDate || '';
    const formatted = { ...record, displayDate };
    const next = records.some((r) => r.id === record.id) ? records.map((r) => r.id === record.id ? formatted : r) : [formatted, ...records];
    setRecords(next); save(next); setEditingId(null); setEditingData(null);
  };
  const remove = (id) => { const next = records.filter((r) => r.id !== id); setRecords(next); save(next); };

  return (
    <div className="loreto-card">
      <div className="loreto-section-head">
        <div><h2>Parish Obituaries & Memorial Notices</h2><p>Publish memorial notices for departed parishioners. These appear on the public Obituaries page.</p></div>
        <button className="loreto-primary" onClick={startNew}><Plus size={18} />Add Memorial</button>
      </div>
      {editingId === 'new' && <InlineObituaryForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={() => setEditingId(null)} isNew={true} />}
      <div className="loreto-manage-list">
        {records.map((item) => (
          <React.Fragment key={item.id}>
            {editingId === item.id ? (
              <InlineObituaryForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={() => setEditingId(null)} isNew={false} />
            ) : (
              <article style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                {item.photo && <img src={item.photo} alt="" style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--line)', flexShrink: 0 }} />}
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 4px' }}>{item.name}</h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
                    {item.ward && `${item.ward} • `}Age: {item.age} • Passed: {item.displayDate || item.dateOfDeath}
                  </p>
                  <p style={{ fontSize: '0.84rem', fontStyle: 'italic', marginTop: '4px' }}>{item.tribute}</p>
                  <div className="loreto-card-actions">
                    <button onClick={() => startEdit(item)}><Edit3 size={16} />Edit</button>
                    <button className="delete" onClick={() => remove(item.id)}><Trash2 size={17} /></button>
                  </div>
                </div>
              </article>
            )}
          </React.Fragment>
        ))}
      </div>
      {!records.length && editingId !== 'new' && <div className="loreto-empty">No obituary notices published. Click "Add Memorial" to post a notice.</div>}
    </div>
  );
}

function InlineObituaryForm({ form, setForm, onSave, onCancel, isNew }) {
  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));
  const handlePhotoUpload = (e) => { const file = e.target.files?.[0]; if (!file || !file.type.startsWith('image/')) return; const reader = new FileReader(); reader.onload = () => setForm((prev) => ({ ...prev, photo: reader.result })); reader.readAsDataURL(file); };
  return (
    <form className="loreto-inline-editor" onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
      <h3><Edit3 size={20} />{isNew ? 'Add Memorial Notice' : 'Edit Memorial Notice'}</h3>
      <div className="loreto-inline-editor-grid">
        <Field label="Full Name of Deceased *" value={form.name || ''} change={(v) => set('name', v)} />
        <Field label="Age at Death" value={form.age || ''} change={(v) => set('age', v)} />
        <div><span className="loreto-field-label">DATE OF DEATH *</span><input className="loreto-modal-input" type="date" required value={form.dateOfDeath || ''} onChange={(e) => set('dateOfDeath', e.target.value)} /></div>
        <WardSelect label="Ward / Family Area (Optional)" value={form.ward || ''} change={(v) => set('ward', v)} />
        <div className="full-width">
          <span className="loreto-field-label">PORTRAIT PHOTO</span>
          <div className="loreto-image-picker-row">
            <input className="loreto-modal-input" type="text" value={form.photo || ''} onChange={(e) => set('photo', e.target.value)} placeholder="Paste portrait photo URL or upload..." />
            <label className="loreto-upload-btn"><CloudUpload size={16} /><span>Upload Photo</span><input type="file" accept="image/*" onChange={handlePhotoUpload} hidden /></label>
          </div>
          {form.photo && <div className="loreto-cover-preview"><img src={form.photo} alt="Portrait preview" style={{ maxHeight: '100px', borderRadius: '50%', maxWidth: '100px', objectFit: 'cover' }} /></div>}
        </div>
        <div className="full-width">
          <label className="loreto-field">Funeral & Service Details
            <textarea value={form.funeralDetails || ''} onChange={(e) => set('funeralDetails', e.target.value)} rows={3} placeholder="Funeral Mass date, time, location, burial details..." />
          </label>
        </div>
        <div className="full-width">
          <label className="loreto-field">Memorial Tribute / Family Note
            <textarea value={form.tribute || ''} onChange={(e) => set('tribute', e.target.value)} rows={3} placeholder="Short tribute or family message..." />
          </label>
        </div>
      </div>
      <div className="loreto-inline-editor-actions">
        <button type="button" onClick={onCancel} style={{ border: '1px solid var(--line)', background: '#fff', borderRadius: '7px', padding: '10px 18px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
        <button className="loreto-primary" type="submit"><Save size={16} />Save Memorial Notice</button>
      </div>
    </form>
  );
}

/* ─── Wards Manager ─── */
function WardsManager({ items, save }) {
  const [records, setRecords] = useState(items || []);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const startNew = () => { setEditingId('new'); setEditingData({ id: Date.now(), name: '', konkaniName: '', patronSaint: '', area: '', householdsCount: '', meetingSchedule: '', description: '', image: '' }); };
  const startEdit = (item) => { setEditingId(item.id); setEditingData({ ...item }); };
  const handleSave = (record) => { const next = records.some((r) => r.id === record.id) ? records.map((r) => r.id === record.id ? record : r) : [record, ...records]; setRecords(next); save(next); setEditingId(null); setEditingData(null); };
  const remove = (id) => { const next = records.filter((r) => r.id !== id); setRecords(next); save(next); };
  return (
    <div className="loreto-card">
      <div className="loreto-section-head"><div><h2>Parish Wards (ವಾಡೆ)</h2><p>Manage ward details, patron saints, family counts, and meeting schedules.</p></div><button className="loreto-primary" onClick={startNew}><Plus size={18} />Add Ward</button></div>
      {editingId === 'new' && <InlineWardForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={() => setEditingId(null)} isNew={true} />}
      <div className="loreto-manage-list">{records.map((item) => (<React.Fragment key={item.id}>{editingId === item.id ? (<InlineWardForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={() => setEditingId(null)} isNew={false} />) : (<article><div><h3>{item.name} {item.konkaniName && `• ${item.konkaniName}`}</h3><p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Patron: {item.patronSaint} • {item.householdsCount} families</p><p style={{ fontSize: '0.84rem' }}>{item.description}</p></div><div className="loreto-card-actions"><button onClick={() => startEdit(item)}><Edit3 size={16} />Edit</button><button className="delete" onClick={() => remove(item.id)}><Trash2 size={17} /></button></div></article>)}</React.Fragment>))}</div>
      {!records.length && editingId !== 'new' && <div className="loreto-empty">No wards listed. Click "Add Ward" to create one.</div>}
    </div>
  );
}

function InlineWardForm({ form, setForm, onSave, onCancel, isNew }) {
  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSelectWard = (selectedName) => {
    const matched = PARISH_WARDS.find((w) => w.name === selectedName);
    if (matched) {
      setForm((prev) => ({
        ...prev,
        name: matched.name,
        konkaniName: matched.konkani,
        patronSaint: matched.patron || prev.patronSaint
      }));
    } else {
      set('name', selectedName);
    }
  };

  return (
    <form className="loreto-inline-editor" onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
      <h3><Edit3 size={20} />{isNew ? 'Add Ward' : `Edit ${form.name || 'Ward'}`}</h3>
      <div className="loreto-inline-editor-grid">
        <WardSelect label="Select Parish Ward *" value={form.name || ''} change={handleSelectWard} required />
        <Field label="Ward Name (Konkani)" value={form.konkaniName || ''} change={(v) => set('konkaniName', v)} />
        <Field label="Patron Saint" value={form.patronSaint || ''} change={(v) => set('patronSaint', v)} />
        <Field label="Area / Village" value={form.area || ''} change={(v) => set('area', v)} />
        <Field label="Number of Households" value={form.householdsCount || ''} change={(v) => set('householdsCount', v)} />
        <Field label="Meeting Schedule" value={form.meetingSchedule || ''} change={(v) => set('meetingSchedule', v)} />
        <div className="full-width"><ImageInput label="Ward Image" value={form.image || ''} change={(v) => set('image', v)} /></div>
        <div className="full-width"><label className="loreto-field">Description<textarea value={form.description || ''} onChange={(e) => set('description', e.target.value)} rows={3} /></label></div>
      </div>
      <div className="loreto-inline-editor-actions">
        <button type="button" onClick={onCancel} style={{ border: '1px solid var(--line)', background: '#fff', borderRadius: '7px', padding: '10px 18px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
        <button className="loreto-primary" type="submit"><Save size={16} />Save Ward</button>
      </div>
    </form>
  );
}

/* ─── Gallery Manager ─── */
function GalleryManager() {
  return (
    <div className="loreto-card">
      <div className="loreto-section-head"><div><h2>Photo Gallery Management</h2><p>Gallery images are currently managed via data files. Use the image URL fields to update gallery photos.</p></div></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginTop: '16px' }}>
        {galleryImages.slice(0, 12).map((img, i) => {
          const src = typeof img === 'string' ? img : (img.src || img.image || img.url || '');
          const title = typeof img === 'object' ? (img.title || img.caption || '') : '';
          return (
            <div key={i} style={{ borderRadius: '8px', overflow: 'hidden', aspectRatio: '4/3', border: '1px solid var(--line)' }}>
              <img src={src} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          );
        })}
      </div>
      {galleryImages.length > 12 && <p style={{ textAlign: 'center', marginTop: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>+{galleryImages.length - 12} more images in gallery</p>}
    </div>
  );
}

/* ─── History Manager ─── */
function HistoryManager({ items, save }) {
  const [records, setRecords] = useState(items || []);
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const startNew = () => { setEditingId('new'); setEditingData({ id: Date.now(), year: '', era: '', title: '', description: '', image: '' }); };
  const startEdit = (item) => { setEditingId(item.id); setEditingData({ ...item }); };
  const handleSave = (record) => { const next = records.some((r) => r.id === record.id) ? records.map((r) => r.id === record.id ? record : r) : [record, ...records]; setRecords(next); save(next); setEditingId(null); setEditingData(null); };
  const remove = (id) => { const next = records.filter((r) => r.id !== id); setRecords(next); save(next); };
  return (
    <div className="loreto-card">
      <div className="loreto-section-head"><div><h2>Church History Timeline</h2><p>Manage milestone events and historical facts for the parish timeline.</p></div><button className="loreto-primary" onClick={startNew}><Plus size={18} />Add Milestone</button></div>
      {editingId === 'new' && <InlineHistoryForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={() => setEditingId(null)} isNew={true} />}
      <div className="loreto-manage-list">{records.map((item) => (<React.Fragment key={item.id}>{editingId === item.id ? (<InlineHistoryForm form={editingData} setForm={setEditingData} onSave={handleSave} onCancel={() => setEditingId(null)} isNew={false} />) : (<article><div><span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase' }}>{item.year} {item.era && `• ${item.era}`}</span><h3 style={{ margin: '2px 0 4px' }}>{item.title}</h3><p style={{ fontSize: '0.84rem' }}>{item.description}</p></div><div className="loreto-card-actions"><button onClick={() => startEdit(item)}><Edit3 size={16} />Edit</button><button className="delete" onClick={() => remove(item.id)}><Trash2 size={17} /></button></div></article>)}</React.Fragment>))}</div>
      {!records.length && editingId !== 'new' && <div className="loreto-empty">No history milestones. Click "Add Milestone" to begin.</div>}
    </div>
  );
}

function InlineHistoryForm({ form, setForm, onSave, onCancel, isNew }) {
  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));
  return (
    <form className="loreto-inline-editor" onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
      <h3><Edit3 size={20} />{isNew ? 'Add History Milestone' : 'Edit Milestone'}</h3>
      <div className="loreto-inline-editor-grid">
        <Field label="Year / Date *" value={form.year || ''} change={(v) => set('year', v)} />
        <Field label="Era / Period" value={form.era || ''} change={(v) => set('era', v)} />
        <div className="full-width"><Field label="Milestone Title *" value={form.title || ''} change={(v) => set('title', v)} /></div>
        <div className="full-width"><ImageInput label="Timeline Image" value={form.image || ''} change={(v) => set('image', v)} /></div>
        <div className="full-width"><label className="loreto-field">Historical Description *<textarea required value={form.description || ''} onChange={(e) => set('description', e.target.value)} rows={4} /></label></div>
      </div>
      <div className="loreto-inline-editor-actions">
        <button type="button" onClick={onCancel} style={{ border: '1px solid var(--line)', background: '#fff', borderRadius: '7px', padding: '10px 18px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
        <button className="loreto-primary" type="submit"><Save size={16} />Save Milestone</button>
      </div>
    </form>
  );
}

/* ─── Admin Login Page Component ─── */
function AdminLoginPage({ password, onLogin }) {
  const [inputPass, setInputPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPass.trim() === password) {
      setError('');
      onLogin(remember);
    } else {
      setError('Invalid admin password. Please try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="loreto-login-wrapper">
      {/* Background Animated Ambient Light Glow */}
      <motion.div
        className="loreto-login-glow"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.6, 0.35]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <motion.div
        className="loreto-login-card"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={
          isShaking
            ? { x: [0, -12, 12, -8, 8, -4, 4, 0], opacity: 1, scale: 1, y: 0 }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
      >
        <motion.div
          className="loreto-login-brand"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <img src={`${base}favicon.png`} alt="Church Logo" />
        </motion.div>

        <motion.div
          className="loreto-login-badge"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Lock size={13} />
          <span>ADMINISTRATOR ACCESS PORTAL</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Sacred Heart of Jesus Church
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          Thodambila, Bantwal • Parish Administration
        </motion.p>

        <motion.form
          className="loreto-login-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                className="loreto-login-error"
                initial={{ opacity: 0, height: 0, y: -6 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <X size={16} />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <span className="loreto-field-label">ADMIN SECURITY PASSWORD</span>
            <div className="loreto-login-input-group">
              <Lock size={18} className="loreto-login-icon-left" />
              <input
                type={showPass ? 'text' : 'password'}
                required
                autoFocus
                placeholder="Enter admin password..."
                value={inputPass}
                onChange={(e) => { setInputPass(e.target.value); setError(''); }}
              />
              <button
                type="button"
                className="loreto-login-icon-right"
                onClick={() => setShowPass(!showPass)}
                title={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <small style={{ color: '#8a7972', display: 'block', marginTop: '6px', fontSize: '12px' }}>
              Default Password: <strong>1980</strong> (Can be updated in Admin Header)
            </small>
          </div>

          <label className="loreto-login-remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Keep me logged in on this browser</span>
          </label>

          <motion.button
            type="submit"
            className="loreto-login-submit"
            whileHover={{ scale: 1.025, boxShadow: '0 8px 24px rgba(67, 13, 22, 0.45)' }}
            whileTap={{ scale: 0.975 }}
          >
            <span>Unlock Admin Dashboard</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              style={{ display: 'inline-flex', alignItems: 'center' }}
            >
              <ArrowRight size={17} />
            </motion.span>
          </motion.button>
        </motion.form>

        <motion.div
          className="loreto-login-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/" className="loreto-login-exit">
            <LogOut size={15} />
            <span>Back to Public Church Website</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Change Password Modal Component ─── */
function ChangePasswordModal({ currentPassword, onSave, close }) {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (current.trim() !== currentPassword) {
      setError('Current password is incorrect.');
      return;
    }
    if (!newPass.trim() || newPass.length < 4) {
      setError('New password must be at least 4 characters long.');
      return;
    }
    if (newPass !== confirmPass) {
      setError('New password and confirm password do not match.');
      return;
    }
    setError('');
    onSave(newPass.trim());
    setSuccess(true);
    setTimeout(() => {
      close();
    }, 1200);
  };

  return (
    <div className="loreto-modal-layer">
      <div className="loreto-modal" style={{ width: '440px' }}>
        <header>
          <div>
            <p>SECURITY SETTINGS</p>
            <h2>Change Admin Password</h2>
          </div>
          <button type="button" onClick={close}><X size={20} /></button>
        </header>

        {success ? (
          <div style={{ textAlign: 'center', padding: '20px 0', color: '#145534' }}>
            <CheckCircle2 size={44} style={{ margin: '0 auto 12px', display: 'block' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Password Updated Successfully!</h3>
            <p style={{ fontSize: '14px', color: '#554e4a' }}>Your new password is active now.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {error && (
              <div className="loreto-login-error">
                <X size={16} />
                <span>{error}</span>
              </div>
            )}
            <Field label="Current Password *" type="password" required value={current} change={(v) => { setCurrent(v); setError(''); }} />
            <Field label="New Admin Password *" type="password" required value={newPass} change={(v) => { setNewPass(v); setError(''); }} placeholder="Minimum 4 characters" />
            <Field label="Confirm New Password *" type="password" required value={confirmPass} change={(v) => { setConfirmPass(v); setError(''); }} />

            <footer>
              <button type="button" onClick={close}>Cancel</button>
              <button className="loreto-primary" type="submit">Update Password</button>
            </footer>
          </form>
        )}
      </div>
    </div>
  );
}


