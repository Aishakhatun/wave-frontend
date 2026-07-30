import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiMapPin, 
  FiPhone, 
  FiMessageSquare, 
  FiCopy, 
  FiCheck, 
  FiNavigation, 
  FiClock, 
  FiCheckCircle, 
  FiShare2,
  FiZap,
  FiShoppingBag
} from 'react-icons/fi';

// Sample nearby shops data
const NEARBY_SHOPS = [
  {
    id: 'shop-1',
    name: 'The Wave Organic Store - MG Road',
    address: '102 Premier Plaza, MG Road, Central Mall Area, Bengaluru - 560001',
    distance: '1.2 km away',
    timing: '9:00 AM - 9:30 PM (Open Today)',
    phone: '+91 76003 04304',
    rawPhone: '7600304304',
    upiId: 'wave.mgroad@okaxis',
    owner: 'Rajesh Kumar (Store Manager)',
    mapUrl: 'https://maps.google.com/?q=MG+Road+Bengaluru',
    rating: '4.9 ★',
    inStock: true
  },
  {
    id: 'shop-2',
    name: 'Wave Beauty & Wellness Hub - Indiranagar',
    address: '458 100ft Road, Opposite Metro Station, Indiranagar, Bengaluru - 560038',
    distance: '3.4 km away',
    timing: '10:00 AM - 10:00 PM (Open Today)',
    phone: '+91 98765 88990',
    rawPhone: '9876588990',
    upiId: 'wave.indiranagar@paytm',
    owner: 'Priya Sharma (Wellness Specialist)',
    mapUrl: 'https://maps.google.com/?q=Indiranagar+Bengaluru',
    rating: '4.8 ★',
    inStock: true
  },
  {
    id: 'shop-3',
    name: 'Wave Health Outlet - Koramangala',
    address: '88 5th Block, Commercial Complex, Koramangala, Bengaluru - 560095',
    distance: '4.8 km away',
    timing: '9:30 AM - 9:00 PM (Open Today)',
    phone: '+91 98765 11223',
    rawPhone: '9876511223',
    upiId: 'wave.koramangala@ybl',
    owner: 'Amit Patel (Store Partner)',
    mapUrl: 'https://maps.google.com/?q=Koramangala+Bengaluru',
    rating: '4.9 ★',
    inStock: true
  }
];

export default function NearbyShopModal({ isOpen, onClose, product }) {
  const [selectedShop, setSelectedShop] = useState(NEARBY_SHOPS[0]);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeTab, setActiveTab] = useState('pay'); // 'pay' | 'info'

  if (!isOpen) return null;

  const productPrice = product?.price || 499;
  const productName = product?.name || 'The Wave Product';

  // Copy helper
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

  // Generate UPI payment string for QR code representation
  const upiPayString = `upi://pay?pa=${selectedShop.upiId}&pn=WaveStore&am=${productPrice}&cu=INR&tn=Order_${encodeURIComponent(productName)}`;

  // SVG QR Code representation (High resolution, stylized with brand colors & UPI badge)
  const renderQRCode = () => (
    <div className="relative p-4 bg-white rounded-3xl border-2 border-emerald-500/20 shadow-xl flex flex-col items-center group">
      {/* Top Banner inside QR frame */}
      <div className="w-full flex items-center justify-between px-2 mb-3 border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[10px] font-black tracking-wider uppercase text-emerald-700">UPI Instant Pay</span>
        </div>
        <span className="text-xs font-black text-slate-900">₹{productPrice}</span>
      </div>

      {/* Styled QR Code Visual */}
      <div className="relative p-3 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-inner">
        {/* Custom Decorative QR Pattern */}
        <svg className="w-48 h-48 sm:w-52 sm:h-52" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background Grid */}
          <rect width="200" height="200" rx="16" fill="#0f172a" />
          
          {/* Top Left Finder Pattern */}
          <rect x="15" y="15" width="45" height="45" rx="8" fill="#10B981" />
          <rect x="23" y="23" width="29" height="29" rx="4" fill="#0f172a" />
          <rect x="30" y="30" width="15" height="15" rx="2" fill="#34D399" />

          {/* Top Right Finder Pattern */}
          <rect x="140" y="15" width="45" height="45" rx="8" fill="#10B981" />
          <rect x="148" y="23" width="29" height="29" rx="4" fill="#0f172a" />
          <rect x="155" y="30" width="15" height="15" rx="2" fill="#34D399" />

          {/* Bottom Left Finder Pattern */}
          <rect x="15" y="140" width="45" height="45" rx="8" fill="#10B981" />
          <rect x="23" y="148" width="29" height="29" rx="4" fill="#0f172a" />
          <rect x="30" y="155" width="15" height="15" rx="2" fill="#34D399" />

          {/* Data Pattern Dots */}
          <g fill="#F8FAFC" opacity="0.95">
            {/* Row 1-3 */}
            <rect x="70" y="20" width="10" height="10" rx="2" />
            <rect x="90" y="20" width="10" height="10" rx="2" />
            <rect x="110" y="20" width="10" height="10" rx="2" />
            <rect x="70" y="40" width="10" height="10" rx="2" fill="#38BDF8" />
            <rect x="100" y="40" width="10" height="10" rx="2" />
            <rect x="120" y="40" width="10" height="10" rx="2" />
            
            {/* Center Area */}
            <rect x="30" y="70" width="10" height="10" rx="2" />
            <rect x="50" y="70" width="10" height="10" rx="2" fill="#38BDF8" />
            <rect x="70" y="70" width="10" height="10" rx="2" />
            <rect x="90" y="70" width="10" height="10" rx="2" />
            <rect x="110" y="70" width="10" height="10" rx="2" />
            <rect x="130" y="70" width="10" height="10" rx="2" />
            <rect x="150" y="70" width="10" height="10" rx="2" fill="#38BDF8" />
            <rect x="170" y="70" width="10" height="10" rx="2" />

            <rect x="20" y="90" width="10" height="10" rx="2" />
            <rect x="40" y="90" width="10" height="10" rx="2" />
            <rect x="60" y="90" width="10" height="10" rx="2" />
            <rect x="130" y="90" width="10" height="10" rx="2" />
            <rect x="160" y="90" width="10" height="10" rx="2" fill="#34D399" />

            {/* Row 5-7 */}
            <rect x="20" y="110" width="10" height="10" rx="2" fill="#38BDF8" />
            <rect x="40" y="110" width="10" height="10" rx="2" />
            <rect x="70" y="110" width="10" height="10" rx="2" />
            <rect x="90" y="110" width="10" height="10" rx="2" />
            <rect x="110" y="110" width="10" height="10" rx="2" />
            <rect x="140" y="110" width="10" height="10" rx="2" />
            <rect x="170" y="110" width="10" height="10" rx="2" />

            <rect x="70" y="130" width="10" height="10" rx="2" />
            <rect x="100" y="130" width="10" height="10" rx="2" />
            <rect x="120" y="130" width="10" height="10" rx="2" fill="#38BDF8" />
            <rect x="150" y="130" width="10" height="10" rx="2" />

            {/* Bottom Right Area */}
            <rect x="70" y="150" width="10" height="10" rx="2" fill="#34D399" />
            <rect x="90" y="150" width="10" height="10" rx="2" />
            <rect x="110" y="150" width="10" height="10" rx="2" />
            <rect x="130" y="150" width="10" height="10" rx="2" />
            <rect x="150" y="150" width="10" height="10" rx="2" />
            <rect x="170" y="150" width="10" height="10" rx="2" />

            <rect x="70" y="170" width="10" height="10" rx="2" />
            <rect x="100" y="170" width="10" height="10" rx="2" />
            <rect x="130" y="170" width="10" height="10" rx="2" fill="#38BDF8" />
            <rect x="160" y="170" width="10" height="10" rx="2" />
          </g>

          {/* Center Brand Logo Overlay */}
          <rect x="80" y="80" width="40" height="40" rx="10" fill="#059669" stroke="#ffffff" strokeWidth="3" />
          <path d="M92 93C95 90 105 90 108 93C110 95 110 102 108 105C104 110 96 110 92 105Z" fill="white" />
          <text x="100" y="104" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">WAVE</text>
        </svg>

        {/* Scan effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 pointer-events-none animate-pulse-soft rounded-2xl" />
      </div>

      {/* Supported UPI Apps Row */}
      <div className="mt-3 flex items-center justify-center gap-2 pt-2 border-t border-slate-100 w-full">
        <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Pay with:</span>
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[9px] font-extrabold">GPay</span>
          <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-[9px] font-extrabold">PhonePe</span>
          <span className="px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded text-[9px] font-extrabold">Paytm</span>
          <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded text-[9px] font-extrabold">BHIM</span>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[3000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl sm:rounded-[36px] shadow-2xl overflow-hidden z-10 border border-slate-100 my-auto"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 sm:p-8 text-white overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-ocean/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-[10px] font-black uppercase tracking-widest mb-3">
                  <FiMapPin className="text-emerald-400 animate-bounce" />
                  Direct Nearby Purchase
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                  Buy from Nearby Authorized Shop
                </h2>
                <p className="text-slate-300 text-xs mt-1 font-medium max-w-md">
                  Purchase directly from local stores for instant pickup, direct shop support & seamless UPI payments.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Selected Product Pill */}
            {product && (
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FiShoppingBag className="text-emerald-400" />
                  <span className="font-bold text-slate-200 truncate max-w-[220px] sm:max-w-xs">{productName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 line-through text-[11px]">₹{productPrice + 200}</span>
                  <span className="font-black text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                    ₹{productPrice}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">

            {/* Shop Selector Dropdown / Grid */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                Select Nearest Partner Shop
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {NEARBY_SHOPS.map((shop) => {
                  const isSelected = selectedShop.id === shop.id;
                  return (
                    <button
                      key={shop.id}
                      onClick={() => setSelectedShop(shop)}
                      className={`text-left p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                          : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                          {shop.distance}
                        </span>
                        {isSelected && <FiCheckCircle className="text-emerald-600 text-sm" />}
                      </div>
                      <h4 className="font-extrabold text-xs text-slate-900 leading-tight mb-1 line-clamp-1">
                        {shop.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {shop.rating} rating
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Shop Details Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h3 className="font-black text-sm text-slate-900">{selectedShop.name}</h3>
                </div>
                <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                  <FiMapPin className="text-emerald-600 shrink-0" />
                  {selectedShop.address}
                </p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <FiClock className="text-slate-400 shrink-0" />
                  {selectedShop.timing}
                </p>
              </div>

              {/* Get Directions Link */}
              <a
                href={selectedShop.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-sm group"
              >
                <FiNavigation className="text-emerald-600 group-hover:rotate-45 transition-transform" />
                Directions
              </a>
            </div>

            {/* Main Interactive Grid: QR Code + Payment & Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

              {/* Left Column: Payment QR Code */}
              <div className="flex flex-col items-center justify-center bg-emerald-900/5 rounded-3xl p-5 border border-emerald-500/10">
                <div className="text-center mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    Direct Store Payment
                  </span>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-2">
                    Scan QR Code to Pay Shop
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Use GPay, PhonePe, Paytm, or any UPI app
                  </p>
                </div>

                {/* Render the Custom QR Code */}
                {renderQRCode()}

                <p className="text-[10px] text-slate-400 font-medium text-center mt-3 flex items-center justify-center gap-1">
                  <FiZap className="text-amber-500" />
                  Instant payment confirmation at shop counter
                </p>
              </div>

              {/* Right Column: Shop Phone, UPI ID & Direct Contact Actions */}
              <div className="flex flex-col justify-between space-y-4">

                {/* UPI ID Field with Copy Button */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    Shop UPI ID / VPA
                  </label>
                  <div className="flex items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="font-mono text-xs font-bold text-slate-900 select-all">
                      {selectedShop.upiId}
                    </span>
                    <button
                      onClick={() => handleCopy(selectedShop.upiId, 'upi')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                        copiedUpi
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      }`}
                    >
                      {copiedUpi ? (
                        <>
                          <FiCheck className="text-sm" /> Copied!
                        </>
                      ) : (
                        <>
                          <FiCopy className="text-sm" /> Copy UPI
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Shop Owner Phone Number with Copy Button */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      Shop Owner / Manager Contact
                    </label>
                    <span className="text-[10px] font-bold text-slate-500">
                      {selectedShop.owner}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="font-mono text-xs font-bold text-slate-900 select-all">
                      {selectedShop.phone}
                    </span>
                    <button
                      onClick={() => handleCopy(selectedShop.phone, 'phone')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                        copiedPhone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                      }`}
                    >
                      {copiedPhone ? (
                        <>
                          <FiCheck className="text-sm" /> Copied!
                        </>
                      ) : (
                        <>
                          <FiCopy className="text-sm" /> Copy Number
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Direct Action Buttons: Call & WhatsApp */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {/* Call Button */}
                  <a
                    href={`tel:${selectedShop.rawPhone}`}
                    className="flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md active:scale-95 text-center"
                  >
                    <FiPhone className="text-emerald-400 text-sm" />
                    Call Shop
                  </a>

                  {/* WhatsApp Message Button */}
                  <a
                    href={`https://wa.me/91${selectedShop.rawPhone}?text=${encodeURIComponent(
                      `Hi! I am interested in purchasing "${productName}" from your shop (${selectedShop.name}). Please confirm availability.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-emerald-600/20 active:scale-95 text-center"
                  >
                    <FiMessageSquare className="text-white text-sm" />
                    WhatsApp
                  </a>
                </div>

              </div>

            </div>

            {/* Bottom Info Banner */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-black">
                !
              </div>
              <p className="text-[11px] text-amber-900 font-medium leading-relaxed">
                <strong>In-Store Purchase Note:</strong> Show your payment confirmation screenshot or mention your order to store staff upon arrival for instant billing and pickup.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
