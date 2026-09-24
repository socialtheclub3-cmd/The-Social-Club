import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import Preloader from './components/ui/Preloader';
import ScrollProgress from './components/ui/ScrollProgress';
import WhatsAppButton from './components/ui/WhatsAppButton';
import CookieConsent from './components/ui/CookieConsent';
import ExitIntentPopup from './components/ui/ExitIntentPopup';
import LiveTicker from './components/ui/LiveTicker';
import StickyCTA from './components/ui/StickyCTA';

import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen">
      {!isAdmin && <Preloader />}
      {!isAdmin && <ScrollProgress />}

      {!isAdmin && <CookieConsent />}
      {!isAdmin && <Navbar />}
      {!isAdmin && <StickyCTA />}
      {!isAdmin && <WhatsAppButton />}
      {!isAdmin && <LiveTicker />}
      {!isAdmin && <ExitIntentPopup />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
