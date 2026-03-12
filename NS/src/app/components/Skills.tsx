import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";

const languages = [
  { name: "French" },
  { name: "German" },
  { name: "English" },
  { name: "Swedish" },
  { name: "Schwiizertüütsch" },
];

const competences = [
  "European politics", "European Union", "Economics", "Law",
  "Informatics", "IA", "European affairs", "International relations",
  "Public policy", "Monetary politics", "Diplomacy",
  "Politique économique", "French-German relations", "Music",
];

export function Skills({
  isActive,
  activeSlide,
}: {
  isActive: boolean;
  activeSlide: number;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Compute direction during render
  const prevSlide = useRef(activeSlide);
  let direction = 1;
  if (activeSlide !== prevSlide.current) {
    direction = activeSlide > prevSlide.current ? 1 : -1;
    prevSlide.current = activeSlide;
  }
  const dirRef = useRef(direction);
  dirRef.current = direction;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const currentLang = languages[activeSlide] ?? languages[0];

  return (
    <section
      className="w-screen h-screen flex-shrink-0 relative flex items-center overflow-hidden bg-white"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.03), transparent 60%)`,
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
          Competences
        </motion.h2>

        {/* Languages carousel */}
        <motion.div
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6, delay: isActive ? 0.15 : 0 }}
          className="mb-16"
        >
          <span className="text-sm tracking-widest uppercase text-black/30 mb-10 block">
            Languages
          </span>

          <div className="relative min-h-[100px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeSlide}
                custom={direction}
                initial={{
                  opacity: 0,
                  y: direction > 0 ? 50 : -50,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: direction > 0 ? -50 : 50,
                  filter: "blur(8px)",
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-4xl sm:text-5xl md:text-6xl font-light text-black">
                  {currentLang.name}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Competences */}
        <motion.div
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 20,
          }}
          transition={{ duration: 0.6, delay: isActive ? 0.3 : 0, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm tracking-widest uppercase text-black/30 mb-8 block">
            Competences & Interests
          </span>

          <div className="flex flex-wrap gap-x-6 gap-y-2.5">
            {competences.map((comp) => (
              <span
                key={comp}
                className="text-base sm:text-lg md:text-xl font-light text-black/40 hover:text-black transition-colors duration-300"
              >
                {comp}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
