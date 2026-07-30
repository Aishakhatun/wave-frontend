import { useState, useEffect } from 'react';
import qrCodeImg from '../assets/QRcode.png';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiMapPin, 
  FiPhone, 
  FiMessageSquare, 
  FiCopy, 
  FiNavigation, 
  FiChevronRight,
  FiArrowLeft,
  FiExternalLink,
  FiShoppingBag,
  FiCheckCircle
} from 'react-icons/fi';

// Custom SVG Brand Icons designed for clean theme integration
const AmazonIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.62 16.03c-2.47 1.83-6.07 2.78-9.12 2.78-4.28 0-8.15-1.58-11.08-4.24-.23-.21-.03-.5.25-.34 3.16 1.85 7.12 2.97 11.23 2.97 2.72 0 5.67-.6 8.35-1.84.41-.19.75.29.37.67z" fill="#FF9900" />
    <path d="M14.65 14.88c-.31-.4-.63-1.22-.32-1.63.31-.41 1.09-.16 1.5.06 1.41.74 3.23.47 4.54-.42.17-.11.37.06.28.24-.71 1.4-2.22 2.25-3.79 2.25-.74 0-1.63-.16-2.21-.5z" fill="#FF9900" />
    <path d="M15.97 11.64c.2-.34.71-1.63.15-2.09-.56-.46-1.55.33-1.99.71-1.46 1.25-2.02 3.19-1.29 4.88.09.21.36.19.4-.03.27-1.41 1.54-2.82 2.73-3.47z" fill="#141920" />
  </svg>
);

const FlipkartIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="5" fill="#2874F0" />
    <path d="M6 7H18L17 18H7L6 7Z" stroke="#FFE11B" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7" stroke="#FFE11B" strokeWidth="1.8" />
    <path d="M10 11L14 11" stroke="#FFE11B" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 11V15" stroke="#FFE11B" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SmyttenIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="5" fill="#E91E63" />
    <path d="M12 4L14.5 9.5L20 10L16 14L17.5 19.5L12 16.5L6.5 19.5L8 14L4 10L9.5 9.5L12 4Z" fill="#FFFFFF" />
    <circle cx="12" cy="12" r="2" fill="#FFE082" />
  </svg>
);

// Nearby shop locations
const NEARBY_SHOPS = [
  {
    id: 'shop-1',
    name: 'Wave Organic Store - MG Road',
    address: '102 Premier Plaza, MG Road, Bengaluru',
    distance: '1.2 km',
    timing: '9:00 AM - 9:30 PM',
    phone: '+91 76003 04304',
    rawPhone: '7600304304',
    upiId: '9586928554-2@ybl',
    owner: 'Rajesh Kumar (Manager)',
    mapUrl: 'https://maps.google.com/?q=MG+Road+Bengaluru',
  }
];

export default function ProductPurchaseStepper({ product, isOpen, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewState, setViewState] = useState('details'); // 'details' | 'channels' | 'store_qr'
  const [selectedShop, setSelectedShop] = useState(NEARBY_SHOPS[0]);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    setViewState('details');
    setActiveImageIndex(0);
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const imagesList = [product.image, product.descriptionImage].filter(Boolean);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'upi') {
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 sm:p-5">
        {/* Soft Theme Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window matching mediglowsolutions.in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-100 max-h-[88vh] flex flex-col my-auto"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 bg-white shrink-0 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-ocean" />
              <span className="text-[9px] font-black uppercase tracking-[3px] text-slate-400">PRODUCT</span>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-all z-20"
            >
              <FiX className="text-sm" />
            </button>
          </div>

          {/* Scrollable Modal Content */}
          <div className="p-4 overflow-y-auto flex-1 bg-white">
            
            {/* VIEW 1: RICH PRODUCT DETAILS (Matching mediglowsolutions.in) */}
            {viewState === 'details' && (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
                
                {/* Left Column: Image Gallery & Carousel Dots */}
                <div className="sm:col-span-5 flex flex-col">
                  <div className="w-full flex-1 min-h-[220px] rounded-xl bg-slate-50 border border-slate-100 p-3 flex items-center justify-center overflow-hidden relative group">
                    <motion.img
                      key={activeImageIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      src={imagesList[activeImageIndex] || product.image}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow-md"
                    />

                    {imagesList.length > 1 && (
                      <button
                        onClick={() => setActiveImageIndex((prev) => (prev + 1) % imagesList.length)}
                        className="absolute right-2 w-6 h-6 rounded-full bg-white/90 shadow border border-slate-100 flex items-center justify-center text-slate-600 hover:text-ocean transition-all"
                      >
                        <FiChevronRight className="text-xs" />
                      </button>
                    )}
                  </div>

                  {/* Image Carousel Dots */}
                  {imagesList.length > 1 && (
                    <div className="flex gap-1 mt-2">
                      {imagesList.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            activeImageIndex === idx ? 'w-4 bg-ocean' : 'w-1.5 bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Complete Product Info */}
                <div className="sm:col-span-7 flex flex-col text-left space-y-3">
                  
                  {/* Category & Badge Row */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-sky-pale text-ocean">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h2 className="text-base font-black text-slate-900 leading-tight font-jakarta tracking-tight">
                      {product.name}
                    </h2>
                    {product.tagline && (
                      <p className="text-[10px] text-ocean font-bold italic mt-0.5">
                        "{product.tagline}"
                      </p>
                    )}
                  </div>

                  {/* Weight Chip */}
                  <span className="inline-block px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-bold text-[9px] uppercase tracking-wider w-fit">
                    {product.weight}
                  </span>

                  {/* ABOUT Box */}
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">
                      ABOUT
                    </span>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* KEY INGREDIENTS */}
                  {product.ingredients && product.ingredients.length > 0 && (
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">
                        KEY INGREDIENTS
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.ingredients.map((ing, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 text-[9px] font-bold flex items-center gap-1"
                          >
                            <span className="text-emerald-500 text-[10px]">🌿</span>
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* BENEFITS */}
                  {product.benefits && product.benefits.length > 0 && (
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">
                        BENEFITS
                      </span>
                      <ul className="space-y-1">
                        {product.benefits.map((ben, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                            <span className="w-1 h-1 rounded-full bg-ocean shrink-0" />
                            <span>{ben}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* BOTTOM ACTION BUTTON */}
                  <div className="pt-2.5 border-t border-slate-100">
                    {product.isStoreOnly ? (
                      /* Store Only Banner & Trigger */
                      <div className="bg-emerald-50 border border-emerald-200/70 rounded-xl p-3 flex items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1 text-emerald-800 font-black text-[10px] uppercase tracking-wider">
                            <FiMapPin className="text-emerald-600 text-xs" />
                            Available In-Store Only
                          </div>
                          <span className="text-[9px] text-slate-500 font-medium block mt-0.5">
                            Visit your nearest Wave outlet
                          </span>
                        </div>
                        <button
                          onClick={() => setViewState('store_qr')}
                          className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1"
                        >
                          <span>Store QR</span>
                          <FiChevronRight className="text-xs" />
                        </button>
                      </div>
                    ) : (
                      /* Online Buy Options Trigger */
                      <button
                        onClick={() => setViewState('channels')}
                        className="py-2.5 px-5 rounded-xl bg-ocean hover:bg-ocean-deep text-white font-black text-[10px] uppercase tracking-wider shadow-md shadow-ocean/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center gap-1.5"
                      >
                        <FiShoppingBag className="text-sm" />
                        <span>Buy Online / Choose Retailer</span>
                        <FiChevronRight className="text-sm" />
                      </button>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* VIEW 2: ONLINE RETAILERS CHOICE (Amazon, Flipkart, Smytten, Nearby Store) */}
            {viewState === 'channels' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto space-y-4 py-2"
              >
                <button
                  onClick={() => setViewState('details')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-ocean hover:text-ocean-deep transition-colors mb-2"
                >
                  <FiArrowLeft className="text-sm" /> Back to Product Details
                </button>

                <div className="text-center mb-4">
                  <h3 className="text-lg font-black text-slate-900 font-jakarta">Select Buying Channel</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Choose whether you'd like to buy online or from a nearby store:
                  </p>
                </div>

                {/* Amazon Option */}
                <a
                  href={product.amazonUrl || 'https://www.amazon.in'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 transition-all border border-slate-200 hover:border-amber-400 shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800 shadow-sm">
                      <AmazonIcon />
                    </div>
                    <span className="font-extrabold text-xs text-slate-900">Amazon Store</span>
                  </div>
                  <div className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-slate-900 text-amber-400 text-[10px] font-black uppercase tracking-wider group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shrink-0 shadow-sm">
                    <span>Visit Amazon</span>
                    <FiExternalLink className="text-xs" />
                  </div>
                </a>

                {/* Flipkart Option */}
                <a
                  href={product.flipkartUrl || 'https://www.flipkart.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-blue-50/40 text-slate-900 transition-all border border-slate-200 hover:border-blue-400 shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#2874F0] flex items-center justify-center shrink-0 shadow-sm">
                      <FlipkartIcon />
                    </div>
                    <span className="font-extrabold text-xs text-slate-900">Flipkart Store</span>
                  </div>
                  <div className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#2874F0] text-white text-[10px] font-black uppercase tracking-wider group-hover:bg-blue-600 transition-all shrink-0 shadow-sm">
                    <span>Visit Flipkart</span>
                    <FiExternalLink className="text-xs" />
                  </div>
                </a>

                {/* Smytten Option */}
                <a
                  href={product.smyttenUrl || 'https://smytten.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-pink-50/40 text-slate-900 transition-all border border-slate-200 hover:border-pink-400 shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E91E63] flex items-center justify-center shrink-0 shadow-sm">
                      <SmyttenIcon />
                    </div>
                    <span className="font-extrabold text-xs text-slate-900">Smytten Store</span>
                  </div>
                  <div className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#E91E63] text-white text-[10px] font-black uppercase tracking-wider group-hover:bg-pink-600 transition-all shrink-0 shadow-sm">
                    <span>Visit Smytten</span>
                    <FiExternalLink className="text-xs" />
                  </div>
                </a>

                {/* Divider */}
                <div className="relative py-2 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
                  <span className="relative bg-white px-3 text-[9px] font-black uppercase text-slate-400 tracking-wider">OR</span>
                </div>

                {/* Buy from Nearby Shop Option */}
                <button
                  onClick={() => setViewState('store_qr')}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-emerald-50/40 text-slate-900 transition-all border border-emerald-300 hover:border-emerald-500 shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                      <FiMapPin className="text-white text-base animate-bounce" />
                    </div>
                    <span className="font-extrabold text-xs text-slate-900">Buy from Nearby Shop</span>
                  </div>
                  <div className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider group-hover:bg-emerald-700 transition-all shrink-0 shadow-sm">
                    <span>View Store QR</span>
                    <FiChevronRight className="text-sm" />
                  </div>
                </button>
              </motion.div>
            )}

            {/* VIEW 3: NEARBY STORE PAYMENT & QR CODE DETAILS */}
            {viewState === 'store_qr' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto space-y-3"
              >
                <button
                  onClick={() => setViewState(product.isStoreOnly ? 'details' : 'channels')}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-ocean hover:text-ocean-deep transition-colors"
                >
                  <FiArrowLeft className="text-xs" /> {product.isStoreOnly ? 'Back to Details' : 'Back to Retailers'}
                </button>

                <div className="text-center">
                  <h3 className="text-base font-black text-slate-900 font-jakarta leading-tight">Store Payment QR</h3>
                </div>

                {/* QR + Payment Info: Side by Side on Desktop, Stacked on Mobile */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4">
                  {/* QR Image */}
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm shrink-0 flex flex-col items-center">
                    <img
                      src={qrCodeImg}
                      alt="PhonePe Payment QR Code - Mediglow Global Solutions"
                      className="w-36 h-36 object-contain"
                    />
                    <span className="text-[8px] font-black tracking-widest uppercase text-slate-400 mt-1">Scan & Pay</span>
                  </div>

                  {/* Payment Info */}
                  <div className="w-full sm:flex-1 space-y-2.5 min-w-0">
                    <div>
                      <span className="text-[8px] font-black uppercase text-slate-400 block">Shop UPI VPA</span>
                      <div className="flex items-center justify-between bg-white p-1.5 rounded-lg border border-slate-200 mt-0.5 gap-2">
                        <span className="font-mono text-[10px] font-extrabold text-slate-900 truncate">{selectedShop.upiId}</span>
                        <button
                          onClick={() => handleCopy(selectedShop.upiId, 'upi')}
                          className="px-2 py-0.5 bg-ocean/10 text-ocean hover:bg-ocean hover:text-white text-[8px] font-bold rounded-md transition-colors shrink-0"
                        >
                          {copiedUpi ? '✓' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-[8px] font-black uppercase text-slate-400 block">Manager Contact</span>
                      <div className="flex items-center justify-between bg-white p-1.5 rounded-lg border border-slate-200 mt-0.5 gap-2">
                        <span className="font-mono text-[10px] font-extrabold text-slate-900 truncate">{selectedShop.phone}</span>
                        <button
                          onClick={() => handleCopy(selectedShop.phone, 'phone')}
                          className="px-2 py-0.5 bg-slate-100 text-slate-700 hover:bg-slate-200 text-[8px] font-bold rounded-md transition-colors shrink-0"
                        >
                          {copiedPhone ? '✓' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href="tel:+917600304304"
                    className="py-2 px-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-extrabold uppercase flex items-center justify-center gap-1 transition-all shadow-sm"
                  >
                    <FiPhone className="text-emerald-400 text-xs" /> Call
                  </a>
                  <a
                    href={`https://wa.me/917600304304?text=${encodeURIComponent(
                      `Hi! I'm interested in buying "${product.name}" from your store.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-extrabold uppercase flex items-center justify-center gap-1 transition-all shadow-sm"
                  >
                    <FiMessageSquare className="text-xs" /> WhatsApp
                  </a>
                  <a
                    href={selectedShop.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-1 bg-ocean hover:bg-ocean-deep text-white rounded-xl text-[10px] font-extrabold uppercase flex items-center justify-center gap-1 transition-all shadow-sm"
                  >
                    <FiNavigation className="text-xs" /> Map
                  </a>
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
