
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User as UserIcon, Sun, Moon, PackageSearch, Heart, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem, User } from '../types';
import Button from './ui/Button';
import AuthPopover from './AuthPopover';
import { Language, translations } from '../utils/translations';

interface HeaderProps {
  currentView?: string;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAuth: (view?: 'login' | 'register') => void;
  onOpenLookup: () => void;
  user: User | null;
  onLogout: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  onNavClick?: (sectionId: string, type?: 'scroll' | 'view') => void;
  onViewOrderHistory: () => void;
  language: Language;
  toggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentView,
  cartCount, 
  wishlistCount,
  onOpenCart, 
  onOpenWishlist,
  onOpenAuth, 
  onOpenLookup, 
  user, 
  onLogout, 
  isDark, 
  toggleTheme,
  onNavClick,
  onViewOrderHistory,
  language,
  toggleLanguage
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthHovered, setIsAuthHovered] = useState(false);
  const [isResourcesHovered, setIsResourcesHovered] = useState(false);
  
  // Using a timeout to prevent flickering when moving mouse between button and popover
  const [authHoverTimeout, setAuthHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [resourcesHoverTimeout, setResourcesHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const t = translations[language].nav;

  // Updated Navigation Structure
  const navItems: NavItem[] = [
    { label: t.shop, href: 'shop', type: 'view' },
    { label: t.about, href: 'about', type: 'view' },
    { label: t.resources, href: '#', type: 'dropdown', id: 'resources' }, // Mega Menu Trigger
    { label: t.contact, href: 'contact-page', type: 'view' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auth Popover Logic
  const handleAuthMouseEnter = () => {
    if (authHoverTimeout) clearTimeout(authHoverTimeout);
    setIsAuthHovered(true);
  };
  const handleAuthMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsAuthHovered(false);
    }, 200); 
    setAuthHoverTimeout(timeout);
  };

  // Resources Menu Logic
  const handleResourcesMouseEnter = () => {
    if (resourcesHoverTimeout) clearTimeout(resourcesHoverTimeout);
    setIsResourcesHovered(true);
  };
  const handleResourcesMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsResourcesHovered(false);
    }, 300); // Slightly longer delay for larger menu
    setResourcesHoverTimeout(timeout);
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, item: NavItem) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (item.type === 'dropdown') return; // Do nothing on click for dropdown, handled by hover

    if (onNavClick) {
      onNavClick(item.href, item.type);
    } else {
      if (item.type === 'scroll' || !item.type) {
         const element = document.getElementById(item.href);
         if (element) {
           const headerOffset = 100;
           const elementPosition = element.getBoundingClientRect().top;
           const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
   
           window.scrollTo({
             top: offsetPosition,
             behavior: 'smooth'
           });
         }
      }
    }
  };

  // Mega Menu Item Click Handler
  const handleResourceClick = (action: string) => {
    setIsResourcesHovered(false);
    if (action === 'waitlist') onNavClick && onNavClick('waitlist', 'view'); // Changed to view navigation
    if (action === 'rewards') onNavClick && onNavClick('rewards', 'view'); // Navigate to Rewards page
    if (action === 'blog') onNavClick && onNavClick('blog', 'view'); // Updated to Blog page
    if (action === 'faqs') onNavClick && onNavClick('faq', 'view'); // Updated to FAQ page
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="absolute inset-0 bg-dark-950/0 pointer-events-none" />
      
      {/* Dynamic Island style container */}
      <div className={`
        relative mx-auto max-w-[1440px] px-6 md:px-40
        transition-all duration-500 z-50
      `}>
        <div className={`
          flex items-center justify-between rounded-full px-6 py-3 transition-colors duration-300 relative
          ${isScrolled 
            ? 'glass-panel shadow-2xl shadow-black/10 dark:shadow-black/50 bg-white/80 dark:bg-black/40 backdrop-blur-md' 
            : 'bg-transparent'}
        `}>
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (onNavClick) onNavClick('home', 'view');
            }}
            className="relative z-10 flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-rose-400 flex items-center justify-center text-white font-serif font-bold text-lg shadow-lg group-hover:shadow-gold-500/50 transition-shadow">
              M
            </div>
            <span className="font-serif text-2xl font-bold text-stone-800 dark:text-stone-100 tracking-wider group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors">
              Moso
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              // Calculate active state
              // For Resources dropdown, verify if any of sub-pages are active
              const isResourcesActive = item.type === 'dropdown' && ['waitlist', 'rewards', 'blog', 'faq'].includes(currentView || '');
              const isActive = currentView === item.href || isResourcesActive;
              
              // Resources hover state for visual feedback when menu is open
              const isDropdownOpen = item.type === 'dropdown' && isResourcesHovered;

              return (
                <div 
                  key={item.label} 
                  className="relative"
                  onMouseEnter={item.type === 'dropdown' ? handleResourcesMouseEnter : undefined}
                  onMouseLeave={item.type === 'dropdown' ? handleResourcesMouseLeave : undefined}
                >
                  <a
                    href={`#${item.href}`}
                    onClick={(e) => handleNavigation(e, item)}
                    className={`
                      text-sm font-medium transition-colors tracking-wide relative py-3 flex items-center gap-1
                      ${isActive || isDropdownOpen ? 'text-gold-600 dark:text-gold-300' : 'text-stone-600 dark:text-stone-300 hover:text-gold-600 dark:hover:text-gold-300'}
                    `}
                  >
                    {item.label}
                    {item.type === 'dropdown' && (
                      <ChevronDown size={14} className={`transition-transform duration-300 ${isResourcesHovered ? 'rotate-180' : ''}`} />
                    )}
                    {/* Underline Indicator for active state */}
                    {item.type !== 'dropdown' && (
                      <span className={`absolute -bottom-1 left-0 h-px bg-gold-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    )}
                  </a>
                </div>
              );
            })}
          </nav>

          {/* MEGA MENU: RESOURCES */}
          <AnimatePresence>
            {isResourcesHovered && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onMouseEnter={handleResourcesMouseEnter}
                onMouseLeave={handleResourcesMouseLeave}
                className="absolute top-full left-0 w-full pt-6 z-40 hidden md:block"
              >
                <div className="bg-stone-50 dark:bg-dark-900 rounded-3xl p-8 shadow-2xl border border-stone-200 dark:border-white/10 mx-auto max-w-[900px]">
                   <div className="grid grid-cols-12 gap-8">
                      {/* Left: Links */}
                      <div className="col-span-5 flex flex-col justify-center space-y-4">
                         {[
                            { label: t.resourceMenu.waitlist, action: 'waitlist' },
                            { label: t.resourceMenu.rewards, action: 'rewards' },
                            { label: t.resourceMenu.blogs, action: 'blog' },
                            { label: t.resourceMenu.faqs, action: 'faqs' }
                         ].map((link, idx) => (
                           <button 
                             key={idx}
                             onClick={() => handleResourceClick(link.action)}
                             className={`text-left font-serif text-3xl transition-all duration-300 hover:translate-x-2 ${currentView === link.action ? 'text-gold-600 dark:text-gold-400 font-bold' : 'text-stone-400 hover:text-stone-900 dark:text-stone-500 dark:hover:text-stone-100'}`}
                           >
                             {link.label}
                           </button>
                         ))}
                      </div>

                      {/* Right: Featured Card */}
                      <div className="col-span-7">
                         <div className="relative h-[300px] w-full rounded-2xl overflow-hidden group cursor-pointer" onClick={() => handleResourceClick('blog')}>
                            <img 
                              src="https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?q=80&w=800&auto=format&fit=crop" 
                              alt="Featured Resource" 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                            <div className="absolute bottom-0 left-0 p-6 text-white">
                               <p className="text-xs uppercase tracking-widest mb-2 opacity-80">Featured</p>
                               <h3 className="font-serif text-2xl mb-1">Bí Quyết Dưỡng Nhan</h3>
                               <p className="text-sm opacity-90 font-light">Khám phá cách người xưa giữ gìn vẻ đẹp vĩnh cửu.</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
             {/* Language Toggle */}
             <button
               onClick={toggleLanguage}
               className="flex items-center gap-1 text-stone-600 dark:text-stone-300 hover:text-gold-600 dark:hover:text-gold-300 transition-colors p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full text-xs font-bold"
               title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
             >
               <Globe size={18} />
               {language === 'vi' ? 'VN' : 'EN'}
             </button>

             {/* Theme Toggle */}
             <button
              onClick={toggleTheme}
              className="text-stone-600 dark:text-stone-300 hover:text-gold-600 dark:hover:text-gold-300 transition-colors p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full"
              title="Giao diện"
             >
               {isDark ? <Sun size={20} /> : <Moon size={20} />}
             </button>

             {/* Order Lookup */}
             <button
              onClick={onOpenLookup}
              className="text-stone-600 dark:text-stone-300 hover:text-gold-600 dark:hover:text-gold-300 transition-colors p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full"
              title={t.lookup}
             >
               <PackageSearch size={20} />
             </button>

             {/* Wishlist Icon */}
             <button 
               className="text-stone-600 dark:text-stone-300 hover:text-rose-500 transition-colors relative p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full group"
               onClick={onOpenWishlist}
               title={t.wishlist}
             >
               <Heart size={20} className={`group-hover:scale-110 transition-transform ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
               {wishlistCount > 0 && (
                 <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
               )}
             </button>

             {/* Cart Icon */}
             <button 
               className="text-stone-600 dark:text-stone-300 hover:text-gold-600 dark:hover:text-gold-300 transition-colors relative p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full group mr-2"
               onClick={onOpenCart}
               title="Giỏ hàng"
             >
               <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
               {cartCount > 0 && (
                 <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-lg animate-bounce">
                   {cartCount}
                 </span>
               )}
             </button>

             {/* User Login Area with Popover */}
             <div 
               className="relative"
               onMouseEnter={handleAuthMouseEnter}
               onMouseLeave={handleAuthMouseLeave}
             >
               {user ? (
                  <div 
                    className="flex items-center gap-2 text-stone-600 dark:text-stone-300 cursor-pointer hover:text-gold-600 dark:hover:text-gold-300 transition-colors pl-2 border-l border-stone-200 dark:border-white/10" 
                    onClick={() => onViewOrderHistory()}
                  >
                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-200 dark:from-stone-800 to-stone-100 dark:to-stone-700 flex items-center justify-center border border-black/5 dark:border-white/10 shadow-sm">
                        <span className="font-serif font-bold text-gold-500 dark:text-gold-400">{user.name.charAt(0)}</span>
                     </div>
                  </div>
               ) : (
                  <Button 
                     variant="primary" 
                     className="!py-2.5 !px-6 text-xs ml-2 flex items-center gap-2 shadow-lg hover:scale-105 transition-transform duration-300" 
                     onClick={() => onOpenAuth('login')}
                     icon={<UserIcon size={16} />}
                  >
                     {t.login}
                  </Button>
               )}

               {/* Auth Popover */}
               <AuthPopover 
                 isVisible={isAuthHovered}
                 user={user}
                 onLogin={() => {
                   setIsAuthHovered(false);
                   onOpenAuth('login');
                 }}
                 onRegister={() => {
                   setIsAuthHovered(false);
                   onOpenAuth('register');
                 }}
                 onLogout={() => {
                   setIsAuthHovered(false);
                   onLogout();
                 }}
                 onViewHistory={() => {
                   setIsAuthHovered(false);
                   onViewOrderHistory();
                 }}
                 language={language}
               />
             </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden relative z-50">
             {/* Mobile Language Toggle */}
             <button
               onClick={toggleLanguage}
               className="text-stone-600 dark:text-stone-300 font-bold text-xs"
             >
               {language === 'vi' ? 'VN' : 'EN'}
             </button>
             <button
              onClick={toggleTheme}
              className="text-stone-600 dark:text-stone-300"
             >
               {isDark ? <Sun size={20} /> : <Moon size={20} />}
             </button>
            <button 
               className="text-stone-600 dark:text-stone-300 relative"
               onClick={onOpenCart}
             >
               <ShoppingBag size={20} />
               {cartCount > 0 && (
                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full" />
               )}
            </button>
            <button 
              className="text-stone-800 dark:text-stone-100 p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 bg-white/95 dark:bg-dark-950/95 backdrop-blur-xl z-40 md:hidden transition-all duration-300 flex flex-col justify-center items-center gap-8
        ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        {navItems.map((item) => {
          // Mobile Active state
          const isActive = currentView === item.href || (item.type === 'dropdown' && ['waitlist', 'rewards', 'blog', 'faq'].includes(currentView || ''));

          if (item.type === 'dropdown') {
             // Mobile view for dropdown (simplified to just main label or link to FAQs)
             return (
               <div key={item.label} className="flex flex-col items-center gap-2">
                  <span className={`text-2xl font-serif ${isActive ? 'text-gold-600 dark:text-gold-400' : 'text-stone-800 dark:text-gold-100'}`}>
                    {item.label}
                  </span>
                  <div className="flex flex-col items-center gap-2 text-sm text-stone-500">
                     <button onClick={() => { setIsMobileMenuOpen(false); onNavClick && onNavClick('waitlist', 'view'); }}>{t.resourceMenu.waitlist}</button>
                     <button onClick={() => { setIsMobileMenuOpen(false); onNavClick && onNavClick('rewards', 'view'); }}>{t.resourceMenu.rewards}</button>
                     <button onClick={() => { setIsMobileMenuOpen(false); onNavClick && onNavClick('blog', 'view'); }}>{t.resourceMenu.blogs}</button>
                     <button onClick={() => { setIsMobileMenuOpen(false); onNavClick && onNavClick('faq', 'view'); }}>{t.resourceMenu.faqs}</button>
                  </div>
               </div>
             );
          }
          return (
            <a
              key={item.label}
              href={`#${item.href}`}
              onClick={(e) => handleNavigation(e, item)}
              className={`text-2xl font-serif transition-colors ${isActive ? 'text-gold-600 dark:text-gold-400 underline decoration-gold-500 underline-offset-4' : 'text-stone-800 dark:text-gold-100 hover:text-gold-500 dark:hover:text-gold-400'}`}
            >
              {item.label}
            </a>
          );
        })}
        <div className="flex flex-col gap-4 mt-4 w-64">
           <Button variant="ghost" onClick={() => { setIsMobileMenuOpen(false); onOpenLookup(); }} icon={<PackageSearch size={16}/>}>
             {t.lookup}
           </Button>
           <Button variant="ghost" onClick={() => { setIsMobileMenuOpen(false); onOpenWishlist(); }} icon={<Heart size={16}/>}>
             {t.wishlist} ({wishlistCount})
           </Button>
        </div>
        <Button 
          variant="primary" 
          className="mt-4 w-64"
          onClick={(e) => {
             e.preventDefault(); 
             setIsMobileMenuOpen(false);
             if (user) onViewOrderHistory(); else onOpenAuth('login');
          }}
          icon={<UserIcon size={18} />}
        >
          {user ? `${t.welcome}, ${user.name}` : t.login}
        </Button>
        {user && (
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onLogout();
            }}
            className="text-sm text-stone-500 hover:text-rose-500"
          >
            {t.logout}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
