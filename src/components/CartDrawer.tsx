import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Download, Package } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 75;
  const hasPhysicalKits = cart.some((i) => i.type === 'kit');
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E5DFD5] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#EBE5DC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-serif font-bold text-[#292524]">Your Craft Bag</h2>
              <span className="text-xs text-[#78716C] tabular-nums">
                ({cart.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-1.5 text-[#78716C] hover:text-[#292524] rounded-lg transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress (for kits) */}
          {hasPhysicalKits && (
            <div className="p-4 bg-[#FAF4ED] border-b border-[#E9DC handle] text-xs">
              <div className="flex justify-between text-[#78716C] mb-1 font-medium">
                <span>
                  {amountToFreeShipping > 0
                    ? `Add $${amountToFreeShipping.toFixed(2)} more for Free Shipping`
                    : '🎉 You unlocked Free Worldwide Shipping!'}
                </span>
                <span className="tabular-nums font-semibold text-[#8C5E3D]">
                  ${subtotal.toFixed(2)} / ${freeShippingThreshold}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#EFECE6] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#B45309] rounded-full transition-all duration-300"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-[#78716C]">
                <Package className="w-10 h-10 mx-auto text-[#D6CEC4] mb-3 stroke-[1.5]" />
                <p className="text-base font-serif text-[#292524]">Your bag is currently empty</p>
                <p className="text-xs text-[#78716C] mt-1">
                  Explore our curated patterns or select a full wool maker kit.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl border border-[#EAE3D9] flex gap-4 items-start shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-[#EFECE6] shrink-0 border border-[#E0D8CE]"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-[#292524] truncate">
                        {item.title}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#A8A29E] hover:text-red-600 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-[#78716C] mt-0.5">
                      {item.type === 'digital' ? (
                        <span className="inline-flex items-center gap-1 text-[#8C5E3D] font-medium">
                          <Download className="w-3 h-3" /> Digital PDF
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[#4D6B53] font-medium">
                          <Package className="w-3 h-3" /> Maker Kit ({item.colorScheme})
                        </span>
                      )}
                    </div>

                    {item.includeHook && (
                      <p className="text-[10px] text-[#78716C] mt-0.5">Includes Handcrafted Hook</p>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F5F2EB]">
                      {/* Quantity Steppers */}
                      <div className="flex items-center gap-2 border border-[#DDD6CB] rounded-md px-2 py-0.5 bg-[#FAF7F2]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-[#78716C] hover:text-[#292524] focus:outline-none"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#292524] tabular-nums px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-[#78716C] hover:text-[#292524] focus:outline-none"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-bold font-serif text-[#292524] tabular-nums">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#EBE5DC] space-y-4">
              <div className="space-y-1.5 text-xs text-[#78716C]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#292524] tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Digital Delivery</span>
                  <span className="text-emerald-700 font-medium">Instant Download (Free)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#F0ECE4] flex justify-between text-base font-serif font-bold text-[#292524]">
                <span>Total</span>
                <span className="tabular-nums">${subtotal.toFixed(2)}</span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-3.5 px-4 bg-[#B45309] hover:bg-[#92400E] text-white rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B45309]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#A8A29E]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SSL Encrypted · Instant PDF Access</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
