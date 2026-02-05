import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Clock, CheckCircle, Truck, Calendar, ChevronRight, ShoppingBag } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import Button from './ui/Button';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onViewDetails: (order: Order) => void;
}

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: 'Chờ xác nhận', color: 'text-stone-500', icon: <Clock size={16} /> },
  processing: { label: 'Đang chuẩn bị', color: 'text-gold-500', icon: <Package size={16} /> },
  shipped: { label: 'Đang giao hàng', color: 'text-blue-500', icon: <Truck size={16} /> },
  delivered: { label: 'Đã giao', color: 'text-green-500', icon: <CheckCircle size={16} /> },
};

const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({ isOpen, onClose, orders, onViewDetails }) => {
  
  const formatPrice = (num: number) => num.toLocaleString('vi-VN') + 'đ';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-[80] flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-dark-900 border border-stone-200 dark:border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="p-6 border-b border-stone-200 dark:border-white/5 flex items-center justify-between bg-stone-50 dark:bg-dark-950/50">
                <div>
                  <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <Package className="text-gold-500" />
                    Lịch Sử Đơn Hàng
                  </h2>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Theo dõi hành trình những món quà sức khỏe của bạn</p>
                </div>
                <button 
                  onClick={onClose}
                  className="w-8 h-8 rounded-full hover:bg-stone-200 dark:hover:bg-white/5 flex items-center justify-center text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-4 bg-white dark:bg-dark-900">
                {orders.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-stone-500 space-y-4">
                    <ShoppingBag size={48} className="opacity-20" />
                    <p>Bạn chưa có đơn hàng nào</p>
                    <Button variant="outline" onClick={onClose} className="mt-2">Đặt món ngay</Button>
                  </div>
                ) : (
                  orders.map((order) => {
                    const statusInfo = statusConfig[order.status];
                    return (
                      <motion.div 
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/5 rounded-2xl p-5 hover:border-gold-500/50 transition-colors group cursor-pointer"
                        onClick={() => onViewDetails(order)}
                      >
                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4 border-b border-stone-200 dark:border-white/5 pb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-mono text-stone-800 dark:text-stone-200 font-medium">#{order.id}</span>
                              <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-white dark:bg-white/5 ${statusInfo.color} border border-stone-200 dark:border-white/10`}>
                                {statusInfo.icon}
                                {statusInfo.label}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-stone-500 text-xs">
                              <Calendar size={12} />
                              {order.date}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-gold-600 dark:text-gold-400 font-serif text-xl font-bold">{formatPrice(order.total)}</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded bg-white dark:bg-white/5 overflow-hidden flex-shrink-0 border border-stone-200 dark:border-transparent">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-stone-700 dark:text-stone-300 text-sm truncate">{item.name}</p>
                                <p className="text-stone-500 text-xs">x{item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-stone-200 dark:border-white/5 flex justify-end">
                           <button 
                             onClick={(e) => {
                               e.stopPropagation();
                               onViewDetails(order);
                             }}
                             className="text-xs uppercase tracking-wider text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white flex items-center gap-1 transition-colors"
                            >
                             Xem chi tiết <ChevronRight size={14} />
                           </button>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderHistoryModal;