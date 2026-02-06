import React, { Component, Suspense, ReactNode, ErrorInfo } from 'react';
import { Facebook, Instagram, Youtube, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Language, translations } from '../utils/translations';

// Lazy load Spline to avoid blocking initial render
const Spline = React.lazy(() => import('@splinetool/react-spline'));

interface SplineErrorBoundaryProps {
  children?: ReactNode;
  fallback: ReactNode;
}

interface SplineErrorBoundaryState {
  hasError: boolean;
}

// Simple Error Boundary to catch WebGL context errors
class SplineErrorBoundary extends Component<SplineErrorBoundaryProps, SplineErrorBoundaryState> {
  constructor(props: SplineErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): SplineErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("Spline 3D Error (WebGL Context Lost):", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface FooterProps {
  onNavigate: (view: 'return-policy' | 'usage-guide' | 'shipping-policy' | 'contact-page') => void;
  language?: Language;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, language = 'vi' }) => {
  const t = translations[language].footer;

  return (
    // Fixed positioning for Parallax effect on desktop (hidden behind main content)
    // Changed from -z-10 to z-0 to avoid being hidden behind body background if App has transparency
    <footer className="relative md:fixed md:bottom-0 md:left-0 md:w-full md:h-[500px] bg-dark-950 z-0 overflow-hidden flex flex-col md:flex-row">
      
      {/* 3D Spline Interactive Area - Left Side */}
      <div className="w-full md:w-1/2 h-[300px] md:h-full relative bg-gradient-to-br from-dark-900 to-black overflow-hidden order-2 md:order-1">
         <div className="absolute inset-0 z-0 opacity-60">
            <SplineErrorBoundary fallback={
               <img 
                 src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
                 alt="Abstract Gold Background" 
                 className="w-full h-full object-cover opacity-80"
               />
            }>
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center text-stone-600 gap-2">
                   <Loader2 className="animate-spin" size={20}/>
                   <span className="text-xs tracking-widest uppercase">Loading 3D...</span>
                </div>
              }>
                 <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
              </Suspense>
            </SplineErrorBoundary>
         </div>
         
         {/* Overlay Content on Spline */}
         <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10 pointer-events-none">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-serif text-white/90 mb-2">Moso</h2>
              <p className="text-gold-400 uppercase tracking-[0.3em] text-xs font-medium">Beauty Dessert</p>
            </motion.div>
         </div>
      </div>

      {/* Content Area - Right Side */}
      <div className="w-full md:w-1/2 h-full bg-dark-950/95 backdrop-blur-xl border-t md:border-t-0 md:border-l border-white/5 p-8 md:p-16 flex flex-col justify-between order-1 md:order-2">
         
         <div className="grid grid-cols-2 gap-8 md:gap-12">
            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-white text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-gold-500"></span> {t.explore}
              </h4>
              <ul className="space-y-4 text-sm text-stone-400">
                {[
                  { label: t.links.about, href: '#' },
                  { label: t.links.story, href: '#' },
                  { label: t.links.menu, href: '#' },
                  { label: t.links.blog, href: '#' }
                ].map((item) => (
                  <li key={item.label}>
                    <button className="hover:text-gold-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                       <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                       {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="font-serif text-white text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-gold-500"></span> {t.support}
              </h4>
              <ul className="space-y-4 text-sm text-stone-400">
                <li>
                  <button onClick={() => onNavigate('return-policy')} className="hover:text-gold-400 transition-colors">{t.links.return}</button>
                </li>
                <li>
                  <button onClick={() => onNavigate('usage-guide')} className="hover:text-gold-400 transition-colors">{t.links.guide}</button>
                </li>
                <li>
                  <button onClick={() => onNavigate('shipping-policy')} className="hover:text-gold-400 transition-colors">{t.links.shipping}</button>
                </li>
                <li>
                  <button onClick={() => onNavigate('contact-page')} className="hover:text-gold-400 transition-colors">{t.links.contact}</button>
                </li>
              </ul>
            </div>
         </div>

         {/* Newsletter & Social */}
         <div className="mt-12 pt-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div className="space-y-2">
                  <p className="text-stone-300 font-serif text-lg">{t.subscribe.title}</p>
                  <div className="flex gap-2">
                     <input 
                        type="email" 
                        placeholder={t.subscribe.placeholder} 
                        className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:border-gold-500 outline-none w-full md:w-64"
                     />
                     <button className="w-10 h-10 rounded-full bg-gold-500 text-white flex items-center justify-center hover:bg-gold-600 transition-colors">
                        <ArrowRight size={16} />
                     </button>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  {[Facebook, Instagram, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-stone-400 hover:bg-white hover:text-dark-950 hover:border-white transition-all duration-300">
                      <Icon size={18} />
                    </a>
                  ))}
               </div>
            </div>
            
            <div className="mt-8 flex justify-between items-center text-[10px] text-stone-600 uppercase tracking-wider">
               <p>{t.copyright}</p>
               <div className="flex gap-4">
                  <a href="#" className="hover:text-stone-400">{t.privacy}</a>
                  <a href="#" className="hover:text-stone-400">{t.terms}</a>
               </div>
            </div>
         </div>
      </div>
    </footer>
  );
};

export default Footer;