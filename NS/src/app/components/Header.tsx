import { motion } from "motion/react";
import { useState } from "react";

const sections = [
  { name: "Home", index: 0 },
  { name: "About", index: 1 },
  { name: "Education", index: 2 },
  { name: "Experience", index: 3 },
  { name: "Competences", index: 4 },
  { name: "Contact", index: 5 },
];

const darkSections = new Set([1, 3, 5]); // About, Experience, Contact

export function Header({
  currentIndex,
  onNavigate,
}: {
  currentIndex: number;
  onNavigate: (index: number) => void;
}) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const isDark = darkSections.has(currentIndex);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 pt-6 pointer-events-none"
    >
      {/* Desktop */}
      <nav
        className={`hidden md:block max-w-2xl mx-auto rounded-full border pointer-events-auto transition-all duration-500 ${
          isDark
            ? "bg-white/[0.06] backdrop-blur-2xl border-white/[0.1]"
            : "bg-white/60 backdrop-blur-2xl border-black/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.04)]"
        }`}
      >
        <div className="flex items-center justify-center px-3 py-2.5">
          {sections.map((section) => {
            const isActive = currentIndex === section.index;
            return (
              <motion.button
                key={section.name}
                onClick={() => onNavigate(section.index)}
                onMouseEnter={() => setHoveredItem(section.index)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative px-5 py-2 text-base rounded-full transition-colors duration-300 z-10 ${
                  isActive
                    ? isDark ? "text-white" : "text-black"
                    : isDark
                      ? "text-white/40 hover:text-white/70"
                      : "text-black/40 hover:text-black/70"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute inset-0 rounded-full -z-10 ${
                      isDark ? "bg-white/[0.12]" : "bg-black/[0.06]"
                    }`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {section.name}
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Mobile dots */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto">
        <div
          className={`flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-500 ${
            isDark
              ? "bg-white/[0.06] backdrop-blur-2xl border border-white/[0.1]"
              : "bg-white/60 backdrop-blur-2xl border border-black/[0.06]"
          }`}
        >
          {sections.map((section) => (
            <motion.button
              key={section.name}
              onClick={() => onNavigate(section.index)}
              animate={{
                scale: currentIndex === section.index ? 1.5 : 1,
                opacity: currentIndex === section.index ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
              className={`w-2 h-2 rounded-full ${isDark ? "bg-white" : "bg-black"}`}
              aria-label={section.name}
            />
          ))}
        </div>
      </div>
    </motion.header>
  );
}