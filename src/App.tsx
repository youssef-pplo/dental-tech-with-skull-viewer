import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Activity, ArrowDownRight, ArrowRight, BookOpen, Brain, Check, ChevronDown, CircleHelp, Command, GraduationCap, Home, Layers3, Menu, Search, Sparkles, Target, X } from 'lucide-react';
import { chapters } from './data';
import ChapterContent, { SkullStudioPage } from './components/ChapterContent';
import Quiz from './components/Quiz';
import SkullViewer from './components/SkullViewer';

type ProgressMap = Record<string, boolean>;
const progressKey = 'craniaChapterProgress';

function readProgress(): ProgressMap {
  try { return JSON.parse(localStorage.getItem(progressKey) || '{}') as ProgressMap; } catch { return {}; }
}

const studyTopics = [
  { chapter: 'intro-bones', title: 'Anatomical position', keywords: 'planes directional terms medial lateral proximal distal' },
  { chapter: 'intro-bones', title: 'Long bone anatomy', keywords: 'epiphysis metaphysis diaphysis growth plate' },
  { chapter: 'intro-bones', title: 'The axial and appendicular skeleton', keywords: '206 bones axial appendicular skull vertebrae limbs' },
  { chapter: 'joints', title: 'Synovial joint features', keywords: 'capsule cartilage synovial membrane fluid cavity' },
  { chapter: 'joints', title: 'Joint classification', keywords: 'fibrous cartilaginous synovial suture gomphosis syndesmosis symphysis' },
  { chapter: 'face-anatomy', title: 'Muscles of facial expression', keywords: 'buccinator orbicularis oculi orbicularis oris zygomaticus frontalis' },
  { chapter: 'face-anatomy', title: 'Facial nerve and trigeminal nerve', keywords: 'CN VII CN V facial motor sensory temporal zygomatic buccal mandibular cervical' },
  { chapter: 'face-anatomy', title: 'SCALP layers', keywords: 'skin connective tissue aponeurosis loose areolar dangerous pericranium' },
  { chapter: 'norma-cns', title: 'Facial foramina', keywords: 'supraorbital infraorbital mental foramen V1 V2 V3' },
  { chapter: 'norma-cns', title: 'Brain regions and meninges', keywords: 'cerebrum cerebellum diencephalon brainstem dura arachnoid pia CSF' },
];

function readQuizHistory(): Array<{ score: number; total: number; chapter: string; at: string }> {
  try { return JSON.parse(localStorage.getItem('craniaQuizHistory') || '[]'); } catch { return []; }
}

function App() {
  const location = useLocation();
  const [completed, setCompleted] = useState<ProgressMap>(readProgress);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light-mode', lightMode);
  }, [lightMode]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
      if (event.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const markComplete = (id: string) => {
    const next = { ...completed, [id]: true };
    setCompleted(next);
    try { localStorage.setItem(progressKey, JSON.stringify(next)); } catch { /* keep current-session progress */ }
  };
  const onQuizComplete = (score: number, total: number, chapterId: string) => {
    if (chapterId !== 'all' && total > 0 && score / total >= 0.65) markComplete(chapterId);
  };
  const doneCount = Object.values(completed).filter(Boolean).length;
  const progress = Math.round((doneCount / chapters.length) * 100);
  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="app-shell">
      <aside className={'sidebar ' + (mobileOpen ? 'mobile-open' : '')}>
        <div className="brand-lockup"><Link to="/" onClick={closeMobile}><span className="brand-mark"><Activity size={19} /></span><span className="brand-name">CRANIA<small>ANATOMY ATLAS</small></span></Link><button className="mobile-close icon-button" onClick={closeMobile} aria-label="Close navigation"><X size={18} /></button></div>
        <div className="sidebar-course"><span className="course-dot" /><span>HEAD & NECK<small>Dental anatomy · Semester 1</small></span><ChevronDown size={14} /></div>
        <nav className="main-nav" aria-label="Main navigation">
          <span className="nav-label">STUDY SPACE</span>
          <NavLink to="/" end onClick={closeMobile}><Home size={17} />Home</NavLink>
          <NavLink to="/chapters" onClick={closeMobile}><BookOpen size={17} />Chapters<span className="nav-count">{chapters.length}</span></NavLink>
          <NavLink to="/skull-3d" onClick={closeMobile}><Layers3 size={17} />Skull studio<span className="nav-live" /></NavLink>
          <NavLink to="/quiz" onClick={closeMobile}><Target size={17} />Test yourself</NavLink>
        </nav>
        <div className="sidebar-chapters"><span className="nav-label">YOUR CHAPTERS</span>
          {chapters.map((chapter) => <NavLink key={chapter.id} to={'/chapters/' + chapter.id} onClick={closeMobile} className={({ isActive }) => 'chapter-nav ' + (isActive ? 'active' : '')}><span className={'chapter-mini-icon ' + chapter.color}>{chapter.number}</span><span>{chapter.shortTitle}</span>{completed[chapter.id] && <Check size={14} className="done-check" />}</NavLink>)}
        </div>
        <div className="sidebar-bottom">
          <div className="progress-mini"><div className="progress-mini-top"><span>YOUR PROGRESS</span><b>{progress}%</b></div><div className="progress-track"><i style={{ width: progress + '%' }} /></div><small>{doneCount} of {chapters.length} chapters completed</small></div>
          <div className="sidebar-footer"><span className="avatar">P</span><span>Study mode<small>Saved on this device</small></span><button className="more-button" aria-label="More options">···</button></div>
        </div>
      </aside>
      {mobileOpen && <button className="mobile-scrim" onClick={closeMobile} aria-label="Close menu" />}

      <main className="main-shell">
        <header className="topbar">
          <div className="topbar-left"><button className="mobile-menu icon-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={19} /></button><div className="breadcrumbs"><Link to="/">Study space</Link><span>/</span><strong>{breadcrumb(location.pathname)}</strong></div></div>
          <div className="topbar-actions"><button className="search-trigger" onClick={() => setSearchOpen(true)}><Search size={16} /><span>Search anatomy</span><kbd><Command size={11} /> K</kbd></button><button className="topbar-icon" title="Switch appearance" aria-label="Switch appearance" onClick={() => setLightMode(!lightMode)}><span className={'theme-dot ' + (lightMode ? 'sun' : '')} /></button><button className="topbar-avatar" aria-label="Student profile">P</button></div>
        </header>
        <AnimatePresence mode="wait">
          <motion.div className="page-body" key={location.pathname + location.search} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
            <Routes>
              <Route path="/" element={<HomePage completed={completed} progress={progress} />} />
              <Route path="/chapters" element={<ChaptersPage completed={completed} />} />
              <Route path="/chapters/:chapterId" element={<ChapterPage completed={completed} markComplete={markComplete} />} />
              <Route path="/skull-3d" element={<SkullStudioPage />} />
              <Route path="/quiz" element={<QuizRoute onQuizComplete={onQuizComplete} />} />
              <Route path="*" element={<HomePage completed={completed} progress={progress} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
        <footer className="app-footer"><span>CRANIA · ANATOMY ATLAS</span><span>Built for curious minds and careful study.</span><a href="https://openstax.org/books/anatomy-and-physiology/pages/9-1-classification-of-joints" target="_blank" rel="noreferrer">Reference check <ArrowRight size={12} /></a></footer>
      </main>
      {searchOpen && <SearchDialog close={() => setSearchOpen(false)} />}
    </div>
  );
}

function breadcrumb(path: string) {
  if (path === '/') return 'Home';
  if (path.startsWith('/chapters/')) {
    const id = path.split('/')[2];
    return chapters.find((chapter) => chapter.id === id)?.shortTitle || 'Chapter';
  }
  if (path === '/chapters') return 'Chapters';
  if (path === '/skull-3d') return 'Skull studio';
  if (path === '/quiz') return 'Test yourself';
  return 'Home';
}

function HomePage({ completed, progress }: { completed: ProgressMap; progress: number }) {
  const [recent] = useState(readQuizHistory);
  return (
    <div className="home-page">
      <section className="hero-panel">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="live-dot" /> A BETTER WAY TO SEE ANATOMY</div>
          <h1>Learn the form.<br /><em>Understand</em> the function.</h1>
          <p>A clear, interactive atlas for dental anatomy. Follow a bone, compare a joint, and see how the parts fit together.</p>
          <div className="hero-actions"><Link className="button-primary" to="/chapters/intro-bones">Start learning <ArrowRight size={16} /></Link><Link className="button-ghost" to="/quiz"><CircleHelp size={16} /> Test yourself</Link></div>
          <div className="hero-proof"><div className="avatar-stack"><span>01</span><span>02</span><span>03</span><span>04</span></div><span><b>4 focused chapters</b><small>From bone basics to cranial landmarks</small></span></div>
        </div>
        <div className="hero-art"><div className="hero-glow" /><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><SkullViewer compact /><div className="hero-caption"><span className="caption-dot" /> BONES · LANDMARKS · MOVEMENT</div></div>
        <div className="hero-index"><span>01</span><i /> <span>04</span></div>
      </section>
      <section className="home-section">
        <div className="section-title-row"><div><span className="eyebrow">YOUR LEARNING PATH</span><h2>Four chapters. One connected system.</h2></div><Link to="/chapters" className="text-link">View all chapters <ArrowRight size={15} /></Link></div>
        <div className="chapter-card-grid">{chapters.map((chapter) => <ChapterCard key={chapter.id} chapter={chapter} completed={Boolean(completed[chapter.id])} />)}</div>
      </section>
      <section className="home-bottom-grid">
        <div className="knowledge-card"><div className="knowledge-top"><div><span className="eyebrow">KEEP YOUR MOMENTUM</span><h2>Small sessions add up.</h2><p>Pick up where you left off, or take a quick quiz to see what stuck.</p></div><div className="progress-ring" style={{ background: 'conic-gradient(#45c8bd ' + progress + '%, #203040 0)' }}><span>{progress}<small>%</small></span></div></div><div className="knowledge-actions"><Link to="/chapters" className="button-secondary">Continue studying <ArrowRight size={15} /></Link><Link to="/quiz" className="text-link"><Target size={15} /> Take a quiz</Link></div></div>
        <div className="recent-card"><div className="recent-heading"><span className="eyebrow">RECENT QUIZ ACTIVITY</span><Link to="/quiz" aria-label="Open quizzes"><ArrowRight size={15} /></Link></div>{recent.length ? recent.slice(0, 2).map((entry, i) => <div className="recent-entry" key={entry.at + i}><span className="recent-symbol"><GraduationCap size={16} /></span><div><b>{entry.chapter === 'all' ? 'Comprehensive quiz' : chapters.find((chapter) => chapter.id === entry.chapter)?.shortTitle + ' quiz'}</b><small>{new Date(entry.at).toLocaleDateString()}</small></div><strong>{entry.score}/{entry.total}</strong></div>) : <div className="recent-empty"><div className="recent-symbol"><Sparkles size={16} /></div><p>Your quiz history will appear here after your first practice session.</p></div>}</div>
      </section>
      <div className="home-source-note"><span><Sparkles size={14} /> COURSE-ALIGNED CONTENT</span><p>Chapters are organized around the lecture files you shared, with key terminology explained in plain language.</p></div>
    </div>
  );
}

function ChapterCard({ chapter, completed }: { chapter: typeof chapters[number]; completed: boolean }) {
  return <Link to={'/chapters/' + chapter.id} className={'chapter-card ' + chapter.color}><div className="chapter-card-top"><span className="chapter-number">{chapter.number}</span><span className="chapter-duration">{completed ? <><Check size={13} /> DONE</> : chapter.duration}</span></div><div className="chapter-card-icon">{chapter.id === 'intro-bones' ? <Activity /> : chapter.id === 'joints' ? <Layers3 /> : chapter.id === 'face-anatomy' ? <Sparkles /> : <Brain />}</div><h3>{chapter.shortTitle}</h3><p>{chapter.description}</p><div className="chapter-card-bottom"><span>{completed ? 'Review chapter' : 'Open chapter'}</span><ArrowRight size={15} /></div></Link>;
}

function ChaptersPage({ completed }: { completed: ProgressMap }) {
  return <div className="overview-page"><div className="page-intro"><span className="eyebrow">THE LEARNING PATH</span><h1>Chapters that connect.</h1><p>Study in order or jump to the structure you need. Each chapter ends with a short knowledge check.</p><div className="overview-meta"><span><BookOpen size={15} /> 4 chapters</span><span><Activity size={15} /> 74 minutes of focused study</span></div></div><div className="chapter-list">{chapters.map((chapter) => <Link key={chapter.id} to={'/chapters/' + chapter.id} className={'chapter-row ' + chapter.color}><span className="chapter-row-number">{chapter.number}</span><div className="chapter-row-content"><span className="eyebrow">{chapter.source}</span><h2>{chapter.title}</h2><p>{chapter.description}</p></div><div className="chapter-row-status">{completed[chapter.id] ? <span className="status-done"><Check size={13} /> COMPLETE</span> : <span>{chapter.duration}</span>}<ArrowRight size={17} /></div></Link>)}</div><div className="overview-quiz"><div className="quiz-pulse"><Target size={22} /></div><div><span className="eyebrow">READY FOR A RECALL CHECK?</span><h2>Practice across all four chapters.</h2><p>Instant feedback with explanations for each answer.</p></div><Link to="/quiz" className="button-primary">Go to quizzes <ArrowRight size={15} /></Link></div></div>;
}

function ChapterPage({ completed, markComplete }: { completed: ProgressMap; markComplete: (id: string) => void }) {
  const { chapterId = '' } = useLocationParams();
  const chapter = chapters.find((item) => item.id === chapterId) || chapters[0];
  const next = chapters[(chapters.findIndex((item) => item.id === chapter.id) + 1) % chapters.length];
  const previous = chapters[(chapters.findIndex((item) => item.id === chapter.id) + chapters.length - 1) % chapters.length];
  const done = Boolean(completed[chapter.id]);
  const quizCount = useMemo(() => {
    try {
      const stored = readQuizHistory();
      return stored.filter((entry) => entry.chapter === chapter.id).length;
    } catch { return 0; }
  }, [chapter.id]);
  return (
    <div className="chapter-page">
      <div className={'chapter-hero ' + chapter.color}>
        <div className="chapter-hero-main"><div className="chapter-breadcrumb"><Link to="/chapters">CHAPTERS</Link><span>/</span><span>{chapter.number}</span></div><h1>{chapter.title}</h1><p>{chapter.subtitle}</p><div className="chapter-hero-actions"><a href="#chapter-content" className="button-primary">Read chapter <ArrowDownRight size={15} /></a><Link to={'/quiz?chapter=' + chapter.id} className="button-ghost"><Target size={15} /> Test yourself</Link></div></div>
        <div className="chapter-hero-side"><div className="chapter-index-display">{chapter.number}<span> / 04</span></div><div className="chapter-meta-line"><span><BookOpen size={14} /> {chapter.duration}</span><span><CircleHelp size={14} /> {quizCount} quiz attempts</span></div><button className={'complete-toggle ' + (done ? 'complete' : '')} onClick={() => markComplete(chapter.id)}>{done ? <><Check size={14} /> Chapter complete</> : 'Mark chapter complete'}</button></div>
      </div>
      <div id="chapter-content" className="chapter-intro-line"><span className="source-chip">SOURCE MATERIAL</span><span>{chapter.source}</span><Link to={'/quiz?chapter=' + chapter.id} className="inline-quiz-link">Chapter quiz <ArrowRight size={14} /></Link></div>
      <ChapterContent id={chapter.id} />
      <div className="chapter-end"><button onClick={() => markComplete(chapter.id)} className="button-secondary">{done ? <><Check size={15} /> Completed</> : 'Mark chapter complete'}</button><Link to={'/chapters/' + previous.id} className="text-link"><span>← Previous</span><small>{previous.shortTitle}</small></Link><Link to={'/chapters/' + next.id} className="next-chapter-link"><small>NEXT CHAPTER</small><span>{next.shortTitle} <ArrowRight size={15} /></span></Link></div>
    </div>
  );
}

function useLocationParams() {
  const location = useLocation();
  return { chapterId: location.pathname.split('/')[2] };
}

function QuizRoute({ onQuizComplete }: { onQuizComplete: (score: number, total: number, chapterId: string) => void }) {
  const [search] = useSearchParams();
  const chapterId = search.get('chapter') || 'all';
  return <Quiz key={chapterId} initialChapter={chapterId} onComplete={(score, total) => onQuizComplete(score, total, chapterId)} />;
}

function SearchDialog({ close }: { close: () => void }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const chapterMatches = chapters.filter((chapter) => (chapter.title + ' ' + chapter.description + ' ' + chapter.source).toLowerCase().includes(q)).map((chapter) => ({ title: chapter.title, detail: chapter.description, chapter: chapter.id, kind: 'CHAPTER' }));
    const topicMatches = studyTopics.filter((topic) => (topic.title + ' ' + topic.keywords).toLowerCase().includes(q)).map((topic) => ({ title: topic.title, detail: chapters.find((chapter) => chapter.id === topic.chapter)?.shortTitle || '', chapter: topic.chapter, kind: 'TOPIC' }));
    return [...topicMatches, ...chapterMatches].slice(0, 8);
  }, [query]);
  const openResult = (chapter: string) => { navigate('/chapters/' + chapter); close(); };
  return <div className="search-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><div className="search-dialog" role="dialog" aria-modal="true" aria-label="Search anatomy"><div className="search-dialog-input"><Search size={18} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search bones, joints, nerves…" /><button onClick={close} aria-label="Close search"><X size={17} /></button></div><div className="search-dialog-results">{query.trim() ? results.length ? results.map((result, index) => <button key={result.title + index} onClick={() => openResult(result.chapter)}><span className="search-result-icon">{result.kind === 'CHAPTER' ? <BookOpen size={16} /> : <Sparkles size={16} />}</span><span><b>{result.title}</b><small>{result.detail}</small></span><kbd>{result.kind}</kbd><ArrowRight size={14} /></button>) : <div className="search-no-results"><Search size={21} /><b>No matches for “{query}”</b><span>Try a structure name, like “mandible” or “synovial”.</span></div> : <div className="search-suggestions"><span className="eyebrow">POPULAR STUDY TERMS</span>{['Mandible', 'Buccinator', 'Synovial joint', 'Nasion', 'Epiphysis'].map((term) => <button key={term} onClick={() => setQuery(term)}><Search size={13} />{term}</button>)}</div>}</div><div className="search-dialog-footer"><span>Use search to jump into a chapter</span><span><kbd>ESC</kbd> to close</span></div></div></div>;
}

export default App;
