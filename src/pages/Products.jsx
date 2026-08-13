import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiShoppingCart, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import ProductPurchaseStepper from '../components/ProductPurchaseStepper';

// ── Local product images ──────────────────────────────────────────────────────
import p1Img from '../assets/product1.jpeg';
import p1Desc from '../assets/product1_description.jpeg';
import p2Img from '../assets/product2.jpeg';
import p2Desc from '../assets/product2_description.jpeg';
import p3Img from '../assets/product3.jpg';
import p3Desc from '../assets/product3_description.jpeg';
import p4Img from '../assets/product4.jpg';
import p4Desc from '../assets/product4_description.jpeg';
import p5Img from '../assets/product5.jpg';
import p5Desc from '../assets/product5_description.jpeg';
import gummiComboImg from '../assets/gummies_combo_tiranga.png';

// ── Static product data with complete purchase options ─────────────────────────
const PRODUCTS = [
  // ── Independence Day Tiranga Gummies Combo ────────────────────────────────
  {
    id: 6,
    name: 'Tiranga Gummies Combo',
    tagline: 'All 3 Gummies · Saffron · White · Green — Celebrate Freedom!',
    category: 'Gummies',
    badge: '🎉 Ind. Offer',
    indOffer: true,
    isTirangaCombo: true,
    weight: '3 × 30 Gummies',
    price: 650,
    originalPrice: 897,
    discount: '27% OFF',
    rating: 5.0,
    reviewsCount: 80,
    image: gummiComboImg,
    descriptionImage: gummiComboImg,
    description:
      'Celebrate India\'s Independence Day with our exclusive Tiranga Gummies Combo — 3 gummies, 3 colours, 1 nation. Calcium+D2 (Saffron) · KidsVita (White) · HSN (Green). Together at a special patriotic price till 15th August!',
    ingredients: ['Calcium (Tricalcium Phosphate)', 'Vitamin D2', 'Ashwagandha', 'Echinacea', 'Biotin', 'Zinc', 'Vitamin C', 'Grape Seed Extract'],
    bgColor: '#f0fff4',
    isStoreOnly: true,
    offerEnds: '15 Aug 2026',
  },
  {
    id: 1,
    name: 'The wave-Intense Glowing Spa Salt',
    tagline: 'Reveal smoother, softer, more radiant-looking skin',
    category: 'Body Care',
    badge: 'Best Seller',
    indOffer: true,
    weight: '200g',
    rating: 4.9,
    reviewsCount: 1240,
    image: p2Img,
    descriptionImage: p2Desc,
    description:
      'Reveal smoother, softer, and more radiant-looking skin with our exfoliating spa salt.',
    ingredients: ['Sea Salt', 'Coconut Oil', 'Marine Algae'],
    benefits: [
      'Helps remove dead skin cells',
      'Leaves skin feeling soft and refreshed',
      'Supports a healthy-looking glow',
      'Suitable for regular body care routines'
    ],
    bgColor: '#e7f8fc',
    amazonUrl: 'https://www.amazon.in/Intense-Glowing-Himalayan-Crystal-Hyaluronic/dp/B0GXK8GZY6/ref=sr_1_6?dib=eyJ2IjoiMSJ9.59kd8IMGeNWSCf6mOYlLHLogOoH5BvMSN7utjgK7XB2kep-n3FDEcrBg06UZzH___fKvjEOvJZ9rHq76BuZ_dwb-unvmxJBOsTaIhbBpXqqynIKM50TJWuPYxFlbzIS3d4QGRDBRGftr7XXbkfaZt1KiZKmNT8rLkpw1Wlhl4UU.vmBxFnMLvnPfiTxzhOefy6_SpqItZeKHpKSFi7UHl-0&dib_tag=se&keywords=wave+glowing+spa+salt&qid=1785411749&sr=8-6',
    flipkartUrl: 'https://www.flipkart.com/wave-intense-glowing-spa-salt/p/itmccf5ddfe24351?pid=BSLHHVF88MDCTWRG&lid=LSTBSLHHVF88MDCTWRGI1KRTQ',
    smyttenUrl: 'https://smytten.com/shop/product/bath-bomb-and-salts/intense-glowing-spa-salt/TEW001AA100',
  },
  {
    id: 2,
    name: 'The wave-Dry Shampoo',
    tagline: 'Refresh your hair anytime, anywhere',
    category: 'Hair Care',
    badge: 'New',
    indOffer: true,
    weight: '100ml',
    rating: 4.8,
    reviewsCount: 890,
    image: p1Img,
    descriptionImage: p1Desc,
    description:
      'Refresh your hair anytime, anywhere.',
    ingredients: ['Vitamin E', 'Kaolin', 'Rice Starch'],
    benefits: [
      'Helps absorb excess oil',
      'Revives hair between washes',
      'Adds freshness and volume',
      'Convenient for busy lifestyles'
    ],
    bgColor: '#fff4eb',
    amazonUrl: 'https://www.amazon.in/Shampoo-Instant-Absorption-Vitamin-Kaolin/dp/B0GXG6CSP8/ref=sr_1_6?dib=eyJ2IjoiMSJ9.CGwSDtoGG05yA2qPxZIktAOHoor8J8Xh8OQfEubYKlQlE7kBRsoExpya2pknSydr0A_jZZi04HTxzKB7lDT2lmjoFfbfDpgtSWovGp9jwdG4oxVqX8C1ihcsAtL18O-a2p4p7ek4XejTvFq4BrpDk7swetTjjXMNNRNDs0tfSvtzsdGz3kYoUbN8KxuiVJjxAx86gcn7IoJR7p_sAW5SsRub0Vk_3soWaQA5aa6Z9d46dv5ZvPo48FE8szVaPqnljmqF7XRKgykt7NGvDIezhCFxSBh5_qIsAcED0WI_zKU.mUoroIv-q_zvp5n82bfja-Y1aEPybo62mx459T-S4jM&dib_tag=se&keywords=wave+dry+shampoo&qid=1785411551&sr=8-6',
    flipkartUrl: 'https://www.flipkart.com/wave-dry-shampoo/p/itm9c1fa91d97dba?pid=SMPHMHJQ5PKPHMS5&lid=LSTSMPHMHJQ5PKPHMS5B56GZ3',
    smyttenUrl: 'https://smytten.com/shop/product/shampoo/dry-shampoo/TEW002AA100',
  },
  {
    id: 3,
    name: 'The wave-Calcium + Vitamin D2 Gummies',
    tagline: 'Support your daily calcium and vitamin D2 intake',
    category: 'Gummies',
    badge: 'Zero Sugar',
    indOffer: true,
    weight: '30 Gummies',
    price: 270,
    originalPrice: 299,
    discount: '10% OFF',
    rating: 4.9,
    reviewsCount: 1560,
    image: p3Img,
    descriptionImage: p3Desc,
    description:
      'A tasty way to support your daily calcium and vitamin D2 intake.',
    ingredients: ['Calcium (Tricalcium Phosphate)', 'Vitamin D2', 'Wheat Dextrin', 'Inulin'],
    benefits: [
      'Supports bone health',
      'Helps maintain normal muscle function',
      'Easy and enjoyable to consume'
    ],
    bgColor: '#fffbea',
    isStoreOnly: true,
    // amazonUrl: 'https://www.amazon.in/s?k=wave+calcium+gummies',
    // flipkartUrl: 'https://www.flipkart.com/search?q=wave+calcium+gummies',
    // smyttenUrl: 'https://smytten.com/search?q=wave+calcium+gummies',
  },
  {
    id: 4,
    name: 'The wave-KidsVita Gummies',
    tagline: 'Daily nutritional support to help complement a balanced lifestyle',
    category: 'Gummies',
    badge: 'Daily Care',
    indOffer: true,
    weight: '30 Gummies',
    price: 270,
    originalPrice: 299,
    discount: '10% OFF',
    rating: 4.9,
    reviewsCount: 2100,
    image: p4Img,
    descriptionImage: p4Desc,
    description:
      'Daily nutritional support to help complement a balanced lifestyle.',
    ingredients: ['Ashwagandha', 'Echinacea', 'Alfalfa', 'Vitamin C', 'Vitamin D2', 'Vitamin B-Complex'],
    benefits: [
      'Contains essential vitamins',
      'Supports overall wellness',
      'Convenient daily supplementation'
    ],
    bgColor: '#fff0f5',
    isStoreOnly: true,
    // amazonUrl: 'https://www.amazon.in/s?k=wave+multivitamin+gummies',
    // flipkartUrl: 'https://www.flipkart.com/search?q=wave+multivitamin+gummies',
    // smyttenUrl: 'https://smytten.com/search?q=wave+multivitamin+gummies',
  },
  {
    id: 5,
    name: 'The wave-Hair, Skin & Nails Gummies',
    tagline: 'Nourish your beauty routine from within',
    category: 'Gummies',
    badge: 'HSN',
    indOffer: true,
    weight: '30 Gummies',
    price: 270,
    originalPrice: 299,
    discount: '10% OFF',
    rating: 5.0,
    reviewsCount: 3400,
    image: p5Img,
    descriptionImage: p5Desc,
    description:
      'A delicious daily supplement designed to support your beauty routine from within.',
    ingredients: ['Sesbania Grandiflora', 'Grape Seed Extract', 'Vitamin B7 (Biotin)', 'Zinc', 'Vitamin C'],
    benefits: [
      'Supports healthy hair',
      'Supports healthy skin',
      'Supports healthy nails',
      'Easy-to-take gummy format'
    ],
    bgColor: '#fff0f5',
    isStoreOnly: true,
    // amazonUrl: 'https://www.amazon.in/s?k=wave+hair+skin+nails+gummies',
    // flipkartUrl: 'https://www.flipkart.com/search?q=wave+hair+skin+nails+gummies',
    // smyttenUrl: 'https://smytten.com/search?q=wave+hair+skin+nails+gummies',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
const Products = () => {
  const location = useLocation();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isStepperOpen, setIsStepperOpen] = useState(false);

  useEffect(() => {
    if (location.state?.selectedProductName) {
      const match = PRODUCTS.find(p => p.name === location.state.selectedProductName);
      if (match) {
        setSelectedProduct(match);
        setIsStepperOpen(true);
      }
    }
  }, [location.state]);

  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  const filteredProducts = PRODUCTS.filter(p => {
    const matchCat = filter === 'All' || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openPurchaseModal = (product, e) => {
    if (e) e.stopPropagation();
    setSelectedProduct(product);
    setIsStepperOpen(true);
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-pearl min-h-screen">

      {/* ─── Header ─── */}
      <section className="relative py-6 md:py-10 px-6 md:px-12 overflow-hidden bg-[radial-gradient(circle_at_top_left,_#d6f3fb_0%,_#FDFCFB_100%)]">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-ocean/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <span className="section-badge">Our Products</span>
            <h1 className="mb-4 text-slate-900 tracking-tighter text-3xl md:text-4xl font-black">
              Beauty & <span className="text-gradient">Wellness Range</span>
            </h1>
            <p className="text-sm md:text-base text-slate-500 max-w-xl font-medium leading-relaxed">
              Shop on your favorite platforms — <strong>Amazon</strong>, <strong>Flipkart</strong>, <strong>Smytten</strong>, or buy from a <strong>Nearby Authorized Store</strong> with instant QR payment!
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Filter & Search Bar ─── */}
      <section className="sticky top-[70px] z-50 px-4 md:px-12 mb-8 md:mb-12">
        <div className="container-custom">
          <div className="glass-card p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl bg-white/80 backdrop-blur-md rounded-2xl border border-slate-100">
            {/* Search Input */}
            <div className="relative group w-full md:w-auto order-1 md:order-2">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean group-focus-within:text-coral transition-colors text-sm" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                className="bg-slate-50 border border-slate-200/80 rounded-full pl-10 pr-5 py-2.5 text-xs font-bold focus:outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/10 transition-all w-full md:w-64"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 w-full md:w-auto order-2 md:order-1">
              <FiFilter className="text-ocean shrink-0 ml-1 text-sm" />
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${filter === cat
                    ? 'bg-ocean text-white shadow-md shadow-ocean/20 scale-105'
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-ocean hover:text-ocean'
                    }`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ─── Products Grid — All Products ─── */}
      <section className="px-4 sm:px-6 md:px-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 items-stretch">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ delay: i * 0.05, duration: 0.4, type: 'spring', stiffness: 180, damping: 20 }}
                  key={product.id}
                  onClick={(e) => openPurchaseModal(product, e)}
                  className="flex flex-col group bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-lg transition-all relative overflow-hidden cursor-pointer"
                >
                  {/* Top Image Box */}
                  <div
                    onClick={(e) => openPurchaseModal(product, e)}
                    className="relative h-56 sm:h-64 rounded-xl overflow-hidden flex items-center justify-center p-4 bg-slate-50 border border-slate-100 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
                    />

                    {/* Independence Day Flag Badge */}
                    {product.indOffer && (
                      <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-[#FF9933]/30">
                        <span className="text-[10px]">🇮🇳</span>
                        <span className="text-[7px] font-black uppercase tracking-wider text-[#FF7B00]">
                          {product.isTirangaCombo ? 'Ind. Offer' : 'Ind. Offer'}
                        </span>
                      </div>
                    )}

                    {/* Category / normal Badge */}
                    {product.badge && !product.indOffer && (
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2.5 py-0.5 rounded-full text-[8px] font-black text-ocean uppercase tracking-wider shadow-sm">
                        {product.badge}
                      </div>
                    )}


                    {/* Weight Chip */}
                    <div className="absolute bottom-2 right-2 bg-slate-900/80 text-white backdrop-blur px-2 py-0.5 rounded-full text-[8px] font-bold">
                      {product.weight}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="pt-3 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-1.5 mb-0.5">
                      <span className="text-[8px] font-black text-ocean/80 uppercase tracking-widest">
                        {product.category}
                      </span>
                      <span className="text-amber-500 font-extrabold text-[11px]">
                        ★ {product.rating}
                      </span>
                    </div>

                    <h3
                      onClick={(e) => openPurchaseModal(product, e)}
                      className="text-sm font-extrabold text-slate-900 tracking-tight leading-snug mb-0.5 cursor-pointer hover:text-ocean transition-colors"
                    >
                      {product.name}
                    </h3>

                    <p className="text-slate-500 text-[11px] leading-snug line-clamp-1 mb-2 font-medium">
                      {product.tagline}
                    </p>

                    {/* Compact Buying Options Channels Indicator */}
                    <div className="my-1.5 p-1.5 bg-slate-50/80 rounded-lg border border-slate-100 flex items-center justify-between">
                      <span className="text-slate-400 font-extrabold text-[8px] uppercase tracking-wider">Buy via:</span>
                      {product.isStoreOnly ? (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100/90 text-emerald-800 font-black text-[8px] uppercase tracking-wider flex items-center gap-1 shadow-sm">
                          <FiMapPin className="text-[10px] text-emerald-600 animate-bounce" /> In-Store Only
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          {/* Amazon Symbol */}
                          <div className="w-6 h-6 rounded-md bg-[#141920] flex items-center justify-center shadow-sm border border-slate-800 hover:scale-110 transition-transform cursor-pointer" title="Buy on Amazon">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 32 32" fill="none">
                              <path d="M10 12.5c0-1.8 1.1-2.5 2.5-2.5 1.3 0 1.8.7 1.8 2v4.5c0 .8.1 1.2.5 1.2.4 0 .8-.5 1-1l.7 1c-.5 1.1-1.3 1.7-2.3 1.7-1.1 0-1.6-.7-1.6-1.7v-.5c-.6.9-1.4 1.4-2.5 1.4-1.6 0-2.6-1.1-2.6-2.5 0-1.8 1.2-2.7 3.3-2.7h1.2v-.4c0-.7-.4-1.1-1.2-1.1-.7 0-1.2.3-1.4.9l-1.6-.8zm2.8 3.3v-.8h-1c-1 0-1.5.4-1.5 1.2 0 .6.4 1 1 1 .7 0 1.5-.5 1.5-1.4z" fill="#FFFFFF" />
                              <path d="M7 21.5c4 2.5 11 3 16 0M21 19.5c.8.8 1.8 1.5 2.5 1.8-.2-.8-.6-1.8-.8-2.5" stroke="#FF9900" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>

                          {/* Flipkart Symbol */}
                          <div className="w-6 h-6 rounded-md bg-[#2874F0] flex items-center justify-center shadow-sm border border-blue-400/30 hover:scale-110 transition-transform cursor-pointer" title="Buy on Flipkart">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 32 32" fill="none">
                              <path d="M9 10h14l-1.5 14h-11L9 10z" fill="#FFE11B" />
                              <path d="M13 10V7.5C13 5.8 14.3 4.5 16 4.5s3 1.3 3 3V10" stroke="#FFE11B" strokeWidth="2.5" strokeLinecap="round" />
                              <text x="16" y="20.5" fontSize="12" fontWeight="900" fill="#2874F0" textAnchor="middle" fontFamily="sans-serif">f</text>
                            </svg>
                          </div>

                          {/* Smytten Symbol */}
                          <div className="w-6 h-6 rounded-md bg-[#E91E63] flex items-center justify-center shadow-sm border border-pink-400/30 hover:scale-110 transition-transform cursor-pointer" title="Buy on Smytten">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 32 32" fill="none">
                              <path d="M16 5l3.2 7L26 13l-5 5L22.5 25L16 21.5L9.5 25L11 18l-5-5l6.8-1L16 5z" fill="#FFFFFF" />
                              <text x="16" y="19" fontSize="10" fontWeight="900" fill="#E91E63" textAnchor="middle" fontFamily="sans-serif">S</text>
                            </svg>
                          </div>

                          {/* Nearby Shop Symbol */}
                          <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center shadow-sm border border-emerald-400 hover:scale-110 transition-transform cursor-pointer" title="Buy from Nearby Shop">
                            <svg className="w-3.5 h-3.5" viewBox="0 0 32 32" fill="none">
                              <path d="M7 14l2-6h14l2 6v10a2 2 0 01-2 2H9a2 2 0 01-2-2V14z" fill="#FFFFFF" />
                              <path d="M6 14h20" stroke="#10B981" strokeWidth="2" />
                              <path d="M13 22v-5h6v5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                              <circle cx="16" cy="10" r="1.5" fill="#10B981" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Independence Day offer-ends label - highlighted and shown for all products */}
                    <div className="flex items-center justify-center gap-2 mt-2 px-3 py-2 rounded-lg bg-gradient-to-r from-[#FF9933]/25 via-amber-50 to-[#138808]/25 border-2 border-[#FF9933] shadow-md animate-pulse">
                      <span className="text-[10px] filter drop-shadow">⏰</span>
                      <span className="text-[9.5px] font-black text-[#e07000] uppercase tracking-widest">
                        OFFER TILL 15 AUG 2026
                      </span>
                    </div>

                    {/* Bottom Pricing & Buy Button */}
                    <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {product.price && (
                          <span className="text-slate-900 font-extrabold text-xs sm:text-sm">
                            ₹{product.price}
                          </span>
                        )}
                        {product.originalPrice && (
                          <span className="text-slate-400 line-through text-[10px] sm:text-xs font-semibold">
                            ₹{product.originalPrice}
                          </span>
                        )}
                        {product.discount && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[8px] font-black uppercase tracking-wider border border-emerald-200/60">
                            {product.discount}
                          </span>
                        )}
                      </div>

                      {/* Buy Options Trigger Button */}
                      <button
                        onClick={(e) => openPurchaseModal(product, e)}
                        className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider text-white bg-ocean hover:bg-ocean-deep transition-all shadow-sm active:scale-95"
                      >
                        <FiShoppingCart className="text-[11px] text-white" />
                        Buy Options
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <div className="col-span-3 py-20 text-center text-slate-400 font-semibold">
                No products found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Clean Stepper Purchase Modal ─── */}
      <ProductPurchaseStepper
        product={selectedProduct}
        isOpen={isStepperOpen}
        onClose={() => setIsStepperOpen(false)}
      />

    </div>
  );
};

export default Products;
