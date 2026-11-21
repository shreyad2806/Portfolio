import Starfield from "./Starfield";
import Nebula from "./Nebula";

/** The world's night sky behind interior routes (fixed, decorative). */
export default function InteriorSky() {
  return (
    <div className="wx-interior-sky" aria-hidden="true">
      <Starfield /><Nebula />
      <div className="wx-interior-glow" />
    </div>
  );
}
