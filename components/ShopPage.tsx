import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Heart, ShoppingBag, SlidersHorizontal, LayoutGrid, Gift, ChevronLeft, ChevronRight, ChevronDown, Sparkles, X, ArrowDown, MousePointer2 } from 'lucide-react';
import { Product } from '../types';
import { products as initialProducts } from './ProductShowcase';
import Button from './ui/Button';

interface ShopPageProps {
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistItems: Product[];
}

// --- COMPONENT: LUXURY GIFT GUIDE SHOWCASE (HERO SECTION) ---
const GiftShowcase: React.FC<{ 
  products: Product[], 
  onSelect: (p: Product) => void,
  onAddToCart: (p: Product) => void,
  onScrollDown: () => void
}> = ({ products, onSelect, onAddToCart, onScrollDown }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  // Handle Drag End to switch products
  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50; // Drag distance threshold
    if (info.offset.x > threshold) {
      prevProduct();
    } else if (info.offset.x < -threshold) {
      nextProduct();
    }
  };

  // Determine the status of each product relative to the current index
  const getProductStatus = (index: number) => {
    if (index === currentIndex) return 'active';
    
    const len = products.length;
    // Calculate previous index wrapping around
    const prevIndex = (currentIndex - 1 + len) % len;
    // Calculate next index wrapping around
    const nextIndex = (currentIndex + 1) % len;

    if (index === prevIndex) return 'prev';
    if (index === nextIndex) return 'next';
    return 'hidden';
  };

  const currentProduct = products[currentIndex];

  return (
    <div className="relative h-[95vh] w-full overflow-hidden bg-[#050505] flex flex-col items-center justify-center font-serif text-white selection:bg-gold-500/30">
      
      {/* 1. Atmospheric Background (The Room) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Dark Room Ambience - Darker and more vignette */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543255006-d639f26f1c19?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 blur-sm scale-110" />
        
        {/* Heavy Vignette for Focus */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_90%)]" />
        
        {/* Floor Spotlight - Golden Glow */}
        <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[50vw] h-[25vh] bg-gold-600/10 rounded-[100%] blur-[100px]" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-float" />
      </div>

      {/* 2. Header Title - Spaced Out properly */}
      <div className="absolute top-[18%] md:top-[15%] left-0 right-0 flex flex-col items-center z-30 pointer-events-none transition-all duration-700">
         <Sparkles className="text-gold-400 w-3 h-3 mb-4 animate-pulse" />
         <span className="text-gold-500/50 font-sans text-[10px] tracking-[0.3em] uppercase mb-2">
            Seasonal Collection
         </span>
         <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-b from-stone-200 to-stone-700 drop-shadow-2xl font-serif">
            Gift Selection
         </h1>
         <span className="mt-3 font-mono text-gold-500/30 text-[10px] tracking-widest border border-gold-500/10 px-3 py-1 rounded-full">
            0{currentIndex + 1} / 0{products.length}
         </span>
      </div>

      {/* 3. Main Carousel Stage (Morphing 3 Items) */}
      <div className="relative w-full h-[55%] flex items-center justify-center perspective-[1200px] z-10 mt-32 md:mt-24">
        
        {/* Invisible Click Areas for Navigation */}
        <div className="absolute inset-y-0 left-0 w-[20%] z-40 cursor-pointer hidden md:block" onClick={prevProduct} />
        <div className="absolute inset-y-0 right-0 w-[20%] z-40 cursor-pointer hidden md:block" onClick={nextProduct} />

        {/* Render ALL products, but animate their positions based on status */}
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence initial={false}>
            {products.map((product, index) => {
              const status = getProductStatus(index);
              
              // Define animation states
              let animateProps = {};
              let zIndex = 0;

              if (status === 'active') {
                animateProps = {
                  x: 0,
                  scale: 1,
                  opacity: 1,
                  filter: 'blur(0px) brightness(1)',
                  zIndex: 20
                };
                zIndex = 20;
              } else if (status === 'prev') {
                animateProps = {
                  x: '-55%', // Move to left
                  scale: 0.65, // Shrink
                  opacity: 0.4, // Fade
                  filter: 'blur(3px) brightness(0.6)', // Blur
                  zIndex: 10
                };
                zIndex = 10;
              } else if (status === 'next') {
                animateProps = {
                  x: '55%', // Move to right
                  scale: 0.65, // Shrink
                  opacity: 0.4, // Fade
                  filter: 'blur(3px) brightness(0.6)', // Blur
                  zIndex: 10
                };
                zIndex = 10;
              } else {
                // Hidden items (wait off-screen)
                animateProps = {
                  x: '0%', 
                  scale: 0.4,
                  opacity: 0,
                  filter: 'blur(10px)',
                  zIndex: 0
                };
                zIndex = 0;
              }

              return (
                <motion.div
                  key={product.id}
                  initial={false}
                  animate={animateProps}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1] as const // Luxury easing
                  }}
                  // DRAG PROPS
                  drag={status === 'active' ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ cursor: 'grabbing', scale: 0.98 }}
                  // Styling
                  className="absolute top-0 bottom-0 flex items-center justify-center w-[300px] md:w-[400px] cursor-grab active:cursor-grabbing"
                  style={{ zIndex, touchAction: 'none' }} // touchAction none is important for drag
                  onClick={() => status === 'active' && onSelect(product)}
                >
                   {/* Product Container */}
                   <div className="relative w-full aspect-[3/4] flex flex-col items-center justify-center">
                      
                      {/* Reflection/Shadow (Only visible for active mainly) */}
                      {status === 'active' && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1 }}
                          className="absolute -bottom-10 left-10 right-10 h-6 bg-black/60 blur-xl rounded-[100%]" 
                        />
                      )}

                      {/* Main Image */}
                      <div className={`
                         relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500
                         ${status === 'active' ? 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 ring-1 ring-white/5' : ''}
                      `}>
                         <img 
                           src={product.image} 
                           alt={product.name}
                           className="w-full h-full object-cover pointer-events-none" // prevent image drag ghost
                         />
                         
                         {/* Gloss Overlay */}
                         <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/40 pointer-events-none" />
                      </div>

                       {/* Drag Hint (Only active) */}
                       {status === 'active' && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ delay: 2, duration: 1 }}
                            className="absolute bottom-4 flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-[10px] text-white/70 pointer-events-none"
                          >
                             <ArrowDown className="rotate-90" size={10} />
                             <span>Kéo để xem</span>
                             <ArrowDown className="-rotate-90" size={10} />
                          </motion.div>
                       )}
                   </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows (Floating near the center image) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[5%] md:left-[25%] z-50">
           <button 
             onClick={prevProduct}
             className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300 text-white/50 backdrop-blur-sm group hidden md:block"
           >
              <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
           </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-[5%] md:right-[25%] z-50">
           <button 
             onClick={nextProduct}
             className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300 text-white/50 backdrop-blur-sm group hidden md:block"
           >
              <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
           </button>
        </div>
      </div>

      {/* 4. Details (Bottom) */}
      <div className="absolute bottom-0 w-full z-30 flex flex-col items-center pb-10 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent pt-24 pointer-events-none">
         
         <div className="pointer-events-auto flex flex-col items-center">
            {/* Product Info Transition */}
            <AnimatePresence mode="wait">
              <motion.div 
                  key={currentProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-6"
              >
                  <h3 className="text-xl md:text-3xl font-serif text-white tracking-[0.1em] uppercase mb-3 drop-shadow-lg">
                    {currentProduct.name}
                  </h3>
                  <div className="w-8 h-px bg-gold-500 mx-auto mb-3"></div>
              </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <Button 
                variant="primary" 
                className="px-10 py-3 shadow-[0_0_30px_rgba(212,138,39,0.15)] text-xs tracking-[0.2em] uppercase bg-gold-600 hover:bg-gold-500 border-none min-w-[180px]"
                onClick={() => onAddToCart(currentProduct)}
            >
                Shop Now
            </Button>
            
            {/* Centered Scroll Indicator */}
            <div 
              className="mt-8 flex flex-col items-center gap-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity group"
              onClick={onScrollDown}
            >
               <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 group-hover:text-gold-400 transition-colors">
                  Khám phá bộ sưu tập
               </span>
               <div className="relative w-px h-12 bg-white/10 overflow-hidden">
                  <motion.div 
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-gold-500 to-transparent"
                  />
               </div>
               <ArrowDown className="text-gold-500 group-hover:scale-125 transition-transform duration-300" size={14} />
            </div>
         </div>

      </div>
    </div>
  );
};


const ShopPage: React.FC<ShopPageProps> = ({ 
  onProductSelect, 
  onAddToCart, 
  onToggleWishlist,
  wishlistItems 
}) => {
  const [filter, setFilter] = useState<'all' | 'tea' | 'gift'>('all');
  const [sort, setSort] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Helper for price
  const getPrice = (p: string) => parseInt(p.replace(/\D/g, ''));

  useEffect(() => {
    let result = [...initialProducts];
    if (filter !== 'all') {
      result = result.filter(p => p.category === filter);
    }
    if (sort === 'price-asc') {
      result.sort((a, b) => getPrice(a.price) - getPrice(b.price));
    } else if (sort === 'price-desc') {
      result.sort((a, b) => getPrice(b.price) - getPrice(a.price));
    }
    setFilteredProducts(result);
  }, [filter, sort]);

  const scrollToGrid = () => {
    const grid = document.getElementById('product-grid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'tea', label: 'Chè Dưỡng Nhan' },
    { id: 'gift', label: 'Set Quà Tặng' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-dark-950">
      
      {/* 1. GIFT GUIDE HERO SECTION */}
      <section className="relative z-10">
         <GiftShowcase 
            products={initialProducts} 
            onSelect={onProductSelect} 
            onAddToCart={(p) => onAddToCart(p)}
            onScrollDown={scrollToGrid}
         />
      </section>

      {/* 2. COLLECTION GRID SECTION */}
      <section id="product-grid" className="relative z-20 bg-stone-50 dark:bg-dark-950 py-24 min-h-screen">
         
         {/* Top Sticky Bar for Collection */}
         <div className="sticky top-20 md:top-24 z-30 bg-stone-50/95 dark:bg-dark-950/95 backdrop-blur-md border-b border-stone-200 dark:border-white/5 py-4 mb-12">
            <div className="container mx-auto px-6 md:px-40 flex justify-between items-center">
               <h2 className="font-serif text-2xl md:text-3xl text-stone-900 dark:text-stone-100">
                  Bộ Sưu Tập Moso
               </h2>
               
               <div className="flex gap-2">
                 <button 
                   onClick={scrollToTop}
                   className="p-2 rounded-full border border-stone-200 dark:border-white/10 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-colors text-stone-500"
                   title="Xem Gift Guide"
                 >
                    <Gift size={18} />
                 </button>
                 <button 
                   onClick={() => setIsFilterOpen(!isFilterOpen)}
                   className={`p-2 rounded-full border transition-colors md:hidden ${isFilterOpen ? 'bg-stone-900 text-white' : 'border-stone-200 text-stone-900 dark:text-stone-100'}`}
                 >
                    <SlidersHorizontal size={18} />
                 </button>
               </div>
            </div>
         </div>

         <div className="container mx-auto px-6 md:px-40">
            <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
               
               {/* Sidebar Filters */}
               <aside className={`w-full md:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden'} md:block`}>
                  <div className="sticky top-40 space-y-10">
                     <div>
                        <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-4 pb-2 border-b border-stone-200 dark:border-white/5">Danh Mục</h3>
                        <ul className="space-y-2">
                           {categories.map((cat) => (
                             <li key={cat.id}>
                               <button
                                 onClick={() => setFilter(cat.id as any)}
                                 className={`text-sm py-1 transition-all duration-300 hover:text-gold-600 dark:hover:text-gold-400 flex items-center gap-2 w-full text-left ${
                                   filter === cat.id 
                                     ? 'text-stone-900 dark:text-white font-bold pl-2 border-l-2 border-gold-500' 
                                     : 'text-stone-500 dark:text-stone-400'
                                 }`}
                               >
                                 {cat.label}
                               </button>
                             </li>
                           ))}
                        </ul>
                     </div>

                     <div>
                        <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-4 pb-2 border-b border-stone-200 dark:border-white/5">Sắp Xếp</h3>
                        <select 
                          value={sort}
                          onChange={(e) => setSort(e.target.value as any)}
                          className="w-full bg-transparent text-sm text-stone-600 dark:text-stone-400 outline-none cursor-pointer py-2 hover:text-gold-600 transition-colors border border-stone-200 dark:border-white/10 rounded-lg px-3"
                        >
                          <option value="newest" className="bg-white dark:bg-dark-900">Mới nhất</option>
                          <option value="price-asc" className="bg-white dark:bg-dark-900">Giá: Thấp đến Cao</option>
                          <option value="price-desc" className="bg-white dark:bg-dark-900">Giá: Cao đến Thấp</option>
                        </select>
                     </div>
                  </div>
               </aside>

               {/* Product Grid */}
               <main className="flex-1">
                  <motion.div 
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredProducts.map((product) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4 }}
                          key={product.id}
                          className="group"
                        >
                          {/* Image Area */}
                          <div 
                            className="relative aspect-[3/4] overflow-hidden bg-stone-100 dark:bg-white/5 cursor-pointer mb-5 rounded-xl border border-stone-200 dark:border-white/5"
                            onClick={() => onProductSelect(product)}
                          >
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            
                            {/* Hover Actions */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100">
                               <div className="flex justify-end">
                                  <button 
                                     onClick={(e) => {
                                       e.stopPropagation();
                                       onToggleWishlist(product);
                                     }}
                                     className="p-2 rounded-full bg-white/90 text-stone-600 hover:text-rose-500 shadow-md transform hover:scale-110 transition-all"
                                  >
                                     <Heart size={16} fill={wishlistItems.some(item => item.id === product.id) ? "currentColor" : "none"} />
                                  </button>
                               </div>
                               
                               <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onAddToCart(product);
                                  }}
                                  className="w-full py-3 bg-white text-stone-900 font-medium text-xs uppercase tracking-wider shadow-lg hover:bg-gold-500 hover:text-white transition-colors rounded-lg flex items-center justify-center gap-2 translate-y-4 group-hover:translate-y-0 duration-300"
                               >
                                  <ShoppingBag size={14} /> Thêm vào giỏ
                               </button>
                            </div>
                          </div>

                          {/* Info */}
                          <div className="text-center">
                            <h3 
                              className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-1 cursor-pointer hover:text-gold-600 transition-colors"
                              onClick={() => onProductSelect(product)}
                            >
                              {product.name}
                            </h3>
                            <div className="text-gold-600 dark:text-gold-400 font-medium text-sm">
                              {product.price}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {filteredProducts.length === 0 && (
                     <div className="text-center py-20 border border-dashed border-stone-200 dark:border-white/10 rounded-xl">
                        <p className="text-stone-500 dark:text-stone-400 mb-4">Không tìm thấy sản phẩm phù hợp.</p>
                        <Button variant="outline" onClick={() => setFilter('all')}>
                          Xem tất cả sản phẩm
                        </Button>
                     </div>
                  )}
               </main>
            </div>
         </div>
      </section>
    </div>
  );
};

export default ShopPage;