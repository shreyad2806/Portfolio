"use client";

export default function ResumePrintButton() {
  return <button type="button" className="resume-print" onClick={() => window.print()}>Print / Save as PDF</button>;
}
