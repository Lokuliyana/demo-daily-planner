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
  CheckCircle2,
  Truck,
  ShoppingBag,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

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
    city: '',
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
        <div className="w-16 h-16 rounded-full bg-white border border-[#24211E]/10 flex items-center justify-center text-[#8E847A] shadow-sm">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#24211E]">
          Your bag is currently empty
        </h2>
        <p className="text-xs sm:text-sm text-[#635B53] max-w-sm">
          You have no items in your order request bag yet. Build a custom planner or pick stationery items from our catalog!
        </p>
        <div className="flex gap-3 pt-2">
          <Link
            href="/studio"
            className="px-6 py-3 rounded-full bg-[#C26D4A] hover:bg-[#A95837] text-white text-xs font-semibold shadow-sm"
          >
            Go to Custom Studio ✨
          </Link>
          <Link
            href="/catalog"
            className="px-6 py-3 rounded-full bg-white border border-[#24211E]/10 text-[#24211E] text-xs font-semibold hover:bg-[#FAF6F0]"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#24211E]/8 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="p-2 rounded-full hover:bg-black/5 text-[#635B53] active:scale-90 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="washi-terracotta px-3 py-0.5 rounded-sm text-xs font-bold -rotate-2 shadow-sm">
              Dual-Checkout & WhatsApp Dispatch
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24211E]">
            <span className="highlighter-underline">Seamless Order Checkout</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#635B53]">
          <span className="flex items-center gap-1.5 text-[#304836] font-bold bg-[#6E8574]/15 px-3 py-1.5 rounded-full border border-[#6E8574]/30">
            <ShieldCheck className="w-4 h-4 text-[#6E8574]" />
            Direct Workshop Confirmation
          </span>
        </div>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Where should we deliver? */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#24211E]/8 shadow-paper space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C26D4A] block">
                Step 1 of 2
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#24211E] mt-0.5">
                Where should we deliver?
              </h2>
              <p className="text-xs text-[#635B53] mt-1">
                Enter your delivery address and contact details for dispatch across Sri Lanka.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#24211E] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  placeholder="e.g. Kasun Bandara"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF6F0] border border-[#24211E]/12 text-xs sm:text-sm text-[#24211E] focus:outline-none focus:border-[#C26D4A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#24211E] mb-1">
                  WhatsApp Mobile No *
                </label>
                <input
                  type="tel"
                  required
                  value={customer.whatsappNumber}
                  onChange={(e) => setCustomer({ ...customer, whatsappNumber: e.target.value })}
                  placeholder="e.g. 077 123 4567"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF6F0] border border-[#24211E]/12 text-xs sm:text-sm text-[#24211E] focus:outline-none focus:border-[#C26D4A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#24211E] mb-1">
                  Delivery City / Town *
                </label>
                <input
                  type="text"
                  required
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  placeholder="e.g. Kandy / Colombo / Kurunegala / Galle"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF6F0] border border-[#24211E]/12 text-xs sm:text-sm text-[#24211E] focus:outline-none focus:border-[#C26D4A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#24211E] mb-1">
                  Full Street Address *
                </label>
                <textarea
                  rows={2}
                  required
                  value={customer.deliveryAddress}
                  onChange={(e) => setCustomer({ ...customer, deliveryAddress: e.target.value })}
                  placeholder="e.g. No. 12, Peradeniya Rd, Kandy"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF6F0] border border-[#24211E]/12 text-xs sm:text-sm text-[#24211E] focus:outline-none focus:border-[#C26D4A] transition-colors"
                />
              </div>

              {/* Payment Method Selector with Tactile Tiles */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-[#24211E]">
                  Payment Method
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setCustomer({ ...customer, paymentMethod: 'cod' })}
                    className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer select-none active:scale-95 ${
                      customer.paymentMethod === 'cod'
                        ? 'border-[#C26D4A] bg-[#C26D4A]/5 shadow-[0_4px_12px_rgba(194,109,74,0.15)] -translate-y-0.5'
                        : 'border-[#24211E]/10 bg-white hover:border-[#24211E]/20 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="mt-0.5">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        customer.paymentMethod === 'cod' ? 'border-[#C26D4A] bg-[#C26D4A]' : 'border-zinc-300'
                      }`}>
                        {customer.paymentMethod === 'cod' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                    </div>
                    <div>
                      <span className="font-bold text-xs text-[#24211E] block">
                        💵 Cash on Delivery (COD)
                      </span>
                      <span className="text-[11px] text-[#635B53] block mt-0.5">
                        Pay cash when rider arrives at your doorstep
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setCustomer({ ...customer, paymentMethod: 'bank_transfer' })}
                    className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer select-none active:scale-95 ${
                      customer.paymentMethod === 'bank_transfer'
                        ? 'border-[#C26D4A] bg-[#C26D4A]/5 shadow-[0_4px_12px_rgba(194,109,74,0.15)] -translate-y-0.5'
                        : 'border-[#24211E]/10 bg-white hover:border-[#24211E]/20 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="mt-0.5">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        customer.paymentMethod === 'bank_transfer' ? 'border-[#C26D4A] bg-[#C26D4A]' : 'border-zinc-300'
                      }`}>
                        {customer.paymentMethod === 'bank_transfer' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                    </div>
                    <div>
                      <span className="font-bold text-xs text-[#24211E] block">
                        🏦 Bank Transfer / Slip
                      </span>
                      <span className="text-[11px] text-[#635B53] block mt-0.5">
                        Transfer to HNB / BOC & send receipt via WhatsApp
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#24211E] mb-1">
                  Custom Notes / Special Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={customer.notes || ''}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="e.g. I will send 12 monthly photos via WhatsApp chat"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FAF6F0] border border-[#24211E]/12 text-xs text-[#24211E] focus:outline-none focus:border-[#C26D4A]"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#C26D4A] hover:bg-[#A95837] text-white font-bold text-sm shadow-[0_4px_14px_rgba(194,109,74,0.35)] hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to WhatsApp Dispatch</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2: Your Order Summary */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#24211E]/8 shadow-paper space-y-5">
            <h2 className="font-serif text-2xl font-bold text-[#24211E]">
              2. Your Order Summary
            </h2>

            <div className="space-y-3 divide-y divide-[#24211E]/8">
              {cart.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 space-y-1">
                  <div className="flex justify-between items-start text-xs font-bold text-[#24211E]">
                    <span className="pr-2 leading-snug">
                      {item.quantity}x {item.title}
                    </span>
                    <span className="font-mono text-[#C26D4A] shrink-0">
                      Rs. {(item.priceLKR * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  {item.isCustomPlanner && item.customConfig && (
                    <div className="text-[11px] text-[#635B53] pl-2 space-y-0.5">
                      <div>
                        • Finish: {item.customConfig.coverType === 'hardcover_corners' ? 'Hardcover + Gold Corners' : 'Softcover Laminated'}
                      </div>
                      {item.customConfig.selectedThemeId && (
                        <div>
                          • Theme: {COVER_THEMES.find((t) => t.id === item.customConfig?.selectedThemeId)?.name.split('/')[0] || 'Aspiration'}
                        </div>
                      )}
                      <div>
                        • Name: "{item.customConfig.customName}"
                      </div>
                      {item.customConfig.addOnStickyTabs && <div>• Add-on: PET Tabs (+Rs. 200)</div>}
                      {item.customConfig.addOnStickers && <div>• Add-on: Stickers (+Rs. 250)</div>}
                      {item.customConfig.addOnRibbon && <div>• Add-on: Bookmark Ribbon (+Rs. 150)</div>}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#24211E]/8 space-y-2 text-xs">
              <div className="flex justify-between text-[#635B53]">
                <span>Subtotal:</span>
                <span className="font-mono font-bold text-[#24211E]">
                  Rs. {cartTotalLKR.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[#635B53]">
                <span>Islandwide Delivery:</span>
                <span className="font-mono text-[#3F5545] font-semibold">
                  {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#24211E]/10 flex justify-between text-sm font-bold text-[#24211E]">
                <span>Total Amount:</span>
                <span className="font-mono text-base text-[#C26D4A]">
                  LKR {grandTotal.toLocaleString()}/=
                </span>
              </div>
            </div>

            {/* Delivery Reassurance Note */}
            <div className="p-3 rounded-2xl bg-[#6E8574]/10 border border-[#6E8574]/20 flex items-center gap-2.5 text-xs text-[#3F5545]">
              <Truck className="w-4 h-4 text-[#6E8574] shrink-0" />
              <span>Islandwide doorstep courier within 2–4 business days.</span>
            </div>
          </div>

        </form>
      ) : (
        /* Dispatch State with 1-Click WhatsApp & Receipt Print */
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-9 rounded-3xl border border-[#24211E]/10 shadow-2xl space-y-6 animate-fade-in print:shadow-none print:border-none">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#6E8574]/20 text-[#3F5545] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#24211E]">
              Order Slip Formatted & Ready!
            </h2>
            <p className="text-xs sm:text-sm text-[#635B53]">
              Send straight to our workshop on WhatsApp for instant confirmation.
            </p>
          </div>

          {/* Direct 1-Click WhatsApp Dispatch */}
          <div className="p-4 rounded-3xl bg-[#6E8574]/15 border border-[#6E8574]/30 space-y-2 text-center">
            <a
              href={generateWhatsAppUrl(customer)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-full bg-[#3F5545] hover:bg-[#2F4034] text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>💬 Send Order via WhatsApp (1-Click)</span>
            </a>
            <p className="text-[11px] text-[#3F5545] font-medium">
              Generates formatted order slip sent straight to our workshop
            </p>
          </div>

          {/* Formatted Order Text Preview Box */}
          <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#24211E]/12 space-y-3 text-xs font-mono">
            <div className="font-bold text-[#24211E]">✨ Little Lines Order Request</div>
            <div className="text-[#8E847A]">-----------------------------------</div>
            <div>Customer: {customer.fullName} ({customer.whatsappNumber})</div>
            <div>Address: {customer.deliveryAddress}, {customer.city}</div>
            <div>Payment: {customer.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</div>
            
            <div className="pt-2 text-[#24211E]">
              <strong>Items:</strong>
              {cart.map((item, index) => (
                <div key={index} className="pt-1">
                  <div>{index + 1}. {item.title}{item.quantity > 1 ? ` (x${item.quantity})` : ''} - Rs. {(item.priceLKR * item.quantity).toLocaleString()}</div>
                  {item.isCustomPlanner && item.customConfig && (
                    <div className="pl-3 text-[11px] text-[#635B53]">
                      <div>• Finish: {item.customConfig.coverType === 'hardcover_corners' ? 'Hardcover + Gold Corners' : 'Softcover Laminated'}</div>
                      <div>• Theme: {item.customConfig.customPhotoUrl ? 'Custom Photo' : (COVER_THEMES.find((t) => t.id === item.customConfig?.selectedThemeId)?.name.split('/')[0].trim() || 'Future Doctor')}</div>
                      <div>• Name: "{item.customConfig.customName}"</div>
                      {item.customConfig.addOnStickyTabs && <div>• Add-on: PET Tabs (+Rs. 200)</div>}
                      {item.customConfig.addOnStickers && <div>• Add-on: Stickers (+Rs. 250)</div>}
                      {item.customConfig.addOnRibbon && <div>• Add-on: Bookmark Ribbon (+Rs. 150)</div>}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-[#8E847A] pt-2">-----------------------------------</div>
            <div className="font-bold text-sm text-[#C26D4A]">
              Total Amount: LKR {grandTotal.toLocaleString()}/= ({deliveryFee === 0 ? 'Free Delivery' : 'Includes Rs. 350 delivery'})
            </div>
            <div className="text-[11px] text-[#6E8574]">Ready for dispatch confirmation!</div>
          </div>

          {/* Action Tools: Print & Copy */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 rounded-full bg-white border border-[#24211E]/15 hover:bg-[#FAF6F0] text-xs font-semibold text-[#24211E] flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>🖨️ Print Order Receipt</span>
            </button>

            <button
              onClick={handleCopyOrderText}
              className="flex-1 py-3 rounded-full bg-white border border-[#24211E]/15 hover:bg-[#FAF6F0] text-xs font-semibold text-[#24211E] flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 transition-all"
            >
              {copiedText ? <Check className="w-4 h-4 text-[#3F5545]" /> : <Copy className="w-4 h-4" />}
              <span>{copiedText ? 'Copied to Clipboard!' : '📋 Copy Order Text to Clipboard'}</span>
            </button>
          </div>

          {/* Place another order button */}
          <div className="text-center pt-2">
            <button
              onClick={() => {
                clearCart();
                setIsSubmitted(false);
              }}
              className="text-xs text-[#8E847A] hover:text-[#C26D4A] underline cursor-pointer"
            >
              Clear & Place Another Custom Order
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
