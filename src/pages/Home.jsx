import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiDroplet, FiStar, FiShoppingBag, FiLayers, FiWind, FiSun } from 'react-icons/fi';
import { useRef } from 'react';

const Home = () => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const waveX = useTransform(scrollYProgress, [0, 1], [0, -300]);

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
      <section className="relative min-h-[95vh] flex items-center pt-28 pb-16 px-6 lg:px-0">
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
            <motion.div variants={itemVariants} className="section-badge mx-auto lg:mx-0 !mb-10">
              <span className="flex items-center gap-2"><FiDroplet className="text-ocean" /> Elemental Body Care</span>
            </motion.div>
            <motion.h1 variants={itemVariants} className="mb-10 text-slate-950 font-jakarta leading-[1.1] md:leading-[0.9] tracking-[-0.04em]">
              The New <br /> <span className="text-gradient">Standard of Glow</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-base md:text-xl text-slate-600 mb-14 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium px-4 md:px-0">
              We bridge clinical precision with oceanic wisdom. High-potency marine minerals for visible restoration and therapeutic indulgence.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start px-6 md:px-0">
              <Link to="/products" className="btn-primary group !py-5 !px-8 text-[11px]">
                Shop The Collection <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/about" className="btn-outline !py-5 !px-8 text-[11px]">
                Our Science
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-16 flex items-center justify-center lg:justify-start gap-10 opacity-30">
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
                <div className="overflow-hidden rounded-[30px] md:rounded-[45px] aspect-square md:h-[580px] max-w-[580px] mx-auto">
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2 }}
                    src="/images/combo.jpg"
                    alt="The Wave Lifestyle"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Decorative Floating Stats - Themed like product cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[15%] -right-8 md:-right-24 z-20 bg-white/90 backdrop-blur-xl p-4 md:p-6 rounded-[24px] md:rounded-[32px] shadow-2xl border border-white flex flex-col items-center gap-1.5 md:gap-2"
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
                <div className="text-sm md:text-lg font-black text-slate-900 tracking-tight leading-tight">Best Clinical Salt <br /> of the Year 2025</div>
              </motion.div>

              {/* Background Glow */}
              <div className="absolute -inset-10 bg-ocean/5 rounded-full blur-[80px] z-0" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Vision Section ─── */}
      <section className="py-24 md:py-32 relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-badge">The Philosophy</span>
              <h2 className="mb-8 text-slate-900">
                Purity from the <br /> <span className="text-gradient">Depths</span>
              </h2>
              <p className="text-xl text-slate-500 mb-12 leading-relaxed font-medium">
                We believe in the restorative intelligence of marine life. Our formulas are a dialogue between science and the sea, designed for deep restoration and cellular health.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <FiWind />, title: "Air Tech", desc: "Aerosol-free scalp detoxification.", color: "bg-sky-pale" },
                  { icon: <FiDroplet />, title: "Bio-Salts", desc: "84 essential trace minerals.", color: "bg-sand" },
                  { icon: <FiLayers />, title: "Dermal Pro", desc: "Triple barrier protection.", color: "bg-sage-light" },
                  { icon: <FiSun />, title: "Eco-UV", desc: "Marine-safe sun filters.", color: "bg-coral-light/20" }
                ].map((item, i) => (
                  <div key={i} className={`p-8 rounded-[32px] border border-white flex flex-col gap-4 shadow-sm hover:shadow-xl transition-all ${item.color}`}>
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-ocean text-xl shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900 mb-2 uppercase tracking-tight">{item.title}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4 pt-16">
                  <div className="aspect-[3/4] bg-sky-light/20 rounded-[40px] overflow-hidden shadow-inner">
                    <img src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=400" className="w-full h-full object-cover" alt="Detail" />
                  </div>
                  <div className="p-8 bg-ocean text-white rounded-[40px] shadow-2xl">
                    <div className="text-4xl font-black mb-2">24h</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Deep Hydration</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-8 bg-coral text-white rounded-[40px] shadow-2xl">
                    <div className="text-4xl font-black mb-2">15k</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Global Users</div>
                  </div>
                  <div className="aspect-[3/4] bg-sand rounded-[40px] overflow-hidden shadow-inner">
                    <img src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=400" className="w-full h-full object-cover" alt="Product" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* ─── Molecular Excellence Section ─── */}
      <section className="py-24 md:py-40 px-6 overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative z-10 order-2 lg:order-1">
              <span className="section-badge !bg-ocean/5 !text-ocean">Scientific Excellence</span>
              <h2 className="text-slate-900 mb-10 leading-[1.1] tracking-[-0.04em]">
                Marine <br /> <span className="text-gradient">Intelligence</span>
              </h2>
              <p className="text-xl text-slate-500 mb-14 leading-relaxed max-w-lg font-medium">
                Our proprietary extraction process preserves the molecular integrity of deep-sea minerals, delivering 94% higher absorption than standard synthetics.
              </p>
              
              <div className="flex gap-16 mb-16">
                <div>
                  <div className="text-5xl font-black text-slate-900 mb-2 font-jakarta tracking-tighter">12k+</div>
                  <div className="text-[10px] font-bold text-ocean uppercase tracking-[4px]">Clinical Trials</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-slate-900 mb-2 font-jakarta tracking-tighter">100%</div>
                  <div className="text-[10px] font-bold text-ocean uppercase tracking-[4px]">Ethical Sourcing</div>
                </div>
              </div>

              <Link to="/about" className="group flex items-center gap-4 text-sm font-black uppercase tracking-[3px] text-slate-900 hover:text-ocean transition-all">
                Learn the science <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative bg-white p-4 rounded-[60px] shadow-[0_50px_100px_rgba(26,143,181,0.1)] border border-ocean/5 overflow-hidden">
                 <img 
                   src="/images/bioactive.png" 
                   alt="Molecular Science" 
                   className="w-full h-full object-cover rounded-[45px]" 
                 />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-ocean/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-coral/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
