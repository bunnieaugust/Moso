import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Heart, ShoppingBag, Star, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { products as initialProducts } from './ProductShowcase';
import Button from './ui/Button';

interface ShopPageProps {
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistItems: Product[];
}

const ShopPage: React.FC<ShopPageProps> = ({ 
  onProductSelect, 
  onAddToCart, 
  onToggleWishlist,
  wishlistItems 
}) => {
  const [filter, setFilter] = useState<'all' | 'tea' | 'gift'>('all');
  const [sort, setSort] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile filter toggle

  // Parse price helper
  const getPrice = (p: string) => parseInt(p.replace(/\D/g, ''));

  useEffect(() => {
    let result = [...initialProducts];

    // Filter
    if (filter !== 'all') {
      result = result.filter(p => p.category === filter);
    }

    // Sort
    if (sort === 'price-asc') {
      result.sort((a, b) => getPrice(a.price) - getPrice(b.price));
    } else if (sort === 'price-desc') {
      result.sort((a, b) => getPrice(b.price) - getPrice(a.price));
    }
    // 'newest' uses default order for now

    setFilteredProducts(result);
  }, [filter, sort]);

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'tea', label: 'Chè Dưỡng Nhan' },
    { id: 'gift', label: 'Set Quà Tặng' },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white dark:bg-dark-950 transition-colors duration-300">
      
      {/* Header - Minimalist */}
      <div className="container mx-auto px-5 md:px-20 mb-16">
        <div className="max-w-xl">
           <span className="text-gold-600 dark:text-gold-400 uppercase tracking-[0.2em] text-xs font-semibold mb-3 block">Cửa Hàng Trực Tuyến</span>
           <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100 mb-6">
             Bộ Sưu Tập Moso
           </h1>
           <div className="h-px w-20 bg-stone-300 dark:bg-stone-700"></div>
        </div>
      </div>

      <div className="container mx-auto px-5 md:px-20">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
          
          {/* Sidebar Filters */}
          <aside className="w-full md:w-56 flex-shrink-0">
             {/* Mobile Filter Toggle */}
             <div className="md:hidden flex justify-between items-center mb-6 pb-4 border-b border-stone-100 dark:border-white/5">
                <button 
                  className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-medium"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <SlidersHorizontal size={18} /> Bộ lọc
                </button>
                <span className="text-sm text-stone-500">{filteredProducts.length} sản phẩm</span>
             </div>

             <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}>
                <div className="mb-10">
                   <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-4 pb-2 border-b border-stone-100 dark:border-white/5">Danh Mục</h3>
                   <ul className="space-y-3">
                      {categories.map((cat) => (
                        <li key={cat.id}>
                          <button
                            onClick={() => setFilter(cat.id as any)}
                            className={`text-sm transition-all duration-300 hover:text-gold-600 dark:hover:text-gold-400 flex items-center gap-2 ${
                              filter === cat.id 
                                ? 'text-stone-900 dark:text-white font-medium translate-x-1' 
                                : 'text-stone-500 dark:text-stone-400'
                            }`}
                          >
                            {filter === cat.id && <div className="w-1 h-1 bg-gold-500 rounded-full" />}
                            {cat.label}
                          </button>
                        </li>
                      ))}
                   </ul>
                </div>

                <div className="mb-10">
                   <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-4 pb-2 border-b border-stone-100 dark:border-white/5">Sắp Xếp</h3>
                   <select 
                     value={sort}
                     onChange={(e) => setSort(e.target.value as any)}
                     className="w-full bg-transparent text-sm text-stone-600 dark:text-stone-400 outline-none cursor-pointer py-2 hover:text-gold-600 transition-colors"
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
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
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
                    {/* Image Area - Clean & Elegant */}
                    <div 
                      className="relative aspect-[3/4] overflow-hidden bg-stone-100 dark:bg-white/5 cursor-pointer mb-5"
                      onClick={() => onProductSelect(product)}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                      
                      {/* Wishlist Button - Top Right */}
                      <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           onToggleWishlist(product);
                         }}
                         className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm text-stone-600 dark:text-stone-300 hover:bg-white hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 duration-300"
                      >
                         <Heart size={16} fill={wishlistItems.some(item => item.id === product.id) ? "currentColor" : "none"} />
                      </button>

                      {/* Add to Cart Button - Slides Up */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                         <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart(product);
                            }}
                            className="w-full py-3 bg-white dark:bg-dark-900 text-stone-900 dark:text-white text-xs uppercase tracking-wider font-medium hover:bg-gold-500 hover:text-white transition-colors shadow-lg flex items-center justify-center gap-2"
                         >
                            <ShoppingBag size={14} /> Thêm vào giỏ
                         </button>
                      </div>
                    </div>

                    {/* Details - Minimal */}
                    <div className="text-center px-2">
                      <h3 
                        className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-1 cursor-pointer hover:text-gold-600 transition-colors"
                        onClick={() => onProductSelect(product)}
                      >
                        {product.name}
                      </h3>
                      
                      <div className="text-stone-500 dark:text-stone-400 text-sm font-medium">
                        {product.price}
                      </div>

                      {/* Mobile Only Add Button */}
                      <button 
                        onClick={() => onAddToCart(product)}
                        className="mt-3 text-xs uppercase tracking-wider text-gold-600 dark:text-gold-400 border-b border-gold-600/30 pb-0.5 md:hidden inline-block"
                      >
                        Thêm vào giỏ
                      </button>
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
    </div>
  );
};

export default ShopPage;