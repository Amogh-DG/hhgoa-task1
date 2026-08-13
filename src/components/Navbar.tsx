import React from 'react';
import { Volume2, VolumeX, Download } from 'lucide-react';
import { sounds } from '../utils/audio';

interface NavbarProps {
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  deferredPrompt: any;
  handleInstallPWA: () => void;
  isPWAInstalled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  setSoundEnabled,
  deferredPrompt,
  handleInstallPWA,
  isPWAInstalled
}) => {
  const toggleSound = () => {
    setSoundEnabled(prev => {
      sounds.enabled = !prev;
      if (!prev) sounds.playClick();
      return !prev;
    });
  };

  return (
    <header className="flex justify-between items-center w-full px-6 md:px-16 py-4 sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-surface-container-highest">
      {/* Brand Logo */}
      <div className="font-display text-2xl md:text-3xl italic font-black tracking-tighter text-primary-container">
        GOA<span className="text-secondary">_2026</span>
        <span className="hidden sm:inline-block ml-3 font-label text-[10px] not-italic uppercase tracking-widest text-secondary border border-secondary/40 px-2 py-0.5 rounded align-middle">
          Residency
        </span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* PWA Install */}
        {deferredPrompt && !isPWAInstalled && (
          <button
            onClick={handleInstallPWA}
            className="bg-secondary/15 hover:bg-secondary/30 text-secondary border border-secondary/50 font-label text-xs px-3 py-1.5 rounded tech-cut flex items-center gap-1.5 transition-all cursor-pointer"
            title="Install as App"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">INSTALL APP</span>
          </button>
        )}

        {/* Sound toggle */}
        <button
          onClick={toggleSound}
          className="p-2 rounded border border-surface-container-highest text-on-surface-variant hover:text-primary hover:border-primary-container transition-colors cursor-pointer"
          title={soundEnabled ? 'Mute audio' : 'Enable audio'}
        >
          {soundEnabled
            ? <Volume2 className="w-4 h-4 text-primary-container" />
            : <VolumeX className="w-4 h-4 text-outline" />
          }
        </button>

        {/* Live indicator */}
        <div className="hidden sm:flex items-center gap-2 bg-surface-container-low px-3 py-1.5 border border-surface-container-highest rounded">
          <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
          <span className="font-mono text-[11px] text-secondary font-bold">LIVE</span>
        </div>
      </div>
    </header>
  );
};
