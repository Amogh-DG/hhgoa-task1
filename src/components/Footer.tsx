import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full px-6 md:px-16 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-surface-container-lowest border-t border-surface-container-highest relative z-10 mt-auto">
      <div className="font-headline text-base font-bold text-primary tracking-tight">
        © 2026 BUILDER RESIDENCY | GOA INDIA
      </div>

      <div className="flex flex-wrap gap-6 font-body text-sm">
        <a
          href="https://twitter.com/hackerhousegoa"
          target="_blank"
          rel="noopener noreferrer"
          className="text-on-surface-variant hover:text-secondary transition-colors"
        >
          @HackerHouseGoa
        </a>
      </div>
    </footer>
  );
};
