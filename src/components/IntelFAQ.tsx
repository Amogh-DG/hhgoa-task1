import React, { useState } from 'react';
import { INTEL_FAQS } from '../data/constants';
import { ChevronDown, Shield, FileText, CheckCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

export const IntelFAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    sounds.playClick();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20 z-10 relative text-left">
      <div className="mb-12 border-b border-surface-container-highest pb-6">
        <div className="font-label text-xs text-primary-container uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
          <FileText className="w-4 h-4 text-secondary-container" />
          RESIDENCY INTEL & RULES // FAQ
        </div>
        <h1 className="font-headline text-3xl md:text-5xl font-black text-primary uppercase">
          Hacker House Protocol
        </h1>
        <p className="font-body text-sm text-on-surface-variant mt-2 max-w-2xl">
          Everything you need to know about pass generation, residency check-in, venue amenities, and builder rules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Residency Rules Card (5 cols) */}
        <section className="lg:col-span-5 bg-surface-container border border-surface-container-highest p-6 rounded-xl space-y-6 shadow-xl">
          <div className="font-label text-xs text-primary-container font-bold flex items-center gap-2 border-b border-surface-container-highest pb-3">
            <Shield className="w-4 h-4 text-primary-container" />
            OPERATOR CODE OF CONDUCT
          </div>

          <ul className="space-y-4 font-body text-xs text-on-surface-variant">
            <li className="flex items-start gap-3 p-3 bg-surface-container-low rounded border border-surface-container-highest/60">
              <CheckCircle className="w-4 h-4 text-primary-container shrink-0 mt-0.5" />
              <div>
                <strong className="text-primary block font-headline text-sm">Ship Verifiable Code:</strong>
                All projects submitted for bounties must contain open-source repositories or verifiable proof of execution.
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-surface-container-low rounded border border-surface-container-highest/60">
              <CheckCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <div>
                <strong className="text-primary block font-headline text-sm">Offline Pass Presentation:</strong>
                Keep your Builder Pass saved to your device or installed as a PWA for rapid venue entrance.
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-surface-container-low rounded border border-surface-container-highest/60">
              <CheckCircle className="w-4 h-4 text-tertiary-container shrink-0 mt-0.5" />
              <div>
                <strong className="text-primary block font-headline text-sm">Zero-Ego Mentality:</strong>
                Hacker House Goa is built on radical collaboration. Share knowledge and mentor fellow builders.
              </div>
            </li>
          </ul>
        </section>

        {/* Right Column: FAQ Accordion (7 cols) */}
        <section className="lg:col-span-7 space-y-4">
          {INTEL_FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-surface-container border border-surface-container-highest rounded-xl overflow-hidden shadow-md transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 hover:bg-surface-container-high transition-colors focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-label text-[10px] text-secondary border border-secondary/40 px-2 py-0.5 rounded">
                      {faq.category}
                    </span>
                    <span className="font-headline font-bold text-base text-primary">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-primary-container transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 border-t border-surface-container-highest/60 font-body text-sm text-on-surface-variant leading-relaxed bg-surface-container-low/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
};
