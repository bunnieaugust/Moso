
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader2 } from 'lucide-react';
import Button from './ui/Button';
import { Language, translations } from '../utils/translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string, email: string) => void;
  onRegisterClick: () => void; // Callback to switch to Register Page
  language?: Language;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, onRegisterClick, language = 'vi' }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const t = translations[language].authModal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login API call
    setTimeout(() => {
      // Default name for demo since login doesn't really check DB
      onLogin('Khách Hàng', formData.email);
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-[80] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-dark-900 border border-stone-200 dark:border-white/10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative"
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8 pb-6 text-center">
                <h2 className="font-serif text-3xl text-stone-900 dark:text-stone-100 mb-2">
                  {t.welcomeBack}
                </h2>
                <p className="text-stone-500 dark:text-stone-400 text-sm">
                  {t.subtitle}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 pt-0 space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 group-focus-within:text-gold-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder={t.emailPlaceholder}
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-stone-50 dark:bg-dark-950 border border-stone-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-stone-900 dark:text-stone-200 outline-none focus:border-gold-500/50 transition-colors placeholder:text-stone-400 dark:placeholder:text-stone-600"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 group-focus-within:text-gold-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder={t.passwordPlaceholder}
                  required
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-stone-50 dark:bg-dark-950 border border-stone-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-stone-900 dark:text-stone-200 outline-none focus:border-gold-500/50 transition-colors placeholder:text-stone-400 dark:placeholder:text-stone-600"
                />
              </div>

              <div className="flex justify-end">
                <button type="button" className="text-xs text-stone-500 dark:text-stone-400 hover:text-gold-500 transition-colors">
                  {t.forgotPassword}
                </button>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full mt-4" 
                isLoading={isLoading}
              >
                {isLoading ? t.loggingIn : t.loginBtn}
              </Button>
            </form>

            <div className="p-4 bg-stone-50 dark:bg-white/5 border-t border-stone-200 dark:border-white/5 text-center">
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {t.noAccount}{' '}
                <button 
                  onClick={onRegisterClick}
                  className="font-bold text-stone-900 dark:text-white hover:underline decoration-gold-500 transition-all"
                >
                  {t.registerNow}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
