# V7 — inner curved gallery and visible portrait-inspired background

- Gallery uses one inner-cylinder parameterization for x, depth and tangent: x=R sin(theta), z=R(1-cos(theta))-recess, rotateY=-theta. The central plane recedes; outer planes approach the viewer. CSS perspective creates corresponding upper/lower concave silhouettes.
- Photo heights are consistent. Aspect ratios are clamped to .76–.94 for balanced frames; original pixels are never stretched. The wall-logo crop is shifted to preserve all BYO lettering. Five original environmental photographs plus one inert accessible-hidden duplicate sequence; alternate reception remains available only as an asset.
- Maintains constant 48px/s mobile and 63px/s desktop, uninterrupted by hover or touch. No pause button or paging. Reduced-motion mode remains static with native manual horizontal navigation.
- Background reconstructed with cream-separated, elongated looping gold ribbons based on the actual Nykolas portrait, without incorporating the person, lettering or furniture. Gold opacities .14/.12, static moderate filters, transform-only 28/35/39s alternating cycles. Mobile uses smaller repeated motifs. Explicit stacking and transparent sections expose the pattern behind content without changing fixed header/WhatsApp ancestry.
- Existing menu, definitive new Nykolas image, Brenda image, hero, booking, testimonials, map and footer preserved.

## Verification
- qa-v7.cjs: 360/390/430/768/1440, at least 4 visible photographs, depth increases with distance from center, tangent points inward, frame width ratio <1.25, no page horizontal overflow, no pause controls, exact current portrait path, fixed WhatsApp.
- Continuous background transforms sampled 6.5 seconds apart with static filters and screenshots; visible soft loops on mobile and desktop. Reduced motion stops decoration and hides duplicate gallery sequence.
- qa-v7-loops.cjs: two actual realtime loops each at 390 and 1440. At 390 seam median steps 2.136/2.131px vs normal maximum 8.235px; at 1440 8.029/5.016px vs 15.547px. No reset or gap.
- Existing qa-v6.cjs regression passed menu pointer/keyboard, scroll restore, active-section tracking, exact portrait hash, reduced motion and fixed WhatsApp at all five widths.
- Attached still reference inspected for concave silhouette. A separate reference video file remains unavailable; no direct video comparison claimed.
