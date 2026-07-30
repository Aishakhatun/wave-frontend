import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiHeart, FiShield, FiActivity, FiDroplet } from 'react-icons/fi';

const About = () => {
  return (
    <div className="pt-24 md:pt-32 pb-20 bg-pearl min-h-screen">
      {/* ─── About Hero ─── */}
      <section className="relative py-10 px-6 overflow-hidden bg-sky-pale/40">
        <div className="absolute inset-0 z-0 opacity-20">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-light/20 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3" />
           <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-coral/10 rounded-full blur-[60px] -translate-x-1/4 translate-y-1/4" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container-custom text-center relative z-10"
        >
          <span className="section-badge !bg-white !text-ocean">About The Wave</span>
          <h1 className="mb-4 text-slate-900 text-2xl md:text-3xl font-black tracking-tight">
            Self-care that's{' '}
            <span className="text-gradient">Simple & Effective</span>
          </h1>
          <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-medium">
            At The Wave, we believe self-care should be simple, effective, and enjoyable — helping you feel confident, refreshed, and supported every day.
          </p>
        </motion.div>
      </section>

      {/* ─── Vision & Mission ─── */}
      <section className="py-12 px-6">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 bg-white rounded-[40px] border border-sky-pale/50 shadow-xl shadow-ocean/[0.02]"
            >
              <div className="w-12 h-12 bg-sky-pale text-ocean rounded-2xl flex items-center justify-center text-xl mb-5 shadow-inner">
                <FiEye />
              </div>
              <h3 className="mb-3 font-black text-slate-900 tracking-tighter text-xl">Our Vision</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                To make beauty and wellness simple, effective, and accessible for everyone — helping people look and feel their best every single day.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 bg-ocean text-white rounded-[40px] relative overflow-hidden shadow-2xl shadow-ocean/20"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-[60px]" />
              <div className="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center text-xl mb-5 backdrop-blur-md">
                <FiTarget />
              </div>
              <h3 className="mb-3 font-black text-white tracking-tighter text-xl">Our Mission</h3>
              <p className="text-sm text-white/80 leading-relaxed font-medium">
                To create products that help people feel confident, refreshed, and supported in their everyday wellness journey — combining beauty and wellness inside and out.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="py-12 px-6 bg-sand/30">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="section-badge">Our Commitment</span>
            <h2 className="text-slate-900 tracking-tighter text-2xl md:text-3xl font-black">Deeply Rooted Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { Icon: FiDroplet, title: 'Marine First', desc: 'Every product is anchored in high-potency marine minerals and bio-actives.' },
              { Icon: FiShield, title: 'Pure Results', desc: 'Rigorously tested formulas that deliver visible restoration without compromise.' },
              { Icon: FiHeart, title: 'Ocean Love', desc: 'Sustainable harvesting and eco-conscious packaging to protect our blue heart.' }
            ].map((value, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="p-12 bg-white rounded-[50px] group border border-white shadow-lg hover:shadow-2xl shadow-ocean/[0.02] cursor-pointer flex flex-col items-center md:items-start text-center md:text-left"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-16 h-16 bg-sky-pale rounded-2xl flex items-center justify-center text-3xl text-ocean mb-8 group-hover:bg-coral group-hover:text-white transition-all shadow-inner"
                >
                  <value.Icon />
                </motion.div>
                <h4 className="text-xl font-black mb-4 text-slate-900 uppercase tracking-[2px]">{value.title}</h4>
                <p className="text-slate-500 text-base leading-relaxed font-medium">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
