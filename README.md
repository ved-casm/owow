# owow-labs

OWOW Labs Website: data intelligence for physical AI.

Built with Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion, three.js and Lenis.

## Getting started

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command         | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Local dev server with hot reload |
| `npm run build` | Production build                 |
| `npm run start` | Serve the production build       |
| `npm run lint`  | ESLint                           |

## Pages

| Route        | File                       |
| ------------ | -------------------------- |
| `/`          | `app/page.tsx`             |
| `/manifesto` | `app/manifesto/page.tsx`   |
| `/about`     | `app/about/page.tsx`       |
| `/partners`  | `app/partners/page.tsx`    |
| `/terms`     | `app/terms/page.tsx`       |
| `/privacy`   | `app/privacy/page.tsx`     |

Legal copy lives in `lib/legal/`. Open TODOs (refund policy, registered
address, cookie tools, etc.) are listed at the top of those files and must be
filled in before publishing.

## Project layout

- `app/`: routes, global styles and design tokens (`globals.css`), icons and
  the share-preview image (`opengraph-image.jpg`)
- `components/`: navbar, hero, footer (`footer/DotMap.tsx`), text-page
  building blocks (`Prose.tsx`, `Legal.tsx`)
- `lib/`: map data, places, legal copy
- `public/`: fonts, videos (AV1 WebM + H.264 MP4), images (AVIF + JPEG),
  brand files in `public/brand/`

## Environment variables

| Name                   | Purpose                                                                    |
| ---------------------- | -------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Live domain, e.g. `https://owowlabs.ai`. Used for share-preview image URLs |

On Vercel the production domain is used automatically if this is not set.

## Fonts

`public/fonts/` contains Exposure and Suisse Intl. These are commercial
typefaces (the Exposure file is a trial build). A licence is required before
the site is used publicly.
