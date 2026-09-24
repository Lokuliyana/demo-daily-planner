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
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LottieAnimation } from '@/components/ui/lottie-animation';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-white rounded-[36px] shadow-[0_20px_60px_rgba(255,107,139,0.25)] border-2 border-[#FF6B8B]/25 overflow-hidden my-6"
      >
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsOrderModalOpen(false);
            if (isSubmitted) clearCart();
          }}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#FFF5F7] hover:bg-[#FFE5EC] text-[#FF6B8B] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          /* Step 1: Customer Details Form */
          <div className="p-5 sm:p-7 space-y-4 sm:space-y-5">
            <div>
              <Badge variant="pink" className="text-[10px] uppercase font-bold tracking-wider mb-1.5">
                <span>Final Step • Quick Order Request 🌸</span>
              </Badge>
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#382A2C]">
                Complete Your Cute Order 💖
              </h3>
              <p className="text-xs font-semibold text-[#6E5C5E] mt-0.5">
                Enter your delivery details to generate your structured order slip for WhatsApp confirmation!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#382A2C] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    placeholder="e.g. Dilhani Bandara 🌸"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs text-[#382A2C] font-bold focus:outline-none focus:border-[#FF6B8B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#382A2C] mb-1">
                    WhatsApp Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.whatsappNumber}
                    onChange={(e) => setCustomer({ ...customer, whatsappNumber: e.target.value })}
                    placeholder="e.g. 077 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs text-[#382A2C] font-bold focus:outline-none focus:border-[#FF6B8B]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#382A2C] mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.deliveryAddress}
                    onChange={(e) => setCustomer({ ...customer, deliveryAddress: e.target.value })}
                    placeholder="House No, Street name, Area"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs text-[#382A2C] font-bold focus:outline-none focus:border-[#FF6B8B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#382A2C] mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    placeholder="e.g. Kandy, Colombo, Galle"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs text-[#382A2C] font-bold focus:outline-none focus:border-[#FF6B8B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#382A2C] mb-1">
                    Payment Preference 💳
                  </label>
                  <select
                    value={customer.paymentMethod}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        paymentMethod: e.target.value as 'cod' | 'bank_transfer' | 'card',
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs text-[#382A2C] font-bold focus:outline-none focus:border-[#FF6B8B]"
                  >
                    <option value="cod">Cash on Delivery (Islandwide) 🚚</option>
                    <option value="bank_transfer">Bank Transfer / Online Banking 🏦</option>
                    <option value="card">Card / Koko Installments ✨</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#382A2C] mb-1">
                    Custom Photo / Additional Notes 📸
                  </label>
                  <textarea
                    rows={2}
                    value={customer.notes || ''}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    placeholder="e.g. I will send 12 high-res monthly shine photos via WhatsApp chat ✨"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#FF6B8B]/20 text-xs text-[#382A2C] font-bold focus:outline-none focus:border-[#FF6B8B]"
                  />
                </div>
              </div>

              {/* Order Quick Total Preview */}
              <div className="p-3.5 rounded-2xl bg-[#FFF5F7] border-2 border-[#FF6B8B]/15 space-y-1 text-xs font-semibold">
                <div className="flex justify-between text-[#6E5C5E]">
                  <span>Items ({cart.length}):</span>
                  <span className="font-mono font-bold text-[#382A2C]">LKR {cartTotalLKR.toLocaleString()}/=</span>
                </div>
                <div className="flex justify-between text-[#6E5C5E]">
                  <span>Delivery:</span>
                  <span className="font-mono text-[#1D7A66] font-bold">
                    {deliveryFee === 0 ? 'FREE 🌸' : `LKR ${deliveryFee}/=`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#FF6B8B]/15 flex justify-between font-extrabold text-xs sm:text-sm text-[#382A2C]">
                  <span>Grand Total:</span>
                  <span className="font-mono text-[#FF6B8B]">
                    LKR {grandTotal.toLocaleString()}/=
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                variant="pink"
                size="lg"
                className="w-full"
              >
                <span>Send via WhatsApp 💬💖</span>
              </Button>
            </form>
          </div>
        ) : (
          /* Step 2: Formatted Receipt & Instant WhatsApp Dispatch */
          <div className="p-5 sm:p-7 space-y-4 print:p-0">
            <div className="text-center space-y-1.5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto flex items-center justify-center">
                <LottieAnimation src="/animation/Bird pair love and flying sky.json" speed={0.65} width={100} height={100} />
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#382A2C]">
                Order Slip Ready! 🌸
              </h3>
              <p className="text-xs font-semibold text-[#6E5C5E] max-w-md mx-auto">
                Click below to send your structured order slip directly to Little Lines on WhatsApp!
              </p>
            </div>

            {/* Direct WhatsApp Button */}
            <a
              href={generateWhatsAppUrl(customer)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-sm shadow-[0_4px_0_#189C4A] transition-all flex items-center justify-center gap-2 text-center"
            >
              <MessageCircle className="w-5 h-5" />
              <span>💬 Send Order via WhatsApp (1-Click)</span>
            </a>

            {/* Structured Receipt Printable Card */}
            <div className="p-4 rounded-3xl bg-[#FFF5F7] border-2 border-[#FF6B8B]/20 space-y-3 text-xs font-mono">
              <div className="border-b border-[#FF6B8B]/20 pb-2 text-center">
                <span className="font-heading font-extrabold text-base text-[#382A2C] block">
                  🌸 LITTLE LINES STUDIO 🌸
                </span>
                <span className="text-[10px] font-bold text-[#FF6B8B]">
                  Handcrafted Planners & Stationery • Sri Lanka ✨
                </span>
              </div>

              <div className="space-y-0.5 text-[#382A2C] text-[11px] font-semibold">
                <div>Customer: <strong>{customer.fullName}</strong></div>
                <div>Phone: <strong>{customer.whatsappNumber}</strong></div>
                <div>Address: <strong>{customer.deliveryAddress}, {customer.city}</strong></div>
                <div>Payment: <strong>{customer.paymentMethod.toUpperCase()}</strong></div>
              </div>

              <div className="border-t border-b border-[#FF6B8B]/20 py-2 space-y-1.5">
                <div className="font-bold text-[#382A2C] text-[11px]">ORDER ITEMS:</div>
                {cart.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between font-bold text-[#382A2C]">
                      <span>{item.title} (x{item.quantity})</span>
                      <span>LKR {(item.priceLKR * item.quantity).toLocaleString()}/=</span>
                    </div>
                    {item.isCustomPlanner && item.customConfig && (
                      <div className="text-[10px] text-[#6E5C5E] pl-2 space-y-0.5">
                        <div>• Cover: {item.customConfig.coverType === 'hardcover_corners' ? 'Hardcover + Gold Corners' : 'Softcover Laminated'}</div>
                        <div>• Custom Name: &quot;{item.customConfig.customName}&quot;</div>
                        <div>• Cover Title: &quot;{item.customConfig.coverTitle}&quot;</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-0.5 text-[#382A2C]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>LKR {cartTotalLKR.toLocaleString()}/=</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>{deliveryFee === 0 ? 'FREE 🌸' : `LKR ${deliveryFee}/=`}</span>
                </div>
                <div className="flex justify-between font-bold text-xs sm:text-sm text-[#FF6B8B] pt-1.5 border-t border-[#FF6B8B]/20">
                  <span>Grand Total:</span>
                  <span>LKR {grandTotal.toLocaleString()}/=</span>
                </div>
              </div>
            </div>

            {/* Actions: Copy Text & Print */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCopyOrderText}
                className="flex-1"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-[#1D7A66]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText ? 'Copied! ✨' : 'Copy Text'}</span>
              </Button>

              <Button
                variant="outline"
                onClick={handlePrint}
                className="flex-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Slip 🖨️</span>
              </Button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}
