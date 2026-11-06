import Navbar from "@/components/Navbar";
import JournalHub from "@/components/JournalHub";

export const metadata = {
  title: "Journal — Shreya Dubey",
  description: "Engineering notes, open-source discoveries, tools, plugins and skills Shreya Dubey is exploring.",
};

export default function JournalPage() {
  return (
    <>
      <Navbar />
      <JournalHub />
    </>
  );
}
