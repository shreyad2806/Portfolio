"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

/** The only place GSAP plugins are registered. Import from here, from client components only (never from server components). */
let done = false;
export function registerGsap() {
  if (done || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true });
  done = true;
}
export { gsap, ScrollTrigger, useGSAP };
