import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [variant, setVariant] = useState<"default" | "link" | "button">("default");

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (target.closest("a")) setVariant("link");
      else if (target.closest('button, [role="button"]')) setVariant("button");
      else setVariant("default");
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Detect background color under cursor
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => {
      const el = document.elementFromPoint(pos.x, pos.y);
      if (!el) return;
      const section = el.closest("section");
      if (!section) return;
      const bg = window.getComputedStyle(section).backgroundColor;
      // Check if dark by parsing rgb
      const match = bg.match(/\d+/g);
      if (match) {
        const brightness = (parseInt(match[0]) + parseInt(match[1]) + parseInt(match[2])) / 3;
        setIsDark(brightness < 128);
      }
    };
    check();
  }, [pos]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: pos.x - 8,
        y: pos.y - 8,
      }}
      transition={{
        type: "spring",
        stiffness: 800,
        damping: 35,
        mass: 0.3,
      }}
    >
      <motion.div
        className="rounded-full"
        animate={{
          backgroundColor: isDark ? "rgb(255,255,255)" : "rgb(0,0,0)",
          width: variant === "link" ? "32px" : variant === "button" ? "24px" : "16px",
          height: variant === "link" ? "8px" : variant === "button" ? "24px" : "16px",
          borderRadius: variant === "link" ? "16px" : "50%",
          opacity: variant === "default" ? 0.9 : 0.6,
        }}
        transition={{
          backgroundColor: { duration: 0.3 },
          width: { duration: 0.25 },
          height: { duration: 0.25 },
        }}
      />
    </motion.div>
  );
}
