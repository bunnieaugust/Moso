
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Eye, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { Language, translations } from '../utils/translations';
import FadeIn from './ui/FadeIn';
import LazyImage from './ui/LazyImage';

// Define products data directly here
export const products: Product[] = [
  {
     id: '1',
     name: 'Chè Hồng Hạo',
     description: 'Tinh chất hoa hồng, táo đỏ và long nhãn. Giúp hoạt huyết, đẹp da và điều hòa nội tiết.',
     price: '189.000đ',
     image: 'https://images.unsplash.com/photo-1605193952140-57143f2951dc?q=80&w=800&auto=format&fit=crop',
     category: 'tea',
     ingredients: ['Hoa hồng', 'Táo đỏ', 'Long nhãn', 'Kỷ tử', 'Đường phèn'],
     benefits: ['Hoạt huyết', 'Đẹp da', 'Điều hòa nội tiết']
  },
  {
     id: '2',
     name: 'Chè Cúc Vàng',
     description: 'Cúc hoa vàng và kỷ tử. Thanh can, giải nhiệt và giúp sáng mắt, ngủ sâu.',
     price: '169.000đ',
     image: 'https://images.unsplash.com/photo-1546833999-b9f58161460e?q=80&w=800&auto=format&fit=crop',
     category: 'tea',
     ingredients: ['Cúc hoa vàng', 'Kỷ tử', 'Tuyết yến', 'Nhựa đào'],
     benefits: ['Thanh nhiệt', 'Sáng mắt', 'An thần']
  },
  {
     id: '3',
     name: 'Chè Đông Trùng',
     description: 'Đông trùng hạ thảo và đẳng sâm. Phục hồi thể lực, tăng sức bền và bồi bổ.',
     price: '219.000đ',
     image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
     category: 'tea',
     ingredients: ['Đông trùng hạ thảo', 'Đẳng sâm', 'Hạt sen', 'Táo đỏ'],
     benefits: ['Bồi bổ khí huyết', 'Tăng sức đề kháng', 'Phục hồi sức khỏe']
  },
  {
     id: '4',
     name: 'Bộ Quà Tặng Ngũ Hành',
     description: 'Bộ sưu tập đầy đủ 5 vị chè dưỡng nhan tự sôi: Nhân Sâm, Đông Trùng, Cúc Vàng...',
     price: '899.000đ',
     image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?q=80&w=800&auto=format&fit=crop',
     category: 'gift',
     ingredients: ['5 vị chè tự sôi', 'Hộp quà cao cấp', 'Thiệp chúc mừng'],
     benefits: ['Quà tặng sang trọng', 'Chăm sóc toàn diện']
  }
];

interface ProductShowcaseProps {
  onProductSelect: (product: Product) => void;
  language?: Language;
  onViewAll?: () => void;
  onAddToCart?: (product: Product) => void; // Added Prop
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onProductSelect, language = 'vi', onViewAll, onAddToCart }) => {
  const t = translations[language].products;

  const displayProducts = products.map(p => {
    const translatedItem = (t.items as any)[p.id];
    return {
      ...p,
      name: translatedItem?.name || p.name,
      description: translatedItem?.desc || p.description
    };
  });

  return (
    <section id="products" className="py-24 bg-white dark:bg-dark-900 transition-colors duration-500">
      <div className="container mx-auto px-6 md:px-20 lg:px-40">
        
        <FadeIn direction="up" className="text-center max-w-3xl mx-auto mb-16">
           <span className="text-gold-600 dark:text-gold-400 uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
             {t.titleSuffix}
           </span>
           <h2 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100 mb-6">
             {t.titlePrefix}
           </h2>
           <p className="text-stone-500 dark:text-stone-400 font-light">
             {t.subtitle}
           </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {displayProducts.map((product, idx) => (
             <FadeIn 
               key={product.id}
               delay={idx * 0.1}
               className="group relative"
             >
                <div 
                  className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4 bg-stone-100 dark:bg-white/5 cursor-pointer"
                  onClick={() => onProductSelect(product)}
                >
                   <LazyImage 
                     src={product.image} 
                     alt={product.name} 
                     className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                     containerClassName="w-full h-full"
                   />
                   
                   {/* Overlay */}
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 z-20">
                      <button 
                        className="p-3 bg-white text-stone-900 rounded-full hover:bg-gold-500 hover:text-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 hover:scale-110"
                        title={t.viewDetail}
                        onClick={(e) => {
                           e.stopPropagation();
                           onProductSelect(product);
                        }}
                      >
                         <Eye size={20} />
                      </button>
                      <button 
                         className="p-3 bg-white text-stone-900 rounded-full hover:bg-gold-500 hover:text-white transition-all duration-300 delay-75 transform translate-y-4 group-hover:translate-y-0 hover:scale-110"
                         title={t.addToCart}
                         onClick={(e) => {
                           e.stopPropagation();
                           if (onAddToCart) onAddToCart(product);
                         }}
                      >
                         <ShoppingBag size={20} />
                      </button>
                   </div>

                   {idx === 0 && (
                     <div className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded z-20">
                       {t.bestSeller || 'BEST SELLER'}
                     </div>
                   )}
                </div>

                <div className="text-center">
                   <h3 
                     className="font-serif text-xl text-stone-900 dark:text-stone-100 mb-1 cursor-pointer hover:text-gold-500 transition-colors"
                     onClick={() => onProductSelect(product)}
                   >
                     {product.name}
                   </h3>
                   <div className="flex justify-center items-center gap-1 text-gold-500 text-xs mb-2">
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                   </div>
                   <p className="text-stone-500 dark:text-stone-400 text-sm line-clamp-2 mb-3 px-4 h-10">
                     {product.description}
                   </p>
                   <p className="text-gold-600 dark:text-gold-400 font-bold text-lg">
                     {product.price}
                   </p>
                </div>
             </FadeIn>
           ))}
        </div>

        <FadeIn delay={0.4} className="mt-16 text-center">
           <button 
             onClick={onViewAll} 
             className="group relative px-8 py-3 rounded-full border border-stone-300 dark:border-white/20 text-stone-600 dark:text-stone-300 overflow-hidden transition-all duration-300 hover:border-stone-900 hover:text-white dark:hover:border-white dark:hover:text-stone-900 shadow-sm hover:shadow-lg active:scale-95 uppercase tracking-widest text-xs font-medium flex items-center justify-center gap-2 mx-auto"
           >
             <span className="absolute inset-0 w-full h-full bg-stone-900 dark:bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out -z-10"></span>
             {t.viewAll || 'Xem Tất Cả Sản Phẩm'}
             <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
           </button>
        </FadeIn>

      </div>
    </section>
  );
};

export default ProductShowcase;
