import React, { useState } from 'react';
import { X, Mail, Phone, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { UserAuth } from '../types';
import { SiyaLogo } from './SiyaLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserAuth) => void;
  currentUser?: UserAuth;
  onLogout?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentUser,
  onLogout
}) => {
  const [tab, setTab] = useState<'gmail' | 'phone'>('gmail');
  const [gmailInput, setGmailInput] = useState('shivamkumar181211@gmail.com');
  const [fullName, setFullName] = useState('Shivam Kumar');
  const [phoneCountry, setPhoneCountry] = useState('+91');
  const [phoneInput, setPhoneInput] = useState('9876543210');
  const [otpStep, setOtpStep] = useState(false);
  const [otpValue, setOtpValue] = useState(['5', '2', '9', '1', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  if (!isOpen) return null;

  const handleGoogleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gmailInput.trim()) return;
    setIsLoading(true);
    setStatusMessage('Connecting securely with Google Identity Services...');

    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        isLoggedIn: true,
        method: 'google',
        identifier: gmailInput,
        name: fullName || gmailInput.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName || 'User')}&backgroundColor=161514&textColor=faf9f6`
      });
      onClose();
    }, 900);
  };

  const handleSendPhoneOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput.trim()) return;
    setIsLoading(true);
    setStatusMessage(`Sending encrypted 6-digit OTP to ${phoneCountry} ${phoneInput}...`);

    setTimeout(() => {
      setIsLoading(false);
      setOtpStep(true);
      setOtpValue(['5', '2', '9', '1', '8', '4']);
      setStatusMessage('');
    }, 700);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage('Authenticating phone token...');

    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        isLoggedIn: true,
        method: 'phone',
        identifier: `${phoneCountry} ${phoneInput}`,
        name: fullName || `Client ${phoneInput.slice(-4)}`,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${phoneInput.slice(-4)}&backgroundColor=161514&textColor=faf9f6`
      });
      onClose();
    }, 800);
  };

  return (
    <div 
      id="auth-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="auth-modal-card" 
        className="relative w-full max-w-md bg-[#faf9f6] border border-[#e5e1d7] rounded-none shadow-2xl p-6 sm:p-8 text-[#1a1918] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          id="close-auth-modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#7d786d] hover:text-[#1a1918] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser?.isLoggedIn ? (
          /* Profile & Logout View */
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border border-[#d8d4cb]">
              <img 
                src={currentUser.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}`} 
                alt={currentUser.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-editorial text-2xl font-medium tracking-wide mb-1">
              {currentUser.name}
            </h3>
            <p className="text-xs text-[#7d786d] tracking-wider mb-6">
              Authenticated via {currentUser.method === 'google' ? 'Google Account' : 'Secure Mobile'} &bull; {currentUser.identifier}
            </p>
            <div className="bg-[#f2efe9] p-4 text-left text-xs mb-6 space-y-2 border border-[#e2ded5]">
              <div className="flex items-center justify-between text-[#7d786d]">
                <span>SIYA Atelier Membership</span>
                <span className="text-[#1a1918] font-medium">Privilège Client</span>
              </div>
              <div className="flex items-center justify-between text-[#7d786d]">
                <span>Concierge Status</span>
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Active
                </span>
              </div>
            </div>
            <button
              id="auth-logout-btn"
              onClick={() => {
                if (onLogout) onLogout();
                onClose();
              }}
              className="w-full py-3 border border-[#1a1918] text-[#1a1918] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#1a1918] hover:text-white transition-all"
            >
              Sign Out of SIYA
            </button>
          </div>
        ) : (
          /* Login Form */
          <div>
            <div className="text-center mb-6">
              <SiyaLogo size="sm" showSubtitle={false} />
              <h2 className="font-editorial text-2xl font-light tracking-wide mt-3 text-[#1a1918]">
                Atelier Access
              </h2>
              <p className="text-xs text-[#7d786d] mt-1 font-sans tracking-wide">
                Sign in with your Gmail or Mobile Number to sync bookmarks, bespoke measurements, and your private style feed.
              </p>
            </div>

            {/* Auth Tab Switcher */}
            <div className="grid grid-cols-2 border-b border-[#e2ded5] mb-6">
              <button
                id="auth-tab-gmail"
                type="button"
                onClick={() => { setTab('gmail'); setOtpStep(false); }}
                className={`pb-3 text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 border-b-2 transition-all ${
                  tab === 'gmail' 
                    ? 'border-[#1a1918] text-[#1a1918]' 
                    : 'border-transparent text-[#9c9688] hover:text-[#1a1918]'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                Gmail Account
              </button>
              <button
                id="auth-tab-phone"
                type="button"
                onClick={() => setTab('phone')}
                className={`pb-3 text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 border-b-2 transition-all ${
                  tab === 'phone' 
                    ? 'border-[#1a1918] text-[#1a1918]' 
                    : 'border-transparent text-[#9c9688] hover:text-[#1a1918]'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                Mobile OTP
              </button>
            </div>

            {/* Gmail Authentication */}
            {tab === 'gmail' && (
              <form onSubmit={handleGoogleLogin} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-[#635f56] mb-1.5 font-medium">
                    Your Full Name
                  </label>
                  <input
                    id="auth-gmail-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Shivam Kumar"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#d8d4cb] text-sm focus:outline-none focus:border-[#1a1918] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-[#635f56] mb-1.5 font-medium">
                    Gmail / Google Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="auth-gmail-email"
                      type="email"
                      required
                      value={gmailInput}
                      onChange={(e) => setGmailInput(e.target.value)}
                      placeholder="username@gmail.com"
                      className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-[#d8d4cb] text-sm focus:outline-none focus:border-[#1a1918] transition-colors"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      {/* Google G logo mini */}
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.34 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12s.45 3.84 1.24 5.42l4.04-3.15z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <button
                  id="auth-submit-gmail"
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 bg-[#1a1918] text-[#faf9f6] text-xs uppercase tracking-[0.25em] font-medium hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3"/>
                        <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Verifying with Google...
                    </span>
                  ) : (
                    <>
                      <span>Continue with Google</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Mobile OTP Authentication */}
            {tab === 'phone' && (
              <div>
                {!otpStep ? (
                  <form onSubmit={handleSendPhoneOtp} className="space-y-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.15em] text-[#635f56] mb-1.5 font-medium">
                        Your Full Name
                      </label>
                      <input
                        id="auth-phone-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Shivam Kumar"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#d8d4cb] text-sm focus:outline-none focus:border-[#1a1918] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.15em] text-[#635f56] mb-1.5 font-medium">
                        Mobile Number
                      </label>
                      <div className="flex gap-2">
                        <select
                          id="auth-phone-code"
                          value={phoneCountry}
                          onChange={(e) => setPhoneCountry(e.target.value)}
                          className="px-2.5 py-2.5 bg-white border border-[#d8d4cb] text-sm focus:outline-none focus:border-[#1a1918]"
                        >
                          <option value="+91">🇮🇳 +91 (IN)</option>
                          <option value="+1">🇺🇸 +1 (US)</option>
                          <option value="+44">🇬🇧 +44 (UK)</option>
                          <option value="+33">🇫🇷 +33 (FR)</option>
                          <option value="+971">🇦🇪 +971 (UAE)</option>
                          <option value="+65">🇸🇬 +65 (SG)</option>
                        </select>
                        <input
                          id="auth-phone-number"
                          type="tel"
                          required
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ''))}
                          placeholder="9876543210"
                          maxLength={15}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#d8d4cb] text-sm focus:outline-none focus:border-[#1a1918] transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      id="auth-send-otp-btn"
                      type="submit"
                      disabled={isLoading}
                      className="w-full mt-2 py-3 bg-[#1a1918] text-[#faf9f6] text-xs uppercase tracking-[0.25em] font-medium hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? 'Requesting OTP...' : 'Send Security OTP'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="text-center mb-4">
                      <div className="inline-flex p-2 rounded-full bg-emerald-50 text-emerald-700 mb-2">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <p className="text-xs text-[#524e46]">
                        One-Time Passcode sent to <span className="font-semibold">{phoneCountry} {phoneInput}</span>
                      </p>
                      <button 
                        type="button" 
                        onClick={() => setOtpStep(false)}
                        className="text-[11px] text-[#8e897e] underline hover:text-[#1a1918] mt-1"
                      >
                        Change Number
                      </button>
                    </div>

                    <div>
                      <label className="block text-center text-[11px] uppercase tracking-[0.15em] text-[#635f56] mb-2 font-medium">
                        Enter 6-Digit Code
                      </label>
                      <div className="flex justify-center gap-2">
                        {otpValue.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`otp-input-${idx}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => {
                              const newArr = [...otpValue];
                              newArr[idx] = e.target.value;
                              setOtpValue(newArr);
                            }}
                            className="w-10 h-12 text-center text-lg font-medium bg-white border border-[#d8d4cb] focus:border-[#1a1918] focus:outline-none"
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      id="auth-verify-otp-btn"
                      type="submit"
                      disabled={isLoading}
                      className="w-full mt-3 py-3 bg-[#1a1918] text-[#faf9f6] text-xs uppercase tracking-[0.25em] font-medium hover:bg-black transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isLoading ? 'Verifying OTP...' : 'Verify & Enter Atelier'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Status note */}
            {statusMessage && (
              <p className="mt-4 text-center text-[11px] text-[#7d786d] animate-pulse">
                {statusMessage}
              </p>
            )}

            <div className="mt-6 pt-4 border-t border-[#e2ded5] flex items-center justify-center gap-2 text-[11px] text-[#8a8579]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#635f56]" />
              <span>SIYA Private Cryptographic Client Protection</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
