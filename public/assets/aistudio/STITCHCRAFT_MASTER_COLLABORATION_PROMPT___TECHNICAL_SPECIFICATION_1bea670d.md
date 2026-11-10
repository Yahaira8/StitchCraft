# **STITCHCRAFT MASTER COLLABORATION PROMPT & TECHNICAL SPECIFICATION**

## **PART I: AI COLLABORATION & PHASE EXECUTION PROTOCOL**

### **1\. Operating Rules for AI Assistant**

You are acting as an expert full-stack developer and AI co-pilot for building **StitchCraft**, an amigurumi companion web app. You must strictly adhere to the following execution protocol:

* **Strict Sequential Phase Execution:** Work must be executed strictly **one phase at a time** across 5 distinct phases. Do not generate code or architecture for future phases until the current phase is fully built, tested, and approved.  
*   
* **Phase Readiness Verification:** Before advancing to the next phase, ask the user to confirm completion of all checkpoint items for the current phase. Run a verification check against the required deliverables.  
*   
* **Rollback Safety:** Maintain clear modular boundaries in code suggestions so the user can easily revert or isolate changes if a bug occurs.  
*   
* **Production Seed Data Integrity:** All pattern seed data must use verified single-part YouTube embed URLs (\[https\://www\.youtube.com/embed/\](https\://www\.youtube.com/embed/){ID}) and valid auto-generated thumbnail paths (\[https\://img.youtube.com/vi/\](https\://img.youtube.com/vi/){ID}/hqdefault.jpg). Never invent dummy links or broken image paths.  
* 

### **2\. Phase Advancement Check-In Protocol**

Whenever the user asks, *"Am I ready to proceed to the next phase?"*, evaluate progress against the following criteria:

* **Phase 1 Checkpoint:** Database schema deployed in Supabase, 8 seed patterns inserted, Next.js initialized with dependencies, .env.local configured, TypeScript types defined, and Supabase Auth middleware protecting /projects and /api/projects.  
*   
* **Phase 2 Checkpoint:** /api/patterns (with search and category filters), /api/favorites, /login, /patterns catalog view, and /patterns/\[id\] pattern reader with embedded YouTube videos and dynamic accordions fully functional.  
*   
* **Phase 3 Checkpoint:** Screen Wake Lock hook (useWakeLock), Web Speech API listener (useSpeechRecognition), and sticky RowCounter component integrated into the pattern reader.  
*   
* **Phase 4 Checkpoint:** CRUD API routes (/api/projects), project management page (/projects), dynamic part\_progress state tracker, calculateOverallProgress() progress bar, and CSV export working.  
*   
* **Phase 5 Checkpoint:** Safety eye comparison table (/compare), resizer calculator page (/calculator), dark/light theme contrast audit complete, and e2e verification finished.  
* 

## **PART II: SOFTWARE SPECIFICATION & ARCHITECTURE DOCUMENT**

### **1\. Project Overview & Target Audience**

#### **1.1 Fandom & Community Scope**

**StitchCraft** is a dedicated companion web application engineered specifically for the amigurumi crochet community. Amigurumi—the Japanese art of crocheting small, stuffed yarn creatures—requires specialized techniques distinct from standard garment or blanket crochet, including working in continuous spirals, maintaining tight stitch density to conceal poly-fil stuffing, and installing plastic safety eyes securely.

#### **1.2 Key Problems Solved**

1. **Hands-Free Row Tracking:** Prevents continuous screen timeouts while holding yarn and hooks.  
2.   
3. **Screen Wake Lock & Voice Controls:** Keeps display active and enables hands-free row incrementing without touch interaction.  
4.   
5. **Yarn Weight Scaling & Eye Sizing:** Automatically adjusts safety eye sizes, hook sizes, and yardage when changing yarn weights.  
6.   
7. **Safety Eye & Washer Backing Verification:** Matches yarn stitch density to correct washer profiles (flat vs. sinker/cupped) to prevent detachment.  
8.   
9. **Multi-Part Project Progress:** Tracks progress across separate pieces (head, body, limbs) before assembly.  
10.   
11. **Dynamic Part Breakdown:** Synchronizes tracking states against custom pattern parts (e.g., wings, gills, tentacles) rather than rigid presets.  
12. 

### **2\. Design System & Wireframe Architecture**

#### **2.1 Brand Style & Design Tokens**

| Token | Light Theme | Dark Theme | Purpose |
| :---- | :---- | :---- | :---- |
| \--bg-primary | \#FDFBF7 (Warm Cream) | \#1A1D20 (Deep Slate) | Main page background |
| \--bg-surface | \#FFFFFF (Pure White) | \#25292E (Card Grey) | Card & container backgrounds |
| \--text-primary | \#2B2B2B (Charcoal) | \#EAEAEA (Soft White) | Primary typography |
| \--color-accent | \#C86D51 (Terracotta) | \#E09F93 (Blush Pink) | Interactive elements & active buttons |
| \--color-secondary | \#7A8B7B (Sage Green) | \#95A796 (Muted Sage) | Secondary actions & badges |
| \--border-color | \#E2DDD5 (Soft Beige) | \#363B42 (Dark Border) | Dividers & borders |

#### **2.2 View Breakdown & Component Trees**

```

RootLayout
├── GlobalNavbar (Sticky Top Bar, Theme Toggle, Auth Buttons)
├── MainContentArea (Renders active view)
└── GlobalFooter (Links, Copyright, Quick Stats)

```

##### **View 1: Pattern Library & Directory (**/patterns**)**

* **Purpose:** Browse, search, and filter community amigurumi patterns.  
*   
* **Component Tree:**  
* 

```

PatternLibraryView
├── SearchHeader (Feature #01: Search Bar)
├── FilterToolbar (Feature #02: Category Pill Filters)
├── PatternGrid (Responsive 4-column desktop / 1-column mobile)
│   └── PatternCard [xN]
│       ├── ImagePreview (YouTube Thumbnail)
│       ├── FavoriteButton (Feature #03: Toggle Favorite)
│       └── DifficultyBadge
└── PaginationBar (Page Navigation)

```

* 

##### **View 2: Interactive Pattern Reader (**/patterns/\[id\]**)**

* **Purpose:** Hands-free pattern view with video walkthroughs, step accordions, and continuous screen state.  
*   
* **Component Tree:**  
* 

```

PatternReaderView
├── PatternHeader (Title, Category, Hook & Eye Recommendations)
├── VisualGallery (Feature #04: Image Carousel)
├── VideoSection (Feature #05: Embedded Video Player for Full Tutorial)
├── PatternDetailsAccordion (Feature #10: Instructions by Body Part)
└── FloatingRowCounter (Feature #07: Sticky Bottom Bar & Voice Control)
    ├── CounterControls (+ / - buttons, quick reset)
    └── WakeLockToggle (Keeps mobile display awake)

```

* 

##### **View 3: Amigurumi Project Tracker & Stash Log (**/projects**) — *Primary CRUD View***

* **Purpose:** Create, edit, track, and delete personal Works-in-Progress (WIPs) and individual body parts.  
*   
* **Component Tree:**  
* 

```

ProjectTrackerView
├── ActionHeader ("+ Add New Plushie Project" Modal Trigger)
├── ActiveProjectsGrid
│   └── ProjectCard [xN]
│       ├── PlushieThumbnail
│       ├── DynamicPartProgressList (Head, Body, Limbs, Custom Parts)
│       ├── OverallProgressBar (Feature #08: Dynamic Progress Bar)
│       └── CardActions (Edit Notes, Delete Project)
└── ExportBar (Feature #11: Export Stash & Projects to CSV)

```

* 

##### **View 4: Amigurumi Supplies & Eye Comparison Tool (**/compare**)**

* **Purpose:** Compare yarn densities, safety eye backings (washer vs. sinker), and stuffing materials side by side.  
*   
* **Component Tree:**  
* 

```

ComparisonView
├── ItemSelectorPanel (Select 2 safety eye types or yarn weights)
├── ComparisonTable (Feature #09: Side-by-Side Comparison Matrix)
└── CompatibilityNotes (Visual guides for safety eye washer security)

```

* 

##### **View 5: Pattern Resizer & Safety Eye Sizer (**/calculator**) — *Interactive Domain Tool***

* **Purpose:** Calculate scaling factors, hook adjustments, safety eye size changes, and poly-fil needs when changing yarn weights.  
*   
* **Component Tree:**  
* 

```

ResizerCalculatorView
├── CalculatorForm (Inputs: Original Yarn/Hook vs. Target Yarn)
├── ResultsDashboard
│   ├── ScaledDimensionsCard (Calculated % size change)
│   ├── SafetyEyeRecommendation (Recommended mm size shift)
│   └── RecommendedHookCard (Zero-stuffing-leak hook size)
└── QuickReferenceGuide

```

* 

### **3\. Database Schema & Production Seed Script**

SQL

```

-- PostgreSQL / Supabase DDL Migration Script

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE (Authentication)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. PATTERNS TABLE (Domain Content & Seed Data)
CREATE TABLE IF NOT EXISTS patterns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(150) NOT NULL,
  difficulty VARCHAR(30) CHECK (difficulty IN ('Beginner', 'Advanced Beginner', 'Intermediate', 'Advanced')),
  yarn_weight VARCHAR(50) NOT NULL,
  recommended_hook VARCHAR(10) NOT NULL,
  recommended_eye_size VARCHAR(10) NOT NULL,
  category VARCHAR(50) NOT NULL,
  instructions JSONB NOT NULL,
  video_url TEXT NOT NULL,
  image_urls TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. USER_PROJECTS TABLE (Primary CRUD Entity with Dynamic JSON map)
CREATE TABLE IF NOT EXISTS user_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  pattern_id UUID REFERENCES patterns(id) ON DELETE SET NULL,
  project_name VARCHAR(150) NOT NULL,
  target_yarn VARCHAR(50) NOT NULL,
  target_hook VARCHAR(10) NOT NULL,
  target_eye_size VARCHAR(10) NOT NULL,
  -- Schema: {"part_name": {"current_row": 0, "total_rows": 15, "completed": false}}
  part_progress JSONB NOT NULL DEFAULT '{}'::jsonb,
  overall_completion INT DEFAULT 0 CHECK (overall_completion BETWEEN 0 AND 100),
  status VARCHAR(20) DEFAULT 'In Progress' CHECK (status IN ('Planning', 'In Progress', 'Completed', 'Frogged')),
  personal_notes TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. USER_FAVORITES TABLE (Many-to-Many Relationship)
CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  pattern_id UUID NOT NULL REFERENCES patterns(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, pattern_id)
);

```

#### **Production Seed Script (8 Amigurumi Patterns)**

SQL

```

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

```

### **4\. Technical Architecture, API Routes, Auth & Logic**

#### **4.1 Next.js App Router Folder Structure**

```

stitchcraft/
├── app/
│   ├── layout.tsx                # Root layout with ThemeProvider & Navbar
│   ├── page.tsx                  # Home View / Dashboard
│   ├── login/
│   │   └── page.tsx              # Auth view (Supabase SSR Auth)
│   ├── patterns/
│   │   ├── page.tsx              # View 1: Pattern Library
│   │   └── [id]/
│   │       └── page.tsx          # View 2: Pattern Reader View
│   ├── projects/
│   │   └── page.tsx              # View 3: Project Log (Protected CRUD)
│   ├── compare/
│   │   └── page.tsx              # View 4: Supplies & Eye Comparison
│   ├── calculator/
│   │   └── page.tsx              # View 5: Pattern Resizer & Eye Sizer
│   └── api/
│       ├── patterns/
│       │   ├── route.ts          # GET / catalog search & pagination
│       │   └── [id]/route.ts     # GET / single pattern
│       ├── projects/
│       │   ├── route.ts          # GET/POST user projects
│       │   └── [id]/route.ts     # PUT/DELETE user project
│       └── favorites/
│           └── route.ts          # GET/POST user favorites
├── middleware.ts                 # Supabase Auth middleware protection
├── components/
│   ├── ui/                       # Buttons, Modals, Accordions, Badges
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── RowCounter.tsx            # Hands-free row counter widget (WakeLock & Speech)
│   └── EyeCalculatorForm.tsx     # Domain tool form
├── hooks/
│   ├── useWakeLock.ts            # Screen Wake Lock API custom hook
│   └── useSpeechRecognition.ts   # Web Speech API voice listener hook
├── lib/
│   ├── supabaseClient.ts         # Supabase connection client
│   └── amigurumiMath.ts          # Resizing, eye sizer, and progress logic
└── types/
    └── index.ts                  # TypeScript interfaces for Database models

```

#### **4.2 Full API Route Mapping & Payload Specs**

| Method | Endpoint | Description | Protected | Details / Payload |
| :---- | :---- | :---- | :---- | :---- |
| GET | /api/patterns | Catalog search & pagination | No | Query: ?q=search\_term\&category=Sea+Life\&page=1 |
| GET | /api/patterns/\[id\] | Fetch single pattern | No | URL Param: id |
| GET | /api/projects | Fetch user active projects | Yes | Extracted from auth session |
| POST | /api/projects | Create project record | Yes | Body: { pattern\_id, target\_yarn, target\_hook, target\_eye\_size } |
| PUT | /api/projects/\[id\] | Update progress/notes | Yes | Body: { part\_progress, overall\_completion, status, personal\_notes } |
| DELETE | /api/projects/\[id\] | Delete/frog project | Yes | URL Param: id |
| GET | /api/favorites | Get favorited pattern IDs | Yes | Extracted from auth session |
| POST | /api/favorites | Toggle favorite status | Yes | Body: { pattern\_id } |

#### **4.3 Authentication Architecture Spec**

* **Auth Provider:** Supabase Auth (@supabase/ssr) with Next.js App Router Middleware (middleware.ts).  
*   
* **Session Management:** Server-managed HTTP-only cookies (sb-access-token, sb-refresh-token).  
*   
* **Middleware Protection:**  
* 

  * Route /projects/\* redirects unauthenticated requests to /login?next=/projects.  
  *   
  * API routes /api/projects/\* and /api/favorites/\* return HTTP 401 Unauthorized if unauthenticated.  
  * 

#### **4.4 Wake Lock & Hands-Free Web Speech API Spec**

* **Screen Wake Lock API:** Integration (navigator.wakeLock.request('screen')) toggled via WakeLockToggle component to prevent display sleep during crafting.  
*   
* **Voice Commands via Web Speech API (**webkitSpeechRecognition**):**  
* 

  * "Next" / "Count" $\rightarrow$ Increments current active part row by 1\.  
  *   
  * "Back" / "Previous" $\rightarrow$ Decrements current active part row by 1\.  
  *   
* **Touch Fallback:** High-contrast UI overlay with $64\times 64px$ touch targets for easy tapping with yarn in hand.  
* 

#### **4.5 Mathematical & Calculation Logic (**lib/amigurumiMath.ts**)**

TypeScript

```

export interface PartProgressItem {
  current_row: number;
  total_rows: number;
  completed: boolean;
}

const YARN_WEIGHT_MAP: Record<string, { weight: number; baseHook: number; baseEye: number }> = {
  'Fingering Cotton (#1)': { weight: 1, baseHook: 2.0, baseEye: 6 },
  'Sport Cotton (#2)': { weight: 2, baseHook: 2.5, baseEye: 8 },
  'DK / Worsted (#3 / #4)': { weight: 3.5, baseHook: 3.25, baseEye: 6 },
  'Worsted (#4)': { weight: 4, baseHook: 3.5, baseEye: 8 },
  'Worsted Plush (#4)': { weight: 4, baseHook: 4.0, baseEye: 8 },
  'Chunky Plush (#5)': { weight: 5, baseHook: 5.0, baseEye: 12 },
  'Super Bulky Plush (#6)': { weight: 6, baseHook: 5.0, baseEye: 10 },
};

export function calculateAmigurumiScale(
  originalYarnKey: string,
  targetYarnKey: string,
  originalEyeSizeMm: number
) {
  const orig = YARN_WEIGHT_MAP[originalYarnKey] || YARN_WEIGHT_MAP['Worsted (#4)'];
  const target = YARN_WEIGHT_MAP[targetYarnKey] || YARN_WEIGHT_MAP['Super Bulky Plush (#6)'];

  const scaleRatio = target.weight / orig.weight;
  const estimatedSizeMultiplier = Math.round(Math.pow(scaleRatio, 0.75) * 100) / 100;
  const recommendedEyeSize = Math.round(originalEyeSizeMm * Math.sqrt(scaleRatio));

  return {
    scaleRatio: estimatedSizeMultiplier,
    recommendedHook: `${target.baseHook}mm`,
    recommendedEyeSize: `${recommendedEyeSize}mm`,
    stuffingMultiplier: Math.round(Math.pow(scaleRatio, 1.5) * 100) / 100,
  };
}

export function calculateOverallProgress(
  partProgress: Record<string, PartProgressItem>
): number {
  const parts = Object.values(partProgress);
  if (parts.length === 0) return 0;

  const totalRowsSum = parts.reduce((sum, p) => sum + Math.max(1, p.total_rows), 0);
  const currentRowsSum = parts.reduce(
    (sum, p) => sum + Math.min(p.current_row, p.total_rows),
    0
  );

  return Math.min(100, Math.round((currentRowsSum / totalRowsSum) * 100));
}

```

### **5\. Sequentially Renumbered Feature Matrix**

| Feature \# | Feature Name | Integrated Location | Technical Implementation |
| :---- | :---- | :---- | :---- |
| **\#01** | Search Bar | Pattern Library (/patterns) | Filters SQL query using ILIKE '%query%' on patterns.title. |
| **\#02** | Category Filters | Pattern Library (/patterns) | Multi-select pills for patterns.category. |
| **\#03** | Pattern Favorites | Cards & Pattern Reader | Mutates user\_favorites table via /api/favorites. |
| **\#04** | Image Carousel | Pattern Reader (/patterns/\[id\]) | Renders patterns.image\_urls array. |
| **\#05** | Video Tutorial Embed | Pattern Reader (/patterns/\[id\]) | Responsive YouTube iframe player for full walkthroughs. |
| **\#06** | Theme Toggle | Global Navbar | Tailwind dark class synced with browser localStorage. |
| **\#07** | Interactive Row Counter | Pattern Reader (/patterns/\[id\]) | Screen Wake Lock API & Web Speech API listener (webkitSpeechRecognition). |
| **\#08** | Dynamic Progress Bar | Project Tracker (/projects) | Calculated dynamically via calculateOverallProgress(). |
| **\#09** | Eye & Supply Matrix | Comparison View (/compare) | Side-by-side comparison matrix evaluating washers vs. sinker backs. |
| **\#10** | Dynamic Accordions | Pattern Reader (/patterns/\[id\]) | Generated dynamically from patterns.instructions JSON keys. |
| **\#11** | Stash Data Export | Project Tracker (/projects) | Front-end JSON-to-CSV converter and browser download trigger. |

## **PART III: 5-PHASE IMPLEMENTATION ROADMAP**

### **Phase 1: Database Setup & Infrastructure Foundation**

* Execute PostgreSQL DDL migration script in Supabase (users, patterns, user\_projects, user\_favorites).  
*   
* Seed patterns table with all 8 amigurumi patterns, embedded YouTube URLs, and thumbnail arrays.  
*   
* Initialize Next.js App Router repo with TypeScript, Tailwind CSS, Lucide icons, @supabase/supabase-js, and @supabase/ssr.  
*   
* Configure .env.local with Supabase project URL and anon key.  
*   
* Create TypeScript interfaces in types/index.ts and client instance in lib/supabaseClient.ts.  
*   
* Implement middleware.ts to protect /projects and private /api/\* endpoints.  
* 

### **Phase 2: Pattern Catalog & Interactive Reader (Views 1 & 2\)**

* Create GET API endpoints /api/patterns (with ILIKE search and category filtering) and /api/patterns/\[id\].  
*   
* Build /api/favorites GET and POST routes for user pattern favoriting.  
*   
* Implement /app/login/page.tsx for user sign-in and sign-up with Supabase Auth.  
*   
* Build /app/patterns/page.tsx with search input, category selection pills, difficulty badges, and favorite heart buttons.  
*   
* Build /app/patterns/\[id\]/page.tsx with image carousel, embedded YouTube player, and dynamic instruction accordions parsed from JSON keys.  
* 

### **Phase 3: Hands-Free Ergonomics & Voice Controls**

* Implement useWakeLock hook leveraging Screen Wake Lock API (navigator.wakeLock.request('screen')).  
*   
* Implement useSpeechRecognition hook leveraging Web Speech API (webkitSpeechRecognition) listening for "Next", "Count", "Back", and "Previous".  
*   
* Build floating RowCounter component with $64\times 64px$ touch targets, wake lock indicator, mic status indicator, and quick reset.  
* 

### **Phase 4: User Project Tracker & Stash CRUD (View 3\)**

* Create REST API endpoints /api/projects (GET/POST) and /api/projects/\[id\] (PUT/DELETE).  
*   
* Build /app/projects/page.tsx dashboard displaying project cards, dynamic part\_progress row progress lists, and delete actions.  
*   
* Integrate calculateOverallProgress() helper to calculate real-time weighted percentage progress bars.  
*   
* Implement front-end CSV exporter converting project JSON objects into downloadable stitchcraft\_projects.csv.  
* 

### **Phase 5: Domain Tools & Final Polish (Views 4 & 5\)**

* Implement mathematical scaling helpers (calculateAmigurumiScale) in lib/amigurumiMath.ts.  
*   
* Build /app/compare/page.tsx side-by-side table comparing flat vs. sinker safety eye washers across yarn weights.  
*   
* Build /app/calculator/page.tsx interactive resizer calculator outputting dimension scale multipliers, recommended hook sizes, safety eye diameters, and stuffing volume requirements.  
*   
* Perform full dark/light theme contrast audit (\#FDFBF7 cream vs. \#1A1D20 slate) and e2e functional verification.

