import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';
import { ImageWithPlaceholder } from './ImageWithPlaceholder';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  promoCode: string;
  onApplyPromo: (code: string) => void;
  discountPercentage: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  promoCode,
  onApplyPromo,
  discountPercentage,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercentage) / 100;
  const freeShippingThreshold = 1000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 45;
  const finalTotal = subtotal - discountAmount + (items.length > 0 ? shippingCost : 0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();
    if (cleanCode === 'SIYA10' || cleanCode === 'ATELIER15') {
      onApplyPromo(cleanCode);
      setPromoMsg('Code applied successfully: Atelier courtesy discount applied.');
    } else {
      setPromoMsg('Invalid promotional voucher. Try "SIYA10"');
    }
  };

  return (
    <div 
      id="cart-drawer-backdrop" 
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          id="cart-drawer-panel"
          className="w-screen max-w-md bg-[#faf9f6] text-[#1a1918] shadow-2xl flex flex-col border-l border-[#e5e0d3] animate-in slide-in-from-right duration-300"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#ece7dc] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1a1918]" />
              <h2 className="font-editorial text-2xl font-light tracking-wide">
                Atelier Shopping Bag
              </h2>
              <span className="text-xs text-[#7d786d]">({items.reduce((a, b) => a + b.quantity, 0)})</span>
            </div>
            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-1.5 text-[#7d786d] hover:text-[#1a1918] rounded-full hover:bg-[#efebe2] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Meter */}
          <div className="px-6 py-3 bg-[#f2efe8] border-b border-[#e5e0d3] text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-[#615c52] mb-1.5 font-sans">
                Add <span className="font-semibold text-[#1a1918]">${remainingForFreeShipping.toLocaleString()}</span> more for <span className="font-medium text-[#1a1918]">Complimentary White-Glove Shipping</span>
              </p>
            ) : (
              <p className="text-emerald-800 font-medium mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Complimentary Atelier Express Courier Unlocked!
              </p>
            )}
            <div className="w-full h-1 bg-[#dcd7cb] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#1a1918] transition-all duration-500 ease-out"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#eee9df]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#f0ece3] flex items-center justify-center mb-4 text-[#8a8579]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="font-editorial text-2xl font-light mb-1">Your bag is empty</h3>
                <p className="text-xs text-[#7d786d] max-w-xs mb-6">
                  Discover exquisite couture drapery, sculpted outerwear, and artisanal ready-to-wear.
                </p>
                <button
                  id="cart-explore-btn"
                  onClick={onClose}
                  className="px-6 py-3 bg-[#1a1918] text-[#faf9f6] text-xs uppercase tracking-[0.25em] font-medium hover:bg-black transition-all"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-5 flex gap-4 first:pt-0 last:pb-0">
                  <div className="w-20 h-26 flex-shrink-0 bg-[#f4f1ea] overflow-hidden">
                    <ImageWithPlaceholder
                      src={item.product.images[0]}
                      alt={item.product.name}
                      aspectRatio="aspect-[3/4]"
                      className="w-full h-full"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-editorial text-base text-[#1a1918] leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#9e998e] hover:text-rose-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-[#736e63] mt-1">
                        <span>Size: <strong className="text-[#1a1918]">{item.size}</strong></span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <span 
                            className="w-2.5 h-2.5 rounded-full border border-black/20" 
                            style={{ backgroundColor: item.color.hex }}
                          />
                          {item.color.name}
                        </span>
                      </div>

                      {item.customNote && (
                        <p className="text-[10px] text-[#8c6b2e] bg-[#fdf8ee] p-1 border border-[#eeddbb] mt-1.5 font-mono">
                          Bespoke: {item.customNote}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#d8d4cb] bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1.5 text-[#635f56] hover:text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[#635f56] hover:text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-medium text-[#1a1918]">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Calculation */}
          {items.length > 0 && (
            <div className="p-6 bg-[#f7f5ef] border-t border-[#ece6d9] space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8e897e]" />
                  <input
                    type="text"
                    placeholder="Promo voucher (e.g. SIYA10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-white border border-[#d8d4cb] text-xs uppercase tracking-wider focus:outline-none focus:border-[#1a1918]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 border border-[#1a1918] text-[#1a1918] text-xs uppercase tracking-wider font-medium hover:bg-[#1a1918] hover:text-white transition-all"
                >
                  Apply
                </button>
              </form>
              {promoMsg && (
                <p className="text-[11px] text-[#806129] font-medium">{promoMsg}</p>
              )}

              {/* Calculations breakdown */}
              <div className="text-xs space-y-1.5 text-[#635f56]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span>Atelier Privilège ({discountPercentage}%)</span>
                    <span>-${discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Courier</span>
                  <span>{shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-[#1a1918] pt-2 border-t border-[#e2ded5]">
                  <span>Estimated Total</span>
                  <span>${finalTotal.toLocaleString()} USD</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-checkout-proceed-btn"
                onClick={() => {
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 bg-[#1a1918] text-[#faf9f6] text-xs uppercase tracking-[0.25em] font-medium hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#8a8579] tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-[#635f56]" />
                <span>256-Bit SSL Encrypted &bull; Authentic SIYA Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
