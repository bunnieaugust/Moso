import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ChevronRight, Lock, ShieldCheck, Mail, User as UserIcon, AlertCircle, CreditCard, Banknote, Landmark, Copy, Check } from 'lucide-react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CartItem, OrderInfo, User } from '../types';
import Button from './ui/Button';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
  onSuccess: (shippingInfo: OrderInfo, paymentMethod: string) => void;
  currentUser: User | null;
  savedInfo: OrderInfo | null;
}

type PaymentMethodType = 'stripe' | 'cod' | 'bank';

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cartItems, total, onSuccess, currentUser, savedInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('stripe');
  const [copied, setCopied] = useState(false);
  
  const [shipping, setShipping] = useState<OrderInfo>({
    fullName: '',
    phone: '',
    address: '',
    city: 'Hồ Chí Minh',
    email: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (savedInfo) {
        setShipping(prev => ({
          ...prev,
          ...savedInfo,
          email: currentUser ? currentUser.email : savedInfo.email
        }));
      } else if (currentUser) {
        setShipping(prev => ({
          ...prev,
          fullName: prev.fullName || currentUser.name,
          email: currentUser.email
        }));
      }
    }
  }, [isOpen, currentUser, savedInfo]);

  const formatPrice = (num: number) => num.toLocaleString('vi-VN') + 'đ';

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    if (paymentMethod === 'stripe') {
      if (!stripe || !elements) {
        setIsLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
          setIsLoading(false);
          return;
      }

      const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: shipping.fullName,
          email: shipping.email,
          phone: shipping.phone,
          address: {
              line1: shipping.address,
              city: shipping.city,
          }
        },
      });

      if (error) {
        console.error('[error]', error);
        setErrorMessage(error.message || 'Thanh toán thất bại. Vui lòng kiểm tra lại thông tin thẻ.');
        setIsLoading(false);
      } else {
        console.log('[PaymentMethod]', stripePaymentMethod);
        setTimeout(() => {
            setIsLoading(false);
            onSuccess(shipping, 'Thẻ Tín Dụng (Stripe)');
            resetForm();
        }, 1000);
      }
    } else {
      setTimeout(() => {
        setIsLoading(false);
        const methodText = paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng';
        onSuccess(shipping, methodText);
        resetForm();
      }, 1500);
    }
  };

  const resetForm = () => {
    setStep('shipping');
    setPaymentMethod('stripe');
  };

  // Custom styling for Stripe Element to match app theme
  const cardStyle = {
    style: {
      base: {
        color: "#a8a29e", // text-stone-400 equivalent for generic match
        fontFamily: '"Montserrat", sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#78716c" // text-stone-500
        },
        iconColor: "#d48a27", // gold-500
      },
      invalid: {
        color: "#f43f5e", // rose-500
        iconColor: "#f43f5e"
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-dark-950/90 backdrop-blur-md z-[80] flex items-center justify-center p-4 md:p-6"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="w-full max-w-4xl bg-white dark:bg-dark-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-white/10 flex flex-col md:flex-row h-auto max-h-[90vh]"
        >
          {/* Order Summary Sidebar */}
          <div className="w-full md:w-1/3 bg-stone-50 dark:bg-dark-950/50 p-6 border-b md:border-b-0 md:border-r border-stone-200 dark:border-white/5 flex flex-col">
            <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
              <ShieldCheck className="text-gold-500" size={20} />
              Đơn Hàng Của Bạn
            </h3>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 mb-6 pr-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-3 text-sm">
                  <div className="w-12 h-12 rounded bg-white dark:bg-white/5 relative flex-shrink-0 border border-stone-200 dark:border-transparent">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded opacity-90" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-stone-700 rounded-full flex items-center justify-center text-[10px] text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div>
                    <p className="text-stone-800 dark:text-stone-200 line-clamp-2 font-medium">{item.name}</p>
                    <p className="text-stone-500">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 dark:border-white/10 pt-4 space-y-2">
              <div className="flex justify-between text-stone-500 dark:text-stone-400 text-sm">
                <span>Tạm tính</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-stone-500 dark:text-stone-400 text-sm">
                <span>Phí vận chuyển</span>
                <span className="text-green-500">Miễn phí</span>
              </div>
              <div className="flex justify-between text-xl font-serif text-gold-600 dark:text-gold-400 pt-2 border-t border-stone-200 dark:border-white/10 mt-2">
                <span>Tổng cộng</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="flex-1 p-6 md:p-10 relative overflow-y-auto bg-white dark:bg-dark-900">
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 dark:hover:text-white"
            >
              <X size={24} />
            </button>

            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-8 text-sm">
              <span className={`flex items-center gap-2 ${step === 'shipping' ? 'text-gold-600 dark:text-gold-400 font-medium' : 'text-green-500'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${step === 'shipping' ? 'border-gold-600 dark:border-gold-400' : 'border-green-500 bg-green-500/10'}`}>1</div>
                Giao Hàng
              </span>
              <ChevronRight size={16} className="text-stone-400" />
              <span className={`flex items-center gap-2 ${step === 'payment' ? 'text-gold-600 dark:text-gold-400 font-medium' : 'text-stone-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${step === 'payment' ? 'border-gold-600 dark:border-gold-400' : 'border-stone-400'}`}>2</div>
                Thanh Toán
              </span>
            </div>

            {step === 'shipping' ? (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleShippingSubmit}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-serif text-stone-900 dark:text-stone-100">Thông tin giao hàng</h2>
                  {savedInfo && !currentUser && (
                    <span className="text-[10px] text-gold-600 dark:text-gold-400 border border-gold-500/20 bg-gold-500/10 px-2 py-1 rounded-full">
                      Tự động điền từ đơn trước
                    </span>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase text-stone-500 flex justify-between">
                    Email (Để nhận đơn hàng)
                    {currentUser && <span className="text-green-500 text-[10px] flex items-center gap-1"><ShieldCheck size={10}/> Đã đăng nhập</span>}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-stone-400 dark:text-stone-500" size={18} />
                    <input 
                      required
                      type="email"
                      value={shipping.email || ''}
                      onChange={e => setShipping({...shipping, email: e.target.value})}
                      disabled={!!currentUser}
                      className={`w-full bg-stone-50 dark:bg-dark-950 border border-stone-200 dark:border-white/10 rounded-lg p-3 pl-10 text-stone-900 dark:text-stone-200 focus:border-gold-500/50 outline-none placeholder:text-stone-400 dark:placeholder:text-stone-600 ${currentUser ? 'opacity-70 cursor-not-allowed' : ''}`}
                      placeholder="email@example.com"
                    />
                  </div>
                  {!currentUser && <p className="text-[10px] text-stone-500">Chúng tôi sẽ gửi thông tin đơn hàng qua email này.</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase text-stone-500">Họ và tên</label>
                    <div className="relative">
                       <UserIcon className="absolute left-3 top-3.5 text-stone-400 dark:text-stone-500" size={18} />
                       <input 
                         required
                         value={shipping.fullName}
                         onChange={e => setShipping({...shipping, fullName: e.target.value})}
                         className="w-full bg-stone-50 dark:bg-dark-950 border border-stone-200 dark:border-white/10 rounded-lg p-3 pl-10 text-stone-900 dark:text-stone-200 focus:border-gold-500/50 outline-none placeholder:text-stone-400 dark:placeholder:text-stone-600"
                         placeholder="Nguyễn Văn A"
                       />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase text-stone-500">Số điện thoại</label>
                    <input 
                      required
                      type="tel"
                      value={shipping.phone}
                      onChange={e => setShipping({...shipping, phone: e.target.value})}
                      className="w-full bg-stone-50 dark:bg-dark-950 border border-stone-200 dark:border-white/10 rounded-lg p-3 text-stone-900 dark:text-stone-200 focus:border-gold-500/50 outline-none placeholder:text-stone-400 dark:placeholder:text-stone-600"
                      placeholder="0912 345 678"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase text-stone-500">Địa chỉ nhận hàng</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 text-stone-400 dark:text-stone-500" size={18} />
                    <input 
                      required
                      value={shipping.address}
                      onChange={e => setShipping({...shipping, address: e.target.value})}
                      className="w-full bg-stone-50 dark:bg-dark-950 border border-stone-200 dark:border-white/10 rounded-lg p-3 pl-10 text-stone-900 dark:text-stone-200 focus:border-gold-500/50 outline-none placeholder:text-stone-400 dark:placeholder:text-stone-600"
                      placeholder="Số nhà, tên đường, phường/xã"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase text-stone-500">Tỉnh / Thành phố</label>
                  <select 
                    value={shipping.city}
                    onChange={e => setShipping({...shipping, city: e.target.value})}
                    className="w-full bg-stone-50 dark:bg-dark-950 border border-stone-200 dark:border-white/10 rounded-lg p-3 text-stone-900 dark:text-stone-200 focus:border-gold-500/50 outline-none"
                  >
                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button type="submit">Tiếp Tục Thanh Toán</Button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handlePaymentSubmit}
                className="space-y-6"
              >
                <h2 className="text-2xl font-serif text-stone-900 dark:text-stone-100">Phương thức thanh toán</h2>
                
                <div className="grid grid-cols-3 gap-3">
                   <button
                    type="button"
                    onClick={() => setPaymentMethod('stripe')}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'stripe' ? 'bg-gold-500/10 border-gold-500 text-gold-600 dark:text-gold-400' : 'bg-stone-50 dark:bg-white/5 border-stone-200 dark:border-white/10 text-stone-400 hover:bg-stone-100 dark:hover:bg-white/10'}`}
                   >
                     <CreditCard size={24} />
                     <span className="text-xs font-medium uppercase text-center">Thẻ Quốc Tế</span>
                   </button>
                   <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'cod' ? 'bg-gold-500/10 border-gold-500 text-gold-600 dark:text-gold-400' : 'bg-stone-50 dark:bg-white/5 border-stone-200 dark:border-white/10 text-stone-400 hover:bg-stone-100 dark:hover:bg-white/10'}`}
                   >
                     <Banknote size={24} />
                     <span className="text-xs font-medium uppercase text-center">Tiền Mặt (COD)</span>
                   </button>
                   <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'bank' ? 'bg-gold-500/10 border-gold-500 text-gold-600 dark:text-gold-400' : 'bg-stone-50 dark:bg-white/5 border-stone-200 dark:border-white/10 text-stone-400 hover:bg-stone-100 dark:hover:bg-white/10'}`}
                   >
                     <Landmark size={24} />
                     <span className="text-xs font-medium uppercase text-center">Chuyển Khoản</span>
                   </button>
                </div>

                {/* Stripe Element Container */}
                {paymentMethod === 'stripe' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="bg-gradient-to-br from-stone-800 to-stone-900 p-6 rounded-xl border border-white/10 shadow-inner">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-stone-300 font-medium">Thông Tin Thẻ</span>
                        <div className="flex gap-2">
                          <div className="w-8 h-5 bg-white/10 rounded"></div>
                          <div className="w-8 h-5 bg-white/10 rounded"></div>
                        </div>
                      </div>

                      <div className="bg-black/30 border border-white/10 rounded-lg p-4">
                        <CardElement options={cardStyle} />
                      </div>
                      
                      <div className="mt-4 text-[10px] text-stone-500">
                        <p>Powered by Stripe. Hỗ trợ Visa, Mastercard, American Express.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* COD Info */}
                {paymentMethod === 'cod' && (
                   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto mb-4 text-gold-600 dark:text-gold-400">
                         <Banknote size={32} />
                      </div>
                      <h4 className="text-stone-900 dark:text-stone-200 font-serif text-lg mb-2">Thanh toán khi nhận hàng</h4>
                      <p className="text-stone-600 dark:text-stone-400 text-sm">
                        Bạn sẽ thanh toán bằng tiền mặt cho nhân viên giao hàng khi nhận được kiện hàng Moso.
                        <br/>Vui lòng chuẩn bị số tiền tương ứng: <span className="text-gold-600 dark:text-gold-400 font-bold">{formatPrice(total)}</span>
                      </p>
                   </motion.div>
                )}

                {/* Bank Info */}
                {paymentMethod === 'bank' && (
                   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl p-6">
                      <div className="text-center mb-6">
                        <h4 className="text-stone-900 dark:text-stone-200 font-serif text-lg">Thông tin chuyển khoản</h4>
                        <p className="text-stone-500 text-xs mt-1">Vui lòng chuyển khoản theo thông tin bên dưới</p>
                      </div>
                      
                      <div className="space-y-4">
                         <div className="flex justify-between items-center p-3 bg-white dark:bg-dark-950 rounded-lg border border-stone-200 dark:border-white/5">
                            <span className="text-stone-500 text-xs uppercase">Ngân hàng</span>
                            <span className="text-stone-900 dark:text-stone-200 font-medium">MB Bank (Quân Đội)</span>
                         </div>
                         <div className="flex justify-between items-center p-3 bg-white dark:bg-dark-950 rounded-lg border border-stone-200 dark:border-white/5">
                            <span className="text-stone-500 text-xs uppercase">Số tài khoản</span>
                            <div className="flex items-center gap-2">
                               <span className="text-gold-600 dark:text-gold-400 font-mono font-bold text-lg">0000 1234 56789</span>
                               <button type="button" onClick={() => copyToClipboard('0000123456789')} className="text-stone-400 hover:text-stone-800 dark:hover:text-white transition-colors">
                                 {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                               </button>
                            </div>
                         </div>
                         <div className="flex justify-between items-center p-3 bg-white dark:bg-dark-950 rounded-lg border border-stone-200 dark:border-white/5">
                            <span className="text-stone-500 text-xs uppercase">Chủ tài khoản</span>
                            <span className="text-stone-900 dark:text-stone-200 font-medium uppercase">MOSO VIETNAM</span>
                         </div>
                         <div className="bg-gold-500/10 border border-gold-500/20 p-3 rounded-lg text-center">
                            <p className="text-xs text-gold-600 dark:text-gold-400">
                               Nội dung: <strong>SDT {shipping.phone}</strong>
                            </p>
                         </div>
                      </div>
                   </motion.div>
                )}

                {errorMessage && (
                  <div className="flex items-center gap-2 text-rose-500 text-sm bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                    <AlertCircle size={16} />
                    {errorMessage}
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-stone-500 mt-2">
                  <Lock size={12} />
                  <span>Thông tin của bạn được bảo mật tuyệt đối.</span>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button 
                    type="button" 
                    onClick={() => setStep('shipping')}
                    className="text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white transition-colors text-sm"
                  >
                    Quay lại
                  </button>
                  <Button 
                    type="submit" 
                    className="px-8 shadow-gold-500/20 shadow-lg"
                    isLoading={isLoading}
                    disabled={paymentMethod === 'stripe' && !stripe}
                  >
                    {paymentMethod === 'stripe' ? `Thanh Toán ${formatPrice(total)}` : 'Hoàn Tất Đặt Hàng'}
                  </Button>
                </div>
              </motion.form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CheckoutModal;