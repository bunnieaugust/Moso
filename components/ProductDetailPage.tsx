
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Minus, Plus, ShoppingCart, Heart, Share2, Flame, Clock, ShieldCheck, Leaf, Zap, ChevronRight, Check } from 'lucide-react';
import { Product } from '../types';
import Button from './ui/Button';
import FadeIn from './ui/FadeIn';
import { products } from './ProductShowcase'; // Import data for related products
import ShareModal from './ShareModal'; // Import the new modal
import { Language, translations } from '../utils/translations';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onNavigate: (sectionId: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onProductSelect: (product: Product) => void;
  // Global Wishlist props
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  language?: Language;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ 
  product, 
  onBack,
  onNavigate,
  onAddToCart, 
  onBuyNow,
  onProductSelect,
  isWishlisted,
  onToggleWishlist,
  language = 'vi'
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'guide'>('description');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // State for share modal

  const t = translations[language].productDetail;
  const tProducts = translations[language].products;

  // Translate the main product
  const translatedItem = (tProducts.items as any)[product.id];
  const displayProduct = {
    ...product,
    name: translatedItem?.name || product.name,
    description: translatedItem?.desc || product.description,
    ingredients: translatedItem?.ingredients || product.ingredients, // Translate ingredients
    benefits: translatedItem?.benefits || product.benefits, // Translate benefits
    usage: translatedItem?.usage || product.usage, // Translate usage
  };

  // Filter and Translate related products (exclude current)
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3).map(p => {
    const tItem = (tProducts.items as any)[p.id];
    return {
      ...p,
      name: tItem?.name || p.name,
      description: tItem?.desc || p.description
    };
  });

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-stone-50 dark:bg-dark-950 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-40">
        {/* Breadcrumb & Back */}
        <div className="flex items-center gap-2 text-sm text-stone-500 mb-8">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-gold-500 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={16} /> {t.backHome}
          </button>
          <ChevronRight size={14} />
          <button 
            onClick={() => onNavigate('products')} 
            className="hover:text-gold-500 transition-colors"
          >
            {t.menu}
          </button>
          <ChevronRight size={14} />
          <span className="text-gold-500 font-medium">{displayProduct.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Images */}
          <FadeIn direction="right" className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group bg-white dark:bg-dark-900">
              <img 
                src={displayProduct.image} 
                alt={displayProduct.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                 <div className="glass-panel px-3 py-1.5 rounded-full text-xs text-stone-800 dark:text-white border border-white/20 flex items-center gap-2">
                    <Flame size={14} className="text-rose-500"/> 
                    <span>Tự sôi 90°C</span>
                 </div>
                 <div className="glass-panel px-3 py-1.5 rounded-full text-xs text-stone-800 dark:text-white border border-white/20 flex items-center gap-2">
                    <Clock size={14} className="text-gold-500"/> 
                    <span>8 Phút</span>
                 </div>
              </div>
            </div>
            {/* Thumbnails (Simulated) */}
            <div className="grid grid-cols-4 gap-4">
              {[displayProduct.image, ...relatedProducts.map(p => p.image)].slice(0,4).map((img, idx) => (
                <div key={idx} className={`aspect-square rounded-xl overflow-hidden border cursor-pointer ${idx === 0 ? 'border-gold-500 ring-1 ring-gold-500' : 'border-stone-200 dark:border-white/10 hover:border-gold-500/50'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Right: Info & Purchase */}
          <FadeIn direction="left" className="flex flex-col h-full">
            <div className="mb-auto">
              <div className="flex justify-between items-start mb-4">
                <div>
                   <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100 mb-2">{displayProduct.name}</h1>
                   <div className="flex items-center gap-4 text-sm">
                      <div className="flex text-gold-500">
                        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                      </div>
                      <span className="text-stone-500">(128 {t.reviews})</span>
                      <span className="text-green-500 flex items-center gap-1"><ShieldCheck size={14}/> {t.authentic}</span>
                   </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onToggleWishlist(displayProduct)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${isWishlisted ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/30' : 'border-stone-200 dark:border-white/10 text-stone-400 hover:text-rose-500 hover:border-rose-200'}`}
                    title={isWishlisted ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                  >
                    <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={handleShare}
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-stone-200 dark:border-white/10 text-stone-400 hover:text-gold-500 hover:border-gold-200 transition-all"
                    title="Chia sẻ sản phẩm"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <div className="text-3xl font-serif text-gold-600 dark:text-gold-400 font-medium mb-6 flex items-end gap-2">
                 {displayProduct.price}
                 <span className="text-sm text-stone-400 line-through font-sans mb-1 opacity-60">
                   {(parseInt(displayProduct.price.replace(/\D/g, '')) * 1.2).toLocaleString('vi-VN')}đ
                 </span>
              </div>

              <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-8 text-lg font-light">
                {displayProduct.description}
              </p>

              {/* Purchase Options */}
              <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-stone-200 dark:border-white/5 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-medium text-stone-700 dark:text-stone-200">{t.quantity}</span>
                  <div className="flex items-center gap-4 bg-stone-100 dark:bg-black/20 rounded-lg p-1 border border-stone-200 dark:border-white/10">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-stone-900 dark:text-stone-100 font-medium w-8 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="w-full py-4 text-base"
                    onClick={() => onAddToCart(displayProduct, quantity)}
                    icon={<ShoppingCart size={18} />}
                  >
                    {t.addToCart}
                  </Button>
                  <Button 
                    variant="primary" 
                    className="w-full py-4 text-base shadow-gold-500/20 shadow-lg"
                    onClick={() => onBuyNow(displayProduct, quantity)}
                  >
                    {t.buyNow}
                  </Button>
                </div>
                
                <div className="mt-4 flex items-center justify-center gap-6 text-xs text-stone-500">
                   <span className="flex items-center gap-1"><Zap size={12}/> {t.fastShip}</span>
                   <span className="flex items-center gap-1"><ShieldCheck size={12}/> {t.returnPolicy}</span>
                </div>
              </div>
            </div>

            {/* Accordion/Tabs */}
            <div className="border-t border-stone-200 dark:border-white/10 pt-6">
               <div className="flex gap-8 mb-6 border-b border-stone-200 dark:border-white/10">
                 {['description', 'ingredients', 'guide'].map((tab) => (
                   <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`pb-3 text-sm font-medium uppercase tracking-wider relative transition-colors ${activeTab === tab ? 'text-gold-600 dark:text-gold-400' : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-200'}`}
                   >
                     {t.tabs[tab as keyof typeof t.tabs]}
                     {activeTab === tab && <motion.div layoutId="detailTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500" />}
                   </button>
                 ))}
               </div>
               
               <div className="min-h-[100px] text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                  <AnimatePresence mode="wait">
                    {activeTab === 'description' && (
                      <motion.div key="desc" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}>
                         <p>
                           {displayProduct.benefits && displayProduct.benefits.length > 0 ? (
                             <ul className="space-y-2">
                               {displayProduct.benefits.map((b, i) => (
                                 <li key={i} className="flex items-start gap-2">
                                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-500" />
                                   {b}
                                 </li>
                               ))}
                             </ul>
                           ) : displayProduct.description}
                         </p>
                      </motion.div>
                    )}
                    {activeTab === 'ingredients' && (
                      <motion.div key="ing" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}>
                         <div className="grid grid-cols-2 gap-4">
                            {displayProduct.ingredients?.map((ing, i) => (
                               <div key={i} className="flex items-center gap-2">
                                  <Leaf size={14} className="text-green-500" />
                                  <span>{ing}</span>
                               </div>
                            ))}
                         </div>
                      </motion.div>
                    )}
                    {activeTab === 'guide' && (
                      <motion.div key="guide" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}>
                         <div className="flex gap-4 items-start bg-stone-100 dark:bg-white/5 p-4 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center flex-shrink-0">
                               <Zap size={20} />
                            </div>
                            <div>
                               <p className="font-medium text-stone-900 dark:text-stone-100 mb-1">{t.techTitle}</p>
                               <p>{displayProduct.usage || "1. Xé gói kích nhiệt đặt vào đáy. 2. Đổ nước. 3. Đặt bát chè lên và chờ 8 phút."}</p>
                            </div>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </div>
          </FadeIn>
        </div>

        {/* Related Products */}
        <div className="pt-12 border-t border-stone-200 dark:border-white/10">
           <FadeIn direction="up">
             <h3 className="font-serif text-3xl text-stone-900 dark:text-stone-100 mb-8">{t.related}</h3>
             <div className="grid md:grid-cols-3 gap-6">
                {relatedProducts.map((rp, idx) => (
                   <FadeIn 
                     key={rp.id}
                     delay={idx * 0.1}
                     direction="up"
                     onClick={() => {
                       onProductSelect(rp);
                       window.scrollTo({ top: 0, behavior: 'smooth' });
                     }}
                     className="group cursor-pointer"
                   >
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative">
                         <img src={rp.image} alt={rp.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                      </div>
                      <h4 className="font-serif text-xl text-stone-900 dark:text-stone-100 group-hover:text-gold-500 transition-colors">{rp.name}</h4>
                      <p className="text-gold-600 dark:text-gold-400 font-medium">{rp.price}</p>
                   </FadeIn>
                ))}
             </div>
           </FadeIn>
        </div>
      </div>
      
      {/* Share Modal */}
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)}
        productName={displayProduct.name}
      />
    </div>
  );
};

export default ProductDetailPage;
