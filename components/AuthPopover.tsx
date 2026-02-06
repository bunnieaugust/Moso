import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Gift, LogOut, FileText, ChevronRight } from 'lucide-react';
import { User as UserType } from '../types';
import Button from './ui/Button';

interface AuthPopoverProps {
  isVisible: boolean;
  user: UserType | null;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
  onViewHistory: () => void;
}

const AuthPopover: React.FC<AuthPopoverProps> = ({ 
  isVisible, 
  user, 
  onLogin, 
  onRegister, 
  onLogout,
  onViewHistory 
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-dark-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-white/10 overflow-hidden z-[60]"
        >
          {/* Invisible bridge to prevent closing when moving mouse from icon to popover */}
          <div className="absolute -top-4 left-0 right-0 h-4 bg-transparent" />

          {user ? (
            // LOGGED IN STATE
            <div className="p-2">
               <div className="bg-stone-50 dark:bg-white/5 rounded-xl p-4 mb-2 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-rose-400 flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-stone-500 dark:text-stone-400">Xin chào,</p>
                    <p className="font-serif text-lg text-stone-900 dark:text-stone-100 font-bold">{user.name}</p>
                  </div>
               </div>
               
               <div className="space-y-1">
                 <button 
                   onClick={onViewHistory}
                   className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-stone-100 dark:hover:bg-white/5 text-stone-700 dark:text-stone-300 transition-colors group"
                 >
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-gold-500" />
                      <span className="text-sm font-medium">Đơn hàng của tôi</span>
                    </div>
                    <ChevronRight size={16} className="text-stone-400 group-hover:translate-x-1 transition-transform" />
                 </button>
                 
                 <div className="h-px bg-stone-100 dark:bg-white/10 my-1" />

                 <button 
                   onClick={onLogout}
                   className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 text-stone-700 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                 >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Đăng xuất</span>
                 </button>
               </div>
            </div>
          ) : (
            // GUEST STATE (Mimicking the Screenshot)
            <div className="p-4 space-y-4">
              {/* Rewards Section */}
              <div>
                <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wider">Moso Membership</p>
                <div className="bg-[#EFECE6] dark:bg-white/5 rounded-xl p-4 border border-[#E5E0D6] dark:border-white/10">
                   <div className="flex items-center gap-2 mb-2 text-stone-900 dark:text-white font-serif font-bold text-lg">
                      <Gift size={20} className="text-gold-600" />
                      <span>Moso Rewards.</span>
                   </div>
                   <p className="text-sm text-stone-600 dark:text-stone-300 mb-3 leading-relaxed">
                     Đăng nhập hoặc Đăng ký để tích điểm và nhận hoàn tiền <strong className="text-gold-600">5%</strong> cho mỗi đơn hàng.
                   </p>
                   <button className="text-xs font-bold underline decoration-gold-500 underline-offset-4 text-stone-800 dark:text-stone-200 hover:text-gold-600 transition-colors">
                     Tìm hiểu thêm
                   </button>
                </div>
              </div>

              {/* Account Section */}
              <div>
                <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wider">Tài khoản</p>
                <Button 
                  variant="primary" 
                  className="w-full bg-stone-900 hover:bg-black text-white dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200 border-none py-3 shadow-xl"
                  onClick={onLogin}
                >
                  Đăng Nhập
                </Button>
                
                <div className="mt-3 text-center text-xs text-stone-500 dark:text-stone-400">
                  Chưa có tài khoản?{' '}
                  <button 
                    onClick={onRegister}
                    className="font-bold text-stone-900 dark:text-stone-200 hover:underline decoration-gold-500"
                  >
                    Đăng ký ngay
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthPopover;