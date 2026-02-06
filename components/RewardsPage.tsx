
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ArrowRight, UserPlus, ShoppingBag, Star, Instagram, Share2, Crown, Gem, Award, ChevronDown } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import FadeIn from './ui/FadeIn';
import Button from './ui/Button';

interface RewardsPageProps {
  onJoin: () => void;
  language?: Language;
}

const RewardsPage: React.FC<RewardsPageProps> = ({ onJoin, language = 'vi' }) => {
  const t = translations[language].rewardsPage;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const icons = {
    'Mua sắm': ShoppingBag,
    'Shop': ShoppingBag,
    'Đăng ký tài khoản': UserPlus,
    'Create Account': UserPlus,
    'Đánh giá sản phẩm': Star,
    'Review Product': Star,
    'Theo dõi Instagram': Instagram,
    'Follow Instagram': Instagram,
    'Giới thiệu bạn bè': Share2,
    'Refer a Friend': Share2,
  };

  const tierIcons = [Award, Crown, Gem]; // Silver, Gold, Diamond icons

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-[#FDFBF7] dark:bg-dark-950 min-h-screen transition-colors duration-500">
      
      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
         {/* Background Decor */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

         <div className="container mx-auto px-6 md:px-20 lg:px-40 relative z-10 text-center">
            <FadeIn direction="up">
               <span className="text-gold-600 dark:text-gold-400 uppercase tracking-[0.3em] text-xs font-bold mb-6 block">
                  Membership
               </span>
               <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-stone-900 dark:text-stone-100 mb-8 leading-tight">
                  {t.title}
               </h1>
               <p className="text-xl text-stone-600 dark:text-stone-300 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                  {t.desc}
               </p>
               <div className="flex justify-center gap-4">
                  <Button 
                     variant="primary" 
                     className="px-10 py-4 text-base shadow-gold-500/20 shadow-lg"
                     onClick={onJoin}
                  >
                     {t.joinBtn}
                  </Button>
               </div>
            </FadeIn>
         </div>
      </section>

      {/* 2. How it works */}
      <section className="py-20 bg-white dark:bg-white/5 border-y border-stone-100 dark:border-white/5">
         <div className="container mx-auto px-6 md:px-20 lg:px-40">
            <FadeIn direction="up" className="text-center mb-16">
               <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100">
                  {t.howTitle}
               </h2>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8 relative">
               {/* Connecting Line (Desktop) */}
               <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent border-t border-dashed border-gold-400/50" />

               {t.steps.map((step, idx) => (
                  <FadeIn key={idx} delay={idx * 0.2} direction="up" className="relative text-center">
                     <div className="w-24 h-24 bg-white dark:bg-stone-800 rounded-full border border-stone-200 dark:border-white/10 flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg group hover:-translate-y-2 transition-transform duration-300">
                        <span className="font-serif text-3xl text-gold-600 dark:text-gold-400 font-bold">{idx + 1}</span>
                     </div>
                     <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100 mb-3 font-bold">{step.title}</h3>
                     <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed px-4">
                        {step.desc}
                     </p>
                  </FadeIn>
               ))}
            </div>
         </div>
      </section>

      {/* 3. Membership Tiers */}
      <section className="py-24">
         <div className="container mx-auto px-6 md:px-20 lg:px-40">
            <FadeIn direction="up" className="text-center mb-16">
               <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100">
                  {t.tiersTitle}
               </h2>
            </FadeIn>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
               {t.tiers.map((tier, idx) => {
                  const TierIcon = tierIcons[idx];
                  const isGold = idx === 1; // Highlight middle tier
                  
                  return (
                     <FadeIn key={idx} delay={idx * 0.15} direction="up" className="h-full">
                        <div className={`
                           relative p-8 rounded-3xl h-full flex flex-col border transition-all duration-300 group
                           ${isGold 
                              ? 'bg-stone-900 text-white shadow-2xl scale-105 border-stone-900 z-10' 
                              : 'bg-white dark:bg-white/5 border-stone-200 dark:border-white/10 hover:border-gold-500/50'
                           }
                        `}>
                           {isGold && (
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-500 text-white text-[10px] uppercase tracking-widest px-4 py-1 rounded-full font-bold shadow-lg">
                                 Most Popular
                              </div>
                           )}

                           <div className="mb-6 flex justify-between items-start">
                              <div>
                                 <h3 className={`font-serif text-2xl mb-1 ${isGold ? 'text-gold-400' : 'text-stone-900 dark:text-stone-100'}`}>
                                    {tier.name}
                                 </h3>
                                 <p className={`text-sm ${isGold ? 'text-stone-400' : 'text-stone-500'}`}>
                                    {tier.requirement}
                                 </p>
                              </div>
                              <TierIcon size={32} className={`${isGold ? 'text-gold-400' : 'text-stone-300 group-hover:text-gold-500'} transition-colors`} />
                           </div>

                           <ul className="space-y-4 mb-8 flex-1">
                              {tier.benefits.map((benefit, bIdx) => (
                                 <li key={bIdx} className="flex items-start gap-3 text-sm">
                                    <div className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isGold ? 'bg-gold-500' : 'bg-stone-400'}`} />
                                    <span className={isGold ? 'text-stone-300' : 'text-stone-600 dark:text-stone-400'}>
                                       {benefit}
                                    </span>
                                 </li>
                              ))}
                           </ul>

                           <Button 
                              variant={isGold ? 'primary' : 'outline'} 
                              className="w-full"
                              onClick={onJoin}
                           >
                              {t.joinBtn}
                           </Button>
                        </div>
                     </FadeIn>
                  );
               })}
            </div>
         </div>
      </section>

      {/* 4. Ways to Earn */}
      <section className="py-24 bg-stone-100 dark:bg-stone-900/50">
         <div className="container mx-auto px-6 md:px-20 lg:px-40">
            <div className="grid md:grid-cols-2 gap-16 items-center">
               <FadeIn direction="right">
                  <h2 className="font-serif text-4xl text-stone-900 dark:text-stone-100 mb-6">
                     {t.waysToEarnTitle}
                  </h2>
                  <p className="text-stone-600 dark:text-stone-400 mb-8 leading-relaxed">
                     Tích điểm dễ dàng không chỉ qua việc mua sắm. Chúng tôi trân trọng mọi sự tương tác của bạn với Moso.
                  </p>
                  <div className="grid gap-4">
                     {t.ways.map((way, idx) => {
                        const Icon = icons[way.action as keyof typeof icons] || Star;
                        return (
                           <div key={idx} className="flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-xl border border-stone-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600 dark:text-gold-400">
                                    <Icon size={18} />
                                 </div>
                                 <span className="font-medium text-stone-900 dark:text-stone-200">{way.action}</span>
                              </div>
                              <span className="font-bold text-gold-600 dark:text-gold-400 bg-gold-500/5 px-3 py-1 rounded-full text-sm">
                                 +{way.points}
                              </span>
                           </div>
                        );
                     })}
                  </div>
               </FadeIn>

               <FadeIn direction="left" delay={0.2} className="relative h-full min-h-[500px] hidden md:block">
                  <div className="absolute inset-0 bg-stone-200 dark:bg-white/5 rounded-3xl overflow-hidden">
                     <img 
                        src="https://images.unsplash.com/photo-1606103920295-9a091573f160?q=80&w=1200&auto=format&fit=crop" 
                        alt="Moso Lifestyle" 
                        className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                     <div className="absolute bottom-8 left-8 right-8 text-white">
                        <p className="font-serif text-2xl italic">"Vẻ đẹp bắt nguồn từ sự yêu thương chính mình."</p>
                     </div>
                  </div>
               </FadeIn>
            </div>
         </div>
      </section>

      {/* 5. Rewards FAQ - Clean Style */}
      <section className="py-24 border-t border-stone-200 dark:border-white/5">
         <div className="container mx-auto px-6 md:px-20 lg:px-40 max-w-4xl">
            <FadeIn direction="up" className="text-center mb-16">
               <span className="text-gold-600 dark:text-gold-400 uppercase tracking-widest text-xs font-bold mb-3 block">
                  {t.faqBadge}
               </span>
               <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100">
                  {t.faqTitle}
               </h2>
            </FadeIn>

            <div className="space-y-4">
               {t.faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                     <FadeIn key={index} delay={index * 0.1} direction="up">
                        <div className="border-b border-stone-200 dark:border-white/10 last:border-0">
                           <button
                              onClick={() => toggleFaq(index)}
                              className="w-full py-6 flex items-center justify-between text-left group"
                           >
                              <span className={`font-serif text-xl transition-colors duration-300 pr-8 ${isOpen ? 'text-gold-600 dark:text-gold-400' : 'text-stone-800 dark:text-stone-200 group-hover:text-gold-500'}`}>
                                 {faq.q}
                              </span>
                              <span className={`flex-shrink-0 text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold-500' : 'group-hover:text-gold-500'}`}>
                                 <ChevronDown size={20} />
                              </span>
                           </button>
                           <AnimatePresence>
                              {isOpen && (
                                 <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                 >
                                    <p className="pb-8 text-stone-600 dark:text-stone-400 font-light leading-relaxed text-lg">
                                       {faq.a}
                                    </p>
                                 </motion.div>
                              )}
                           </AnimatePresence>
                        </div>
                     </FadeIn>
                  );
               })}
            </div>
         </div>
      </section>

    </div>
  );
};

export default RewardsPage;
