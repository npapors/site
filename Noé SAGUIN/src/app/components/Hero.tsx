import { motion } from "motion/react";
import { useState } from "react";
import bgImage from "figma:asset/c54c89c5175a9725bcd785030ce0209850f860d0.png";

export function Hero({ isActive }: { isActive: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      className="w-screen h-screen flex-shrink-0 relative flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-white/60" />

      {/* Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.05), transparent 60%)`,
          opacity: mousePosition.x > 0 ? 1 : 0,
        }}
      />

      <div className="relative z-10 text-center px-6">
        <motion.h1
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 60,
            filter: isActive ? "blur(0px)" : "blur(12px)",
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-black font-light mb-10"
        >
          Noé SAGUIN
        </motion.h1>

        <motion.p
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 40,
          }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl sm:text-2xl md:text-3xl text-black/40 font-light mb-4"
        >
          Willkommen auf dieser Website
        </motion.p>

        <motion.p
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 40,
          }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl sm:text-2xl md:text-3xl text-black/40 font-light"
        >
          Welcome to this website
        </motion.p>
      </div>
    </section>
  );
}