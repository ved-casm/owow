import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

// Serif for big titles (variable, EXPO axis -100 → 100)
const exposure = localFont({
  variable: "--nf-serif",
  display: "swap",
  src: [
    { path: "../public/fonts/exposure_var-s.p.0~ic5x2rcfe2t.woff2", style: "normal" },
    { path: "../public/fonts/exposure_italic_var-s.p.0fmy77v-63hry.woff2", style: "italic" },
  ],
});

// Sans for body / UI
const suisse = localFont({
  variable: "--nf-sans",
  display: "swap",
  src: [
    { path: "../public/fonts/suisse_intl_regular-s.p.0w-j-mvnwxlql.woff2", weight: "400" },
    { path: "../public/fonts/suisse_intl_medium-s.p.0l-v90mx9xhv7.woff2", weight: "500" },
    { path: "../public/fonts/suisse_intl_semibold-s.p.030jtgfxf68c2.woff2", weight: "600" },
  ],
});

// Mono (also used for digits - the Suisse subset has no numerals)
const jetbrainsMono = localFont({
  variable: "--nf-mono",
  display: "swap",
  weight: "100 800",
  src: "../public/fonts/70bc3e132a0a741e-s.p.1409xf.ylxg8g.woff2",
});

export const metadata: Metadata = {
  title: "O'WOW - Data Intelligence for Physical AI",
  description:
    "Robots learn from what they’re shown. We know what’s worth showing, then capture, structure, and verify it at global scale.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${exposure.variable} ${suisse.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
