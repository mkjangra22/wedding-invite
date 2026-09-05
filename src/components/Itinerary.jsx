import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Sparkles, 
  Music, 
  Wine, 
  Flower2, 
  Clock, 
  MapPin, 
  Calendar as CalendarIcon, 
  Compass, 
  Check, 
  ChevronDown 
} from 'lucide-react';
import { MandalaDivider } from './Motifs';
import { weddingData } from '../data/weddingData';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

const iconMap = {
  Sun: Sun,
  Flower2: Flower2,
  Music: Music,
  Sparkles: Sparkles,
  Wine: Wine,
};

export const Itinerary = () => {
  const { itinerary } = weddingData;
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

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
          Five auspicious celebrations of love, music, traditions, and timeless joy.
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

                    {/* Venue & Dress Code */}
                    <div className="mt-5 space-y-2.5 pt-3 border-t border-gold/15 text-xs">
                      <div className="flex items-start gap-2 text-ink-700">
                        <MapPin className="w-4 h-4 text-maroon-700 shrink-0 mt-0.5" />
                        <span className="leading-snug">{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-ink-700">
                        <span className="w-2 h-2 rounded-full bg-gold-dark shrink-0"></span>
                        <span>
                          <strong className="text-maroon-900 font-serif">Dress Code:</strong> {event.dressCode}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons: Add to Calendar & Get Directions */}
                    <div className="mt-6 pt-3 flex flex-wrap items-center gap-3">
                      {/* Directions */}
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(event.venue)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-maroon-900 hover:bg-maroon-800 text-cream-50 font-serif text-xs tracking-wider uppercase transition-colors"
                      >
                        <Compass className="w-3.5 h-3.5 text-gold-light" />
                        <span>Get Directions</span>
                      </a>

                      {/* Calendar Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(event.id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-cream-100 hover:bg-cream-200 text-ink-800 font-serif text-xs tracking-wider uppercase border border-gold/40 transition-colors"
                        >
                          <CalendarIcon className="w-3.5 h-3.5 text-gold-dark" />
                          <span>Add to Calendar</span>
                          <ChevronDown className="w-3 h-3 text-ink-500" />
                        </button>

                        {activeDropdown === event.id && (
                          <div className="absolute left-0 mt-2 w-48 bg-cream-50 rounded-xl shadow-xl border border-gold/40 py-2 z-30 font-sans text-xs">
                            <a
                              href={getGoogleCalendarUrl({
                                title: event.title,
                                description: event.poeticText,
                                venue: event.venue,
                                startIso: event.startIso,
                                endIso: event.endIso
                              })}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 text-ink-800 hover:bg-cream-200 hover:text-maroon-900 transition-colors"
                            >
                              Google Calendar
                            </a>
                            <button
                              onClick={() => {
                                downloadIcsFile({
                                  title: event.title,
                                  description: event.poeticText,
                                  venue: event.venue,
                                  startIso: event.startIso,
                                  endIso: event.endIso
                                });
                                setActiveDropdown(null);
                              }}
                              className="w-full text-left px-4 py-2 text-ink-800 hover:bg-cream-200 hover:text-maroon-900 transition-colors"
                            >
                              Apple Calendar / .ics
                            </button>
                          </div>
                        )}
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
