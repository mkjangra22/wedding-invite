import React, { useMemo } from 'react';

export const PetalEffect = () => {
  // Generate random petals with varying sizes, speeds, and trajectories
  const petals = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.8 + Math.random() * 5) % 96}%`,
      animationDuration: `${12 + (i % 6) * 3}s`,
      animationDelay: `${(i * 1.3) % 10}s`,
      size: 10 + (i % 4) * 4,
      colorType: i % 3 === 0 ? 'maroon' : i % 3 === 1 ? 'gold' : 'rose',
      rotateSpeed: `${6 + (i % 5)}s`
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1] select-none" aria-hidden="true">
      <style>{`
        @keyframes fallDown {
          0% {
            transform: translateY(-40px) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.65;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(105vh) translateX(40px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute opacity-0"
          style={{
            left: petal.left,
            top: '-20px',
            animation: `fallDown ${petal.animationDuration} linear infinite`,
            animationDelay: petal.animationDelay,
          }}
        >
          {petal.colorType === 'maroon' && (
            <svg width={petal.size} height={petal.size * 1.3} viewBox="0 0 24 32" fill="#5C141C">
              <path d="M12 0 C2 10 2 24 12 32 C22 24 22 10 12 0 Z" fillOpacity="0.4" />
            </svg>
          )}
          {petal.colorType === 'rose' && (
            <svg width={petal.size} height={petal.size * 1.3} viewBox="0 0 24 32" fill="#9B2C3B">
              <path d="M12 0 C4 8 4 22 12 30 C20 22 20 8 12 0 Z" fillOpacity="0.35" />
            </svg>
          )}
          {petal.colorType === 'gold' && (
            <svg width={petal.size * 0.8} height={petal.size * 1.1} viewBox="0 0 20 28" fill="#C5A869">
              <circle cx="10" cy="14" r="6" fillOpacity="0.3" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
