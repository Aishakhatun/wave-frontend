import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingBag, FiMenu, FiX, FiDroplet, FiInstagram } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import mainLogo from '../assets/mainlogo_circular.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/products', label: 'Products' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled ? 'py-2 md:py-4 bg-white/95 backdrop-blur-xl shadow-lg shadow-ocean/5' : 'py-4 md:py-8 bg-transparent'
      }`}>
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative h-14 w-14 md:h-24 md:w-24 rounded-full overflow-hidden border-2 border-ocean/20 shadow-[0_4px_25px_rgba(26,143,181,0.12)] transition-all duration-500 group-hover:scale-105 group-hover:border-ocean/45 group-hover:shadow-[0_8px_35px_rgba(26,143,181,0.25)] flex items-center justify-center bg-white">
            <img
              src={mainLogo}
              alt="The Wave"
              className="h-full w-full object-contain p-0.5 rounded-full"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-16">
          <ul className="flex items-center gap-12">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={`relative py-2 font-bold text-[17px] tracking-tight transition-colors ${location.pathname === l.to ? 'text-ocean' : 'text-slate-500 hover:text-ocean'
                  }`}>
                  {l.label}
                  {location.pathname === l.to && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-ocean rounded-full"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/thewave.glowwithflow/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 bg-ocean/10 text-ocean rounded-2xl flex items-center justify-center hover:bg-ocean hover:text-white transition-all duration-500 shadow-sm hover:shadow-ocean/20"
            >
              <FiInstagram className="text-xl" />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <a
            href="https://www.instagram.com/thewave.glowwithflow/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-ocean/10 text-ocean"
          >
            <FiInstagram />
          </a>
          <button
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-sky-pale text-ocean text-xl shadow-sm border border-sky-light/10"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[2000] lg:hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="relative z-10 w-[48%] bg-white/95 backdrop-blur-md shadow-[-15px_0_50px_rgba(26,143,181,0.08)] flex flex-col justify-between px-4 py-6 border-l border-slate-100 rounded-l-[32px] h-screen"
            >
              {/* Header: Close Button only */}
              <div className="flex justify-end items-center pb-3 border-b border-slate-100/60">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-sky-pale/50 text-ocean hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 pt-6 pb-10">
                <ul className="flex flex-col gap-5">
                  {links.map((l, i) => (
                    <motion.li
                      key={l.to}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, ease: 'easeOut' }}
                      whileHover={{ x: 6 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={l.to}
                        onClick={() => setMenuOpen(false)}
                        className={`group flex items-center justify-between py-2 text-base font-extrabold tracking-tight transition-all duration-300 ${
                          location.pathname === l.to
                            ? 'text-ocean pl-1.5'
                            : 'text-slate-500 hover:text-ocean hover:pl-1.5'
                        }`}
                      >
                        <span>{l.label}</span>
                        {location.pathname === l.to && (
                          <motion.div
                            layoutId="activeMobileIndicator"
                            className="w-1.5 h-1.5 rounded-full bg-ocean"
                          />
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Footer Instagram Button */}
              <div className="pt-4 border-t border-slate-100/60 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Connect</span>
                  <a
                    href="https://www.instagram.com/thewave.glowwithflow/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-ocean/10 text-ocean rounded-xl flex items-center justify-center hover:bg-ocean hover:text-white transition-all duration-300 shadow-sm"
                  >
                    <FiInstagram className="text-base" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
