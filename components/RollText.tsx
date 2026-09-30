/**
 * Each character sits in its own 1-line mask with a duplicate beneath it.
 * On hover the characters roll up one after another (stagger via --i).
 */
export default function RollText({ text }: { text: string }) {
  return (
    <span className="roll" aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          className="roll-char"
          aria-hidden
          style={{ "--i": i } as React.CSSProperties}
        >
          <span>{ch}</span>
          <span>{ch}</span>
        </span>
      ))}
    </span>
  );
}
