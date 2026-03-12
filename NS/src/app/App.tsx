import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { CustomCursor } from "./components/CustomCursor";
import { useRef, useEffect, useState, useCallback } from "react";

const SECTION_COUNT = 6;
const EDUCATION_INDEX = 2;
const EDUCATION_SLIDES = 5;
const SKILLS_INDEX = 4;
const SKILLS_SLIDES = 5;

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Render state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [navDirection, setNavDirection] = useState(1);
  const [eduSlide, setEduSlide] = useState(0);
  const [skillSlide, setSkillSlide] = useState(0);

  // Mirror refs — always fresh, no closure issues
  const indexRef = useRef(0);
  const eduRef = useRef(0);
  const skillRef = useRef(0);
  const isScrolling = useRef(false);
  const hitBoundary = useRef(false);
  const accDelta = useRef(0);

  const THRESHOLD = 80;

  const lock = (ms: number) => {
    isScrolling.current = true;
    setTimeout(() => {
      isScrolling.current = false;
      accDelta.current = 0;
    }, ms);
  };

  const goToSection = useCallback((index: number, dir: number) => {
    if (index < 0 || index >= SECTION_COUNT) return;

    indexRef.current = index;
    hitBoundary.current = false;
    setCurrentIndex(index);
    setNavDirection(dir);

    // Reset carousel to correct edge
    if (index === EDUCATION_INDEX) {
      const s = dir > 0 ? 0 : EDUCATION_SLIDES - 1;
      eduRef.current = s;
      setEduSlide(s);
    }
    if (index === SKILLS_INDEX) {
      const s = dir > 0 ? 0 : SKILLS_SLIDES - 1;
      skillRef.current = s;
      setSkillSlide(s);
    }

    lock(900);
  }, []);

  const handleDelta = useCallback((delta: number) => {
    if (isScrolling.current) return;

    const idx = indexRef.current;
    const forward = delta > 0;
    const dir = forward ? 1 : -1;

    // --- Education carousel ---
    if (idx === EDUCATION_INDEX) {
      const slide = eduRef.current;
      if (forward && slide < EDUCATION_SLIDES - 1) {
        const next = slide + 1;
        eduRef.current = next;
        setEduSlide(next);
        hitBoundary.current = false;
        lock(500);
        return;
      }
      if (!forward && slide > 0) {
        const next = slide - 1;
        eduRef.current = next;
        setEduSlide(next);
        hitBoundary.current = false;
        lock(500);
        return;
      }
      // At boundary
      if (!hitBoundary.current) {
        hitBoundary.current = true;
        lock(400);
        return;
      }
      hitBoundary.current = false;
      goToSection(idx + dir, dir);
      return;
    }

    // --- Skills carousel ---
    if (idx === SKILLS_INDEX) {
      const slide = skillRef.current;
      if (forward && slide < SKILLS_SLIDES - 1) {
        const next = slide + 1;
        skillRef.current = next;
        setSkillSlide(next);
        hitBoundary.current = false;
        lock(500);
        return;
      }
      if (!forward && slide > 0) {
        const next = slide - 1;
        skillRef.current = next;
        setSkillSlide(next);
        hitBoundary.current = false;
        lock(500);
        return;
      }
      if (!hitBoundary.current) {
        hitBoundary.current = true;
        lock(400);
        return;
      }
      hitBoundary.current = false;
      goToSection(idx + dir, dir);
      return;
    }

    // --- Normal section ---
    goToSection(idx + dir, dir);
  }, [goToSection]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      accDelta.current += e.deltaY;
      if (Math.abs(accDelta.current) >= THRESHOLD) {
        const d = accDelta.current;
        accDelta.current = 0;
        handleDelta(d);
      }
    };

    let ty = 0;
    const onTouchStart = (e: TouchEvent) => { ty = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = ty - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 50) handleDelta(dy);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault(); handleDelta(100);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault(); handleDelta(-100);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [handleDelta]);

  return (
    <div ref={containerRef} className="h-screen w-screen overflow-hidden cursor-none bg-black">
      <CustomCursor />
      <Header currentIndex={currentIndex} onNavigate={(i) => goToSection(i, i > indexRef.current ? 1 : -1)} />

      <div
        className="flex h-full transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        <Hero isActive={currentIndex === 0} />
        <About isActive={currentIndex === 1} />
        <Education isActive={currentIndex === 2} activeSlide={eduSlide} />
        <Experience isActive={currentIndex === 3} />
        <Skills isActive={currentIndex === 4} activeSlide={skillSlide} />
        <Contact isActive={currentIndex === 5} />
      </div>
    </div>
  );
}
