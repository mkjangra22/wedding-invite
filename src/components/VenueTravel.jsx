import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Car, Phone } from 'lucide-react';
import { MandalaDivider } from './Motifs';
import { weddingData } from '../data/weddingData';

export const VenueTravel = () => {
  const { venue } = weddingData;

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
          We look forward to welcoming you to the historic city of Panipat, Haryana.
        </p>
        <MandalaDivider className="my-6 max-w-xs mx-auto" />
      </div>

      {/* Main Venue Showcase Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-cream-50/95 backdrop-blur-md rounded-3xl border border-gold/40 shadow-luxury overflow-hidden"
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

              {/* Parking Feature */}
              <div className="bg-cream-100/80 p-4 rounded-xl border border-gold/20 flex items-start gap-3 text-xs text-ink-700 mb-6">
                <Car className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <strong className="text-maroon-900 font-serif">Valet &amp; Parking:</strong> {venue.parking}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gold/15">
              <a
                href={venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-maroon-900 hover:bg-maroon-800 text-cream-50 font-serif text-xs tracking-widest uppercase shadow-md transition-all duration-300"
              >
                <Navigation className="w-3.5 h-3.5 text-gold-light" />
                <span>Open in Google Maps</span>
              </a>
              <a
                href={`tel:${venue.conciergePhone}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cream-100 hover:bg-cream-200 text-ink-800 font-serif text-xs tracking-wider uppercase border border-gold/40 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-maroon-800" />
                <span>Venue Concierge</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual Placeholder Right */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-cream-200 overflow-hidden border-t lg:border-t-0 lg:border-l border-gold/30">
            <iframe
              title="Panipat Venue Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111244.57140816962!2d76.90382348421867!3d29.39094640103759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390de096058dcf49%3A0xb3e6a9dcbf54a26!2sPanipat%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full min-h-[320px] border-0 filter grayscale-[20%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

