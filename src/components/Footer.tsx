import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Mail, Globe } from 'lucide-react';
import { SiyaLogo } from './SiyaLogo';

interface FooterProps {
  onNavigate: (tab: 'shop' | 'style-feed' | 'atelier') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#161514] text-[#ece8de] pt-16 pb-12 border-t border-[#292724]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#292724]">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-start">
              <SiyaLogo variant="light" size="md" />
            </div>
            <p className="text-xs text-[#a39e93] leading-relaxed max-w-sm font-sans">
              High fashion design house creating architectural silhouettes, fluid mulberry silks, and bespoke made-to-measure couture for the discerning collector.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-[#a39e93]">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#c6a76c]" /> Paris &bull; Milan &bull; London
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#c6a76c] font-medium">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#a39e93]">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Haute Couture Gowns
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Sculpted Tailoring
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Pure Silk Charmeuse
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Mongolian Cashmere
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors">
                  Tuscan Leather Bags
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#c6a76c] font-medium">
              Experience
            </h4>
            <ul className="space-y-2 text-xs text-[#a39e93]">
              <li>
                <button onClick={() => onNavigate('style-feed')} className="hover:text-white transition-colors">
                  Personalized Style Feed
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('atelier')} className="hover:text-white transition-colors">
                  The Atelier & Craftsmanship
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('atelier')} className="hover:text-white transition-colors">
                  Made-to-Measure Booking
                </button>
              </li>
              <li>
                <span className="text-[#69645c] cursor-not-allowed">
                  Private Runway Archive (Invitation Only)
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#c6a76c] font-medium">
              Private Atelier Journal
            </h4>
            <p className="text-xs text-[#a39e93] leading-relaxed">
              Receive confidential dispatches on seasonal runway reveals, bespoke fabric swatch releases, and private trunk shows.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#242220] border border-[#3b3834] text-xs text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You have been enrolled into the SIYA Client Register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  required
                  placeholder="Enter client email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#242220] border border-[#3d3a35] text-xs text-white placeholder:text-[#6e6a61] focus:outline-none focus:border-[#c6a76c]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#c6a76c] text-[#161514] font-medium text-xs uppercase tracking-wider hover:bg-[#d6b77c] transition-colors cursor-pointer flex items-center justify-center"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="flex items-center gap-2 text-[10px] text-[#787369]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c6a76c]" />
              <span>Discreet client privacy strictly guaranteed. Never disclosed.</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#787369]">
          <p>&copy; {new Date().getFullYear()} SIYA ATELIER S.A. All Rights Reserved. Paris &bull; Milan.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Haute Couture</span>
            <span className="hover:text-white cursor-pointer transition-colors">Zero-Waste Certification</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
