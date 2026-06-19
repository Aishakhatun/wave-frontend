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
      const res = await axios.post('http://localhost:5000/api/contact', formData);
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
    <div className="pt-24 pb-20 bg-pearl">
      {/* ─── Header ─── */}
      <section className="relative py-32 px-6 md:px-12 overflow-hidden bg-[radial-gradient(circle_at_top_right,_#d6f3fb_0%,_#FDFCFB_100%)]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-ocean/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="section-badge">Human Connection</span>
            <h1 className="mb-8 text-slate-900 tracking-[-0.04em] leading-none">
              Guide Your <span className="text-gradient">Glow</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              Whether you have questions about our clinical rituals or need personalized skincare advice, our wellness consultants are here for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section className="py-24 px-6 md:px-12 relative">
        <div className="container mx-auto">
          <div className="bg-white rounded-[80px] p-8 md:p-16 lg:p-24 shadow-[0_80px_150px_-50px_rgba(26,143,181,0.12)] border border-ocean/5 flex flex-col lg:flex-row gap-24 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
               <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-ocean/20 rounded-full blur-[120px]" />
               <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-coral/10 rounded-full blur-[100px]" />
            </div>

            {/* Left: Info */}
            <div className="w-full lg:w-2/5 relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-10 tracking-tight leading-tight">Ritual Centers & <br/>Support</h2>
              <p className="text-lg text-slate-500 mb-16 font-medium leading-relaxed">
                Connect with us through any channel. We aim to respond to all inquiries within 24 hours.
              </p>
              
              <div className="space-y-12">
                {[
                  { Icon: FiMapPin, title: 'Flagship Spa', text: 'D4 Ahmed Chambers, Junabazar, Himatnagar' },
                  { Icon: FiPhone, title: 'Concierge', text: '+91 7600304304' },
                  { Icon: FiMail, title: 'Inquiries', text: 'mediglowsolutions@gmail.com' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-14 h-14 bg-ocean rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-ocean/20 shrink-0">
                      <item.Icon />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-300 text-[10px] uppercase tracking-[4px] mb-2">{item.title}</h4>
                      <p className="text-slate-900 font-extrabold text-lg leading-tight">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-20 pt-16 border-t border-ocean/5">
                <h4 className="font-black text-slate-300 mb-8 uppercase tracking-[4px] text-[10px]">Follow Our Flow</h4>
                <div className="flex gap-4">
                  {[
                    { Icon: FiInstagram, url: 'https://www.instagram.com/mediglow.gs?igsh=MXE5OWUxbWhjMTA3cw==' },
                    { Icon: FiTwitter, url: '#' }
                  ].map((social, i) => (
                    <a 
                      key={i} 
                      href={social.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-ocean hover:text-white transition-all shadow-sm"
                    >
                      <social.Icon className="text-xl" />
                    </a>
                  ))}
                </div>

                {/* QR Code Section */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 p-8 bg-white rounded-[40px] border border-ocean/5 shadow-xl flex flex-col items-center gap-6 max-w-[220px] group hover:shadow-2xl hover:border-ocean/10 transition-all duration-500"
                >
                  <div className="p-4 bg-slate-50 rounded-[30px] shadow-inner border border-ocean/5">
                    <img 
                      src="/images/customer-care.jpeg" 
                      alt="Customer Care QR" 
                      className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black text-ocean uppercase tracking-[3px] mb-2">Quick Support</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Scan for <br /> Customer Care</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="w-full lg:w-3/5 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[11px] font-bold text-ocean/80 uppercase tracking-[3px] ml-4 font-outfit">Full Name</label>
                    <input 
                      type="text" name="name" required value={formData.name} onChange={handleChange}
                      placeholder="Your name" 
                      className="w-full px-8 py-5 rounded-3xl bg-slate-50 border border-ocean/5 focus:bg-white focus:border-ocean focus:ring-4 focus:ring-ocean/5 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 font-outfit" 
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-bold text-ocean/80 uppercase tracking-[3px] ml-4 font-outfit">Contact Number</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-6 text-slate-400 font-bold font-outfit">+91</span>
                      <input 
                        type="tel" name="phone" value={formData.phone} onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          handleChange({ target: { name: 'phone', value: val } });
                        }}
                        placeholder="00000 00000" 
                        className="w-full pl-16 pr-8 py-5 rounded-3xl bg-slate-50 border border-ocean/5 focus:bg-white focus:border-ocean focus:ring-4 focus:ring-ocean/5 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 font-outfit" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-bold text-ocean/80 uppercase tracking-[3px] ml-4 font-outfit">Email Channel</label>
                  <input 
                    type="email" name="email" required value={formData.email} onChange={handleChange}
                    placeholder="your@email.com" 
                    className="w-full px-8 py-5 rounded-3xl bg-slate-50 border border-ocean/5 focus:bg-white focus:border-ocean focus:ring-4 focus:ring-ocean/5 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 font-outfit" 
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-bold text-ocean/80 uppercase tracking-[3px] ml-4 font-outfit">Message Transmission</label>
                  <textarea 
                    name="message" required value={formData.message} onChange={handleChange} rows="5" 
                    placeholder="Tell us about your skincare goals..." 
                    className="w-full px-8 py-5 rounded-[32px] bg-slate-50 border border-ocean/5 focus:bg-white focus:border-ocean focus:ring-4 focus:ring-ocean/5 outline-none transition-all resize-none font-bold text-slate-900 placeholder:text-slate-300 font-outfit" 
                  />
                </div>

                {status.message && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className={`p-6 rounded-[24px] text-sm font-black uppercase tracking-widest ${status.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}
                  >
                    {status.message}
                  </motion.div>
                )}

                <button 
                  type="submit" disabled={isSubmitting}
                  className="btn-primary w-full py-6 rounded-[32px] flex items-center justify-center gap-4 group"
                >
                  {isSubmitting ? 'Transmitting...' : (
                    <>Send Transmission <FiSend className="text-xl transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Location Map ─── */}
      <section className="px-6 md:px-12 pb-32">
        <div className="container mx-auto h-[500px] rounded-[60px] overflow-hidden shadow-2xl border-[12px] border-white relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d58495.648507287755!2d72.96805855000001!3d23.6051208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1778317159293!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl font-bold text-sm text-ocean border border-ocean/10">
            Our Himatnagar Ritual Center
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
