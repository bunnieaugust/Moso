import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, Thermometer, Zap } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import FadeIn from './ui/FadeIn';

interface TechShowcaseProps {
  language?: Language;
}

const TechShowcase: React.FC<TechShowcaseProps> = ({ language = 'vi' }) => {
  const t = translations[language].tech;
  
  const icons = [Zap, Flame, Clock, Thermometer];

  return (
    <section id="technology" className="py-24 bg-stone-50 dark:bg-dark-950 transition-colors duration-500 relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
         <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-gold-500 blur-[100px]" />
         <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-rose-500 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-20 relative z-10">
        
        <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-20">
           <span className="text-gold-600 dark:text-gold-400 uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
             {t.badge}
           </span>
           <h2 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100 mb-6">
             {t.title1} <span className="text-gradient-gold italic">{t.title2}</span>
           </h2>
           <p className="text-stone-600 dark:text-stone-400 text-lg font-light leading-relaxed">
             {t.desc}
           </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {t.steps.map((step, idx) => {
             const Icon = icons[idx];
             return (
               <FadeIn
                 key={idx}
                 delay={idx * 0.1}
                 className="h-full"
               >
                 <div className="glass-card p-8 rounded-2xl text-center group hover:-translate-y-2 transition-transform duration-300 h-full">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-rose-400 mx-auto mb-6 flex items-center justify-center text-white shadow-lg group-hover:shadow-gold-500/50 transition-shadow">
                       <Icon size={32} />
                    </div>
                    <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100 mb-3">{step.title}</h3>
                    <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                 </div>
               </FadeIn>
             );
           })}
        </div>
      </div>
    </section>
  );
};

export default TechShowcase;