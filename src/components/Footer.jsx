import React from 'react';
import { Heart, Share2, ArrowUp } from 'lucide-react';
import { GaneshaIcon, MandalaDivider } from './Motifs';
import { weddingData } from '../data/weddingData';

export const Footer = () => {
  const { couple } = weddingData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareWhatsApp = () => {
    const text = `✨ You are cordially invited to celebrate the wedding celebrations of Aarav & Ananya! (15-17 Feb 2027, Panipat, Haryana).\n\nScratch the invitation card to reveal our wedding details:\n${window.location.href}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <footer className="relative bg-gradient-to-b from-cream-100 via-cream-200 to-cream-300 border-t border-gold/40 pt-20 pb-12 px-4 text-center z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Top Ganesh Blessing */}
        <div className="flex justify-center mb-3">
          <GaneshaIcon className="w-10 h-10 text-maroon-800 animate-pulse-subtle" />
        </div>

        {/* Sacred Sanskrit Shubh Vivah */}
        <p className="font-sanskrit-shloka text-maroon-900 text-2xl sm:text-3xl font-bold tracking-widest my-2">
          {couple.sanskritClosing}
        </p>

        {/* Names */}
        <div className="flex items-center justify-center gap-3 my-3">
          <span className="font-serif text-2xl sm:text-3xl text-maroon-900 font-light tracking-wider">
            AARAV
          </span>
          <Heart className="w-4 h-4 text-maroon-700 fill-maroon-700" />
          <span className="font-serif text-2xl sm:text-3xl text-maroon-900 font-light tracking-wider">
            ANANYA
          </span>
        </div>

        <MandalaDivider className="my-5 max-w-xs" />

        {/* Heartfelt Gratitude */}
        <p className="font-serif text-lg sm:text-xl text-ink-800 font-light italic max-w-lg mx-auto">
          "Thank you for being a part of our story and blessing our new beginning."
        </p>

        <p className="font-sans text-xs tracking-widest uppercase text-gold-dark font-semibold mt-4">
          With love, Aarav &amp; Ananya
        </p>

        {/* Action buttons (WhatsApp Share & Back to Top) */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-serif text-xs tracking-wider uppercase shadow-sm transition-all duration-300"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share via WhatsApp</span>
          </button>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cream-50 hover:bg-cream-100 text-maroon-900 font-serif text-xs tracking-wider uppercase border border-gold/40 shadow-sm transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5 text-gold-dark" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Bottom copyright / credits */}
        <div className="mt-14 pt-6 border-t border-gold/20 w-full text-[11px] text-ink-500 font-sans flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>15 • 16 • 17 February 2027 • Panipat, Haryana</span>
          <span>Designed with love &amp; auspicious blessings</span>
        </div>
      </div>
    </footer>
  );
};
