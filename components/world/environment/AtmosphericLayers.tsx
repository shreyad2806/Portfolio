/** Lighting that follows the active destination: `--wx-accent` is tweened by the master timeline. */
export default function AtmosphericLayers() {
  return (
    <>
      <div data-layer="ambient" className="wx-ambient" aria-hidden="true" />
      <div className="wx-vignette" aria-hidden="true" />
      <div className="wx-grain" aria-hidden="true" />
    </>
  );
}
