import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiMail, FiPhone, FiMapPin, FiTwitter, FiDroplet } from 'react-icons/fi';
import mainLogo from '../assets/mainlogo_circular.png';
import PhoneChoiceModal from './PhoneChoiceModal';

const Footer = () => {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  return (
    <footer className="bg-pearl pt-16 md:pt-24 pb-12 relative overflow-hidden border-t border-ocean/5">
      {/* Decorative Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-ocean/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[300px] h-[300px] bg-coral/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16 mb-16 md:mb-24">
          <div className="space-y-6 md:space-y-8">
            <Link to="/" className="flex items-center gap-4 group justify-start">
              <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden border-2 border-ocean/20 shadow-[0_4px_20px_rgba(26,143,181,0.12)] transition-all duration-500 group-hover:scale-105 group-hover:border-ocean/45 group-hover:shadow-[0_8px_30px_rgba(26,143,181,0.22)] flex items-center justify-center bg-white">
                <img
                  src={mainLogo}
                  alt="The Wave"
                  className="h-full w-full object-contain p-0.5 rounded-full"
                />
              </div>
            </Link>
            <p className="text-slate-500 leading-relaxed text-sm font-medium max-w-xs">
              Harnessing the transformative power of deep-sea minerals to rejuvenate your body and soul.
            </p>
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/thewave.glowwithflow/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-ocean/10 text-ocean rounded-2xl flex items-center justify-center hover:bg-ocean hover:text-white transition-all duration-500 shadow-sm hover:shadow-ocean/20 shrink-0"
              >
                <FiInstagram className="text-xl" />
              </a>

              {/* Quick Support QR */}
              <div className="flex items-center gap-3 p-2 bg-white rounded-2xl border border-ocean/5 shadow-sm">
                <img
                  src="/images/customer-care.jpeg"
                  alt="Customer Care"
                  className="w-10 h-10 object-contain rounded-xl"
                />
                <div>
                  <p className="text-[10px] font-black text-ocean uppercase tracking-widest">Support</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Scan for Help</p>
                </div>
              </div>
            </div>
          </div>



          <div>
            <h3 className="font-black text-[9px] md:text-[10px] uppercase tracking-[3px] md:tracking-[4px] text-ocean mb-6 md:mb-12">Company</h3>
            <ul className="space-y-3 md:space-y-4">
              {[
                { text: 'Home', path: '/' },
                { text: 'About Us', path: '/about' },
                { text: 'Products', path: '/products' },
                { text: 'Contact', path: '/contact' }
              ].map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className="text-slate-500 hover:text-coral text-sm font-bold transition-all flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-[2px] bg-coral transition-all" />
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-black text-[9px] md:text-[10px] uppercase tracking-[3px] md:tracking-[4px] text-ocean mb-6 md:mb-12">Connect</h3>
            <ul className="space-y-5 md:space-y-6">
              {/* Phone Number - Triggers Call or WhatsApp Modal */}
              <li className="flex gap-4 text-slate-500 items-start">
                <button 
                  onClick={() => setIsPhoneModalOpen(true)} 
                  className="flex gap-4 group text-left cursor-pointer focus:outline-none"
                >
                  <FiPhone className="text-ocean text-xl shrink-0 mt-0.5 group-hover:text-coral transition-colors" />
                  <span className="text-sm font-medium leading-relaxed group-hover:text-ocean transition-colors">
                    +91 7600304304
                  </span>
                </button>
              </li>

              {/* Email Address - Direct mailto */}
              <li className="flex gap-4 text-slate-500 items-start">
                <a 
                  href="mailto:mediglowsolutions@gmail.com" 
                  className="flex gap-4 group"
                >
                  <FiMail className="text-ocean text-xl shrink-0 mt-0.5 group-hover:text-coral transition-colors" />
                  <span className="text-sm font-medium leading-relaxed group-hover:text-ocean transition-colors">
                    mediglowsolutions@gmail.com
                  </span>
                </a>
              </li>

              {/* Instagram */}
              <li className="flex gap-4 text-slate-500 items-start">
                <a 
                  href="https://www.instagram.com/mediglow.gs?igsh=MXE5OWUxbWhjMTA3cw==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex gap-4 group"
                >
                  <FiInstagram className="text-ocean text-xl shrink-0 mt-0.5 group-hover:text-coral transition-colors" />
                  <span className="text-sm font-medium leading-relaxed group-hover:text-ocean transition-colors">
                    @mediglow.gs
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 md:pt-10 border-t border-ocean/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-xs font-semibold tracking-wide">
            © {new Date().getFullYear()} <span className="text-ocean font-bold">The Wave</span>. All rights reserved.
          </p>

          {/* Created By Credit Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-ocean/15 shadow-[0_4px_16px_rgba(26,143,181,0.08)] transition-all duration-300 hover:border-ocean/40 hover:shadow-[0_8px_24px_rgba(26,143,181,0.18)] hover:-translate-y-0.5 group">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ocean"></span>
            </span>
            <span className="text-slate-500 font-semibold text-xs tracking-wide">
              Created by:
            </span>
            <a
              href="mailto:aishasabugar1@gmail.com"
              className="text-transparent bg-clip-text bg-gradient-to-r from-ocean via-sky-600 to-coral font-extrabold text-xs tracking-wide hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              aishasabugar1@gmail.com
            </a>
          </div>
        </div>
      </div>

      <PhoneChoiceModal 
        isOpen={isPhoneModalOpen} 
        onClose={() => setIsPhoneModalOpen(false)} 
        phoneNumber="+91 7600304304" 
      />
    </footer>
  );
};

export default Footer;
