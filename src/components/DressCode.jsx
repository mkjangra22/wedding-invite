import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shirt, UserCheck } from 'lucide-react';
import { MandalaDivider } from './Motifs';
import { weddingData } from '../data/weddingData';

export const DressCode = () => {
  const { dressCodes } = weddingData;
  const [selectedEvent, setSelectedEvent] = useState(0);

  return (
    <section id="dresscode" className="py-24 px-4 max-w-5xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center mb-14">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-dark font-semibold mb-2">
          Sartorial Elegance
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl text-maroon-900 tracking-wide font-normal">
          Dress Code &amp; Color Palette
        </h2>
        <p className="font-serif italic text-ink-600 text-sm sm:text-base mt-2 max-w-md mx-auto">
          Thoughtfully curated color inspirations to help you celebrate in style and comfort.
        </p>
        <MandalaDivider className="my-6 max-w-xs mx-auto" />
      </div>

      {/* Event Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {dressCodes.map((item, index) => (
          <button
            key={item.event}
            onClick={() => setSelectedEvent(index)}
            className={`px-5 py-2.5 rounded-full font-serif text-xs tracking-wider uppercase transition-all duration-300 border ${
              selectedEvent === index
                ? 'bg-maroon-900 text-cream-50 border-gold shadow-gold-soft scale-105'
                : 'bg-cream-50 text-ink-700 border-gold/30 hover:bg-cream-200'
            }`}
          >
            <span>{item.event}</span>
            <span className="ml-1.5 opacity-60 text-[10px]">({item.tagline})</span>
          </button>
        ))}
      </div>

      {/* Selected Event Card Detail */}
      <motion.div
        key={selectedEvent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-cream-50/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-gold/40 shadow-luxury"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gold/20 pb-6 mb-8">
          <div>
            <span className="font-serif text-xs tracking-widest uppercase text-maroon-800 bg-maroon-50 px-3 py-1 rounded-full border border-maroon-100">
              {dressCodes[selectedEvent].tagline}
            </span>
            <h3 className="font-serif text-3xl text-maroon-900 font-medium tracking-wide mt-2">
              {dressCodes[selectedEvent].event} Attire Guide
            </h3>
          </div>

          {/* Color Swatch Circles */}
          <div className="flex items-center gap-2.5">
            {dressCodes[selectedEvent].colors.map((color) => (
              <div key={color.name} className="group relative flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full border border-gold/40 shadow-sm transition-transform duration-300 group-hover:scale-125"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
                <span className="absolute -bottom-6 opacity-0 group-hover:opacity-100 font-sans text-[10px] text-maroon-900 whitespace-nowrap bg-cream-50 px-2 py-0.5 rounded shadow-sm border border-gold/30 transition-opacity pointer-events-none">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Description & Suggestions */}
        <p className="font-serif text-base sm:text-lg text-ink-700 leading-relaxed italic mb-8 font-light">
          "{dressCodes[selectedEvent].description}"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ladies */}
          <div className="bg-cream-100/70 p-6 rounded-2xl border border-gold/20 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-maroon-900/10 text-maroon-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-maroon-800" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-maroon-900 font-medium">For Women</h4>
              <p className="font-sans text-xs sm:text-sm text-ink-700 mt-1 leading-relaxed">
                {dressCodes[selectedEvent].ladiesSuggestion}
              </p>
            </div>
          </div>

          {/* Gents */}
          <div className="bg-cream-100/70 p-6 rounded-2xl border border-gold/20 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gold/20 text-gold-dark flex items-center justify-center shrink-0">
              <Shirt className="w-5 h-5 text-gold-dark" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-maroon-900 font-medium">For Men</h4>
              <p className="font-sans text-xs sm:text-sm text-ink-700 mt-1 leading-relaxed">
                {dressCodes[selectedEvent].gentsSuggestion}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
