import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users } from 'lucide-react';
import { MandalaDivider, KalashMotif, PaisleyMotif } from './Motifs';
import { weddingData } from '../data/weddingData';

export const Families = () => {
  const { families } = weddingData;

  return (
    <section id="families" className="py-20 px-4 max-w-5xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="flex justify-center mb-2">
          <KalashMotif className="w-10 h-10 text-maroon-800 animate-pulse-subtle" />
        </div>
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-dark font-semibold mb-2">
          Ancestral Grace
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl text-maroon-900 tracking-wide font-normal">
          With the Blessings of Our Families
        </h2>
        <p className="font-serif italic text-ink-600 text-sm sm:text-base mt-2 max-w-lg mx-auto">
          Honoring our roots, our elders, and the traditions that have shaped our love.
        </p>
        <MandalaDivider className="my-6 max-w-xs mx-auto" />
      </div>

      {/* Two Column Balanced Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Bride's Family */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-cream-50/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-gold/35 shadow-luxury relative overflow-hidden card-hover-luxury"
        >
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-3 border-b border-gold/25 pb-4 mb-6">
            <PaisleyMotif className="w-6 h-6 text-gold-dark" />
            <h3 className="font-serif text-2xl text-maroon-900 tracking-wider font-medium">
              {families.bride.title}
            </h3>
          </div>

          <div className="space-y-4 font-serif text-ink-800 text-sm sm:text-base">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-maroon-800 font-semibold mb-1">
                Parents
              </p>
              <p className="text-lg text-ink-900 font-medium">
                {families.bride.parents}
              </p>
            </div>

            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-maroon-800 font-semibold mb-1">
                Grandparents
              </p>
              <p className="text-ink-700 italic">
                {families.bride.grandparents}
              </p>
            </div>

            <div className="pt-2 border-t border-gold/15">
              <p className="font-sans text-xs uppercase tracking-widest text-maroon-800 font-semibold mb-2">
                Family &amp; Siblings
              </p>
              <ul className="space-y-1.5 text-xs sm:text-sm text-ink-700">
                {families.bride.members.slice(2).map((item, i) => (
                  <li key={i} className="flex items-baseline gap-2">
                    <span className="text-gold text-xs">✦</span>
                    <span><strong>{item.role}:</strong> {item.names}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs italic text-gold-dark pt-3 font-light">
              "{families.bride.ancestralNote}"
            </p>
          </div>
        </motion.div>

        {/* Groom's Family */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-cream-50/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-gold/35 shadow-luxury relative overflow-hidden card-hover-luxury"
        >
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-maroon-100/40 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-3 border-b border-gold/25 pb-4 mb-6">
            <PaisleyMotif className="w-6 h-6 text-maroon-800" />
            <h3 className="font-serif text-2xl text-maroon-900 tracking-wider font-medium">
              {families.groom.title}
            </h3>
          </div>

          <div className="space-y-4 font-serif text-ink-800 text-sm sm:text-base">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-maroon-800 font-semibold mb-1">
                Parents
              </p>
              <p className="text-lg text-ink-900 font-medium">
                {families.groom.parents}
              </p>
            </div>

            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-maroon-800 font-semibold mb-1">
                Grandparents
              </p>
              <p className="text-ink-700 italic">
                {families.groom.grandparents}
              </p>
            </div>

            <div className="pt-2 border-t border-gold/15">
              <p className="font-sans text-xs uppercase tracking-widest text-maroon-800 font-semibold mb-2">
                Family &amp; Siblings
              </p>
              <ul className="space-y-1.5 text-xs sm:text-sm text-ink-700">
                {families.groom.members.slice(1).map((item, i) => (
                  <li key={i} className="flex items-baseline gap-2">
                    <span className="text-gold text-xs">✦</span>
                    <span><strong>{item.role}:</strong> {item.names}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs italic text-gold-dark pt-3 font-light">
              "{families.groom.ancestralNote}"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
