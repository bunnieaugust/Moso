import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User as UserIcon, Sun, Moon, PackageSearch, Heart } from 'lucide-react';
import { NavItem, User } from '../types';
import Button from './ui/Button';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number; // Added prop
  onOpenCart: () => void;
  onOpenWishlist: () => void; // Added prop
  onOpenAuth: () => void;
  onOpenLookup: () => void;
  user: User | null;
  isDark: boolean;
  toggleTheme: () => void;
  onNavClick?: (sectionId: string, type?: 'scroll' | 'view') => void; // Updated signature
}

// Updated NavItems: Replaced 'Technology' with 'Contact' (view type)
const navItems: NavItem[] = [
  { label: 'Cửa Hàng', href: 'shop', type: 'view' }, // Shop Page
  { label: 'Về Moso', href: 'about', type: 'view' }, // About Page
  { label: 'Liên Hệ', href: 'contact-page', type: 'view' }, // Contact Page (Replaces Technology)
  { label: 'Đánh Giá', href: 'testimonials', type: 'scroll' },
];

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  wishlistCount,
  onOpenCart, 
  onOpenWishlist,
  onOpenAuth, 
  onOpenLookup, 
  user, 
  isDark, 
  toggleTheme,
  onNavClick 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, item: NavItem) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (onNavClick) {
      onNavClick(item.href, item.type);
    } else {
      // Fallback default behavior
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
              title="Tra cứu đơn hàng"
             >
               <PackageSearch size={20} />
             </button>

             {/* Wishlist Icon */}
             <button 
               className="text-stone-600 dark:text-stone-300 hover:text-rose-500 transition-colors relative p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full group"
               onClick={onOpenWishlist}
               title="Yêu thích"
             >
               <Heart size={20} className={`group-hover:scale-110 transition-transform ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
               {wishlistCount > 0 && (
                 <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
               )}
             </button>

             {user ? (
                <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300 cursor-pointer hover:text-gold-600 dark:hover:text-gold-300 transition-colors" onClick={onOpenAuth}>
                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-stone-200 dark:from-stone-800 to-stone-100 dark:to-stone-700 flex items-center justify-center border border-black/5 dark:border-white/10">
                      <span className="font-serif font-bold text-gold-500 dark:text-gold-400">{user.name.charAt(0)}</span>
                   </div>
                </div>
             ) : (
                <button 
                  onClick={onOpenAuth}
                  className="text-stone-600 dark:text-stone-300 hover:text-gold-600 dark:hover:text-gold-300 transition-colors p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full"
                  title="Đăng nhập / Đăng ký"
                >
                  <UserIcon size={20} />
                </button>
             )}

             <button 
               className="text-stone-600 dark:text-stone-300 hover:text-gold-600 dark:hover:text-gold-300 transition-colors relative p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full group"
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

             <Button 
               variant="primary" 
               className="!py-2 !px-5 text-xs ml-2" 
               onClick={(e) => { e.preventDefault(); if(onNavClick) onNavClick('shop', 'view'); }}
             >
               Đặt Hàng
             </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden relative z-50">
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
             Tra cứu đơn hàng
           </Button>
           <Button variant="ghost" onClick={() => { setIsMobileMenuOpen(false); onOpenWishlist(); }} icon={<Heart size={16}/>}>
             Sản phẩm yêu thích ({wishlistCount})
           </Button>
           <Button variant="ghost" onClick={() => { setIsMobileMenuOpen(false); onOpenAuth(); }}>
             {user ? 'Tài Khoản' : 'Đăng Nhập'}
           </Button>
        </div>
        <Button 
          variant="primary" 
          className="mt-4"
          onClick={(e) => {
             e.preventDefault(); 
             setIsMobileMenuOpen(false);
             if(onNavClick) onNavClick('shop', 'view');
          }}
        >
          Đặt Hàng Ngay
        </Button>
      </div>
    </header>
  );
};

export default Header;