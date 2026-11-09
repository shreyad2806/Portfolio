import { portfolioData } from "@/lib/portfolio-data";

const COLORS = ["#b49aff", "#66e9f4", "#ffc46e", "#78e5bd", "#f58dc8"];

/** Slow-scrolling ticker of the technologies Shreya works with, taken from portfolio data. */
export default function TechMarquee() {
  const items = Array.from(new Set(portfolioData.technicalExpertise.flatMap((g) => g.skills)));
  const row = items.map((label, i) => ({ label, color: COLORS[i % COLORS.length] }));
  return (
    <div className="th-marquee" aria-label="Technologies">
      <div className="th-marquee-track" aria-hidden="true">
        {[...row, ...row].map((item, i) => (
          <span key={i} className="th-marquee-item" style={{ "--c": item.color } as React.CSSProperties}>
            <i /> {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
