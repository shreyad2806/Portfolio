"use client";

import { Mail, Linkedin, Github, FileText } from "lucide-react";
import ContactCard from "./ContactCard";
import { contactData } from "@/data/contact";

export default function ContactGrid() {
  const cards = [
    {
      icon: Mail,
      title: "Email",
      description: "The best way to reach me. I'll respond as soon as possible.",
      value: contactData.email,
      buttonLabel: "Send Email",
      buttonHref: `mailto:${contactData.email}`,
      isExternal: false,
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      description: "Let's connect and grow our professional network.",
      value: contactData.linkedin,
      buttonLabel: "Connect",
      buttonHref: contactData.linkedin,
      isExternal: true,
    },
    {
      icon: Github,
      title: "GitHub",
      description: "Explore my projects, experiments, and open-source contributions.",
      value: contactData.github,
      buttonLabel: "View GitHub",
      buttonHref: contactData.github,
      isExternal: true,
    },
    {
      icon: FileText,
      title: "Resume",
      description: "Download my latest resume to learn more about my experience and projects.",
      value: "",
      buttonLabel: "Download Resume",
      buttonHref: contactData.resume,
      isExternal: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <ContactCard key={card.title} {...card} index={index} />
      ))}
    </div>
  );
}
