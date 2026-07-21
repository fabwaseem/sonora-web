# Sonora Web

Marketing site for **Sonora** — a private, fully offline speech studio for Windows.

Tagline: *Your voice studio, without the cloud.*

## Stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS** + design tokens matched to the Sonora desktop app
- **Framer Motion** + **GSAP** for motion
- **Three.js** / **React Three Fiber** for ethereal beams and ambient fields
- **shadcn/ui** component primitives

## Product

Sonora is a Windows desktop app for:

- Local **text-to-speech**
- Local **speech-to-text**
- **Global dictation** into any focused Windows app
- Multi-engine voice library
- Automatic signed updates via [sonora-releases](https://github.com/fabwaseem/sonora-releases)

This repo is the public landing page only. The desktop app lives in the Sonora app repository; binaries ship from `fabwaseem/sonora-releases`.

## Design system

Aligned with the Sonora booth UI:

| Token | Value |
| --- | --- |
| Background | `#000000` |
| Surface | `#121214` / `#1a1a1e` |
| Accent | `#3b82f6` / `#60a5fa` |
| Text | `#f4f4f5` / muted `#a1a1aa` |
| Fonts | **Manrope** (UI) + **JetBrains Mono** (meta) |

Dark theme only.

## Site sections

1. Loading screen  
2. Hero (3D beams background)  
3. Product showcase  
4. Features  
5. Use cases  
6. Privacy  
7. Studio modes / engines  
8. FAQ  
9. Cinematic curtain footer  

## Download API

`GET /api/download` resolves the latest Windows installer from GitHub Releases and redirects to the `.exe`.

- Source: `https://api.github.com/repos/fabwaseem/sonora-releases/releases/latest`
- Cached for 5 minutes (`revalidate: 300`)
- Falls back to the releases page if the API is unavailable

Download buttons call `triggerDownload()` (no raw API URL in link previews).

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build    # production build
pnpm start    # run production server
pnpm lint     # eslint
pnpm typecheck
```

## Project layout

```
app/
  page.tsx              # landing entry
  layout.tsx            # fonts + metadata
  globals.css           # Sonora tokens + footer utilities
  api/download/route.ts # latest installer redirect
components/
  landing/              # page sections + motion helpers
  ui/                   # ethereal beams, ambient field, cinematic footer
public/images/          # logo.svg, preview.jpg
```

## Related repos

- Desktop app: local Sonora project  
- Releases / installers: [fabwaseem/sonora-releases](https://github.com/fabwaseem/sonora-releases)
