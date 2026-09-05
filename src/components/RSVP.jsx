import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  CheckCircle, 
  Heart, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  Users, 
  MessageSquare,
  PartyPopper
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MandalaDivider, PaisleyMotif } from './Motifs';
import { weddingData } from '../data/weddingData';
import { saveRSVP } from '../utils/supabase';

export const RSVP = () => {
  const { itinerary } = weddingData;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    guestCount: '2',
    attendingEvents: itinerary.map(e => e.title), // Default all checked
    message: '',
    transportAssistance: 'No, driving directly'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheckboxToggle = (eventTitle) => {
    setFormData(prev => {
      const exists = prev.attendingEvents.includes(eventTitle);
      if (exists) {
        return {
          ...prev,
          attendingEvents: prev.attendingEvents.filter(t => t !== eventTitle)
        };
      } else {
        return {
          ...prev,
          attendingEvents: [...prev.attendingEvents, eventTitle]
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() && !formData.email.trim()) {
      setErrorMsg('Please provide either a phone number or email address for confirmation.');
      return;
    }
    if (formData.attendingEvents.length === 0) {
      setErrorMsg('Please select at least one event you plan to attend.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await saveRSVP(formData);
      if (result.success) {
        setSubmittedData(formData);
        // Trigger celebratory confetti
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#5C141C', '#C5A869', '#F5E6B8']
        });
      } else {
        setErrorMsg('Could not record RSVP. Please try again or reach out to the family directly.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-24 px-4 max-w-4xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center mb-14">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-dark font-semibold mb-2">
          Graced by Your Presence
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl text-maroon-900 tracking-wide font-normal">
          Kindly Respond
        </h2>
        <p className="font-serif italic text-ink-600 text-sm sm:text-base mt-2 max-w-md mx-auto">
          Please let us know if you will be able to join our celebrations by 10 November 2026.
        </p>
        <MandalaDivider className="my-6 max-w-xs mx-auto" />
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-cream-50/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-gold/40 shadow-luxury"
      >
        <AnimatePresence mode="wait">
          {submittedData ? (
            /* --- SUCCESS STATE --- */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-maroon-50 rounded-full border border-maroon-200 flex items-center justify-center mx-auto text-maroon-800 mb-4 shadow-gold-soft">
                <CheckCircle className="w-8 h-8 text-maroon-800" />
              </div>
              <span className="font-serif text-xs tracking-widest uppercase text-gold-dark font-semibold">
                RSVP Confirmed
              </span>
              <h3 className="font-serif text-3xl text-maroon-900 font-medium mt-2">
                Thank you, {submittedData.fullName}!
              </h3>
              <p className="font-serif italic text-ink-700 text-base max-w-lg mx-auto mt-3 font-light leading-relaxed">
                We are overjoyed that you will be joining our wedding celebrations. A confirmation has been recorded.
              </p>

              {/* Summary Card */}
              <div className="bg-cream-100/90 rounded-2xl p-6 border border-gold/30 max-w-md mx-auto mt-6 text-left text-xs font-sans space-y-2">
                <p><strong>Guests:</strong> {submittedData.guestCount}</p>
                <p><strong>Events:</strong> {submittedData.attendingEvents.join(', ')}</p>
                {submittedData.message && (
                  <p className="italic text-ink-600 pt-1">"{submittedData.message}"</p>
                )}
              </div>

              <button
                onClick={() => setSubmittedData(null)}
                className="mt-8 px-6 py-2.5 rounded-full bg-cream-200 hover:bg-cream-300 text-maroon-900 font-serif text-xs tracking-wider uppercase transition-colors"
              >
                Submit another response
              </button>
            </motion.div>
          ) : (
            /* --- RSVP FORM --- */
            <form onSubmit={handleSubmit} className="space-y-6" key="form">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs text-center font-sans">
                  {errorMsg}
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block font-serif text-sm font-semibold text-maroon-900 uppercase tracking-wider mb-2">
                  Full Name <span className="text-maroon-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gold-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Aryan & Smt. Priya Kapoor"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-cream-100/60 border border-gold/40 rounded-xl text-sm text-ink-900 focus:outline-none focus:border-maroon-800 focus:bg-cream-50 transition-colors"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-serif text-sm font-semibold text-maroon-900 uppercase tracking-wider mb-2">
                    Phone / WhatsApp <span className="text-maroon-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gold-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-cream-100/60 border border-gold/40 rounded-xl text-sm text-ink-900 focus:outline-none focus:border-maroon-800 focus:bg-cream-50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-serif text-sm font-semibold text-maroon-900 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gold-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-cream-100/60 border border-gold/40 rounded-xl text-sm text-ink-900 focus:outline-none focus:border-maroon-800 focus:bg-cream-50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Guests Count */}
              <div>
                <label className="block font-serif text-sm font-semibold text-maroon-900 uppercase tracking-wider mb-2">
                  Total Number of Attending Guests
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-gold-dark absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-cream-100/60 border border-gold/40 rounded-xl text-sm text-ink-900 focus:outline-none focus:border-maroon-800 focus:bg-cream-50 transition-colors appearance-none"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests (Couple)</option>
                    <option value="3">3 Guests (Family)</option>
                    <option value="4">4 Guests (Family)</option>
                    <option value="5+">5+ Guests (Large Family)</option>
                  </select>
                </div>
              </div>

              {/* Attending Events Multi-Checkboxes */}
              <div>
                <label className="block font-serif text-sm font-semibold text-maroon-900 uppercase tracking-wider mb-2">
                  Events You Will Be Attending
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {itinerary.map((event) => {
                    const isChecked = formData.attendingEvents.includes(event.title);
                    return (
                      <label
                        key={event.id}
                        onClick={() => handleCheckboxToggle(event.title)}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all ${
                          isChecked
                            ? 'bg-cream-200/90 border-maroon-800 text-maroon-950 font-medium'
                            : 'bg-cream-100/40 border-gold/30 text-ink-700 opacity-70'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 text-maroon-800 rounded accent-maroon-900 focus:ring-0"
                        />
                        <div className="text-xs font-serif leading-tight">
                          <span className="block font-semibold">{event.shortTitle}</span>
                          <span className="text-[10px] text-ink-500">{event.date}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Message for the Couple */}
              <div>
                <label className="block font-serif text-sm font-semibold text-maroon-900 uppercase tracking-wider mb-2">
                  Warm Wishes / Message for the Couple
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-gold-dark absolute left-3.5 top-3.5" />
                  <textarea
                    rows={3}
                    placeholder="Leave a heartfelt note or message for Vinay weds Navisha &amp; Sumit weds Bhawna..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-cream-100/60 border border-gold/40 rounded-xl text-sm text-ink-900 focus:outline-none focus:border-maroon-800 focus:bg-cream-50 transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 hover:opacity-95 text-cream-50 font-serif tracking-widest uppercase text-sm font-semibold shadow-gold-glow border border-gold/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Recording Your RSVP...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-gold-light" />
                    <span>Confirm My RSVP</span>
                  </>
                )}
              </button>
            </form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
