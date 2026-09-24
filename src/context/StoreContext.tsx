'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  CartItem,
  CustomPlannerConfig,
  Product,
  Review,
  PlannerType,
  OrderCustomerDetails,
} from '@/lib/types';
import {
  INITIAL_REVIEWS,
  calculatePlannerPrice,
  COVER_THEMES,
} from '@/lib/data';

interface StoreContextType {
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  cartTotalLKR: number;
  cartCount: number;

  // Customizer Studio State
  plannerConfig: CustomPlannerConfig;
  setPlannerConfig: React.Dispatch<React.SetStateAction<CustomPlannerConfig>>;
  activeStep: number;
  setActiveStep: (step: number) => void;
  openCustomizerWithPlanner: (type: PlannerType) => void;
  addCurrentCustomPlannerToCart: () => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Reviews Hub
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'likes'>) => void;
  likeReview: (id: string) => void;

  // Order Receipt & WhatsApp Handoff
  isOrderModalOpen: boolean;
  setIsOrderModalOpen: (open: boolean) => void;
  currentOrderDetails: OrderCustomerDetails | null;
  setCurrentOrderDetails: (details: OrderCustomerDetails | null) => void;
  generateWhatsAppUrl: (customer: OrderCustomerDetails) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const DEFAULT_PLANNER_CONFIG: CustomPlannerConfig = {
  plannerType: 'al_study',
  durationMonths: 6,
  dailyPageCount: 200,
  coverType: 'soft_laminated',
  coverTitle: 'MY STUDY PLANNER',
  coverSubtitle: '2027 & 2028 A/L DREAM JOURNEY',
  customName: 'Future Doctor',
  selectedThemeId: 'theme_future_dr',
  addOnStickers: true,
  addOnStickyTabs: false,
  addOnRibbon: false,
  calculatedPriceLKR: 2000,
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [rawPlannerConfig, setRawPlannerConfig] = useState<CustomPlannerConfig>(DEFAULT_PLANNER_CONFIG);
  const [activeStep, setActiveStep] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [currentOrderDetails, setCurrentOrderDetails] = useState<OrderCustomerDetails | null>(null);

  // Safe client hydration from localStorage after initial render
  React.useEffect(() => {
    try {
      const savedCart = localStorage.getItem('little_lines_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedReviews = localStorage.getItem('little_lines_reviews');
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      }
    } catch (e) {
      console.error('Failed to parse storage data', e);
    }
  }, []);

  // Compute calculated price synchronously
  const calculatedPrice = calculatePlannerPrice(
    rawPlannerConfig.plannerType,
    rawPlannerConfig.durationMonths,
    rawPlannerConfig.coverType,
    rawPlannerConfig.dailyPageCount,
    {
      stickers: rawPlannerConfig.addOnStickers,
      stickyTabs: rawPlannerConfig.addOnStickyTabs,
      ribbon: rawPlannerConfig.addOnRibbon,
    }
  );

  const plannerConfig: CustomPlannerConfig = {
    ...rawPlannerConfig,
    calculatedPriceLKR: calculatedPrice,
  };

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const id = `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setCart((prev) => {
      const updated = [...prev, { ...item, id }];
      try {
        localStorage.setItem('little_lines_cart', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save cart', e);
      }
      return updated;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('little_lines_cart', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save cart', e);
      }
      return updated;
    });
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item));
      try {
        localStorage.setItem('little_lines_cart', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save cart', e);
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem('little_lines_cart');
    } catch (e) {
      console.error('Failed to clear cart', e);
    }
  };

  const cartTotalLKR = cart.reduce(
    (sum, item) => sum + item.priceLKR * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const openCustomizerWithPlanner = (type: PlannerType) => {
    setRawPlannerConfig((prev) => ({
      ...prev,
      plannerType: type,
      coverTitle:
        type === 'al_study'
          ? 'MY STUDY PLANNER'
          : type === 'year_planner'
          ? 'MY 2027 YEAR PLANNER'
          : 'MY DAILY PLANNER',
      coverSubtitle:
        type === 'al_study'
          ? '2027 & 2028 A/L DREAM JOURNEY'
          : type === 'year_planner'
          ? 'EVERY PAGE IS A STEP CLOSER'
          : 'INTENTIONAL DAILY FOCUS',
    }));
    setActiveStep(1);
    const studioElement = document.getElementById('planner-studio');
    if (studioElement) {
      studioElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const addCurrentCustomPlannerToCart = () => {
    const theme = COVER_THEMES.find((t) => t.id === plannerConfig.selectedThemeId);
    const plannerName =
      plannerConfig.plannerType === 'al_study'
        ? `Custom A/L Study Planner (${plannerConfig.durationMonths} Months)`
        : plannerConfig.plannerType === 'year_planner'
        ? 'Custom 2027 Year Life Planner (12 Months)'
        : `Custom Daily Planner (${plannerConfig.dailyPageCount || 200} Pages)`;

    addToCart({
      title: plannerName,
      priceLKR: plannerConfig.calculatedPriceLKR,
      quantity: 1,
      image: plannerConfig.customPhotoUrl || theme?.imageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
      isCustomPlanner: true,
      customConfig: { ...plannerConfig },
    });
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'likes'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      likes: 1,
    };
    setReviews((prev) => {
      const updated = [newRev, ...prev];
      try {
        localStorage.setItem('little_lines_reviews', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save review', e);
      }
      return updated;
    });
  };

  const likeReview = (id: string) => {
    setReviews((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r));
      try {
        localStorage.setItem('little_lines_reviews', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save review likes', e);
      }
      return updated;
    });
  };

  const generateWhatsAppUrl = (customer: OrderCustomerDetails): string => {
    const storeWhatsAppNumber = '94771234567';
    let message = `[LITTLE LINES - NEW ORDER REQUEST]\n\n`;
    message += `Customer Name: ${customer.fullName}\n`;
    message += `Phone / WhatsApp: ${customer.whatsappNumber}\n`;
    message += `Delivery Address: ${customer.deliveryAddress}, ${customer.city}\n`;
    message += `Payment Option: ${customer.paymentMethod.toUpperCase()}\n`;
    if (customer.notes) {
      message += `Customer Notes: ${customer.notes}\n`;
    }
    message += `\n---------------------\n`;
    message += `ORDER ITEMS:\n\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.title} (Qty: ${item.quantity}) - LKR ${(item.priceLKR * item.quantity).toLocaleString()}/=\n`;
      if (item.isCustomPlanner && item.customConfig) {
        const cfg = item.customConfig;
        message += `   - Cover Finish: ${cfg.coverType === 'hardcover_corners' ? 'Hard Cover with Gold Metal Corners' : 'Soft Cover Full Laminated'}\n`;
        message += `   - Duration / Pages: ${cfg.plannerType === 'daily_planner' ? `${cfg.dailyPageCount} Daily Pages` : `${cfg.durationMonths} Months`}\n`;
        message += `   - Embossed Name / Title: "${cfg.customName}" / "${cfg.coverTitle}"\n`;
        message += `   - Theme / Cover Art: ${cfg.customPhotoUrl ? 'Uploaded Custom Photo (Sent in chat)' : cfg.selectedThemeId}\n`;
        if (cfg.specialNotes) {
          message += `   - Customization Note: ${cfg.specialNotes}\n`;
        }
        const addons = [];
        if (cfg.addOnStickers) addons.push('Aesthetic Sticker Sheet');
        if (cfg.addOnStickyTabs) addons.push('Index Flag Tabs');
        if (cfg.addOnRibbon) addons.push('Silk Ribbon Marker');
        if (addons.length > 0) {
          message += `   - Add-ons: ${addons.join(', ')}\n`;
        }
      }
      message += `\n`;
    });

    const deliveryFee = cartTotalLKR >= 5000 ? 0 : 350;
    const finalGrandTotal = cartTotalLKR + deliveryFee;

    message += `---------------------\n`;
    message += `Subtotal: LKR ${cartTotalLKR.toLocaleString()}/=\n`;
    message += `Delivery: ${deliveryFee === 0 ? 'FREE (Orders over LKR 5,000)' : `LKR ${deliveryFee}/=`}\n`;
    message += `TOTAL ESTIMATE: LKR ${finalGrandTotal.toLocaleString()}/=\n\n`;
    message += `Thank you for handcrafting my custom stationery!`;

    return `https://wa.me/${storeWhatsAppNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalLKR,
        cartCount,
        plannerConfig,
        setPlannerConfig: setRawPlannerConfig,
        activeStep,
        setActiveStep,
        openCustomizerWithPlanner,
        addCurrentCustomPlannerToCart,
        quickViewProduct,
        setQuickViewProduct,
        reviews,
        addReview,
        likeReview,
        isOrderModalOpen,
        setIsOrderModalOpen,
        currentOrderDetails,
        setCurrentOrderDetails,
        generateWhatsAppUrl,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
