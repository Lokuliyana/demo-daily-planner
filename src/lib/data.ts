import { CoverThemePreset, Product, Review, DurationMonths, PlannerType, CoverType } from './types';

// Exact pricing matrix based on duration in LKR
export const DURATION_PRICES_LKR: Record<DurationMonths, number> = {
  3: 1350,
  4: 1500,
  5: 1600,
  6: 1750,
  7: 1900,
  8: 2000,
  9: 2200,
  10: 2350,
  11: 2500,
  12: 2800,
};

export const HARDCOVER_ADDON_PRICE_LKR = 400;

export const DAILY_PLANNER_PRICES_LKR: Record<number, number> = {
  100: 1100,
  150: 1300,
  200: 1500,
  250: 1800,
  300: 2100,
};

export const YEAR_PLANNER_12M_BASE_LKR = 2000;
export const YEAR_PLANNER_12M_HARDCOVER_LKR = 2400;

export const ADDONS_PRICING_LKR = {
  stickers: 250,
  stickyTabs: 200,
  ribbon: 150,
};

export function calculatePlannerPrice(
  plannerType: PlannerType,
  durationMonths: DurationMonths,
  coverType: CoverType,
  dailyPages: number = 200,
  addons: { stickers?: boolean; stickyTabs?: boolean; ribbon?: boolean } = {}
): number {
  let basePrice = 0;

  if (plannerType === 'al_study') {
    basePrice = DURATION_PRICES_LKR[durationMonths] || 1750;
    if (coverType === 'hardcover_corners') {
      basePrice += HARDCOVER_ADDON_PRICE_LKR;
    }
  } else if (plannerType === 'year_planner') {
    if (coverType === 'hardcover_corners') {
      basePrice = YEAR_PLANNER_12M_HARDCOVER_LKR;
    } else {
      basePrice = YEAR_PLANNER_12M_BASE_LKR;
    }
  } else if (plannerType === 'daily_planner') {
    basePrice = DAILY_PLANNER_PRICES_LKR[dailyPages] || 1500;
    if (coverType === 'hardcover_corners') {
      basePrice += HARDCOVER_ADDON_PRICE_LKR;
    }
  }

  if (addons.stickers) basePrice += ADDONS_PRICING_LKR.stickers;
  if (addons.stickyTabs) basePrice += ADDONS_PRICING_LKR.stickyTabs;
  if (addons.ribbon) basePrice += ADDONS_PRICING_LKR.ribbon;

  return basePrice;
}

// Curated Aesthetic Cover Themes
export const COVER_THEMES: CoverThemePreset[] = [
  {
    id: 'theme_future_dr',
    name: 'Future Doctor / Medical',
    category: 'Aspiration',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
    description: 'Medical aspiration collage, stethoscope motif, Future Dr. rose pink typography.',
    badge: 'Popular for Bio A/L',
  },
  {
    id: 'theme_engineer',
    name: 'Engineering & Tech Master',
    category: 'Aspiration',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    description: 'Technical blueprints, geometric mathematics, modern dark espresso palette.',
    badge: 'Popular for Maths A/L',
  },
  {
    id: 'theme_lawyer',
    name: 'Law & Justice Scales',
    category: 'Aspiration',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    description: 'Vintage courtroom, gold scales of justice, warm burgundy & dark parchment.',
    badge: 'Popular for Arts & Law',
  },
  {
    id: 'theme_cozy_cat',
    name: 'Moonlight Cat & Lantern',
    category: 'Aesthetic',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
    description: 'Fluffy white kitten by warm lantern glow, "Every page is a step closer".',
    badge: 'Bestseller 2027',
  },
  {
    id: 'theme_chibi_anime',
    name: 'Anime Study & Sakura Blossoms',
    category: 'Aesthetic',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&auto=format&fit=crop&q=80',
    description: 'Cute chibi study character with cherry blossoms, pastel aesthetic.',
    badge: 'Cute & Inspiring',
  },
  {
    id: 'theme_midnight_desk',
    name: 'Midnight Study Cafe & Coffee',
    category: 'Academic',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop&q=80',
    description: 'Lofi warm desktop study vibes, coffee cup, nocturnal focus.',
    badge: 'Late Night Grinder',
  },
  {
    id: 'theme_botanical_sage',
    name: 'Matcha Sage Botanical',
    category: 'Aesthetic',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&auto=format&fit=crop&q=80',
    description: 'Minimalist eucalyptus and pressed leaves on warm oat textured background.',
    badge: 'Calm Focus',
  },
];

// Included trackers catalogue for planners
export const AL_STUDY_TRACKERS = [
  '2026 / 2027 / 2028 Calendar with countdown days',
  'Vision Board & Dream University page',
  'Class & Tuition schedule master timetable',
  'Daily & Weekly study hours tracker',
  'Screen time tracker, Sleep tracker, Mood tracker',
  'Subject-wise breakdown (Subject cover & targets)',
  'Past Papers Tracker (MCQ, SEQ & Essay questions)',
  'Model Papers tracker & progress charts',
  'Monthly custom photo Shine Pages (Free customization)',
  'Monthly planner + 5 weekly spreads per month',
  '31 Daily Study Planners per month',
  'Habit tracker, Star reward rating system, Notes pages',
];

export const YEAR_PLANNER_TRACKERS = [
  'This planner belongs to personalized page',
  '2027 / 2028 Full Year Calendar',
  'Letter to my future self & All About Me',
  'Vision Board & Yearly Goals Breakdown',
  'Birthday & Special occasions calendar',
  'Password tracker & Digital vault',
  'Mood, Sleep, Screen time & Weather trackers',
  'Fitness & Hydration tracker',
  'Book reading tracker & Movie watchlist',
  'Favorite playlist & Travel bucket list',
  '12 Monthly Shine Pages (Custom photo printable)',
  'Monthly budget & Savings tracker',
  'Self-care checklist & Daily gratitude prompts',
  'Creative coloring page & 2 blank notes spreads',
];

export const DAILY_PLANNER_TRACKERS = [
  'Custom personalized cover with gloss/matte lamination',
  '2 Custom photo Shine Divider pages',
  'Daily prioritized task list with checkboxes',
  'Hourly time-blocking matrix (6:00 AM - 11:00 PM)',
  'Water intake & meal plan tracker',
  'Daily positive win & gratitude box',
  'Quick dot-grid notes for doodles and brainstorms',
];

// Product Catalog Data - Clean, professional, zero raw emojis
export const PRODUCTS_CATALOG: Product[] = [
  {
    id: 'al-study-planner-custom',
    title: 'A/L Study Planner (2027 & 2028 A/L)',
    category: 'study_planners',
    priceLKR: 1750,
    originalPriceLKR: 2200,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    description: 'Our flagship study planner designed for Sri Lankan A/L students. Tailored for 4–12 months with subject past paper trackers (MCQ, SEQ, Essay), study hour logs, and free photo-customized cover + shine pages.',
    badge: 'Most Popular',
    rating: 4.9,
    reviewsCount: 148,
    isCustomizable: true,
    plannerTypeRef: 'al_study',
    specs: {
      size: 'A5 (148 x 210 mm)',
      paper: '120gsm ink-proof bleed-resistant smooth cream paper',
      pages: '120 - 360 pages (depending on duration)',
      binding: 'Sturdy twin-wire spiral or Hardcover bound',
      includes: AL_STUDY_TRACKERS,
    },
  },
  {
    id: 'year-planner-2027',
    title: '2027 Life & Goal Year Planner',
    category: 'planners',
    priceLKR: 2000,
    originalPriceLKR: 2500,
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80',
    description: 'Complete 12-month life planner with 20+ specialized trackers (Mood, Sleep, Budget, Travel, Reading, Gratitude) and 12 custom photo monthly shine divider pages.',
    badge: '2027 Edition',
    rating: 5.0,
    reviewsCount: 92,
    isCustomizable: true,
    plannerTypeRef: 'year_planner',
    specs: {
      size: 'A5 size with protective corner caps',
      paper: '120gsm premium satin white paper',
      pages: '240 pages',
      binding: 'Double spiral bound with full laminate or hardcover',
      includes: YEAR_PLANNER_TRACKERS,
    },
  },
  {
    id: 'daily-planner-200p',
    title: 'My Daily Planners (Custom Page Count)',
    category: 'planners',
    priceLKR: 1500,
    originalPriceLKR: 1800,
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
    description: 'Focus on one day at a time. Choose between 100 to 300 daily planner pages with free personalized cover and 2 shine divider pages.',
    badge: 'Daily Focus',
    rating: 4.8,
    reviewsCount: 64,
    isCustomizable: true,
    plannerTypeRef: 'daily_planner',
    specs: {
      size: 'A5 size',
      paper: '100gsm smooth writing sheets',
      pages: '100 - 300 pages selectable',
      binding: 'Wire-O black coil',
      includes: DAILY_PLANNER_TRACKERS,
    },
  },
  {
    id: 'sticky-notes-pastel-palette',
    title: 'Pastel Aesthetic Sticky Notes Set (6 Pads)',
    category: 'sticky_notes',
    priceLKR: 750,
    originalPriceLKR: 950,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80',
    description: 'Aesthetic muted pastel sticky notes with subtle grid, habit checklist lines, and translucent memo tabs. Perfect for planners and textbooks.',
    badge: 'Stationery Favorite',
    rating: 4.9,
    reviewsCount: 78,
    isCustomizable: false,
    specs: {
      size: '75 x 75 mm & index tab strips',
      paper: '80gsm high-tack repositionable adhesive',
      pages: '50 sheets per pad (300 sheets total)',
      binding: 'Tear-off top pad',
    },
  },
  {
    id: 'todo-notepad-daily-focus',
    title: 'Daily Intentions & To-Do Tear-Off Notepad',
    category: 'to_do',
    priceLKR: 650,
    originalPriceLKR: 800,
    image: 'https://images.unsplash.com/photo-1584448141569-69f342da535c?w=600&auto=format&fit=crop&q=80',
    description: 'Crisp desk pad with Top 3 Priorities, time slots, quick checkbox checklist, and hydration counter. Thick chipboard backing.',
    badge: 'Desk Essential',
    rating: 4.9,
    reviewsCount: 53,
    isCustomizable: false,
    specs: {
      size: 'A5 Desk Pad',
      paper: '100gsm heavy uncoated paper',
      pages: '60 tear-away sheets',
      binding: 'Gummed top edge',
    },
  },
  {
    id: 'desk-calendar-2027-mini',
    title: 'Mini Stand-Up Aesthetic Desk Calendar 2027',
    category: 'calendars',
    priceLKR: 850,
    originalPriceLKR: 1100,
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&auto=format&fit=crop&q=80',
    description: 'Compact stand-up desk calendar with monthly motivational artwork, date blocks with notes space, and sturdy kraft easel stand.',
    badge: 'New 2027',
    rating: 4.8,
    reviewsCount: 39,
    isCustomizable: false,
    specs: {
      size: '150 x 180 mm easel format',
      paper: '250gsm textured cardstock',
      pages: '12 double-sided cards',
      binding: 'Gold twin-ring wire on rigid stand',
    },
  },
  {
    id: 'wall-stickers-study-motivation',
    title: 'Aesthetic Vinyl Wall Stickers & Study Deco Pack',
    category: 'stickers',
    priceLKR: 550,
    originalPriceLKR: 700,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
    description: 'Waterproof matte vinyl decals with positive quotes, study mantras, botanical flourishes, and cute mascots. Residue-free peel.',
    badge: 'Waterproof Vinyl',
    rating: 5.0,
    reviewsCount: 112,
    isCustomizable: false,
    specs: {
      size: 'A4 sheet with 28 kiss-cut stickers',
      paper: 'Matte laminated vinyl with strong tack',
      pages: '3 sheets in pack',
      binding: 'Peel and stick backing',
    },
  },
  {
    id: 'study-habit-flag-tabs',
    title: 'Transparent Aesthetic Page Flags & Index Tabs',
    category: 'sticky_notes',
    priceLKR: 450,
    originalPriceLKR: 600,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    description: 'Translucent PET index tabs that do not cover text beneath. Writeable with ballpoint pens and pencils for indexing A/L past paper books.',
    badge: 'Exam Study Aid',
    rating: 4.7,
    reviewsCount: 45,
    isCustomizable: false,
    specs: {
      size: '12 x 45 mm tabs (10 soft earthy shades)',
      paper: 'Waterproof writeable PET film',
      pages: '200 tabs total',
      binding: 'Ruler binder card',
    },
  },
];

// Initial Verified Reviews (Emoji-free, professional)
export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Nimna Wijesinghe',
    rating: 5,
    date: '2 days ago',
    productTitle: 'Custom A/L Study Planner (8 Months)',
    plannerTag: 'Bio Stream • Future Doctor Cover • 8 Months Hardcover',
    comment: 'The 120gsm paper handles my Stabilo highlighters with zero bleed! MCQ tracker kept me completely on schedule during past papers.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop&q=80',
    verifiedPurchase: true,
    likes: 24,
  },
  {
    id: 'rev-2',
    author: 'Kavindu Perera',
    rating: 5,
    date: '1 week ago',
    productTitle: 'A/L Study Planner (2028 A/L)',
    plannerTag: 'Maths Stream • Engineering Theme • 12 Months Softcover',
    comment: 'The monthly shine pages with my own photos came out high resolution and glossy. The price of 2,800 LKR for a full year planner is exceptional value. WhatsApp ordering was immediate.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80',
    verifiedPurchase: true,
    likes: 19,
  },
  {
    id: 'rev-3',
    author: 'Sanduni De Silva',
    rating: 5,
    date: '2 weeks ago',
    productTitle: '2027 Life & Goal Year Planner',
    plannerTag: 'Moonlight Cat Theme • Hardcover with Gold Corners',
    comment: 'The gold metal corner protectors make the planner feel so premium! The budget and sleep trackers are helping me build great habits. Packaging was pristine.',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80',
    verifiedPurchase: true,
    likes: 31,
  },
  {
    id: 'rev-4',
    author: 'Tharusha Jayawardena',
    rating: 5,
    date: '3 weeks ago',
    productTitle: 'My Daily Planners (200 Pages)',
    plannerTag: 'Custom 200 Pages • Midnight Study Cover',
    comment: 'I use this for my university studies and daily tasks. The hourly time blocks (6am-11pm) are exactly what I needed. Customer service was very prompt on WhatsApp.',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&auto=format&fit=crop&q=80',
    verifiedPurchase: true,
    likes: 14,
  },
];
