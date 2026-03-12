import { motion } from "motion/react";
import { useState } from "react";

export function Experience({ isActive }: { isActive: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      className="w-screen h-screen flex-shrink-0 relative flex items-center overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(900px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 60%)`,
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
          className="text-5xl sm:text-6xl md:text-7xl font-light text-white mb-20"
        >
          Experience
        </motion.h2>

        <div>
          <motion.h3
            animate={{
              opacity: isActive ? 1 : 0,
              x: isActive ? 0 : 60,
              filter: isActive ? "blur(0px)" : "blur(6px)",
            }}
            transition={{ duration: 0.7, delay: isActive ? 0.15 : 0, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-6"
          >
            Membre du Parlement Régional de la Jeunesse
          </motion.h3>

          <motion.p
            animate={{
              opacity: isActive ? 1 : 0,
              x: isActive ? 0 : 60,
            }}
            transition={{ duration: 0.7, delay: isActive ? 0.25 : 0, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-white/40 font-light mb-2"
          >
            Région Sud — Provence-Alpes-Côte d'Azur
          </motion.p>

          <motion.p
            animate={{
              opacity: isActive ? 1 : 0,
              x: isActive ? 0 : 60,
            }}
            transition={{ duration: 0.7, delay: isActive ? 0.3 : 0, ease: [0.16, 1, 0.3, 1] }}
            className="text-base text-white/25 font-light mb-10"
          >
            October 2024 – October 2025 · Marseille, France
          </motion.p>

          <motion.div
            animate={{
              opacity: isActive ? 1 : 0,
              x: isActive ? 0 : 60,
            }}
            transition={{ duration: 0.7, delay: isActive ? 0.4 : 0, ease: [0.16, 1, 0.3, 1] }}
            className="w-12 h-px bg-white/20 mb-10"
          />

          <motion.p
            animate={{
              opacity: isActive ? 1 : 0,
              x: isActive ? 0 : 60,
              filter: isActive ? "blur(0px)" : "blur(4px)",
            }}
            transition={{ duration: 0.7, delay: isActive ? 0.45 : 0, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl text-white/50 font-light leading-relaxed max-w-2xl"
          >
            Elaborating public policies and European projects for young people in the Provence Alpes Côte d'Azur region.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
