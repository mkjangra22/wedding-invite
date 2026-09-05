import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Sparkles, 
  Music, 
  Wine, 
  Flower2, 
  Clock, 
  MapPin 
} from 'lucide-react';
import { MandalaDivider } from './Motifs';
import { weddingData } from '../data/weddingData';

const iconMap = {
  Sun: Sun,
  Flower2: Flower2,
  Music: Music,
  Sparkles: Sparkles,
  Wine: Wine,
};

export const Itinerary = () => {
  const { itinerary } = weddingData;

  return (
    <section id="itinerary" className="py-24 px-4 max-w-5xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center mb-16">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-dark font-semibold mb-2">
          Celebration Timeline
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl text-maroon-900 tracking-wide font-normal">
          Wedding Itinerary
        </h2>
        <p className="font-serif italic text-ink-600 text-sm sm:text-base mt-2 max-w-md mx-auto">
          Auspicious celebrations of love, music, traditions, and timeless joy.
        </p>
        <MandalaDivider className="my-6 max-w-xs mx-auto" />
      </div>

      {/* Vertical Timeline */}
      <div className="relative">
        {/* Center Vertical Golden Line */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[1.5px] -translate-x-1/2 bg-gradient-to-b from-gold/20 via-gold/70 to-gold/20 hidden sm:block" />

        <div className="space-y-12 sm:space-y-16">
          {itinerary.map((event, index) => {
            const IconComponent = iconMap[event.iconName] || Sparkles;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Badge */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-cream-50 border-2 border-gold items-center justify-center text-maroon-800 shadow-md z-20">
                  <IconComponent className="w-5 h-5 text-maroon-800" />
                </div>

                {/* Event Card Container */}
                <div className="w-full sm:w-[calc(50%-40px)]">
                  <div className="bg-cream-50/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-gold/35 shadow-luxury card-hover-luxury relative">
                    {/* Event Tag & Date */}
                    <div className="flex items-center justify-between gap-2 border-b border-gold/20 pb-3 mb-4">
                      <span className="font-serif text-xs font-semibold tracking-widest uppercase text-maroon-800 bg-maroon-50 px-3 py-1 rounded-full border border-maroon-100">
                        {event.date}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-ink-600 font-medium">
                        <Clock className="w-3.5 h-3.5 text-gold-dark" />
                        <span>{event.time}</span>
                      </div>
                    </div>

                    {/* Ceremony Title */}
                    <h3 className="font-serif text-2xl text-maroon-900 font-medium tracking-wide">
                      {event.title}
                    </h3>

                    {/* Poetic Description */}
                    <p className="font-serif italic text-ink-700 text-sm leading-relaxed mt-2 font-light">
                      "{event.poeticText}"
                    </p>

                    {/* Venue */}
                    <div className="mt-5 pt-3 border-t border-gold/15 text-xs">
                      <div className="flex items-start gap-2 text-ink-700">
                        <MapPin className="w-4 h-4 text-maroon-700 shrink-0 mt-0.5" />
                        <span className="leading-snug">{event.venue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
