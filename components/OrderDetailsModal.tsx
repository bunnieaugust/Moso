import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, User, CreditCard, Calendar, Package, Copy, Check } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import Button from './ui/Button';

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

const statusConfig: Record<OrderStatus, { label: string; color: string; step: number }> = {
  pending: { label: 'Chờ xác nhận', color: 'text-stone-500', step: 1 },
  processing: { label: 'Đang chuẩn bị', color: 'text-gold-500', step: 2 },
  shipped: { label: 'Đang giao hàng', color: 'text-blue-500', step: 3 },
  delivered: { label: 'Đã giao', color: 'text-green-500', step: 4 },
};

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!order) return null;

  const formatPrice = (num: number) => num.toLocaleString('vi-VN') + 'đ';
  const statusInfo = statusConfig[order.status];

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCOD = order.paymentMethod.includes('COD');
  const isDelivered = order.status === 'delivered';
  
  let paymentStatusLabel = 'Đã thanh toán';
  let paymentStatusColor = 'text-green-500';

  if (isCOD && !isDelivered) {
    paymentStatusLabel = 'Chưa thanh toán';
    paymentStatusColor = 'text-stone-400';
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-[90] flex items-center justify-center p-4"
      >
        <motion.div
          layoutId={`order-${order.id}`}
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-dark-900 border border-stone-200 dark:border-white/10 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-stone-200 dark:border-white/5 flex items-center justify-between bg-stone-50 dark:bg-dark-950/50">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100">Chi Tiết Đơn Hàng</h2>
                <div className="bg-white dark:bg-white/5 px-3 py-1 rounded-full border border-stone-200 dark:border-white/10 flex items-center gap-2 cursor-pointer hover:bg-stone-100 dark:hover:bg-white/10 transition-colors" onClick={handleCopyId}>
                  <span className="font-mono text-gold-600 dark:text-gold-400 text-sm">#{order.id}</span>
                  {copied ? <Check size={12} className="text-green-500"/> : <Copy size={12} className="text-stone-400"/>}
                </div>
              </div>
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-sm">
                <Calendar size={14} />
                {order.date}
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-stone-200 dark:hover:bg-white/5 flex items-center justify-center text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 bg-white dark:bg-dark-900">
            {/* Status Timeline */}
            <div className="relative px-4">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-stone-200 dark:bg-white/5 -translate-y-1/2 z-0" />
              <div className="relative z-10 flex justify-between">
                {['pending', 'processing', 'shipped', 'delivered'].map((s, idx) => {
                  const stepNum = idx + 1;
                  const isActive = stepNum <= statusInfo.step;
                  const isCurrent = stepNum === statusInfo.step;
                  
                  return (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${isActive ? 'bg-gold-500 border-gold-500 text-white shadow-[0_0_15px_rgba(212,138,39,0.5)]' : 'bg-white dark:bg-dark-950 border-stone-200 dark:border-white/10 text-stone-400 dark:text-stone-600'}`}>
                        {isActive ? <Check size={14} strokeWidth={3} /> : <span className="text-xs">{stepNum}</span>}
                      </div>
                      <span className={`text-xs font-medium uppercase tracking-wider ${isCurrent ? 'text-gold-600 dark:text-gold-400' : 'text-stone-400 dark:text-stone-600'}`}>
                        {statusConfig[s as OrderStatus].label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Shipping Info */}
              <div className="bg-stone-50 dark:bg-white/5 rounded-2xl p-6 border border-stone-200 dark:border-white/5">
                <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-gold-500" />
                  Thông Tin Giao Hàng
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <User size={16} className="text-stone-400 dark:text-stone-500 mt-0.5" />
                    <span className="text-stone-700 dark:text-stone-300">{order.shippingInfo.fullName}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-stone-400 dark:text-stone-500 mt-0.5" />
                    <span className="text-stone-700 dark:text-stone-300">{order.shippingInfo.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-stone-400 dark:text-stone-500 mt-0.5" />
                    <span className="text-stone-700 dark:text-stone-300">
                      {order.shippingInfo.address}, {order.shippingInfo.city}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-stone-50 dark:bg-white/5 rounded-2xl p-6 border border-stone-200 dark:border-white/5">
                <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                  <CreditCard size={18} className="text-gold-500" />
                  Thanh Toán
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Phương thức</span>
                    <span className="text-stone-700 dark:text-stone-300">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Trạng thái</span>
                    <span className={`${paymentStatusColor} font-medium`}>{paymentStatusLabel}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-stone-200 dark:border-white/10 mt-2">
                    <span className="text-stone-500">Tổng tiền</span>
                    <span className="text-gold-600 dark:text-gold-400 font-bold text-lg">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Items */}
            <div>
              <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                <Package size={18} className="text-gold-500" />
                Sản Phẩm ({order.items.length})
              </h3>
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 bg-stone-50 dark:bg-white/5 p-3 rounded-xl border border-stone-200 dark:border-white/5">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-stone-200 dark:border-transparent">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <div>
                        <h4 className="text-stone-800 dark:text-stone-200 font-serif mb-1">{item.name}</h4>
                        <p className="text-stone-500 text-sm">Số lượng: {item.quantity}</p>
                      </div>
                      <p className="text-gold-600 dark:text-gold-400 font-medium">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-stone-200 dark:border-white/5 bg-stone-50 dark:bg-dark-950/50 flex justify-end">
            <Button variant="outline" onClick={onClose}>Đóng</Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderDetailsModal;