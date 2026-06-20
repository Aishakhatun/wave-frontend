import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSearch, FiFilter, FiChevronLeft, FiChevronRight, FiMapPin } from 'react-icons/fi';

// ── Local product images ──────────────────────────────────────────────────────
import p1Img   from '../assets/product1.jpeg';
import p1Desc  from '../assets/product1_description.jpeg';
import p2Img   from '../assets/product2.jpeg';
import p2Desc  from '../assets/product2_description.jpeg';
import p3Img   from '../assets/product3.png';
import p3Desc  from '../assets/product3_description.jpeg';
import p4Img   from '../assets/product4.png';
import p4Desc  from '../assets/product4_description.jpeg';
import p5Img   from '../assets/product5.png';
import p5Desc  from '../assets/product5_description.jpeg';

// ── Static product data ───────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: 'Wave Sea Salt Scrub',
    tagline: 'Ocean-powered exfoliation for radiant skin',
    category: 'Body Care',
    badge: 'Best Seller',
    weight: '500g',
    image: p2Img,
    descriptionImage: p2Desc,
    description:
      'Infused with pure sea salts and marine botanicals, this luxurious scrub buffs away dead skin cells, revealing silky-smooth, luminous skin beneath. Rich in minerals that nourish and hydrate with every use.',
    ingredients: ['Sea Salt', 'Coconut Oil', 'Marine Algae'],
    benefits: ['Exfoliates', 'Hydrates', 'Brightens'],
    bgColor: '#e7f8fc',
    buyUrl: 'https://www.flipkart.com/wave-intense-glowing-spa-salt/p/itmccf5ddfe24351?pid=BSLHHVF88MDCTWRG&lid=LSTBSLHHVF88MDCTWRGI1KRTQ&marketplace=FLIPKART&q=wave+spa+salt&store=g9b%2F5nz%2Fb1b%2Fces&srno=s_1_7&otracker=search&otracker1=search&fm=Search&iid=28cbc2ca-a33a-4e0a-b5d9-feb28e8f2330.BSLHHVF88MDCTWRG.SEARCH&ppt=sp&ppn=sp&ssid=x6peoyo1r40000001781982828590&qH=7c6d920bcb584bd5&ov_redirect=true',
  },
  {
    id: 2,
    name: 'Wave Dry Shampoo',
    tagline: 'Fresh volume from the ocean breeze',
    category: 'Hair Care',
    badge: 'New',
    weight: '200ml',
    image: p1Img,
    descriptionImage: p1Desc,
    description:
      'Revive and refresh your hair instantly with our lightweight dry shampoo. Infused with ocean minerals to absorb excess oil, add incredible volume and leave hair smelling like a fresh ocean breeze.',
    ingredients: ['Rice Starch', 'Ocean Minerals', 'Vitamin E'],
    benefits: ['Oil Control', 'Adds Volume', 'Refreshes'],
    bgColor: '#fff4eb',
    buyUrl: 'https://www.flipkart.com/wave-dry-shampoo/p/itm9c1fa91d97dba?pid=SMPHMHJQ5PKPHMS5&lid=LSTSMPHMHJQ5PKPHMS5B56GZ3&marketplace=FLIPKART&q=wave+dry+shampoo&store=g9b%2Flcf%2Fqqm%2Ft36&srno=s_1_2&otracker=search&otracker1=search&fm=Search&iid=96e7634f-3f5d-4af6-92b4-e3127db5f437.SMPHMHJQ5PKPHMS5.SEARCH&ppt=sp&ppn=sp&ssid=fw9jh013yo0000001781982924416&qH=f41ef8a352c44c58&ov_redirect=true',
  },
  {
    id: 3,
    name: 'Calcium + Vitamin D2 Gummies',
    tagline: 'Strong Bones. Stronger You.',
    category: 'Gummies',
    badge: 'Zero Sugar',
    weight: '30 Gummies',
    image: p3Img,
    descriptionImage: p3Desc,
    description:
      'Delicious lemon-flavored gummies with zero added sugar. Calcium & Vitamin D2 work together to build strong bones, support immunity, improve calcium absorption, and keep you active — suitable for Men, Women & Kids.',
    ingredients: ['Calcium (Tricalcium Phosphate)', 'Vitamin D2', 'Wheat Dextrin', 'Inulin'],
    benefits: ['Strong Bones', 'Boosts Immunity', 'Better Absorption', 'Active Lifestyle'],
    bgColor: '#fffbea',
  },
  {
    id: 4,
    name: 'Kids Vita Gummies',
    tagline: 'Pure nutrition for growing champions',
    category: 'Gummies',
    badge: 'For Kids',
    weight: '30 Gummies',
    image: p4Img,
    descriptionImage: p4Desc,
    description:
      'Gluten-free, no added sugar, non-GMO berry-flavored gummies enriched with Ashwagandha, Echinacea & Alfalfa. Supports immunity, brain development, healthy growth, energy & stamina — made for kids.',
    ingredients: ['Ashwagandha', 'Echinacea', 'Alfalfa', 'Vitamin C', 'Vitamin D2', 'Vitamin B-Complex'],
    benefits: ['Boosts Immunity', 'Brain Development', 'Supports Growth', 'Energy & Stamina'],
    bgColor: '#fff0f5',
  },
  {
    id: 5,
    name: 'HSN Gummies',
    tagline: 'Nourish from within. Glow on the outside.',
    category: 'Gummies',
    badge: 'Hair·Skin·Nails',
    weight: '30 Gummies',
    image: p5Img,
    descriptionImage: p5Desc,
    description:
      'Strawberry-flavored gummies powered by Sesbania Grandiflora, Grape Seed Extract & Multivitamins. Promotes stronger hair, radiant skin, strong nails, boosts immunity and energy — for Men & Women.',
    ingredients: ['Sesbania Grandiflora', 'Grape Seed Extract', 'Vitamin B7 (Biotin)', 'Zinc', 'Vitamin C'],
    benefits: ['Stronger Hair', 'Radiant Skin', 'Strong Nails', 'Boosts Immunity'],
    bgColor: '#fff0f5',
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
const Products = () => {
  const [filter, setFilter]               = useState('All');
  const [search, setSearch]               = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImg, setCurrentImg]       = useState(0); // 0 = product img, 1 = desc img

  useEffect(() => {
    if (!selectedProduct) setCurrentImg(0);
  }, [selectedProduct]);

  const categories    = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  const filteredProducts = PRODUCTS.filter(p => {
    const matchCat    = filter === 'All' || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Images shown in modal carousel: product image + description image
  const modalImages = selectedProduct
    ? [selectedProduct.image, selectedProduct.descriptionImage]
    : [];

  return (
    <div className="pt-24 pb-20 bg-pearl min-h-screen">

      {/* ─── Header ─── */}
      <section className="relative py-24 px-6 md:px-12 overflow-hidden bg-[radial-gradient(circle_at_top_left,_#d6f3fb_0%,_#FDFCFB_100%)]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ocean/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <span className="section-badge">Pure Marine Extracts</span>
            <h1 className="mb-8 text-slate-900 tracking-tighter">
              The Ocean <span className="text-gradient">Collection</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
              Explore our range of pharmaceutical-grade body care solutions, meticulously developed
              for immediate results and deep-sea rejuvenation.
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
                  className={`whitespace-nowrap px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    filter === cat
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
                    className="relative h-72 rounded-[40px] overflow-hidden transition-transform duration-700 group-hover:scale-[1.03] flex items-center justify-center p-4"
                    style={{ backgroundColor: product.bgColor }}
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
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3.5 6H20.5M16 10a4 4 0 01-8 0"/>
                            <path d="M7 2v4M17 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
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
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
              onClick={() => setSelectedProduct(null)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-white rounded-[50px] overflow-hidden shadow-[0_50px_100px_rgba(26,143,181,0.2)] flex flex-col lg:flex-row"
            >
              {/* Close */}
              <button
                className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center text-ocean shadow-xl z-20 hover:scale-110 transition-transform"
                onClick={() => setSelectedProduct(null)}
              >
                <FiX className="text-xl" />
              </button>

              {/* Image carousel — product img + description img */}
              <div
                className="w-full lg:w-[45%] relative flex items-center justify-center shrink-0 overflow-hidden min-h-[280px] lg:min-h-[460px]"
                style={{ backgroundColor: selectedProduct.bgColor }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImg}
                    src={modalImages[currentImg]}
                    alt={selectedProduct.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, { offset }) => {
                      if (offset.x < -50 && currentImg < modalImages.length - 1)
                        setCurrentImg(c => c + 1);
                      if (offset.x > 50 && currentImg > 0)
                        setCurrentImg(c => c - 1);
                    }}
                    className="w-full h-auto max-h-[280px] lg:max-h-[460px] object-contain drop-shadow-2xl cursor-grab active:cursor-grabbing p-8"
                  />
                </AnimatePresence>

                {/* Arrows */}
                <button
                  onClick={() => currentImg > 0 && setCurrentImg(c => c - 1)}
                  className={`absolute left-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-ocean shadow-lg transition-all ${currentImg === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'}`}
                >
                  <FiChevronLeft className="text-xl" />
                </button>
                <button
                  onClick={() => currentImg < modalImages.length - 1 && setCurrentImg(c => c + 1)}
                  className={`absolute right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-ocean shadow-lg transition-all ${currentImg === modalImages.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'}`}
                >
                  <FiChevronRight className="text-xl" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-6 flex gap-2">
                  {modalImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImg(idx)}
                      className={`rounded-full transition-all ${currentImg === idx ? 'w-6 h-2 bg-ocean' : 'w-2 h-2 bg-ocean/25'}`}
                    />
                  ))}
                </div>

                {/* Slide label */}
                <div className="absolute top-6 left-6 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black text-ocean uppercase tracking-[2px]">
                  {currentImg === 0 ? 'Product' : 'Details'}
                </div>
              </div>

              {/* Info panel */}
              <div className="w-full lg:w-[55%] p-8 md:p-12 flex flex-col justify-center">
                <span className="section-badge !mb-4 self-start !text-[8px] !px-3 !py-1">
                  {selectedProduct.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-black mb-2 text-slate-900 tracking-tighter leading-none">
                  {selectedProduct.name}
                </h2>
                <p className="text-ocean text-sm font-bold italic mb-6">
                  "{selectedProduct.tagline}"
                </p>

                <div className="flex items-center gap-3 mb-8">
                  <div className="px-4 py-2 bg-ocean/5 rounded-xl text-[9px] font-black text-ocean uppercase tracking-widest">
                    {selectedProduct.weight}
                  </div>
                  <div className="px-4 py-2 bg-emerald-50 rounded-xl text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                    {selectedProduct.badge}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-black text-slate-300 mb-2 text-[9px] uppercase tracking-[4px]">
                      About
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-black text-slate-300 mb-2 text-[9px] uppercase tracking-[4px]">
                        Key Ingredients
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.ingredients.map(ing => (
                          <span
                            key={ing}
                            className="px-3 py-1.5 bg-white rounded-lg text-[10px] font-bold text-slate-600 border border-ocean/10 shadow-sm"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-black text-slate-300 mb-2 text-[9px] uppercase tracking-[4px]">
                        Benefits
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.benefits.map(ben => (
                          <span
                            key={ben}
                            className="px-3 py-1.5 bg-ocean/5 rounded-lg text-[10px] font-bold text-ocean border border-ocean/10 shadow-sm"
                          >
                            {ben}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA — Buy on Flipkart OR Available on Store Only */}
                  {selectedProduct.buyUrl ? (
                    <a
                      href={selectedProduct.buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#2874f0] text-white py-5 rounded-[24px] text-[11px] font-black uppercase tracking-[4px] hover:bg-[#1a5fd4] transition-all duration-300 shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3"
                    >
                      <img
                        src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fk-logo-b14e1ece.png"
                        alt="Flipkart"
                        className="h-4 object-contain brightness-0 invert"
                      />
                      Buy on Flipkart
                    </a>
                  ) : (
                    <div className="w-full bg-ocean/5 border-2 border-ocean/20 py-5 rounded-[24px] flex flex-col items-center justify-center gap-2">
                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-ocean text-base" />
                        <span className="text-ocean text-[11px] font-black uppercase tracking-[4px]">
                          Available on Store Only
                        </span>
                      </div>
                      <p className="text-slate-400 text-[10px] font-medium">
                        Visit your nearest Wave outlet to purchase
                      </p>
                    </div>
                  )}
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
