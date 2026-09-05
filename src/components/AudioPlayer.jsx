import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/audioSynth';
import { weddingData } from '../data/weddingData';

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      soundManager.stop();
    };
  }, []);

  const toggleAudio = () => {
    setHasInteracted(true);

    if (isPlaying) {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      soundManager.stop();
      setIsPlaying(false);
      return;
    }

    const candidateFiles = [
      weddingData.audio?.songUrl,
      '/wedding-song.mp3',
      '/song.mp3',
      '/music.mp3',
      'wedding-song.mp3',
      'song.mp3',
    ].filter(Boolean);

    let startedSong = false;

    const tryPlayAudio = async () => {
      for (const src of candidateFiles) {
        try {
          if (!audioRef.current) {
            audioRef.current = new Audio();
          }
          audioRef.current.src = src;
          audioRef.current.volume = weddingData.audio?.volume ?? 0.9;
          audioRef.current.loop = true;
          await audioRef.current.play();
          startedSong = true;
          setIsPlaying(true);
          return;
        } catch (err) {
          // File not found or not playable, check next candidate
        }
      }

      // If no custom MP3 file is placed in public/, play the loud raga synthesizer
      if (!startedSong) {
        soundManager.play();
        setIsPlaying(true);
      }
    };

    tryPlayAudio();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Play hint for first-time visitors */}
      {!hasInteracted && !isPlaying && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="hidden sm:flex items-center gap-2 bg-cream-50/95 backdrop-blur-md text-ink-800 text-xs px-3.5 py-1.5 rounded-full border border-gold/40 shadow-gold-soft"
        >
          <Music className="w-3.5 h-3.5 text-maroon-700 animate-bounce" />
          <span>Play Music</span>
        </motion.div>
      )}

      {/* Music Toggle Button */}
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? "Mute Background Music" : "Play Wedding Music"}
        className={`group relative flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md transition-all duration-300 border ${
          isPlaying
            ? 'bg-maroon-900 text-gold-light border-gold shadow-gold-glow scale-105'
            : 'bg-cream-50/90 text-maroon-900 border-gold/50 shadow-md hover:bg-cream-100 hover:scale-105'
        }`}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-gold-light" />
            {/* Animated Sound Waves */}
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
            </span>
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-ink-600 group-hover:text-maroon-800" />
        )}
      </button>
    </div>
  );
};
