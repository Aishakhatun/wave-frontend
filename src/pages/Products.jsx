import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiInfo, FiX, FiStar, FiSearch, FiFilter, FiDroplet, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (!selectedProduct) setCurrentImg(0);
  }, [selectedProduct]);

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filteredProducts = filter === 'All'
    ? products
    : products.filter(p => p.category === filter);

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
              Explore our range of pharmaceutical-grade body care solutions, meticulously developed for immediate results and deep-sea rejuvenation.
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
                placeholder="Search products..."
                className="bg-white border border-ocean/10 rounded-full pl-12 pr-6 py-4 text-xs font-bold focus:outline-none focus:border-ocean focus:ring-4 focus:ring-ocean/5 transition-all w-full md:w-72"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Grid ─── */}
      <section className="px-6 md:px-12">
        <div className="container-custom">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-8">
              <div className="w-16 h-16 border-[5px] border-sky-pale border-t-ocean rounded-full animate-spin" />
              <p className="text-ocean font-black uppercase tracking-[5px] text-[10px]">Decoding Marine Bio-Signals...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
              <AnimatePresence mode='popLayout'>
                {filteredProducts.map((product, i) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.8 }}
                    key={product._id}
                    className="flex flex-col group h-full"
                  >
                    {/* Top Colored Container */}
                    <div
                      onClick={() => setSelectedProduct(product)}
                      className={`relative aspect-[1/0.85] rounded-[60px] flex items-center justify-center p-12 transition-transform duration-700 group-hover:scale-[1.02] cursor-pointer ${product.category === 'Body Care' ? 'bg-[#e7f8fc]' :
                          product.category === 'Hair Care' ? 'bg-[#fff4eb]' :
                            product.category === 'Serums' ? 'bg-[#f5f0ff]' :
                              'bg-[#f0f9f1]'
                        }`}>
                      <img
                        src={product.image || "/images/spa-salt.png"}
                        alt={product.name}
                        className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-transform duration-1000 group-hover:scale-110"
                      />

                      {/* Badge */}
                      {product.badge && (
                        <div className="absolute top-8 left-8 bg-white/90 backdrop-blur px-5 py-2.5 rounded-full text-[9px] font-bold text-ocean uppercase tracking-[2px] shadow-sm">
                          {product.badge}
                        </div>
                      )}
                    </div>

                    {/* Info Section */}
                    <div className="pt-8 px-4 flex flex-col flex-1 relative">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-[28px] font-extrabold text-slate-900 font-jakarta tracking-[-0.03em] leading-tight max-w-[70%]">
                          {product.name}
                        </h3>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">
                          ₹{product.price}
                        </span>
                      </div>

                      <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6 line-clamp-2 pr-12">
                        {product.description}
                      </p>

                      {/* Floating Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="absolute bottom-2 right-0 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-ocean shadow-[0_15px_40px_rgba(26,143,181,0.15)] border border-ocean/5 hover:bg-ocean hover:text-white transition-all duration-500 hover:rotate-12"
                      >
                        <FiShoppingBag className="text-xl" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ─── Modal ─── */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
              onClick={() => setSelectedProduct(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-white rounded-[50px] overflow-hidden shadow-[0_50px_100px_rgba(26,143,181,0.2)] flex flex-col lg:flex-row"
            >
              <button
                className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center text-ocean shadow-xl z-20 hover:scale-110 transition-transform"
                onClick={() => setSelectedProduct(null)}
              >
                <FiX className="text-xl" />
              </button>

              <div className="w-full lg:w-[45%] bg-sky-pale/30 relative flex items-center justify-center shrink-0 overflow-hidden group/carousel">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImg}
                    src={(selectedProduct.images && selectedProduct.images[currentImg]) || selectedProduct.image || "/images/spa-salt.png"}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, { offset, velocity }) => {
                      const swipe = offset.x;
                      const imgs = selectedProduct.images || [selectedProduct.image];
                      if (swipe < -50 && currentImg < imgs.length - 1) setCurrentImg(currentImg + 1);
                      if (swipe > 50 && currentImg > 0) setCurrentImg(currentImg - 1);
                    }}
                    className="w-full h-auto max-h-[300px] lg:max-h-[450px] object-contain mix-blend-multiply drop-shadow-2xl cursor-grab active:cursor-grabbing"
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {(selectedProduct.images && selectedProduct.images.length > 1) && (
                  <>
                    <button
                      onClick={() => currentImg > 0 && setCurrentImg(currentImg - 1)}
                      className={`absolute left-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-ocean shadow-lg transition-all ${currentImg === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'}`}
                    >
                      <FiChevronLeft className="text-xl" />
                    </button>
                    <button
                      onClick={() => currentImg < selectedProduct.images.length - 1 && setCurrentImg(currentImg + 1)}
                      className={`absolute right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-ocean shadow-lg transition-all ${currentImg === selectedProduct.images.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'}`}
                    >
                      <FiChevronRight className="text-xl" />
                    </button>
                  </>
                )}

                {/* Carousel Dots */}
                {(selectedProduct.images && selectedProduct.images.length > 1) && (
                  <div className="absolute bottom-8 flex gap-2">
                    {selectedProduct.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImg(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${currentImg === idx ? 'w-6 bg-ocean' : 'bg-ocean/20'}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="w-full lg:w-[55%] p-8 md:p-12 flex flex-col justify-center">
                <span className="section-badge !mb-4 self-start !text-[8px] !px-3 !py-1">The Ritual</span>
                <h2 className="text-3xl md:text-5xl font-black mb-3 text-slate-900 tracking-tighter leading-none">{selectedProduct.name}</h2>
                <p className="text-ocean text-sm font-bold italic mb-6">"{selectedProduct.tagline}"</p>

                <div className="flex items-center gap-6 mb-8">
                  <span className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">₹{selectedProduct.price}</span>
                  <div className="px-4 py-2 bg-ocean/5 rounded-xl text-[9px] font-black text-ocean uppercase tracking-widest">{selectedProduct.weight || '500g'}</div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h4 className="font-black text-slate-300 mb-3 text-[9px] uppercase tracking-[4px]">Bio-Signals</h4>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium line-clamp-3">{selectedProduct.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-black text-slate-300 mb-3 text-[9px] uppercase tracking-[4px]">Ingredients</h4>
                      <div className="flex flex-wrap gap-2">
                        {(selectedProduct.ingredients || ['Marine Bio-Actives']).slice(0, 3).map(ing => (
                          <span key={ing} className="px-3 py-1.5 bg-white rounded-lg text-[10px] font-bold text-slate-600 border border-ocean/10 shadow-sm">{ing}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-black text-slate-300 mb-3 text-[9px] uppercase tracking-[4px]">Benefits</h4>
                      <div className="flex flex-wrap gap-2">
                        {(selectedProduct.benefits || ['Instant Results']).slice(0, 3).map(ben => (
                          <span key={ben} className="px-3 py-1.5 bg-ocean/5 rounded-lg text-[10px] font-bold text-ocean border border-ocean/10 shadow-sm">{ben}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (selectedProduct.buyUrl) window.open(selectedProduct.buyUrl, '_blank');
                    }}
                    className="w-full bg-ocean text-white py-5 rounded-[24px] text-[10px] font-black uppercase tracking-[4px] hover:bg-coral transition-all duration-500 shadow-xl shadow-ocean/20 flex items-center justify-center gap-3 group"
                  >
                    {selectedProduct.buyUrl ? 'Purchase on Flipkart' : 'Add to Collection'}
                  </button>
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
