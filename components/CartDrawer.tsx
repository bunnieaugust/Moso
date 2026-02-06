
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import Button from './ui/Button';
import { Language, translations } from '../utils/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  language?: Language;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQty,
  onRemove,
  onCheckout,
  language = 'vi'
}) => {
  const t = translations[language].cartDrawer;

  // Helper to parse "189.000đ" -> 189000
  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/\./g, '').replace('đ', '')) || 0;
  };

  const total = items.reduce((acc, item) => acc + (parsePrice(item.price) * item.quantity), 0);

  // Format back to currency
  const formatPrice = (num: number) => {
    return num.toLocaleString('vi-VN') + 'đ';
  };

  const handleShopNow = () => {
    onClose();
    // Allow drawer animation to start before scrolling
    setTimeout(() => {
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark-950/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-dark-900 border-l border-stone-200 dark:border-white/10 z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-200 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-gold-500" />
                <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100">{t.title} ({items.length})</h2>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-stone-100 dark:hover:bg-white/5 flex items-center justify-center text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative">
              {items.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-stone-100 dark:bg-white/5 flex items-center justify-center mb-6 relative group border border-stone-200 dark:border-white/10">
                    <ShoppingBag size={32} className="text-stone-400 dark:text-stone-500 group-hover:text-gold-500 transition-colors duration-500" />
                    <div className="absolute inset-0 rounded-full border border-stone-200 dark:border-white/5 group-hover:border-gold-500/30 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  
                  <h3 className="font-serif text-2xl text-stone-800 dark:text-stone-200 mb-3">{t.emptyTitle}</h3>
                  <p 
                    className="text-stone-500 text-sm mb-8 max-w-[250px] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: t.emptyDesc }}
                  />
                  
                  <Button 
                    variant="primary" 
                    onClick={handleShopNow} 
                    className="min-w-[200px] shadow-lg shadow-gold-500/10"
                    icon={<ArrowRight size={18} />}
                  >
                    {t.exploreBtn}
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id} 
                    className="flex gap-4 bg-stone-50 dark:bg-white/5 p-4 rounded-xl border border-stone-200 dark:border-white/5 hover:border-gold-500/30 dark:hover:border-white/10 transition-colors group"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/5 dark:bg-black/10 group-hover:bg-transparent transition-colors" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-stone-800 dark:text-stone-200 line-clamp-1 text-lg">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-stone-400 hover:text-rose-500 transition-colors p-1"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-end mt-2">
                         <div className="flex items-center gap-3 bg-white dark:bg-dark-950 rounded-lg px-2 py-1 border border-stone-200 dark:border-white/10">
                            <button 
                              onClick={() => onUpdateQty(item.id, -1)}
                              className="text-stone-400 hover:text-stone-800 dark:hover:text-white p-1 hover:bg-stone-100 dark:hover:bg-white/10 rounded transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium w-4 text-center text-stone-800 dark:text-stone-200">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQty(item.id, 1)}
                              className="text-stone-400 hover:text-stone-800 dark:hover:text-white p-1 hover:bg-stone-100 dark:hover:bg-white/10 rounded transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                         </div>
                         <p className="text-gold-600 dark:text-gold-400 font-medium">
                            {formatPrice(parsePrice(item.price) * item.quantity)}
                         </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-stone-200 dark:border-white/5 bg-stone-50/80 dark:bg-dark-900/80 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-stone-500 dark:text-stone-400 text-sm">{t.total}</span>
                  <div className="flex flex-col items-end">
                    <span className="text-gold-600 dark:text-gold-400 font-bold font-serif text-2xl">
                      {formatPrice(total)}
                    </span>
                    <span className="text-stone-500 dark:text-stone-600 text-xs">{t.taxIncluded}</span>
                  </div>
                </div>
                <Button 
                  variant="primary" 
                  className="w-full py-4 text-base shadow-gold-500/20 shadow-lg"
                  onClick={onCheckout}
                >
                  {t.checkoutBtn}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
