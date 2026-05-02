import { Link } from 'react-router-dom';
import { FiInstagram, FiMail, FiPhone, FiMapPin, FiTwitter, FiFacebook, FiDroplet } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-pearl pt-16 md:pt-24 pb-12 relative overflow-hidden border-t border-ocean/5">
      {/* Decorative Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-ocean/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[300px] h-[300px] bg-coral/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-16 md:mb-24">
          <div className="space-y-6 md:space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-11 h-11 bg-ocean rounded-2xl flex items-center justify-center text-white text-xl transition-all duration-500 group-hover:bg-coral">
                 <FiDroplet />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold leading-none tracking-[-0.04em] uppercase font-jakarta text-slate-950">The Wave</span>
              </div>
            </Link>
            <p className="text-slate-500 leading-relaxed text-sm font-medium max-w-xs">
              Harnessing the transformative power of deep-sea minerals to rejuvenate your body and soul.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FiInstagram, url: 'https://www.instagram.com/mediglow.gs?igsh=MXE5OWUxbWhjMTA3cw==' },
                { Icon: FiFacebook, url: '#' }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-tr from-ocean to-coral rounded-xl flex items-center justify-center text-white shadow-lg shadow-ocean/10 hover:scale-110 transition-all"
                >
                  <social.Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black text-[9px] md:text-[10px] uppercase tracking-[3px] md:tracking-[4px] text-ocean mb-6 md:mb-12">The Collection</h3>
            <ul className="space-y-3 md:space-y-4">
              {['Body Care', 'Hair Care', 'Spa Rituals', 'New Arrivals'].map((text, i) => (
                <li key={i}>
                  <Link to="/products" className="text-slate-500 hover:text-ocean text-sm font-bold transition-all flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-[2px] bg-ocean transition-all" />
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-black text-[9px] md:text-[10px] uppercase tracking-[3px] md:tracking-[4px] text-ocean mb-6 md:mb-12">Company</h3>
            <ul className="space-y-3 md:space-y-4">
              {['Our Story', 'Science', 'Sustainability', 'Journal'].map((text, i) => (
                <li key={i}>
                  <Link to="/about" className="text-slate-500 hover:text-coral text-sm font-bold transition-all flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-[2px] bg-coral transition-all" />
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-black text-[9px] md:text-[10px] uppercase tracking-[3px] md:tracking-[4px] text-ocean mb-6 md:mb-12">Connect</h3>
            <ul className="space-y-5 md:space-y-6">
              {[
                { Icon: FiMapPin, text: 'Clinical HQ, Coastal Plaza, Level 4' },
                { Icon: FiPhone, text: '+91 98765 43210' },
                { Icon: FiInstagram, text: '@mediglow.gs', url: 'https://www.instagram.com/mediglow.gs?igsh=MXE5OWUxbWhjMTA3cw==' }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 text-slate-500 items-start">
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex gap-4 group">
                      <item.Icon className="text-ocean text-xl shrink-0 mt-0.5 group-hover:text-coral transition-colors" />
                      <span className="text-sm font-medium leading-relaxed group-hover:text-ocean transition-colors">{item.text}</span>
                    </a>
                  ) : (
                    <>
                      <item.Icon className="text-ocean text-xl shrink-0 mt-0.5" />
                      <span className="text-sm font-medium leading-relaxed">{item.text}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-ocean/10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-[9px] font-black uppercase tracking-[3px] text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} The Wave Marine Bio-Care. All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-ocean transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ocean transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
