
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Loader2, Clock, Eye } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import FadeIn from './ui/FadeIn';
import Button from './ui/Button';
import BlogDetailPage from './BlogDetailPage';

interface BlogPageProps {
  onNavigate: (sectionId: string) => void;
  language?: Language;
}

const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, language = 'vi' }) => {
  const t = translations[language].blogPage;
  
  // State
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all'); // Filter state
  const [visibleCount, setVisibleCount] = useState(6); // Initial load count for bottom grid
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Scroll to top when switching categories
  useEffect(() => {
    setVisibleCount(6); 
  }, [activeCategory]);

  // Handle Load More
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 3);
      setIsLoadingMore(false);
    }, 800);
  };

  // If detail view is active, render Detail Page
  if (selectedArticleId !== null) {
    return (
      <BlogDetailPage 
        articleId={selectedArticleId} 
        onBack={() => {
          setSelectedArticleId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
        language={language} 
      />
    );
  }

  // --- FILTER LOGIC ---
  const allArticles = t.articles;
  const filteredArticles = activeCategory === 'all' 
    ? allArticles 
    : allArticles.filter(a => a.category === activeCategory);

  // --- LAYOUT LOGIC (1 Main + 3 Side + Remaining Grid) ---
  const mainFeatured = filteredArticles[0];
  const sideFeatured = filteredArticles.slice(1, 4);
  const gridArticles = filteredArticles.slice(4, 4 + visibleCount);
  const hasMore = filteredArticles.length > 4 + visibleCount; // Logic to check if there are more items

  return (
    <div className="bg-[#FDFBF7] dark:bg-dark-950 min-h-screen transition-colors duration-500 pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-20 lg:px-40">
        
        {/* Header */}
        <FadeIn className="mb-16 md:mb-24">
           <span className="text-gold-600 dark:text-gold-400 uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
             {t.subtitle}
           </span>
           <h1 className="font-serif text-5xl md:text-7xl text-stone-900 dark:text-stone-100 leading-[0.9]">
             {t.title}
           </h1>
        </FadeIn>

        {/* Categories (Filter) */}
        <div className="flex flex-wrap gap-4 mb-16 border-b border-stone-200 dark:border-white/10 pb-8 sticky top-24 z-30 bg-[#FDFBF7]/95 dark:bg-dark-950/95 backdrop-blur-sm transition-all py-4">
           {Object.entries(t.categories).map(([key, label], idx) => {
              const isActive = activeCategory === key;
              return (
                <button 
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`text-sm uppercase tracking-wider px-6 py-2 rounded-full border transition-all duration-300 ${
                    isActive 
                      ? 'bg-stone-900 text-white border-stone-900 dark:bg-white dark:text-stone-900' 
                      : 'border-transparent hover:border-stone-300 dark:hover:border-white/20 text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                   {label}
                </button>
              );
           })}
        </div>

        {/* --- HERO SECTION: 1 BIG LEFT, 3 SMALL RIGHT --- */}
        {filteredArticles.length > 0 ? (
          <div className="grid lg:grid-cols-12 gap-12 mb-32">
             
             {/* LEFT: Main Featured Article (Updated Layout: Image Left, Content Right) */}
             <div className="lg:col-span-8 group cursor-pointer" onClick={() => setSelectedArticleId(mainFeatured.id)}>
                <FadeIn className="h-full flex flex-col md:flex-row gap-8 items-start">
                  
                  {/* Image Container - 50% width on desktop, smaller aspect ratio */}
                  <div className="w-full md:w-1/2 overflow-hidden rounded-xl relative aspect-[4/3] self-start">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full"
                      >
                        <img 
                          src={mainFeatured.image} 
                          alt={mainFeatured.title} 
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      {/* Optional: Add a subtle overlay on hover if needed, but clean is better here */}
                  </div>
                  
                  {/* Content Container - 50% width */}
                  <div className="flex flex-col justify-center w-full md:w-1/2 h-full py-2">
                      <div className="flex items-center gap-3 mb-4 text-xs font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400">
                        <span>{t.categories[mainFeatured.category as keyof typeof t.categories]}</span>
                        <span className="w-1 h-1 bg-stone-300 rounded-full" />
                        <span className="text-stone-400 font-medium normal-case">{mainFeatured.date}</span>
                      </div>
                      
                      <h2 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 mb-4 leading-tight group-hover:text-gold-600 transition-colors duration-300">
                        {mainFeatured.title}
                      </h2>
                      
                      <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed mb-8 line-clamp-4 text-sm md:text-base">
                        {mainFeatured.excerpt}
                      </p>
                      
                      <div className="mt-auto">
                         <div className="w-12 h-12 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg">
                            <ArrowRight size={18} />
                         </div>
                      </div>
                  </div>
                </FadeIn>
             </div>

             {/* RIGHT: Sidebar List (3 Items) */}
             <div className="lg:col-span-4 flex flex-col gap-10 border-l border-stone-200 dark:border-white/10 lg:pl-12">
                <FadeIn delay={0.1}>
                  <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-2">
                    {language === 'vi' ? 'Bài Viết Mới' : 'Latest Stories'}
                  </h3>
                  <div className="w-12 h-0.5 bg-gold-500 mb-6"></div>
                </FadeIn>

                {sideFeatured.map((article, idx) => (
                  <FadeIn 
                    key={article.id} 
                    delay={0.2 + (idx * 0.1)} 
                    className="group cursor-pointer flex gap-4 items-start"
                    onClick={() => setSelectedArticleId(article.id)}
                  >
                     <div className="w-24 h-24 shrink-0 overflow-hidden rounded-lg bg-stone-200 dark:bg-white/5">
                        <motion.img 
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.8 }}
                          src={article.image} 
                          alt={article.title} 
                          className="w-full h-full object-cover"
                        />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600 dark:text-gold-400 mb-1">
                           {t.categories[article.category as keyof typeof t.categories]}
                        </span>
                        <h4 className="font-serif text-lg text-stone-900 dark:text-stone-100 leading-snug group-hover:text-gold-600 transition-colors line-clamp-2 mb-2">
                           {article.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-stone-400">
                           <Clock size={10} />
                           <span>{article.date}</span>
                        </div>
                     </div>
                  </FadeIn>
                ))}
             </div>
          </div>
        ) : (
          <div className="py-32 text-center">
             <div className="w-16 h-16 bg-stone-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                <Loader2 size={32} className="animate-spin" />
             </div>
             <p className="text-stone-500 dark:text-stone-400 font-light">
               {language === 'vi' ? 'Đang cập nhật bài viết cho danh mục này...' : 'Updating articles for this category...'}
             </p>
             <Button variant="outline" className="mt-6" onClick={() => setActiveCategory('all')}>
               {t.backToBlog || (language === 'vi' ? 'Xem tất cả' : 'View All')}
             </Button>
          </div>
        )}

        {/* --- REMAINING GRID SECTION --- */}
        {gridArticles.length > 0 && (
          <>
            <FadeIn className="mb-12 flex items-center gap-4">
               <h3 className="font-serif text-3xl text-stone-900 dark:text-stone-100">
                 {language === 'vi' ? 'Khám Phá Thêm' : 'Discover More'}
               </h3>
               <div className="h-px bg-stone-200 dark:bg-white/10 flex-1"></div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              <AnimatePresence mode='popLayout'>
                {gridArticles.map((article, idx) => (
                    <FadeIn 
                      key={article.id} 
                      delay={idx * 0.05} 
                      className="group cursor-pointer flex flex-col h-full"
                      onClick={() => setSelectedArticleId(article.id)}
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6 bg-stone-100 dark:bg-white/5 relative">
                          <motion.img 
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 1 }}
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                      </div>
                      <div className="flex flex-col flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 block">
                              {t.categories[article.category as keyof typeof t.categories]}
                            </span>
                          </div>
                          
                          <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-3 leading-snug group-hover:text-gold-600 transition-colors">
                            {article.title}
                          </h3>
                          
                          <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed font-light mb-6 line-clamp-3 flex-1">
                            {article.excerpt}
                          </p>
                          
                          <div className="mt-auto pt-4 border-t border-stone-200 dark:border-white/10 flex justify-between items-center text-xs uppercase tracking-widest font-medium text-stone-900 dark:text-stone-300">
                            <span>{t.readMore}</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-gold-500" />
                          </div>
                      </div>
                    </FadeIn>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="mt-24 text-center">
             <Button 
               variant="outline" 
               onClick={handleLoadMore}
               className="px-12 border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900 dark:border-white/10 dark:text-stone-400 dark:hover:border-white dark:hover:text-white transition-colors min-w-[200px]"
               disabled={isLoadingMore}
             >
                {isLoadingMore ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : 'Load More'}
             </Button>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogPage;
