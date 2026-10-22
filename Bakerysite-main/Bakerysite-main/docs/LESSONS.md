# Lessons — read this first, every day and every round

Short rules learned the hard way on Days 1–7. `/new-site` and every round start by reading this file. At the end of each day (`archive-day`), add that day's new lessons at the bottom (rule + a few words why).

## Video & frames
1. **Scroll videos play by video time, never by frame number.** Map scroll → video seconds (segments), keep `times` in the manifest. Why: frame-number mapping made fast parts jump and slow parts crawl.
2. **No frame-scrub stutter:** draw the two neighbour frames blended (fractional opacity), interpolate the source to 48 fps, and give fast/key moments 24–48 fps. Why: the camera sees every stepped frame as a stutter.
3. **Preload before the loader ends:** the hero's frames all load while the loader shows (`blockLoader`); the loader's percentage is the real load. Other films load lazily, and big ones start during a **calm** section (`loadWhen`) so a loading burst never lands during another video.
4. **No delay after the loader:** the hero starts moving on the loader's last frame (an intro that plays by itself into the scroll). A still hero waiting for the scroll looks frozen.
5. **Fade every video edge** into the page colour (in the player, not CSS masks) and grade the video's black onto the page background. Why: hard straight video edges showed as lines (Day 7 fog edge, ice top edge).
6. **Use the early seconds of a Veo clip** and measure the landmark times on a contact sheet (pop frame, colour change). Never guess; text that switches with the video uses the measured second (e.g. "half the can changed").
7. **Crop/paint out the Veo watermark** (bottom right) in every clip.

## Never frozen on camera (`?record=1` at 1440×900 must PASS freezedetect + frame-diff)
8. **Holds are never still:** during a record hold the section pushes in slowly (`HoldPush`), ambient motion runs (rain, glow, mist), or the hold is shorter.
9. **Scrubbed effects use the whole scroll range, linearly, and finish exactly at the end.** No flat start/end and no early finish: a sticky stage itself does not move, so a finished effect = frozen frames. Add time-based life (drift, shimmer, noise) to every scrubbed stage.
10. **Stepped effects must be continuous** (pixelation, counters): steps hold a frame for 0.3 s+ and fail frame-diff.
11. **The first second:** before the page's JavaScript wakes up only CSS moves; the loader/first screen needs CSS animation from the first paint.
12. **A failed check on a busy machine is not a site bug:** under ~50 fps captured → check `uptime`, wait, re-run before changing code. Look at the flagged frames first.
13. Real-time hits (word slams, flashes) fire when the video **crosses** the beat, so they stay punchy at any scroll speed.

## Transitions & sections
14. **No empty gaps between sections:** a dark band (section padding before the photo, a curtain lifting late) reads as a broken site. Hand over with a transition (frost/zoom-through, overlap) and start reveals **before** the content reaches the screen.
15. **Pinned cards/overlays leave with their section** (fade/lift as it scrolls away); nothing hangs at the top while the next section arrives.
16. **Text over bright video must stay readable:** a soft dark gradient/pool behind the text only (left on desktop, bottom on phone), never a dull filter over the whole video.
17. **Shattered/tiled effects:** draw the sheet as ONE piece until it breaks (no seams), and broken tiles are light frost, never a copy of the dark picture underneath (no dark boxes).

## Phones (checked with screenshots only)
18. **Phone crops come from the subject's position, for every size:** measure the product's box in the frames and fit it into the free area measured from the page (nav → text/card). Never a fixed crop; test 360×640, 375×667, 352×681, 390×844, 430×932 and a short laptop (1366×768).
19. **Switch frame sets when the window crosses 768px** (a laptop-loaded page resized to phone width must load the phone frames).
20. **Nothing overlaps the subject** (cards go fully below the product; buttons above or below it).

## Recording & publishing
21. **Reels are recorded only on the laptop** at 1440×900 (`npm run reel`); phones get screenshots (`npm run phone-shots`).
22. **Covers: keep inside Instagram's safe area** (3:4 grid crop ≈13% top/bottom, Reels header top 14%, caption bottom 25%, icons on the right); headline 15–40% from the top (`cover-check`).
23. **No real-brand look-alikes:** real brand names are fine for concept sites, but never their logo file, their real website's layout, or their exact packaging; always the "Concept website" footer note.
24. **Each day's repo holds only that day:** one fresh commit (orphan branch) pushed to its own GitHub repo; no older brands in files or history.

## Kit & tools
25. Register GSAP plugins only in `lib/gsap.ts`; Lenis stays the scroller (no ScrollSmoother). Prefer plugins (SplitText, ScrambleText, DrawSVG, Flip, MorphSVG) over hand-made versions.
26. WebGL (OGL via `lib/gl.ts`) only in sections that use it, always over a plain image/CSS fallback; budget +60 KB gzipped.
27. Components that take a `className` must not hard-code `relative` when the caller may pass `absolute` (the clash collapses the box to 0 height). Use `pos()` from `components/fx/shared.ts`.
28. Headless recorders and test browsers must always be killed after use (stray Chromes pushed the load to 90 and spoiled recordings).

## 3D & travelling objects (kit upgrade before Day 8)
29. **3D budget reality:** three.js alone is ~150 KB gzip, React Three Fiber pulls ALL of three (+261 KB measured), `<model-viewer>` bundles three (+336 KB). Only **OGL** (+40 KB) fits the +150 KB budget. Default to F1 (PNG) or F3 on OGL; the others are for comparison/special cases.
30. **Never use drei `ScrollControls`** (or any library scroller) with Lenis: it creates its own scroll container and breaks record mode. Drive 3D from our travel driver / ScrollTrigger progress.
31. **One driver, many renderers:** tween a plain state object with the scroll, then apply it to the PNG / mesh / model-viewer every frame. Never tween meshes directly.
32. **Model files:** compress every .glb (`npm run glb`, ≤ 3 MB). Meshopt needs a decoder: for OGL and `<model-viewer>` use `--ogl` (plain geometry + WebP), or model-viewer fetches its decoder from a CDN and shows nothing offline.
33. **Background removal:** always pass the model (`-m birefnet-general`, MIT). rembg's newest default (RMBG-2.0) needs a paid licence for commercial use.
34. **Licences change:** check every source on its real repo (GitHub API `license.spdx_id`, the LICENSE file) on the day; e.g. React Bits = MIT + Commons Clause, Hunyuan3D excludes EU/UK/KR, Theatre.js studio is AGPL.
35. **The first and last screens need their own motion:** the first ~0.5 s (3D/JS still loading) and the end of the reel (scroll at rest) fail the freeze check unless something moves there (CSS light, marquee).

## Craft rules (from open-source design skills, MIT; see SOURCES)
36. **Never animate from `scale(0)`:** start at 0.9–0.95 with opacity. Keep animated blur ≤ 8px (static ≤ 20px); never animate `backdrop-filter`; set `will-change` just before an animation and remove it after.
37. **Hover never changes font-weight, letter-spacing or padding** (layout jumps): cross-fade a pre-rendered layer instead.
38. **Display type ≥ 24px:** tracking −0.02 to −0.04em, line-height 1.05–1.2; caps labels +0.05 to +0.1em; `text-wrap: balance` on headings, `pretty` on body; italic display words with descenders need line-height ≥ 1.1.
39. **Every scroll depth shows a complete frame:** never animate the whole stage to empty; text being read holds still; idle drift stays visibly smaller than the scroll-driven change.
40. **Template tells to avoid** (unless DESIGN.md chose them on purpose): an eyebrow above every heading, "01 / 02" section eyebrows that are not a real sequence, three identical feature cards, three or more zig-zag splits in a row, "Scroll ↓" cues, city/time strips, decorative crosshair grid lines, mixed pill and square radii without a rule, em-dashes everywhere.
41. **Category-reflex check:** if the palette can be guessed from the product category alone, rework it. Gradients: `linear-gradient(in oklch, …)` (no muddy middles); tint shadows with the background hue.

42. **rembg on macOS hangs with no error** when it enables Apple's CoreML engine: `npm run cutout` forces the CPU (scripts/cutout.py). BiRefNet on CPU ≈ 2 min for a 2.7k image (`--fast` u2net ≈ 1 s). Frost/condensation/glass come out semi-transparent: shoot cut-out angles of frosty or glassy products on a plain mid-grey background and check on dark AND light.

<!-- Add new lessons below this line at the end of each day: "N. rule — why (Day NN)". -->

43. **Look at every raw file on a contact sheet before planning around it** — the brief's `ganache-pour.mp4` was a second layer-build clip; the real pour was still in Downloads (Day 08).
44. **Light pages: copy `lib/film.ts` into the site and erase the film edges to transparent** (`destination-out`), never paint a dark page colour; measure the films' backdrop and use it as the page bg (`grade: false` in frames.json) — the kit player assumes a dark page (Day 08).
45. **A finished CSS animation (`forwards`) beats GSAP's inline styles**: before animating `clip-path`/`transform` that CSS animated, copy the computed values inline and set `animation: none` — the loader's exit wipe silently never ran (Day 08).
46. **Site CSS on component classes goes in `@layer components`**: unlayered `display`/`flex-direction` rules beat Tailwind utilities (`hidden`, `flex-row`), so phone-hidden toggles and row tiles broke (Day 08).
47. **Consecutive loader/colour layers must differ in brightness**: pink over pistachio (same luma) reads as "no change" to frame-diff and to the eye on a dim screen (Day 08).
48. **State machines start where the first callback expects**: a child FilmPin reports its first second before the parent's effect runs; the hero word queue started on "cake" and melted backwards cake → crème → jam → base (Day 08).
49. **Morphing words: every word sharp ≥ 0.4 s, the goo filter only while melting, and a pinned hold after the last beat** so the final word settles before the section leaves (Day 08).
50. **Hard cut between two films (X5)**: pull the next section up one screen, keep its stage hidden until its top reaches the top, and start its film framed exactly like the previous last frame (same scale and position), then ease it to its own place. Without the hiding, the next stage slides up over the pinned one (Day 08).
51. **Holds right before a cut or a zero-distance stop run on the clock, not the scroll**: the record scroll decelerates into the stop, so a scroll-tied push-in stands still there (Day 08).
52. **Shop grids never Flip-reflow their tiles**: `Flip` + dense grid (+ `absolute`) collapses the grid and tiles drift out with text covered. Keep tiles fixed, Flip a highlight frame, swap the detail ticket's content (text away ≤ 0.3 s) (Day 08).
53. **Thrown/floating objects land only in free space** (never over headings or the subject); phones get fewer objects, landing in the top corners (Day 08).
54. **Record on a quiet machine**: another session's ffmpeg encode dropped capture to 30–46 fps. Wait for no `ffmpeg` (`pgrep -x ffmpeg`; `pgrep -f` matches its own command line) and load < 6, re-record below 50 fps (Day 08).
55. **Fine textures don't register at frame-diff's 160×90 scale** (sprinkle particles, thin shimmer): give a resting end screen a coarse moving element (ticker strip, a broad light band) (Day 08).
- **Never honour the OS reduce-motion setting; only `?static=1` disables motion.** It is ON by default on many Windows machines, so live sites opened as flat static pages. `prefersReducedMotion()` is `?static` only; CSS uses `html.is-static { … }` (set by the engine); `npm run check` fails on any `prefers-reduced-motion` / reduce `matchMedia`.
