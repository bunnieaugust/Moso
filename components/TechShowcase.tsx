
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Flame, Clock, Zap, Heart, Droplets, ThermometerSun, Sparkles } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import FadeIn from './ui/FadeIn';

interface TechShowcaseProps {
  language?: Language;
}

const TechShowcase: React.FC<TechShowcaseProps> = ({ language = 'vi' }) => {
  const t = translations[language].tech;
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Custom icons and floating elements for each step
  const stepsConfig = [
    { 
      icon: Droplets, 
      floatingIcon: <Zap size={16} />,
      color: "text-blue-400",
      bgGradient: "from-blue-500/20 to-blue-600/5"
    },
    { 
      icon: Flame, 
      floatingIcon: <ThermometerSun size={16} />,
      color: "text-rose-500",
      bgGradient: "from-rose-500/20 to-rose-600/5"
    },
    { 
      icon: Clock, 
      floatingIcon: <span className="text-[10px] font-bold">8m</span>,
      color: "text-gold-500",
      bgGradient: "from-gold-500/20 to-gold-600/5"
    },
    { 
      icon: Heart, 
      floatingIcon: <Sparkles size={16} />,
      color: "text-green-500",
      bgGradient: "from-green-500/20 to-green-600/5"
    }
  ];

  return (
    <section id="technology" className="py-32 bg-[#FAFAF8] dark:bg-black transition-colors duration-500 relative overflow-hidden">
      
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-gold-500/5 rounded-full blur-3xl animate-pulse" />
         <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-rose-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 md:px-20 relative z-10" ref={containerRef}>
        
        {/* Header */}
        <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-24">
           <span className="text-gold-600 dark:text-gold-400 uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
             {t.badge}
           </span>
           <motion.h2 
             className="font-serif text-4xl md:text-6xl text-stone-900 dark:text-stone-100 mb-6"
             whileHover={{ scale: 1.02 }}
             transition={{ type: "spring", stiffness: 300 }}
           >
             {t.title1} <span className="text-gradient-gold italic">{t.title2}</span>
           </motion.h2>
           <p className="text-stone-600 dark:text-stone-400 text-lg font-light leading-relaxed">
             {t.desc}
           </p>
        </FadeIn>

        {/* --- VERTICAL TIMELINE --- */}
        <div className="relative max-w-5xl mx-auto">
           
           {/* Central Line (Desktop) / Left Line (Mobile) */}
           <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-stone-200 dark:bg-white/10 md:-translate-x-1/2 rounded-full overflow-hidden">
              <motion.div 
                className="w-full bg-gradient-to-b from-gold-400 via-rose-500 to-gold-400 origin-top"
                style={{ scaleY, height: '100%' }}
              />
           </div>

           <div className="space-y-24 md:space-y-32">
              {t.steps.map((step, idx) => {
                const Config = stepsConfig[idx];
                const Icon = Config.icon;
                const isEven = idx % 2 === 0;

                return (
                  <TimelineItem 
                    key={idx} 
                    idx={idx} 
                    step={step} 
                    Config={Config} 
                    isEven={isEven} 
                    Icon={Icon} 
                  />
                );
              })}
           </div>
        </div>
      </div>
    </section>
  );
};

// Extracted Component for cleaner code
const TimelineItem = ({ idx, step, Config, isEven, Icon }: any) => {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["end end", "start start"]
  });

  // Animations based on individual item scroll position
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
  return (
    <div ref={itemRef} className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row gap-8 md:gap-0`}>
       
       {/* 1. Content Card (Desktop: Alternating Sides) */}
       <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
          <motion.div 
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`
               glass-card p-8 rounded-2xl border border-stone-200 dark:border-white/10 relative group hover:border-gold-500/30 transition-all duration-500
               ${isEven ? 'md:text-right' : 'md:text-left'} text-left
            `}
          >
             {/* Hover Glow */}
             <div className={`absolute inset-0 bg-gradient-to-br ${Config.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
             
             <div className="relative z-10">
                <span className="text-6xl font-serif text-stone-100 dark:text-white/5 absolute -top-4 -z-10 select-none font-bold">
                   0{idx + 1}
                </span>
                <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-3 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                   {step.title}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                   {step.desc}
                </p>
             </div>
          </motion.div>
       </div>

       {/* 2. Center Node (The Floating Element) */}
       <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20">
          <motion.div 
             style={{ scale, opacity }} // Scroll-linked scale/opacity
             className="relative"
          >
             {/* Outer Ring */}
             <div className="w-12 h-12 rounded-full bg-stone-50 dark:bg-stone-900 border-4 border-white dark:border-stone-800 shadow-xl flex items-center justify-center relative z-10">
                <Icon size={20} className={Config.color} />
             </div>
             
             {/* Floating Satellite Element */}
             <motion.div 
                animate={{ y: [-5, 5, -5], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -top-4 -right-4 w-8 h-8 rounded-full bg-white dark:bg-stone-800 shadow-lg flex items-center justify-center border border-stone-100 dark:border-white/10 text-gold-500 z-20`}
             >
                {Config.floatingIcon}
             </motion.div>

             {/* Pulse Effect */}
             <div className={`absolute inset-0 rounded-full ${Config.color.replace('text-', 'bg-')}/20 blur-xl animate-pulse -z-10`} />
          </motion.div>
       </div>

       {/* 3. Empty Spacer for Flex Balance */}
       <div className="w-full md:w-1/2 hidden md:block" />

    </div>
  );
};

export default TechShowcase;
