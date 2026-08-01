import { motion, AnimatePresence } from 'framer-motion';
import { FiPhoneCall, FiX, FiMessageSquare } from 'react-icons/fi';
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
          className="relative w-full max-w-md bg-white rounded-[32px] p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-ocean/10 text-ocean flex items-center justify-center text-lg font-bold">
                <FiMessageSquare />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 tracking-tight font-jakarta">
                  Contact Concierge
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {phoneNumber}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <FiX className="text-lg" />
            </button>
          </div>

          <p className="text-xs text-slate-500 font-semibold mb-6">
            Choose how you would like to get in touch with our support team:
          </p>

          {/* Options */}
          <div className="space-y-3.5">
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

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Available 24/7 for customer guidance
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PhoneChoiceModal;
