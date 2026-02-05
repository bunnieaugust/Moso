import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, CheckCircle, Phone } from 'lucide-react';
import Button from './ui/Button';
import { notifyNewRegistration } from '../utils/emailService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string, email: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isLogin) {
      setLoadingText('Đang đăng nhập...');
      setTimeout(() => {
        onLogin(formData.name || 'Khách Hàng', formData.email);
        setIsLoading(false);
        onClose();
      }, 1500);
    } else {
      try {
        setLoadingText('Đang gửi thông báo...');
        await notifyNewRegistration(formData.name, formData.email, formData.phone);
        setLoadingText('Đang tạo tài khoản...');
        
        setTimeout(() => {
          setIsLoading(false);
          setShowSuccess(true);
          setTimeout(() => {
             onLogin(formData.name, formData.email);
             setShowSuccess(false);
             onClose();
          }, 2500);
        }, 800);

      } catch (error) {
        console.error("Registration failed", error);
        setIsLoading(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
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
              <button onClick={onClose} className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors z-10">
                <X size={20} />
              </button>

              {showSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-6 border border-green-500/20">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900 dark:text-white mb-2">Đăng Ký Thành Công!</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mb-4">
                    Chào mừng <strong>{formData.name}</strong> đến với Moso.
                  </p>
                  <p className="text-gold-600 dark:text-gold-400 text-xs bg-gold-500/10 px-4 py-2 rounded-lg border border-gold-500/20">
                    📧 Đã gửi email xác nhận đến: {formData.email}
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="p-8 pb-0 text-center">
                     <h2 className="font-serif text-3xl text-stone-900 dark:text-stone-100 mb-2">
                       {isLogin ? 'Chào Mừng Trở Lại' : 'Tham Gia Cùng Moso'}
                     </h2>
                     <p className="text-stone-500 dark:text-stone-400 text-sm">
                       {isLogin ? 'Đăng nhập để nhận ưu đãi thành viên' : 'Tạo tài khoản để theo dõi đơn hàng'}
                     </p>
                  </div>

                  <div className="flex px-8 mt-6 border-b border-stone-200 dark:border-white/5">
                    <button 
                      onClick={() => setIsLogin(true)}
                      className={`flex-1 pb-4 text-sm font-medium transition-colors relative ${isLogin ? 'text-gold-600 dark:text-gold-400' : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300'}`}
                    >
                      Đăng Nhập
                      {isLogin && <motion.div layoutId="authTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400" />}
                    </button>
                    <button 
                      onClick={() => setIsLogin(false)}
                      className={`flex-1 pb-4 text-sm font-medium transition-colors relative ${!isLogin ? 'text-gold-600 dark:text-gold-400' : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300'}`}
                    >
                      Đăng Ký
                      {!isLogin && <motion.div layoutId="authTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-400" />}
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-8 space-y-4">
                    <AnimatePresence mode="wait">
                      {!isLogin && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-4 overflow-hidden"
                        >
                          <div className="relative group">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 group-focus-within:text-gold-500 transition-colors" size={18} />
                            <input 
                              type="text" 
                              placeholder="Họ và tên" 
                              required={!isLogin}
                              value={formData.name}
                              onChange={e => setFormData({...formData, name: e.target.value})}
                              className="w-full bg-stone-50 dark:bg-dark-950 border border-stone-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-stone-900 dark:text-stone-200 outline-none focus:border-gold-500/50 transition-colors placeholder:text-stone-400 dark:placeholder:text-stone-600"
                            />
                          </div>
                          <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 group-focus-within:text-gold-500 transition-colors" size={18} />
                            <input 
                              type="tel" 
                              placeholder="Số điện thoại" 
                              required={!isLogin}
                              value={formData.phone}
                              onChange={e => setFormData({...formData, phone: e.target.value})}
                              className="w-full bg-stone-50 dark:bg-dark-950 border border-stone-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-stone-900 dark:text-stone-200 outline-none focus:border-gold-500/50 transition-colors placeholder:text-stone-400 dark:placeholder:text-stone-600"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 group-focus-within:text-gold-500 transition-colors" size={18} />
                      <input 
                        type="email" 
                        placeholder="Email của bạn" 
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
                        placeholder="Mật khẩu" 
                        required
                        value={formData.password}
                        onChange={e => setFormData({...formData, password: e.target.value})}
                        className="w-full bg-stone-50 dark:bg-dark-950 border border-stone-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-stone-900 dark:text-stone-200 outline-none focus:border-gold-500/50 transition-colors placeholder:text-stone-400 dark:placeholder:text-stone-600"
                      />
                    </div>

                    {isLogin && (
                      <div className="flex justify-end">
                        <button type="button" className="text-xs text-stone-500 dark:text-stone-400 hover:text-gold-500 transition-colors">
                          Quên mật khẩu?
                        </button>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="w-full mt-4" 
                      isLoading={isLoading}
                    >
                      {isLoading && loadingText ? loadingText : (isLogin ? 'Đăng Nhập' : 'Tạo Tài Khoản')}
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;