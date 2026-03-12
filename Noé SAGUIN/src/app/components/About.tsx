import { motion } from "motion/react";
import { useState } from "react";

export function About({ isActive }: { isActive: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const lines = [
    "I study political science at Sciences Po Aix and the University of Freiburg as part of a Franco-German double degree."
    "During my studies, I have also taken courses at the University of Basel and the Hochschule für Musik Freiburg."
    "I was a member of the Regional Youth Parliament of Région Sud and I am now involved with the European Federalists."
    "I’m especially interested in the European Union and international cooperation..",
  ];

  return (
    <section
      className="w-screen h-screen flex-shrink-0 relative flex items-center overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(900px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.07), transparent 60%)`,
          opacity: mousePosition.x > 0 ? 1 : 0,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-8 sm:px-12 md:px-16 lg:px-20 w-full">
        <motion.h2
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 50,
            filter: isActive ? "blur(0px)" : "blur(10px)",
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl font-light text-white mb-16"
        >
          About
        </motion.h2>

        <div className="space-y-6">
          {lines.map((text, i) => (
            <motion.p
              key={i}
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : 60,
                filter: isActive ? "blur(0px)" : "blur(6px)",
              }}
              transition={{
                duration: 0.7,
                delay: isActive ? 0.15 + i * 0.07 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-lg sm:text-xl md:text-2xl text-white/60 font-light leading-relaxed"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
