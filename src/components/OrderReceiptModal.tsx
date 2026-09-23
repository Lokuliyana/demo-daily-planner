'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { OrderCustomerDetails } from '@/lib/types';
import {
  X,
  MessageCircle,
  CheckCircle2,
  Printer,
  Copy,
  Check,
} from 'lucide-react';

export function OrderReceiptModal() {
  const {
    isOrderModalOpen,
    setIsOrderModalOpen,
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

  if (!isOrderModalOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#201D1A]/10 overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsOrderModalOpen(false);
            if (isSubmitted) clearCart();
          }}
          className="absolute top-3.5 right-3.5 z-10 p-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-[#201D1A]"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          /* Step 1: Customer Details Form */
          <div className="p-4 sm:p-7 space-y-4 sm:space-y-5">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#94442A] block">
                Final Step • Quick Order Request
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#201D1A]">
                Complete Your Order Request
              </h3>
              <p className="text-xs text-[#5E564F] mt-0.5">
                Enter your delivery details to generate your structured order slip for WhatsApp confirmation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#201D1A] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    placeholder="e.g. Dilhani Bandara"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F3] border border-[#201D1A]/15 text-xs text-[#201D1A] focus:outline-none focus:border-[#94442A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#201D1A] mb-1">
                    WhatsApp Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.whatsappNumber}
                    onChange={(e) => setCustomer({ ...customer, whatsappNumber: e.target.value })}
                    placeholder="e.g. 077 123 4567"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F3] border border-[#201D1A]/15 text-xs text-[#201D1A] focus:outline-none focus:border-[#94442A]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#201D1A] mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.deliveryAddress}
                    onChange={(e) => setCustomer({ ...customer, deliveryAddress: e.target.value })}
                    placeholder="House No, Street name, Area"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F3] border border-[#201D1A]/15 text-xs text-[#201D1A] focus:outline-none focus:border-[#94442A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#201D1A] mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    placeholder="e.g. Kandy, Colombo, Galle"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F3] border border-[#201D1A]/15 text-xs text-[#201D1A] focus:outline-none focus:border-[#94442A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#201D1A] mb-1">
                    Payment Preference
                  </label>
                  <select
                    value={customer.paymentMethod}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        paymentMethod: e.target.value as 'cod' | 'bank_transfer' | 'card',
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F3] border border-[#201D1A]/15 text-xs text-[#201D1A] focus:outline-none focus:border-[#94442A]"
                  >
                    <option value="cod">Cash on Delivery (Islandwide)</option>
                    <option value="bank_transfer">Bank Transfer / Online Banking</option>
                    <option value="card">Card / Koko Installments (On Request)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#201D1A] mb-1">
                    Custom Photo / Additional Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={customer.notes || ''}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    placeholder="e.g. I will send 12 high-res monthly shine photos via WhatsApp chat"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF8F3] border border-[#201D1A]/15 text-xs text-[#201D1A] focus:outline-none focus:border-[#94442A]"
                  />
                </div>
              </div>

              {/* Order Quick Total Preview */}
              <div className="p-3 rounded-xl bg-[#FAF8F3] border border-[#201D1A]/10 space-y-1 text-xs">
                <div className="flex justify-between text-[#5E564F]">
                  <span>Items ({cart.length}):</span>
                  <span className="font-mono">LKR {cartTotalLKR.toLocaleString()}/=</span>
                </div>
                <div className="flex justify-between text-[#5E564F]">
                  <span>Courier Delivery:</span>
                  <span className="font-mono">
                    {deliveryFee === 0 ? 'FREE' : `LKR ${deliveryFee}/=`}
                  </span>
                </div>
                <div className="pt-1.5 border-t border-[#201D1A]/10 flex justify-between font-bold text-xs sm:text-sm text-[#201D1A]">
                  <span>Grand Total:</span>
                  <span className="font-mono text-[#94442A]">
                    LKR {grandTotal.toLocaleString()}/=
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 sm:py-3.5 rounded-xl bg-[#94442A] text-white font-bold text-xs sm:text-sm hover:bg-[#78351F] shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Generate Order Request & WhatsApp Dispatch</span>
              </button>
            </form>
          </div>
        ) : (
          /* Step 2: Formatted Receipt & Instant WhatsApp Dispatch */
          <div className="p-4 sm:p-7 space-y-4 animate-fade-in print:p-0">
            <div className="text-center space-y-1.5">
              <div className="w-10 h-10 rounded-full bg-[#506850]/15 text-[#506850] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#201D1A]">
                Order Request Ready
              </h3>
              <p className="text-xs text-[#5E564F] max-w-md mx-auto">
                Click below to send your structured order slip directly to Little Lines on WhatsApp.
              </p>
            </div>

            {/* Direct WhatsApp Button */}
            <a
              href={generateWhatsAppUrl(customer)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 sm:py-3.5 rounded-xl bg-[#506850] text-white font-bold text-xs sm:text-sm hover:bg-[#385939] shadow-xs transition-all flex items-center justify-center gap-2 text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Order via WhatsApp (1-Click)</span>
            </a>

            {/* Structured Receipt Printable Card */}
            <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#201D1A]/15 space-y-3 text-xs font-mono">
              <div className="border-b border-[#201D1A]/10 pb-2 text-center">
                <span className="font-serif font-bold text-base text-[#201D1A] block">
                  LITTLE LINES
                </span>
                <span className="text-[10px] text-[#5E564F]">
                  Handcrafted Planners & Stationery • Sri Lanka
                </span>
              </div>

              <div className="space-y-0.5 text-[#201D1A] text-[11px]">
                <div>Customer: <strong>{customer.fullName}</strong></div>
                <div>Phone: <strong>{customer.whatsappNumber}</strong></div>
                <div>Address: <strong>{customer.deliveryAddress}, {customer.city}</strong></div>
                <div>Payment: <strong>{customer.paymentMethod.toUpperCase()}</strong></div>
              </div>

              <div className="border-t border-b border-[#201D1A]/10 py-2 space-y-1.5">
                <div className="font-bold text-[#201D1A] text-[11px]">ORDER ITEMS:</div>
                {cart.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between font-semibold text-[#201D1A]">
                      <span>{item.title} (x{item.quantity})</span>
                      <span>LKR {(item.priceLKR * item.quantity).toLocaleString()}/=</span>
                    </div>
                    {item.isCustomPlanner && item.customConfig && (
                      <div className="text-[10px] text-[#5E564F] pl-2 space-y-0.5">
                        <div>• Cover: {item.customConfig.coverType === 'hardcover_corners' ? 'Hardcover + Gold Corners' : 'Softcover Full Laminated'}</div>
                        <div>• Custom Name: "{item.customConfig.customName}"</div>
                        <div>• Cover Title: "{item.customConfig.coverTitle}"</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-0.5 text-[#201D1A]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>LKR {cartTotalLKR.toLocaleString()}/=</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `LKR ${deliveryFee}/=`}</span>
                </div>
                <div className="flex justify-between font-bold text-xs sm:text-sm text-[#94442A] pt-1.5 border-t border-[#201D1A]/10">
                  <span>Grand Total:</span>
                  <span>LKR {grandTotal.toLocaleString()}/=</span>
                </div>
              </div>
            </div>

            {/* Actions: Copy Text & Print */}
            <div className="flex gap-2">
              <button
                onClick={handleCopyOrderText}
                className="flex-1 py-2 rounded-xl border border-[#201D1A]/15 hover:bg-black/5 text-xs font-semibold text-[#201D1A] flex items-center justify-center gap-1 cursor-pointer"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-[#506850]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText ? 'Copied' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex-1 py-2 rounded-xl border border-[#201D1A]/15 hover:bg-black/5 text-xs font-semibold text-[#201D1A] flex items-center justify-center gap-1 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Slip</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
