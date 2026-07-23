# The Flame Chicago — v2 Image Plan & Shot List

> The emotional payload of the v2 site is carried by photography. This maps every image slot in [`v2.html`](v2.html) to a generation-ready prompt, written against the **approved creative direction** and the **hard room-accuracy rule**. Each `.shot` placeholder in the build carries its `IMG-##` id and a one-line brief; this doc is the full spec.

## How to use
1. Generate against the **shared style block** below + each slot's prompt.
2. Pipeline: **Higgsfield → GPT Image 2**, 16:9 or the slot's aspect, ~2K. Feed the real-room reference photos (`creative-direction/references/space-01…04.jpeg`, `space-hero-flame-logo.png`) as **image references** so output matches the actual venue.
3. Run the result set through the `image-perf-pass` skill → WebP at display size, then drop each into its slot as `<img class="shot-img" …>` (replacing the placeholder `.shot-tag` + `.shot-brief`).

---

## HARD RULE — match the real room, invent nothing (rewritten 2026-07-21 against full interior + front-door reference set)

Every generated scene must be built only from fixtures that appear in the real reference photos: `creative-direction/references/space-front-door-1231.jpg`, `space-window-wall-and-bar.jpg`, and the full set in `creative-direction/references/space-photos-2026-07/` (22 frames), plus the older `space-01…04.jpeg`. **Look at those photos before writing a prompt.**

⚠️ **CORRECTION (2026-07-21):** the earlier version of this rule called the room a "windowless interior" and banned windows/glass/daylight. **That was wrong** — written before we had photos of the front of the house. The real room DOES have a full storefront window wall. Discard the windowless assumption. Any shot built to it (the four live daytime Occasions + the couple set) was generated blind to this.

## ★ CANONICAL ROOM MAP — confirmed accurate by Tyler, 2026-07-23

> **This section supersedes every earlier layout note in this file.** Prior versions had the two side walls **inverted** (they said "bar on the right, cabinets on the left") and invented a room-dividing partition that does not exist. If any older note conflicts with this map, this map wins.

**Orientation for everything below: standing at the front window, looking toward the back.** In that view the **bar is on your LEFT** and the **machine row is on your RIGHT**. On a plan drawn with the front at the top, the bar is the **EAST** wall (drawn right) and the machines the **WEST** wall (drawn left).

**FRONT — the storefront.** Full-height glass onto Ashland, frosted "WELCOME · YOU'RE ON FIRE · 312-218-…" decal band across the lower panes, three dark flat TVs mounted high in front of the glass facing into the room. **No door on this wall.**

**WEST WALL — entrance and the machine row** *(your RIGHT facing back)*
- The **ENTRANCE DOOR** at the front end of this wall. This is why the door falls just off-frame to the right in `space-2312`, past the EXIT sign.
- **FIVE** tall curved-screen machines running back from it, generously spaced with clear wall between each, every one with a **black high-back swivel chair**.
- The tall **dark carved wooden figure** stands among them; ornate carved **FLAME plaques** on the wall between machines; slim wavy **red metal ribbons as UPPER-WALL accents only** (upper portion, ending well above the machine tops); large leafy **potted plants**.

**EAST WALL — the bar and the service corner** *(your LEFT facing back)*
- **Front half — the bar:** a continuous counter, glossy black stone top, solid base. The **flames mural wraps ONLY its long front face** — the run facing out into the room. Every **return, end cap and side section is PLAIN**: black stone top over an unpatterned base. Tall **black swivel stools with round studded seats** tucked along it.
- Behind it: the **POS**, the **sweepstakes tv**, a small **neon flame**, and the **"THE FLAME" fire wall mural** — which is being removed, so render that stretch **plain**.
  - ⚠️ **THE BAR-SIDE TV IS CORNER-MOUNTED ON A BUMP-OUT (Tyler, 2026-07-23).** It is not flush against a flat wall — it hangs high in the corner on a projecting bump-out and sits at an **angle to the room**.
  - ⚠️ **NEVER RENDER THE CCTV / CAMERA-FEED MONITOR.** It exists below the TV in the photos; leave it out of every shot.
- A **ninth, FULL-SIZE cabinet stands free at the bar's front end, turned to FACE INTO THE ROOM**, with its own chair. Same size as the wall machines — not the small kiosk. Clearly visible in `space-2312`.
- **Back half — the same wall as the bar, further back along it.** In order: an **exit door with an EXIT sign above it** → the **restroom door** beside it → the **ATM** → the **standalone kiosk** (smaller than the wall machines) → a **supply closet door** past the kiosk. A **framed mirror** hangs above the ATM and kiosk, with a **NO SMOKING sign** above the mirror.

**BACK WALL**
- **Two cabinets** standing against it, **facing directly away from the front windows** (i.e. facing back up the room toward the entrance), with a **sweepstakes TV centred directly above the pair**, the trio **flanked by red ribbon wall art** on both sides.
- A **white marble round table with four chairs** in front of it. The top is **glossy**, so it picks up a warm reflection of the flame mural behind the bar — that reflection is what reads as colour on the table, not a printed graphic.

**FLOOR / CEILING / LIGHT**
- Light **grey plank floor** with a **dark runner rug** running the length of the centre aisle.
- White **suspended drop-ceiling**: recessed cans, square air vents.
- House light: saturated **magenta / pink / violet** wash on walls and ceiling, **cyan-blue** spill from the machine LED trim, warm amber accents, deep controlled blacks.

**MACHINE COUNT — exactly nine, and they reconcile:**

| Where | Count |
|---|---|
| West wall row | 5 |
| Back wall, flanking the sweepstakes TV | 2 |
| Full-size, free-standing at the bar's front end, facing into the room | 1 |
| Standalone kiosk beside the ATM (smaller) | 1 |
| **Total** | **9** |

**TWO SWEEPSTAKES SCREENS, TWO PLACES.** One above the bar on the east wall, one on the back wall centred over the two cabinets. Those are the only places the board belongs — never invent a third, and never centre one behind a subject to fill space.

⚠️ **BOTH SCREENS DO NOT BELONG IN EVERY SHOT (Tyler, 2026-07-23).** They exist in the room, but a screen should only appear when **the camera is actually pointed at the wall it hangs on**. Do not add a sweepstakes TV to a frame just because the room has them — if the angle looks at a stretch of wall that carries something else (the service corner, a plain run), render *that*, not a screen. A group shot looking toward the back had a sweepstakes TV floating on a bare left wall where the **exit door and restroom door** actually are.

**NO PARTITION.** Earlier notes claimed a partial dividing wall with a pass-through. That was my inference from a misread photo and is **not in the room**. Do not render one.

**THE FRONT DOOR / EXTERIOR** (`space-front-door-1231.jpg`): a plain glass storefront door at **1231 N Ashland**, with the "THE FLAME" fire decal + an "18+" sticker on the glass, a window AC unit above, a concrete step up from the sidewalk. It sits between a **criminal-law office** (grey window graphics: "CRIMINAL LAW / DUI / TRAFFIC") on the left and the lounge's own storefront window on the right. Honest, humble, unmistakably this Wicker Park block — do NOT invent a grander entrance.

## METHOD — how to actually get an accurate frame (adopted 2026-07-22)

Tyler, on why a run of shots came back wrong: *"The exercise is not to use the same elements to invent new scenes, it's to invent new scenes within the room we've defined."* A prose list of the room's contents reads to the model as "scatter these props into a plausible space." The photographs are the definition of the room; prose is only a caption on them.

**What went wrong, mechanically.** Generations got chained off previous generations — my own output passed as the first `--image`, over and over. Each render is then a copy of a copy and the room drifts toward a generic lounge. Worse, when an anchor frame already contained an error (a centred sweepstakes TV, floor-to-ceiling ribbons), instructing the model to "keep the casting from this reference" faithfully preserved its *room* too. The error was inherited on purpose.

**The rules:**
1. **A real photograph is always the first `--image`.** Never a previous render in that slot.
2. **Name a real vantage.** "Standing where `space-2309` was shot, looking down the room" — not an abstract description of a space.
3. **One step maximum off any prior render.** If a frame needs more correction than that, go back to the photographs and rebuild, don't iterate on an iteration.
4. **Casting travels as description, not by copying a frame** — so people can be carried forward without carrying that frame's room with them.
5. **Verify before presenting.** Crop-compare the result against the reference. State only what has actually been checked — do not publish a "rules applied" checklist on trust.
6. **Treat approved frames as canonical plates.** `occ-overnight`, `occ-shift`, `hero-01`, `img-05`, `img-13` are the reference standard for how this room renders; new work should sit beside them without looking like a different venue.

**Corollary:** fewer, better options per round. Confirm the room reads correctly before adding people, rather than presenting three finished-looking frames that are wrong underneath.

## WALKTHROUGH — the room in order, front door inward (Tyler's series, 2026-07-22)

Source: `space-2298` (exterior door), then `space-2310 → 2311 → 2312 → 2308 → 2316` moving inward. Use these to place a camera, not just to list objects.

- **The door.** Glass storefront door at street level, "THE FLAME" fire decal and an 18+ sticker on the glass, window AC unit above, concrete step up from the sidewalk.
- **Immediately inside — the front corner.** The storefront window wall runs beside you. On the wall: a NO SMOKING sign, a "smile you're on camera" notice, a slim red ribbon. A single machine with a black swivel chair sits in this corner. An EXIT sign overhead.
- **The counter begins on your LEFT.** Two flat WALL TVs are mounted above it (usually dark — these are the room's only two TVs, and the CHICAGO SWEEPSTAKES board belongs on them, nowhere else). The counter is white-based with a glossy black stone top; its aisle-facing front run carries the flames mural, with tall black studded swivel stools along it. Ends and returns are plain.
- **At the counter's near end: one machine stands free, turned to FACE INTO THE ROOM,** with its own chair. This is the "one in front" of the nine.
- **Down the room:** a row of machines with black swivel chairs, the tall dark carved wooden figure standing among them, ornate carved FLAME plaques on the wall between, slim red wavy ribbons as upper-wall accents, large potted plants.
- **The opposite wall** carries a machine with a chair, near a framed notice, a thermostat and a bin.
- **The floor:** light grey plank with a DARK RUNNER RUG running the length of the centre aisle. White drop-ceiling above with recessed cans, vents and a blue cove wash.
- **The back:** round marble-top tables with black chairs, the ATM with a small standing game beside it, the restrooms, and the FLAME wall mural (being removed — render plain).

## ⚠️ LAYOUT FIDELITY — the recurring failure (Tyler, 2026-07-22)

> *"All room compositions should match the layout of the room based on the images provided, not invented."*

Repeated rounds were rejected for **inventing room layout** — a plausible-looking gaming lounge rather than THIS one. Before writing any prompt, open the reference photos and work out **what is actually visible from the camera position you're describing**, then describe that. Specific facts that kept getting invented:

- **MACHINE INVENTORY — there are exactly nine, in known places (Tyler, 2026-07-22).** Don't guess a count and don't fill walls with extra cabinets:
  - **FIVE** in a row across the **wall opposite the counter** (this is the wall in `space-2301.jpg`)
  - **ONE** standing **in front, facing into the room**
  - **TWO** on the **back wall**
  - **ONE small standing game beside the ATM**
  If a shot looks down the wall opposite the counter, show **five** machines receding — not six, seven or "a long row."
- **The red ribbon wall art is NOT full height.** The wavy polished-red metal ribbons are an **upper-wall accent** — they hang in roughly the upper third-to-half of the wall and stop well above the floor, ending around the tops of the machines. Do not run them floor-to-ceiling.
- **The far end of the cabinet wall,** past the furthest machine: a **flat white wall**, then a **doorway with a wall-mounted AC unit above it** and a red EXIT sign nearby, and the storefront window beyond showing the street (sidewalk planters, shopfronts opposite).
- **The sweepstakes board belongs on the TVs only, in their real positions.** There are **two wall TVs**; the "CHICAGO SWEEPSTAKES" jackpot board lives on those, where they actually hang. **Do not force a sweepstakes screen into every composition** or invent extra ones to fill space — most frames don't need it visible at all.
- **There is NO partition.** An earlier note here described a partial dividing wall with a pass-through and a bulkhead. That was inferred from a misread photo and is wrong — see the canonical room map at the top of this file.

**PLANNED CHANGES — render the room as it WILL be, not as photographed (2026-07-21).** The client is changing several things; generate the future-state room, not the current reference state:
1. **Plain wall behind the bar** — the giant "THE FLAME" fire mural on the wall behind the counter is being taken down. Render that wall **plain** (white/LED-washed, no fire graphic). The flames wrapping the **front face of the counter** stay.
2. **No security monitor** — the CCTV/security-camera monitor behind the bar (the screen showing street/camera views) is removed. Do not render it.
3. **Two different screen types — don't mix them up:**
   - **Wall-mounted TVs** (the back jackpot TV and the corner TV behind the bar) display the **"Chicago Sweepstakes" jackpot board**: a starfield background with the "CHICAGO SWEEPSTAKES" title and glowing jackpot-amount pills (see `space-01-machines-wide.jpeg` / `space-04.jpeg`). NOT news, sports, or other content.
   - **Gaming cabinets / kiosks** display their **native game screen** — e.g. "GREAT BALLS OF FIRE": jackpot pills across the top, the game title, then a grid of colorful slot-game reel tiles below (see the cabinets in `space-01`/`space-04`). A cabinet must NOT show the plain starfield sweepstakes board — that lives only on the wall TVs.
4. **Clean storefront window** — no hanging signs, banners, or promotional placards in the storefront glass (the client will take them down). Keep the glass clean; daylight/street through it is fine.
5. **Keep the cabinet at the end of the counter** — a tall curved-screen gaming cabinet stands at the far end of the bar counter; don't drop it or replace it with a monitor sitting on the countertop.

**Still true:** if a shot needs an angle the references don't cover, drop the shot rather than invent the angle. Props people bring with them are fine; architecture and fixtures are not.

## CASTING DIRECTION (added 2026-07-21, per client)

The set so far skews to one demographic. Going forward, deliberately widen it. Include:
- **Young Caucasian men and women** (the set is currently short on these).
- **A blonde woman** — the client asked for this specifically; make sure at least one prominent occasion features her.
- **Young professional men in sports gear** — think a guy stopping in on the way to/from a game or the gym, team jersey or athletic wear, reads young and professional.

Keep the room's real neighborhood mix — this is additive, not a replacement. Spread the new casting across the seven unshot evening occasions (Date night, With friends, When nobody can agree, Something to celebrate, Before the show, The afterparty) and any daytime reshoots.

⚠️ **NO BRANDED APPAREL — put this in every prompt with people in it.** Left to itself the generator dresses people in real licensed team jerseys: a "With friends" pass came back with Bears, Cubs, Bulls "JORDAN 23", White Sox and Blackhawks kit. Real trademarks and a player name on the client's marketing site is a licensing exposure (same reason the Doritos bag was rejected in batch 1). Always specify: *"All clothing must be GENERIC and UNBRANDED — no sports-team jerseys, team logos, crests, mascots, player names or numbers, league marks, or brand wordmarks on any garment, cap or bag. Plain solid colours only."* This applies to the **Seedream retouch pass too**, which will happily add logos back.

**"Sports gear" casting means plain athletic wear** — solid-colour athletic tops, a zip track jacket, a blank ball cap. It reads "came from a game" without the trademark risk.

## MODEL PLAYBOOK — which model for what (learned 2026-07-22)

**GPT Image 2 (`gpt_image_2`) — the default for scenes.** Best for building/composing a shot in the real room: layout, fixtures, lighting, framing. Feed the real reference photos as `--image` so the room locks. Iterating on it by feeding its own last output back as the anchor works well for surgical changes ("keep everything, change only X").

**⚠️ GPT Image 2's weakness is SKIN.** It renders faces **mottled and blotchy** — patches of olive/green and grey mixed into warm tones across cheeks, forehead and jaw — and it is especially bad on medium and deep skin tones. **Re-prompting GPT Image 2 for "clean even skin" does NOT fix it.** Don't burn passes trying; escalate to Seedream.

**Seedream 4.5 (`seedream_v4_5`) — the face/skin fixer.** Purpose-built for face editing. One pass cleans up mottled skin into even, consistent tone with realistic texture. Also returns much larger output (4992×3328 vs 2048×1360). Params differ from GPT Image 2: `--prompt` (required), `--image`, `--aspect_ratio`, `--quality high`.

**Two things Seedream will do unless you explicitly forbid them — put BOTH in every face-retouch prompt:**
1. **It invents signage and branding.** It fabricated a large "GREAT BALLS OF FIRE" wordmark onto the gaming cabinet's blank side panel unprompted. Always include: *"Do NOT add any text, logo, wordmark, painted graphic or branding that is not already present in the input. Add no signage or lettering anywhere."*
2. **It recomposes and crops.** It will zoom/tighten and shift subjects out of position. Always include: *"Preserve the input's framing and composition exactly — do not crop, zoom, or move the subjects; they stay the same size and position in frame with the same room around them."*

Budget ~3 passes for a face retouch and check each output for (a) invented signage and (b) framing drift before accepting.

**Other models on the account worth knowing:** `nano_banana_2_skin_enhancer` (a dedicated skin enhancer, but takes `input_image` as an *object* — needs a pre-uploaded media id plus a `preset_id`, so it's more setup than Seedream), `nano_banana_2` (Nano Banana Pro, character work), `soul_*` family (lifestyle/editorial), `flux_2`, `seedream_v5_pro`.

**Pure colour/exposure notes never need a regeneration.** Grade the approved file directly with ImageMagick — that keeps the composition pixel-identical, which matters once framing has been signed off. (`-brightness-contrast`, `-gamma`, `-level`.) Avoid LAB separate/recombine round-trips — they shifted luminance badly here. `-selective-blur` is far too slow on a full 2048px frame; crop the region, process, composite back.

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

## Occasion chooser — where the shelved frames landed (2026-07-20)

The Occasions section was rebuilt as a chip chooser, which is what finally earned these photos a home: **nine images, one section's worth of height, one visible at a time.** Five of the six shelved frames are in it (IMG-08, the lamp detail, is still free).

Each occasion owns one photograph. The order is deliberate — the room gets busier and the light gets cooler as you move down the list, and the wash tint behind each frame is keyed to its time of day:

| When | Occasion | Image |
|-------|----------|-------|
| 11:00–1:00 | Coming off the overnight | IMG-09 |
| 1:00–3:00 | Waiting out the weather | IMG-07 |
| 3:00–5:00 | An hour that's yours | IMG-11 |
| 5:00–6:30 | After the shift | IMG-02 |
| 6:30–8:00 | An easy date night | IMG-10 |
| 8:00–8:45 | A night with friends | IMG-06 |
| 8:45–9:30 | When nobody can agree | IMG-03 |
| 9:30–10:15 | Something to celebrate | IMG-05 |
| 10:15–11:00 | Before or after the main event | IMG-12 |
| late | The afterparty | occ-afterparty |

**Rail derivatives** live in `assets/img/rail/` — a 3:2 centre-crop of each source at webp q72, sized to the source rather than one fixed width (landscape sources at 1600×1067, the 4:5 portraits at their native 1120×747 rather than upscaled). ~1MB for all nine, but only one loads before interaction. Regenerate with:

```
magick img-NN.jpg -resize "1600x1067^" -gravity center -crop 1600x1067+0+0 +repage -quality 72 rail/img-NN.webp
```

Gravity matters: cropping the 4:5 portraits `north` cut the warm flame-lamp key light out of IMG-02 and IMG-11 and left them magenta. Both are `center`. IMG-09 is `north` (keeps her face off the bottom edge).

`hero-01` is deliberately **not** in the rail — it stays exclusive to the hero so the page doesn't repeat its strongest frame.

**The afterparty got its own frame, 2026-07-23** — the last chip still on a borrowed image. IMG-13's double duty is over; it is now only the invite section's full-bleed background, and `rail/img-13.webp` is orphaned (left in place, unreferenced).

`occ-afterparty` is the machine row: five friends crowded on ONE cabinet partway down the row, one seated playing with the others leaning in over her shoulder. Deliberately **a different camera to the rest of the set** (Tyler's call) — every other occasion looks down the room or across the bar; this one runs along the machine wall. Generated with GPT Image 2 (3:2, 2k) anchored on `space-2301.jpg`, then **cropped in on the group** rather than regenerated: `magick r2-B.png -crop 1229x819+570+329 +repage`, Lanczos to 1600×1067, webp q72. Masters in `assets/img/_masters/occasions/` (`occ-afterparty_76d5732d.png` full frame, `occ-afterparty_crop.png` the shipped crop).

Two rejected siblings from the same round are filed at `creative-direction/occasions-afterparty/` with the contact sheet: **A the bar** (most room-accurate but reads like the existing "night with friends" chip) and **C the front window, late** (real night on Ashland — the only frame that says *late* — but the group sits small and far right; worth revisiting if the afterparty copy ever needs the clock to read).

**v2, same day — Tyler's four tweaks.** The blank-panel blemish is fixed. One surgical GPT Image 2 pass anchored on the v1 crop (`fix1.txt`, "change only two things, do not reframe") repaired both near cabinet screens into proper jackpot-pills-over-tile-grid displays, and changed the standing man's head-back laugh to a level, warm grin — the set already had several head-back laughs and they were starting to read forced. **Expression notes are a legitimate render edit; wardrobe/lighting/colour still are not.** Because the pass was anchored on the *crop*, it came back at full 2048×1360, which bought back the resolution the v1 crop had spent.

Then post only: crop `1635x1090+65+30` (centres the group, drops the empty machine-row third and the foreground floor), grade `-gamma 1.22 -brightness-contrast 4x3`, Lanczos to 1600×1067, webp q72 → 117KB.

**v3 — the blonde's gaze.** She was pointing at the screen while looking away from it. One more surgical pass (`fix2.txt`, anchored on the v2 crop *before* grading) turns only her head and eyes toward the cabinet; everything else held, including the man's grin and the repaired screens. Regraded `-gamma 1.26 -brightness-contrast 4x3` to land back at mean 21.6. Note each surgical pass comes back at roughly the same raw mean (~13.7), so the grade has to be re-applied every time — never grade before a render pass, only after.

**Calibrate brightness against the set, don't eyeball it.** Mean grey (`magick f -colorspace Gray -format '%[fx:mean*100]' info:`) across the occasion rail runs 17–29. v1 sat at 14 — genuinely too dark, which is what Tyler flagged. v2 lands at 21.5: mid-pack, still the latest-feeling frame in the chooser, blacks uncrushed.

## Notes / open
- **Room-accuracy is the gate.** The four earlier concept frames (`references/01–04`) depict a larger, wrong venue and are **mood-only** — do not reuse. Every new asset must read as *this* storefront room.
- **Regular portraits** (testimonial avatars, IMG in `.tcard`) should ideally be **real regulars** (with permission) rather than generated; fall back to warm generated portraits matched to the ICP only if needed.
- Hold final generation for Tyler's greenlight (batch-1 review with Dana & Ross is the established gate).

## IMG-12-window · Footer facade (2026-07-20)

The footer's hand-drawn SVG map was replaced with a photograph: a close look **in through the storefront glass** rather than the wide full-building shot, per Tyler. Cropped from the existing IMG-12 master — no new generation needed, and it holds up sharp at this zoom because IMG-12 is 2048×1360.

```
magick img-12.jpg -crop 980x551+625+700 +repage -quality 82 img-12-window.jpg
magick img-12-window.jpg -quality 78 img-12-window.webp
```

980×551 (16:9), 41K webp / 77K jpg. Frames the warm interior — chandeliers, seating, the row of cabinets — with a sliver of awning above and sidewalk below to ground it. The wide IMG-12 stays in use in the Occasions chooser ("Before or after the main event").
