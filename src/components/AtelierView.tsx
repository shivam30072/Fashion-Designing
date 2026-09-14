import React, { useState } from 'react';
import { Scissors, Sparkles, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { ImageWithPlaceholder } from './ImageWithPlaceholder';
import { SiyaLogo } from './SiyaLogo';

interface AtelierViewProps {
  onExploreCollections: () => void;
}

export const AtelierView: React.FC<AtelierViewProps> = ({ onExploreCollections }) => {
  const [consultationBooked, setConsultationBooked] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Shivam Kumar',
    email: 'shivamkumar181211@gmail.com',
    service: 'Bespoke Haute Couture Eveningwear',
    city: 'Paris Flagship (or Virtual 3D Fitting)',
    preferredDate: '2026-10-15',
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationBooked(true);
  };

  return (
    <div id="atelier-view-section" className="py-8 sm:py-16 space-y-16 sm:space-y-24">
      {/* Editorial Mission Statement */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <SiyaLogo size="lg" />
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#9c9688] font-medium block">
          The Philosophy of Pure Form
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl font-light text-[#1a1918] leading-tight">
          Where Architectural Rigor Meets Sensuous Drapery
        </h1>
        <p className="text-sm sm:text-base text-[#615c52] font-sans leading-relaxed max-w-2xl mx-auto">
          Founded on the conviction that high fashion should evoke both profound serenity and sculptural authority. Each SIYA creation begins as a freehand charcoal study before being calibrated in muslin by master Parisian pattern-makers.
        </p>
      </div>

      {/* Atelier Triptych Photo Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <div className="aspect-[3/4] overflow-hidden bg-[#f4f2ec]">
            <ImageWithPlaceholder
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85"
              alt="Atelier fabric drapery"
              aspectRatio="aspect-[3/4]"
            />
          </div>
          <h4 className="font-editorial text-xl text-[#1a1918]">I. The Raw Textile</h4>
          <p className="text-xs text-[#736e63] leading-relaxed">
            Sourced strictly from certified regenerative silk farms and ethical Mongolian cashmere mills preserving natural heritage staples.
          </p>
        </div>

        <div className="space-y-3">
          <div className="aspect-[3/4] overflow-hidden bg-[#f4f2ec]">
            <ImageWithPlaceholder
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=85"
              alt="Tailoring craftsmanship"
              aspectRatio="aspect-[3/4]"
            />
          </div>
          <h4 className="font-editorial text-xl text-[#1a1918]">II. The Floating Canvas</h4>
          <p className="text-xs text-[#736e63] leading-relaxed">
            Traditional floating horsehair canvases allow our blazers and coats to mold intimately to the wearer&apos;s physique across decades.
          </p>
        </div>

        <div className="space-y-3">
          <div className="aspect-[3/4] overflow-hidden bg-[#f4f2ec]">
            <ImageWithPlaceholder
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85"
              alt="Haute couture silhouette"
              aspectRatio="aspect-[3/4]"
            />
          </div>
          <h4 className="font-editorial text-xl text-[#1a1918]">III. The Runway Revelation</h4>
          <p className="text-xs text-[#736e63] leading-relaxed">
            Garments that command presence without clamor. Understated luxury engineered with exacting optical geometry.
          </p>
        </div>
      </div>

      {/* Made-to-Measure Private Consultation Booking Form */}
      <div className="bg-[#f3f0e8] border border-[#e2ddd0] p-6 sm:p-12 max-w-3xl mx-auto">
        <div className="text-center max-w-md mx-auto mb-8">
          <div className="inline-flex p-3 rounded-full bg-[#1a1918] text-[#faf9f6] mb-3">
            <Scissors className="w-5 h-5" />
          </div>
          <h3 className="font-editorial text-3xl font-light text-[#1a1918]">
            Private Made-to-Measure Consultation
          </h3>
          <p className="text-xs text-[#736e63] mt-2">
            Schedule a confidential rendezvous with our Head of Couture for custom gala gowns, bridal commissions, or bespoke suiting.
          </p>
        </div>

        {consultationBooked ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-editorial text-2xl font-medium">Consultation Confirmed</h4>
            <p className="text-xs text-[#736e63] max-w-sm mx-auto">
              Our couture concierge will reach out to <strong className="text-[#1a1918]">{formData.email}</strong> within 24 hours with swatch cards and appointment credentials.
            </p>
            <button
              onClick={() => setConsultationBooked(false)}
              className="text-xs uppercase tracking-wider text-[#1a1918] underline font-medium pt-2"
            >
              Book Another Appointment
            </button>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#635f56] mb-1 font-medium">
                  Client Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#d8d4cb] text-xs focus:border-[#1a1918]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#635f56] mb-1 font-medium">
                  Client Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#d8d4cb] text-xs focus:border-[#1a1918]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#635f56] mb-1 font-medium">
                  Commission Focus
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#d8d4cb] text-xs focus:border-[#1a1918]"
                >
                  <option>Bespoke Haute Couture Eveningwear</option>
                  <option>Architectural Tailored Suiting</option>
                  <option>Bridal Atelier Commission</option>
                  <option>Private Wardrobe Curation</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#635f56] mb-1 font-medium">
                  Location Preference
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#d8d4cb] text-xs focus:border-[#1a1918]"
                >
                  <option>Paris Flagship (Faubourg Saint-Honoré)</option>
                  <option>Milan Atelier (Via Montenapoleone)</option>
                  <option>London Suite (Mayfair)</option>
                  <option>New York Salon (Madison Avenue)</option>
                  <option>Virtual 3D Fitting & Swatch Box</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3.5 bg-[#1a1918] text-[#faf9f6] text-xs uppercase tracking-[0.25em] font-medium hover:bg-black transition-all cursor-pointer"
            >
              Request Private Atelier Appointment
            </button>
          </form>
        )}
      </div>

      {/* CTA back to collections */}
      <div className="text-center pt-8">
        <button
          onClick={onExploreCollections}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1a1918] text-[#faf9f6] text-xs uppercase tracking-[0.25em] font-medium hover:bg-black transition-all"
        >
          <span>Explore Ready to Wear & Couture</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
