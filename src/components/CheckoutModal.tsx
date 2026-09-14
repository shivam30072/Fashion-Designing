import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  CheckCircle2, 
  Truck, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles,
  Printer,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { CartItem } from '../types';
import { SiyaLogo } from './SiyaLogo';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  finalTotal: number;
  onOrderSuccess: (orderId: string) => void;
  userEmail?: string;
  userName?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discountAmount,
  shippingCost,
  finalTotal,
  onOrderSuccess,
  userEmail = 'shivamkumar181211@gmail.com',
  userName = 'Shivam Kumar',
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'processing' | 'confirmed'>('shipping');
  
  // Shipping Form State
  const [shippingData, setShippingData] = useState({
    firstName: userName.split(' ')[0] || 'Shivam',
    lastName: userName.split(' ').slice(1).join(' ') || 'Kumar',
    email: userEmail,
    phone: '+91 9876543210',
    address: '42 Rue du Faubourg Saint-Honoré',
    apartment: 'Apt 4B',
    city: 'Paris',
    country: 'France',
    postalCode: '75008',
    deliveryMethod: 'complimentary', // 'complimentary' | 'express'
  });

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_google' | 'upi'>('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8829');
  const [cardHolder, setCardHolder] = useState(userName || 'SHIVAM KUMAR');
  const [expiry, setExpiry] = useState('11/28');
  const [cvv, setCvv] = useState('892');
  const [saveCard, setSaveCard] = useState(true);
  const [generatedOrderId, setGeneratedOrderId] = useState('');
  const [processingStage, setProcessingStage] = useState('Contacting issuer network...');

  if (!isOpen) return null;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setProcessingStage('Encrypting 256-bit payload...');

    setTimeout(() => {
      setProcessingStage('Performing 3D Secure biometric verification...');
    }, 1000);

    setTimeout(() => {
      setProcessingStage('Issuing certified payment token...');
    }, 2000);

    setTimeout(() => {
      const orderId = `SIYA-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedOrderId(orderId);
      setStep('confirmed');
      onOrderSuccess(orderId);
    }, 3000);
  };

  const handleFormatCardNumber = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 16);
    const matches = cleaned.match(/.{1,4}/g);
    return matches ? matches.join(' ') : cleaned;
  };

  return (
    <div 
      id="checkout-modal-backdrop" 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
    >
      <div 
        id="checkout-modal-container"
        className="relative w-full max-w-4xl bg-[#faf9f6] text-[#1a1918] shadow-2xl border border-[#ded9cd] overflow-hidden min-h-[580px] flex flex-col"
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#eae5da] flex items-center justify-between bg-[#faf9f6]">
          <div className="flex items-center gap-3">
            <SiyaLogo size="sm" showSubtitle={false} />
            <span className="text-[#a39e92]">&bull;</span>
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#6e6a5f]">
              Secure Gateway Checkout
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
              <Lock className="w-3 h-3" />
              <span>256-Bit TLS Encryption</span>
            </div>
            {step !== 'processing' && step !== 'confirmed' && (
              <button
                id="checkout-close-btn"
                onClick={onClose}
                className="p-1.5 text-[#7d786d] hover:text-[#1a1918] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Checkout Progress Stepper */}
        {step !== 'confirmed' && step !== 'processing' && (
          <div className="px-6 py-3 bg-[#f2efe8] border-b border-[#e5e0d3] flex items-center justify-center gap-8 text-xs font-medium">
            <button
              onClick={() => setStep('shipping')}
              className={`flex items-center gap-2 transition-colors ${
                step === 'shipping' ? 'text-[#1a1918]' : 'text-[#8c877a]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step === 'shipping' ? 'bg-[#1a1918] text-white' : 'bg-[#ded9cc] text-[#1a1918]'
              }`}>1</span>
              <span>Atelier Destination</span>
            </button>
            <div className="w-8 h-[1px] bg-[#d5d0c3]" />
            <button
              onClick={() => {
                if (shippingData.address) setStep('payment');
              }}
              className={`flex items-center gap-2 transition-colors ${
                step === 'payment' ? 'text-[#1a1918]' : 'text-[#8c877a]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step === 'payment' ? 'bg-[#1a1918] text-white' : 'bg-[#ded9cc] text-[#1a1918]'
              }`}>2</span>
              <span>Encrypted Payment</span>
            </button>
          </div>
        )}

        {/* Main Content Areas */}
        <div className="flex-1 p-6 md:p-8">
          {/* STEP 1: Shipping Details */}
          {step === 'shipping' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7">
                <h3 className="font-editorial text-2xl font-light mb-1">
                  Atelier Client & Delivery Address
                </h3>
                <p className="text-xs text-[#7d786d] mb-6">
                  Where should our private white-glove courier deliver your garment?
                </p>

                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#635f56] mb-1 font-medium">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingData.firstName}
                        onChange={(e) => setShippingData({...shippingData, firstName: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-[#d8d4cb] text-xs focus:border-[#1a1918]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#635f56] mb-1 font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingData.lastName}
                        onChange={(e) => setShippingData({...shippingData, lastName: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-[#d8d4cb] text-xs focus:border-[#1a1918]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#635f56] mb-1 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingData.email}
                        onChange={(e) => setShippingData({...shippingData, email: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-[#d8d4cb] text-xs focus:border-[#1a1918]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#635f56] mb-1 font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingData.phone}
                        onChange={(e) => setShippingData({...shippingData, phone: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-[#d8d4cb] text-xs focus:border-[#1a1918]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#635f56] mb-1 font-medium">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingData.address}
                      onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                      className="w-full px-3 py-2 bg-white border border-[#d8d4cb] text-xs focus:border-[#1a1918]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#635f56] mb-1 font-medium">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingData.city}
                        onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-[#d8d4cb] text-xs focus:border-[#1a1918]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#635f56] mb-1 font-medium">
                        Country
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingData.country}
                        onChange={(e) => setShippingData({...shippingData, country: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-[#d8d4cb] text-xs focus:border-[#1a1918]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#635f56] mb-1 font-medium">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingData.postalCode}
                        onChange={(e) => setShippingData({...shippingData, postalCode: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-[#d8d4cb] text-xs focus:border-[#1a1918]"
                      />
                    </div>
                  </div>

                  {/* Delivery Mode Choice */}
                  <div className="pt-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#635f56] mb-2 font-medium">
                      Delivery Service Selection
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div 
                        onClick={() => setShippingData({...shippingData, deliveryMethod: 'complimentary'})}
                        className={`p-3 border cursor-pointer transition-all ${
                          shippingData.deliveryMethod === 'complimentary'
                            ? 'border-[#1a1918] bg-[#f2efe8]'
                            : 'border-[#dcd7cb] bg-white hover:border-[#1a1918]'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-[#1a1918]">Complimentary Courier</span>
                          <span className="text-xs font-semibold text-emerald-800">FREE</span>
                        </div>
                        <p className="text-[10px] text-[#736e63]">2-4 Business Days with temperature-regulated packaging.</p>
                      </div>

                      <div 
                        onClick={() => setShippingData({...shippingData, deliveryMethod: 'express'})}
                        className={`p-3 border cursor-pointer transition-all ${
                          shippingData.deliveryMethod === 'express'
                            ? 'border-[#1a1918] bg-[#f2efe8]'
                            : 'border-[#dcd7cb] bg-white hover:border-[#1a1918]'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-[#1a1918]">Priority Atelier Jet</span>
                          <span className="text-xs font-medium text-[#1a1918]">$65</span>
                        </div>
                        <p className="text-[10px] text-[#736e63]">Next-Day Guaranteed Arrival with personal handler.</p>
                      </div>
                    </div>
                  </div>

                  <button
                    id="checkout-shipping-continue-btn"
                    type="submit"
                    className="w-full mt-6 py-3.5 bg-[#1a1918] text-[#faf9f6] text-xs uppercase tracking-[0.25em] font-medium hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Payment Gateway</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Order Mini Summary sidebar */}
              <div className="md:col-span-5 bg-[#f4f2ea] p-6 border border-[#e2ddd0] flex flex-col justify-between">
                <div>
                  <h4 className="font-editorial text-lg font-medium mb-3 text-[#1a1918]">
                    Order Summary ({items.length} Items)
                  </h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {items.map((it) => (
                      <div key={it.id} className="flex gap-3 text-xs">
                        <img 
                          src={it.product.images[0]} 
                          alt={it.product.name} 
                          className="w-12 h-16 object-cover bg-white"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-[#1a1918] line-clamp-1">{it.product.name}</p>
                          <p className="text-[11px] text-[#7d786d]">Size: {it.size} &bull; Qty: {it.quantity}</p>
                          <p className="text-xs font-semibold text-[#1a1918] mt-1">
                            ${(it.product.price * it.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#d8d3c5] space-y-1.5 text-xs text-[#5e5a51]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-800 font-medium">
                      <span>Privilège Discount</span>
                      <span>-${discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-medium text-[#1a1918] pt-2 border-t border-[#d8d3c5]">
                    <span>Total Due</span>
                    <span>${finalTotal.toLocaleString()} USD</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Secure Payment Gateway */}
          {step === 'payment' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-7">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#9c9688] font-medium">
                    Step 2 of 2
                  </span>
                  <span className="text-[#a39e92]">&bull;</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-800 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> PCI-DSS Level 1 Verified
                  </span>
                </div>
                <h3 className="font-editorial text-2xl font-light mb-1">
                  Payment Method & Gateway
                </h3>
                <p className="text-xs text-[#7d786d] mb-6">
                  Select your encrypted settlement channel. No financial credentials are ever stored plaintext.
                </p>

                {/* Gateway Tabs */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-3 px-2 border text-xs uppercase tracking-wider font-medium flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#1a1918] bg-[#1a1918] text-[#faf9f6]'
                        : 'border-[#d8d4cb] bg-white text-[#635f56] hover:border-[#1a1918]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_google')}
                    className={`py-3 px-2 border text-xs uppercase tracking-wider font-medium flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'apple_google'
                        ? 'border-[#1a1918] bg-[#1a1918] text-[#faf9f6]'
                        : 'border-[#d8d4cb] bg-white text-[#635f56] hover:border-[#1a1918]'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Apple / GPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-3 px-2 border text-xs uppercase tracking-wider font-medium flex flex-col items-center gap-1 transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#1a1918] bg-[#1a1918] text-[#faf9f6]'
                        : 'border-[#d8d4cb] bg-white text-[#635f56] hover:border-[#1a1918]'
                    }`}
                  >
                    <Lock className="w-4 h-4" />
                    <span>UPI / NetBanking</span>
                  </button>
                </div>

                {/* Credit Card Details */}
                {paymentMethod === 'card' && (
                  <form onSubmit={handleProcessPayment} className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] uppercase tracking-wider text-[#635f56] font-medium">
                          Card Number
                        </label>
                        <div className="flex items-center gap-1 text-[10px] text-[#7d786d]">
                          <span>VISA</span>
                          <span>&bull;</span>
                          <span>Mastercard</span>
                          <span>&bull;</span>
                          <span>AMEX</span>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(handleFormatCardNumber(e.target.value))}
                          placeholder="4532 0000 0000 0000"
                          maxLength={19}
                          className="w-full pl-10 pr-3 py-2.5 bg-white border border-[#d8d4cb] text-sm tracking-widest font-mono focus:border-[#1a1918]"
                        />
                        <CreditCard className="w-4 h-4 text-[#8a8579] absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#635f56] mb-1 font-medium">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        placeholder="NAME ON CARD"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#d8d4cb] text-sm uppercase tracking-wider focus:border-[#1a1918]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#635f56] mb-1 font-medium">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          required
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#d8d4cb] text-sm tracking-wider font-mono focus:border-[#1a1918]"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[11px] uppercase tracking-wider text-[#635f56] font-medium">
                            Security CVV
                          </label>
                          <span className="text-[9px] text-[#8a8579]">3-4 digits</span>
                        </div>
                        <input
                          type="password"
                          required
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#d8d4cb] text-sm tracking-widest font-mono focus:border-[#1a1918]"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-[#635f56] pt-1">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="accent-[#1a1918]"
                      />
                      <span>Store encrypted token for future atelier acquisitions</span>
                    </label>

                    <div className="flex gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setStep('shipping')}
                        className="px-4 py-3 border border-[#d8d4cb] text-[#635f56] text-xs uppercase tracking-wider font-medium hover:border-[#1a1918] transition-colors flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                      </button>

                      <button
                        id="pay-now-card-btn"
                        type="submit"
                        className="flex-1 py-3.5 bg-[#1a1918] text-[#faf9f6] text-xs uppercase tracking-[0.25em] font-medium hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Authorize Payment &bull; ${finalTotal.toLocaleString()} USD</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Apple / Google 1-Tap Pay */}
                {paymentMethod === 'apple_google' && (
                  <div className="space-y-4 py-4">
                    <div className="p-6 bg-white border border-[#d8d4cb] text-center space-y-4">
                      <div className="flex justify-center gap-4 text-3xl">
                        <span>🍎</span>
                        <span>🌐</span>
                      </div>
                      <h4 className="font-editorial text-xl font-medium">
                        Instant Biometric Authorization
                      </h4>
                      <p className="text-xs text-[#7d786d] max-w-sm mx-auto">
                        Authenticate with Face ID, Touch ID, or Google Password Manager for instantaneous encrypted token settlement.
                      </p>

                      <button
                        onClick={handleProcessPayment}
                        className="w-full py-4 bg-black text-white text-sm font-semibold tracking-wider flex items-center justify-center gap-2 hover:bg-[#222] transition-colors cursor-pointer"
                      >
                        <span>Pay with Apple Pay / GPay</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="text-xs text-[#7d786d] underline hover:text-[#1a1918]"
                    >
                      Return to Address Details
                    </button>
                  </div>
                )}

                {/* UPI / Net Banking */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-4 py-2">
                    <div className="p-5 bg-white border border-[#d8d4cb] space-y-3">
                      <label className="block text-[11px] uppercase tracking-wider text-[#635f56] font-medium">
                        Virtual Payment Address (UPI ID)
                      </label>
                      <input
                        type="text"
                        defaultValue="shivam@okaxis"
                        placeholder="yourname@okhdfcbank"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#d8d4cb] text-sm focus:border-[#1a1918]"
                      />
                      <p className="text-[11px] text-[#7d786d]">
                        A collect request of <strong className="text-[#1a1918]">${finalTotal.toLocaleString()}</strong> will be dispatched to your UPI application.
                      </p>
                      <button
                        onClick={handleProcessPayment}
                        className="w-full py-3.5 bg-[#1a1918] text-[#faf9f6] text-xs uppercase tracking-[0.25em] font-medium hover:bg-black transition-all cursor-pointer"
                      >
                        Verify & Pay with UPI
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="text-xs text-[#7d786d] underline hover:text-[#1a1918]"
                    >
                      Return to Address Details
                    </button>
                  </div>
                )}
              </div>

              {/* Verified Security Breakdown Sidebar */}
              <div className="md:col-span-5 bg-[#f4f2ea] p-6 border border-[#e2ddd0] flex flex-col justify-between">
                <div>
                  <h4 className="font-editorial text-lg font-medium mb-3 text-[#1a1918]">
                    Atelier Security Protocols
                  </h4>
                  <ul className="space-y-3 text-xs text-[#635f56]">
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-800 flex-shrink-0 mt-0.5" />
                      <span>End-to-End Cryptographic Tokenization prevents credential disclosure.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-800 flex-shrink-0 mt-0.5" />
                      <span>Complimentary transit insurance covering full bespoke atelier value.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-800 flex-shrink-0 mt-0.5" />
                      <span>Signature required upon courier delivery for luxury protection.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#d8d3c5] text-xs space-y-1">
                  <div className="flex justify-between text-[#7d786d]">
                    <span>Recipient</span>
                    <span className="text-[#1a1918] font-medium">{shippingData.firstName} {shippingData.lastName}</span>
                  </div>
                  <div className="flex justify-between text-[#7d786d]">
                    <span>Destination</span>
                    <span className="text-[#1a1918] font-medium">{shippingData.city}, {shippingData.country}</span>
                  </div>
                  <div className="flex justify-between text-[#7d786d]">
                    <span>Total Charged</span>
                    <span className="text-base font-semibold text-[#1a1918]">${finalTotal.toLocaleString()} USD</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Realistic Gateway Processing Simulation */}
          {step === 'processing' && (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <div className="relative w-20 h-20 mb-6">
                <div className="w-20 h-20 rounded-full border-2 border-[#ded9cb] border-t-[#1a1918] animate-spin" />
                <Lock className="w-6 h-6 text-[#1a1918] absolute inset-0 m-auto" />
              </div>
              <h3 className="font-editorial text-3xl font-light mb-2 text-[#1a1918]">
                Securing Atelier Transaction
              </h3>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#7d786d] animate-pulse-subtle">
                {processingStage}
              </p>
              <div className="mt-8 max-w-xs text-[11px] text-[#9c9688]">
                Please do not refresh. Your connection is safeguarded by bank-grade TLS.
              </div>
            </div>
          )}

          {/* STEP 4: Confirmed Order & Receipt */}
          {step === 'confirmed' && (
            <div className="py-8 text-center max-w-xl mx-auto">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-[11px] uppercase tracking-[0.3em] text-[#9c9688] font-medium block mb-1">
                Acquisition Confirmed
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-light text-[#1a1918] mb-2">
                Thank You, {shippingData.firstName}
              </h2>
              <p className="text-xs text-[#7d786d] mb-6">
                Your order has been transmitted to our master cutters and tailors. A formal invoice has been dispatched to <strong className="text-[#1a1918]">{shippingData.email}</strong>.
              </p>

              {/* Order Reference Card */}
              <div className="bg-[#f3f0e8] border border-[#ded8c9] p-6 text-left text-xs mb-8 space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-[#e2ddd0]">
                  <span className="text-[#7d786d] uppercase tracking-wider text-[10px]">Order Reference</span>
                  <span className="font-mono font-semibold text-sm text-[#1a1918]">{generatedOrderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#7d786d]">Courier Destination</span>
                  <span className="font-medium text-[#1a1918]">{shippingData.address}, {shippingData.city}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#7d786d]">Estimated Delivery</span>
                  <span className="font-medium text-emerald-800">4-6 Business Days (White Glove)</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#e2ddd0]">
                  <span className="text-[#7d786d]">Total Settled</span>
                  <span className="font-medium text-sm text-[#1a1918]">${finalTotal.toLocaleString()} USD</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-3 border border-[#1a1918] text-[#1a1918] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#1a1918] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print Digital Receipt
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#1a1918] text-[#faf9f6] text-xs uppercase tracking-[0.25em] font-medium hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Return to Atelier Gallery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
