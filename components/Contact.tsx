
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import ContactModal from './ContactModal';
import { Language, translations } from '../utils/translations';

interface ContactProps {
  language?: Language;
}

const Contact: React.FC<ContactProps> = ({ language = 'vi' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = translations[language].contact;

  return (
    <>
      <section id="contact" className="py-24 relative overflow-hidden">
        {/* Full bg image with overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=2070&auto=format&fit=crop" 
            alt="Tea ceremony" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto px-6 md:px-40 relative z-10 text-center">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl mx-auto glass-panel p-12 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group hover:border-gold-500/30 hover:shadow-[0_0_50px_rgba(212,138,39,0.15)]"
          >
            {/* Sheen Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none" />

            <h2 className="font-serif text-4xl md:text-5xl text-stone-100 mb-6 relative z-10">
              {t.title1} <br/>
              <span className="text-gold-400 italic" dangerouslySetInnerHTML={{ __html: t.title2 }} />
            </h2>
            <p className="text-stone-300 text-lg mb-8 font-light relative z-10" dangerouslySetInnerHTML={{ __html: t.desc }} />
            
            <div className="relative z-10">
              <Button 
                variant="primary" 
                className="px-10 py-4 text-lg"
                onClick={() => setIsModalOpen(true)}
              >
                {t.cta}
              </Button>
            </div>
            
            <p className="mt-6 text-stone-500 text-xs uppercase tracking-widest relative z-10">
              {t.note}
            </p>
          </motion.div>
        </div>
      </section>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={language === 'vi' ? "Đăng Ký Nhận Ưu Đãi -20%" : "Sign Up For 20% OFF"} 
      />
    </>
  );
};

export default Contact;
