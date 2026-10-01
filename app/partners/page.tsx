import { Bot, Globe, Mic, Sparkles, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import { Body, Closing, Hl, TextPage, Title } from "@/components/Prose";

export const metadata: Metadata = {
  title: "Partners - O’WOW",
  description:
    "We build the human data behind frontier AI - real-world, captured, and verified.",
};

// same icons as the hero's focus-area carousel
const CATEGORIES: { icon: LucideIcon; name: string; what: string }[] = [
  {
    icon: Mic,
    name: "voice & speech ai",
    what: "in-the-wild speech, beyond what scraping reaches",
  },
  {
    icon: Globe,
    name: "world models",
    what: "real environments and interaction data",
  },
  {
    icon: Bot,
    name: "robotics",
    what: "teleoperation and manipulation data",
  },
  {
    icon: Sparkles,
    name: "foundation model labs",
    what: "bespoke human data, any modality",
  },
];

export default function PartnersPage() {
  return (
    <TextPage label="Partners">
      <Title>who we work with</Title>

      <Body>
        <p>
          we build the <Hl>human data</Hl> behind frontier ai -
          <br />
          <span className="text-white">real-world, captured, and verified.</span>
        </p>
        <p>today we work with leading teams across every category below:</p>
      </Body>

      <ol className="mt-10 border-t border-white/10">
        {CATEGORIES.map((c, i) => (
          <li
            key={c.name}
            className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-white/10 py-7 sm:grid-cols-[auto_auto_1fr] sm:gap-x-7"
          >
            <span className="text-meta font-medium tracking-[0.06em] text-white/50">
              {String(i + 1).padStart(2, "0")}
            </span>
            <c.icon
              aria-hidden
              strokeWidth={1.5}
              className="hidden h-6 w-6 translate-y-1 self-start text-white/80 sm:block"
            />
            <div>
              <p className="font-serif text-display-sm tracking-[-0.03em] text-white">
                {c.name}
              </p>
              <p className="mt-2 text-body text-white/70">{c.what}</p>
            </div>
          </li>
        ))}
      </ol>

      <Closing>
        we’re already <Hl>trusted</Hl> by top teams in each of these categories.
      </Closing>
    </TextPage>
  );
}
