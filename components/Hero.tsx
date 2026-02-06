import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import Button from './ui/Button';

interface HeroProps {
  language: Language;
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const t = translations[language].hero;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1546833999-b9f58161460e?q=80&w=2500&auto=format&fit=crop" 
          alt="Moso Tea Ceremony" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-dark-950/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/60 via-transparent to-dark-950" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-300 text-sm tracking-widest uppercase backdrop-blur-md">
            <Sparkles size={14} />
            {t.badge}
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-6"
        >
          {t.title1} <br/>
          <span className="text-gradient-gold italic">{t.title2}</span> {t.title3}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-stone-200 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-10"
          dangerouslySetInnerHTML={{ __html: t.desc }}
        />

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="flex flex-col md:flex-row gap-4"
        >
          <Button 
            className="!px-8 !py-4 text-base min-w-[180px]"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t.ctaPrimary}
          </Button>
          <Button 
            variant="outline"
            className="!px-8 !py-4 text-base min-w-[180px] border-white/30 text-white hover:bg-white/10"
            onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t.ctaSecondary}
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50 flex flex-col items-center gap-2 animate-bounce"
      >
        <span className="text-xs uppercase tracking-widest">{t.scroll}</span>
        <ArrowDown size={20} />
      </motion.div>
    </div>
  );
};

export default Hero;