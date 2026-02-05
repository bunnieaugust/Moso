import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import Button from './ui/Button';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemove: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

const WishlistModal: React.FC<WishlistModalProps> = ({ 
  isOpen, 
  onClose, 
  wishlist, 
  onRemove,
  onAddToCart 
}) => {

  const handleShopNow = () => {
    onClose();
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

          {/* Drawer (Right Side) similar to Cart */}
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
                <Heart className="text-rose-500" fill="currentColor" />
                <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100">Yêu Thích ({wishlist.length})</h2>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-stone-100 dark:hover:bg-white/5 flex items-center justify-center text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar relative">
              {wishlist.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-stone-100 dark:bg-white/5 flex items-center justify-center mb-6 relative group border border-stone-200 dark:border-white/10">
                    <Heart size={32} className="text-stone-400 dark:text-stone-500 group-hover:text-rose-500 transition-colors duration-500" />
                  </div>
                  
                  <h3 className="font-serif text-2xl text-stone-800 dark:text-stone-200 mb-3">Danh sách trống</h3>
                  <p className="text-stone-500 text-sm mb-8 max-w-[250px] leading-relaxed">
                    Bạn chưa lưu sản phẩm nào. <br/>
                    Hãy thả tim cho món chè bạn yêu thích nhé!
                  </p>
                  
                  <Button 
                    variant="primary" 
                    onClick={handleShopNow} 
                    className="min-w-[200px]"
                    icon={<ArrowRight size={18} />}
                  >
                    Xem Sản Phẩm
                  </Button>
                </div>
              ) : (
                wishlist.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={item.id} 
                    className="flex gap-4 bg-stone-50 dark:bg-white/5 p-4 rounded-xl border border-stone-200 dark:border-white/5 hover:border-gold-500/30 dark:hover:border-white/10 transition-colors group"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-stone-800 dark:text-stone-200 line-clamp-1 text-lg">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-stone-400 hover:text-rose-500 transition-colors p-1"
                          title="Bỏ yêu thích"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-end mt-2">
                         <p className="text-gold-600 dark:text-gold-400 font-medium">
                            {item.price}
                         </p>
                         <button 
                            onClick={() => onAddToCart(item)}
                            className="w-8 h-8 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                            title="Thêm vào giỏ"
                         >
                            <ShoppingCart size={14} />
                         </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistModal;