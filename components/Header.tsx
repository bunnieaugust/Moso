import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User as UserIcon, Sun, Moon, PackageSearch, Heart, Globe } from 'lucide-react';
import { NavItem, User } from '../types';
import Button from './ui/Button';
import AuthPopover from './AuthPopover';
import { Language, translations } from '../utils/translations';

interface HeaderProps {
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
  // Using a timeout to prevent flickering when moving mouse between button and popover
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const t = translations[language].nav;

  const navItems: NavItem[] = [
    { label: t.shop, href: 'shop', type: 'view' },
    { label: t.about, href: 'about', type: 'view' },
    { label: t.contact, href: 'contact-page', type: 'view' },
    { label: t.reviews, href: 'testimonials', type: 'scroll' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setIsAuthHovered(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsAuthHovered(false);
    }, 200); // 200ms delay to allow moving to popover
    setHoverTimeout(timeout);
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, item: NavItem) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

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
          flex items-center justify-between rounded-full px-6 py-3 transition-colors duration-300
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
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.href}`}
                onClick={(e) => handleNavigation(e, item)}
                className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-gold-600 dark:hover:text-gold-300 transition-colors tracking-wide relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-gold-400 after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

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
               onMouseEnter={handleMouseEnter}
               onMouseLeave={handleMouseLeave}
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
                     className="!py-2.5 !px-6 text-xs ml-2 flex items-center gap-2 shadow-lg" 
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
        {navItems.map((item) => (
          <a
            key={item.label}
            href={`#${item.href}`}
            onClick={(e) => handleNavigation(e, item)}
            className="text-2xl font-serif text-stone-800 dark:text-gold-100 hover:text-gold-500 dark:hover:text-gold-400 transition-colors"
          >
            {item.label}
          </a>
        ))}
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