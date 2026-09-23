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
  ShieldCheck,
  Package,
  Truck,
  CreditCard,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#221E1B]/10 overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsOrderModalOpen(false);
            if (isSubmitted) clearCart();
          }}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-[#221E1B]"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          /* Step 1: Customer Details & Order Confirmation Form */
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#94442A] block">
                Final Step • Quick Order Request
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#221E1B]">
                Complete Your Order Request
              </h3>
              <p className="text-xs sm:text-sm text-[#615850] mt-1">
                Enter your delivery information. You can send this order directly to us via WhatsApp for immediate confirmation and custom photo submission!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#221E1B] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    placeholder="e.g. Dilhani Bandara"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#221E1B]/15 text-xs text-[#221E1B] focus:outline-none focus:border-[#94442A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#221E1B] mb-1">
                    WhatsApp Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.whatsappNumber}
                    onChange={(e) => setCustomer({ ...customer, whatsappNumber: e.target.value })}
                    placeholder="e.g. 077 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#221E1B]/15 text-xs text-[#221E1B] focus:outline-none focus:border-[#94442A]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#221E1B] mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.deliveryAddress}
                    onChange={(e) => setCustomer({ ...customer, deliveryAddress: e.target.value })}
                    placeholder="House No, Street name, Area"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#221E1B]/15 text-xs text-[#221E1B] focus:outline-none focus:border-[#94442A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#221E1B] mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    placeholder="e.g. Kandy, Colombo, Galle"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#221E1B]/15 text-xs text-[#221E1B] focus:outline-none focus:border-[#94442A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#221E1B] mb-1">
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#221E1B]/15 text-xs text-[#221E1B] focus:outline-none focus:border-[#94442A]"
                  >
                    <option value="cod">Cash on Delivery (Islandwide)</option>
                    <option value="bank_transfer">Bank Transfer / Online Banking</option>
                    <option value="card">Card / Koko Installments (On Request)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#221E1B] mb-1">
                    Custom Photo / Additional Instruction Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={customer.notes || ''}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    placeholder="e.g. I will send 12 high-res monthly shine photos via WhatsApp chat"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#221E1B]/15 text-xs text-[#221E1B] focus:outline-none focus:border-[#94442A]"
                  />
                </div>
              </div>

              {/* Order Quick Total Preview */}
              <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#221E1B]/10 space-y-1.5 text-xs">
                <div className="flex justify-between text-[#615850]">
                  <span>Items ({cart.length}):</span>
                  <span className="font-mono">LKR {cartTotalLKR.toLocaleString()}/=</span>
                </div>
                <div className="flex justify-between text-[#615850]">
                  <span>Courier Delivery:</span>
                  <span className="font-mono">
                    {deliveryFee === 0 ? 'FREE' : `LKR ${deliveryFee}/=`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#221E1B]/10 flex justify-between font-bold text-sm text-[#221E1B]">
                  <span>Grand Total:</span>
                  <span className="font-mono text-[#94442A]">
                    LKR {grandTotal.toLocaleString()}/=
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#94442A] text-white font-bold text-sm sm:text-base hover:bg-[#78351F] shadow-lg shadow-[#94442A]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Generate Order Request & WhatsApp Dispatch</span>
              </button>
            </form>
          </div>
        ) : (
          /* Step 2: Formatted Receipt & Instant WhatsApp Dispatch */
          <div className="p-6 sm:p-8 space-y-6 animate-fade-in print:p-0">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#506850]/15 text-[#506850] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#221E1B]">
                Order Request Ready!
              </h3>
              <p className="text-xs sm:text-sm text-[#615850] max-w-md mx-auto">
                Click below to send your structured order slip directly to Little Lines on WhatsApp. We will start handcrafting your stationery right away!
              </p>
            </div>

            {/* Direct WhatsApp Button */}
            <a
              href={generateWhatsAppUrl(customer)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-2xl bg-[#506850] text-white font-bold text-sm sm:text-base hover:bg-[#385939] shadow-lg shadow-[#506850]/20 transition-all flex items-center justify-center gap-2 text-center"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Send Order via WhatsApp (1-Click)</span>
            </a>

            {/* Structured Receipt Printable Card */}
            <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#221E1B]/15 space-y-4 text-xs font-mono">
              <div className="border-b border-[#221E1B]/10 pb-3 text-center">
                <span className="font-serif font-bold text-lg text-[#221E1B] block">
                  LITTLE LINES
                </span>
                <span className="text-[10px] text-[#615850]">
                  Handcrafted Planners & Stationery • Sri Lanka
                </span>
              </div>

              <div className="space-y-1 text-[#221E1B]">
                <div>Customer: <strong>{customer.fullName}</strong></div>
                <div>Phone: <strong>{customer.whatsappNumber}</strong></div>
                <div>Address: <strong>{customer.deliveryAddress}, {customer.city}</strong></div>
                <div>Payment: <strong>{customer.paymentMethod.toUpperCase()}</strong></div>
              </div>

              <div className="border-t border-b border-[#221E1B]/10 py-3 space-y-2">
                <div className="font-bold text-[#221E1B]">ORDER ITEMS:</div>
                {cart.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between font-semibold text-[#221E1B]">
                      <span>{item.title} (x{item.quantity})</span>
                      <span>LKR {(item.priceLKR * item.quantity).toLocaleString()}/=</span>
                    </div>
                    {item.isCustomPlanner && item.customConfig && (
                      <div className="text-[10px] text-[#615850] pl-2 space-y-0.5">
                        <div>• Cover: {item.customConfig.coverType === 'hardcover_corners' ? 'Hardcover + Gold Corners' : 'Softcover Full Laminated'}</div>
                        <div>• Custom Name: "{item.customConfig.customName}"</div>
                        <div>• Cover Title: "{item.customConfig.coverTitle}"</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-[#221E1B]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>LKR {cartTotalLKR.toLocaleString()}/=</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `LKR ${deliveryFee}/=`}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#94442A] pt-2 border-t border-[#221E1B]/10">
                  <span>Grand Total:</span>
                  <span>LKR {grandTotal.toLocaleString()}/=</span>
                </div>
              </div>
            </div>

            {/* Actions: Copy Text & Print */}
            <div className="flex gap-3">
              <button
                onClick={handleCopyOrderText}
                className="flex-1 py-2.5 rounded-xl border border-[#221E1B]/15 hover:bg-black/5 text-xs font-semibold text-[#221E1B] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedText ? <Check className="w-4 h-4 text-[#506850]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedText ? 'Copied to Clipboard!' : 'Copy Order Text'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 rounded-xl border border-[#221E1B]/15 hover:bg-black/5 text-xs font-semibold text-[#221E1B] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Order Slip</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
