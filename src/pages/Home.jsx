import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiDroplet, FiStar, FiLayers, FiWind, FiSun } from 'react-icons/fi';
import { useRef, useState, useEffect } from 'react';

// Product images
import product1 from '../assets/product1.jpeg';
import product2 from '../assets/product2.jpeg';
import product3 from '../assets/product3.jpg';
import product4 from '../assets/product4.jpg';
import product5 from '../assets/product5.jpg';
import combo from '../assets/combo.jpeg';

const slides = [
   { img: combo, name: 'The wave-Combo Pack' },
  { img: product1, name: 'The wave-Dry Shampoo' },
  { img: product2, name: 'The wave-Intense Glowing Spa Salt' },
  { img: product3, name: 'The wave-Calcium + Vitamin D2 Gummies' },
  { img: product4, name: 'The wave-KidsVita Gummies' },
  { img: product5, name: 'The wave-Hair, Skin & Nails Gummies' }
 
];

const SHOWCASE_PRODUCTS = [
  {
    id: 'salt',
    badge: 'Body Care',
    bg: 'bg-sky-pale',
    accent: '#1a8fb5',
    pillBg: 'bg-ocean/10',
    pillText: 'text-ocean',
    items: [
      {
        name: 'The wave-Intense Glowing Spa Salt',
        tagline: 'Deep-Sea Mineral Exfoliation',
        desc: 'Formulated with organic sea salts and nutrient-rich marine algae to gently polish, smooth, and restore your skin\'s natural radiance.',
        img: product2,
        benefits: ['Gently removes dead skin cells', 'Hydrates with organic coconut oil', 'Infuses deep-sea minerals']
      }
    ]
  },
  {
    id: 'shampoo',
    badge: 'Hair Care',
    bg: 'bg-sand/30',
    accent: '#e07a5f',
    pillBg: 'bg-coral/10',
    pillText: 'text-coral',
    items: [
      {
        name: 'The wave-Dry Shampoo',
        tagline: 'Instant Hair Revival',
        desc: 'Absorbs excess oils, adds instant volume, and refreshes your hair between washes with kaolin clay and vitamin E.',
        img: product1,
        benefits: ['Absorbs excess sebum instantly', 'Adds volume & lightweight texture', 'Leaves no white residue']
      }
    ]
  },
  {
    id: 'gummies',
    badge: 'Gummies',
    bg: 'bg-sage-light',
    accent: '#81b29a',
    pillBg: 'bg-emerald-600/10',
    pillText: 'text-emerald-700',
    items: [
      {
        name: 'The wave-Calcium + Vitamin D2 Gummies',
        tagline: 'Bone & Muscle Strength',
        desc: 'A delicious daily gummy formulated to support your bone health, calcium levels, and natural muscle function.',
        img: product3,
        benefits: ['Supports bone & muscle health', 'Easy-to-take gummy format', 'Zero sugar formulation']
      },
      {
        name: 'The wave-KidsVita Gummies',
        tagline: 'Daily Nutritional Support',
        desc: 'Packed with essential vitamins and natural bio-actives like ashwagandha to support daily energy, immune defense, and general health.',
        img: product4,
        benefits: ['Contains essential vitamins', 'Supports immune system', 'Supports daily vitality']
      },
      {
        name: 'The wave-Hair, Skin & Nails Gummies',
        tagline: 'Nourishment from Within',
        desc: 'Infused with Sesbania grandiflora extract and biotin to support strong hair, glowing skin, and healthy nails.',
        img: product5,
        benefits: ['Supports strong, shiny hair', 'Promotes glowing, smooth skin', 'Strengthens brittle nails']
      }
    ]
  }
];

const Home = () => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const waveX = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeShowcase, setActiveShowcase] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const handleBuyNow = () => {
    const prodName = SHOWCASE_PRODUCTS[activeShowcase].items[activeItemIndex].name;
    navigate('/products', { state: { selectedProductName: prodName } });
  };

  // Reset activeItemIndex when category changes
  useEffect(() => {
    setActiveItemIndex(0);
  }, [activeShowcase]);

  // Slideshow for main header
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Slideshow for products within the active showcase category (e.g. Wellness)
  useEffect(() => {
    const currentCategory = SHOWCASE_PRODUCTS[activeShowcase];
    if (currentCategory.items.length <= 1) return;

    const timer = setInterval(() => {
      setActiveItemIndex((prev) => (prev + 1) % currentCategory.items.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [activeShowcase]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="overflow-hidden bg-pearl" ref={scrollRef}>
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[65vh] flex items-center pt-24 md:pt-36 lg:pt-40 pb-10 px-6 lg:px-0">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-[-1] bg-[radial-gradient(circle_at_70%_20%,_#d6f3fb_0%,_#FDFCFB_100%)]" />
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-ocean/5 rounded-full blur-[120px] pointer-events-none animate-pulse-soft" />
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-coral/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Animated Waves */}
        <div className="absolute bottom-0 left-0 w-full h-64 overflow-hidden opacity-[0.05] pointer-events-none">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-[200%] h-full bg-[url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/85486/wave.svg')] bg-repeat-x bg-bottom"
          />
        </div>

        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left pt-10 lg:pt-0"
          >

            <motion.h1 variants={itemVariants} className="mb-6 text-slate-950 font-jakarta leading-[1.1] tracking-[-0.04em] text-4xl md:text-5xl font-black">
              Beauty <span className="text-gradient">Inside & Out</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-sm md:text-base text-slate-600 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium px-4 md:px-0">
              The Wave brings together beauty, wellness, and self-care with thoughtfully crafted products designed to help you look and feel your best every day.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-row gap-3 justify-center lg:justify-start px-4 md:px-0">
              <Link to="/products" className="btn-primary group !py-3.5 !px-5 sm:!py-4 sm:!px-7 text-[10px] sm:text-[11px] whitespace-nowrap">
                Shop Now <FiArrowRight className="group-hover:translate-x-2 transition-transform inline" />
              </Link>
              <Link to="/about" className="btn-outline !py-3.5 !px-5 sm:!py-4 sm:!px-7 text-[10px] sm:text-[11px] whitespace-nowrap">
                About Us
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center lg:justify-start gap-10 opacity-30">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[4px] text-slate-400 mb-4">Trusted By</span>
                <div className="flex gap-8 text-xl font-black text-slate-900 tracking-tighter">
                  <span>VOGUE</span>
                  <span>ELLE</span>
                  <span>GLOSS</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative group">
              {/* Image Frame with Floating Elements */}
              <div className="relative z-10 bg-white p-3 md:p-4 rounded-[40px] md:rounded-[55px] shadow-[0_40px_100px_rgba(26,143,181,0.08)] border border-ocean/5 overflow-hidden">
                <div className="overflow-hidden rounded-[30px] md:rounded-[45px] aspect-square md:h-[420px] max-w-[420px] mx-auto relative flex items-center justify-center bg-slate-50/40">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide}
                      src={slides[currentSlide].img}
                      alt={slides[currentSlide].name}
                      initial={{ opacity: 0, x: 80 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -80 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover rounded-[30px] md:rounded-[45px]"
                    />
                  </AnimatePresence>

                  {/* Dot Indicators */}
                  <div className="absolute bottom-4 flex gap-1.5 z-20">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`rounded-full transition-all duration-300 ${
                          currentSlide === idx ? 'w-5 h-1.5 bg-ocean' : 'w-1.5 h-1.5 bg-ocean/30'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Floating Stats - Themed like product cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="hidden md:flex absolute top-[15%] -right-8 md:-right-24 z-20 bg-white/90 backdrop-blur-xl p-4 md:p-6 rounded-[24px] md:rounded-[32px] shadow-2xl border border-white flex-col items-center gap-1.5 md:gap-2"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-sky-pale rounded-xl md:rounded-2xl flex items-center justify-center text-ocean text-base md:text-lg shadow-inner">
                  <FiStar />
                </div>
                <div className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter leading-none">98%</div>
                <div className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center leading-none">Organic <br className="hidden md:block" /> Bio-Actives</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-4 md:-bottom-12 md:-left-12 z-20 bg-white/90 backdrop-blur-xl p-5 md:p-8 rounded-[24px] md:rounded-[32px] shadow-2xl border border-white"
              >
                <div className="flex items-center gap-3 mb-2 md:mb-3">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-ocean rounded-full animate-pulse" />
                  <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Result</span>
                </div>
                <div className="text-sm md:text-lg font-black text-slate-900 tracking-tight leading-tight">Beauty & <br /> Wellness Solutions</div>
              </motion.div>

              {/* Background Glow */}
              <div className="absolute -inset-10 bg-ocean/5 rounded-full blur-[80px] z-0" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Vision Section ─── */}
      <section className="py-12 md:py-16 relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-badge">Our Approach</span>
              <h2 className="mb-4 text-slate-900">
                Simple. <span className="text-gradient">Effective.</span> Enjoyable.
              </h2>
              <p className="text-base md:text-lg text-slate-500 mb-6 leading-relaxed font-medium">
                From exfoliating spa salts and refreshing dry shampoos to nourishing gummies, our products support your daily beauty and wellness routine.
              </p>

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {[
                  { icon: <FiDroplet />, title: "Spa Salts", desc: "Helps reveal smoother, softer, more radiant-looking skin.", color: "bg-sky-pale" },
                  { icon: <FiWind />, title: "Dry Shampoo", desc: "Refresh hair anytime — absorbs oil, adds freshness.", color: "bg-sand" },
                  { icon: <FiLayers />, title: "Gummies", desc: "Hair, Skin & Nails and KidsVita daily support.", color: "bg-sage-light" },
                  { icon: <FiSun />, title: "Wellness", desc: "Calcium + Vitamin D2 for bone health & daily wellness.", color: "bg-coral-light/20" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`p-5 md:p-6 rounded-[24px] border border-white flex flex-col gap-3.5 shadow-sm hover:shadow-lg transition-all cursor-pointer ${item.color}`}
                  >
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-ocean text-lg shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-black text-slate-900 mb-1 uppercase tracking-tight">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <div className="relative w-full">
              {/* Tab Selector */}
              <div className="flex justify-center gap-1.5 mb-6 bg-white p-1.5 rounded-full border border-ocean/5 max-w-sm mx-auto shadow-sm relative z-10">
                {SHOWCASE_PRODUCTS.map((prod, idx) => (
                  <button
                    key={prod.id}
                    onClick={() => setActiveShowcase(idx)}
                    className="flex-1 py-2 px-3 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-wider relative transition-all duration-300"
                  >
                    {activeShowcase === idx && (
                      <motion.span
                        layoutId="activeShowcaseTab"
                        className="absolute inset-0 bg-ocean rounded-full shadow-md shadow-ocean/15"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 ${activeShowcase === idx ? 'text-white' : 'text-slate-500 hover:text-ocean'}`}>
                      {prod.badge}
                    </span>
                  </button>
                ))}
              </div>

              {/* Showcase Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeShowcase}-${activeItemIndex}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 md:p-8 rounded-[36px] border border-white flex flex-col gap-4 shadow-[0_20px_60px_rgba(26,143,181,0.05)] min-h-[330px] ${SHOWCASE_PRODUCTS[activeShowcase].bg}`}
                >
                  {/* Top Bar: Badge on Left, Buy Now Button on Far Right */}
                  <div className="flex items-center justify-between w-full">
                    <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-[2px] ${SHOWCASE_PRODUCTS[activeShowcase].pillBg} ${SHOWCASE_PRODUCTS[activeShowcase].pillText}`}>
                      {SHOWCASE_PRODUCTS[activeShowcase].badge}
                    </span>
                    <button
                      onClick={handleBuyNow}
                      className="btn-primary !py-1.5 !px-4 text-[9px] font-black tracking-wider uppercase rounded-full shadow-md hover:scale-105 active:scale-95 transition-all"
                    >
                      Buy Now
                    </button>
                  </div>

                  {/* Card Content Row */}
                  <div className="flex flex-col md:flex-row gap-6 items-center w-full">
                    {/* Text details */}
                    <div className="flex-1 flex flex-col items-start text-left">
                      <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight mb-1 font-jakarta tracking-tight">
                        {SHOWCASE_PRODUCTS[activeShowcase].items[activeItemIndex].name}
                      </h3>
                      <p className="text-slate-400 text-[11px] font-bold italic mb-3">
                        {SHOWCASE_PRODUCTS[activeShowcase].items[activeItemIndex].tagline}
                      </p>
                      <p className="text-slate-500 text-xs leading-relaxed mb-5 font-medium">
                        {SHOWCASE_PRODUCTS[activeShowcase].items[activeItemIndex].desc}
                      </p>
                      <div className="space-y-2 w-full">
                        {SHOWCASE_PRODUCTS[activeShowcase].items[activeItemIndex].benefits.map((ben, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${SHOWCASE_PRODUCTS[activeShowcase].accent}20` }}>
                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: SHOWCASE_PRODUCTS[activeShowcase].accent }} />
                            </div>
                            <span className="text-slate-600 text-xs font-bold leading-tight">{ben}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Image side */}
                    <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 shrink-0 relative flex items-center justify-center bg-white rounded-[28px] border border-white/80 shadow-sm p-3 group/showcase-img overflow-hidden">
                      <img
                        src={SHOWCASE_PRODUCTS[activeShowcase].items[activeItemIndex].img}
                        alt={SHOWCASE_PRODUCTS[activeShowcase].items[activeItemIndex].name}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover/showcase-img:scale-105"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Sub-product indicators for tabs with multiple items (Wellness) */}
              {SHOWCASE_PRODUCTS[activeShowcase].items.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {SHOWCASE_PRODUCTS[activeShowcase].items.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveItemIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeItemIndex === idx
                          ? 'bg-slate-700 scale-125'
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to item ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* ─── Molecular Excellence Section (Why Choose The Wave?) ─── */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-transparent to-ocean/[0.01] relative overflow-hidden">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-badge !bg-ocean/5 !text-ocean mx-auto">Why Choose The Wave?</span>
            <h2 className="text-slate-900 mb-6 text-3xl md:text-4xl font-black leading-tight tracking-[-0.04em]">
              Premium Quality for <span className="text-gradient">Modern Lifestyles</span>
            </h2>
            <p className="text-base text-slate-500 font-medium leading-relaxed">
              We combine beauty and wellness solutions to help you care for yourself inside and out with zero compromises on efficacy or quality.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'Clean Formulas',
                desc: 'Bio-active, premium ingredients formulated without sulfates, parabens, or synthetic fillers.',
                icon: <FiDroplet />,
                bg: 'hover:shadow-sky-500/10 hover:border-sky-200/50',
                iconColor: 'text-sky-500 bg-sky-50',
                accent: 'bg-sky-500'
              },
              {
                num: '02',
                title: 'Inside & Out Care',
                desc: 'Thoughtfully designed products that support beauty from within and revitalize from the outside.',
                icon: <FiLayers />,
                bg: 'hover:shadow-coral/10 hover:border-coral/30',
                iconColor: 'text-coral bg-coral/5',
                accent: 'bg-coral'
              },
              {
                num: '03',
                title: 'Proven Results',
                desc: 'Dermatologically aligned formulations designed to fit seamlessly into busy modern routines.',
                icon: <FiSun />,
                bg: 'hover:shadow-emerald-500/10 hover:border-emerald-200/50',
                iconColor: 'text-emerald-500 bg-emerald-50',
                accent: 'bg-emerald-500'
              }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-white/80 backdrop-blur-md border border-slate-100 p-8 rounded-[36px] shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-300 flex flex-col items-start text-left relative overflow-hidden group ${pillar.bg}`}
              >
                {/* Accent bar at the top */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 opacity-0 group-hover:opacity-100 ${pillar.accent}`} />
                
                <div className="flex justify-between items-center w-full mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner ${pillar.iconColor}`}>
                    {pillar.icon}
                  </div>
                  <span className="text-slate-200 font-black text-3xl font-jakarta leading-none group-hover:text-slate-300 transition-colors duration-300">
                    {pillar.num}
                  </span>
                </div>
                
                <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Action Link */}
          {/* <div className="mt-16 text-center">
            <Link
              to="/about"
              className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[3px] text-slate-900 hover:text-ocean transition-all"
            >
              Learn more about our standards <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div> */}
        </div>
        
        {/* Background glow graphics */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-ocean/5 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-coral/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      </section>
    </div>
  );
};

export default Home;
