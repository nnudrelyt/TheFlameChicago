# The Flame Chicago — v2 Image Plan & Shot List

> The emotional payload of the v2 site is carried by photography. This maps every image slot in [`v2.html`](v2.html) to a generation-ready prompt, written against the **approved creative direction** and the **hard room-accuracy rule**. Each `.shot` placeholder in the build carries its `IMG-##` id and a one-line brief; this doc is the full spec.

## How to use
1. Generate against the **shared style block** below + each slot's prompt.
2. Pipeline: **Higgsfield → GPT Image 2**, 16:9 or the slot's aspect, ~2K. Feed the real-room reference photos (`creative-direction/references/space-01…04.jpeg`, `space-hero-flame-logo.png`) as **image references** so output matches the actual venue.
3. Run the result set through the `image-perf-pass` skill → WebP at display size, then drop each into its slot as `<img class="shot-img" …>` (replacing the placeholder `.shot-tag` + `.shot-brief`).

---

## Shared style block (prepend to every prompt)
> Cinematic photograph inside The Flame, an intimate neighborhood sweepstakes gaming lounge in Wicker Park, Chicago. **The exact room:** white drop-ceiling with recessed can lights, light wood-look laminate floor, white walls washed with blue and magenta LED, a single row of "Great Balls of Fire" slot-style cabinets, a "Chicago Sweepstakes" jackpot TV, dark upholstered bar stools, a few potted plants, and a small glowing "THE FLAME" neon flame table lamp. **Lighting = premium through control, not brightness:** warm amber/gold key light, deep but not crushed blacks, cool neon as accent only, practical light sources visible in frame. Eye-level, shot as a participant, moderate depth of field. Real, diverse working-class locals 30–55, styled-candid, no dress code. Capture the genuine half-second *after* a moment (a laugh, a nod), never a posed grin. Warm, welcoming, authentic. No text overlays, no logos beyond the in-room neon lamp.

**Negative / avoid:** casino floor, Las Vegas glitz, fluorescent flat light, empty sterile room, a bigger/fancier invented venue, cash/chips/money on screen, "jackpot / big win" signage, gambling-parlor mood, stock-photo grin, watermark.

---

## Slots

| ID | Section | Aspect | Purpose |
|----|---------|--------|---------|
| IMG-01 | Hero | 16:9 wide | The emotional first impression |
| IMG-02 | Day-mirror | 4:5 tall | The exhale / decompression |
| IMG-03–05 | First visit | 3:2 | The 3 steps |
| IMG-06–10 | The room | mixed | Honest room gallery |
| IMG-11 | Reassurance | 4:5 | Signature warm detail |
| IMG-12 | Neighborhood | 3:2 | The real storefront |
| IMG-13 | Invite | 16:9 wide | The close |

### IMG-01 · Hero — "The half-second after a laugh" ✅ GENERATED (2026-07-09)
Live in `v2.html` hero. GPT Image 2, 16:9 2k, fed space-01/03/04 refs; chose variant A (job `ea3f400d`). Shipped: `assets/img/hero-01.webp` (160K) + `.jpg` fallback (532K); masters + alt variant B in `assets/img/_masters/`. Room-accurate (Chicago Sweepstakes TV, Great Balls of Fire cabinets, flame lamp, LED wash), 4 diverse locals mid-laugh, warm-key/cool-magenta.
Medium-wide, eye-level. 3–4 working locals mid-laugh at a lit cabinet, one leaning in; warm key on faces, magenta LED wash on the white wall behind, the flame lamp glowing at frame edge. The living room behind stays legible. Golden-warm grade. *This is the frame that has to make someone feel welcome in one second.*

### IMG-02 · Day-mirror — "The exhale" ✅ GENERATED (variant A, job 1b0f167f)
4:5 portrait. One regular (e.g. 40s, work jacket) settling onto a bar stool, shoulders dropping, half-smile, eyes soft; warm lamp glow across the face, quiet and human. Shallow DOF, room softly behind. Unposed, intimate.

### IMG-03 · Step 1 — "Walk in" ✅ GENERATED (job eedf8a3b)
3:2. Warm entry moment: a guest just inside the door getting a genuine welcome from a staff member; warm tungsten entry light, neon lamp visible deeper in the room. Friendly, low-key.

### IMG-04 · Step 2 — "Grab a seat & a snack" ✅ GENERATED (job f2cbbae3)
3:2. Close-warm: complimentary snacks and a soft drink on the counter beside a stool, a hand reaching in; cozy amber light, cabinet glow bokeh behind. Hospitable, not product-hero.

### IMG-05 · Step 3 — "Play & stay awhile" ✅ GENERATED (job c5343457)
3:2. Hands at the cabinet buttons, the win-light just triggering, a relaxed smile at the edge of frame; the game read as *fun and entertainment*, never stakes. No cash, no payout displays.

### IMG-06 · Room — "The room, alive" ✅ GENERATED + RESHOT SOCIAL (job b758ba60; Tyler flagged first cut as too many backs-to-camera/uninviting → reshot with people playing BUT turned toward each other, laughing, faces visible)
16:9 wide establishing. The full row of "Great Balls of Fire" cabinets glowing, a few people in, magenta/blue wash on white walls, drop-ceiling cans, laminate floor. Sells the real venue at its best-lit.

### IMG-07 · Room — "Snacks & stools" ✅ GENERATED (variant B, job 1419511e)
1:1. Detail of the dark bar stools and snack setup, a potted plant in frame, warm pool of light.

### IMG-08 · Room — "The flame lamp" ✅ GENERATED (job 1db83481)
1:1. Tight, loving detail of the "THE FLAME" neon flame table lamp against the white wall, slight magenta spill. The room's signature object.

### IMG-09 · Room — "Mid-play detail" ✅ GENERATED (job 8fa8406b)
4:5 tall. Hands, a smile, the glow of the win-light; shallow, warm, candid.

### IMG-10 · Room — "Good company" ✅ GENERATED (job b77549d9)
1:1. Two people at adjacent stools mid-conversation, drinks in hand, easy laughter; the social read of the room.

### IMG-11 · Reassurance — "The signature glow" ✅ GENERATED (job d25cc4d5)
4:5. Calm, inviting still: the neon flame lamp and a potted plant on a clean white wall, warm and uncluttered. Communicates comfort and "clean, easy, smoke-free" without a person.

### IMG-12 · Neighborhood — "The storefront at dusk" ✅ REGENERATED 2026-07-13 (variant B, job 9ab18d7b — now grounded in the CLIENT'S REAL PHOTOS of the storefront, IMG_2185/2186 fed as architecture refs; cream limestone facade + dentil cornice + carved arched window heads + gray polished-granite storefront base w/ corner pilaster, blue-hour dusk, BLANK sign band/no text, warm-glowing plate glass with cabinets visible inside. Master: `_masters/batch1/img-12b_real-building_9ab18d7b.png`; prior Street-View-derived version stashed in `_masters/batch1/_superseded/`. NOTE: the real photos still show the Luisi Legal Group sign band + cash window decals physically up — generated clean per Tyler's earlier "no longer there / warm glow, no text" direction.)
3:2. The real Ashland Ave storefront exterior at blue hour, "THE FLAME" signage glowing warm against the cool evening street; honest, unmistakably this Wicker Park block. Match the real facade — do not invent a grander exterior.

### IMG-13 · Invite — "One seat, waiting" ✅ GENERATED (variant B, job ea9a972b)
16:9 wide. Warm, inviting: an open stool at a softly glowing cabinet, the room out of focus behind, a single practical light drawing the eye. Reads as "we'll save you a seat." Quiet, aspirational, no people or one blurred figure.

---

## Room gallery shelved (2026-07-16)

Per Tyler, "The room" gallery section was **removed from `index.html`** — the photos are good but a raw room-tour section wasn't earning its place for a first-time visitor. All six generated assets stay in `assets/img/` (+ masters in `_masters/`) and are logged here for reuse inside future content sections (occasions / F&B / host / FAQ imagery):

| ID | File | Shot | Natural reuse |
|----|------|------|---------------|
| IMG-06 | img-06 (16:9) | Room-wide, cabinets glowing, people playing & facing each other (reshot social variant) | "Bring the crew" / occasions wide |
| IMG-02 | img-02 (4:5) | Man in work jacket unwinding, lamp glow on face | "After the shift" solo occasion |
| IMG-07 | img-07 (1:1) | Snacks, drink, stools, plant, warm pool of light | F&B / "on the house" section |
| IMG-08 | img-08 (1:1) | THE FLAME neon lamp detail | Brand accent anywhere |
| IMG-09 | img-09 (4:5) | Woman settling in at a cabinet, room behind | Host/welcome or occasions |
| IMG-10 | img-10 (1:1) | Two friends laughing over drinks | Date-night occasion |

The mosaic CSS (`.roomgallery`, `.shot.wide`) remains in `v2.css` in case the gallery returns.

## Notes / open
- **Room-accuracy is the gate.** The four earlier concept frames (`references/01–04`) depict a larger, wrong venue and are **mood-only** — do not reuse. Every new asset must read as *this* storefront room.
- **Regular portraits** (testimonial avatars, IMG in `.tcard`) should ideally be **real regulars** (with permission) rather than generated; fall back to warm generated portraits matched to the ICP only if needed.
- Hold final generation for Tyler's greenlight (batch-1 review with Dana & Ross is the established gate).
