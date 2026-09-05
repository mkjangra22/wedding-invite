import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { MandalaDivider } from './Motifs';
import { weddingData } from '../data/weddingData';

export const Gallery = () => {
  const { gallery } = weddingData;
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const categories = ['All', 'Pre-Wedding', 'Portraits', 'Moments'];

  const filteredImages = activeCategory === 'All'
    ? gallery
    : gallery.filter(img => img.category === activeCategory);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto';
  };

  const showNextImage = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev + 1) % filteredImages.length);
  }, [selectedImageIndex, filteredImages.length]);

  const showPrevImage = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [selectedImageIndex, filteredImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'ArrowLeft') showPrevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, showNextImage, showPrevImage]);

  return (
    <section id="gallery" className="py-24 px-4 max-w-6xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center mb-12">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold-dark font-semibold mb-2">
          Glimpses of Love
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl text-maroon-900 tracking-wide font-normal">
          Captured Moments
        </h2>
        <p className="font-serif italic text-ink-600 text-sm sm:text-base mt-2 max-w-md mx-auto">
          From heartfelt laughter to quiet promises under royal palace arches.
        </p>
        <MandalaDivider className="my-6 max-w-xs mx-auto" />
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setSelectedImageIndex(null);
            }}
            className={`px-4 py-1.5 rounded-full font-serif text-xs tracking-wider uppercase transition-all duration-300 border ${
              activeCategory === cat
                ? 'bg-maroon-900 text-cream-50 border-gold shadow-sm scale-105'
                : 'bg-cream-50 text-ink-700 border-gold/30 hover:bg-cream-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Editorial Asymmetric Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image, idx) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className={`group relative overflow-hidden rounded-2xl border border-gold/40 bg-cream-200 cursor-pointer shadow-luxury ${
              idx === 0 || idx === 4 ? 'sm:row-span-2' : ''
            }`}
            onClick={() => openLightbox(idx)}
          >
            <div className={`w-full overflow-hidden ${idx === 0 || idx === 4 ? 'h-[440px] sm:h-[500px]' : 'h-64 sm:h-72'}`}>
              <img
                src={image.url}
                alt={image.title}
                loading="lazy"
                className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-[0.98] transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Hover Editorial Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/85 via-maroon-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span className="font-serif text-xs text-gold-light tracking-widest uppercase">
                {image.category}
              </span>
              <h4 className="font-serif text-xl text-cream-50 font-medium">
                {image.title}
              </h4>
              <p className="font-sans text-xs text-cream-200/80 mt-1">
                {image.subtitle}
              </p>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-gold-light tracking-wider uppercase">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>View Fullscreen</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && filteredImages[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-lg flex items-center justify-center p-4 select-none"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrevImage();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Image Box */}
            <div
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={filteredImages[selectedImageIndex].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={filteredImages[selectedImageIndex].url}
                alt={filteredImages[selectedImageIndex].title}
                className="max-w-full max-h-[72vh] object-contain rounded-xl border border-gold/30 shadow-2xl"
              />

              {/* Caption */}
              <div className="text-center mt-4 text-white">
                <h4 className="font-serif text-xl sm:text-2xl font-light tracking-wide text-gold-light">
                  {filteredImages[selectedImageIndex].title}
                </h4>
                <p className="font-sans text-xs text-cream-200/80 mt-1">
                  {filteredImages[selectedImageIndex].subtitle} • ({selectedImageIndex + 1} of {filteredImages.length})
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
