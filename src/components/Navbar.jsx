import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingBag, FiMenu, FiX, FiDroplet, FiInstagram } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

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
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled ? 'py-4 bg-white/95 backdrop-blur-xl shadow-lg shadow-ocean/5' : 'py-8 bg-transparent'
      }`}>
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/images/logo.jpeg"
            alt="The Wave"
            className="h-12 md:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
          />
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
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-4">
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
          <div className="fixed inset-0 z-[2000] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-ocean-deep/20 backdrop-blur-sm"
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-screen w-[80%] max-w-[320px] bg-white/95 backdrop-blur-2xl shadow-[-20px_0_80px_rgba(26,143,181,0.1)] flex flex-col p-10 border-l border-white/20"
            >
              <div className="flex justify-between items-center mb-16">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-ocean rounded-xl flex items-center justify-center text-white text-lg">
                    <FiDroplet />
                  </div>
                  <span className="text-xl font-black text-slate-900 tracking-tight">The Wave</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-sky-pale text-ocean text-xl"
                >
                  <FiX />
                </button>
              </div>

              <ul className="flex flex-col gap-6 pt-10">
                {links.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={l.to}
                      className={`text-xl font-bold tracking-tight flex items-center justify-between group ${location.pathname === l.to ? 'text-ocean' : 'text-slate-500 hover:text-slate-900'
                        }`}
                    >
                      {l.label}
                      <span className={`w-1.5 h-1.5 rounded-full bg-coral transition-all duration-500 ${location.pathname === l.to ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-50'}`} />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto pt-10 border-t border-sky-pale/20">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[3px] mb-6">Join the Ritual</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/mediglow.gs?igsh=MXE5OWUxbWhjMTA3cw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-tr from-ocean to-coral rounded-xl flex items-center justify-center text-white shadow-lg shadow-ocean/10"
                  >
                    <FiInstagram className="text-lg" />
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
