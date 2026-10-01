import { Fragment } from "react";
import { TextPage } from "./Prose";

/**
 * Legal pages (terms, privacy) in the site's text-page style, laid out like a
 * classic single-column policy page: big title, effective date, numbered
 * section headings, body copy and bullet lists.
 *
 * Content is written in a tiny markup so the long documents stay readable:
 *   "## 3. Title"     section heading
 *   "* item"          bullet (consecutive lines form one list)
 *   blank line        paragraph break (single line breaks are kept, e.g. addresses)
 *   **bold**          inline bold (used for lead-ins like "License." / "Account —")
 * Email addresses are linked automatically.
 */

type Block =
  | { kind: "h2"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] };

function parse(src: string): Block[] {
  const blocks: Block[] = [];
  let para: string[] = [];
  let list: string[] | null = null;
  const flush = () => {
    if (para.length) blocks.push({ kind: "p", text: para.join("\n") });
    if (list) blocks.push({ kind: "ul", items: list });
    para = [];
    list = null;
  };
  for (const raw of src.split("\n")) {
    const line = raw.trim();
    if (!line) flush();
    else if (line.startsWith("## ")) {
      flush();
      blocks.push({ kind: "h2", text: line.slice(3) });
    } else if (line.startsWith("* ")) {
      if (para.length) {
        blocks.push({ kind: "p", text: para.join("\n") });
        para = [];
      }
      (list ??= []).push(line.slice(2));
    } else {
      if (list) {
        blocks.push({ kind: "ul", items: list });
        list = null;
      }
      para.push(line);
    }
  }
  flush();
  return blocks;
}

// domain must end in a word character, so a sentence's full stop isn't swallowed
const EMAIL_SPLIT = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;
const IS_EMAIL = /^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/; // no /g: .test() stays stateless

/** **bold** + auto-linked emails */
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-medium text-white">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>
            {part.split(EMAIL_SPLIT).map((bit, j) =>
              IS_EMAIL.test(bit) ? (
                <a
                  key={j}
                  href={`mailto:${bit}`}
                  className="text-white underline decoration-white/30 underline-offset-[3px] transition-colors hover:decoration-white"
                >
                  {bit}
                </a>
              ) : (
                <Fragment key={j}>{bit}</Fragment>
              ),
            )}
          </Fragment>
        ),
      )}
    </>
  );
}

export default function LegalPage({
  title,
  scope,
  effective,
  body,
}: {
  title: string;
  scope: string;
  effective: string;
  body: string;
}) {
  return (
    <TextPage label="Legal">
      <h1 className="mt-6 font-serif text-display font-normal tracking-[-0.035em]">{title}</h1>
      <p className="mt-6 text-meta text-white/50">{scope}</p>
      <p className="mt-1 text-meta text-white/50">Effective date: {effective}</p>

      <div className="mt-14 text-body tracking-[-0.01em] text-white/70">
        {parse(body).map((b, i) => {
          if (b.kind === "h2")
            return (
              <h2
                key={i}
                className="mb-5 mt-16 border-t border-white/10 pt-10 font-serif text-display-sm font-normal tracking-[-0.02em] text-white first:mt-0 first:border-t-0 first:pt-0"
              >
                {b.text}
              </h2>
            );
          if (b.kind === "ul")
            return (
              <ul key={i} className="mb-5 list-disc space-y-2 pl-6 marker:text-white/30">
                {b.items.map((it, k) => (
                  <li key={k} className="pl-1">
                    <Inline text={it} />
                  </li>
                ))}
              </ul>
            );
          return (
            <p key={i} className="mb-5 whitespace-pre-line">
              <Inline text={b.text} />
            </p>
          );
        })}
      </div>
    </TextPage>
  );
}
