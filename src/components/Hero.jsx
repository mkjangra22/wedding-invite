import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Heart, ChevronDown } from 'lucide-react';
import { GaneshaIcon, MandalaDivider, OrnateCorner } from './Motifs';
import { weddingData } from '../data/weddingData';
import { downloadIcsFile } from '../utils/calendar';

export const Hero = () => {
  const { couple } = weddingData;

  // Wedding Countdown Timer calculation
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date(couple.weddingDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [couple.weddingDate]);

  const handleDownloadMainCalendar = () => {
    downloadIcsFile({
      title: "Wedding of Vinay & Navisha and Sumit & Bhawna",
      description: "Join us in celebrating the wedding festivities of Vinay & Navisha and Sumit & Bhawna in Panipat, Haryana.",
      venue: "The Grand Imperial Haveli & Resort, Panipat, Haryana",
      startIso: "2026-11-19T11:00:00+05:30",
      endIso: "2026-11-21T23:30:00+05:30"
    });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col items-center justify-center text-center px-4 overflow-hidden paper-texture">
      {/* Background Ambience / Subtle Indian Arch glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gradient-to-b from-gold/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 flex flex-col items-center">
        {/* Top Ganesh Blessing */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-6"
        >
          <img src="ganesh.jpg" className="w-12 h-12 object-cover object-center filter brightness-[0.98] contrast-[1.03] transition-transform duration-700 hover:scale-105" />
          <p className="font-sanskrit-shloka text-maroon-900 text-sm md:text-base font-semibold tracking-widest">
            {couple.sanskritGreeting}
          </p>
          <p className="font-serif italic text-xs text-ink-600 mt-1">
            With the blessings of our families
          </p>
        </motion.div>

        {/* Ornate Arch Frame with Couple Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative my-4"
        >
          {/* Outer Decorative Gold Rim */}
          <div className="relative p-3 rounded-t-[140px] rounded-b-2xl bg-gradient-to-b from-[#F5E6B8] via-[#C5A869] to-[#8B6F3E] shadow-luxury">
            {/* Corner Ornaments */}
            <div className="absolute top-2 left-2 pointer-events-none">
              <OrnateCorner className="w-8 h-8 text-cream-50/70" />
            </div>
            <div className="absolute top-2 right-2 rotate-90 pointer-events-none">
              <OrnateCorner className="w-8 h-8 text-cream-50/70" />
            </div>

            {/* Photo Container */}
            <div className="relative w-64 sm:w-80 md:w-96 h-80 sm:h-96 md:h-[430px] rounded-t-[130px] rounded-b-xl overflow-hidden bg-cream-200">
              <img
                src="wedding-reference.jpg"
                alt="Vinay & Navisha and Sumit & Bhawna"
                className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.03] transition-transform duration-700 hover:scale-105"
                loading="eager"
              />
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/60 via-transparent to-transparent"></div>
              
            </div>
          </div>
        </motion.div>

        {/* Main Names Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 mb-2"
        >
          <div className="space-y-1">
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-maroon-900 tracking-wider">
              VINAY <span className="font-script text-2xl sm:text-4xl text-gold-metallic mx-1">&amp;</span> NAVISHA
            </h1>
            <div className="flex items-center justify-center gap-3 my-1">
              <span className="h-[0.5px] w-8 bg-gold-dark/40"></span>
              <span className="font-serif italic text-xl tracking-widest text-gold-dark uppercase font-medium">&amp;</span>
              <span className="h-[0.5px] w-8 bg-gold-dark/40"></span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-maroon-900 tracking-wider">
              SUMIT <span className="font-script text-2xl sm:text-4xl text-gold-metallic mx-1">&amp;</span> BHAWNA
            </h2>
          </div>
          <p className="font-serif italic text-base sm:text-xl text-ink-600 mt-3 font-light">
            are getting married
          </p>
        </motion.div>

        <MandalaDivider className="my-4 max-w-xs" />

        {/* Date & Location Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-maroon-900 font-serif my-2"
        >
          <div className="flex items-center gap-2 text-sm sm:text-base tracking-widest uppercase font-medium bg-cream-50 px-4 py-2 rounded-full border border-gold/40 shadow-sm">
            <Calendar className="w-4 h-4 text-gold-dark" />
            <span>{couple.fullDateDisplay}</span>
          </div>
          {/* <div className="flex items-center gap-2 text-sm sm:text-base tracking-wider text-ink-700 bg-cream-50 px-4 py-2 rounded-full border border-gold/40 shadow-sm">
            <MapPin className="w-4 h-4 text-maroon-700" />
            <span>{couple.city}</span>
          </div> */}
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 mb-6 w-full max-w-lg px-2"
        >
          <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-maroon-800 font-semibold mb-3">
            Countdown to the Celebrations
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-cream-50/95 backdrop-blur-sm border border-gold/40 rounded-xl p-2.5 sm:p-3 shadow-gold-soft flex flex-col items-center"
              >
                <span className="font-serif text-2xl sm:text-3xl font-bold text-maroon-900">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="font-sans text-[10px] sm:text-xs tracking-wider uppercase text-ink-500 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
        >
          <button
            onClick={handleDownloadMainCalendar}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cream-50 hover:bg-cream-200 text-maroon-900 font-serif text-xs tracking-widest uppercase border border-gold/50 shadow-sm transition-all duration-300"
          >
            <Calendar className="w-3.5 h-3.5 text-gold-dark" />
            <span>Save Dates to Calendar</span>
          </button>
          <a
            href="#itinerary"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-maroon-900 hover:bg-maroon-800 text-cream-50 font-serif text-xs tracking-widest uppercase border border-gold/40 shadow-sm transition-all duration-300"
          >
            <span>View Itinerary</span>
            <ChevronDown className="w-3.5 h-3.5 text-gold-light animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
