import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import { Language, translations } from '../utils/translations';

// KEEP ORIGINAL DATA STRUCTURE BUT EXPORT IT SO OTHER COMPONENTS CAN USE IT
// The actual text displayed will be overridden by the translation map inside the component
export const products: Product[] = [
  {
    id: '1',
    name: 'Chè Hồng Hạo',
    description: 'Tinh chất hoa hồng, táo đỏ và long nhãn. Giúp hoạt huyết, đẹp da và điều hòa nội tiết cho phái đẹp.',
    price: '189.000đ',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=800&auto=format&fit=crop', 
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2',
    ingredients: ['Táo đỏ Tân Cương', 'Long nhãn Hưng Yên', 'Cánh hoa hồng Pháp', 'Đường phèn kết tinh', 'Nước tinh khiết'],
    benefits: ['Bổ máu, giúp da dẻ hồng hào', 'Điều hòa khí huyết', 'Giảm căng thẳng, ngủ ngon', 'Chống lão hóa da'],
    usage: 'Xé gói kích nhiệt, cho vào đáy cốc. Đổ nước nguội đến vạch. Đặt bát chè lên trên, đậy nắp và chờ 8 phút.',
    category: 'tea'
  },
  {
    id: '2',
    name: 'Chè Cúc Vàng',
    description: 'Cúc hoa vàng và kỷ tử. Thanh can, giải nhiệt và giúp sáng mắt, ngủ sâu.',
    price: '155.000đ',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=800&auto=format&fit=crop',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    ingredients: ['Bông cúc chi vàng', 'Kỷ tử đỏ', 'Hạt chia', 'Lá dứa', 'Đường phèn'],
    benefits: ['Thanh nhiệt, giải độc gan', 'Sáng mắt', 'Giảm mụn nhọt, mát da', 'Thư giãn tinh thần'],
    usage: 'Sử dụng tốt nhất vào buổi trưa hoặc chiều để giải nhiệt cơ thể.',
    category: 'tea'
  },
  {
    id: '3',
    name: 'Chè Đông Trùng',
    description: 'Đông trùng hạ thảo và đẳng sâm. Phục hồi thể lực, tăng sức bền và bồi bổ khí huyết.',
    price: '299.000đ',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    ingredients: ['Đông trùng hạ thảo', 'Đẳng sâm', 'Nấm tuyết', 'Hạt sen', 'Táo đỏ'],
    benefits: ['Tăng cường hệ miễn dịch', 'Bồi bổ sức khỏe cho người mới ốm dậy', 'Tăng cường sinh lực', 'Cải thiện chức năng phổi'],
    usage: 'Khuyên dùng vào buổi sáng hoặc trước khi vận động để nạp năng lượng.',
    category: 'tea'
  },
  {
    id: '4',
    name: 'Bộ Quà Tặng Ngũ Hành',
    description: 'Bộ sưu tập đầy đủ 5 vị chè dưỡng nhan tự sôi: Nhân Sâm, Đông Trùng, Cúc Vàng, Hồng Hạo, Hạt Sen.',
    price: '1.250.000đ',
    image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=800&auto=format&fit=crop',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    ingredients: ['Gồm 5 vị chè best-seller', 'Hộp quà sơn mài cao cấp', 'Thiệp chúc mừng thiết kế riêng', 'Túi giấy sang trọng'],
    benefits: ['Món quà sức khỏe ý nghĩa', 'Trải nghiệm đa dạng hương vị', 'Thiết kế sang trọng, đẳng cấp', 'Tiết kiệm 15% so với mua lẻ'],
    usage: 'Phù hợp làm quà tặng doanh nghiệp, quà biếu Tết hoặc tặng người thân.',
    category: 'gift'
  },
];

interface ProductShowcaseProps {
  onProductSelect: (product: Product) => void;
  language?: Language;
}

const ProductCard: React.FC<{ product: Product; onClick: () => void; viewDetailText: string }> = ({ product, onClick, viewDetailText }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
  };

  return (
    <motion.div 
      variants={itemVariants}
      layoutId={`card-${product.id}`}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className={`relative group rounded-2xl md:rounded-3xl overflow-hidden border border-stone-200 dark:border-white/10 ${product.colSpan} ${product.rowSpan} min-h-[200px] md:min-h-[300px] cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(212,138,39,0.25)] hover:border-gold-500/30 bg-white dark:bg-dark-900`}
    >
      {/* Image Background */}
      <div className="absolute inset-0 bg-stone-100 dark:bg-dark-900">
        <motion.img 
          layoutId={`image-${product.id}`}
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 dark:opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent dark:from-dark-950 dark:via-dark-950/20 opacity-90 group-hover:opacity-80 transition-opacity" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end">
        <div className="transform transition-all duration-500 translate-y-2 md:translate-y-4 group-hover:translate-y-0">
          <div className="flex justify-between items-start mb-1 md:mb-2">
            <motion.h3 
              layoutId={`title-${product.id}`}
              className="font-serif text-lg md:text-3xl text-white dark:text-stone-100 group-hover:text-gold-300 transition-colors drop-shadow-md leading-tight"
            >
              {product.name}
            </motion.h3>
            <div className="hidden md:flex w-10 h-10 rounded-full glass-panel items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-md">
              <ArrowUpRight className="text-stone-200" size={20} />
            </div>
          </div>
          
          <p className="text-stone-300 dark:text-stone-400 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2 drop-shadow-sm font-light">
            {product.description}
          </p>

          <div className="flex items-center justify-between border-t border-white/20 dark:border-white/10 pt-2 md:pt-4 md:opacity-0 group-hover:opacity-100 transition-all duration-500 md:delay-100">
            <span className="text-sm md:text-xl font-medium text-gold-300 dark:text-gold-400">{product.price}</span>
            <button className="hidden md:block text-xs uppercase tracking-wider text-stone-300 hover:text-white underline decoration-gold-500/50 hover:decoration-gold-500 underline-offset-4">
              {viewDetailText}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onProductSelect, language = 'vi' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const t = translations[language].products;

  // Merge translation with products
  const displayProducts = products.map(p => {
    // Type assertion to access dynamic keys
    const translatedItem = (t.items as any)[p.id];
    return {
      ...p,
      name: translatedItem?.name || p.name,
      description: translatedItem?.desc || p.description
    };
  });

  return (
    <section id="products" className="py-16 md:py-24 bg-white dark:bg-dark-900 relative transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 mb-4">
            {t.titlePrefix} <span className="text-gradient-gold">{t.titleSuffix}</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm md:text-base">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-4 gap-3 md:gap-4 auto-rows-[220px] md:auto-rows-[300px]"
        >
          {displayProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => onProductSelect(product)}
              viewDetailText={t.viewDetail}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;