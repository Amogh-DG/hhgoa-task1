import React from 'react';
import { RESIDENCY_SCHEDULE } from '../data/constants';
import { MapPin, Calendar, Clock, Compass } from 'lucide-react';

export const ResidencyMap: React.FC = () => {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20 z-10 relative text-left">
      <div className="mb-12 border-b border-surface-container-highest pb-6">
        <div className="font-label text-xs text-primary-container uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
          <Compass className="w-4 h-4 text-tertiary-container" />
          GOA RESIDENCY // MAP & TIMELINE SCHEDULE
        </div>
        <h1 className="font-headline text-3xl md:text-5xl font-black text-primary uppercase">
          Anjuna Beachfront Residency
        </h1>
        <p className="font-body text-sm text-on-surface-variant mt-2 max-w-2xl">
          Coordinate 15.2993° N // 73.9142° E · October 28–31, 2026.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Venue Map HUD (5 cols) */}
        <section className="lg:col-span-5 bg-surface-container border border-surface-container-highest p-6 rounded-xl space-y-6 shadow-xl">
          <div className="flex justify-between items-center border-b border-surface-container-highest pb-3">
            <div className="font-label text-xs text-primary-container font-bold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary-container" />
              LOCATION HUD
            </div>
            <span className="font-mono text-[10px] text-secondary">BEACHFRONT DOME</span>
          </div>

          {/* Stylized Map View */}
          <div className="relative w-full h-72 bg-surface-container-lowest rounded border border-surface-container-highest overflow-hidden p-4 flex flex-col justify-between">
            <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
            
            {/* Compass HUD overlay */}
            <div className="relative z-10 flex justify-between font-mono text-[10px] text-primary-container">
              <span>N 15°17'57.5"</span>
              <span>E 73°54'51.1"</span>
            </div>

            {/* Map Nodes */}
            <div className="relative z-10 space-y-3">
              <div className="p-3 bg-surface-container/90 border border-primary-container/40 rounded tech-cut">
                <div className="font-headline text-xs font-bold text-primary">Hacker House Main Villa</div>
                <div className="font-mono text-[10px] text-on-surface-variant">24/7 Gigabit Lab & Pods</div>
              </div>
              <div className="p-3 bg-surface-container/90 border border-secondary/40 rounded tech-cut">
                <div className="font-headline text-xs font-bold text-secondary">Anjuna Sunset Deck</div>
                <div className="font-mono text-[10px] text-on-surface-variant">Keynotes & Evening Demos</div>
              </div>
            </div>

            <div className="relative z-10 font-mono text-[10px] text-outline text-right">
              SYSTEM STATUS: ONLINE
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs text-on-surface-variant">
            <div className="flex items-center justify-between border-b border-surface-container-highest/60 pb-2">
              <span className="text-primary font-bold">Venue Address:</span>
              <span>Anjuna Beach Road, Goa</span>
            </div>
            <div className="flex items-center justify-between border-b border-surface-container-highest/60 pb-2">
              <span className="text-primary font-bold">Connectivity:</span>
              <span className="text-primary-container">Dedicated 2 Gbps Fiber</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary font-bold">Access Gate:</span>
              <span className="text-secondary font-bold">Gate 01 (Scan Builder Pass)</span>
            </div>
          </div>
        </section>

        {/* Right Column: 4-Day Timeline Schedule (7 cols) */}
        <section className="lg:col-span-7 space-y-6">
          {RESIDENCY_SCHEDULE.map(day => (
            <div
              key={day.date}
              className="bg-surface-container border border-surface-container-highest p-6 rounded-xl text-left shadow-lg"
            >
              <div className="flex justify-between items-center mb-4 border-b border-surface-container-highest pb-3">
                <div className="font-headline text-lg font-bold text-primary flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary-container" />
                  {day.dayTitle}
                </div>
                <span className="font-label text-xs text-secondary font-bold bg-secondary/10 px-2.5 py-1 rounded">
                  {day.date}
                </span>
              </div>

              <div className="space-y-4">
                {day.events.map((evt, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-surface-container-low border border-surface-container-highest/60 rounded flex flex-col sm:flex-row justify-between sm:items-center gap-2 hover:border-primary-container/50 transition-colors"
                  >
                    <div>
                      <div className="font-headline text-sm font-bold text-primary">{evt.title}</div>
                      <div className="font-mono text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-tertiary-container" />
                        {evt.location}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-xs text-primary-container flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {evt.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};
