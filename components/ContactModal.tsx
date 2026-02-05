import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2 } from 'lucide-react';
import Button from './ui/Button';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setStep('success'), 1000);
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
            className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-dark-900 border border-stone-200 dark:border-white/10 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="p-8">
                {step === 'form' ? (
                  <>
                    <div className="text-center mb-8">
                      <h3 className="font-serif text-3xl text-stone-900 dark:text-stone-100 mb-2">Đặt Hàng Ngay</h3>
                      <p className="text-stone-500 dark:text-stone-400 text-sm">
                        Để lại thông tin, chuyên viên tư vấn của Moso sẽ liên hệ với bạn trong vòng 15 phút.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Họ tên</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-stone-50 dark:bg-dark-950 border border-stone-200 dark:border-white/10 rounded-lg px-4 py-3 text-stone-900 dark:text-stone-200 focus:outline-none focus:border-gold-500/50 transition-colors"
                          placeholder="Nguyễn Văn A"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Số điện thoại</label>
                        <input 
                          type="tel" 
                          required
                          className="w-full bg-stone-50 dark:bg-dark-950 border border-stone-200 dark:border-white/10 rounded-lg px-4 py-3 text-stone-900 dark:text-stone-200 focus:outline-none focus:border-gold-500/50 transition-colors"
                          placeholder="0912 xxx xxx"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Sản phẩm quan tâm</label>
                        <select className="w-full bg-stone-50 dark:bg-dark-950 border border-stone-200 dark:border-white/10 rounded-lg px-4 py-3 text-stone-900 dark:text-stone-200 focus:outline-none focus:border-gold-500/50 transition-colors">
                          <option>Set Moso Hoàng Gia</option>
                          <option>Chè Tuyết Yến Nhựa Đào</option>
                          <option>Chè Hạt Sen Long Nhãn</option>
                          <option>Tư vấn thêm</option>
                        </select>
                      </div>

                      <Button type="submit" className="w-full mt-6" icon={<Send size={16} />}>
                        Gửi Thông Tin
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-2">Gửi Thành Công!</h3>
                    <p className="text-stone-500 dark:text-stone-400 mb-8">
                      Cảm ơn bạn đã quan tâm đến Moso. Chúng tôi sẽ liên hệ sớm nhất.
                    </p>
                    <Button variant="outline" onClick={onClose}>Đóng cửa sổ</Button>
                  </div>
                )}
              </div>
              
              {/* Decorative bottom bar */}
              <div className="h-1 bg-gradient-to-r from-gold-600 via-rose-500 to-gold-600 w-full" />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;