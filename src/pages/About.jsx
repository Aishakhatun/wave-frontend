import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiHeart, FiShield, FiActivity, FiDroplet } from 'react-icons/fi';

const About = () => {
  return (
    <div className="pt-24 pb-20 bg-pearl min-h-screen">
      {/* ─── About Hero ─── */}
      <section className="relative py-24 px-6 overflow-hidden bg-sky-pale/40">
        <div className="absolute inset-0 z-0 opacity-20">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-light/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
           <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-coral/10 rounded-full blur-[80px] -translate-x-1/4 translate-y-1/4" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container-custom text-center relative z-10"
        >
          <span className="section-badge !bg-white !text-ocean">The Origin Story</span>
          <h1 className="mb-6 text-slate-900 text-3xl md:text-5xl font-black tracking-tight">
            The Power of the <br/>
            <span className="text-gradient">Ocean</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Bridging the gap between deep-sea biology and sensory body care rituals.
          </p>
        </motion.div>
      </section>

      {/* ─── Vision & Mission ─── */}
      <section className="py-24 md:py-32 px-6">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-12 md:p-20 bg-white rounded-[60px] border border-sky-pale/50 shadow-xl shadow-ocean/[0.02]"
            >
              <div className="w-20 h-20 bg-sky-pale text-ocean rounded-[28px] flex items-center justify-center text-4xl mb-12 shadow-inner">
                <FiEye />
              </div>
              <h3 className="mb-8 font-black text-slate-900 tracking-tighter">Our Vision</h3>
              <p className="text-xl text-slate-500 leading-relaxed font-medium">
                To redefine the standard of body care by unlocking the regenerative potential of marine ecosystems, making luxury wellness accessible to all.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-12 md:p-20 bg-ocean text-white rounded-[60px] relative overflow-hidden shadow-2xl shadow-ocean/20"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
              <div className="w-20 h-20 bg-white/20 text-white rounded-[28px] flex items-center justify-center text-4xl mb-12 backdrop-blur-md">
                <FiTarget />
              </div>
              <h3 className="mb-8 font-black text-white tracking-tighter">Our Mission</h3>
              <p className="text-xl text-white/80 leading-relaxed font-medium">
                To deliver clinically effective, marine-infused formulations that honor the body's natural biology while protecting the oceans we love.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="py-24 md:py-32 px-6 bg-sand/30">
        <div className="container-custom">
          <div className="text-center mb-24">
            <span className="section-badge">Our Commitment</span>
            <h2 className="text-slate-900 tracking-tighter">Deeply Rooted Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { Icon: FiDroplet, title: 'Marine First', desc: 'Every product is anchored in high-potency marine minerals and bio-actives.' },
              { Icon: FiShield, title: 'Pure Results', desc: 'Rigorously tested formulas that deliver visible restoration without compromise.' },
              { Icon: FiHeart, title: 'Ocean Love', desc: 'Sustainable harvesting and eco-conscious packaging to protect our blue heart.' }
            ].map((value, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 bg-white rounded-[50px] group hover:-translate-y-3 transition-all duration-500 border border-white shadow-lg hover:shadow-2xl shadow-ocean/[0.02]"
              >
                <div className="w-16 h-16 bg-sky-pale rounded-2xl flex items-center justify-center text-3xl text-ocean mb-8 group-hover:bg-coral group-hover:text-white transition-all">
                  <value.Icon />
                </div>
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
