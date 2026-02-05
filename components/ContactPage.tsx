import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Instagram, Facebook, Youtube } from 'lucide-react';
import Button from './ui/Button';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50 dark:bg-dark-950 transition-colors duration-300">
      
      {/* Back Button */}
      <div className="container mx-auto px-6 md:px-20 mb-12">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-sm text-stone-500 hover:text-gold-500 transition-colors group uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại</span>
        </button>
      </div>

      <div className="container mx-auto px-6 md:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
          
          {/* Left Column: Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl text-stone-900 dark:text-stone-100 mb-8 leading-none">
              Liên Hệ
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 dark:text-stone-300 font-serif italic mb-16 leading-relaxed">
              Chúng tôi luôn mong muốn lắng nghe từ bạn. <br/>
              Hãy chia sẻ những câu chuyện và trải nghiệm cùng Moso.
            </p>

            <div className="space-y-12">
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-4 font-bold">Hỗ trợ chung</h3>
                <a href="mailto:cskh@moso.vn" className="block text-lg text-stone-800 dark:text-stone-200 hover:text-gold-500 transition-colors mb-1">
                  cskh@moso.vn
                </a>
                <a href="tel:1900xxxx" className="block text-lg text-stone-800 dark:text-stone-200 hover:text-gold-500 transition-colors">
                  1900 xxxx
                </a>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-4 font-bold">Hợp tác & Kinh doanh</h3>
                <a href="mailto:hoptac@moso.vn" className="block text-lg text-stone-800 dark:text-stone-200 hover:text-gold-500 transition-colors">
                  hoptac@moso.vn
                </a>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-4 font-bold">Địa chỉ</h3>
                <p className="text-lg text-stone-800 dark:text-stone-200 leading-relaxed">
                  123 Đường Nguyễn Huệ,<br/>
                  Phường Bến Nghé, Quận 1,<br/>
                  TP. Hồ Chí Minh, Việt Nam
                </p>
              </div>

              <div>
                 <h3 className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-4 font-bold">Mạng xã hội</h3>
                 <div className="flex gap-6">
                    <a href="#" className="text-stone-800 dark:text-stone-200 hover:text-gold-500 transition-colors"><Instagram size={24} strokeWidth={1.5} /></a>
                    <a href="#" className="text-stone-800 dark:text-stone-200 hover:text-gold-500 transition-colors"><Facebook size={24} strokeWidth={1.5} /></a>
                    <a href="#" className="text-stone-800 dark:text-stone-200 hover:text-gold-500 transition-colors"><Youtube size={24} strokeWidth={1.5} /></a>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Minimal Form */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="pt-10 lg:pt-0"
          >
             <form className="space-y-8">
                <div className="group">
                   <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Họ và tên</label>
                   <input 
                      type="text" 
                      className="w-full bg-transparent border-b border-stone-300 dark:border-stone-700 py-3 text-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors rounded-none placeholder:text-stone-300 dark:placeholder:text-stone-700"
                      placeholder="Tên của bạn"
                   />
                </div>

                <div className="group">
                   <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Email</label>
                   <input 
                      type="email" 
                      className="w-full bg-transparent border-b border-stone-300 dark:border-stone-700 py-3 text-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors rounded-none placeholder:text-stone-300 dark:placeholder:text-stone-700"
                      placeholder="email@example.com"
                   />
                </div>

                <div className="group">
                   <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Chủ đề</label>
                   <select className="w-full bg-transparent border-b border-stone-300 dark:border-stone-700 py-3 text-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors rounded-none cursor-pointer appearance-none">
                      <option className="bg-white dark:bg-dark-900">Tư vấn sản phẩm</option>
                      <option className="bg-white dark:bg-dark-900">Đơn hàng & Vận chuyển</option>
                      <option className="bg-white dark:bg-dark-900">Hợp tác kinh doanh</option>
                      <option className="bg-white dark:bg-dark-900">Khác</option>
                   </select>
                </div>

                <div className="group">
                   <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Tin nhắn</label>
                   <textarea 
                      rows={5}
                      className="w-full bg-transparent border-b border-stone-300 dark:border-stone-700 py-3 text-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:border-gold-500 transition-colors rounded-none resize-none placeholder:text-stone-300 dark:placeholder:text-stone-700"
                      placeholder="Nội dung tin nhắn..."
                   ></textarea>
                </div>

                <div className="pt-8">
                   <Button 
                      variant="primary" 
                      className="w-full md:w-auto px-12 py-4"
                      icon={<ArrowRight size={18} />}
                   >
                      Gửi Tin Nhắn
                   </Button>
                </div>
             </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;