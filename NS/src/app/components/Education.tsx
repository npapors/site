import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";

const education = [
  {
    school: "Sciences Po Aix",
    degree: "Double diplôme franco-allemand, Political Science and Government",
    period: "2025 – 2030",
  },
  {
    school: "Albert-Ludwigs-Universität Freiburg",
    degree: "B.A and M.A of Arts Angewandte Politikwissenschaft, Political Science and Government",
    period: "2025 – 2030",
  },
  {
    school: "Université franco-allemande - Deutsch-Französische Hochschule UFA DFH",
    degree: "",
    period: "2025 – 2030",
  },
  {
    school: "University of Basel",
    degree: "",
    period: "February 2026 – August 2026",
  },
  {
    school: "Hochschule für Musik Freiburg",
    degree: "Seminar Musikalische Übergänge",
    period: "October 2025 – February 2026",
  },
];

export function Education({
  isActive,
  activeSlide,
}: {
  isActive: boolean;
  activeSlide: number;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Compute direction during render, not in useEffect
  const prevSlide = useRef(activeSlide);
  let direction = 1;
  if (activeSlide !== prevSlide.current) {
    direction = activeSlide > prevSlide.current ? 1 : -1;
    prevSlide.current = activeSlide;
  }
  // Store for AnimatePresence exit animations
  const dirRef = useRef(direction);
  dirRef.current = direction;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const current = education[activeSlide] ?? education[0];
  if (!current) return null;

  return (
    <section
      className="w-screen h-screen flex-shrink-0 relative flex items-center overflow-hidden bg-white"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.04), transparent 60%)`,
          opacity: mousePosition.x > 0 ? 1 : 0,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-8 sm:px-12 md:px-16 lg:px-20 w-full">
        <motion.h2
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 50,
            filter: isActive ? "blur(0px)" : "blur(10px)",
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl font-light text-black mb-20"
        >
          Education
        </motion.h2>

        <motion.div
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6, delay: isActive ? 0.2 : 0 }}
          className="relative min-h-[200px]"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeSlide}
              custom={direction}
              initial={{
                opacity: 0,
                y: direction > 0 ? 60 : -60,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: direction > 0 ? -60 : 60,
                filter: "blur(8px)",
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-black mb-4 leading-tight">
                {current.school}
              </h3>
              {current.degree && (
                <p className="text-lg sm:text-xl md:text-2xl text-black/40 font-light mb-4 max-w-3xl">
                  {current.degree}
                </p>
              )}
              <p className="text-base sm:text-lg text-black/25 font-light">
                {current.period}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
