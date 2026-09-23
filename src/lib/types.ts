export type PlannerType = 'al_study' | 'year_planner' | 'daily_planner';

export type CoverType = 'soft_laminated' | 'hardcover_corners';

export type DurationMonths = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface CoverThemePreset {
  id: string;
  name: string;
  category: 'Aspiration' | 'Aesthetic' | 'Academic';
  imageUrl: string;
  description: string;
  badge?: string;
}

export interface CustomPlannerConfig {
  plannerType: PlannerType;
  durationMonths: DurationMonths;
  dailyPageCount?: number; // for daily planners (e.g. 100, 200, 300)
  coverType: CoverType;
  coverTitle: string;
  coverSubtitle: string;
  customName: string;
  selectedThemeId: string;
  customPhotoUrl?: string;
  shinePagePhotoUrl?: string;
  specialNotes?: string;
  addOnStickers: boolean;
  addOnStickyTabs: boolean;
  addOnRibbon: boolean;
  calculatedPriceLKR: number;
}

export interface Product {
  id: string;
  title: string;
  category: 'planners' | 'study_planners' | 'to_do' | 'sticky_notes' | 'calendars' | 'stickers';
  priceLKR: number;
  originalPriceLKR?: number;
  image: string;
  description: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  isCustomizable: boolean;
  plannerTypeRef?: PlannerType;
  specs: {
    size?: string;
    paper?: string;
    pages?: string | number;
    binding?: string;
    includes?: string[];
  };
}

export interface CartItem {
  id: string;
  productId?: string;
  title: string;
  priceLKR: number;
  quantity: number;
  image: string;
  isCustomPlanner?: boolean;
  customConfig?: CustomPlannerConfig;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  productTitle: string;
  comment: string;
  plannerTag?: string; // e.g., "A/L Medical Planner • 6 Months Hardcover"
  imageUrl?: string;
  verifiedPurchase: boolean;
  likes: number;
}

export interface OrderCustomerDetails {
  fullName: string;
  whatsappNumber: string;
  deliveryAddress: string;
  city: string;
  postalCode?: string;
  notes?: string;
  paymentMethod: 'cod' | 'bank_transfer' | 'card';
}
