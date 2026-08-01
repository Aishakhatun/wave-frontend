import { motion, AnimatePresence } from 'framer-motion';
import { FiPhoneCall, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const PhoneChoiceModal = ({ isOpen, onClose, phoneNumber = '+91 7600304304' }) => {
  if (!isOpen) return null;

  // Clean numeric phone number for tel: and whatsapp:
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');

  const handleCall = () => {
    window.location.href = `tel:+${cleanNumber}`;
    onClose();
  };

  const handleWhatsApp = () => {
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent('Hello The Wave team, I would like to inquire about your products and services.')}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-sm bg-white rounded-[28px] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden z-10"
        >
          {/* Top Close Button */}
          <div className="flex justify-end mb-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <FiX className="text-base" />
            </button>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {/* Phone Call Option */}
            <button
              onClick={handleCall}
              className="w-full group p-4 rounded-2xl border border-slate-200/80 hover:border-ocean bg-slate-50/50 hover:bg-ocean/5 transition-all duration-300 flex items-center justify-between text-left hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-ocean text-white flex items-center justify-center text-xl shadow-md shadow-ocean/20 group-hover:scale-110 transition-transform duration-300">
                  <FiPhoneCall />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-ocean transition-colors">
                    Direct Phone Call
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Instant voice call via phone app
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-ocean opacity-0 group-hover:opacity-100 transition-opacity">
                Call &rarr;
              </span>
            </button>

            {/* WhatsApp Option */}
            <button
              onClick={handleWhatsApp}
              className="w-full group p-4 rounded-2xl border border-slate-200/80 hover:border-emerald-500 bg-slate-50/50 hover:bg-emerald-50/60 transition-all duration-300 flex items-center justify-between text-left hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center text-2xl shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                  <FaWhatsapp />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    WhatsApp Chat
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Send a message directly on WhatsApp
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Chat &rarr;
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PhoneChoiceModal;
