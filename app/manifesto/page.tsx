import type { Metadata } from "next";
import { Hl, TextPage } from "@/components/Prose";

export const metadata: Metadata = {
  title: "Manifesto - O’WOW",
  description:
    "Physical AI doesn’t have a data problem the way language models did. It has a bigger one.",
};

export default function ManifestoPage() {
  return (
    <TextPage label="Manifesto">

      <h1 className="mt-6 font-serif text-[clamp(38px,5vw,64px)] font-normal leading-[1.06] tracking-[-0.035em]">
        physical ai doesn’t have a data problem the way language models did.{" "}
        <em className="italic text-white/60">it has a bigger one.</em>
      </h1>

      <div className="mt-14 space-y-8 text-[18px] leading-[1.6] tracking-[-0.01em] text-white/70">
        <p>
          text was already sitting on the internet, waiting to be scraped.
          <br />
          <span className="text-white">
            the <Hl>real world</Hl> isn’t.
          </span>
        </p>

        <p>
          every hour of usable robot data has to be{" "}
          <Hl>captured, checked, and labeled</Hl>
          <br />
          by someone, somewhere, doing something real -
          <br />
          and there’s <em className="font-serif text-[1.12em] italic text-white">no shortcut</em>{" "}
          for that.
        </p>

        <p>
          so we didn’t build a scraper.
          <br />
          we built the <Hl>infrastructure</Hl> to go get it:
          <br />
          <span className="text-white">people, cameras, pipelines, and the qa</span>
          <br />
          to make sure what comes out the other end is actually good enough to
          train on.
        </p>

        <blockquote className="border-l-2 border-white/25 pl-6 font-serif text-[clamp(22px,2.2vw,28px)] italic leading-[1.35] tracking-[-0.02em] text-white">
          we think the next generation of ai won’t be won by whoever has the
          biggest model.
        </blockquote>

        <p>
          it’ll be won by whoever has <Hl>the best data</Hl> -
          <br />
          and the best data comes from doing the{" "}
          <em className="font-serif text-[1.12em] italic text-white">unglamorous</em> work of
          collecting it right,
          <br />
          at a <Hl>scale</Hl> nobody else is willing to do.
        </p>
      </div>

      <p className="mt-20 font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-0.03em]">
        that’s what <Hl>o&apos;wow</Hl> is for.
      </p>
    </TextPage>
  );
}
