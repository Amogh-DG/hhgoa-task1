import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroLanding } from './components/HeroLanding';
import { PassGenerator } from './components/PassGenerator';
import { PassResultView } from './components/PassResultView';
import { Footer } from './components/Footer';
import { DEFAULT_PASS } from './data/constants';
import type { PassData } from './types';

export function App() {
  const [pass, setPass] = useState<PassData>(DEFAULT_PASS);
  const [passForged, setPassForged] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // PWA Install state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isPWAInstalled, setIsPWAInstalled] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsPWAInstalled(true);
    }
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setIsPWAInstalled(true);
    setDeferredPrompt(null);
  };

  const handleStartGenerator = () => {
    setPassForged(false);
    const genSection = document.getElementById('pass-generator-form');
    if (genSection) genSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleForgeSuccess = () => {
    setPassForged(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col relative overflow-x-hidden">

      {/* Background Blueprint Grid */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0"></div>

      {/* Spotlight glow */}
      <div className="fixed inset-0 pointer-events-none z-0 spotlight"></div>

      {/* Header */}
      <Navbar
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        deferredPrompt={deferredPrompt}
        handleInstallPWA={handleInstallPWA}
        isPWAInstalled={isPWAInstalled}
      />

      {/* Main content */}
      <div className="relative z-10 flex-grow flex flex-col">
        {passForged ? (
          <PassResultView
            pass={pass}
            onEditPass={() => setPassForged(false)}
          />
        ) : (
          <>
            <HeroLanding onStartGenerator={handleStartGenerator} />
            <div id="pass-generator-form" className="w-full border-t border-surface-container-highest/80 bg-surface-container-lowest/40">
              <PassGenerator
                pass={pass}
                setPass={setPass}
                onForgeSuccess={handleForgeSuccess}
              />
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
