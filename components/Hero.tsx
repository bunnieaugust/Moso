import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import Button from './ui/Button';
import { Language, translations } from '../utils/translations';

interface HeroProps {
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Refined Parallax: Adjusted ranges for subtler, smoother movement
  // Extended input range to [0, 1000] to slow down the rate of change relative to scroll
  // Reduced output range to minimize distraction
  const y1 = useTransform(scrollY, [0, 1000], [0, 120]); 
  const y2 = useTransform(scrollY, [0, 1000], [0, -80]); 
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const t = translations[language].hero;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 transition-colors duration-300 bg-stone-100 dark:bg-dark-950">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gold-400/20 dark:bg-gold-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-rose-400/20 dark:bg-rose-600/10 rounded-full blur-[120px]" />
        
        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="container relative mx-auto px-6 md:px-40 z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/5 text-gold-600 dark:text-gold-300 text-xs tracking-widest uppercase">
            <Sparkles size={12} />
            <span>{t.badge}</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-stone-900 dark:text-stone-100">
            {t.title1} <br />
            <span className="text-gradient-gold italic">{t.title2}</span> <br />
            {t.title3}
          </h1>
          
          <p 
            className="text-lg text-stone-600 dark:text-stone-400 max-w-md leading-relaxed font-light"
            dangerouslySetInnerHTML={{ __html: t.desc }}
          />

          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              variant="primary" 
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.ctaPrimary}
            </Button>
            <Button 
              variant="glass"
              className="!text-stone-600 dark:!text-stone-200 border-stone-200 dark:border-white/10 hover:bg-stone-200/50 dark:hover:bg-white/20"
              onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.ctaSecondary}
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-8 border-t border-stone-200 dark:border-white/5">
            <div>
              <p className="text-2xl font-serif text-stone-800 dark:text-white">Retort</p>
              <p className="text-xs text-stone-500 uppercase tracking-wide">{t.feature1}</p>
            </div>
            <div>
              <p className="text-2xl font-serif text-stone-800 dark:text-white">8p</p>
              <p className="text-xs text-stone-500 uppercase tracking-wide">{t.feature2}</p>
            </div>
            <div>
              <p className="text-2xl font-serif text-stone-800 dark:text-white">Zero</p>
              <p className="text-xs text-stone-500 uppercase tracking-wide">{t.feature3}</p>
            </div>
          </div>
        </motion.div>

        {/* Visual Content - Parallax Images */}
        <div className="relative h-[600px] hidden lg:block">
          <motion.div style={{ y: y1 }} className="absolute top-0 right-10 z-20">
             <div className="relative w-80 h-[480px] rounded-[2rem] overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl shadow-stone-300/50 dark:shadow-black/50">
                <img 
                  src="https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop" 
                  alt="Dessert Soup" 
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-100/20 via-transparent to-transparent dark:from-dark-950/80" />
             </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="absolute bottom-20 left-10 z-10">
            <div className="relative w-64 h-80 rounded-[2rem] overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl glass-card p-2 bg-white/30 dark:bg-white/5">
               <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-white dark:bg-dark-900">
                  <img 
                    src="https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=800&auto=format&fit=crop" 
                    alt="Lotus Seeds Ingredients" 
                    className="w-full h-full object-cover opacity-90 dark:opacity-80"
                  />
               </div>
               {/* Floating Badge */}
               <div className="absolute -right-6 top-10 glass-panel px-4 py-2 rounded-lg border border-gold-500/20 transform rotate-6 bg-white/80 dark:bg-dark-900/80">
                 <p className="text-gold-600 dark:text-gold-300 font-serif text-sm">Chè Nhựa Đào</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">{t.scroll}</span>
        <ChevronDown className="text-gold-500 dark:text-gold-400 animate-bounce" size={20} />
      </motion.div>
    </section>
  );
};

export default Hero;