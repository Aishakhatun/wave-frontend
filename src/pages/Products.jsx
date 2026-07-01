import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSearch, FiFilter, FiChevronLeft, FiChevronRight, FiMapPin } from 'react-icons/fi';

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

// ── Static product data ───────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: 'The wave-Intense Glowing Spa Salt',
    tagline: 'Reveal smoother, softer, more radiant-looking skin',
    category: 'Body Care',
    badge: 'Best Seller',
    weight: '200g',
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
    buyUrl: 'https://www.flipkart.com/wave-intense-glowing-spa-salt/p/itmccf5ddfe24351?pid=BSLHHVF88MDCTWRG&lid=LSTBSLHHVF88MDCTWRGI1KRTQ&marketplace=FLIPKART&q=wave+spa+salt&store=g9b%2F5nz%2Fb1b%2Fces&srno=s_1_7&otracker=search&otracker1=search&fm=Search&iid=28cbc2ca-a33a-4e0a-b5d9-feb28e8f2330.BSLHHVF88MDCTWRG.SEARCH&ppt=sp&ppn=sp&ssid=x6peoyo1r40000001781982828590&qH=7c6d920bcb584bd5&ov_redirect=true',
  },
  {
    id: 2,
    name: 'The wave-Dry Shampoo',
    tagline: 'Refresh your hair anytime, anywhere',
    category: 'Hair Care',
    badge: 'New',
    weight: '150ml',
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
    buyUrl: 'https://www.flipkart.com/wave-dry-shampoo/p/itm9c1fa91d97dba?pid=SMPHMHJQ5PKPHMS5&lid=LSTSMPHMHJQ5PKPHMS5B56GZ3&marketplace=FLIPKART&q=wave+dry+shampoo&store=g9b%2Flcf%2Fqqm%2Ft36&srno=s_1_2&otracker=search&otracker1=search&fm=Search&iid=96e7634f-3f5d-4af6-92b4-e3127db5f437.SMPHMHJQ5PKPHMS5.SEARCH&ppt=sp&ppn=sp&ssid=fw9jh013yo0000001781982924416&qH=f41ef8a352c44c58&ov_redirect=true',
  },
  {
    id: 3,
    name: 'The wave-Calcium + Vitamin D Gummies',
    tagline: 'Support your daily calcium and vitamin D intake',
    category: 'Gummies',
    badge: 'Zero Sugar',
    weight: '30 Gummies',
    image: p3Img,
    descriptionImage: p3Desc,
    description:
      'A tasty way to support your daily calcium and vitamin D intake.',
    ingredients: ['Calcium (Tricalcium Phosphate)', 'Vitamin D2', 'Wheat Dextrin', 'Inulin'],
    benefits: [
      'Supports bone health',
      'Helps maintain normal muscle function',
      'Easy and enjoyable to consume'
    ],
    bgColor: '#fffbea',
  },
  {
    id: 4,
    name: 'The wave-Multivitamin Gummies',
    tagline: 'Daily nutritional support to help complement a balanced lifestyle',
    category: 'Gummies',
    badge: 'Daily Care',
    weight: '30 Gummies',
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
  },
  {
    id: 5,
    name: 'The wave-Hair, Skin & Nails Gummies',
    tagline: 'Nourish your beauty routine from within',
    category: 'Gummies',
    badge: 'HSN',
    weight: '30 Gummies',
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
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
const Products = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImg, setCurrentImg] = useState(0); // 0 = product img, 1 = desc img

  useEffect(() => {
    if (!selectedProduct) setCurrentImg(0);
  }, [selectedProduct]);

  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  const filteredProducts = PRODUCTS.filter(p => {
    const matchCat = filter === 'All' || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Images shown in modal carousel: product image + description image
  const modalImages = selectedProduct
    ? [selectedProduct.image, selectedProduct.descriptionImage]
    : [];

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-pearl min-h-screen">

      {/* ─── Header ─── */}
      <section className="relative py-10 px-6 md:px-12 overflow-hidden bg-[radial-gradient(circle_at_top_left,_#d6f3fb_0%,_#FDFCFB_100%)]">
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
              From exfoliating spa salts and dry shampoos to nourishing gummies — shop our range of thoughtfully crafted beauty and wellness products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Filter Bar ─── */}
      <section className="sticky top-[80px] z-50 px-4 md:px-12 mb-16">
        <div className="container-custom">
          <div className="glass-card p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl bg-white/60">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2 w-full md:w-auto">
              <FiFilter className="text-ocean shrink-0 ml-2" />
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`whitespace-nowrap px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat
                      ? 'bg-ocean text-white shadow-xl shadow-ocean/20 scale-105'
                      : 'bg-white text-slate-500 border border-ocean/10 hover:border-ocean hover:text-ocean'
                    }`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative group w-full md:w-auto">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-ocean group-focus-within:text-coral transition-colors" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                className="bg-white border border-ocean/10 rounded-full pl-12 pr-6 py-4 text-xs font-bold focus:outline-none focus:border-ocean focus:ring-4 focus:ring-ocean/5 transition-all w-full md:w-72"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Grid — 4 columns ─── */}
      <section className="px-6 md:px-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 items-start">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.06, duration: 0.6 }}
                  key={product.id}
                  className="flex flex-col group cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Image card */}
                  <div
                    className="relative h-72 rounded-[40px] overflow-hidden transition-transform duration-700 group-hover:scale-[1.03] flex items-center justify-center p-4 bg-white border border-slate-100 shadow-sm"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105 drop-shadow-xl"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-5 left-5 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[9px] font-bold text-ocean uppercase tracking-[2px] shadow-sm">
                        {product.badge}
                      </div>
                    )}


                  </div>

                  {/* Info */}
                  <div className="pt-5 px-2 flex flex-col">
                    <span className="text-[9px] font-black text-ocean/60 uppercase tracking-[3px] mb-1">
                      {product.category}
                    </span>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="text-[18px] font-extrabold text-slate-900 font-jakarta tracking-tight leading-tight">
                        {product.name}
                      </h3>
                      {product.buyUrl ? (
                        <a
                          href={product.buyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="shrink-0 group/btn relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[1.5px] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg"
                          style={{
                            background: 'linear-gradient(135deg, #2874f0 0%, #1a5fd4 100%)',
                            boxShadow: '0 4px 15px rgba(40,116,240,0.35)',
                            color: '#fff',
                          }}
                        >
                          <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3.5 6H20.5M16 10a4 4 0 01-8 0" />
                            <path d="M7 2v4M17 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
                          </svg>
                          Buy Now
                        </a>
                      ) : (
                        <div className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-2xl border border-ocean/20 bg-ocean/5">
                          <FiMapPin className="text-ocean text-[10px] shrink-0" />
                          <span className="text-[9px] font-black text-ocean uppercase tracking-[1.5px] whitespace-nowrap">
                            In Store Only
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <div className="col-span-4 py-24 text-center text-slate-400 font-semibold">
                No products found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Modal ─── */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-md"
              onClick={() => setSelectedProduct(null)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-white rounded-t-[36px] sm:rounded-[40px] shadow-[0_-20px_80px_rgba(26,143,181,0.18)] flex flex-col lg:flex-row max-h-[93vh] overflow-hidden"
            >
              {/* Mobile Pull Bar */}
              <div className="lg:hidden flex justify-center pt-3 pb-1 absolute top-0 left-0 right-0 z-30">
                <div className="w-10 h-1 bg-slate-200 rounded-full" />
              </div>

              {/* Close */}
              <button
                className="absolute top-5 right-5 w-9 h-9 bg-white/95 backdrop-blur rounded-full flex items-center justify-center text-slate-400 shadow-lg z-20 hover:scale-110 hover:text-ocean transition-all"
                onClick={() => setSelectedProduct(null)}
              >
                <FiX className="text-base" />
              </button>

              {/* Image Section */}
              <div
                className="w-full lg:w-[42%] relative flex items-center justify-center shrink-0 overflow-hidden bg-white"
                style={{ minHeight: '220px' }}
              >
                {/* Subtle color accent — bottom only, small */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1.5 opacity-60"
                  style={{ background: selectedProduct.bgColor }}
                />

                {/* Slide label */}
                <div className="absolute top-8 left-5 lg:top-6 lg:left-6 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[8px] font-black text-ocean uppercase tracking-[2px] shadow-sm z-10">
                  {currentImg === 0 ? '📦 Product' : '🔍 Details'}
                </div>

                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImg}
                    src={modalImages[currentImg]}
                    alt={selectedProduct.name}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.35 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, { offset }) => {
                      if (offset.x < -50 && currentImg < modalImages.length - 1)
                        setCurrentImg(c => c + 1);
                      if (offset.x > 50 && currentImg > 0)
                        setCurrentImg(c => c - 1);
                    }}
                    className="w-full object-contain drop-shadow-xl cursor-grab active:cursor-grabbing relative z-10 py-6 px-10 max-h-[200px] sm:max-h-[260px] lg:max-h-[460px]"
                  />
                </AnimatePresence>

                {/* Nav Arrows */}
                <button
                  onClick={() => currentImg > 0 && setCurrentImg(c => c - 1)}
                  className={`absolute left-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-ocean shadow-md transition-all z-10 ${currentImg === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'}`}
                >
                  <FiChevronLeft />
                </button>
                <button
                  onClick={() => currentImg < modalImages.length - 1 && setCurrentImg(c => c + 1)}
                  className={`absolute right-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-ocean shadow-md transition-all z-10 ${currentImg === modalImages.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'}`}
                >
                  <FiChevronRight />
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 flex gap-1.5 z-10">
                  {modalImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImg(idx)}
                      className={`rounded-full transition-all duration-300 ${currentImg === idx ? 'w-5 h-1.5 bg-ocean' : 'w-1.5 h-1.5 bg-ocean/30'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Info Panel */}
              <div className="w-full lg:w-[58%] flex flex-col overflow-y-auto">
                <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-5 flex-1">

                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-ocean/10 text-ocean text-[9px] font-black uppercase tracking-[2px] rounded-full">
                        {selectedProduct.category}
                      </span>
                      {selectedProduct.badge && (
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-[2px] rounded-full">
                          {selectedProduct.badge}
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-1">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-ocean/80 text-[13px] font-semibold italic leading-snug">
                      "{selectedProduct.tagline}"
                    </p>
                  </div>

                  {/* Weight chip */}
                  <div className="flex items-center gap-2">
                    <span className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      {selectedProduct.weight}
                    </span>
                  </div>

                  {/* About */}
                  <div className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[3px] mb-1.5">About</p>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Ingredients */}
                  <div>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[3px] mb-2.5">Key Ingredients</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.ingredients.map(ing => (
                        <span
                          key={ing}
                          className="px-3 py-1.5 bg-white rounded-xl text-[11px] font-bold text-slate-700 border border-slate-100 shadow-sm"
                        >
                          🌿 {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[3px] mb-2.5">Benefits</p>
                    <div className="flex flex-col gap-2">
                      {selectedProduct.benefits.map(ben => (
                        <div key={ben} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-ocean/10 flex items-center justify-center shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-ocean" />
                          </div>
                          <span className="text-slate-600 text-[13px] font-medium leading-snug">{ben}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-2">
                    {selectedProduct.buyUrl ? (
                      <a
                        href={selectedProduct.buyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white text-[10px] font-black uppercase tracking-[2px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                        style={{
                          background: 'linear-gradient(135deg, #2874f0 0%, #0f52ba 100%)',
                          boxShadow: '0 6px 20px rgba(40,116,240,0.3)',
                        }}
                      >
                        Buy on Flipkart
                      </a>
                    ) : (
                      <div className="w-full bg-gradient-to-r from-ocean/5 to-ocean/10 border border-ocean/15 py-4 rounded-2xl flex flex-col items-center justify-center gap-1.5">
                        <div className="flex items-center gap-2">
                          <FiMapPin className="text-ocean text-sm" />
                          <span className="text-ocean text-[11px] font-black uppercase tracking-[3px]">
                            Available In-Store
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px] font-medium">
                          Visit your nearest Wave outlet
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Products;

