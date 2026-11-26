# SheBuilds Tamil Nadu (Redesigned)

Community website for SheBuilds Tamil Nadu. Vite + React + Tailwind v4
(tokens live in src/index.css @theme; there is no tailwind.config.js).

## Design Rules (Modern E-commerce Style)
- Clean, modern design: border-1 border-gray-200, soft shadows (shadow-sm to shadow-xl)
- Smooth transitions: transition 200ms ease-in-out, no hard transforms
- Colors through tokens: primary (navy #1a1a2e), secondary (blue #3b82f6),
  accent-alt (cyan #06b6d4), danger (red #ef4444), background (white),
  surface (white), foreground (near-black #171717), muted (gray #6b7280)
- Buttons are pills (rounded-full) with hover shadow effects
- Logo and illustrations are clean, no borders or brutalist framing
- System fonts or Geist for typography

## Color Palette
- Primary: #1a1a2e (navy) — main brand color
- Secondary: #3b82f6 (blue) — primary actions/CTAs
- Background: #ffffff (white)
- Foreground: #171717 (near-black) — main text
- Border: #e5e7eb (light gray) — subtle dividers
- Muted: #6b7280 (gray) — secondary text

## Structure
- Sections live in src/sections/<name>/ and share one sticky Navbar.

## Workflow
- Maintain modern, clean aesthetic across all components
- No neobrutalist styling (no hard shadows, 2px borders, or ink colors)
- Run `npm run build` and `npm run lint` before finishing changes