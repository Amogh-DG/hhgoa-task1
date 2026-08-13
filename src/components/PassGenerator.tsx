import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RefreshCw, Sparkles, Sliders, Plus, X, MemoryStick as Memory, Shield, Wand2 } from 'lucide-react';
import type { PassData, PhotoFilter, ClearanceLevel } from '../types';
import { VECTOR_OPTIONS, POPULAR_TECH_STACKS } from '../data/constants';
import { sounds } from '../utils/audio';
import { renderPassToCanvas } from '../utils/cardCanvas';

interface PassGeneratorProps {
  pass: PassData;
  setPass: React.Dispatch<React.SetStateAction<PassData>>;
  onForgeSuccess: () => void;
}

export const PassGenerator: React.FC<PassGeneratorProps> = ({ pass, setPass, onForgeSuccess }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [customTagInput, setCustomTagInput] = useState('');


  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Render live canvas preview whenever pass state changes
  useEffect(() => {
    let isCurrent = true;
    setIsRendering(true);

    const timer = setTimeout(() => {
      renderPassToCanvas(pass, 800, 1422)
        .then(url => {
          if (isCurrent) {
            setPreviewUrl(url);
            setIsRendering(false);
          }
        })
        .catch(err => {
          console.error("Canvas preview error", err);
          if (isCurrent) setIsRendering(false);
        });
    }, 150);

    return () => {
      isCurrent = false;
      clearTimeout(timer);
    };
  }, [pass]);

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    sounds.playClick();
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPass(prev => ({ ...prev, photoUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  // Handle WebCam Capture
  const startCamera = async () => {
    sounds.playClick();
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 400, height: 400 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      alert("Camera access was not granted or is unavailable on this device.");
      setCameraActive(false);
    }
  };

  const captureCameraPhoto = () => {
    sounds.playClick();
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, 400, 400);
      const dataUrl = canvas.toDataURL('image/png');
      setPass(prev => ({ ...prev, photoUrl: dataUrl }));
    }

    // Stop stream
    const stream = videoRef.current.srcObject as MediaStream;
    stream?.getTracks().forEach(t => t.stop());
    setCameraActive(false);
  };

  const cancelCamera = () => {
    sounds.playClick();
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(t => t.stop());
    }
    setCameraActive(false);
  };

  // Vector / Role Select
  const handleVectorChange = (vectorId: string) => {
    sounds.playClick();
    const vec = VECTOR_OPTIONS.find(v => v.id === vectorId);
    if (vec) {
      setPass(prev => ({
        ...prev,
        vector: vectorId,
        builderClass: vec.defaultClass,
        clearance: vec.clearance
      }));
    }
  };

  // Tech Stack Toggle
  const toggleTechStack = (tech: string) => {
    sounds.playClick();
    setPass(prev => {
      const exists = prev.techStack.includes(tech);
      if (exists) {
        return { ...prev, techStack: prev.techStack.filter(t => t !== tech) };
      } else {
        if (prev.techStack.length >= 6) return prev; // max 6 tags
        return { ...prev, techStack: [...prev.techStack, tech] };
      }
    });
  };

  const addCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTagInput.trim()) return;
    sounds.playClick();
    const cleanTag = customTagInput.trim();
    if (!pass.techStack.includes(cleanTag) && pass.techStack.length < 6) {
      setPass(prev => ({ ...prev, techStack: [...prev.techStack, cleanTag] }));
    }
    setCustomTagInput('');
  };

  // Generate random Serial Hash
  const randomizeSerial = () => {
    sounds.playClick();
    const hex = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
    setPass(prev => ({
      ...prev,
      serialNumber: `HX-${hex}-OMEGA-2026`,
      securityHash: `0x${hex}..GOA`
    }));
  };

  const handleForge = () => {
    sounds.playForgeSuccess();
    onForgeSuccess();
  };

  return (
    <main className="flex-grow w-full max-w-5xl mx-auto px-6 md:px-16 py-10 md:py-16 z-10 relative">
      {/* Header Info matching Stitch Screen 2 */}
      <div className="mb-10 text-left border-b border-surface-container-highest/80 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="font-label text-xs text-primary-container uppercase tracking-widest mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container pulse-dot"></span>
            IDENTITY MATRIX // PASS GENERATOR
          </div>
          <h1 className="font-headline text-3xl md:text-5xl font-black text-primary uppercase tracking-tight">
            Initialize Operator Credentials
          </h1>
          <p className="font-body text-sm text-on-surface-variant mt-2 max-w-2xl">
            Configure your biometric uplink, engineering vectors, and stack telemetry. Data is logged 100% client-side.
          </p>
        </div>

        <button
          onClick={randomizeSerial}
          className="border border-surface-container-highest bg-surface-container-low hover:border-primary-container text-on-surface hover:text-primary font-label text-xs uppercase px-4 py-2 rounded flex items-center gap-2 transition-colors cursor-pointer"
          title="Regenerate Security Hash & Serial"
        >
          <RefreshCw className="w-3.5 h-3.5 text-primary-container" />
          <span>Regen Serial</span>
        </button>
      </div>

      {/* Main Grid: Form Left, Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Left Column: Form Controls (7 cols) */}
        <section className="lg:col-span-7 flex flex-col gap-8 text-left">
          
          {/* Section 1: Biometric Uplink (Photo Upload) */}
          <div className="bg-surface-container border border-surface-container-highest p-6 rounded-lg relative overflow-hidden shadow-lg">
            <div className="font-label text-xs text-primary-container uppercase tracking-widest mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2 font-bold">
                <Camera className="w-4 h-4 text-secondary-container" />
                1. BIOMETRIC UPLINK (PHOTO)
              </span>
              <span className="text-[10px] text-on-surface-variant font-mono">CLIENT-SIDE ENCRYPTED</span>
            </div>

            {/* Camera Video Stream modal if active */}
            {cameraActive ? (
              <div className="relative w-full h-64 bg-black rounded border border-primary-container overflow-hidden flex flex-col items-center justify-center">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
                <div className="absolute bottom-4 flex gap-3 z-10">
                  <button
                    type="button"
                    onClick={captureCameraPhoto}
                    className="bg-primary-container text-on-primary-container font-label text-xs px-4 py-2 rounded tech-cut font-bold flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Camera className="w-4 h-4" /> SNAP PHOTO
                  </button>
                  <button
                    type="button"
                    onClick={cancelCamera}
                    className="bg-surface-container-highest text-primary font-label text-xs px-4 py-2 rounded tech-cut cursor-pointer"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            ) : (
              /* Photo Dropzone matching Stitch Screen 2 */
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative w-full sm:w-56 h-56 border-2 border-dashed border-surface-container-highest hover:border-primary-container bg-surface-container-low hover:bg-surface-container-high transition-all duration-300 flex flex-col items-center justify-center cursor-pointer rounded-lg overflow-hidden shrink-0"
                >
                  {pass.photoUrl ? (
                    <img src={pass.photoUrl} alt="Uploaded Biometric" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-on-surface-variant group-hover:text-primary-container mb-2 transition-colors" />
                      <span className="font-label text-xs text-on-surface-variant group-hover:text-primary-container uppercase tracking-widest transition-colors font-bold text-center px-4">
                        Upload Photo
                      </span>
                      <span className="font-mono text-[10px] text-outline mt-1">PNG, JPG or WEBP</span>
                    </>
                  )}
                  {/* Corner decorative accents */}
                  <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-primary-container opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-primary-container opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Upload Controls & Filters */}
                <div className="flex-grow w-full flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-surface-container-high border border-surface-container-highest hover:border-primary-container text-primary font-label text-xs px-4 py-2 rounded tech-cut flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-primary-container" />
                      <span>Choose File</span>
                    </button>

                    <button
                      type="button"
                      onClick={startCamera}
                      className="bg-surface-container-high border border-surface-container-highest hover:border-secondary text-primary font-label text-xs px-4 py-2 rounded tech-cut flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-secondary" />
                      <span>Use Webcam</span>
                    </button>

                    {pass.photoUrl && (
                      <button
                        type="button"
                        onClick={() => setPass(prev => ({ ...prev, photoUrl: null }))}
                        className="text-error hover:underline font-label text-xs px-2 py-2 cursor-pointer"
                      >
                        Reset Photo
                      </button>
                    )}
                  </div>

                  {/* Photo Filter Selection */}
                  <div>
                    <label className="font-label text-[11px] text-on-surface-variant uppercase tracking-wider block mb-2">
                      Cyber Photo Filter
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {(['cyber', 'matrix', 'sunset', 'noir', 'raw'] as PhotoFilter[]).map(filter => (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => {
                            sounds.playClick();
                            setPass(prev => ({ ...prev, photoFilter: filter }));
                          }}
                          className={`py-1.5 px-2 rounded font-label text-[10px] uppercase border transition-all cursor-pointer ${
                            pass.photoFilter === filter
                              ? 'bg-primary-container text-on-primary-container border-primary-container font-bold shadow'
                              : 'bg-surface-container-low border-surface-container-highest text-on-surface-variant hover:text-primary'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Photo Zoom slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-label text-[11px] text-on-surface-variant uppercase tracking-wider">
                        Framing Scale
                      </label>
                      <span className="font-mono text-xs text-primary-container">{pass.zoom}x</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="2"
                      step="0.05"
                      value={pass.zoom}
                      onChange={e => setPass(prev => ({ ...prev, zoom: parseFloat(e.target.value) }))}
                      className="w-full accent-primary-container bg-surface-container-highest h-1.5 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Operator Designation & Handles */}
          <div className="bg-surface-container border border-surface-container-highest p-6 rounded-lg space-y-6 shadow-lg">
            <div className="font-label text-xs text-primary-container uppercase tracking-widest flex items-center gap-2 font-bold">
              <Sparkles className="w-4 h-4 text-primary-container" />
              2. OPERATOR IDENTITY & HANDLES
            </div>

            <div className="relative">
              <label className="block font-label text-xs text-primary-container uppercase tracking-wider mb-2 font-bold">
                Operator Designation (Full Name / Alias) *
              </label>
              <input
                type="text"
                value={pass.name}
                onChange={e => setPass(prev => ({ ...prev, name: e.target.value }))}
                placeholder="ENTER YOUR ALIAS..."
                className="w-full bg-surface-container-low border border-surface-container-highest focus:border-primary-container focus:ring-1 focus:ring-primary-container text-primary font-headline text-lg px-4 py-3 rounded placeholder:text-on-surface-variant/40 transition-colors uppercase font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-label text-xs text-on-surface-variant uppercase tracking-wider mb-1">
                  X / Twitter Handle
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-primary-container font-mono text-sm">@</span>
                  <input
                    type="text"
                    value={pass.xHandle}
                    onChange={e => setPass(prev => ({ ...prev, xHandle: e.target.value.replace('@', '') }))}
                    placeholder="arivers_dev"
                    className="w-full bg-surface-container-low border border-surface-container-highest focus:border-primary-container text-primary font-mono text-sm pl-8 pr-3 py-2 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block font-label text-xs text-on-surface-variant uppercase tracking-wider mb-1">
                  GitHub Handle
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-tertiary-container font-mono text-sm">gh/</span>
                  <input
                    type="text"
                    value={pass.githubHandle}
                    onChange={e => setPass(prev => ({ ...prev, githubHandle: e.target.value.replace('gh/', '') }))}
                    placeholder="arivers"
                    className="w-full bg-surface-container-low border border-surface-container-highest focus:border-primary-container text-primary font-mono text-sm pl-11 pr-3 py-2 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Engineering Vector & Builder Class */}
          <div className="bg-surface-container border border-surface-container-highest p-6 rounded-lg space-y-6 shadow-lg">
            <div className="font-label text-xs text-primary-container uppercase tracking-widest flex items-center gap-2 font-bold">
              <Sliders className="w-4 h-4 text-secondary" />
              3. ENGINEERING VECTOR & CLEARANCE
            </div>

            {/* Vector Dropdown / Selector matching Stitch Screen 2 */}
            <div>
              <label className="block font-label text-xs text-primary-container uppercase tracking-wider mb-2 font-bold">
                Primary Engineering Vector (Role)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VECTOR_OPTIONS.map(vec => (
                  <button
                    key={vec.id}
                    type="button"
                    onClick={() => handleVectorChange(vec.id)}
                    className={`p-3 rounded border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      pass.vector === vec.id
                        ? 'bg-surface-container-high border-primary-container text-primary shadow-md'
                        : 'bg-surface-container-low border-surface-container-highest text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-primary-container text-xl mt-0.5">
                      {vec.icon}
                    </span>
                    <div>
                      <div className="font-headline font-bold text-xs text-primary">{vec.label}</div>
                      <div className="font-mono text-[10px] text-secondary mt-0.5">{vec.defaultClass}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Builder Class Input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-label text-xs text-on-surface-variant uppercase tracking-wider">
                  Custom Builder Class Title
                </label>
                <span className="font-mono text-[10px] text-tertiary-container">AUTO-SYNTHESIZED</span>
              </div>
              <input
                type="text"
                value={pass.builderClass}
                onChange={e => setPass(prev => ({ ...prev, builderClass: e.target.value }))}
                placeholder="e.g. PROTOCOL CYBER-ARCHITECT"
                className="w-full bg-surface-container-low border border-surface-container-highest focus:border-primary-container text-primary font-mono text-sm px-4 py-2.5 rounded uppercase font-bold"
              />
            </div>

            {/* Clearance Tier Selector */}
            <div>
              <label className="block font-label text-xs text-on-surface-variant uppercase tracking-wider mb-2">
                Clearance Tier
              </label>
              <div className="flex flex-wrap gap-2">
                {(['TIER 01 - OMEGA', 'TIER 02 - ALPHA', 'TIER 03 - VIP', 'CORE OPERATOR'] as ClearanceLevel[]).map(tier => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      setPass(prev => ({ ...prev, clearance: tier }));
                    }}
                    className={`px-3 py-1.5 rounded font-label text-xs uppercase border transition-all cursor-pointer ${
                      pass.clearance === tier
                        ? 'bg-secondary-container/20 text-secondary border-secondary font-bold'
                        : 'bg-surface-container-low border-surface-container-highest text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Tech Stack Tags Telemetry */}
          <div className="bg-surface-container border border-surface-container-highest p-6 rounded-lg space-y-4 shadow-lg">
            <div className="font-label text-xs text-primary-container uppercase tracking-widest flex items-center justify-between font-bold">
              <span className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-tertiary-container" />
                4. TECH STACK TELEMETRY (SELECT UP TO 5)
              </span>
              <span className="font-mono text-xs text-secondary">{pass.techStack.length}/5 SELECTED</span>
            </div>

            {/* Active Stack Chips */}
            <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-surface-container-low border border-surface-container-highest/60 rounded">
              {pass.techStack.length === 0 ? (
                <span className="font-mono text-xs text-outline italic">No tech stack selected. Click below to add tags.</span>
              ) : (
                pass.techStack.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-high border border-tertiary-container/60 text-tertiary-container font-mono text-xs rounded font-bold"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => toggleTechStack(tag)}
                      className="hover:text-error transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Popular Preset Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {POPULAR_TECH_STACKS.map(tech => {
                const isSelected = pass.techStack.includes(tech);
                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => toggleTechStack(tech)}
                    className={`px-2.5 py-1 rounded font-mono text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-tertiary-container text-on-tertiary font-bold'
                        : 'bg-surface-container-low border border-surface-container-highest text-on-surface-variant hover:text-primary hover:border-primary-container'
                    }`}
                  >
                    {isSelected ? `✓ ${tech}` : `+ ${tech}`}
                  </button>
                );
              })}
            </div>

            {/* Custom Tag Form */}
            <form onSubmit={addCustomTag} className="flex gap-2 pt-2">
              <input
                type="text"
                value={customTagInput}
                onChange={e => setCustomTagInput(e.target.value)}
                placeholder="Add custom tech tag (e.g. Zig, eBPF)..."
                className="flex-grow bg-surface-container-low border border-surface-container-highest focus:border-primary-container text-primary font-mono text-xs px-3 py-2 rounded"
              />
              <button
                type="submit"
                className="bg-surface-container-high border border-surface-container-highest hover:border-primary-container text-primary font-label text-xs px-4 py-2 rounded tech-cut flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-primary-container" />
                <span>Add</span>
              </button>
            </form>
          </div>

          {/* Action Button matching Stitch Screen 2 cut corner design */}
          <button
            type="button"
            onClick={handleForge}
            className="tech-cut bg-primary-container text-on-primary-container font-label text-base px-8 py-5 w-full hover:bg-primary transition-all duration-300 flex items-center justify-between glitch-hover group shadow-2xl font-bold cursor-pointer glow-active"
          >
            <span className="uppercase tracking-widest text-lg">Forge Credential</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase opacity-80">VALIDATE PASS</span>
              <Memory className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </div>
          </button>

        </section>

        {/* Right Column: Live Interactive Card Preview (5 cols) matching Stitch Screen 2 */}
        <section className="lg:col-span-5 relative lg:sticky lg:top-24">
          {/* Glowing background blur */}
          <div className="absolute -inset-4 bg-primary-container/10 blur-3xl z-0 rounded-full pointer-events-none"></div>

          <div className="relative z-10 bg-surface-container border border-surface-container-highest p-6 rounded-xl flex flex-col shadow-[0_0_40px_rgba(0,49,31,0.6)]">
            {/* Header controls for preview */}
            <div className="flex justify-between items-center mb-4 border-b border-surface-container-highest pb-3">
              <div className="font-label text-xs text-secondary-container flex items-center gap-2 font-bold">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary-container pulse-dot"></div>
                LIVE REAL-TIME PREVIEW
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPass(prev => ({ ...prev, hologramActive: !prev.hologramActive }))}
                  className={`px-2 py-1 rounded font-label text-[10px] uppercase border transition-colors cursor-pointer ${
                    pass.hologramActive
                      ? 'bg-secondary/20 text-secondary border-secondary'
                      : 'bg-surface-container-low text-outline border-surface-container-highest'
                  }`}
                  title="Toggle Holographic Foil Overlay"
                >
                  Foil Hologram
                </button>

                <button
                  type="button"
                  //onClick={() => setCardFlipped(!cardFlipped)}
                  className="p-1.5 rounded bg-surface-container-low border border-surface-container-highest hover:border-primary-container text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  title="Flip Pass Preview"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Live Canvas Image Output Container */}
            <div className="relative w-full aspect-[9/16] bg-surface rounded-lg overflow-hidden border border-surface-container-highest shadow-2xl flex items-center justify-center group">
              
              {/* Scanline overlay animation */}
              <div className="absolute inset-x-0 h-16 scanline pointer-events-none z-20 opacity-70"></div>

              {/* Rendering spinner indicator */}
              {isRendering && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-xs flex flex-col items-center justify-center z-30">
                  <RefreshCw className="w-8 h-8 text-primary-container animate-spin mb-2" />
                  <span className="font-label text-xs text-primary-container font-bold">SYNTHESIZING PASS...</span>
                </div>
              )}

              {/* Card Canvas Image Render */}
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Live Pass Preview"
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                />
              ) : (
                <div className="text-center p-6 text-on-surface-variant font-mono text-xs">
                  Initializing canvas renderer...
                </div>
              )}
            </div>

            {/* Bottom HUD info badge */}
            <div className="mt-4 pt-3 border-t border-surface-container-highest/60 flex justify-between items-center font-mono text-[11px] text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-primary-container" />
                {pass.serialNumber}
              </span>
              <span className="text-secondary font-bold">{pass.clearance}</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
