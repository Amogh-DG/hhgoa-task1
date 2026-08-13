import React from 'react';
import { HACK_TRACKS } from '../data/constants';
import { sounds } from '../utils/audio';

interface HackTracksProps {
  onSelectTrack: (trackId: string) => void;
}

export const HackTracks: React.FC<HackTracksProps> = ({ onSelectTrack }) => {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20 z-10 relative text-left">
      <div className="mb-12 border-b border-surface-container-highest pb-6">
        <div className="font-label text-xs text-primary-container uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">terminal</span>
          RESIDENCY HACK TRACKS // $80,000 TOTAL BOUNTY
        </div>
        <h1 className="font-headline text-3xl md:text-5xl font-black text-primary uppercase">
          Build For The Goan Sun
        </h1>
        <p className="font-body text-sm text-on-surface-variant mt-2 max-w-2xl">
          Four dedicated engineering tracks designed for high-impact protocols, autonomous systems, and zero-latency web applications.
        </p>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {HACK_TRACKS.map(track => (
          <div
            key={track.id}
            className="p-8 bg-surface-container border border-surface-container-highest rounded-xl hover:border-primary-container transition-all group flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded bg-primary-container/10 border border-primary-container/30 flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-2xl">{track.icon}</span>
                </div>
                <span className="font-label text-xs text-secondary border border-secondary/50 bg-secondary/10 px-3 py-1 rounded tech-cut font-bold">
                  BOUNTY: {track.bounty}
                </span>
              </div>

              <h2 className="font-headline text-2xl font-bold text-primary mb-3 group-hover:text-primary-container transition-colors">
                {track.title}
              </h2>
              <p className="font-body text-sm text-on-surface-variant mb-6 leading-relaxed">
                {track.description}
              </p>
            </div>

            <div>
              <div className="font-label text-[10px] text-outline uppercase tracking-wider mb-2">
                REQUIRED TELEMETRY & STACK
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {track.techKeywords.map(kw => (
                  <span
                    key={kw}
                    className="px-2.5 py-1 bg-surface-container-high border border-surface-container-highest text-tertiary-container font-mono text-xs rounded"
                  >
                    #{kw}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  sounds.playClick();
                  onSelectTrack(track.id);
                }}
                className="w-full bg-surface-container-high hover:bg-primary-container text-primary hover:text-on-primary-container font-label text-xs uppercase py-3 rounded tech-cut transition-all flex items-center justify-center gap-2 font-bold"
              >
                <span>Forge Credentials For This Track</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
