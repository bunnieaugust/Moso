
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Loader2, ChevronDown } from 'lucide-react';
import Button from './ui/Button';
import FadeIn from './ui/FadeIn';
import { Language, translations } from '../utils/translations';

interface WaitlistPageProps {
  onBack: () => void;
  language?: Language;
}

const WaitlistPage: React.FC<WaitlistPageProps> = ({ onBack, language = 'vi' }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[language].waitlistPage;

  // Set default value only if empty
  useEffect(() => {
    if (!formData.interest) {
      setFormData(prev => ({ ...prev, interest: t.form.interest || 'Set Quà Tặng' }));
    }
  }, [t.form.interest]);

  // Options for custom dropdown
  const interestOptions = [
    { value: 'Set Quà Tặng', label: 'Set Quà Tặng Doanh Nghiệp' },
    { value: 'Chè Dưỡng Nhan', label: 'Chè Dưỡng Nhan Tự Sôi' },
    { value: 'Hợp Tác', label: 'Hợp Tác Đại Lý' },
    { value: 'Khác', label: 'Khác' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Vui lòng đồng ý nhận thông tin từ Moso.");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
     return (
        <div className="min-h-screen bg-[#FDFBF7] dark:bg-dark-950 flex flex-col items-center justify-center p-6 text-center pt-32 transition-colors duration-500">
           <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="max-w-md w-full"
           >
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-6">
                 <Check size={40} />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 mb-4">{t.successTitle}</h2>
              <p className="text-stone-600 dark:text-stone-400 mb-8 leading-relaxed">
                 {t.successDesc}
              </p>
              <Button onClick={onBack} variant="outline" className="min-w-[200px]">
                 {t.backHome}
              </Button>
           </motion.div>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-dark-950 flex flex-col lg:flex-row transition-colors duration-500">
      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center min-h-screen relative z-10 px-6 md:px-20 lg:px-40 py-12 pt-28 lg:pt-32">
         <button 
           onClick={onBack} 
           className="self-start flex items-center gap-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors text-xs tracking-[0.2em] uppercase font-medium mb-12"
         >
           <ArrowLeft size={16} /> {t.back}
         </button>

         <FadeIn direction="up">
            <h1 
               className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 dark:text-stone-100 mb-6 leading-[1.1]"
               dangerouslySetInnerHTML={{ __html: t.title }}
            />
            <p className="text-stone-600 dark:text-stone-400 text-lg font-light leading-relaxed mb-10 max-w-lg">
               {t.desc}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
               <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                     <input 
                       required
                       type="text" 
                       placeholder={t.form.firstName} 
                       value={formData.firstName}
                       onChange={e => setFormData({...formData, firstName: e.target.value})}
                       className="w-full bg-white dark:bg-white/5 border border-stone-300 dark:border-stone-700 rounded px-4 py-3.5 text-stone-900 dark:text-stone-100 outline-none focus:border-gold-500 transition-colors placeholder:text-stone-400 font-light"
                     />
                  </div>
                  <div className="space-y-1">
                     <input 
                       required
                       type="text" 
                       placeholder={t.form.lastName} 
                       value={formData.lastName}
                       onChange={e => setFormData({...formData, lastName: e.target.value})}
                       className="w-full bg-white dark:bg-white/5 border border-stone-300 dark:border-stone-700 rounded px-4 py-3.5 text-stone-900 dark:text-stone-100 outline-none focus:border-gold-500 transition-colors placeholder:text-stone-400 font-light"
                     />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                     <input 
                       required
                       type="email" 
                       placeholder={t.form.email}
                       value={formData.email}
                       onChange={e => setFormData({...formData, email: e.target.value})}
                       className="w-full bg-white dark:bg-white/5 border border-stone-300 dark:border-stone-700 rounded px-4 py-3.5 text-stone-900 dark:text-stone-100 outline-none focus:border-gold-500 transition-colors placeholder:text-stone-400 font-light"
                     />
                  </div>
                  <div className="space-y-1">
                     <input 
                       type="tel" 
                       placeholder={t.form.phone} 
                       value={formData.phone}
                       onChange={e => setFormData({...formData, phone: e.target.value})}
                       className="w-full bg-white dark:bg-white/5 border border-stone-300 dark:border-stone-700 rounded px-4 py-3.5 text-stone-900 dark:text-stone-100 outline-none focus:border-gold-500 transition-colors placeholder:text-stone-400 font-light"
                     />
                  </div>
               </div>

               {/* CUSTOM DROPDOWN */}
               <div className="space-y-1 relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full bg-white dark:bg-white/5 border ${isDropdownOpen ? 'border-gold-500' : 'border-stone-300 dark:border-stone-700'} rounded px-4 py-3.5 text-stone-900 dark:text-stone-100 outline-none transition-all font-light flex items-center justify-between group hover:border-gold-500/50`}
                  >
                    <span className={formData.interest ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400'}>
                      {interestOptions.find(opt => opt.value === formData.interest)?.label || t.form.interest || 'Chọn sản phẩm'}
                    </span>
                    <ChevronDown size={16} className={`text-stone-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-gold-500' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                      >
                        {interestOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, interest: option.value });
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between
                              ${formData.interest === option.value 
                                ? 'bg-gold-500/10 text-gold-600 dark:text-gold-400 font-medium' 
                                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/10 hover:text-stone-900 dark:hover:text-stone-100'
                              }
                            `}
                          >
                            {option.label}
                            {formData.interest === option.value && <Check size={14} className="text-gold-500" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>

               <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                     <div className={`w-5 h-5 border flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300 rounded ${formData.consent ? 'bg-stone-900 border-stone-900 dark:bg-stone-100 dark:border-stone-100 text-white dark:text-stone-900' : 'border-stone-300 dark:border-stone-600 bg-white dark:bg-white/5 group-hover:border-gold-500'}`}>
                        {formData.consent && <Check size={14} strokeWidth={3} />}
                     </div>
                     <input 
                       type="checkbox" 
                       className="hidden" 
                       checked={formData.consent}
                       onChange={e => setFormData({...formData, consent: e.target.checked})}
                     />
                     <span className="text-sm text-stone-500 dark:text-stone-400 select-none leading-relaxed font-light group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors">
                        {t.form.consent}
                     </span>
                  </label>
               </div>

               <div className="pt-4">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-auto bg-stone-900 hover:bg-black text-white px-10 py-3 rounded text-sm tracking-widest uppercase shadow-none hover:shadow-lg dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200"
                    disabled={isSubmitting}
                  >
                     {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : t.form.submit}
                  </Button>
               </div>
            </form>
         </FadeIn>
      </div>

      {/* Right Column: Image */}
      <div className="w-full lg:w-1/2 relative bg-stone-200 order-first lg:order-last h-[40vh] lg:h-auto lg:min-h-screen overflow-hidden">
         <motion.div 
           initial={{ opacity: 0, scale: 1.1 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="absolute inset-0 w-full h-full"
         >
            <img 
               src="https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=1200&auto=format&fit=crop" 
               alt="Moso Packaging Stack" 
               className="w-full h-full object-cover"
            />
            {/* Overlay Gradient for better integration */}
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
         </motion.div>
      </div>
    </div>
  );
};

export default WaitlistPage;
