"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Site-wide interaction lighting:
 *  - a scroll-progress beam at the top of the page
 *  - a soft cursor light that trails the pointer
 *  - a per-card spotlight (sets --mx / --my on the hovered glass card)
 */
const CARD_SELECTOR = ".card-surface, .glow-card, .project-showcase-card, .featured-build-card, .th-dest";

export default function InteractionLayer() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover)").matches;
    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;

    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      if (lightRef.current) lightRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      lightRef.current?.classList.add("is-on");
      const card = (e.target as Element | null)?.closest?.(CARD_SELECTOR) as HTMLElement | null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };
    const onLeave = () => lightRef.current?.classList.remove("is-on");

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    if (!reduce && fine) raf = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <motion.div className="th-progress" style={{ scaleX }} aria-hidden="true" />
      <div ref={lightRef} className="th-cursor-light" aria-hidden="true" />
    </>
  );
}
