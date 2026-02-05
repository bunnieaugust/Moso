import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Khánh Linh',
    role: 'Food Reviewer',
    content: 'Mình cực thích chè dưỡng nhan nhưng lười nấu. Moso là chân ái, chỉ cần đổ nước vào gói tự sôi là có chè nóng ăn ngay. Vị ngọt thanh rất vừa miệng.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Thu Hà',
    role: 'Nhân viên ngân hàng',
    content: 'Mang đi làm ăn trưa rất tiện. Chén chè nhìn sang chảnh, hạt sen sấy thăng hoa mà ăn bùi như sen tươi. Sẽ ủng hộ dài dài.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Chị Mai',
    role: 'CEO',
    content: 'Set quà Tết Moso rất ấn tượng. Đối tác của tôi khen ngợi công nghệ lạ mắt và hương vị tinh tế. Bao bì thiết kế rất có gu.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop'
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-stone-100 dark:bg-dark-900 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
             <span className="text-gold-600 dark:text-gold-400 uppercase tracking-widest text-sm font-semibold">Lời Hồi Đáp</span>
             <h2 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100 mt-2">
               Khách hàng nói gì về <br/> <span className="text-rose-500 dark:text-rose-400">Moso</span>?
             </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex text-gold-500 dark:text-gold-400">
              {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={20} />)}
            </div>
            <p className="text-stone-600 dark:text-stone-400 text-sm ml-2">4.9/5 từ hơn 2,000 đánh giá</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="glass-card bg-white/60 dark:bg-white/5 p-8 rounded-2xl relative group border border-stone-200 dark:border-white/5 shadow-sm dark:shadow-none"
            >
              <Quote className="absolute top-6 right-6 text-stone-200 dark:text-white/5 group-hover:text-gold-500/20 transition-colors" size={48} />
              
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover border border-stone-200 dark:border-white/20"
                />
                <div>
                  <h4 className="text-stone-800 dark:text-stone-100 font-serif text-lg">{item.name}</h4>
                  <p className="text-gold-600 dark:text-gold-500/80 text-xs uppercase tracking-wide">{item.role}</p>
                </div>
              </div>

              <div className="flex text-gold-500 dark:text-gold-400 mb-4 text-xs">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} fill="currentColor" size={14} />
                ))}
              </div>

              <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm">
                "{item.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;