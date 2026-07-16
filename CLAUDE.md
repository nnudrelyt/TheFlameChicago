# The Flame Chicago — website

Static single-page site for **theflamechicago.com** (Main Sequence client Dana & Ross). Wicker Park sweepstakes gaming lounge. **Must be live before Wicker Park Fest, July 24 2026.**

## Stack
- **Static HTML on Vercel** — no build step, no framework. `index.html` (EN) is the source of truth; `es.html` is the ES parallel page (TBD).
- Preview: `.claude/launch.json` → `python3 -m http.server 4750` (config `flame-static`).
- Deploy: Vercel (`the-main-sequence` scope). `vercel.json` = cleanUrls + no trailing slash.
- Fonts: Adobe Fonts kit `tvp7hvq` (Bebas Neue Pro + Source Sans 3) — same as the brand messaging deck.

## Design
- Creative direction: **premium = lighting, not brightness** — warm, moody, glowing; never fluorescent/gambling-den.
- Palette + type tokens in `assets/global.css` (`:root`). Pillar accent system: People=teal, Winners=amber, Atmosphere=magenta, Experience=violet.
- A11y floor: WCAG 2.1 AA — focus-visible, skip link, `prefers-reduced-motion` honored in `global.js` + CSS.

## Content
- Copy is framework-forward per `Brand_Messaging_Framework.md` (Dropbox/Public/The Flame Chicago/creative-direction/). Gaming reframed as **entertainment**; no cash/payout/jackpot language.
- Single-page sections (content pass Jul 16 2026): Hero ("This seat is yours." + chips incl. 21+) → First visit (3 steps + "So, what are the games?" note) → Neighbors (featured review) → Reassurance (Come as you are) → Invite (tagline "Relax. Play. Connect." close + Wicker Park Fest note) → footer/Visit ("Find us on Ashland"). "The room" gallery was shelved 2026-07-16 (photos logged in IMAGE-PLAN.md "Room gallery shelved" for reuse; replacement content section TBD with Tyler).
- The "Open now" pill is JS time-gated (America/Chicago, 11–23h) in `global.js`; static fallback text says "Open daily", closed state styled via `.live.closed` in v2.css. `<noscript>` fallback in head un-hides `.reveal` blocks.
- Kickers were deliberately removed from all sections except the hero (anti-scaffold); pillar accent colors are decorative, not strictly pillar-mapped.

## OPEN / placeholders (⚠️ replace before launch)
- **Phone** `(773) 555-0199`, **hours** "11am–late", and **socials** (`sameAs: []`) are PLACEHOLDERS — get real values from client.
- **Imagery**: hero/welcome/atmosphere art are CSS lighting treatments as stand-ins. Replace with venue-accurate assets regenerated to the real room (Higgsfield), then run `image-perf-pass` → WebP.
- **Language = automatic via browser (Accept-Language).** No manual language toggle/links — the header EN/ES pill and footer "Español" link were removed per client (Jul 8). `hreflang` alternates (en/es/x-default) are kept in `<head>` for SEO. TODO when building **es.html**: add an Accept-Language redirect (Vercel i18n rewrite or small JS) so Spanish-browser visitors are served `/es` automatically — hreflang alone does not redirect users.
- **GA4** not yet installed (gate behind a measurement-id const).
- **DNS**: currently GoDaddy builder; plan cutover to Vercel ≥24–48h before Jul 24. Decide www vs apex canonical (set to `www` here).
- Plan of record: `~/.claude/plans/draft-a-plan-that-lucky-nova.md`.
