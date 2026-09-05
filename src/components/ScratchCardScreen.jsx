import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowRight, Heart } from 'lucide-react';
import { GaneshaIcon, PaisleyMotif, RoyalArch } from './Motifs';

export const ScratchCardScreen = ({ onEnterInvitation }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchedPercent, setScratchedPercent] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [cardDimensions, setCardDimensions] = useState({ width: 260, height: 330 });

  // Responsive card size calculation (reduced by ~25%)
  useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 400) {
        setCardDimensions({ width: 235, height: 300 });
      } else if (screenWidth < 640) {
        setCardDimensions({ width: 260, height: 330 });
      } else {
        setCardDimensions({ width: 285, height: 360 });
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
    for (let i = 0; i < 400; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 1.2;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.4)' : 'rgba(92, 20, 28, 0.15)';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Ornate Double Gold Borders
    ctx.strokeStyle = 'rgba(92, 20, 28, 0.35)';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(9, 9, width - 18, height - 18);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([3, 3]);
    ctx.strokeRect(14, 14, width - 28, height - 28);
    ctx.setLineDash([]);

    // 4. Subtle Paisley Motifs in Gold Foil
    ctx.fillStyle = 'rgba(92, 20, 28, 0.12)';
    ctx.font = '22px serif';
    ctx.textAlign = 'center';
    ctx.fillText('', width / 2, 48);
    ctx.fillText(' ', width / 2, height - 42);

    // 5. Foil Text Details
    ctx.fillStyle = '#4A121A';
    ctx.font = 'bold 15px "Cinzel", serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('Scratch to Reveal', width / 2, 78);

    ctx.font = 'italic 13px "Cormorant Garamond", serif';
    ctx.fillStyle = '#5C141C';
    // ctx.fillText('Rub gently to reveal', width / 2, height / 2 - 16);

    // Subtle coin icon
    ctx.strokeStyle = '#5C141C';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(width / 2, height / 2 + 20, 18, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = '10px "Cinzel", serif';
    // ctx.fillText('SCRATCH', width / 2, height / 2 + 24);

    ctx.font = '9px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(74, 18, 26, 0.7)';
    ctx.fillText('USE FINGERS TO SCRATCH ', width / 2, height - 20);
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
    const brushRadius = 26;
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
          {/* <GaneshaIcon className="w-10 h-10 text-maroon-800 drop-shadow-sm" /> */}
        </div>
        <p className="font-sanskrit-shloka text-maroon-900 text-sm md:text-base font-semibold tracking-widest">
          ॥ श्री गणेशाय नमः ॥
        </p>
        <h1 className="font-serif text-2xl md:text-3xl text-maroon-900 mt-2 font-medium tracking-wide">
          A little secret awaits...
        </h1>
        <p className="font-sans text-xs md:text-sm text-ink-600 max-w-sm mx-auto mt-1 px-4">
          Let the celebrations begin…
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
            className="relative w-full h-full rounded-xl overflow-hidden bg-cream-50 flex flex-col items-center justify-between p-4 select-none"
            style={{ width: cardDimensions.width, height: cardDimensions.height }}
          >
            {/* --- UNDERLYING REVEAL CONTENT --- */}
            <div className="absolute inset-0 flex flex-col items-center justify-between p-4 bg-gradient-to-b from-cream-50 via-cream-100 to-cream-200 border-2 border-gold/40 rounded-xl pointer-events-none">
              {/* Card Header */}
              <div className="text-center w-full">
                <div className="text-[9px] tracking-[0.25em] font-sans text-maroon-700 font-semibold uppercase">
                  {/* Save The Date */}
                </div>
                <div className="w-10 h-[1px] bg-gold mx-auto my-1"></div>
                <div className="font-serif text-[11px] tracking-widest text-ink-600 uppercase">
                  We're Getting Married
                </div>
              </div>

              {/* Couple Monogram & Names */}
              <div className="text-center py-0.5">
                <div className="font-script text-2xl sm:text-3xl text-maroon-900 leading-tight">
                  Vinay weds Navisha
                </div>
                <div className="flex items-center justify-center gap-2 my-0.5">
                  <div className="w-5 h-[0.5px] bg-gold-dark/60"></div>
                  <span className="font-serif italic text-[20px] text-gold-dark font-medium">&amp;</span>
                  <div className="w-5 h-[0.5px] bg-gold-dark/60"></div>
                </div>
                <div className="font-script text-2xl sm:text-3xl text-maroon-900 leading-tight">
                  Sumit weds Bhawna
                </div>
                <div className="flex items-center justify-center gap-2 mt-1.5 mb-1">
                  <div className="w-6 h-[0.5px] bg-gold-dark"></div>
                  <Heart className="w-2.5 h-2.5 text-maroon-700 fill-maroon-700" />
                  <div className="w-6 h-[0.5px] bg-gold-dark"></div>
                </div>
                <div className="font-display text-xs sm:text-sm font-bold tracking-widest text-maroon-800">
                  20 November 2026
                </div>
              </div>

              {/* Location & Sacred Blessing */}
              <div className="text-center w-full pb-0.5">
                <div className="font-sanskrit text-[15px] text-gold-dark tracking-widest">
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
