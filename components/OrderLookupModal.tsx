import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Mail, PackageSearch, AlertCircle } from 'lucide-react';
import Button from './ui/Button';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLookup: (orderId: string, email: string) => void;
}

const OrderLookupModal: React.FC<OrderLookupModalProps> = ({ isOpen, onClose, onLookup }) => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!orderId.trim() || !email.trim()) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      onLookup(orderId, email);
      setIsLoading(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-[90] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-dark-900 border border-stone-200 dark:border-white/10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-stone-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-stone-200 dark:border-white/10 text-gold-500">
                  <PackageSearch size={32} />
                </div>
                <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100">Tra Cứu Đơn Hàng</h2>
                <p className="text-stone-500 dark:text-stone-400 text-sm mt-2">
                  Kiểm tra trạng thái đơn hàng của bạn bằng Mã đơn hàng và Email đặt hàng.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase text-stone-500 ml-1">Mã đơn hàng</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3.5 text-stone-400 dark:text-stone-500" size={18} />
                    <input 
                      type="text" 
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-dark-950 border border-stone-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-stone-900 dark:text-stone-200 outline-none focus:border-gold-500/50 transition-colors font-mono placeholder:font-sans placeholder:text-stone-400 dark:placeholder:text-stone-600"
                      placeholder="VD: 882194"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase text-stone-500 ml-1">Email đặt hàng</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-stone-400 dark:text-stone-500" size={18} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-dark-950 border border-stone-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-stone-900 dark:text-stone-200 outline-none focus:border-gold-500/50 transition-colors placeholder:text-stone-400 dark:placeholder:text-stone-600"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-rose-500 text-sm bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full mt-4"
                  isLoading={isLoading}
                >
                  Tra Cứu Ngay
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderLookupModal;