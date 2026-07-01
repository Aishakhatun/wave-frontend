import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiInstagram, FiTwitter } from 'react-icons/fi';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
        setStatus({ type: 'error', message: 'Invalid Number' });
        setIsSubmitting(false);
        return;
      }
      if (formData.phone.length !== 10) {
        setStatus({ type: 'error', message: 'Invalid Number' });
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, formData);
      if (res.data.success) {
        setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 bg-pearl">
      {/* ─── Header ─── */}
      <section className="relative py-10 px-6 md:px-12 overflow-hidden bg-[radial-gradient(circle_at_top_right,_#d6f3fb_0%,_#FDFCFB_100%)]">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-ocean/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="section-badge">Human Connection</span>
            <h1 className="mb-4 text-slate-900 tracking-[-0.04em] leading-none text-3xl md:text-4xl font-black">
              Guide Your <span className="text-gradient">Glow</span>
            </h1>
            <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto font-medium leading-relaxed">
              Whether you have questions about our clinical rituals or need personalized skincare advice, our wellness consultants are here for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section className="py-10 px-6 md:px-12 relative">
        <div className="container mx-auto">
          <div className="bg-white rounded-[40px] p-6 md:p-10 shadow-[0_40px_80px_-30px_rgba(26,143,181,0.12)] border border-ocean/5 flex flex-col lg:flex-row gap-10 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
               <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-ocean/20 rounded-full blur-[80px]" />
               <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-coral/10 rounded-full blur-[80px]" />
            </div>

            {/* Left: Info */}
            <div className="w-full lg:w-2/5 relative z-10">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tight leading-tight">Ritual Centers & Support</h2>
              <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">
                Connect with us through any channel. We aim to respond to all inquiries within 24 hours.
              </p>
              
              <div className="space-y-5">
                {[
                  { Icon: FiMapPin, title: 'Flagship Spa', text: 'D4 Ahmed Chambers, Junabazar, Himatnagar' },
                  { Icon: FiPhone, title: 'Concierge', text: '+91 7600304304' },
                  { Icon: FiMail, title: 'Inquiries', text: 'mediglowsolutions@gmail.com' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-ocean rounded-xl flex items-center justify-center text-white text-base shadow-md shadow-ocean/20 shrink-0">
                      <item.Icon />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-300 text-[9px] uppercase tracking-[3px] mb-1">{item.title}</h4>
                      <p className="text-slate-900 font-extrabold text-sm leading-tight">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="w-full lg:w-3/5 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-ocean/80 uppercase tracking-[3px] ml-3 font-outfit">Full Name</label>
                    <input 
                      type="text" name="name" required value={formData.name} onChange={handleChange}
                      placeholder="Your name" 
                      className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-ocean/5 focus:bg-white focus:border-ocean focus:ring-4 focus:ring-ocean/5 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 font-outfit text-sm" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-ocean/80 uppercase tracking-[3px] ml-3 font-outfit">Contact Number</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-5 text-slate-400 font-bold font-outfit text-sm">+91</span>
                      <input 
                        type="tel" name="phone" value={formData.phone} onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          handleChange({ target: { name: 'phone', value: val } });
                        }}
                        placeholder="00000 00000" 
                        className="w-full pl-14 pr-5 py-3.5 rounded-2xl bg-slate-50 border border-ocean/5 focus:bg-white focus:border-ocean focus:ring-4 focus:ring-ocean/5 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 font-outfit text-sm" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-ocean/80 uppercase tracking-[3px] ml-3 font-outfit">Email Channel</label>
                  <input 
                    type="email" name="email" required value={formData.email} onChange={handleChange}
                    placeholder="your@email.com" 
                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-ocean/5 focus:bg-white focus:border-ocean focus:ring-4 focus:ring-ocean/5 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 font-outfit text-sm" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-ocean/80 uppercase tracking-[3px] ml-3 font-outfit">Message</label>
                  <textarea 
                    name="message" required value={formData.message} onChange={handleChange} rows="4" 
                    placeholder="Tell us about your skincare goals..." 
                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-ocean/5 focus:bg-white focus:border-ocean focus:ring-4 focus:ring-ocean/5 outline-none transition-all resize-none font-bold text-slate-900 placeholder:text-slate-300 font-outfit text-sm" 
                  />
                </div>

                {status.message && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-2xl text-xs font-black uppercase tracking-widest ${status.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}
                  >
                    {status.message}
                  </motion.div>
                )}

                <div className="flex justify-end">
                  <button 
                    type="submit" disabled={isSubmitting}
                    className="btn-primary px-8 py-3.5 rounded-2xl flex items-center gap-2.5 group text-sm whitespace-nowrap hover:scale-105 transition-all duration-300"
                  >
                    {isSubmitting ? 'Transmitting...' : (
                      <>Submit <FiSend className="text-sm transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Contact;
