import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';
import { Language, translations } from '../utils/translations';
import FadeIn from './ui/FadeIn';
import LazyImage from './ui/LazyImage';

interface TestimonialsProps {
  language?: Language;
}

const Testimonials: React.FC<TestimonialsProps> = ({ language = 'vi' }) => {
  const t = translations[language].testimonials;

  const avatars = [
     'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
     'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
     'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
     'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop',
     'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=150&auto=format&fit=crop',
     'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
  ];

  // Get all testimonials
  const testimonials: Testimonial[] = t.items.map((item: any, index: number) => ({
      id: String(index + 1),
      name: item.name,
      role: item.role,
      content: item.content,
      rating: 5,
      avatar: avatars[index % avatars.length]
  }));

  // Duplicate items to create infinite scroll effect
  const carouselItems = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-black transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6 md:px-20 lg:px-40 mb-16">
         <FadeIn direction="up" className="text-center">
             <span className="text-gold-600 dark:text-gold-400 uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
               {t.label}
             </span>
             <h2 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100 mb-4">
               {t.title1} <span className="text-gold-500">Moso</span>{t.questionMark}
             </h2>
             <div className="flex items-center justify-center gap-2 text-stone-500 dark:text-stone-400">
                <div className="flex text-gold-500">
                   {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span>{t.rating}</span>
             </div>
         </FadeIn>
      </div>

      <FadeIn delay={0.2} direction="none" className="relative w-full">
         {/* Gradient Masks for smooth fade out at edges */}
         <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
         <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

         {/* Marquee Track */}
         <motion.div
           className="flex gap-6 w-max px-6"
           animate={{ x: ["0%", "-50%"] }}
           transition={{
             duration: 60,
             ease: "linear",
             repeat: Infinity
           }}
           whileHover={{ animationPlayState: "paused" }}
         >
           {carouselItems.map((item, idx) => (
              <div
                 key={`${item.id}-${idx}`}
                 className="w-[350px] md:w-[450px] flex-shrink-0 bg-stone-50 dark:bg-white/5 p-8 rounded-2xl border border-stone-200 dark:border-white/10 relative group hover:border-gold-500/50 transition-colors"
              >
                  <Quote className="text-gold-200 dark:text-gold-900 absolute top-6 right-6" size={40} />
                  
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-12 h-12 rounded-full overflow-hidden border border-stone-200 group-hover:border-gold-500 transition-colors">
                        <LazyImage 
                          src={item.avatar} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          containerClassName="w-full h-full"
                        />
                     </div>
                     <div>
                        <h4 className="font-bold text-stone-900 dark:text-stone-100">{item.name}</h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400">{item.role}</p>
                     </div>
                  </div>
                  
                  <p className="text-stone-600 dark:text-stone-300 italic leading-relaxed line-clamp-4">
                     "{item.content}"
                  </p>
                  
                  <div className="mt-6 flex text-gold-500">
                     {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
              </div>
           ))}
         </motion.div>
      </FadeIn>
    </section>
  );
};

export default Testimonials;