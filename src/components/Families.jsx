import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { MandalaDivider, KalashMotif, PaisleyMotif } from './Motifs';
import { weddingData } from '../data/weddingData';

export const Families = () => {
  const { families } = weddingData;

  const familyList = [
    {
      key: 'groom',
      data: families.groom,
      badgeColor: 'text-maroon-800',
      glow: 'bg-maroon-100/40',
      relationship: families.groom?.relationship || "Family of Vinay & Sumit",
    },
    {
      key: 'bride1',
      data: families.bride1 || families.bride,
      badgeColor: 'text-gold-dark',
      glow: 'bg-gold/10',
      relationship: families.bride1?.relationship || "Navisha's Family",
    },
    {
      key: 'bride2',
      data: families.bride2,
      badgeColor: 'text-gold-dark',
      glow: 'bg-gold/10',
      relationship: families.bride2?.relationship || "Bhawna's Family",
    },
  ].filter(f => f.data);

  return (
    <section id="families" className="py-20 px-4 max-w-6xl mx-auto relative z-10">
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

      {/* Three Column Balanced Layout for Groom & 2 Brides */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {familyList.map((fam, idx) => (
          <motion.div
            key={fam.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            className="bg-cream-50/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-gold/35 shadow-luxury relative overflow-hidden card-hover-luxury flex flex-col justify-between"
          >
            <div className={`absolute -top-6 -right-6 w-24 h-24 ${fam.glow} rounded-full blur-xl pointer-events-none`} />
            
            <div>
              <div className="flex items-center gap-3 border-b border-gold/25 pb-4 mb-5">
                <PaisleyMotif className={`w-6 h-6 ${fam.badgeColor} shrink-0`} />
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-maroon-900 tracking-wider font-medium">
                    {fam.data.title}
                  </h3>
                  <p className="font-serif italic text-xs text-gold-dark font-medium">
                    {fam.relationship}
                  </p>
                </div>
              </div>

              <div className="space-y-4 font-serif text-ink-800 text-sm">
                <div>
                  <p className="font-sans text-[11px] uppercase tracking-widest text-maroon-800 font-semibold mb-1">
                    Parents
                  </p>
                  <p className="text-base sm:text-lg text-ink-900 font-medium leading-snug">
                    {fam.data.parents}
                  </p>
                </div>

                {fam.data.grandparents && (
                  <div>
                    <p className="font-sans text-[11px] uppercase tracking-widest text-maroon-800 font-semibold mb-1">
                      Grandparents
                    </p>
                    <p className="text-xs sm:text-sm text-ink-700 italic">
                      {fam.data.grandparents}
                    </p>
                  </div>
                )}

                {fam.data.address && (
                  <div className="pt-3 border-t border-gold/15">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-maroon-800 font-semibold mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-dark" />
                      Address
                    </p>
                    <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-light">
                      {fam.data.address}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
