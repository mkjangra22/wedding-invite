import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { GaneshaIcon, PaisleyMotif, RoyalArch } from './Motifs';

export const ScratchCardScreen = ({ onEnterInvitation }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchedPercent, setScratchedPercent] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [cardDimensions, setCardDimensions] = useState({ width: 340, height: 420 });

  // Responsive card size calculation
  useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 400) {
        setCardDimensions({ width: 310, height: 390 });
      } else if (screenWidth < 640) {
        setCardDimensions({ width: 340, height: 430 });
      } else {
        setCardDimensions({ width: 380, height: 470 });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Initialize Canvas with Antique Gold Foil and Pattern
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const { width, height } = cardDimensions;

    canvas.width = width;
    canvas.height = height;

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // 1. Rich Antique Gold Foil Gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#E6CF8B');
    grad.addColorStop(0.25, '#C5A869');
    grad.addColorStop(0.5, '#F5E6B8');
    grad.addColorStop(0.75, '#9A7B38');
    grad.addColorStop(1, '#B89758');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Paper Grain & Gold Specks
    for (let i = 0; i < 600; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 1.5;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.4)' : 'rgba(92, 20, 28, 0.15)';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Ornate Double Gold Borders
    ctx.strokeStyle = 'rgba(92, 20, 28, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(18, 18, width - 36, height - 36);
    ctx.setLineDash([]);

    // 4. Subtle Paisley Motifs in Gold Foil
    ctx.fillStyle = 'rgba(92, 20, 28, 0.12)';
    ctx.font = '28px serif';
    ctx.textAlign = 'center';
    ctx.fillText('❦', width / 2, 70);
    ctx.fillText('❦', width / 2, height - 60);

    // 5. Foil Text Details
    ctx.fillStyle = '#4A121A';
    ctx.font = 'bold 13px "Cinzel", serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('AUTHENTIC WEDDING SEAL', width / 2, 120);

    ctx.font = 'italic 16px "Cormorant Garamond", serif';
    ctx.fillStyle = '#5C141C';
    ctx.fillText('Rub gently to reveal', width / 2, height / 2 - 20);

    // Subtle coin icon
    ctx.strokeStyle = '#5C141C';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2 + 30, 24, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = '14px "Cinzel", serif';
    ctx.fillText('SCRATCH', width / 2, height / 2 + 35);

    ctx.font = '10px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(74, 18, 26, 0.7)';
    ctx.fillText('USE COIN OR FINGER', width / 2, height - 30);
  }, [cardDimensions]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Petal celebration when unlocked
  const triggerPetalShower = () => {
    // Rose Petal and Gold Confetti
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#5C141C', '#9B2C3B', '#C5A869', '#F5E6B8', '#FBBF24', '#FAF6EE'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: colors,
        shapes: ['circle'],
        scalar: 1.2
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: colors,
        shapes: ['circle'],
        scalar: 1.2
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // Check Reveal Percentage
  const checkRevealPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentCount = 0;
    const sampleStep = 32; // Sample every 32nd pixel for blazing performance

    for (let i = 3; i < pixels.length; i += 4 * sampleStep) {
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const totalSampled = pixels.length / (4 * sampleStep);
    const percent = Math.min(100, Math.round((transparentCount / totalSampled) * 100));
    setScratchedPercent(percent);

    // Automatically complete scratching once 30% threshold is reached
    if (percent >= 30 && !isRevealed) {
      completeScratchAutomatically();
    }
  };

  const completeScratchAutomatically = () => {
    setIsRevealed(true);
    setIsScratching(false);

    // Smoothly animate progress counter to 100%
    let cur = 40;
    const progressInterval = setInterval(() => {
      cur += 12;
      if (cur >= 100) {
        setScratchedPercent(100);
        clearInterval(progressInterval);
      } else {
        setScratchedPercent(cur);
      }
    }, 35);

    // Fade out canvas surface completely
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.transition = 'opacity 0.6s ease-out';
      canvas.style.opacity = '0';
      canvas.style.pointerEvents = 'none';
      setTimeout(() => {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }, 650);
    }

    triggerPetalShower();
  };

  // Scratch Action Handler
  const scratchAt = (clientX, clientY) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';

    // Brush with soft falloff
    const brushRadius = 34;
    const radialGrad = ctx.createRadialGradient(x, y, 0, x, y, brushRadius);
    radialGrad.addColorStop(0, 'rgba(0,0,0,1)');
    radialGrad.addColorStop(0.7, 'rgba(0,0,0,0.9)');
    radialGrad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = radialGrad;
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();

    checkRevealPercentage();
  };

  const handleAutoReveal = () => {
    completeScratchAutomatically();
  };

  // Pointer Events (Handles both Touch and Mouse seamlessly)
  const handlePointerDown = (e) => {
    if (isRevealed) return;
    setIsScratching(true);
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    if (!isScratching || isRevealed) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsScratching(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between py-6 px-4 bg-cream-100 paper-texture overflow-y-auto min-h-screen">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Sanskrit Invocation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 pt-2"
      >
        <div className="flex justify-center mb-1.5">
          <GaneshaIcon className="w-10 h-10 text-maroon-800 drop-shadow-sm" />
        </div>
        <p className="font-sanskrit-shloka text-maroon-900 text-sm md:text-base font-semibold tracking-widest">
          ॥ श्री गणेशाय नमः ॥
        </p>
        <h1 className="font-serif text-2xl md:text-3xl text-maroon-900 mt-2 font-medium tracking-wide">
          A little secret awaits...
        </h1>
        <p className="font-sans text-xs md:text-sm text-ink-600 max-w-sm mx-auto mt-1 px-4">
          Scratch the card below to discover when our forever begins.
        </p>
      </motion.div>

      {/* Center Interactive Scratch Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative my-4 z-10"
        ref={containerRef}
      >
        {/* Card Shadow & Frame */}
        <div 
          className="relative rounded-2xl shadow-2xl p-2 bg-gradient-to-b from-[#F5E6B8] via-[#C5A869] to-[#8B6F3E] border border-gold-light"
          style={{ width: cardDimensions.width + 16, height: cardDimensions.height + 16 }}
        >
          {/* Inner Card Container */}
          <div 
            className="relative w-full h-full rounded-xl overflow-hidden bg-cream-50 flex flex-col items-center justify-between p-6 select-none"
            style={{ width: cardDimensions.width, height: cardDimensions.height }}
          >
            {/* --- UNDERLYING REVEAL CONTENT --- */}
            <div className="absolute inset-0 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-cream-50 via-cream-100 to-cream-200 border-2 border-gold/40 rounded-xl pointer-events-none">
              {/* Card Header */}
              <div className="text-center w-full">
                <div className="text-[10px] tracking-[0.3em] font-sans text-maroon-700 font-semibold uppercase">
                  Save The Date
                </div>
                <div className="w-12 h-[1px] bg-gold mx-auto my-1.5"></div>
                <div className="font-serif text-xs md:text-sm tracking-widest text-ink-600 uppercase">
                  We're Getting Married
                </div>
              </div>

              {/* Couple Monogram & Names */}
              <div className="text-center py-2">
                <div className="font-script text-4xl md:text-5xl text-maroon-900 leading-none">
                  Aarav & Ananya
                </div>
                <div className="flex items-center justify-center gap-2 my-2">
                  <div className="w-8 h-[0.5px] bg-gold-dark"></div>
                  <Heart className="w-3.5 h-3.5 text-maroon-700 fill-maroon-700" />
                  <div className="w-8 h-[0.5px] bg-gold-dark"></div>
                </div>
                <div className="font-display text-lg md:text-xl font-bold tracking-widest text-maroon-800">
                  15 • 16 • 17 FEBRUARY 2027
                </div>
              </div>

              {/* Location & Sacred Blessing */}
              <div className="text-center w-full pb-1">
                <div className="font-sans text-xs uppercase tracking-wider text-ink-700 font-medium">
                  📍 Panipat, Haryana
                </div>
                <div className="font-sanskrit text-[11px] text-gold-dark mt-2 tracking-widest">
                  ॥ शुभ विवाह ॥
                </div>
              </div>
            </div>

            {/* --- TOP CANVAS (SCRATCHABLE LAYER) --- */}
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 z-20 rounded-xl transition-opacity duration-700 ${
                isRevealed 
                  ? 'opacity-0 pointer-events-none' 
                  : 'cursor-grab active:cursor-grabbing touch-none'
              }`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            />
          </div>
        </div>

        {/* Scratch Progress Pill & Quick Reveal */}
        <div className="flex items-center justify-between text-xs text-ink-600 px-3 mt-3">
          <span className="flex items-center gap-1 font-medium text-maroon-800">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark animate-spin-slow" />
            {scratchedPercent < 40 ? "Scratch with finger or mouse" : "✨ Card Revealed!"}
          </span>
          <div className="flex items-center gap-2">
            {!isRevealed && (
              <button
                type="button"
                onClick={handleAutoReveal}
                className="text-[11px] text-maroon-800 underline decoration-gold/60 underline-offset-2 hover:text-maroon-600 transition-colors"
              >
                Quick Reveal
              </button>
            )}
            <span className="font-mono text-xs text-gold-dark bg-cream-200/80 px-2 py-0.5 rounded-full border border-gold/30">
              {scratchedPercent}%
            </span>
          </div>
        </div>
      </motion.div>

      {/* Bottom CTA / Status Area */}
      <div className="z-10 text-center w-full max-w-sm px-4 pb-2">
        <AnimatePresence>
          {isRevealed ? (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={onEnterInvitation}
                id="enter-invitation-btn"
                className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-cream-50 font-serif tracking-widest uppercase text-sm font-semibold shadow-gold-glow hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-gold/40"
              >
                <span>Enter Invitation</span>
                <ArrowRight className="w-4 h-4 text-gold-light group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
              <p className="text-[11px] text-ink-500 mt-2">
                Click to explore ceremonies, venues, family blessings &amp; RSVP
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-ink-500 italic flex items-center justify-center gap-2"
            >
              <span>✦</span>
              <span>Keep scratching to unlock the invitation</span>
              <span>✦</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
