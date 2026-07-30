import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiShoppingBag, 
  FiMapPin, 
  FiStar, 
  FiShield, 
  FiTruck, 
  FiRotateCcw, 
  FiCheckCircle, 
  FiExternalLink,
  FiZap,
  FiGift,
  FiClock
} from 'react-icons/fi';
import NearbyShopModal from './NearbyShopModal';

// Amazon SVG Icon Component
const AmazonIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.62 16.03c-2.47 1.83-6.07 2.78-9.12 2.78-4.28 0-8.15-1.58-11.08-4.24-.23-.21-.03-.5.25-.34 3.16 1.85 7.12 2.97 11.23 2.97 2.72 0 5.67-.6 8.35-1.84.41-.19.75.29.37.67z" fill="#FF9900" />
    <path d="M14.65 14.88c-.31-.4-.63-1.22-.32-1.63.31-.41 1.09-.16 1.5.06 1.41.74 3.23.47 4.54-.42.17-.11.37.06.28.24-.71 1.4-2.22 2.25-3.79 2.25-.74 0-1.63-.16-2.21-.5z" fill="#FF9900" />
    <path d="M15.97 11.64c.2-.34.71-1.63.15-2.09-.56-.46-1.55.33-1.99.71-1.46 1.25-2.02 3.19-1.29 4.88.09.21.36.19.4-.03.27-1.41 1.54-2.82 2.73-3.47z" fill="#FFFFFF" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.66 14.83c-2.43 1.48-5.46 2.07-8.24 1.58-.38-.07-.46-.53-.13-.74 2.45-1.54 5.62-1.95 8.44-1.1.41.13.34.62-.07.26z" opacity="0.1" />
  </svg>
);

// Flipkart SVG Icon Component
const FlipkartIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="5" fill="#2874F0" />
    <path d="M6 7H18L17 18H7L6 7Z" stroke="#FFE11B" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7" stroke="#FFE11B" strokeWidth="1.8" />
    <path d="M10 11L14 11" stroke="#FFE11B" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 11V15" stroke="#FFE11B" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Smytten SVG Icon Component
const SmyttenIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="5" fill="#E91E63" />
    <path d="M12 4L14.5 9.5L20 10L16 14L17.5 19.5L12 16.5L6.5 19.5L8 14L4 10L9.5 9.5L12 4Z" fill="#FFFFFF" />
    <circle cx="12" cy="12" r="2" fill="#FFE082" />
  </svg>
);

export default function ProductPurchaseSection({ product }) {
  const [isNearbyModalOpen, setIsNearbyModalOpen] = useState(false);

  // Default demo product data fallback if not passed
  const currentProduct = product || {
    id: 1,
    name: 'The wave-Intense Glowing Spa Salt',
    tagline: 'Reveal smoother, softer, more radiant-looking skin',
    category: 'Body Care',
    badge: 'Best Seller',
    weight: '200g',
    price: 499,
    originalPrice: 699,
    discount: '28% OFF',
    rating: 4.9,
    reviewsCount: 1240,
    amazonUrl: 'https://www.amazon.in/dp/B0CXXXXX',
    flipkartUrl: 'https://www.flipkart.com/wave-intense-glowing-spa-salt/p/itmccf5ddfe24351',
    smyttenUrl: 'https://smytten.com/product/wave-intense-glowing-spa-salt',
    benefits: [
      'Removes dead skin cells & dullness',
      'Infused with nutrient-rich marine algae',
      'Deeply hydrates with coconut oil extract',
      'Dermatologically tested & 100% Cruelty Free'
    ]
  };

  return (
    <div className="w-full bg-white rounded-3xl sm:rounded-[36px] border border-slate-200/80 shadow-2xl p-6 sm:p-8 lg:p-10 my-8 overflow-hidden relative">
      
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ocean/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2" />

      {/* Header / Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-3 py-1 bg-ocean/10 text-ocean text-[10px] font-black uppercase tracking-widest rounded-full">
              {currentProduct.category || 'Beauty & Care'}
            </span>
            {currentProduct.badge && (
              <span className="px-3 py-1 bg-amber-500/10 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-500/20">
                {currentProduct.badge}
              </span>
            )}
            <div className="flex items-center gap-1 text-amber-500 text-xs font-black ml-1">
              <FiStar className="fill-amber-400 text-amber-400" />
              <span>{currentProduct.rating || 4.9}</span>
              <span className="text-slate-400 font-normal">({currentProduct.reviewsCount || 1240})</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {currentProduct.name}
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
            {currentProduct.tagline}
          </p>
        </div>

        {/* Pricing Block */}
        <div className="flex items-baseline md:items-end flex-wrap gap-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-100 shrink-0">
          <span className="text-2xl sm:text-3xl font-black text-slate-900">
            ₹{currentProduct.price || 499}
          </span>
          {currentProduct.originalPrice && (
            <span className="text-slate-400 line-through text-sm font-semibold">
              ₹{currentProduct.originalPrice}
            </span>
          )}
          <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-700 font-black text-[10px] uppercase tracking-wider rounded-lg border border-emerald-500/20">
            {currentProduct.discount || '28% OFF'}
          </span>
        </div>
      </div>

      {/* Main Grid: Purchase Options & Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">

        {/* Left Column: Brand Purchase Buttons (Amazon, Flipkart, Smytten) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <FiShoppingBag className="text-ocean" />
              Select Online Buying Channel
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
              <FiCheckCircle /> Official Stores
            </span>
          </div>

          {/* 1. Amazon Button */}
          <motion.a
            href={currentProduct.amazonUrl || 'https://www.amazon.in'}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#232F3E] via-[#141920] to-[#0F141C] text-white shadow-xl shadow-slate-900/10 border border-slate-700/50 overflow-hidden transition-all duration-300"
          >
            {/* Ambient orange glow on hover */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-amber-500/10 blur-xl group-hover:bg-amber-500/20 transition-all" />

            <div className="flex items-center gap-3.5 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:border-amber-400/50 transition-colors">
                <AmazonIcon />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm sm:text-base tracking-tight text-white group-hover:text-amber-400 transition-colors">
                    Buy on Amazon
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                    Prime
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                  Fast 1-Day Delivery • Amazon A-to-z Guarantee
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 relative z-10">
              <span className="hidden sm:inline-block text-xs font-bold text-amber-400 group-hover:underline">
                Shop Now
              </span>
              <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-amber-400 group-hover:text-slate-950 text-white flex items-center justify-center transition-all">
                <FiExternalLink className="text-xs" />
              </div>
            </div>
          </motion.a>

          {/* 2. Flipkart Button */}
          <motion.a
            href={currentProduct.flipkartUrl || 'https://www.flipkart.com'}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#2874F0] via-[#1A5FD4] to-[#0D4CB5] text-white shadow-xl shadow-blue-600/15 border border-blue-400/30 overflow-hidden transition-all duration-300"
          >
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 group-hover:border-yellow-300/60 transition-colors">
                <FlipkartIcon />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm sm:text-base tracking-tight text-white group-hover:text-yellow-300 transition-colors">
                    Buy on Flipkart
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-yellow-300 text-blue-900 px-2 py-0.5 rounded">
                    Assured
                  </span>
                </div>
                <p className="text-[11px] text-blue-100/80 font-medium mt-0.5">
                  Instant Bank Offers • Flipkart Assured Original
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 relative z-10">
              <span className="hidden sm:inline-block text-xs font-bold text-yellow-300 group-hover:underline">
                Shop Now
              </span>
              <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-yellow-300 group-hover:text-blue-900 text-white flex items-center justify-center transition-all">
                <FiExternalLink className="text-xs" />
              </div>
            </div>
          </motion.a>

          {/* 3. Smytten Button */}
          <motion.a
            href={currentProduct.smyttenUrl || 'https://smytten.com'}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#D81B60] via-[#E91E63] to-[#8E24AA] text-white shadow-xl shadow-pink-600/15 border border-pink-400/30 overflow-hidden transition-all duration-300"
          >
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/15 group-hover:border-amber-200 transition-colors">
                <SmyttenIcon />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm sm:text-base tracking-tight text-white group-hover:text-amber-200 transition-colors">
                    Buy on Smytten
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded border border-white/20">
                    Trial Rewards
                  </span>
                </div>
                <p className="text-[11px] text-pink-100/90 font-medium mt-0.5">
                  Earn 6 Free Trial Points • Exclusive Beauty Gifts
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 relative z-10">
              <span className="hidden sm:inline-block text-xs font-bold text-amber-200 group-hover:underline">
                Shop Now
              </span>
              <div className="w-8 h-8 rounded-full bg-white/15 group-hover:bg-amber-200 group-hover:text-pink-900 text-white flex items-center justify-center transition-all">
                <FiExternalLink className="text-xs" />
              </div>
            </div>
          </motion.a>

        </div>

        {/* Right Column: Buy from Nearby Shop Card & Benefits */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          
          {/* Nearby Shop Highlight Card */}
          <div className="relative rounded-3xl bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 p-6 text-white shadow-2xl overflow-hidden border border-emerald-500/30 flex flex-col justify-between h-full">
            {/* Decorative background circle */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-[10px] font-black uppercase tracking-widest mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Local Store Pickup
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                Want to buy directly from a physical store nearby?
              </h3>

              <p className="text-xs text-slate-300 font-medium mt-2 leading-relaxed">
                Pay instantly using <strong>QR Code / UPI</strong>, view local shop contact info, or call/message the store owner directly for instant pickup.
              </p>

              {/* Quick Perks List */}
              <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                  <FiCheckCircle className="text-emerald-400 shrink-0" />
                  <span>Instant Walk-in Pickup (No waiting for delivery)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                  <FiCheckCircle className="text-emerald-400 shrink-0" />
                  <span>Direct QR Code & PhonePe / GPay Payment</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                  <FiCheckCircle className="text-emerald-400 shrink-0" />
                  <span>Direct Shop Manager Contact & WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Trigger Button to Open Nearby Shop Modal */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsNearbyModalOpen(true)}
              className="mt-6 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <FiMapPin className="text-base" />
              Buy from Nearby Shop
            </motion.button>
          </div>

        </div>

      </div>

      {/* Trust Badges Footer */}
      <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="flex items-center justify-center gap-2 p-2">
          <FiShield className="text-ocean text-base" />
          <span className="text-[11px] font-bold text-slate-700">100% Authentic</span>
        </div>
        <div className="flex items-center justify-center gap-2 p-2">
          <FiTruck className="text-ocean text-base" />
          <span className="text-[11px] font-bold text-slate-700">Express Delivery</span>
        </div>
        <div className="flex items-center justify-center gap-2 p-2">
          <FiRotateCcw className="text-ocean text-base" />
          <span className="text-[11px] font-bold text-slate-700">Easy Returns</span>
        </div>
        <div className="flex items-center justify-center gap-2 p-2">
          <FiZap className="text-ocean text-base" />
          <span className="text-[11px] font-bold text-slate-700">Instant UPI Payment</span>
        </div>
      </div>

      {/* Nearby Shop Modal Component */}
      <NearbyShopModal
        isOpen={isNearbyModalOpen}
        onClose={() => setIsNearbyModalOpen(false)}
        product={currentProduct}
      />
    </div>
  );
}
