"use client";

import { useCallback, useEffect, useRef } from "react";
import NovaChatWindow from "./NovaChatWindow";
import NovaLauncher from "./NovaLauncher";
import { useNova } from "./useNova";

/** Global Nova: a small launcher that opens a compact floating panel (bottom sheet on phones). Never part of page layout. */
export default function NovaWidget() {
  const nova = useNova();
  const { open, setOpen } = nova;
  const launcherWrap = useRef<HTMLDivElement>(null);
  const { cancel } = nova;
  const close = useCallback(() => { cancel(); setOpen(false); requestAnimationFrame(() => launcherWrap.current?.querySelector<HTMLButtonElement>("button")?.focus()); }, [setOpen, cancel]);
  useEffect(() => { document.documentElement.toggleAttribute("data-nova-open", open); }, [open]);

  return (
    <div className="nv-root">
      {open ? <NovaChatWindow nova={nova} onClose={close} /> : <div ref={launcherWrap}><NovaLauncher onOpen={() => setOpen(true)} /></div>}
    </div>
  );
}
