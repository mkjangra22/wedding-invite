import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScratchCardScreen } from './components/ScratchCardScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WeddingMessage } from './components/WeddingMessage';
import { Itinerary } from './components/Itinerary';
import { Families } from './components/Families';
import { VenueTravel } from './components/VenueTravel';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';
import { PetalEffect } from './components/PetalEffect';

export function App() {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnterInvitation = () => {
    setHasEntered(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="relative min-h-screen bg-cream-100 text-ink-800 selection:bg-gold-light selection:text-maroon-900 font-sans overflow-x-hidden">
      {/* Ambient Floating Petals */}
      <PetalEffect />

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div
            key="scratch-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.7 } }}
            className="w-full min-h-screen"
          >
            <ScratchCardScreen onEnterInvitation={handleEnterInvitation} />
          </motion.div>
        ) : (
          <motion.div
            key="main-invitation"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative z-10"
          >
            {/* Sticky Minimal Navbar */}
            <Navbar />

            {/* Main Content Flow */}
            <main>
              <Hero />
              <WeddingMessage />
              <Itinerary />
              <Families />
              <VenueTravel />
            </main>

            {/* Sacred Closing & Footer */}
            <Footer />

            {/* Floating Audio Controller */}
            <AudioPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
