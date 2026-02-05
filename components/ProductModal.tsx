import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Flame, Clock, Leaf, ShoppingCart, Minus, Plus, Check, Zap } from 'lucide-react';
import { Product } from '../types';
import Button from './ui/Button';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart, onBuyNow }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'benefits' | 'usage'>('desc');

  if (!product) return null;

  // Reset quantity when opening new product
  // This effect runs when product changes.
  // We can't use standard useEffect here easily because of conditional return, 
  // but since we key the modal in App with AnimatePresence or conditional rendering, 
  // state will reset if component unmounts. 

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark-950/90 backdrop-blur-md z-[70] flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            layoutId={`card-${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-900 w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row max-h-[90vh] md:h-[700px] relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-5/12 h-64 md:h-full relative overflow-hidden bg-dark-950 group">
              <motion.img 
                layoutId={`image-${product.id}`}
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent md:bg-gradient-to-r" />
              
              <div className="absolute bottom-6 left-6 flex gap-2">
                 <div className="glass-panel px-3 py-1 rounded-full text-xs text-white border border-white/10 flex items-center gap-1">
                    <Flame size={12} className="text-rose-400"/> Tự sôi 90°C
                 </div>
                 <div className="glass-panel px-3 py-1 rounded-full text-xs text-white border border-white/10 flex items-center gap-1">
                    <Clock size={12} className="text-gold-400"/> 8 Phút
                 </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col bg-dark-900/50">
              <div className="mb-auto">
                {/* Header Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                     <span className="px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs uppercase tracking-wider font-semibold">
                       Best Seller
                     </span>
                     <div className="flex items-center gap-1 text-gold-400 text-xs">
                       <Star size={14} fill="currentColor" />
                       <span className="text-stone-400">(4.9/5)</span>
                     </div>
                  </div>
                  <span className="text-green-400 text-xs flex items-center gap-1">
                    <Check size={14} /> Còn hàng
                  </span>
                </div>

                <motion.h2 
                  layoutId={`title-${product.id}`}
                  className="font-serif text-4xl md:text-5xl text-stone-100 mb-2 leading-tight"
                >
                  {product.name}
                </motion.h2>
                
                <p className="text-3xl font-serif text-gold-400 font-medium mb-6">
                  {product.price}
                </p>

                {/* Tabs Navigation */}
                <div className="flex border-b border-white/10 mb-6 overflow-x-auto custom-scrollbar">
                  <button 
                    onClick={() => setActiveTab('desc')}
                    className={`pb-3 pr-6 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'desc' ? 'text-white' : 'text-stone-500 hover:text-stone-300'}`}
                  >
                    Câu Chuyện
                    {activeTab === 'desc' && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 w-8 h-0.5 bg-gold-400" />}
                  </button>
                  <button 
                    onClick={() => setActiveTab('ingredients')}
                    className={`pb-3 px-6 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'ingredients' ? 'text-white' : 'text-stone-500 hover:text-stone-300'}`}
                  >
                    Thành Phần
                    {activeTab === 'ingredients' && <motion.div layoutId="tabLine" className="absolute bottom-0 left-6 w-8 h-0.5 bg-gold-400" />}
                  </button>
                  <button 
                    onClick={() => setActiveTab('benefits')}
                    className={`pb-3 px-6 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'benefits' ? 'text-white' : 'text-stone-500 hover:text-stone-300'}`}
                  >
                    Công Dụng
                    {activeTab === 'benefits' && <motion.div layoutId="tabLine" className="absolute bottom-0 left-6 w-8 h-0.5 bg-gold-400" />}
                  </button>
                  <button 
                    onClick={() => setActiveTab('usage')}
                    className={`pb-3 px-6 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'usage' ? 'text-white' : 'text-stone-500 hover:text-stone-300'}`}
                  >
                    Hướng Dẫn
                    {activeTab === 'usage' && <motion.div layoutId="tabLine" className="absolute bottom-0 left-6 w-8 h-0.5 bg-gold-400" />}
                  </button>
                </div>

                {/* Tab Content */}
                <div className="min-h-[150px] mb-8">
                  <AnimatePresence mode="wait">
                    {activeTab === 'desc' && (
                      <motion.div 
                        key="desc"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <p className="text-stone-300 leading-relaxed font-light">
                          {product.description}
                        </p>
                        <p className="text-stone-400 text-sm leading-relaxed">
                          Sản phẩm được chế biến bằng công nghệ Retort tiên tiến, giữ nguyên hương vị và dưỡng chất mà không cần chất bảo quản. Đóng gói tiện lợi với bát tự sôi thông minh.
                        </p>
                      </motion.div>
                    )}

                    {activeTab === 'ingredients' && (
                      <motion.div 
                        key="ingredients"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <ul className="grid grid-cols-2 gap-3">
                          {product.ingredients?.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-stone-300 text-sm">
                              <Leaf size={14} className="text-gold-500/70" />
                              {item}
                            </li>
                          )) || <p className="text-stone-500 italic">Đang cập nhật...</p>}
                        </ul>
                      </motion.div>
                    )}

                    {activeTab === 'benefits' && (
                      <motion.div 
                        key="benefits"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                         <ul className="space-y-3">
                          {product.benefits?.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-stone-300 text-sm">
                              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                              {item}
                            </li>
                          )) || <p className="text-stone-500 italic">Đang cập nhật...</p>}
                        </ul>
                      </motion.div>
                    )}

                    {activeTab === 'usage' && (
                      <motion.div 
                        key="usage"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                         <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold-400 flex-shrink-0">
                              <Zap size={24} />
                            </div>
                            <div>
                              <h4 className="text-stone-200 font-serif text-lg mb-2">Quy trình tự sôi 8 phút</h4>
                              <p className="text-stone-300 leading-relaxed font-light">
                                {product.usage || "Xé gói kích nhiệt, cho vào đáy cốc. Đổ nước nguội đến vạch. Đặt bát chè lên trên, đậy nắp và chờ 8 phút để thưởng thức."}
                              </p>
                            </div>
                         </div>
                         
                         <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-center">
                               <Flame className="mx-auto text-rose-400 mb-2" size={20} />
                               <p className="text-stone-400 text-xs">Công nghệ Retort</p>
                               <p className="text-stone-200 font-medium">Tự sôi 90°C</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-center">
                               <Clock className="mx-auto text-gold-400 mb-2" size={20} />
                               <p className="text-stone-400 text-xs">Thời gian chờ</p>
                               <p className="text-stone-200 font-medium">8 Phút</p>
                            </div>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-stone-400 text-sm">Số lượng:</span>
                  <div className="flex items-center gap-4 bg-dark-950 rounded-lg p-1 border border-white/10">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-white transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-stone-100 font-medium w-6 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-white transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 py-4"
                    onClick={() => {
                      onAddToCart(product, quantity);
                      onClose();
                    }}
                    icon={<ShoppingCart size={18} />}
                  >
                    Thêm Vào Giỏ
                  </Button>
                  <Button 
                    variant="primary" 
                    className="flex-[1.5] py-4 shadow-gold-500/20 shadow-lg"
                    onClick={() => onBuyNow(product, quantity)}
                  >
                    Mua Ngay
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;