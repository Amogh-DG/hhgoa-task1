import React from 'react';
import { ArrowRight, ShieldCheck, Download, Share2, Smartphone } from 'lucide-react';
import { sounds } from '../utils/audio';

interface HeroLandingProps {
  onStartGenerator: () => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({ onStartGenerator }) => {
  const handleCtaClick = () => {
    sounds.playClick();
    onStartGenerator();
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center relative z-10 py-20 md:py-28 text-center px-6 md:px-16 max-w-5xl mx-auto w-full">

      {/* Official Badge */}
      <div className="mb-8 inline-flex items-center gap-2 bg-surface-container-low border border-surface-container-highest px-4 py-2 rounded-sm">
        <div className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></div>
        <span className="font-label text-xs text-secondary uppercase tracking-widest font-bold">
          Official Builder Pass · 28–31 Oct 2026
        </span>
      </div>

      {/* Hero Title */}
      <h1 className="font-display font-black text-primary-container mb-6 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 tracking-tight leading-none">
        <span className="text-4xl sm:text-6xl md:text-7xl">HACKER HOUSE</span>
        <span
          className="text-secondary-container font-sans"
          style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', textShadow: '0 0 30px rgba(254,0,254,0.35)' }}
        >
          गोवा
        </span>
      </h1>

      {/* Tagline */}
      <p className="font-body text-base md:text-lg text-on-surface-variant mb-10 max-w-2xl leading-relaxed">
        The exclusive builder residency under the Goan sun. Elite developers, founders, and creative technologists converging for high-stakes engineering.
      </p>

      {/* Primary CTA */}
      <button
        onClick={handleCtaClick}
        className="bg-primary-container text-on-primary-container font-label text-sm uppercase tracking-widest px-10 py-5 tech-cut hover:bg-surface-tint transition-all duration-300 glow-active flex items-center gap-3 font-bold group shadow-lg cursor-pointer mb-16"
      >
        <span>Create My Pass</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
      </button>

      {/* Feature cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        {[
          {
            icon: <ShieldCheck className="w-5 h-5" />,
            color: 'primary-container',
            title: '100% Private',
            desc: 'Your photo stays in your browser. Nothing is uploaded to any server.'
          },
          {
            icon: <Download className="w-5 h-5" />,
            color: 'secondary',
            title: 'HD Canvas PNG',
            desc: 'Crisp 1200×2133 vertical pass rendered entirely in HTML5 Canvas.'
          },
          {
            icon: <Share2 className="w-5 h-5" />,
            color: 'tertiary-container',
            title: 'Share to X',
            desc: 'One-click share with #FrameInGoa. Native Web Share on mobile.'
          },
          {
            icon: <Smartphone className="w-5 h-5" />,
            color: 'primary-container',
            title: 'Offline PWA',
            desc: 'Install as an app. Works offline at gate check-in.'
          }
        ].map(({ icon, color, title, desc }) => (
          <div
            key={title}
            className="p-5 bg-surface-container-low border border-surface-container-highest rounded-lg hover:border-primary-container/60 transition-colors group"
          >
            <div className={`w-10 h-10 rounded bg-surface-container border border-surface-container-highest flex items-center justify-center text-${color} mb-4 group-hover:scale-110 transition-transform`}>
              {icon}
            </div>
            <h3 className="font-headline font-bold text-primary text-sm mb-1">{title}</h3>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
};
