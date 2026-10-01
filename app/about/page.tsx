import type { Metadata } from "next";
import FlipWords from "@/components/FlipWords";
import { Body, Closing, Em, Hl, TextPage, Title } from "@/components/Prose";

export const metadata: Metadata = {
  title: "About - O’WOW",
  description:
    "O’WOW is a data intelligence platform for AI labs, built around the hardest data problem in AI: the physical world.",
};

const HANDLED = ["sourcing", "capture", "quality control", "delivery"];

export default function AboutPage() {
  return (
    <TextPage label="About owow">
      <Title>
        owow is a data intelligence platform for ai labs -{" "}
        <em className="italic text-white/60">
          built around the hardest data problem in ai: the physical world.
        </em>
      </Title>

      <Body>
        <p>
          the next wave of ai doesn’t learn from text alone -
          <br />
          <span className="text-white">
            it learns from the <Hl>real world</Hl>.
          </span>
        </p>

        <p>
          we help ai labs and robotics companies <Em>collect, structure, and scale</Em>{" "}
          that data:
        </p>

        {/* one "real", the noun after it flips through the three */}
        <p className="font-serif text-[clamp(26px,3vw,36px)] leading-[1.15] tracking-[-0.03em] text-white">
          <Hl>real</Hl> <FlipWords words={["environments", "tasks", "motion"]} />
        </p>

        <p>captured and verified at scale.</p>

        <p>we handle the parts that don’t scale on their own -</p>

        <ul className="flex flex-wrap gap-2.5">
          {HANDLED.map((h) => (
            <li
              key={h}
              className="rounded-full border border-white/15 px-4 py-1.5 font-mono text-[13px] uppercase tracking-[0.08em] text-white"
            >
              {h}
            </li>
          ))}
        </ul>
      </Body>

      <Closing>
        so research teams can spend their time on <Hl>the model</Hl>,{" "}
        <span className="text-white/35">not the pipeline.</span>
      </Closing>
    </TextPage>
  );
}
