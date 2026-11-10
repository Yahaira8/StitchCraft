import React, { useState } from 'react';
import { X, CheckCircle, Download, Package, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onClearCart,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [email, setEmail] = useState<string>('maker@stitchcraft.studio');
  const [fullName, setFullName] = useState<string>('Yahaira Papin');
  const [shippingAddress, setShippingAddress] = useState<string>('742 Evergreen Terrace');
  const [postalCode, setPostalCode] = useState<string>('97477');
  const [orderNumber, setOrderNumber] = useState<string>('');

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const digitalItems = cart.filter((i) => i.type === 'digital');
  const physicalItems = cart.filter((i) => i.type === 'kit');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `SC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);
    setStep('success');
    onClearCart();
  };

  const handleDownloadPDF = (title: string) => {
    // Generate simple pattern text file as simulated PDF download
    const content = `STITCHCRAFT ARTISAN CROCHET STUDIO\nOfficial Digital Pattern Release\n\nPattern: ${title}\nCustomer: ${fullName} (${email})\nOrder: ${orderNumber}\n\nThank you for supporting independent slow-fashion crochet design!`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-stitchcraft-pattern.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white rounded-2xl max-w-xl w-full border border-[#E0D8CE] shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF7F2] border-b border-[#EBE5DC] flex items-center justify-between">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#292524]">
              {step === 'form' ? 'Checkout & Delivery' : 'Order Confirmed!'}
            </h3>
            <p className="text-xs text-[#78716C]">
              {step === 'form' ? 'Instant pattern access upon confirmation' : `Order #${orderNumber}`}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 text-[#78716C] hover:text-[#292524] rounded-lg transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Order Brief */}
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] text-xs flex justify-between items-center">
              <div>
                <span className="text-[#78716C]">Items in Bag: </span>
                <span className="font-semibold text-[#292524]">
                  {cart.length} unique item{cart.length > 1 ? 's' : ''}
                </span>
              </div>
              <div className="text-sm font-serif font-bold text-[#292524] tabular-nums">
                Total: ${total.toFixed(2)}
              </div>
            </div>

            {/* Email for digital downloads */}
            <div>
              <label className="block text-xs font-semibold text-[#292524] mb-1">
                Recipient Email Address (For Instant PDF Pattern Delivery)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#DDD6CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                />
              </div>
            </div>

            {/* Shipping details (always good for billing or physical kits) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-[#292524] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DDD6CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                />
              </div>

              {physicalItems.length > 0 && (
                <>
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-[#292524] mb-1">Shipping Address (For Maker Kit Yarn)</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DDD6CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#292524] mb-1">Postal / ZIP Code</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DDD6CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#292524] mb-1">Country</label>
                    <input
                      type="text"
                      defaultValue="United States"
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DDD6CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Payment simulation */}
            <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#292524]">Payment Method</span>
                <span className="text-[11px] text-emerald-700 font-medium">Demo Simulator</span>
              </div>
              <p className="text-[11px] text-[#78716C]">
                Ready to verify and place your crochet order. No actual card will be charged.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#B45309] hover:bg-[#92400E] text-white rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B45309]"
            >
              <span>Complete Order (${total.toFixed(2)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle className="w-7 h-7" />
            </div>

            <div>
              <h4 className="text-2xl font-serif font-bold text-[#292524]">Thank you for your order!</h4>
              <p className="text-xs text-[#78716C] mt-1">
                A confirmation receipt and pattern access codes have been dispatched to <span className="font-semibold text-[#292524]">{email}</span>.
              </p>
            </div>

            {/* Downloadable Patterns Available Immediately */}
            <div className="bg-[#FAF7F2] rounded-xl p-5 border border-[#EAE3D9] text-left space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8C5E3D] uppercase tracking-wider">
                <Download className="w-4 h-4" />
                <span>Instant Pattern Downloads</span>
              </div>

              <div className="space-y-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleDownloadPDF('Flora Meadow Cardigan & Woodland Fox Patterns')}
                  className="w-full py-2.5 px-3 bg-white border border-[#DDD6CB] hover:border-[#B45309] rounded-lg transition-all flex items-center justify-between text-left group"
                >
                  <span className="font-medium text-[#292524]">Download Complete Pattern Package (.txt/.pdf)</span>
                  <span className="text-xs font-semibold text-[#B45309] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Download <Download className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>

              {physicalItems.length > 0 && (
                <div className="pt-2 border-t border-[#EAE3D9] text-[11px] text-[#78716C] flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-[#8C5E3D]" />
                  <span>Physical maker kit is being wound and will ship via Carbon-Neutral Courier.</span>
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#292524] hover:bg-[#44403C] rounded-xl transition-colors"
            >
              Return to Studio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
