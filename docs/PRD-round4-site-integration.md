# Dimera round 4 website integration — PRD

Status: implementation baseline, 21 October 2026

Repository: `it-techmonkey/Dimera`, branch `feat/round4-design-integration`

Design reference: `../dimera-previews/dist/arch-doorway.html` and `../dimera-previews/ROUND4_REVIEW.md`

Content and pricing reference: this repository at commit `85cd315`, especially `lib/data.ts`

## 1. Goal

Apply the latest round 4 Arch Doorway visual design to the existing Next.js site while retaining the current site's treatment catalogue and real reservation form. The result is a single-page Dimera website with an architectural doorway opening, a compact 24-treatment collection, the current site's Ritual section, the round 4 First Visit experience, and contact details in the footer.

## 2. Confirmed decisions

- Brand spelling is **Dimera**.
- The canonical source is `it-techmonkey/Dimera`; `dimera.vercel.app` is the existing site.
- The current repo's `priceMenu` is the provisional source for all 24 treatments, five categories, live prices and crossed-out prices. Do not copy the preview's older seven-treatment prices.
- Use images already in the current repo for treatment and editorial photography. Door material assets from the round 4 preview are design assets and may be copied into the site.
- Phone, Instagram, hours and address remain provisional placeholders until the client supplies verified values.
- Booking work is design and content only. Preserve the current form, POST route and database behavior.
- Deliver a local branch for review.
- Replace the round 4 preview's “Beauty is not a service. It is a ritual.” manifesto section with the current repo's “The Ritual” section (`components/About.tsx`), restyled to fit round 4.
- Remove the round 4 preview's gallery section headed “A study in detail / The beauty is in the making.” Remove its lightbox and all navigation to it.
- Remove the round 4 preview's standalone “Visit the Atelier / Find us in JVC” section. Keep address, hours, phone and Instagram in the footer only, with no separate visit or social chapter.
- Use the current Ritual heading, two paragraphs and image. Omit its unverified 12+ badge and 07 / 04 / 100% counters.
- The round 4 preview already removed the Voices band; do not reintroduce it.

## 3. Page structure and content

1. **Header:** `Dimera.` wordmark; links to The Collection, The Ritual, First Visit and Visit (footer); Reserve action. Mobile menu must close on selection. Header remains transparent over the doorway and uses a solid paper background after scroll.
2. **Doorway hero:** centred arched double door within the textured plaster wall; window-frame shadow, layered niche and champagne handles. The closed state shows DIMERA, “The ritual of transformation, refined.” and “Enter the atelier” inside the arch. No service names, prices, availability or booking button inside the arch. Scroll and the cue open the door. Interior photographs crossfade Nails → Lashes → Hair within the fixed arch. Door copy fades before a photo is exposed; the arch never expands to full screen. The approximately 1.8-viewport hero releases directly into the collection. Keyboard and reduced-motion paths remain usable.
3. **The Collection:** one section for all 24 treatments from `priceMenu`, in repo order: Pedicure (4), Nails (4), Lashes & Brows (5), Threading (3), Hair (8). Five numbered category headings remain visible; one category is expanded at a time. Desktop retains the round 4 two-column composition with a sticky arched image on the left and the active list on the right. Mobile uses a compact image within the expanded category and vertically stacked headings. Each treatment row shows the exact current repo name and price, including a crossed-out comparison where present. A row opens the existing booking form with that item's ID preselected. Use dotted leaders on wide screens and a readable stacked name/price layout on narrow screens. Omit duration from the collection because only seven showcase items have one; do not invent durations for the other 17.
4. **The Ritual:** use the heading, two paragraphs, image and reserve action from the repo's `About.tsx`. Adapt its layout, typography and spacing to round 4's paper/ink/bronze system. Omit the unverified counters and 12+ badge.
5. **First Visit:** retain round 4's three-step Arrive / Be Tended / Leave Transformed section and its editorial card layout, using current repo images. Remove concept-only explanatory copy.
6. **Footer:** retain round 4's large ivory wordmark treatment, but place the current repo's address, hours, phone and Instagram there as provisional placeholders. Footer is the sole contact location and carries a Visit anchor for the header and mobile bar.
7. **Booking:** restyle `BookingDrawer` to match the round 4 panel while preserving its four steps, validation, service preselection and existing POST. Refer to submissions as appointment **requests** and chosen times as preferred times, because the current backend records `pending` rows without live availability or an automatic salon notification. The completion screen says the request was saved and requires confirmation. Do not use the preview's demo form.
8. **Mobile bar and cursor:** mobile bar appears after the doorway, with Reserve and Find us (footer) actions, and hides while booking is open. Keep the live site's 280px cursor halo on desktop; show a restrained Enter ring over the doorway. Hide custom cursor effects for touch and reduced motion.

## 4. Visual system

- Fonts: Cormorant Garamond for display, Montserrat for interface/body; use weights 300/400/500 only.
- Core colours: paper `#F7F4EE`, deep paper `#EBE5DB`, ink `#29231E`, soft ink `#5D554C`, bronze `#84684C`, champagne `#B49364`; round 4 wall `#E3DACB`, door linen `#F2ECE1`.
- Bronze is used for small accent text; champagne is for non-text decorative details. Body text is 16px; visible text is at least 12px. Preserve visible focus rings and 44px touch targets.
- Reuse the preview's architectural material and section rhythm. Keep effects restrained and disable doorway motion under `prefers-reduced-motion`.

## 5. Explicit removals

- Old live-site hero photo, aurora effects, horizontal Atelier carousel, separate price tabs section, both marquees, dark Voices band and duplicated old page sections.
- Preview manifesto, gallery/lightbox/loupe, standalone Visit section and social block.
- Navigation entries or anchors pointing to removed sections.
- Preview-only “concept,” “demo,” stock-media and unverified WhatsApp explanatory copy.

## 6. Scope boundary

No changes to the reservation database schema, API validation, slot calculation, staff data or notification delivery. Current pricing, staff names, counters and contact values remain provisional where identified above. No deployment is part of this branch review.

## 7. Acceptance criteria

1. Exactly 24 treatments appear across five categories, with every name/current price/comparison price matching `lib/data.ts`; each row preselects the right service in booking.
2. The page has the specified section order. The removed manifesto, gallery, standalone Visit and Voices sections, and their nav links, are absent. Ritual content comes from the current repo.
3. Doorway matches round 4 at closed, opening and open scroll states; no full-screen photograph or blank gap between hero and collection.
4. At 390, 1024 and 1440px, content has no horizontal overflow or overlapping controls. The long Hair item names and price strings remain readable.
5. Keyboard users can skip the hero, activate its cue, switch categories, open booking and close it. Reduced-motion users can reach the collection without a pinned animation.
6. Booking retains its current fields and API behavior; copy does not promise a confirmed appointment or real-time availability.
7. `npm run lint`, TypeScript checking and `npm run build` pass; a browser run verifies imagery, console errors, section navigation and mobile bar behavior.
