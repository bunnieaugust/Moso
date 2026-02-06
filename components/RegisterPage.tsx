import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import { notifyNewRegistration } from '../utils/emailService';

interface RegisterPageProps {
  onLoginClick: () => void;
  onRegisterSuccess: (name: string, email: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onLoginClick, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeTerms: false,
    subscribeNews: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      alert("Vui lòng đồng ý với Điều khoản và Chính sách quyền riêng tư.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call and email notification
      await notifyNewRegistration(formData.name || 'Thành viên mới', formData.email, 'Chưa cung cấp');
      
      // Fake delay for UX
      setTimeout(() => {
        setIsLoading(false);
        onRegisterSuccess(formData.name || 'Bạn', formData.email);
      }, 1500);

    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-dark-950 pt-24 pb-12 px-6 flex items-center justify-center transition-colors duration-500">
      <div className="w-full max-w-[1100px] grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
        
        {/* Left Side: Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center w-full max-w-md mx-auto lg:mx-0"
        >
          <div className="mb-8">
            <h1 className="font-serif text-4xl text-stone-900 dark:text-stone-100 mb-3">
              Đăng ký tài khoản
            </h1>
            <p className="text-stone-600 dark:text-stone-400 text-base font-light leading-relaxed">
              Nhận ngay mã giảm giá <span className="font-semibold text-gold-600">10%</span> gửi về email và hoàn tiền <span className="font-semibold text-gold-600">5%</span> cho mọi đơn hàng.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
             <div className="space-y-1">
                <input 
                  type="text" 
                  placeholder="Họ và tên"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white dark:bg-white/5 border border-stone-300 dark:border-stone-700 rounded-lg px-4 py-3 text-stone-900 dark:text-stone-100 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder:text-stone-400"
                />
             </div>

            <div className="space-y-1">
              <input 
                type="email" 
                placeholder="Địa chỉ Email"
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white dark:bg-white/5 border border-stone-300 dark:border-stone-700 rounded-lg px-4 py-3 text-stone-900 dark:text-stone-100 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder:text-stone-400"
              />
            </div>

            <div className="space-y-1">
              <input 
                type="password" 
                placeholder="Mật khẩu"
                required
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full bg-white dark:bg-white/5 border border-stone-300 dark:border-stone-700 rounded-lg px-4 py-3 text-stone-900 dark:text-stone-100 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all placeholder:text-stone-400"
              />
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${formData.agreeTerms ? 'bg-gold-600 border-gold-600 text-white' : 'border-stone-300 dark:border-stone-600 bg-white dark:bg-white/5 group-hover:border-gold-500'}`}>
                  {formData.agreeTerms && <Check size={14} strokeWidth={3} />}
                </div>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={formData.agreeTerms}
                  onChange={e => setFormData({...formData, agreeTerms: e.target.checked})}
                />
                <span className="text-sm text-stone-600 dark:text-stone-400 select-none leading-tight">
                  Đồng ý với <a href="#" className="underline decoration-stone-400 hover:text-gold-600">Điều khoản</a> và <a href="#" className="underline decoration-stone-400 hover:text-gold-600">Chính sách bảo mật</a>.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${formData.subscribeNews ? 'bg-gold-600 border-gold-600 text-white' : 'border-stone-300 dark:border-stone-600 bg-white dark:bg-white/5 group-hover:border-gold-500'}`}>
                   {formData.subscribeNews && <Check size={14} strokeWidth={3} />}
                </div>
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={formData.subscribeNews}
                  onChange={e => setFormData({...formData, subscribeNews: e.target.checked})}
                />
                <span className="text-sm text-stone-600 dark:text-stone-400 select-none leading-tight">
                  Nhận thông tin ưu đãi và tin tức.
                </span>
              </label>
            </div>

            <Button 
              type="submit"
              variant="primary" 
              className="w-full bg-stone-900 hover:bg-black text-white py-3.5 text-base tracking-wide mt-2 shadow-lg"
              isLoading={isLoading}
            >
              Tạo Tài Khoản
            </Button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-stone-200 dark:border-stone-700"></div>
              <span className="flex-shrink-0 mx-4 text-stone-400 text-xs uppercase tracking-wider">hoặc</span>
              <div className="flex-grow border-t border-stone-200 dark:border-stone-700"></div>
            </div>

            <button 
              type="button"
              className="w-full bg-white dark:bg-white/5 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-200 py-3 rounded-full font-medium flex items-center justify-center gap-3 hover:bg-stone-50 dark:hover:bg-white/10 transition-colors text-sm"
            >
               {/* Simple Google Icon SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Đăng nhập với Google
            </button>

            <div className="text-center mt-4">
               <p className="text-stone-600 dark:text-stone-400 text-sm">
                 Đã có tài khoản? {' '}
                 <button 
                   type="button"
                   onClick={onLoginClick}
                   className="font-bold text-stone-900 dark:text-white hover:underline decoration-gold-500"
                 >
                   Đăng nhập
                 </button>
               </p>
            </div>
          </form>
        </motion.div>

        {/* Right Side: Image */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="hidden lg:block relative h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl"
        >
           <img 
             src="https://images.unsplash.com/photo-1598155523122-38423ab4d6ce?q=80&w=1500&auto=format&fit=crop" 
             alt="Moso Aesthetics" 
             className="absolute inset-0 w-full h-full object-cover"
           />
           {/* Dark Overlay Gradient */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
           
           {/* Floating Leaf Element */}
           <div className="absolute bottom-10 left-10 right-10 text-white">
              <h3 className="font-serif text-3xl mb-3 italic text-gold-300">"Vẻ đẹp bắt nguồn từ sự thuần khiết."</h3>
              <p className="text-white/80 font-light text-sm leading-relaxed max-w-sm">
                 Tham gia cộng đồng Moso để nhận những bí quyết dưỡng nhan độc quyền.
              </p>
           </div>
        </motion.div>

      </div>
    </div>
  );
};

export default RegisterPage;