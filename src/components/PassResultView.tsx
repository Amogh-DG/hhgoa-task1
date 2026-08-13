import React, { useState, useEffect } from 'react';
import { Download, Share2, Copy, Check, ArrowLeft, RefreshCcw, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { PassData } from '../types';
import { renderPassToCanvas } from '../utils/cardCanvas';
import { sounds } from '../utils/audio';

interface PassResultViewProps {
  pass: PassData;
  onEditPass: () => void;
}

export const PassResultView: React.FC<PassResultViewProps> = ({ pass, onEditPass }) => {
  const [highResDataUrl, setHighResDataUrl] = useState<string | null>(null);
  const [isGeneratingPng, setIsGeneratingPng] = useState(false);
  const [copied, setCopied] = useState(false);

  // Trigger celebration confetti on mount & render high-res 1200x2133 canvas
  useEffect(() => {
    // Confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e3ec00', '#fe00fe', '#7df4ff', '#ffffff']
      });
    } catch {
      // Ignore confetti errors if canvas fails
    }

    // Render HD Canvas PNG (1200x2133)
    renderPassToCanvas(pass, 1200, 2133)
      .then(url => setHighResDataUrl(url))
      .catch(err => console.error("HD Canvas export failed", err));
  }, [pass]);

  // Handle PNG Download
  const handleDownloadPng = async () => {
    sounds.playWhoosh();
    setIsGeneratingPng(true);

    try {
      const dataUrl = highResDataUrl || (await renderPassToCanvas(pass, 1200, 2133));
      const cleanName = (pass.name || 'Builder').replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `HackerHouse_Goa_Pass_${cleanName}.png`;

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      alert("PNG generation error. Please try again.");
    } finally {
      setIsGeneratingPng(false);
    }
  };

  // One-Click Share to X (Twitter) with #FrameInGoa
  const handleShareToX = () => {
    sounds.playClick();
    const shareText = encodeURIComponent(
      `Just forged my Official Builder Pass for Hacker House Goa 2026! 🌴⚡\n\nVector: ${pass.builderClass}\nClearance: ${pass.clearance}\n\nSee you in Goa, hackers! #FrameInGoa #HackerHouseGoa`
    );
    const tweetUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  // Native Web Share or Copy Link
  const handleShareOrCopy = async () => {
    sounds.playClick();
    const shareText = `Check out my Builder Pass for Hacker House Goa 2026! #FrameInGoa`;
    const shareUrl = window.location.href;

    if (navigator.share && navigator.canShare && navigator.canShare({ title: 'Hacker House Goa Pass', text: shareText, url: shareUrl })) {
      try {
        await navigator.share({
          title: 'Hacker House Goa 2026 Pass',
          text: shareText,
          url: shareUrl
        });
      } catch {
        // Fallback to copy
      }
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-6 md:px-16 py-12 md:py-20 min-h-screen w-full max-w-2xl mx-auto">
      
      {/* Header Text matching Stitch Screen 3 */}
      <div className="text-center mb-10">
        <div className="mb-4 inline-flex items-center gap-2 bg-surface-container-low border border-surface-container-highest px-4 py-1.5 rounded tech-cut">
          <ShieldCheck className="w-4 h-4 text-primary-container" />
          <span className="font-label text-xs text-primary-container font-bold uppercase tracking-widest">
            IMMUTABLE REGISTRY CONFIRMED
          </span>
        </div>

        <h1 className="font-headline text-4xl sm:text-6xl font-black text-primary mb-3 uppercase tracking-wider">
          Access Granted
        </h1>
        <p className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto">
          Your Builder Pass has been generated. Welcome to the Goa 2026 Residency.
        </p>
      </div>

      {/* Main Container: Pass Canvas Preview */}
      <div className="relative group w-full max-w-[420px] aspect-[9/16] rounded-xl border border-surface-container-highest bg-surface-container-low p-2 overflow-hidden shadow-2xl mb-10 transform transition-transform duration-500 hover:scale-[1.01]">
        
        {/* Holographic Overlay Effect matching Stitch Screen 3 */}
        <div className="absolute inset-0 z-20 pointer-events-none holographic-overlay opacity-60 mix-blend-screen"></div>

        {/* High Res Canvas Rendered Pass Image */}
        <div className="relative w-full h-full bg-surface rounded-lg overflow-hidden flex flex-col z-10">
          {highResDataUrl ? (
            <img
              src={highResDataUrl}
              alt="Hacker House Goa Builder Pass"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <RefreshCcw className="w-8 h-8 text-primary-container animate-spin mb-3" />
              <span className="font-label text-xs text-primary-container font-bold">GENERATING HD PASS...</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons matching Stitch Screen 3 */}
      <div className="w-full max-w-md flex flex-col gap-4">
        {/* DOWNLOAD PNG Button */}
        <button
          onClick={handleDownloadPng}
          disabled={isGeneratingPng}
          className="w-full bg-primary-container text-on-primary-container font-headline text-lg font-bold py-4 px-6 tech-cut flex items-center justify-center gap-3 hover:bg-surface-tint transition-all duration-200 shadow-xl glow-active cursor-pointer"
        >
          <Download className="w-5 h-5" />
          <span>{isGeneratingPng ? 'RENDERING PNG...' : 'DOWNLOAD PNG'}</span>
        </button>

        {/* SHARE TO X Button */}
        <button
          onClick={handleShareToX}
          className="w-full bg-transparent border-2 border-secondary text-secondary font-headline text-lg font-bold py-4 px-6 tech-cut flex items-center justify-center gap-3 hover:bg-surface-container transition-all duration-200 glow-magenta cursor-pointer"
        >
          <Share2 className="w-5 h-5" />
          <span>SHARE TO X (#FrameInGoa)</span>
        </button>

        {/* Secondary share/copy */}
        <button
          onClick={handleShareOrCopy}
          className="w-full bg-surface-container-low border border-surface-container-highest text-on-surface hover:text-primary font-label text-xs py-3 px-4 rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-primary-container" /> : <Copy className="w-4 h-4 text-tertiary-container" />}
          <span>{copied ? 'Link & Message Copied to Clipboard!' : 'Copy Share Link'}</span>
        </button>

        {/* Back / Modify Pass */}
        <button
          onClick={() => {
            sounds.playClick();
            onEditPass();
          }}
          className="mt-2 text-center font-body text-sm text-outline hover:text-primary transition-colors flex items-center justify-center gap-2 underline underline-offset-4 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Modify Credentials / Create Another Pass</span>
        </button>
      </div>
    </main>
  );
};
