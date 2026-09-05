import React from 'react';
import { motion } from 'framer-motion';
import { MandalaDivider, LotusMotif, OrnateCorner } from './Motifs';
import { weddingData } from '../data/weddingData';

export const WeddingMessage = () => {
  const { couple } = weddingData;

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9 }}
        className="relative bg-cream-50/90 backdrop-blur-sm p-8 sm:p-14 rounded-3xl border border-gold/40 shadow-luxury text-center"
      >
        {/* Ornate Corner Accents */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <OrnateCorner className="w-10 h-10 text-gold/40" />
        </div>
        <div className="absolute top-3 right-3 rotate-90 pointer-events-none">
          <OrnateCorner className="w-10 h-10 text-gold/40" />
        </div>
        <div className="absolute bottom-3 left-3 -rotate-90 pointer-events-none">
          <OrnateCorner className="w-10 h-10 text-gold/40" />
        </div>
        <div className="absolute bottom-3 right-3 rotate-180 pointer-events-none">
          <OrnateCorner className="w-10 h-10 text-gold/40" />
        </div>

        {/* Top Lotus Motif */}
        <div className="flex justify-center mb-4">
          <LotusMotif className="w-10 h-10 text-gold-dark animate-float-slow" />
        </div>

        {/* Subtitle / Tagline */}
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-dark font-semibold mb-2">
          An Auspicious Union
        </p>

        {/* Main Heading */}
        <h2 className="font-serif text-2xl sm:text-4xl text-maroon-900 font-normal leading-snug tracking-wide max-w-2xl mx-auto">
          "{couple.mainQuote}"
        </h2>

        <MandalaDivider className="my-6 max-w-xs mx-auto" />

        {/* Heartfelt Message */}
        <div className="space-y-4 font-serif text-base sm:text-lg text-ink-700 leading-relaxed max-w-2xl mx-auto font-light">
          <p>
            With immense joy in our hearts and gratitude to the Almighty, we, along with our parents, cordially invite you to celebrate the wedding festivities of
          </p>
          <p className="font-serif text-xl sm:text-2xl text-maroon-900 font-semibold tracking-wider my-2">
            Vinay weds Navisha <span className="font-serif italic text-gold-dark text-base font-normal mx-2">&amp;</span> Sumit weds Bhawna
          </p>
          <p>
            {couple.storyNote}
          </p>
          <p className="italic text-sm sm:text-base text-gold-dark pt-2 font-normal">
            Your presence, warmth, and blessings will grace our celebrations and make our beginning truly memorable.
          </p>
        </div>

        {/* Signature */}
        <div className="mt-8 pt-4 flex flex-col items-center">
          {/* <span className="font-script text-2xl sm:text-3xl text-maroon-800">
            Vinay &amp; Navisha &amp; Sumit &amp; Bhawna
          </span> */}
          <span className="font-sans text-[11px] uppercase tracking-widest text-ink-500 mt-1">
            With the blessings of our families
          </span>
        </div>
      </motion.div>
    </section>
  );
};
