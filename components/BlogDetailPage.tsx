
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import { Language, translations } from '../utils/translations';
import FadeIn from './ui/FadeIn';

interface BlogDetailPageProps {
  articleId: number;
  onBack: () => void;
  language?: Language;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ articleId, onBack, language = 'vi' }) => {
  const t = translations[language].blogPage;
  const article = t.articles.find(a => a.id === articleId);

  if (!article) return null;

  return (
    <div className="bg-[#FDFBF7] dark:bg-dark-950 min-h-screen transition-colors duration-500 pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-20 lg:px-60">
        
        {/* Navigation */}
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-stone-500 hover:text-gold-600 transition-colors mb-8 group text-sm uppercase tracking-widest font-medium"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t.backToBlog}</span>
        </button>

        {/* Header */}
        <FadeIn className="text-center mb-12">
           <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400 mb-6">
              <span className="flex items-center gap-2"><Tag size={12} /> {t.categories[article.category as keyof typeof t.categories]}</span>
              <span className="w-1 h-1 rounded-full bg-stone-300"></span>
              <span className="flex items-center gap-2"><Calendar size={12} /> {article.date || '2023'}</span>
           </div>
           <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 dark:text-stone-100 leading-tight mb-8 max-w-4xl mx-auto">
             {article.title}
           </h1>
           <p className="text-xl text-stone-500 dark:text-stone-400 font-light italic max-w-2xl mx-auto">
             "{article.excerpt}"
           </p>
        </FadeIn>

        {/* Hero Image */}
        <FadeIn delay={0.2} className="mb-16">
           <div className="aspect-[2/1] w-full overflow-hidden rounded-2xl shadow-2xl">
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
           </div>
        </FadeIn>

        {/* Content Body */}
        <div className="grid lg:grid-cols-12 gap-12">
           <div className="lg:col-span-2 hidden lg:block">
              <div className="sticky top-40 flex flex-col items-center gap-6">
                 <button className="w-10 h-10 rounded-full border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-400 hover:text-gold-600 hover:border-gold-600 transition-colors">
                    <Share2 size={18} />
                 </button>
                 <div className="w-px h-20 bg-stone-200 dark:bg-white/10"></div>
              </div>
           </div>

           <div className="lg:col-span-8">
              <FadeIn delay={0.3} className="prose prose-lg dark:prose-invert prose-stone max-w-none font-light leading-relaxed">
                 <div dangerouslySetInnerHTML={{ __html: article.content || `<p>${article.excerpt}</p><p>Nội dung chi tiết đang được cập nhật...</p>` }} />
              </FadeIn>
              
              <div className="mt-16 pt-8 border-t border-stone-200 dark:border-white/10 flex justify-between items-center">
                 <span className="text-sm font-bold uppercase tracking-widest text-stone-400">Share this article</span>
                 <div className="flex gap-4">
                    {/* Social Icons Placeholder */}
                    <div className="w-8 h-8 bg-stone-100 dark:bg-white/5 rounded-full"></div>
                    <div className="w-8 h-8 bg-stone-100 dark:bg-white/5 rounded-full"></div>
                    <div className="w-8 h-8 bg-stone-100 dark:bg-white/5 rounded-full"></div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default BlogDetailPage;
