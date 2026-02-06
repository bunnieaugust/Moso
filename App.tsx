
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion'; // Ensure motion is imported
import Header from './components/Header';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import TechShowcase from './components/TechShowcase';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
// import ProductModal from './components/ProductModal'; // Replaced by ProductDetailPage
import ProductDetailPage from './components/ProductDetailPage';
import CheckoutModal from './components/CheckoutModal';
import PaymentSuccessModal from './components/PaymentSuccessModal';
import OrderHistoryModal from './components/OrderHistoryModal';
import OrderDetailsModal from './components/OrderDetailsModal';
import OrderLookupModal from './components/OrderLookupModal';
import WishlistModal from './components/WishlistModal';
import ShopPage from './components/ShopPage'; // Import ShopPage
import CustomCursor from './components/ui/CustomCursor'; // Import CustomCursor

// New Pages
import ReturnPolicy from './components/ReturnPolicy';
import UsageGuide from './components/UsageGuide';
import ShippingPolicy from './components/ShippingPolicy';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage'; // Import AboutPage
import RegisterPage from './components/RegisterPage'; // Import RegisterPage
import WaitlistPage from './components/WaitlistPage'; // Import WaitlistPage
import FAQPage from './components/FAQPage'; // Import FAQPage
import RewardsPage from './components/RewardsPage'; // Import RewardsPage
import BlogPage from './components/BlogPage'; // Import BlogPage

import { CartItem, Product, User, Order, OrderInfo } from './types';
import { Language, translations } from './utils/translations'; // Import Language type

// Initialize Stripe with a public test key
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// Fake database of initial orders for demonstration
const INITIAL_DB_ORDERS: Order[] = [
  {
     id: '882194',
     date: '15/10/2023 14:30',
     status: 'delivered',
     total: 189000,
     items: [{
       id: '1',
       name: 'Chè Hồng Hạo',
       description: '',
       price: '189.000đ',
       image: 'https://images.unsplash.com/photo-1605193952140-57143f2951dc?q=80&w=800&auto=format&fit=crop',
       quantity: 1,
       category: 'tea'
     }],
     shippingInfo: {
       fullName: 'Demo User',
       phone: '0912345678',
       address: '123 Đường Demo, P. Bến Nghé',
       city: 'Hồ Chí Minh',
       email: 'khachhang@moso.vn'
     },
     paymentMethod: 'Credit Card'
  }
];

// Define possible views including new pages
type ViewType = 'home' | 'shop' | 'about' | 'product' | 'return-policy' | 'usage-guide' | 'shipping-policy' | 'contact-page' | 'register' | 'waitlist' | 'faq' | 'rewards' | 'blog';

function App() {
  // State
  const [view, setView] = useState<ViewType>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  // Store ALL orders here (simulating a database)
  const [allOrders, setAllOrders] = useState<Order[]>(INITIAL_DB_ORDERS);
  
  // Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  
  const [user, setUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  
  // New State: Save shipping info from last successful order
  const [savedShippingInfo, setSavedShippingInfo] = useState<OrderInfo | null>(null);
  
  // Theme & Language State
  const [isDark, setIsDark] = useState(true);
  const [language, setLanguage] = useState<Language>('vi');

  // Initialize Theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'vi' ? 'en' : 'vi');
  };

  // View Navigation Logic
  const handleNavClick = (target: string, type: 'scroll' | 'view' = 'scroll') => {
    if (type === 'view') {
      setView(target as ViewType);
      window.scrollTo(0, 0);
    } else {
      // It's a scroll target
      if (view !== 'home') {
        setView('home');
        // Delay scroll to allow render
        setTimeout(() => {
          scrollToSection(target);
        }, 100);
      } else {
        scrollToSection(target);
      }
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle Footer Navigation
  const handleFooterNavigate = (newView: 'return-policy' | 'usage-guide' | 'shipping-policy' | 'contact-page') => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  // Product Selection Logic
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setView('product');
    window.scrollTo(0, 0);
  };

  // Wishlist Logic
  const toggleWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  // Cart Logic
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product, quantity: number = 1) => {
    // Add to cart if not present or update qty
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Checkout & Order Logic
  const handleCheckoutInit = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/\./g, '').replace('đ', '')) || 0;
  };
  const cartTotal = cartItems.reduce((acc, item) => acc + (parsePrice(item.price) * item.quantity), 0);

  const handlePaymentSuccess = (shippingInfo: OrderInfo, paymentMethod: string) => {
    // Save shipping info for next time
    setSavedShippingInfo(shippingInfo);

    // Generate Random Order ID
    const orderId = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Create new order
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('vi-VN', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit'
      }),
      status: 'processing',
      items: [...cartItems],
      total: cartTotal,
      shippingInfo: shippingInfo,
      paymentMethod: paymentMethod
    };

    // Add to "Database"
    setAllOrders(prev => [newOrder, ...prev]);
    setLastOrder(newOrder);
    setIsCheckoutOpen(false);
    setCartItems([]); // Clear cart
    setIsSuccessOpen(true);
  };

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderHistoryOpen(false); // Close history if open
    setIsSuccessOpen(false); // Close success if open
    setIsLookupOpen(false); // Close lookup if open
  };

  const handleLookupOrder = (orderId: string, email: string) => {
    const foundOrder = allOrders.find(
      o => o.id === orderId && o.shippingInfo.email?.toLowerCase() === email.toLowerCase()
    );

    if (foundOrder) {
      handleViewOrderDetails(foundOrder);
    } else {
      alert("Không tìm thấy đơn hàng! Vui lòng kiểm tra lại Mã đơn hàng và Email.");
    }
  };

  // Auth & Profile Logic
  const handleLogin = (name: string, email: string) => {
    setUser({ name, email, avatar: undefined });
  };
  
  const handleLogout = () => {
    setUser(null);
  };

  // Updated handler to switch between Modal Login and Page Register
  const handleAuthAction = (action: 'login' | 'register' = 'login') => {
    if (action === 'register') {
      setView('register');
      window.scrollTo(0, 0);
    } else {
      setIsAuthOpen(true);
    }
  };

  // Filter orders for the current user
  const userOrders = user 
    ? allOrders.filter(order => order.shippingInfo.email?.toLowerCase() === user.email.toLowerCase())
    : [];

  const t = translations[language];

  // View Rendering Helper
  const renderMainContent = () => {
    switch (view) {
      case 'shop':
        return (
          <ShopPage 
            onProductSelect={handleProductSelect}
            onAddToCart={(product) => addToCart(product, 1)}
            onToggleWishlist={toggleWishlist}
            wishlistItems={wishlistItems}
            language={language} // Pass language
          />
        );
      case 'about':
        return <AboutPage onNavigate={(id) => handleNavClick(id, 'view')} language={language} />;
      case 'product':
        return (
          <ProductDetailPage 
            product={selectedProduct!} 
            onBack={() => setView('shop')}
            onNavigate={handleNavClick}
            onAddToCart={addToCart}
            onBuyNow={handleBuyNow}
            onProductSelect={handleProductSelect}
            isWishlisted={wishlistItems.some(p => p.id === selectedProduct?.id)}
            onToggleWishlist={toggleWishlist}
            language={language} // Pass language
          />
        );
      case 'return-policy':
        return <ReturnPolicy onBack={() => setView('home')} />;
      case 'usage-guide':
        return <UsageGuide onBack={() => setView('home')} />;
      case 'shipping-policy':
        return <ShippingPolicy onBack={() => setView('home')} />;
      case 'contact-page':
        return <ContactPage onBack={() => setView('home')} language={language} />;
      case 'faq':
        return <FAQPage onBack={() => setView('home')} language={language} />;
      case 'rewards': 
        return (
          <RewardsPage 
            onJoin={() => {
              setView('register');
              window.scrollTo(0, 0);
            }} 
            language={language} 
          />
        );
      case 'blog': // New View
        return (
          <BlogPage 
            onNavigate={(id) => handleNavClick(id, 'view')}
            language={language}
          />
        );
      case 'register':
        return (
          <RegisterPage 
            onLoginClick={() => {
              setView('home'); // Or stay on page but open modal? Let's go home & open modal
              setTimeout(() => handleAuthAction('login'), 100);
            }}
            onRegisterSuccess={(name, email) => {
              handleLogin(name, email);
              setView('home');
            }}
            language={language} // Pass language
          />
        );
      case 'waitlist':
        return <WaitlistPage onBack={() => setView('home')} language={language} />;
      case 'home':
      default:
        // Parse story content for staggered animation
        const storyWords = t.story.content.split(" ");
        
        return (
          <>
            <Hero language={language} />
            
            <section id="story" className="py-20 text-center container mx-auto px-6">
              <p className="text-gold-500 dark:text-gold-400 uppercase tracking-[0.3em] text-xs mb-4 animate-pulse">
                {t.story.label}
              </p>
              
              {/* ANIMATED TEXT HERE */}
              <motion.p 
                className="font-serif text-2xl md:text-3xl text-stone-600 dark:text-stone-300 italic max-w-2xl mx-auto leading-relaxed"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.03 } },
                  hidden: {}
                }}
              >
                {storyWords.map((word, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 10, filter: 'blur(5px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="inline-block mr-1.5"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </section>

            <ProductShowcase 
              onProductSelect={handleProductSelect} 
              language={language} 
              onViewAll={() => handleNavClick('shop', 'view')} 
              onAddToCart={(product) => addToCart(product, 1)} // Passed onAddToCart
            />
            <TechShowcase language={language} />
            <Testimonials language={language} />
            <Contact language={language} />
          </>
        );
    }
  };

  // REMOVED bg-stone-50 dark:bg-dark-950 from this outer div to avoid hiding the Footer
  return (
    <div className="min-h-screen text-stone-800 dark:text-stone-200 selection:bg-rose-500/30 transition-colors duration-300 flex flex-col">
      <CustomCursor /> {/* Custom Cursor Added Here */}
      
      <Header 
        currentView={view}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={handleAuthAction} // Updated prop
        onOpenLookup={() => setIsLookupOpen(true)}
        user={user}
        onLogout={handleLogout}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onNavClick={handleNavClick}
        onViewOrderHistory={() => setIsOrderHistoryOpen(true)}
        language={language}
        toggleLanguage={toggleLanguage}
      />
      
      {/* 
        MAIN CONTENT WRAPPER - CRITICAL FOR FOOTER PARALLAX 
        1. relative z-10: Places this content visually ABOVE the fixed footer (z-0)
        2. mb-0 md:mb-[500px]: Creates a transparent "window" at the bottom of the scroll 
           equal to footer height, allowing the fixed footer to show through on desktop.
        3. bg-stone-50...: Ensures the background is opaque so footer is hidden until the end.
      */}
      <div className="relative z-10 bg-stone-50 dark:bg-dark-950 shadow-2xl mb-0 md:mb-[500px]">
        <main className="flex-grow">
          {renderMainContent()}
        </main>
      </div>
      
      {/* Footer sits outside the main flow on desktop (fixed), behaving like a reveal */}
      <Footer onNavigate={handleFooterNavigate} language={language} />

      {/* Overlays - Now Passing Language Prop */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
        onCheckout={handleCheckoutInit}
        language={language}
      />

      <WishlistModal 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlistItems}
        onRemove={removeFromWishlist}
        onAddToCart={(product) => {
          addToCart(product);
          setIsWishlistOpen(false);
        }}
        language={language}
      />
      
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onRegisterClick={() => {
          setIsAuthOpen(false);
          handleAuthAction('register');
        }}
        language={language}
      />

      {/* Replaced Modal with Page View, kept Checkout and other modals */}
      <Elements stripe={stripePromise}>
        <CheckoutModal 
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cartItems={cartItems}
          total={cartTotal}
          onSuccess={handlePaymentSuccess}
          currentUser={user}
          savedInfo={savedShippingInfo}
        />
      </Elements>

      <PaymentSuccessModal 
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        orderId={lastOrder?.id}
        onViewOrder={() => lastOrder && handleViewOrderDetails(lastOrder)}
      />

      <OrderHistoryModal 
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        orders={userOrders}
        onViewDetails={handleViewOrderDetails}
      />

      <OrderLookupModal 
        isOpen={isLookupOpen}
        onClose={() => setIsLookupOpen(false)}
        onLookup={handleLookupOrder}
        language={language}
      />

      <OrderDetailsModal 
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}

export default App;
