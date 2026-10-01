import type { Metadata } from "next";
import { Body, Closing, Em, Hl, Quote, TextPage, Title } from "@/components/Prose";

export const metadata: Metadata = {
  title: "Manifesto - O’WOW",
  description:
    "Physical AI doesn’t have a data problem the way language models did. It has a bigger one.",
};

export default function ManifestoPage() {
  return (
    <TextPage label="Manifesto">
      <Title>
        physical ai doesn’t have a data problem the way language models did.{" "}
        <em className="italic text-white/50">it has a bigger one.</em>
      </Title>

      <Body>
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
          and there’s <Em>no shortcut</Em>{" "}
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

        <Quote>
          we think the next generation of ai won’t be won by whoever has the
          biggest model.
        </Quote>

        <p>
          it’ll be won by whoever has <Hl>the best data</Hl> -
          <br />
          and the best data comes from doing the{" "}
          <Em>unglamorous</Em> work of
          collecting it right,
          <br />
          at a <Hl>scale</Hl> nobody else is willing to do.
        </p>
      </Body>

      <Closing>
        that’s what <Hl>o&apos;wow</Hl> is for.
      </Closing>
    </TextPage>
  );
}
