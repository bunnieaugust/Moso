import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from './ui/Button';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
  onViewOrder?: () => void;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({ isOpen, onClose, orderId, onViewOrder }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-dark-950/90 backdrop-blur-md z-[90] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-dark-900 border border-stone-200 dark:border-white/10 rounded-3xl p-10 max-w-md w-full text-center relative overflow-hidden shadow-2xl"
          >
            {/* Background Confetti Effect (Simple CSS dots) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-2 h-2 bg-gold-500 rounded-full animate-ping" />
                <div className="absolute top-20 right-20 w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
                <div className="absolute bottom-10 left-1/2 w-2 h-2 bg-green-500 rounded-full" />
            </div>

            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30"
            >
              <Check size={40} className="text-white" strokeWidth={3} />
            </motion.div>

            <h2 className="font-serif text-3xl text-stone-900 dark:text-stone-100 mb-2">Thanh Toán Thành Công!</h2>
            
            {orderId && (
              <div className="mb-4">
                <p className="text-stone-500 dark:text-stone-400 text-sm">Mã đơn hàng của bạn</p>
                <p className="text-gold-600 dark:text-gold-400 font-mono text-xl font-bold tracking-wider">#{orderId}</p>
              </div>
            )}

            <p className="text-stone-600 dark:text-stone-400 mb-8 leading-relaxed text-sm">
              Cảm ơn bạn đã tin tưởng Moso. Đơn hàng của bạn đã được tiếp nhận và sẽ sớm được giao đến bạn.
            </p>

            <div className="space-y-3">
              <Button onClick={onClose} className="w-full">
                Tiếp Tục Mua Sắm
              </Button>
              {onViewOrder && (
                <button 
                  onClick={onViewOrder}
                  className="text-stone-500 hover:text-gold-600 dark:hover:text-gold-400 text-sm transition-colors w-full py-2"
                >
                  Xem chi tiết đơn hàng
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentSuccessModal;