'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { OrderCustomerDetails } from '@/lib/types';
import { COVER_THEMES } from '@/lib/data';
import {
  MessageCircle,
  Printer,
  Copy,
  Check,
  Truck,
  ShoppingBag,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LottieAnimation } from '@/components/ui/lottie-animation';

export default function CheckoutPage() {
  const {
    cart,
    cartTotalLKR,
    generateWhatsAppUrl,
    clearCart,
  } = useStore();

  const [customer, setCustomer] = useState<OrderCustomerDetails>({
    fullName: '',
    whatsappNumber: '',
    deliveryAddress: '',
    city: 'Colombo',
    postalCode: '',
    notes: '',
    paymentMethod: 'cod',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const deliveryFee = cartTotalLKR >= 5000 ? 0 : 350;
  const grandTotal = cartTotalLKR + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.fullName || !customer.whatsappNumber || !customer.deliveryAddress) return;
    setIsSubmitted(true);
  };

  const handleCopyOrderText = () => {
    const waUrl = generateWhatsAppUrl(customer);
    const textOnly = decodeURIComponent(waUrl.split('text=')[1] || '');
    navigator.clipboard.writeText(textOnly);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (cart.length === 0 && !isSubmitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
          <LottieAnimation src="/animation/Empty State.json" speed={0.7} width={150} height={150} />
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#382A2C]">
          Your bag is empty! 🌸
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-[#6E5C5E] max-w-sm">
          You haven&apos;t added any cute stationery yet. Create a custom planner or browse our boutique!
        </p>
        <div className="flex gap-3 pt-2">
          <Link href="/studio">
            <Button variant="pink">
              <span>Go to Custom Studio ✨</span>
            </Button>
          </Link>
          <Link href="/catalog">
            <Button variant="outline">
              <span>Browse Boutique</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#FF6B8B]/15 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="p-2 rounded-full hover:bg-[#FFF5F7] text-[#FF6B8B] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Badge variant="pink" className="text-xs font-bold">
              WhatsApp 1-Click Dispatch 🌸
            </Badge>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#382A2C]">
            Complete Your Cute Order 💖
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-[#1D7A66] font-bold bg-[#E6F9F5] px-3.5 py-1.5 rounded-full border border-[#86E3CE]/40 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#1D7A66]" />
            Direct Workshop Dispatch
          </span>
        </div>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Where should we deliver? */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[36px] border-2 border-[#FF6B8B]/20 shadow-[0_12px_36px_rgba(255,107,139,0.12)] space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B8B] block">
                Step 1 of 2
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-[#382A2C] mt-0.5">
                Where should we deliver? 🚚
              </h2>
              <p className="text-xs font-semibold text-[#6E5C5E] mt-1">
                Enter your delivery address and WhatsApp mobile number for islandwide courier.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#382A2C] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  placeholder="e.g. Dilhani Bandara 🌸"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs sm:text-sm text-[#382A2C] font-bold focus:outline-none focus:border-[#FF6B8B] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#382A2C] mb-1">
                  WhatsApp Mobile No *
                </label>
                <input
                  type="tel"
                  required
                  value={customer.whatsappNumber}
                  onChange={(e) => setCustomer({ ...customer, whatsappNumber: e.target.value })}
                  placeholder="e.g. 077 123 4567"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs sm:text-sm text-[#382A2C] font-bold focus:outline-none focus:border-[#FF6B8B] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#382A2C] mb-1">
                  Delivery City / Town *
                </label>
                <input
                  type="text"
                  required
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  placeholder="e.g. Kandy / Colombo / Kurunegala / Galle"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs sm:text-sm text-[#382A2C] font-bold focus:outline-none focus:border-[#FF6B8B] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#382A2C] mb-1">
                  Full Street Address *
                </label>
                <textarea
                  rows={2}
                  required
                  value={customer.deliveryAddress}
                  onChange={(e) => setCustomer({ ...customer, deliveryAddress: e.target.value })}
                  placeholder="e.g. No. 12, Lake View Road"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs sm:text-sm text-[#382A2C] font-bold focus:outline-none focus:border-[#FF6B8B] transition-colors"
                />
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-[#382A2C]">
                  Payment Preference 💳
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setCustomer({ ...customer, paymentMethod: 'cod' })}
                    className={`flex items-start gap-3 p-4 rounded-3xl border-2 transition-all cursor-pointer select-none ${
                      customer.paymentMethod === 'cod'
                        ? 'border-[#FF6B8B] bg-[#FFF5F7] shadow-[0_4px_0_#FFAAA6]'
                        : 'border-[#FF6B8B]/15 bg-white hover:border-[#FF6B8B]/40'
                    }`}
                  >
                    <div>
                      <span className="font-extrabold text-xs text-[#382A2C] block">
                        💵 Cash on Delivery (COD)
                      </span>
                      <span className="text-[11px] font-semibold text-[#6E5C5E] block mt-0.5">
                        Pay cash when rider arrives at your doorstep
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setCustomer({ ...customer, paymentMethod: 'bank_transfer' })}
                    className={`flex items-start gap-3 p-4 rounded-3xl border-2 transition-all cursor-pointer select-none ${
                      customer.paymentMethod === 'bank_transfer'
                        ? 'border-[#FF6B8B] bg-[#FFF5F7] shadow-[0_4px_0_#FFAAA6]'
                        : 'border-[#FF6B8B]/15 bg-white hover:border-[#FF6B8B]/40'
                    }`}
                  >
                    <div>
                      <span className="font-extrabold text-xs text-[#382A2C] block">
                        🏦 Bank Transfer / Slip
                      </span>
                      <span className="text-[11px] font-semibold text-[#6E5C5E] block mt-0.5">
                        Transfer to HNB / BOC & send slip via WhatsApp
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#382A2C] mb-1">
                  Custom Notes / Special Instructions 📸
                </label>
                <input
                  type="text"
                  value={customer.notes || ''}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="e.g. I will send 12 monthly shine photos via WhatsApp"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs text-[#382A2C] font-semibold focus:outline-none focus:border-[#FF6B8B]"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="pink"
                size="lg"
                className="w-full shadow-md"
              >
                <span>Continue to WhatsApp Dispatch 💬</span>
                <Sparkles className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Column 2: Order Summary */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-[36px] border-2 border-[#FF6B8B]/20 shadow-[0_12px_36px_rgba(255,107,139,0.12)] space-y-5">
            <h2 className="font-heading text-xl font-extrabold text-[#382A2C]">
              2. Order Summary 🌸
            </h2>

            <div className="space-y-3 divide-y divide-[#FF6B8B]/15">
              {cart.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 space-y-1">
                  <div className="flex justify-between items-start text-xs font-bold text-[#382A2C]">
                    <span className="pr-2 leading-snug">
                      {item.quantity}x {item.title}
                    </span>
                    <span className="font-mono font-extrabold text-[#FF6B8B] shrink-0">
                      LKR {(item.priceLKR * item.quantity).toLocaleString()}/=
                    </span>
                  </div>

                  {item.isCustomPlanner && item.customConfig && (
                    <div className="text-[11px] font-semibold text-[#6E5C5E] pl-2 space-y-0.5">
                      <div>
                        • Finish: {item.customConfig.coverType === 'hardcover_corners' ? 'Hardcover + Gold Corners' : 'Softcover Laminated'}
                      </div>
                      {item.customConfig.selectedThemeId && (
                        <div>
                          • Theme: {COVER_THEMES.find((t) => t.id === item.customConfig?.selectedThemeId)?.name || 'Theme'}
                        </div>
                      )}
                      <div>
                        • Name: &quot;{item.customConfig.customName}&quot;
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="p-4 rounded-3xl bg-[#FFF5F7] border border-[#FF6B8B]/20 space-y-2 text-xs font-semibold">
              <div className="flex justify-between text-[#6E5C5E]">
                <span>Subtotal:</span>
                <span className="font-mono font-bold text-[#382A2C]">
                  LKR {cartTotalLKR.toLocaleString()}/=
                </span>
              </div>
              <div className="flex justify-between text-[#6E5C5E]">
                <span>Islandwide Delivery:</span>
                <span className="font-mono text-[#1D7A66] font-bold">
                  {deliveryFee === 0 ? 'FREE 🌸' : `LKR ${deliveryFee}/=`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#FF6B8B]/20 flex justify-between text-sm font-extrabold text-[#382A2C]">
                <span>Total Amount:</span>
                <span className="font-mono text-base text-[#FF6B8B]">
                  LKR {grandTotal.toLocaleString()}/=
                </span>
              </div>
            </div>

            {/* Delivery Reassurance Note */}
            <div className="p-3.5 rounded-2xl bg-[#E6F9F5] border border-[#86E3CE]/40 flex items-center gap-2.5 text-xs text-[#1D7A66] font-bold">
              <Truck className="w-4 h-4 text-[#1D7A66] shrink-0" />
              <span>Islandwide doorstep courier within 2–4 business days.</span>
            </div>
          </div>

        </form>
      ) : (
        /* Dispatch State with 1-Click WhatsApp & Receipt Print */
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-9 rounded-[36px] border-2 border-[#FF6B8B]/25 shadow-[0_20px_60px_rgba(255,107,139,0.25)] space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto flex items-center justify-center">
              <LottieAnimation src="/animation/Bird pair love and flying sky.json" speed={0.65} width={100} height={100} />
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#382A2C]">
              Order Slip Formatted & Ready! 🌸
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#6E5C5E]">
              Send straight to our workshop on WhatsApp for instant confirmation.
            </p>
          </div>

          {/* Direct 1-Click WhatsApp Dispatch */}
          <div className="p-4 rounded-3xl bg-[#25D366]/10 border-2 border-[#25D366]/30 space-y-2 text-center">
            <a
              href={generateWhatsAppUrl(customer)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-sm sm:text-base shadow-[0_4px_0_#189C4A] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>💬 Send Order via WhatsApp (1-Click)</span>
            </a>
            <p className="text-[11px] text-[#1D7A66] font-bold">
              Generates formatted order slip sent straight to Little Lines studio
            </p>
          </div>

          {/* Formatted Order Text Preview Box */}
          <div className="p-5 rounded-3xl bg-[#FFF5F7] border-2 border-[#FF6B8B]/20 space-y-3 text-xs font-mono">
            <div className="font-bold text-[#382A2C]">🌸 Little Lines Order Request</div>
            <div className="text-[#FF6B8B]/40">-----------------------------------</div>
            <div className="font-semibold text-[#382A2C]">Customer: {customer.fullName} ({customer.whatsappNumber})</div>
            <div className="font-semibold text-[#382A2C]">Address: {customer.deliveryAddress}, {customer.city}</div>
            <div className="font-semibold text-[#382A2C]">Payment: {customer.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</div>
            
            <div className="pt-2 text-[#382A2C] font-semibold">
              <strong>Items:</strong>
              {cart.map((item, index) => (
                <div key={index} className="pt-1">
                  <div>{index + 1}. {item.title}{item.quantity > 1 ? ` (x${item.quantity})` : ''} - LKR {(item.priceLKR * item.quantity).toLocaleString()}/=</div>
                </div>
              ))}
            </div>

            <div className="text-[#FF6B8B]/40 pt-2">-----------------------------------</div>
            <div className="font-extrabold text-sm text-[#FF6B8B]">
              Total Amount: LKR {grandTotal.toLocaleString()}/= ({deliveryFee === 0 ? 'Free Delivery' : 'Includes LKR 350 delivery'})
            </div>
          </div>

          {/* Action Tools: Print & Copy */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handlePrint}
              className="flex-1"
            >
              <Printer className="w-4 h-4" />
              <span>Print Order Receipt 🖨️</span>
            </Button>

            <Button
              variant="outline"
              onClick={handleCopyOrderText}
              className="flex-1"
            >
              {copiedText ? <Check className="w-4 h-4 text-[#1D7A66]" /> : <Copy className="w-4 h-4" />}
              <span>{copiedText ? 'Copied to Clipboard! ✨' : 'Copy Order Text'}</span>
            </Button>
          </div>

          {/* Place another order button */}
          <div className="text-center pt-2">
            <button
              onClick={() => {
                clearCart();
                setIsSubmitted(false);
              }}
              className="text-xs font-bold text-[#FF6B8B] hover:underline cursor-pointer"
            >
              Clear & Place Another Custom Order 🌸
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
