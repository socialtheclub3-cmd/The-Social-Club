import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Preloader from './components/ui/Preloader';
import ScrollProgress from './components/ui/ScrollProgress';
import WhatsAppButton from './components/ui/WhatsAppButton';
import CookieConsent from './components/ui/CookieConsent';
import ExitIntentPopup from './components/ui/ExitIntentPopup';
import LiveTicker from './components/ui/LiveTicker';
import StickyCTA from './components/ui/StickyCTA';
import Chatbot from './components/ui/Chatbot';
import EasterEgg from './components/ui/EasterEgg';

// Lazy loaded secondary & admin pages for fast initial load
const Admin = lazy(() => import('./pages/Admin'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const scrollTimer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
      return () => clearTimeout(scrollTimer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      {!isAdmin && <Preloader />}
      {!isAdmin && <ScrollProgress />}

      {!isAdmin && <CookieConsent />}
      {!isAdmin && <Navbar />}
      {!isAdmin && <StickyCTA />}
      {!isAdmin && <WhatsAppButton />}
      {!isAdmin && <Chatbot />}
      {!isAdmin && <LiveTicker />}
      {!isAdmin && <ExitIntentPopup />}
      {!isAdmin && <EasterEgg />}
      <Suspense fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#A78BFA] border-t-transparent animate-spin" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
