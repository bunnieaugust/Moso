
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Leaf, Heart, Zap, Sparkles } from 'lucide-react';
import Button from './ui/Button';
import FadeIn from './ui/FadeIn';
import { Language, translations } from '../utils/translations';

interface AboutPageProps {
  onNavigate: (sectionId: string) => void;
  language?: Language;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, language = 'vi' }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const t = translations[language].aboutPage;

  return (
    <div className="bg-stone-50 dark:bg-dark-950 min-h-screen transition-colors duration-500 overflow-hidden">
      
      {/* 1. Hero Section - Text Heavy, Minimalist */}
      <section className="pt-48 pb-32 px-6 md:px-40 container mx-auto">
        <FadeIn direction="up">
          <span className="block text-gold-600 dark:text-gold-400 text-xs uppercase tracking-[0.3em] mb-6 font-medium">
            {t.subtitle}
          </span>
          <h1 
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-stone-900 dark:text-stone-100 leading-[0.95] mb-12"
            dangerouslySetInnerHTML={{ __html: t.title }}
          />
        </FadeIn>
        
        <div className="grid md:grid-cols-12 gap-12 items-end">
           <div className="md:col-span-5 relative">
              <FadeIn direction="scale-up" delay={0.2}>
                <div className="aspect-[3/4] overflow-hidden rounded-sm">
                   <motion.img 
                     style={{ y }}
                     src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop" 
                     alt="Tea Pouring Art" 
                     className="w-full h-[120%] object-cover"
                   />
                </div>
                <p className="mt-4 text-xs text-stone-400 uppercase tracking-widest text-right">{t.est}</p>
              </FadeIn>
           </div>
           
           <div className="md:col-span-7 md:pl-12">
              <FadeIn direction="left" delay={0.4}>
                <p className="text-xl md:text-2xl text-stone-800 dark:text-stone-200 leading-relaxed font-light font-serif mb-8">
                  {t.intro1}
                </p>
                <div className="space-y-6 text-stone-600 dark:text-stone-400 text-sm md:text-base leading-loose max-w-xl">
                  <p>{t.intro2}</p>
                  <p dangerouslySetInnerHTML={{ __html: t.intro3 }} />
                </div>
              </FadeIn>
           </div>
        </div>
      </section>

      {/* 2. Vision & Mission Section (New - Yucca Style) */}
      <section className="py-20 px-6 md:px-40 container mx-auto">
        <FadeIn direction="up">
          {/* Header Statement */}
          <div className="grid md:grid-cols-2 gap-12 mb-24">
            <h2 
              className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100 leading-tight"
              dangerouslySetInnerHTML={{ __html: t.commitmentTitle }}
            />
            <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed self-center font-light">
              {t.commitmentDesc}
            </p>
          </div>

          {/* Mission Row */}
          <div className="border-t border-stone-200 dark:border-white/10 py-16 grid md:grid-cols-12 gap-6 items-start group hover:bg-stone-100/50 dark:hover:bg-white/5 transition-colors px-4 -mx-4 rounded-xl">
            <div className="md:col-span-4 flex items-center gap-4">
              <div className="w-2 h-2 bg-stone-900 dark:bg-stone-100 rounded-full group-hover:scale-150 transition-transform duration-300" />
              <h3 className="text-3xl font-serif text-stone-900 dark:text-stone-100">{t.missionTitle}</h3>
            </div>
            <div className="md:col-span-8">
              <p className="text-stone-600 dark:text-stone-300 text-lg md:text-xl leading-relaxed max-w-3xl font-light">
                {t.missionDesc}
              </p>
            </div>
          </div>

          {/* Vision Row */}
          <div className="border-t border-stone-200 dark:border-white/10 py-16 grid md:grid-cols-12 gap-6 items-start group hover:bg-stone-100/50 dark:hover:bg-white/5 transition-colors px-4 -mx-4 rounded-xl">
            <div className="md:col-span-4 flex items-center gap-4">
              <div className="w-2 h-2 bg-stone-900 dark:bg-stone-100 rounded-full group-hover:scale-150 transition-transform duration-300" />
              <h3 className="text-3xl font-serif text-stone-900 dark:text-stone-100">{t.visionTitle}</h3>
            </div>
            <div className="md:col-span-8">
              <p className="text-stone-600 dark:text-stone-300 text-lg md:text-xl leading-relaxed max-w-3xl font-light">
                {t.visionDesc}
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 3. Philosophy / Values - Clean Grid */}
      <section className="py-20 border-t border-stone-200 dark:border-white/5 bg-white dark:bg-white/5">
         <div className="container mx-auto px-6 md:px-40">
            <div className="grid md:grid-cols-3 gap-16">
               <FadeIn direction="up" delay={0.1}>
                  <div className="w-12 h-12 rounded-full border border-stone-200 dark:border-white/10 flex items-center justify-center text-gold-600 mb-6">
                     <Leaf size={20} />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-4">{t.value1Title}</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                     {t.value1Desc}
                  </p>
               </FadeIn>

               <FadeIn direction="up" delay={0.2}>
                  <div className="w-12 h-12 rounded-full border border-stone-200 dark:border-white/10 flex items-center justify-center text-gold-600 mb-6">
                     <Zap size={20} />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-4">{t.value2Title}</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                     {t.value2Desc}
                  </p>
               </FadeIn>

               <FadeIn direction="up" delay={0.3}>
                  <div className="w-12 h-12 rounded-full border border-stone-200 dark:border-white/10 flex items-center justify-center text-gold-600 mb-6">
                     <Heart size={20} />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-4">{t.value3Title}</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                     {t.value3Desc}
                  </p>
               </FadeIn>
            </div>
         </div>
      </section>

      {/* 4. Full width visual break */}
      <section className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
           <img 
             src="https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?q=80&w=2000&auto=format&fit=crop" 
             alt="Texture details" 
             className="w-full h-[120%] object-cover opacity-90 dark:opacity-70"
           />
           <div className="absolute inset-0 bg-black/20" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
           <FadeIn direction="scale-up">
             <div className="text-center text-white p-8 backdrop-blur-sm bg-white/5 border border-white/10 rounded-full w-64 h-64 md:w-80 md:h-80 flex flex-col items-center justify-center">
                <Sparkles size={32} className="mb-4 text-gold-300" />
                <p className="font-serif text-2xl md:text-3xl italic">{t.quote}</p>
             </div>
           </FadeIn>
        </div>
      </section>

      {/* 5. The Process / Tech Detail */}
      <section className="py-32 px-6 md:px-40 container mx-auto">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
               <FadeIn direction="right">
                  <span className="text-gold-600 dark:text-gold-400 uppercase tracking-widest text-xs font-bold mb-4 block">{t.processBadge}</span>
                  <h2 
                    className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100 mb-6"
                    dangerouslySetInnerHTML={{ __html: t.processTitle }}
                  />
                  <div className="space-y-8 relative">
                     {/* Vertical Line */}
                     <div className="absolute left-[19px] top-2 bottom-2 w-px bg-stone-200 dark:bg-white/10" />
                     
                     {t.steps.map((step, idx) => (
                       <FadeIn key={idx} delay={idx * 0.1} direction="up" className="relative flex items-start gap-6">
                          <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-dark-900 border border-stone-200 dark:border-white/10 flex items-center justify-center text-xs font-bold text-stone-500 z-10 shrink-0">
                             {idx + 1}
                          </div>
                          <div className="pt-2">
                             <h4 className="text-stone-900 dark:text-stone-100 font-serif text-xl mb-1">{step.title}</h4>
                             <p className="text-stone-500 dark:text-stone-400 text-sm">{step.desc}</p>
                          </div>
                       </FadeIn>
                     ))}
                  </div>
               </FadeIn>
            </div>
            
            <div className="order-1 md:order-2 relative h-full min-h-[500px]">
               <FadeIn direction="left" delay={0.2}>
                  <img 
                    src="https://images.unsplash.com/photo-1564858852877-e24c25d8041e?q=80&w=800&auto=format&fit=crop" 
                    alt="Process" 
                    className="w-full h-full object-cover rounded-sm shadow-2xl"
                  />
                  <div className="absolute -bottom-8 -left-8 bg-white dark:bg-stone-800 p-6 shadow-xl border border-stone-100 dark:border-white/5 max-w-xs hidden md:block">
                     <p className="font-serif text-xl italic text-stone-800 dark:text-stone-200">
                        {t.processQuote}
                     </p>
                  </div>
               </FadeIn>
            </div>
         </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 text-center bg-stone-100 dark:bg-white/5">
         <FadeIn direction="up">
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100 mb-6">
               {t.ctaTitle}
            </h2>
            <p className="text-stone-500 dark:text-stone-400 mb-8 max-w-lg mx-auto">
               {t.ctaDesc}
            </p>
            <Button 
               variant="primary" 
               onClick={() => onNavigate('shop')}
               className="px-12 py-4 text-base"
               icon={<ArrowRight size={18} />}
            >
               {t.ctaBtn}
            </Button>
         </FadeIn>
      </section>

    </div>
  );
};

export default AboutPage;
