import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Utensils, Calendar, ChevronDown } from 'lucide-react';
import { MandalaDivider } from './Motifs';
import { weddingData } from '../data/weddingData';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

export const VenueTravel = () => {
  const { venue } = weddingData;
  const [showMapsMenu, setShowMapsMenu] = useState(false);
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);

  const weddingEventDetails = {
    title: "Wedding & Dinner Reception",
    description: "Join Vinay weds Navisha and Sumit weds Bhawna as they celebrate their wedding ceremonies with family and friends.",
    venue: `${venue.name}, ${venue.address}`,
    startIso: "2026-11-20T16:00:00+05:30",
    endIso: "2026-11-20T23:59:00+05:30",
  };

  const handleIcsDownload = () => {
    downloadIcsFile(weddingEventDetails);
    setShowCalendarMenu(false);
  };

  return (
    <section id="venue" className="py-24 px-4 max-w-5xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center mb-14">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-dark font-semibold mb-2">
          Destination &amp; Location
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl text-maroon-900 tracking-wide font-normal">
          The Wedding Venue
        </h2>
        <p className="font-serif italic text-ink-600 text-sm sm:text-base mt-2 max-w-md mx-auto">
          We look forward to welcoming you to the Wedding..
        </p>
        <MandalaDivider className="my-6 max-w-xs mx-auto" />
      </div>

      {/* Main Venue Showcase Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-cream-50/95 backdrop-blur-md rounded-3xl border border-gold/40 shadow-luxury relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Venue Details Left */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <span className="font-serif text-xs tracking-widest uppercase text-maroon-800 bg-maroon-50 px-3 py-1 rounded-full border border-maroon-100">
                {venue.subName}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-maroon-900 font-medium tracking-wide mt-3 mb-3">
                {venue.name}
              </h3>
              <p className="font-sans text-sm text-ink-700 leading-relaxed flex items-start gap-2 mb-6">
                <MapPin className="w-4 h-4 text-maroon-700 shrink-0 mt-1" />
                <span>{venue.address}</span>
              </p>

              {/* venue date */}
              <div className="bg-cream-100/90 p-4 rounded-xl border border-gold/30 flex items-center gap-3 mb-6 shadow-sm">
                <Utensils className="w-5 h-5 text-gold-dark shrink-0" />
                <div>
                  <strong className="text-maroon-900 font-serif text-base sm:text-lg font-semibold tracking-wide">
                    Friday, 20 November 2026
                  </strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gold/15 relative z-20">
              {/* Maps Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowMapsMenu(!showMapsMenu)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-maroon-900 hover:bg-maroon-800 text-cream-50 font-serif text-xs tracking-widest uppercase shadow-md transition-all duration-300 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-gold-light" />
                  <span>Open in Maps</span>
                  <ChevronDown className={`w-3 h-3 text-gold-light transition-transform duration-200 ${showMapsMenu ? 'rotate-180' : ''}`} />
                </button>

                {showMapsMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowMapsMenu(false)}
                    />
                    <div className="absolute left-0 top-full mt-2 w-48 bg-cream-50 border border-gold/50 rounded-xl shadow-2xl py-2 z-50 font-serif text-xs overflow-hidden">
                      <a
                        href={venue.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowMapsMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-maroon-50 text-maroon-900 transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-gold-dark" />
                        <span>Google Maps</span>
                      </a>
                      <a
                        href={venue.appleMapsUrl || `https://maps.apple.com/?q=${encodeURIComponent(venue.name)}&address=${encodeURIComponent(venue.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowMapsMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-maroon-50 text-maroon-900 transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-gold-dark" />
                        <span>Apple Maps</span>
                      </a>
                    </div>
                  </>
                )}
              </div>
              {/* Add to Calendar Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCalendarMenu(!showCalendarMenu)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cream-100 hover:bg-cream-200 text-ink-800 font-serif text-xs tracking-wider uppercase border border-gold/40 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-maroon-800" />
                  <span>Add to Calendar</span>
                  <ChevronDown className={`w-3 h-3 text-gold-dark transition-transform duration-200 ${showCalendarMenu ? 'rotate-180' : ''}`} />
                </button>

                {showCalendarMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowCalendarMenu(false)}
                    />
                    <div className="absolute left-0 top-full mt-2 w-52 bg-cream-50 border border-gold/50 rounded-xl shadow-2xl py-2 z-50 font-serif text-xs overflow-hidden">
                      <a
                        href={getGoogleCalendarUrl(weddingEventDetails)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowCalendarMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-maroon-50 text-maroon-900 transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                        <span>Google Calendar</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleIcsDownload}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 hover:bg-maroon-50 text-maroon-900 transition-colors cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                        <span>Apple Calendar</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Map Visual Placeholder Right */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-cream-200 overflow-hidden border-t lg:border-t-0 lg:border-l border-gold/30 rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl">
            <img src="secretarygarden.png" alt="Secretary garden" className="w-full h-full object-cover" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

