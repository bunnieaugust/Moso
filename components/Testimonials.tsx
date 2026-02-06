import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';
import { Language, translations } from '../utils/translations';

interface TestimonialsProps {
  language?: Language;
}

const Testimonials: React.FC<TestimonialsProps> = ({ language = 'vi' }) => {
  const t = translations[language].testimonials;

  // Static images mapping to make translation array easier
  const avatars = [
     'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
     'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
     'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
     'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop',
     'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=150&auto=format&fit=crop',
     'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
  ];

  const testimonials: Testimonial[] = t.items.map((item: any, index: number) => ({
      id: String(index + 1),
      name: item.name,
      role: item.role,
      content: item.content,
      rating: 5, // All 5 stars in this curated list
      avatar: avatars[index]
  }));

  // Duplicate the list to create a seamless infinite loop
  const carouselItems = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-24 bg-stone-100 dark:bg-dark-900 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-40 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-xl">
             <span className="text-gold-600 dark:text-gold-400 uppercase tracking-widest text-sm font-semibold">{t.label}</span>
             <h2 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100 mt-2">
               {t.title1} <br/> <span className="text-rose-500 dark:text-rose-400">{t.title2}</span>{t.questionMark}
             </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex text-gold-500 dark:text-gold-400">
              {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={20} />)}
            </div>
            <p className="text-stone-600 dark:text-stone-400 text-sm ml-2">{t.rating}</p>
          </div>
        </div>
      </div>

      {/* Infinite Carousel Container */}
      <div className="relative w-full overflow-hidden mask-gradient-x">
        {/* Gradient Masks for fading effect at edges */}
        <div className="absolute top-0 left-0 h-full w-20 md:w-40 bg-gradient-to-r from-stone-100 dark:from-dark-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-20 md:w-40 bg-gradient-to-l from-stone-100 dark:from-dark-900 to-transparent z-10 pointer-events-none" />

        <motion.div 
          className="flex gap-6 w-max px-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 60, // Adjust speed here (higher = slower)
            ease: "linear", 
            repeat: Infinity 
          }}
          // Pause animation on hover
          whileHover={{ animationPlayState: "paused" }} 
        >
          {carouselItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[350px] md:w-[450px] flex-shrink-0 glass-card bg-white/60 dark:bg-white/5 p-8 rounded-2xl relative group border border-stone-200 dark:border-white/5 shadow-sm dark:shadow-none hover:border-gold-500/30 transition-colors"
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
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    fill={i < item.rating ? "currentColor" : "none"} 
                    className={i < item.rating ? "" : "text-stone-300 dark:text-stone-700"}
                    size={14} 
                  />
                ))}
              </div>

              <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm line-clamp-3">
                "{item.content}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;