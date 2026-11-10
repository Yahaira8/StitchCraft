-- ====================================================================
-- STITCHCRAFT PRODUCTION SEED DATA (8 Amigurumi Patterns)
-- Phase 1 Foundation
-- ====================================================================

INSERT INTO patterns (title, difficulty, yarn_weight, recommended_hook, recommended_eye_size, category, video_url, image_urls, instructions)
VALUES 
(
  'Classic Amigurumi Bumblebee',
  'Beginner',
  'Worsted (#4)',
  '3.5mm',
  '6mm',
  'Animals & Bugs',
  'https://www.youtube.com/embed/efHO6S5txaM',
  ARRAY['https://img.youtube.com/vi/efHO6S5txaM/hqdefault.jpg'],
  '{"body": ["R1 (Yellow): 6 sc in MR (6)", "R2: Inc in each st around (12)", "R3: [1 sc, inc] x 6 (18)", "R4: [2 sc, inc] x 6 (24)", "R5-6 (Yellow): Sc in each st around (24)", "R7-8 (Black): Sc in each st around (24)", "R9-10 (Yellow): Sc in each st around (24)", "R11-12 (Black): Sc in each st around (24)", "R13 (Yellow): [2 sc, dec] x 6 (18)", "R14: [1 sc, dec] x 6 (12)", "R15: Dec x 6 (6)"], "wings": ["In MR: [ch 2, 3 dc, ch 2, sl st]. Fasten off and leave tail for sewing."]}'
),
(
  'No-Sew Mini Whale',
  'Beginner',
  'Worsted Plush (#4)',
  '4.0mm',
  '6mm',
  'Sea Life',
  'https://www.youtube.com/embed/w1vSV4yy_lM',
  ARRAY['https://img.youtube.com/vi/w1vSV4yy_lM/hqdefault.jpg'],
  '{"whale": ["R1: 6 sc in MR (6)", "R2: Inc in each st around (12)", "R3: [1 sc, inc] x 6 (18)", "R4: [2 sc, inc] x 6 (24)", "R5-7: Sc in each st around (24)", "R8: 10 sc, Fin 1 [sl st, ch 2, 2 dc in same st, ch 2, sl st], 4 sc, Tail [sl st, (ch 3, 2 dc, ch 2, sl st) in same st, (ch 3, 2 dc, ch 2, sl st) in next st], 4 sc, Fin 2 [sl st, ch 2, 2 dc in same st, ch 2, sl st], 2 sc (24)", "R9 (White, BLO): [2 sc, dec] x 6 (18)", "R10: [1 sc, dec] x 6 (12)", "R11: Dec x 6 (6)"]}'
),
(
  'Fergus the No-Sew Frog',
  'Beginner',
  'Worsted (#4)',
  '3.5mm',
  '8mm',
  'Animals & Bugs',
  'https://www.youtube.com/embed/60t0lytJ4Tc',
  ARRAY['https://img.youtube.com/vi/60t0lytJ4Tc/hqdefault.jpg'],
  '{"eyes": ["R1: 6 sc in MR (6)", "R2: Inc in each st around (12)", "R3-4: Sc in each st around (12)"], "body": ["R5: Ch 3, join eyes with sc, 11 sc on 1st eye, 3 sc in ch, 12 sc on 2nd eye, 3 sc in ch (30)", "R6-9: Sc in each st around (30)", "R10: [3 sc, dec] x 6 (24)", "R11: [2 sc, dec] x 6 (18)", "R12: [1 sc, dec] x 6 (12)", "R13: [1 sc, inc] x 6 (18)", "R14: [2 sc, inc] x 6 (24)", "R15: 5 sc, Arm 1 [ch 5, 2 sc, 2 sl st], 12 sc, Arm 2 [ch 5, 2 sc, 2 sl st], 7 sc (24)", "R16-18: Sc in each st around (24)", "R19: 4 sc, Leg 1 [ch 6, 3 sc, 2 sl st], 12 sc, Leg 2 [ch 6, 3 sc, 2 sl st], 8 sc (24)", "R20: Behind legs [2 sc, dec] x 6 (18)", "R21: [1 sc, dec] x 6 (12)", "R22: Dec x 6 (6)"]}'
),
(
  'Baby Axolotl',
  'Advanced Beginner',
  'Worsted (#4)',
  '3.5mm',
  '8mm',
  'Sea Life',
  'https://www.youtube.com/embed/il6KHblnEnk',
  ARRAY['https://img.youtube.com/vi/il6KHblnEnk/hqdefault.jpg'],
  '{"body": ["R1: 6 sc in MR (6)", "R2: Inc in each st around (12)", "R3: [1 sc, inc] x 6 (18)", "R4: [2 sc, inc] x 6 (24)", "R5-9: Sc in each st around (24)", "R10: [2 sc, dec] x 6 (18)", "R11: [1 sc, dec] x 6 (12)", "R12: Sc in each st around (12)", "R13: [1 sc, inc] x 6 (18)", "R14-17: Sc in each st around (18)", "R18: [1 sc, dec] x 6 (12)", "R19: Dec x 6 (6)"], "gills": ["Ch 4, sl st in 3 ch back down. Repeat x 2 to form 3 loops per gill."], "tail_fin": ["Attach yarn to back spine: [ch 2, 2 dc in same st, sl st down 3 st]."]}'
),
(
  'No-Sew Mini Octopus',
  'Beginner',
  'DK / Worsted (#3 / #4)',
  '3.5mm',
  '6mm',
  'Sea Life',
  'https://www.youtube.com/embed/QKg_GayyA2w',
  ARRAY['https://img.youtube.com/vi/QKg_GayyA2w/hqdefault.jpg'],
  '{"octopus": ["R1: 6 sc in MR (6)", "R2: Inc in each st around (12)", "R3: [1 sc, inc] x 6 (18)", "R4-6: Sc in each st around (18)", "R7 (FLO): [sl st, (ch 2, 2 dc in same st, ch 2, sl st)] x 8", "R8 (BLO of R6): [1 sc, dec] x 6 (12)", "R9: Dec x 6 (6)"]}'
),
(
  'Plush Sea Turtle',
  'Beginner',
  'Super Bulky Plush (#6)',
  '5.0mm',
  '10mm',
  'Sea Life',
  'https://www.youtube.com/embed/o_rsQnKVCEw',
  ARRAY['https://img.youtube.com/vi/o_rsQnKVCEw/hqdefault.jpg'],
  '{"shell": ["R1: 6 sc in MR (6)", "R2: Inc in each st around (12)", "R3: [1 sc, inc] x 6 (18)", "R4: [2 sc, inc] x 6 (24)", "R5: Sc in each st around (24)"], "limbs_and_belly": ["R6 (FLO): Head [ch 4, 3 dc, sl st], Fin 1 [ch 5, 3 tr, sl st], 4 sc, Back Fin 1 [ch 4, 2 dc, sl st], 2 sc, Back Fin 2 [ch 4, 2 dc, sl st], 4 sc, Fin 2 [ch 5, 3 tr, sl st]", "R7 (BLO): [2 sc, dec] x 6 (18)", "R8: [1 sc, dec] x 6 (12)", "R9: Dec x 6 (6)"]}'
),
(
  'No-Sew Ghost',
  'Beginner',
  'Worsted (#4)',
  '3.5mm',
  '10mm',
  'Seasonal & Fantasy',
  'https://www.youtube.com/embed/aJeId0PhbTU',
  ARRAY['https://img.youtube.com/vi/aJeId0PhbTU/hqdefault.jpg'],
  '{"ghost": ["R1: 6 sc in MR (6)", "R2: Inc in each st around (12)", "R3: [1 sc, inc] x 6 (18)", "R4: [2 sc, inc] x 6 (24)", "R5-12: Sc in each st around (24)", "R13: 6 sc, Arm 1 [ch 4, 3 sl st], 10 sc, Arm 2 [ch 4, 3 sl st], 4 sc (24)", "R14-16: Sc in each st around (24)", "R17 (FLO): [sl st, 3 dc in next st, sl st] x 8", "R18 (BLO of R16): [2 sc, dec] x 6 (18)", "R19: [1 sc, dec] x 6 (12)", "R20: Dec x 6 (6)"]}'
),
(
  'No-Sew Mini Dino',
  'Beginner',
  'Worsted (#4)',
  '3.5mm',
  '6mm',
  'Animals & Bugs',
  'https://www.youtube.com/embed/3klQ0qFmr_8',
  ARRAY['https://img.youtube.com/vi/3klQ0qFmr_8/hqdefault.jpg'],
  '{"dino": ["R1: 6 sc in MR (6)", "R2: Inc in each st around (12)", "R3: [1 sc, inc] x 6 (18)", "R4-7: Sc in each st around (18)", "R8: 4 sc, Arm 1 [ch 4, 3 sl st], 6 sc, Arm 2 [ch 4, 3 sl st], 6 sc (18)", "R9: [1 sc, dec] x 6 (12)", "R10: [1 sc, inc] x 6 (18)", "R11: 4 sc, Leg 1 [ch 4, 3 sl st], 6 sc, Leg 2 [ch 4, 3 sl st], 6 sc (18)", "R12: [1 sc, dec] x 6 (12)", "R13: Dec x 6 (6)"], "spikes": ["Attach accent yarn at top of head: [sl st, (ch 2, dc, sl st) in next st] repeat down spine."]}'
);
