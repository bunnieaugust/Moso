
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import FadeIn from './ui/FadeIn';

interface FAQPageProps {
  onBack: () => void;
  language?: Language;
}

const FAQPage: React.FC<FAQPageProps> = ({ onBack, language = 'vi' }) => {
  const t = translations[language].faqPage;
  const [activeCategory, setActiveCategory] = useState<string>('product');
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);

  // Define categories array for mapping
  const categories = [
    { id: 'product', label: t.categories.product },
    { id: 'shipping', label: t.categories.shipping },
    { id: 'storage', label: t.categories.storage },
    { id: 'order', label: t.categories.order },
    { id: 'rewards', label: t.categories.rewards },
  ];

  // Filter questions based on active category
  const filteredQuestions = t.questions.filter(q => q.category === activeCategory);

  const toggleQuestion = (index: number) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  return (
    <div className="pt-24 pb-24 min-h-screen bg-[#FDFBF7] dark:bg-dark-950 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-20 lg:px-40">
        
        {/* Back Button */}
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-stone-500 hover:text-gold-500 transition-colors mb-12 group text-sm uppercase tracking-widest font-medium"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t.backHome}</span>
        </button>

        <FadeIn className="mb-20">
          <span className="text-gold-600 dark:text-gold-400 uppercase tracking-widest text-xs font-bold mb-3 block">FAQs</span>
          <h1 className="font-serif text-5xl md:text-7xl text-stone-900 dark:text-stone-100 leading-tight mb-6">
            {t.title}
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-lg max-w-2xl font-light">
            {t.subtitle}
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Sidebar: Categories */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-6 hidden lg:block">
                Danh mục
              </h3>
              
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 scrollbar-hide">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setOpenQuestionIndex(null);
                      }}
                      className={`
                        relative px-6 py-3 rounded-full lg:rounded-xl text-sm lg:text-lg text-left transition-all duration-300 whitespace-nowrap
                        ${isActive 
                          ? 'text-white lg:text-stone-900 lg:dark:text-white lg:font-medium' 
                          : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'}
                      `}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="activeCategoryMobile"
                          className="absolute inset-0 bg-stone-900 dark:bg-white rounded-full lg:hidden"
                          style={{ zIndex: 0 }}
                        />
                      )}

                      {isActive && (
                        <motion.div 
                          layoutId="activeCategoryDesktop"
                          className="hidden lg:block absolute inset-0 bg-stone-100 dark:bg-white/5 rounded-xl border-l-2 border-gold-500"
                          style={{ zIndex: 0 }}
                        />
                      )}

                      <span className="relative z-10 flex items-center justify-between w-full">
                        {cat.label}
                        {isActive && <ChevronRight size={16} className="hidden lg:block text-gold-500" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content: Questions with Clean Accordion Style */}
          <div className="lg:col-span-8 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="mb-8 lg:hidden">
                   <h2 className="font-serif text-3xl text-stone-900 dark:text-stone-100">
                      {categories.find(c => c.id === activeCategory)?.label}
                   </h2>
                </div>

                <div className="space-y-4">
                  {filteredQuestions.map((item, index) => {
                    const isOpen = openQuestionIndex === index;
                    return (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-stone-200 dark:border-white/10 last:border-0"
                      >
                        <button
                          onClick={() => toggleQuestion(index)}
                          className="w-full py-6 flex items-center justify-between text-left group"
                        >
                          <span className={`font-serif text-xl transition-colors duration-300 pr-8 ${isOpen ? 'text-gold-600 dark:text-gold-400' : 'text-stone-800 dark:text-stone-200 group-hover:text-gold-500'}`}>
                            {item.q}
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
                              <p className="pb-8 text-stone-600 dark:text-stone-400 font-light leading-relaxed text-lg max-w-3xl">
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FAQPage;
