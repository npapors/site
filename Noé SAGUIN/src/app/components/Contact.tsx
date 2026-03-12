import { motion } from "motion/react";
import { Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const bgImage = "https://images.unsplash.com/photo-1765110850917-4795be42161a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9vZHklMjBjaXR5JTIwbmlnaHQlMjBhYnN0cmFjdHxlbnwxfHx8fDE3NzI3MzI5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function Contact({ isActive }: { isActive: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const links = [
    {
      id: "email",
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "contact@sciences-po.noe-saguin.eu",
      href: "mailto:contact@sciences-po.noe-saguin.eu",
    },
    {
      id: "linkedin",
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/noé-s",
      href: "https://www.linkedin.com/in/noé-s",
    },
  ];

  return (
    <section
      className="w-screen h-screen flex-shrink-0 relative flex items-center overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/85" />

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
          Contact
        </motion.h2>

        <div className="space-y-8">
          {links.map((link, i) => (
            <motion.a
              key={link.id}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : 60,
                filter: isActive ? "blur(0px)" : "blur(6px)",
              }}
              transition={{
                duration: 0.7,
                delay: isActive ? 0.2 + i * 0.12 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setHoveredLink(link.id)}
              onMouseLeave={() => setHoveredLink(null)}
              className="group flex items-center gap-5 py-4 border-b border-white/[0.06] transition-colors duration-300 hover:border-white/[0.15]"
            >
              <span className="text-white/30 group-hover:text-white/60 transition-colors duration-300">
                {link.icon}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-xs tracking-widest uppercase text-white/25 block mb-1">
                  {link.label}
                </span>
                <span className="text-lg sm:text-xl md:text-2xl font-light text-white/60 group-hover:text-white transition-colors duration-300 block truncate">
                  {link.value}
                </span>
              </div>
              <motion.div
                animate={{
                  x: hoveredLink === link.id ? 4 : 0,
                  y: hoveredLink === link.id ? -4 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white/50 transition-colors duration-300" />
              </motion.div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.8, delay: isActive ? 0.6 : 0 }}
          className="text-sm text-white/20 font-light mt-20"
        >
          © {new Date().getFullYear()} Noé Saguin
        </motion.p>
      </div>
    </section>
  );
}
