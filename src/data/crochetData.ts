import { CrochetPattern, StitchGuideItem } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_crochet_studio_1793993518886.jpg';
export const YARN_SKEINS_IMAGE = '/src/assets/images/craft_yarn_skeins_1793993521386.jpg';

export const CROCHET_PATTERNS: CrochetPattern[] = [
  {
    id: 'botanical-granny-cardigan',
    title: 'Flora Meadow Granny Cardigan',
    subtitle: 'Modular floral motif cardigan with ribbed trims',
    category: 'wearables',
    difficulty: 'Intermediate',
    hookSize: '4.5 mm (US 7) & 3.5 mm for ribbing',
    yarnWeight: 'DK / Light Worsted (Weight 3)',
    yardage: '1,150 - 1,450 meters (1,250 - 1,580 yds)',
    estimatedHours: 24,
    priceDigital: 9.50,
    priceKit: 68.00,
    image: '/src/assets/images/product_botanical_cardigan_1793993518849.jpg',
    description: 'An heirloom-grade modular crochet cardigan composed of textured puff-flower granny squares joined seamlessly with mattress stitch. Features deep ribbed sleeve cuffs and an elongated raglan collar.',
    materials: [
      '600g Organic Peruvian Highland Wool (DK weight)',
      '4.5 mm Japanese Bamboo Ergonomic Crochet Hook',
      '3.5 mm Hook for ribbed button band',
      '4 x 25mm Natural Olive Wood Buttons',
      'Locking stitch markers & bent tapestry needle'
    ],
    techniques: ['Puff Stitch in the Round', 'Granny Cluster Joining', 'Front-Post Back-Post Ribbing', 'Mattress Stitch Seaming'],
    designer: 'Elena Rostova, Needle & Spire',
    stitchKey: 'ch = chain, sc = single crochet, dc = double crochet, pf = puff stitch, sl st = slip stitch, FPdc = front post dc',
    sampleInstructions: [
      {
        sectionName: 'Center Floral Motif (Make 48 Squares)',
        rows: [
          { rowNumber: 'Rnd 1', text: 'Magic ring, ch 2 (counts as hdc), 11 hdc into ring. Sl st to top of ch-2 to join.', stitchCount: '12 hdc' },
          { rowNumber: 'Rnd 2', text: 'Ch 2, [yo, insert hook, pull up loop] 3 times in same st, yo pull through 6 loops, yo pull through 2 (puff st), ch 1. Repeat puff st in each st around. Sl st to first puff.', stitchCount: '12 puff petals, 12 ch-1 sps' },
          { rowNumber: 'Rnd 3', text: 'Sl st into ch-1 sp. (Ch 3, 2 dc, ch 2, 3 dc) in first sp [corner]. *(3 dc in next sp) twice, (3 dc, ch 2, 3 dc in next sp) [corner]*. Repeat from * to * 3 times. Join.', stitchCount: '4 corners, 8 side clusters' },
          { rowNumber: 'Rnd 4', text: 'Ch 1, sc in each st around, placing (sc, ch 2, sc) in each corner ch-2 sp. Fasten off with invisible join leaving 10-inch tail.', stitchCount: '56 sc, 4 corner sps' }
        ]
      },
      {
        sectionName: 'Assembly & Blocking',
        rows: [
          { rowNumber: 'Layout', text: 'Arrange squares according to size schematic: 18 for back panel, 10 each for front left/right panels, 5 each for sleeves.', stitchCount: '48 squares total' },
          { rowNumber: 'Join', text: 'With wrong sides facing together, join outer loops using whipstitch or flat slip stitch join in contrast cream yarn.', stitchCount: 'Flat seams' }
        ]
      }
    ]
  },
  {
    id: 'woodland-amber-fox',
    title: 'Rowan the Amigurumi Woodland Fox',
    subtitle: 'Artisanal stuffed toy with posable tail and brushed ruff',
    category: 'amigurumi',
    difficulty: 'Beginner',
    hookSize: '2.75 mm (US C/2)',
    yarnWeight: 'Sport / Fine (Weight 2)',
    yardage: '280 meters (305 yds)',
    estimatedHours: 8,
    priceDigital: 6.50,
    priceKit: 34.00,
    image: '/src/assets/images/product_amigurumi_fox_1793993519771.jpg',
    description: 'A charming woodland fox crafted using tight spiral amigurumi crochet. Features sculpted muzzle contours, delicate cream facial insets, and an optional wire armature for expressive poses.',
    materials: [
      '100g Fine Merino wool in Ochre & 50g in Natural Ecru',
      '2.75 mm ergonomic aluminum crochet hook',
      'Pair of 9mm safety eyes (black crystal)',
      'Oeko-Tex certified recycled polyester fiberfill',
      'Embroidery floss in chocolate brown for nose and whiskers'
    ],
    techniques: ['Magic Ring', 'Invisible Decrease (invdec)', 'Continuous Spiral Rounds', 'Color Switching without Jog'],
    designer: 'Yahaira Papin',
    stitchKey: 'MR = magic ring, sc = single crochet, inc = 2 sc in same st, invdec = invisible decrease',
    sampleInstructions: [
      {
        sectionName: 'Head & Snout (Continuous Spiral)',
        rows: [
          { rowNumber: 'Rnd 1', text: 'MR, 6 sc into ring. Do not join with sl st (place marker in last st).', stitchCount: '6 sc' },
          { rowNumber: 'Rnd 2', text: 'Inc in each st around.', stitchCount: '12 sc' },
          { rowNumber: 'Rnd 3', text: '*Sc in next st, inc in next st*, repeat 6 times around.', stitchCount: '18 sc' },
          { rowNumber: 'Rnd 4', text: '*Sc in next 2 sts, inc in next st*, repeat 6 times around.', stitchCount: '24 sc' },
          { rowNumber: 'Rnd 5-8', text: 'Sc in each st around (4 rounds even). Insert safety eyes between Rnds 7 and 8, spaced 6 sts apart.', stitchCount: '24 sc' },
          { rowNumber: 'Rnd 9', text: '*Sc in next 2 sts, invdec*, repeat 6 times around. Firmly stuff head.', stitchCount: '18 sc' },
          { rowNumber: 'Rnd 10', text: '*Sc in next st, invdec*, repeat 6 times around. Fasten off with long tail.', stitchCount: '12 sc' }
        ]
      }
    ]
  },
  {
    id: 'scandinavian-waffle-throw',
    title: 'Hygge Waffle Heirloom Blanket',
    subtitle: 'Thick architectural waffle stitch with clean self-hem borders',
    category: 'home',
    difficulty: 'Intermediate',
    hookSize: '6.0 mm (US J/10)',
    yarnWeight: 'Chunky / Bulky (Weight 5)',
    yardage: '1,800 meters (1,970 yds)',
    estimatedHours: 32,
    priceDigital: 8.00,
    priceKit: 112.00,
    image: '/src/assets/images/product_chunky_throw_1793993520685.jpg',
    description: 'Generously proportioned throw blanket with high-relief thermal waffle pockets. The alternating front-post and back-post double crochets trap warm air pockets, making it the quintessential fireside companion.',
    materials: [
      '1,200g Bulky unspun carded Peruvian wool in Ecru',
      '6.0 mm Carved Beechwood crochet hook',
      'Steel tapestry needle for weaving in tails',
      'Blocking mats and rust-proof T-pins'
    ],
    techniques: ['Front Post Double Crochet (FPdc)', 'Back Post Double Crochet (BPdc)', 'Foundation Double Crochet', 'Thermal Border'],
    designer: 'Maren Lindqvist',
    stitchKey: 'fdc = foundation dc, FPdc = front post double crochet, BPdc = back post double crochet',
    sampleInstructions: [
      {
        sectionName: 'Body Fabric (Repeat Rows 2 & 3)',
        rows: [
          { rowNumber: 'Row 1 (Base)', text: 'Work 137 fdc (multiple of 3 + 2). Ch 2 (does not count as st), turn.', stitchCount: '137 dc' },
          { rowNumber: 'Row 2', text: 'Dc in first st, *FPdc in next st, dc in next 2 sts*. Repeat from * to last 2 sts, FPdc in next st, dc in last st. Ch 2, turn.', stitchCount: '137 sts' },
          { rowNumber: 'Row 3', text: 'Dc in first st, *BPdc in next 2 sts, dc in next st*. Repeat from * across to end. Ch 2, turn.', stitchCount: '137 sts' },
          { rowNumber: 'Rows 4-140', text: 'Repeat Rows 2 and 3 until blanket measures 56 inches before blocking.', stitchCount: 'Waffle grid' }
        ]
      }
    ]
  },
  {
    id: 'botanical-tote-bag',
    title: 'Foret French Market Tote',
    subtitle: 'Expandable filet lace mesh bag with reinforced handles',
    category: 'accessories',
    difficulty: 'Beginner',
    hookSize: '4.0 mm (US G/6)',
    yarnWeight: 'DK Mercerized Cotton',
    yardage: '380 meters (415 yds)',
    estimatedHours: 6,
    priceDigital: 5.50,
    priceKit: 28.00,
    image: '/src/assets/images/craft_yarn_skeins_1793993521386.jpg',
    description: 'An eco-conscious French-style market tote that expands to hold farmer market groceries, books, or beach essentials. Built from an oval double-crochet base into breathable diamond mesh arches.',
    materials: [
      '200g 100% Recycled Plant-Dyed Cotton (DK weight)',
      '4.0 mm comfort-grip crochet hook',
      '4 lockable stitch markers'
    ],
    techniques: ['Chain Arches', 'Oval Base Construction', 'Reinforced Thermal Handles', 'Crab Stitch Edge'],
    designer: 'Camille Dubois',
    stitchKey: 'ch = chain, sc = single crochet, dc = double crochet, ch-sp = chain space',
    sampleInstructions: [
      {
        sectionName: 'Oval Base Foundation',
        rows: [
          { rowNumber: 'Rnd 1', text: 'Ch 31. 2 sc in 2nd ch from hook, sc in next 28 ch, 4 sc in last ch. Working across opposite side of chain: sc in next 28 ch, 2 sc in same ch as first 2 sc. Join with sl st.', stitchCount: '64 sc' },
          { rowNumber: 'Rnd 2', text: 'Ch 1, 2 sc in each of next 2 sts, sc in next 28 sts, 2 sc in each of next 4 sts, sc in next 28 sts, 2 sc in last 2 sts. Join.', stitchCount: '72 sc' },
          { rowNumber: 'Mesh Transition', text: 'Ch 5 (counts as dc + ch 2), *sk 2 sts, dc in next st, ch 2*. Repeat around. Continue in spiral for 32 rounds.', stitchCount: '24 mesh windows' }
        ]
      }
    ]
  }
];

export const STITCH_LIBRARY: StitchGuideItem[] = [
  {
    id: 'single-crochet',
    nameUS: 'Single Crochet (sc)',
    nameUK: 'Double Crochet (dc)',
    abbrUS: 'sc',
    abbrUK: 'dc',
    difficulty: 'Beginner',
    description: 'The foundation of all dense crochet fabric and amigurumi. Creates a tight, sturdy, non-stretchy weave.',
    steps: [
      'Insert hook into the next stitch through both top loops (V-shape).',
      'Yarn over (yo) from back to front.',
      'Pull yarn through the stitch (2 loops on your hook).',
      'Yarn over again and pull through both loops on the hook.'
    ],
    proTip: 'For cleaner amigurumi surfaces with zero stuffing peek-through, work into the front loops only or use yarn-under.',
    idealFor: 'Amigurumi, firm baskets, sturdy pot holders, bag straps.'
  },
  {
    id: 'half-double-crochet',
    nameUS: 'Half Double Crochet (hdc)',
    nameUK: 'Half Treble Crochet (htr)',
    abbrUS: 'hdc',
    abbrUK: 'htr',
    difficulty: 'Beginner',
    description: 'The golden middle stitch: taller than single crochet, denser than double crochet, with a distinctive third loop behind the V.',
    steps: [
      'Yarn over your hook before inserting into the stitch.',
      'Insert hook into the stitch.',
      'Yarn over and pull a loop through (3 loops on hook).',
      'Yarn over once more and pull through all 3 loops simultaneously.'
    ],
    proTip: 'Working exclusively into the "third loop" (hidden on the back) forces the standard V-loops to tilt forward, mimicking knitted stockinette ribs.',
    idealFor: 'Beanies, cozy cardigans, ribbed sweater trims, textured cowls.'
  },
  {
    id: 'double-crochet',
    nameUS: 'Double Crochet (dc)',
    nameUK: 'Treble Crochet (tr)',
    abbrUS: 'dc',
    abbrUK: 'tr',
    difficulty: 'Beginner',
    description: 'The classic workhorse stitch used for granny squares, ripples, afghans, and drapey garments. Twice the height of single crochet.',
    steps: [
      'Yarn over before inserting into stitch.',
      'Insert hook, yarn over and pull up loop (3 loops on hook).',
      'Yarn over, draw through the first 2 loops (2 loops remain).',
      'Yarn over, draw through the remaining 2 loops.'
    ],
    proTip: 'Count your turning chain (ch 3) as the first dc unless the pattern specifically specifies "ch 2 (does not count as stitch)".',
    idealFor: 'Classic granny squares, shawls, summer tees, chevron throws.'
  },
  {
    id: 'magic-ring',
    nameUS: 'Magic Ring / Adjustable Loop',
    nameUK: 'Magic Ring',
    abbrUS: 'MR / MC',
    abbrUK: 'MR / MC',
    difficulty: 'Beginner',
    description: 'The secret to round crochet without an open hole in the center. Essential for all amigurumi, circular hats, and top-down motifs.',
    steps: [
      'Wrap yarn around your index and middle finger, crossing over like an X.',
      'Insert hook under the first strand and grab the working yarn strand.',
      'Pull loop through, yarn over with working strand and chain 1 to anchor.',
      'Work the stated number of single crochets directly over both ring strands.',
      'Gently pull the short yarn tail until the center hole cinches completely closed.'
    ],
    proTip: 'Always weave the tail back and forth in opposing directions with a tapestry needle so the magic loop never slips open when washed.',
    idealFor: 'Mandala centers, amigurumi heads, top-down beanies, floral coasters.'
  },
  {
    id: 'front-post-double-crochet',
    nameUS: 'Front Post Double Crochet',
    nameUK: 'Raised Treble Front',
    abbrUS: 'FPdc',
    abbrUK: 'RtrF',
    difficulty: 'Intermediate',
    description: 'Instead of inserting into the top loops, you wrap around the vertical post of the row below from front to back to front. Creates 3D cables and ribs.',
    steps: [
      'Yarn over.',
      'Insert hook from the FRONT of your work to the BACK, then back to the FRONT around the post of the specified stitch.',
      'Yarn over and pull up a loop around the post (3 loops on hook).',
      'Yarn over, pull through 2 loops (2 loops remain).',
      'Yarn over, pull through remaining 2 loops.'
    ],
    proTip: 'Pull your initial loop up to the height of the current row so your fabric stays relaxed and does not buckle.',
    idealFor: 'Waffle stitch blankets, sweater hems, knitted-look cables, textured cuffs.'
  }
];

export const YARN_WEIGHT_CLASSES = [
  { name: 'Lace (0)', recommendedHook: '1.5 - 2.5 mm', typicalGauge: '32-40 sts / 4 in', metersPer100g: '600 - 900m' },
  { name: 'Fingering / Sock (1)', recommendedHook: '2.25 - 3.25 mm', typicalGauge: '28-32 sts / 4 in', metersPer100g: '400 - 450m' },
  { name: 'Sport / Baby (2)', recommendedHook: '3.25 - 3.75 mm', typicalGauge: '24-28 sts / 4 in', metersPer100g: '300 - 350m' },
  { name: 'DK / Light Worsted (3)', recommendedHook: '3.75 - 4.5 mm', typicalGauge: '21-24 sts / 4 in', metersPer100g: '220 - 260m' },
  { name: 'Worsted / Aran (4)', recommendedHook: '4.5 - 5.5 mm', typicalGauge: '16-20 sts / 4 in', metersPer100g: '180 - 210m' },
  { name: 'Bulky / Chunky (5)', recommendedHook: '5.5 - 8.0 mm', typicalGauge: '12-15 sts / 4 in', metersPer100g: '100 - 140m' },
  { name: 'Super Bulky (6)', recommendedHook: '8.0 - 12.0 mm', typicalGauge: '7-11 sts / 4 in', metersPer100g: '50 - 90m' },
];
