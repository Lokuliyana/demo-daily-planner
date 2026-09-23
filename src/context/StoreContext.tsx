'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
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
  PRODUCTS_CATALOG,
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
  calculatedPriceLKR: 2000, // 1750 (6m) + 250 (stickers)
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Cart State with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

  // Customizer State
  const [plannerConfig, setPlannerConfig] = useState<CustomPlannerConfig>(DEFAULT_PLANNER_CONFIG);
  const [activeStep, setActiveStep] = useState(1);

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Reviews with localStorage
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // Order Modal
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [currentOrderDetails, setCurrentOrderDetails] = useState<OrderCustomerDetails | null>(null);

  // Recalculate price whenever plannerConfig changes
  useEffect(() => {
    const price = calculatePlannerPrice(
      plannerConfig.plannerType,
      plannerConfig.durationMonths,
      plannerConfig.coverType,
      plannerConfig.dailyPageCount,
      {
        stickers: plannerConfig.addOnStickers,
        stickyTabs: plannerConfig.addOnStickyTabs,
        ribbon: plannerConfig.addOnRibbon,
      }
    );

    setPlannerConfig((prev) => (prev.calculatedPriceLKR !== price ? { ...prev, calculatedPriceLKR: price } : prev));
  }, [
    plannerConfig.plannerType,
    plannerConfig.durationMonths,
    plannerConfig.coverType,
    plannerConfig.dailyPageCount,
    plannerConfig.addOnStickers,
    plannerConfig.addOnStickyTabs,
    plannerConfig.addOnRibbon,
  ]);

  // Load from localStorage on client mount
  useEffect(() => {
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
      console.error('Failed to load local storage data', e);
    }
    setHasLoadedStorage(true);
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    if (hasLoadedStorage) {
      try {
        localStorage.setItem('little_lines_cart', JSON.stringify(cart));
      } catch (e) {
        console.error('Failed to save cart to local storage', e);
      }
    }
  }, [cart, hasLoadedStorage]);

  // Sync reviews to localStorage
  useEffect(() => {
    if (hasLoadedStorage) {
      try {
        localStorage.setItem('little_lines_reviews', JSON.stringify(reviews));
      } catch (e) {
        console.error('Failed to save reviews to local storage', e);
      }
    }
  }, [reviews, hasLoadedStorage]);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const id = `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setCart((prev) => [...prev, { ...item, id }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalLKR = cart.reduce(
    (sum, item) => sum + item.priceLKR * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const openCustomizerWithPlanner = (type: PlannerType) => {
    setPlannerConfig((prev) => ({
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

    const coverLabel =
      plannerConfig.coverType === 'hardcover_corners'
        ? 'Hardcover + Gold Corner Protectors'
        : 'Softcover Full Laminated';

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
    setReviews((prev) => [newRev, ...prev]);
  };

  const likeReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const generateWhatsAppUrl = (customer: OrderCustomerDetails): string => {
    const storeWhatsAppNumber = '94771234567'; // Little Lines official workshop contact
    const deliveryFee = cartTotalLKR >= 5000 ? 0 : 350;
    const finalGrandTotal = cartTotalLKR + deliveryFee;

    const paymentLabel =
      customer.paymentMethod === 'cod'
        ? 'Cash on Delivery'
        : customer.paymentMethod === 'bank_transfer'
        ? 'Bank Transfer / Deposit Slip'
        : 'Card Payment';

    let message = `✨ Little Lines Order Request\n`;
    message += `-----------------------------------\n`;
    message += `Customer: ${customer.fullName} (${customer.whatsappNumber})\n`;
    message += `Address: ${customer.deliveryAddress}, ${customer.city}\n`;
    message += `Payment: ${paymentLabel}\n\n`;

    message += `Items:\n`;
    cart.forEach((item, index) => {
      const qtyLabel = item.quantity > 1 ? ` (x${item.quantity})` : '';
      message += `${index + 1}. ${item.title}${qtyLabel} - Rs. ${(item.priceLKR * item.quantity).toLocaleString()}\n`;
      if (item.isCustomPlanner && item.customConfig) {
        const cfg = item.customConfig;
        message += `   • Finish: ${cfg.coverType === 'hardcover_corners' ? 'Hardcover + Gold Corners' : 'Softcover Laminated'}\n`;
        const themeObj = COVER_THEMES.find((t) => t.id === cfg.selectedThemeId);
        const themeTitle = cfg.customPhotoUrl
          ? 'Custom Photo'
          : themeObj
          ? themeObj.name.split('/')[0].trim()
          : 'Future Doctor';
        message += `   • Theme: ${themeTitle}\n`;
        message += `   • Name: "${cfg.customName}"\n`;
        const addons = [];
        if (cfg.addOnStickyTabs) addons.push('PET Tabs (+Rs. 200)');
        if (cfg.addOnStickers) addons.push('Stickers (+Rs. 250)');
        if (cfg.addOnRibbon) addons.push('Bookmark Ribbon (+Rs. 150)');
        if (addons.length > 0) {
          message += `   • Add-on: ${addons.join(', ')}\n`;
        }
      }
    });

    message += `\nTotal Amount: LKR ${finalGrandTotal.toLocaleString()}/= (${deliveryFee === 0 ? 'Free Delivery' : 'Includes Rs. 350 delivery'})\n`;
    message += `-----------------------------------\n`;
    message += `Ready for dispatch confirmation!\n`;

    return `https://wa.me/${storeWhatsAppNumber}?text=${encodeURIComponent(message.trim())}`;
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
        setPlannerConfig,
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
