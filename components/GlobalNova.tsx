"use client";

import { usePathname } from "next/navigation";
import NovaAssistant from "@/components/NovaAssistant";
import { novaDestinations } from "@/lib/nova-engine";

export default function GlobalNova() {
  const pathname = usePathname();
  // The homepage has Nova in the hero; interior routes share the same guide in a dock.
  if (pathname === "/") return null;

  function navigate(id: string) {
    const target = novaDestinations.find((destination) => destination.id === id)?.target ?? "skills";
    window.location.assign("/#" + target);
  }

  return (
    <div className="xh-global-nova">
      <NovaAssistant onNavigate={navigate} listenForOpen startClosed />
    </div>
  );
}
