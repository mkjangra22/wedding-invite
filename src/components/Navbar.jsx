import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Itinerary", href: "#itinerary" },
    { name: "Blessings", href: "#families" },
    { name: "Venue", href: "#venue" },
    { name: "RSVP", href: "#rsvp" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-cream-50/92 backdrop-blur-md shadow-sm border-b border-gold/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left Side: Mobile shows VN & SB initials together; Desktop shows VN + Vinay & Navisha */}
        <div className="flex-1 flex justify-start">
          {/* Mobile: Initials Only Together */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex md:hidden items-center gap-1.5 group"
            aria-label="Vinay weds Navisha and Sumit weds Bhawna"
          >
            <div className="w-7 h-7 rounded-full border border-gold/70 flex items-center justify-center bg-cream-50 text-maroon-900 font-serif font-bold text-[10px] tracking-wider shadow-sm group-hover:border-gold transition-colors">
              VN
            </div>
            <span className="font-serif italic text-xs text-gold-dark font-medium">&amp;</span>
            <div className="w-7 h-7 rounded-full border border-gold/70 flex items-center justify-center bg-cream-50 text-maroon-900 font-serif font-bold text-[10px] tracking-wider shadow-sm group-hover:border-gold transition-colors">
              SB
            </div>
          </a>

          {/* Desktop Left: Vinay & Navisha */}
          <a 
            href="#hero" 
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="hidden md:flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-full border border-gold/70 flex items-center justify-center bg-cream-50 text-maroon-900 font-serif font-bold text-xs tracking-wider shadow-sm group-hover:border-gold group-hover:bg-cream-100 transition-colors shrink-0">
              VN
            </div>
            <span className="font-serif tracking-widest text-xs uppercase font-medium text-maroon-900 whitespace-nowrap">
              Vinay weds Navisha
            </span>
          </a>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-sans text-xs tracking-wider uppercase text-ink-700 hover:text-maroon-800 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Side: Desktop shows Sumit & Bhawna; Mobile shows more menu option */}
        <div className="flex-1 flex justify-end items-center gap-2 sm:gap-3">
          {/* Desktop Right: Sumit & Bhawna */}
          <a 
            href="#hero" 
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="hidden md:flex items-center gap-2 group"
          >
            <span className="font-serif tracking-widest text-xs uppercase font-medium text-maroon-900 whitespace-nowrap">
              Sumit weds Bhawna
            </span>
            <div className="w-8 h-8 rounded-full border border-gold/70 flex items-center justify-center bg-cream-50 text-maroon-900 font-serif font-bold text-xs tracking-wider shadow-sm group-hover:border-gold group-hover:bg-cream-100 transition-colors shrink-0">
              SB
            </div>
          </a>

          {/* Mobile hamburger button (More Menu Option) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-maroon-900 hover:bg-cream-200/50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-cream-50/98 backdrop-blur-xl border-b border-gold/30 px-6 py-6 shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gold/20 font-serif text-xs tracking-wider text-maroon-900 font-medium">
                <span>Vinay weds Navisha</span>
                <span className="text-gold text-xs">✦</span>
                <span>Sumit weds Bhawna</span>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-serif text-base tracking-widest uppercase text-maroon-900 hover:text-maroon-700 py-1.5 border-b border-gold/15 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-gold text-xs">✦</span>
                </a>
              ))}
              <div className="pt-2">
                <a
                  href="#rsvp"
                  onClick={(e) => handleLinkClick(e, '#rsvp')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-maroon-900 text-cream-50 font-serif text-sm tracking-widest uppercase border border-gold/40 shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-gold-light" />
                  <span>RSVP for Celebrations</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
