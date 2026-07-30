import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    // Phone validation
    if (formData.phone) {
      if (!/^[6-9]/.test(formData.phone)) {
        setStatus({ type: 'error', message: 'Invalid Contact Number' });
        setIsSubmitting(false);
        return;
      }
      if (formData.phone.length !== 10) {
        setStatus({ type: 'error', message: 'Invalid Contact Number (Must be 10 digits)' });
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/contact/`, formData);
      if (res.data.success) {
        setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const infoItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-pearl min-h-screen relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ocean/5 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-coral/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      {/* ─── Header ─── */}
      <section className="relative py-10 px-6 md:px-12 z-10 text-center">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="section-badge !bg-ocean/5 !text-ocean tracking-widest">HUMAN CONNECTION</span>
            <h1 className="mb-4 text-slate-900 tracking-tight leading-none text-3xl md:text-5xl font-black">
              Guide Your <span className="text-gradient">Glow</span>
            </h1>
            <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto font-medium leading-relaxed">
              Whether you have questions about our clinical rituals or need personalized skincare advice, our wellness consultants are here for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section className="px-4 sm:px-6 md:px-12 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-[32px] sm:rounded-[40px] p-6 md:p-12 shadow-[0_30px_70px_rgba(26,143,181,0.06)] border border-ocean/5 flex flex-col lg:flex-row gap-10 md:gap-12 relative overflow-hidden"
          >
            {/* Soft decorative inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-ocean/[0.01] to-transparent pointer-events-none" />

            {/* Left: Interactive Info Column */}
            <div className="w-full lg:w-[40%] flex flex-col justify-between space-y-8">
              <div>
                <motion.h2 
                  variants={itemVariants}
                  className="text-2xl font-black text-slate-900 mb-3 tracking-tight font-jakarta"
                >
                  Ritual Centers & Support
                </motion.h2>
                <motion.p 
                  variants={itemVariants}
                  className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed"
                >
                  Connect with us through any channel. We aim to respond to all inquiries within 24 hours.
                </motion.p>
              </div>

              {/* Staggered Info Items */}
              <div className="space-y-6">
                {[
                  { 
                    Icon: FiMapPin, 
                    title: 'Flagship Spa', 
                    text: 'D4 Ahmed Chambers, Junabazar, Himatnagar',
                    color: 'bg-sky-500/10 text-sky-600'
                  },
                  { 
                    Icon: FiPhone, 
                    title: 'Concierge', 
                    text: '+91 7600304304',
                    color: 'bg-ocean/10 text-ocean'
                  },
                  { 
                    Icon: FiMail, 
                    title: 'Inquiries', 
                    text: 'mediglowsolutions@gmail.com',
                    color: 'bg-coral/10 text-coral'
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    variants={infoItemVariants}
                    whileHover={{ x: 5 }}
                    className="flex gap-4 items-center group cursor-pointer"
                  >
                    <div className={`w-11 h-11 rounded-2xl ${item.color} flex items-center justify-center text-lg shadow-sm group-hover:scale-115 transition-all duration-300 shrink-0`}>
                      <item.Icon />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black text-slate-400 text-[8px] uppercase tracking-[3px] mb-0.5">{item.title}</h4>
                      <p className="text-slate-800 font-extrabold text-xs sm:text-sm leading-tight truncate group-hover:text-ocean transition-colors">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Decorative brand quote footer */}
              <motion.div 
                variants={itemVariants}
                className="hidden lg:block pt-6 border-t border-slate-100"
              >
                <span className="text-[10px] text-ocean font-bold italic tracking-wide">
                  "Excellence is not a ritual, it's a habit."
                </span>
              </motion.div>
            </div>

            {/* Right: Modern Form Column */}
            <motion.div 
              variants={itemVariants}
              className="w-full lg:w-[60%] bg-slate-50/50 p-6 md:p-8 rounded-[24px] sm:rounded-[32px] border border-slate-100"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1 text-left">
                    <label className="text-[9px] font-black text-ocean/85 uppercase tracking-[2px] ml-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={formData.name} 
                      onChange={handleChange}
                      placeholder="Your name" 
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-ocean focus:ring-4 focus:ring-ocean/5 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 text-xs shadow-sm" 
                    />
                  </div>

                  {/* Contact Number field */}
                  <div className="space-y-1 text-left">
                    <label className="text-[9px] font-black text-ocean/85 uppercase tracking-[2px] ml-1">Contact Number</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-slate-400 font-black text-xs">+91</span>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          handleChange({ target: { name: 'phone', value: val } });
                        }}
                        placeholder="00000 00000" 
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-ocean focus:ring-4 focus:ring-ocean/5 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 text-xs shadow-sm" 
                      />
                    </div>
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-black text-ocean/85 uppercase tracking-[2px] ml-1">Email Channel</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange}
                    placeholder="your@email.com" 
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-ocean focus:ring-4 focus:ring-ocean/5 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 text-xs shadow-sm" 
                  />
                </div>

                {/* Message field */}
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-black text-ocean/85 uppercase tracking-[2px] ml-1">Message</label>
                  <textarea 
                    name="message" 
                    required 
                    value={formData.message} 
                    onChange={handleChange} 
                    rows="4" 
                    placeholder="Tell us about your skincare goals..." 
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-ocean focus:ring-4 focus:ring-ocean/5 outline-none transition-all resize-none font-bold text-slate-900 placeholder:text-slate-300 text-xs shadow-sm" 
                  />
                </div>

                {status.message && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-3 rounded-xl text-[10px] font-black uppercase tracking-wider text-center ${
                      status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-150' : 'bg-red-50 text-red-700 border border-red-150'
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}

                <div className="flex justify-end pt-2">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary py-3 px-6 rounded-xl flex items-center gap-2 group text-xs font-black uppercase tracking-wider shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        Transmitting...
                      </span>
                    ) : (
                      <>
                        <span>Submit</span> 
                        <FiSend className="text-xs transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
