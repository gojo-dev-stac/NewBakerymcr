# Crumb & Co: design direction (Day 8)

**Brand:** Crumb & Co, a concept pâtisserie / cake shop (Hyderabad, prices in ₹).
**Hook:** *Build a cake by scrolling.*
**Feel:** bright daylight pâtisserie. Cream paper, chocolate ink, square pastel blocks. Calm, confident motion with a soft landing, no bounce.

Uniqueness: 8 of 8 different from the last three sites (see the sites log).

---

## Choices

| Menu | Pick | Why (this site) |
|---|---|---|
| Look | **L20 Storybook geometry**, daylight pâtisserie | Square pastel blocks that meet edge to edge, like the layers of a cut cake. One pastel per chapter, small centred labels, sideways page wipes. It feels light and bright and still looks grown-up. |
| Palette | **Pâtisserie daylight** (custom) | bg cream `#F5EDE2` (**measured**: the films' backdrop on the left; it fades to blush `#E9CEC7` on the right, so film stages use a cream → blush gradient) · surface `#FFFFFF` / paper `#FFFAF3` · text chocolate `#3B2418` (12.5:1) · muted `#6E5243` (6.1:1) · accent strawberry `#B8304C` (5.1:1 on cream, cream text on it 5.6:1). Chapter blocks: pistachio `#CFE0B4`, strawberry milk `#F7CDD3`, chocolate band `#3B2418`. Chocolate is the main ink, so the page doesn't read as "pink because cake"; strawberry only on buttons, the order pill and one word per section. |
| Type | **T11 Bricolage Grotesque + Onest** | Bricolage at heavy weight and a slightly narrow width gives friendly, chunky headlines that suit a shop selling by the kilo. Onest is clean for prices and order details. Display tracking −0.03em, line-height 1.05. No script font. |
| Nav | **N11 split bars**, built from **NV11 three islands** | Left: the wordmark. Centre: Menu · Build · Inside · Visit. Right: Pickup/Delivery toggle + the strawberry **Order (0)** pill. Over the hero the islands slide apart to keep the stage clear. The order pill is the landing spot for F8. |
| Hero | **"Build a ___ by scrolling."** over a landscape stage (HR28) | The cake stacks itself onto the stand (hero-build video). The missing word melts from one word to the next as each layer lands (*base → jam → crème → cake*, on the video's sponge → strawberry jam → cream → … → frosting beats), so the sentence finishes exactly when the cake does. It is not a portal, and nothing grows to full screen. |
| Section shape | **S10 stepped edges** | Sections meet on a 3-step edge, like the tiers of a cake, and the steps shift a little as you scroll. |
| Cards | **C9 ticket**, as a cake-box tag | A square pastel block with the cut-out cake. A perforated stub at the bottom carries Nº, name, ₹ price and **Add**. |
| Signature | **The Crown** (ganache-pour video + M74 + F7) | Ganache pours and drips over the plain cake. At the measured second the berries and macarons drop, real cut-outs of them are **thrown out of the frame on curved arcs**. They float over the page (F7, 3 depths) into the menu, where one lands in the order pill (F8). |
| Loader | **Cake bar** (M63 family, rebuilt in Round 5) | A small cake builds itself as the progress bar (chocolate · jam · cream) with a 0 → 100 counter; a strawberry drops on top, the wordmark fades in, a chocolate drip curtain slides down and pulls away onto the hero. CSS from the first paint. |
| Travelling object | **F7** floating toppings + **F8** land in the order pill | No 3D: the toppings are flat cut-outs (lightest option, fits the look). |

**Easing:** arrivals `cubic-bezier(0.22,1,0.36,1)` · sideways wipes `cubic-bezier(0.77,0,0.175,1)` · scrubs linear. Stagger 50 ms. No bounce, no squish.

---

## Section plan (8 sections + loader + nav, ~30 s record run)

| # | Section | Layout | Type | Starts from → how it is restyled |
|---|---|---|---|---|
| 0 | Loader "Layers" | — (I7) | — | `RapidLayers` (fx) → four cake-colour layers, the wordmark is set in the chocolate layer, then a sideways wipe |
| N | Nav "Three islands" | **NV11** | — | Three islands → square corners (not pills), cream islands with hairline chocolate borders, strawberry order pill, Pickup/Delivery toggle |
| 1 | **Hero: Build a cake** | **HR28** | video (hero-build) | Split header (headline left · copy + [Order a cake] [Build your own] right) over a 16:9 stage. The stage is the hero-build video on cream, its edges faded into the page. A "layer 1/7" mini meter sits under the stage |
| 2 | **The Crown** (signature) | **VD01** | video (ganache-pour 0–6.8 s) | Pinned scrub. The glass segment cards become three square pastel tags: *Pour* (pistachio) · *Drip* (strawberry milk) · *Crown* (cream). The FRAME counter becomes a "ganache 0 → 100%" line. The cut-out toppings are thrown out at the drop second |
| 3 | **The Counter** (cake menu) | **GL19** | static, shop | Make-way expanding grid as a cake counter: 4 cakes in C9 ticket cards (Chocolate Crown ₹1,450/kg · Vanilla Cloud ₹1,050/kg · Pistachio Rose ₹1,650/kg · Strawberry Shortcake ₹1,250/kg; every cake priced per kg), plus a chocolate "Nº 05 · Build your own cake →" tile that fills the grid and links to the builder, and a row of small tiles (slice of the day ₹240, macaron box ₹540, cupcakes ₹420, candles ₹90) with topping cut-outs as icons. The open tile grows, the others make way. Floating toppings drift around the heading |
| 4 | **Inside the Crown** | **ST12** | video (slice-cut) | Hero metric left ("7 layers · 7 hours · 0 shortcuts"), the slice video right in a square block (sticky ~140vh). Figure row underneath: sponge 3 · jam 2 · cream 2 · ganache 1 (the same layers as the hero build), with each figure lined up to the layer it names |
| 5 | **Build your own** | **PS07** | static, shop | Three-step configurator → four steps in one row: **Shape** (round / heart / square) → **Sponge** (vanilla / chocolate / pistachio) → **Finish** (cream / ganache drip / berry crown) → **Size** (0.5 / 1 / 2 kg). On the left, a flat SVG cake diagram in palette blocks morphs and recolours with every choice. Live ₹ total and [Add to order]. No photos needed |
| 6 | **Boxed by 4** | **VD12** | video (box-close) | The video comes first: the lid closes on the box (sticky ~150vh). Then a 4-tile feature grid on the stepped edge: Same-day in Hyderabad · Eggless on request · Handwritten note · Candles + knife in the box. CTA: "Order by 12, it's yours by 4" |
| 7 | **Just ordered** (reviews) | **SP11** | static | Live order feed: "● LIVE · 186 cakes today" on the left; on the right, rows like *Riya · Pistachio Rose, 1 kg · "the crown!!" · now* type themselves in and push the older rows down. Fictional first names only |
| 8 | **Visit / Footer** | **FO07** | static | Info footer: studio (Banjara Hills, area only), hours, "slices at the counter", a flat block map with a strawberry pin. A sprinkle-particle wordmark band runs across the top. "Concept website by <studio>" |

Shop parts: menu with prices + Add (3), custom builder with price + Add (5), delivery promise + order CTA (6).

---

## Motion map

| # | Section | Layout | Motion | How it plays here | Phone | Record mode |
|---|---|---|---|---|---|---|
| 0 | Loader | — | **M63 rapid layers** | 4 cake-colour layers wipe in from alternate sides (0.25 s each). The wordmark rises in the chocolate layer, then all of them wipe off sideways and the hero's first layer is already dropping (lesson 4). The CSS shimmer on the wordmark starts at the first paint | same | fixed 2.4 s, waits for all hero frames (`blockLoader`) |
| N | Nav | NV11 | **M18 corner grow** | Each island unfolds out of its outer corner (clip-path polygon) on the loader exit, stagger 0.1 s. Over the hero, the side islands slide apart to the edges | wordmark + order pill only, menu sheet | plays on loader exit |
| 1 | Hero | HR28 | **M59 liquid morphing words** | Frames scrub by video time. The headline slot melts *base → jam → crème → cake* through a gooey filter, each change fired as the video **crosses** a measured layer-landing second. An auto-intro plays the first layer by itself right after the loader | stage on top (subject fit), headline below, same morph | intro 1 s + scrub 4.5 s |
| 2 | The Crown | VD01 | **M74 thrown curved path** | Pinned ganache scrub (0–6.8 s of video). At the measured drop second, 8 cut-out toppings (strawberries, macarons) leave the frame on curved arcs (MotionPath, scrubbed), get bigger as they come toward you and settle into 3 depths. The tags Pour → Drip → Crown light up by video time. Gold sprinkles = a few canvas specks | 5 toppings, shorter arcs, tags in a row under the video | scrub 6 s |
| 3 | The Counter | GL19 | **M54 Flip layout morph** | The make-way grid opens one cake tile at a time by itself (Flip, every ~1.1 s). The open tile shows the large cut-out, price and Add. Thrown toppings bob around the heading (F7). On camera, "Add" fires once and a mini cut-out flies into the order pill (F8) | 2 columns, the open tile goes full width | hold 3.5 s, auto-opens + F8 once |
| 4 | Inside the Crown | ST12 | **M48 odometer roll** | The slice video scrubs in its square block (knife → wedge slides out). The figure row (3 · 2 · 2 · 1, 4 layers, 7 hrs) spins a full 0–9 roll as the wedge reveals each layer | video block on top, figures 2×2 | scrub 4 s |
| 5 | Build your own | PS07 | **M53 SVG shape morph** | The flat cake diagram morphs round → heart → square (MorphSVG). The sponge/finish layers recolour and the ₹ total updates. Auto-demo: one choice per step every 0.8 s | diagram above, steps as rows | hold 3.5 s, auto-demo |
| 6 | Boxed by 4 | VD12 | **M72 glacial-then-sudden pin** | The first 60% is the slow box-close scrub with a gentle push-in. Then the payoff: the lid lands, and the 4 feature tiles and the CTA snap up on `power2.out` along the stepped edge | pin 150vh, tiles 2×2 | scrub 3.5 s |
| 7 | Just ordered | SP11 | **M21 typewriter** | New order rows type themselves in (name → cake → quote, blinking caret) and push the older rows down; the LIVE dot pulses | 3 rows | hold 2 s, types by itself |
| 8 | Footer | FO07 | **M45 particle text** | Pastel + gold sprinkle dots fly in and form CRUMB & CO, then keep shimmering, so the last screen is never still (lesson 35) | bigger dots | ends on the shimmer, 2 s |

No code is used twice, there are no plain fades, and the hero (M59) and signature (M74) repeat no earlier site. Each video's frames are just the medium, so M27 is not a code on this site.

**Transitions**
- L→1 loader layers wipe sideways onto the stage
- 1→2 **X5 hard cut on the beat**: the hero video ends on the plain cake and the ganache video starts on the same plain cake, so the change can't be seen
- 2→3 **X3 edge shape morph**: the stepped edge rises and its steps shift while the thrown toppings carry over
- 3→4 **X7 diagonal wipe**: a pistachio sheet wipes sideways
- 4→5 **X2 colour wash**: cream → strawberry milk
- 5→6 **X18 stamp-pop dissolve**: the finished diagram pops, then dissolves into the box video
- 6→7 **X1 overlap slide**: the feed sheet slides over the closed box
- 7→8 **X16 cut-and-stamp**: the chocolate footer band lands with a small jolt

**Round 2 notes (built + tuned):**
- Loader: strawberry milk → cream → pistachio → chocolate (each layer differs in brightness from the one before, so the wipe reads on camera); a solid cream base from the first paint; a strawberry layer with a stepped top rises while the frames load; the exit hands the CSS end values to GSAP before wiping.
- Hero: the intro plays video 0 → 1.3 s by itself, the scroll then adds on from 1.3 s (no still moment). Word queue: each word stays sharp ≥ 0.4 s, the goo filter is on only while melting, and a 1 s "cake" hold at the end of the pin means "cake" settles sharp before the hero leaves. Headline lines rise out of masks on the loader exit; the film settles from a 6% zoom.
- Crown: the film is shrunk to 84% of the stage height so the zoomed-in crown is never cropped. 8 cut-outs are thrown at 3.6 s on quadratic arcs (desktop); on phones, 4 land in the top corners only.
- Counter: Flip without absolute mode (the grid keeps its size); the next cake opens every 0.95 s on desktop; phones keep one open tile. F8 flies the open cake into the Order pill once (record hold / first view).
- Builder: an illustrated cake (the top shape extruded in ~80 shaded slices: sponge · jam · cream bands; ganache drips clipped to the silhouette; berry crown from the site's cut-outs). One MorphSVG tween morphs every slice. Demo: heart → chocolate → ganache → berry crown → 2 kg → Add, then the shape keeps morphing every 0.85 s while on screen.
- Boxed: a slow push-in by video time; the four tiles snap up when the lid lands (2.45 s) and fold away if scrolled back.
- Orders: rows arrive oldest first at the top and type in behind a caret; afterwards the oldest order comes back in at the top every 1.3 s.
- Footer: a site copy of the particle word (sprinkle dashes in pink, pistachio, cream and gold) formed within the first 30% of a screen; a light wave runs through it; plus a slow ticker strip (supporting, CSS) so the last screen always moves.

**Round 3 notes (built):**
- Inside M48: each figure is a 0–9 column that spins a full turn onto its value as the film crosses 2.3 / 2.8 / 3.3 / 3.9 s (sponge, jam, cream, hours), and spins home if scrolled back.
- 1→2 X5: the Crown section is pulled up one screen; its stage stays hidden until the hero's pin ends, then appears in place. Its film starts framed exactly like the hero's last frame (h 1.145, y .59) and eases to its own place over the first 2 s of the pour; the hero's finished-cake hold pushes in 8% so it never stands still. The ganache film starts at 0.35 s (its first moment is still).
- 2→3 / 4→5 / 6→7 / 7→8 X3: every stepped edge arrives taller with its steps further left and settles into the cake-tier shape as its section scrolls in.
- 3→4 X7: a pistachio sheet over the Inside stage; its slanted edge sweeps off left → right as the section arrives.
- 4→5 X2: the Inside stage washes to strawberry milk as it leaves (meets the builder's pink with no seam).
- 5→6 X18: the builder card pops 1 → 1.05 → 1 as the box film dissolves up through a pink cover.
- 6→7 X1: the box stays pinned for an extra screen (FilmPin tail) and dims/sinks while the order feed (pulled up one screen) slides over it.
- 7→8 X16: the footer lands with a 4 px jolt (expo).
- Counter: labels fade out before every Flip move and back in after it lands (no text is ever covered); the first change starts as the counter arrives, then every 1.5 s.
- Orders: four orders are on screen from the start; the newest opens at the top and types in, then the live loop continues.
- ?static=1: overlaps off, no sheets/washes, figures final.

**Round 4 notes (built):**
- Hero word fix: the word queue starts on "base" (it had started on "cake" and melted backwards on the first film report). Order is always base → jam → crème → cake on the measured beats.
- Counter rebuilt as a FIXED 5-column grid: a big "on the stand" ticket (2×2), four small cake tickets that never move, a tall "Build your own" ticket. Every 2.2 s the next cake is featured: the strawberry frame glides to its small ticket (Flip), the big ticket's text dips out ≈ 0.3 s and the cake rises in; text reads ~85% of the time, no tile leaves the grid, nothing covers text. The featured cake floats and turns slightly between changes.
- Details: magnetic buttons (hero Order a cake, builder Add to order, Order for today, Order yours) lean toward the pointer with a smooth power3 ease (the kit's Magnetic bounces, so a site version); each leans once by itself when it first comes into view. The hero button's shine runs once on arrival. Cake tickets lift on hover and their stub tips open from the left notch (ticket tear); the featured ticket tears once by itself per change. Builder chips get a paper fill wipe on hover. The finished-cake hold pushes in 12% on the clock (1.15 s) so the moment before the cut always moves; the Crown's start framing uses the same value.

**Round 5 notes (final):**
- Record run trimmed to 30.4 s (counter hold 3 s = 2 featured changes, footer hold 2 s, every film segment tightened; every key moment kept).
- New loader "Cake bar" (replaces the colour layers): on cream, a small cake builds itself as the progress bar (chocolate base, strawberry jam, cream; hairline outlines), a 0 → 100 counter, a strawberry drops on top with a small bounce, "Crumb & Co" fades in, then a chocolate drip curtain slides down and pulls back up onto the hero (≈ 1.9 s). The build is CSS from the first paint; JS waits for the hero frames and runs the curtain; the hero starts as the curtain covers.
- Build your own: nothing changes by itself on a normal visit. In ?record=1 only, one chip per row is clicked in order (Shape → Heart, Sponge → Chocolate, Finish → Berry crown, Size → 1 kg): the chip presses, then the cake changes, then the price rolls. No looping.

**Details (each also plays once by itself on camera):** the order pill count bumps when something is added · strawberry fill wipe on buttons · cursor labels "Add" on cake tiles, "Pick" on builder chips · magnetic [Order a cake] in the hero · price flips when a builder choice changes · the perforated stub tears a little on hover (one tile tears by itself while open).

---

## Video plan (measured on contact sheets, Round 1)

| Clip | Use | Range used | Measured landmarks | Frames (desktop 1600 · phone) |
|---|---|---|---|---|
| `hero-build.mp4` | Hero | **0–6.3 s** (6–8 s is a still hold: cut) | sponge 1 + jam land ~1.25 s → **base** · second jam ~2.5 s → **jam** · third sponge lands ~3.4 s · frosting wraps 4.4–6.0 s → **crème** 4.4 · **cake** 6.0 | 169 frames, 48 fps around the beats · 3.7 MB · phone 2:3 crop 2.6 MB |
| `ganache-pour.mp4` | The Crown | **0–6.8 s** (jump-cut back to wide measured at **7.63 s**) | pour starts 0.5 s · drips formed 3.0 s · **toppings fall 3.6–4.9 s** (throw second = 3.6) · sprinkles 5.75 s on | 174 frames, 40 fps in 3.4–5.0 · 4.9 MB · phone square crop 2.9 MB |
| `slice-cut.mp4` | Inside | **0–4.6 s** (not 5.0: the wedge starts sliding back at ~4.75 s) | server slides in 0.25–1.75 · wedge out 2.0–4.4 | 111 frames · 4.1 MB · phone square 2.2 MB |
| `box-close.mp4` | Boxed | **0–4.6 s** | flaps fold 0.8–2.0 · lid lands 2.5, tab tucked 3.0 (the M72 payoff) · sticker 3.25–4.25 | 2.8 MB · phone square 1.5 MB |

**hero-build.mp4 notes (from you, by eye; the measured values are in the table above):**
- ~1.1–1.4 s: sponge 1 + jam fade in on the stand → word **base**
- ~2.4–2.6 s: second jam layer appears → word **jam**
- ~3.0–3.3 s: third sponge lands (no word change; the layer meter ticks)
- 4.4–6.0 s: frosting wraps the cake → word **crème** at 4.4 s, **cake** at 6.0 s
- 6–8 s: hold on the plain cake (matches `cake-plain.jpg`), the hand-over frame into the ganache film (X5)

Note: the first `raw/ganache-pour.mp4` was a second build clip (sponges + cream, no ganache). The real pour clip was in Downloads (`Chocolate_ganache_poured_on_cake_…`) and replaced it; the wrong file is kept in the session scratchpad.

The page bg = the films' measured cream backdrop. Every film edge is faded into it (in the player). The Veo watermark is painted out in every clip. Phone crops follow the cake's measured box.

---

## Assets

**Have (raw/):** `hero-cake.jpg` (master reference) · `cake-plain.jpg` · `stand-empty.jpg` · `ganache-pour.mp4` · `hero-build.mp4` (redone: sponge → jam → cream → sponge → jam+cream → sponge → frosting).

**Reused:** hero-cake → slice start frame, box reference, menu card "Chocolate Crown" (cut-out), og image · cake-plain → menu card "Vanilla Cloud" (cut-out) · stand-empty → stand/framing reference for the new cakes.

**New (6 images + 2 videos).** Full Flow prompts: see "Asset plan" below.

| # | File | Section | Why | Ratio | Type | Start / end · reference |
|---|---|---|---|---|---|---|
| 1 | `raw/cake-sliced.jpg` | 4 Inside | end frame of the slice video | 16:9 | .jpg | ref: hero-cake.jpg |
| 2 | `raw/slice-cut.mp4` | 4 Inside | knife → wedge out, shows the layers | 16:9 | .mp4 | start hero-cake.jpg → end cake-sliced.jpg |
| 3 | `raw/box-open.jpg` | 6 Boxed | start frame of the box video | 16:9 | .jpg | ref: hero-cake.jpg |
| 4 | `raw/box-closed.jpg` | 6 Boxed | end frame of the box video | 16:9 | .jpg | ref: box-open.jpg |
| 5 | `raw/box-close.mp4` | 6 Boxed | lid closes on the finished cake | 16:9 | .mp4 | start box-open.jpg → end box-closed.jpg |
| 6 | `raw/cake-pistachio.jpg` | 3 Counter | menu card (cut out → png) | 16:9 | .jpg → .png after cutout | ref: hero-cake.jpg (framing) |
| 7 | `raw/cake-strawberry.jpg` | 3 Counter | menu card (cut out → png) | 16:9 | .jpg → .png after cutout | ref: hero-cake.jpg (framing) |
| 8 | `raw/toppings.jpg` | 2 Crown, 3 Counter | F7 thrown/floating toppings (one sheet, cut out, cropped per item) | 16:9 | .jpg → .png after cutout | ref: hero-cake.jpg (macaron colours) |

Cut-outs: `npm run cutout -- raw/cutouts public/images/crumb/cut` for hero-cake, cake-plain, cake-pistachio, cake-strawberry and toppings. Check them on cream AND chocolate.
Cover (9:16) comes later, from the reel frames (`cover-check`).

### Asset plan: Flow prompts

*Check the ratio chip in Flow before every generation (it keeps the last one used). Same light everywhere: soft daylight from the left, seamless cream backdrop, pink cake stand, photorealistic pâtisserie photography.*

**1 · cake-sliced.jpg** (Nano Banana, 16:9, attach `hero-cake.jpg`)
> Use the reference image exactly: same cake, same pink cake stand, same seamless cream backdrop, same camera angle, lens, framing and soft daylight from the left. Change only one thing: a wedge (about one eighth) has been cut from the front-right of the cake and pulled forward onto a silver cake server resting on the stand, so the inside is clearly visible: three golden vanilla sponge layers with a layer of bright strawberry jam and a layer of pale vanilla cream between each pair of sponges, the dark chocolate ganache coat and drips on the outside. The strawberries, macarons and gold sprinkles on top stay exactly as in the reference. A few soft crumbs on the stand. Photorealistic pâtisserie photography, sharp, no text, no logos, no hands.

*(Inside = vanilla sponge, strawberry jam, cream: the same layers as the hero-build video.)*

**2 · slice-cut.mp4** (Veo, 16:9, start `hero-cake.jpg`, end `cake-sliced.jpg`)
> Start exactly from the start frame and end exactly on the end frame. One continuous shot, camera almost still with a very slow push-in the whole time. No hands and no people anywhere in the shot: a silver cake knife floats in by itself from the top right and makes two clean cuts down through the cake, then a silver cake server glides in by itself, slides under the wedge and draws it slowly forward toward the camera, revealing the vanilla sponge, strawberry jam and cream layers inside. The tools move smoothly on their own, as if by magic. The cake, toppings, stand, backdrop and light do not change. Calm, elegant, slow, no cuts, no camera shake. no text, no logos
>
> Timeline: 0–0.8 s still, slow push-in · 0.8–2.2 s knife enters top right, two cuts · 2.2–4.5 s the server slides the wedge forward, layers revealed · 4.5–6 s the wedge rests on the server, the knife floats up out of frame, push-in continues · (6–8 s spare, will be cut)

**3 · box-open.jpg** (Nano Banana, 16:9, attach `hero-cake.jpg`)
> The exact cake from the reference (chocolate ganache drip, fresh strawberries, macarons, gold sprinkles), now sitting on a gold cake board inside an open square cake box made of soft pistachio-green card, front flap folded down so the cake is fully visible. Seen from a high three-quarter angle, about 40 degrees down. The box sits right of centre, with calm empty cream space on the left and the bottom-right corner of the frame left empty. Same seamless cream backdrop and soft daylight from the left as the reference. Matte card, clean folds, no lid in frame, no ribbon. Photorealistic pâtisserie photography, sharp, no text, no logos, no hands, no people.

**4 · box-closed.jpg** (Nano Banana, 16:9, attach `box-open.jpg`)
> Use the reference image exactly: same box, camera angle, framing, cream backdrop and light. The plain pistachio-green lid is now closed on the box and the front flap is up, so the cake is hidden. One small round strawberry-pink sticker seals the front flap, with no text on it. Photorealistic, sharp, no text, no logos, no ribbon, no hands, no people.

**5 · box-close.mp4** (Veo, 16:9, start `box-open.jpg`, end `box-closed.jpg`)
> Start exactly from the start frame and end exactly on the end frame. One continuous shot, camera slowly pushing in the whole time. No hands and no people anywhere in the shot: everything moves by itself. The front flap folds up on its own, the plain pistachio-green lid floats down from above and settles neatly onto the box, and a small round pink sticker (no text) floats in and presses itself onto the front flap. Same light and cream backdrop throughout, calm and precise, no cuts, no camera shake. no text, no logos
>
> Timeline: 0–1 s cake visible in the open box, slow push-in · 1–2 s the front flap folds up · 2–3.5 s the lid lowers from the top of frame and lands · 3.5–4.5 s the sticker floats in and presses itself on · 4.5–6 s the closed box rests, push-in continues · (6–8 s spare)

**6 · cake-pistachio.jpg** (Nano Banana, 16:9, attach `hero-cake.jpg`)
> Use the reference image for the camera angle, framing, cake size and shape, pink cake stand, seamless cream backdrop and soft daylight from the left; keep all of those identical. Replace the cake's decoration: a Pistachio Rose cake with smooth pale pistachio-green buttercream, a band of finely crushed pistachios round the base, and on top a loose crown of dried pink rose petals, a few whole pistachios and two pale-green macarons. Photorealistic pâtisserie photography, sharp, no text, no logos.

**7 · cake-strawberry.jpg** (Nano Banana, 16:9, attach `hero-cake.jpg`)
> Use the reference image for the camera angle, framing, cake size and shape, pink cake stand, seamless cream backdrop and soft daylight from the left; keep all of those identical. Replace the cake's decoration: a Strawberry Shortcake with soft strawberry-milk pink cream frosting in gentle swoops, fresh halved strawberries round the top edge, white chocolate curls and a light dusting of icing sugar. Photorealistic pâtisserie photography, sharp, no text, no logos.

**8 · toppings.jpg** (Nano Banana, 16:9, attach `hero-cake.jpg`)
> Eight separate cake toppings laid out in two even rows of four on a plain flat mid-grey background, each one with plenty of space around it, none touching: a whole fresh strawberry with its green top, a halved strawberry, two macarons in the same colours as the reference cake (one seen from the side, one tilted at 45°), a third macaron lying flat, a glossy dark chocolate shard, a white chocolate curl, and a raspberry. Seen from a slight three-quarter angle, soft even studio light, sharp, photorealistic, no shadows on the background, no text, no props.

**hero-build.mp4** (yours, redone): layers sponge → strawberry jam → cream → sponge → jam+cream → sponge → frosting, from `stand-empty.jpg` to `cake-plain.jpg`. The words switch on the measured beats (base · jam · crème · cake, see Video plan). The last frame must match `cake-plain.jpg` so the cut into the ganache film can't be seen.
