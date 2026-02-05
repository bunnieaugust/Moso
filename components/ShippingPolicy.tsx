import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Truck, Clock, MapPin, PackageSearch } from 'lucide-react';

interface ShippingPolicyProps {
  onBack: () => void;
}

const ShippingPolicy: React.FC<ShippingPolicyProps> = ({ onBack }) => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-stone-50 dark:bg-dark-950 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-40 max-w-4xl">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-stone-500 hover:text-gold-500 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Quay lại trang chủ</span>
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-900 rounded-3xl p-8 md:p-12 border border-stone-200 dark:border-white/5 shadow-xl"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Truck size={32} />
            </div>
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100">Chính Sách Vận Chuyển</h1>
              <p className="text-stone-500 mt-1">Giao hàng nhanh chóng - An toàn - Tiện lợi</p>
            </div>
          </div>

          <div className="grid gap-8">
            {/* Rates Table */}
            <section className="overflow-hidden rounded-xl border border-stone-200 dark:border-white/10">
              <table className="w-full text-left text-sm text-stone-600 dark:text-stone-300">
                <thead className="bg-stone-100 dark:bg-white/5 font-serif text-stone-900 dark:text-stone-100 uppercase">
                  <tr>
                    <th className="p-4">Khu vực</th>
                    <th className="p-4">Thời gian dự kiến</th>
                    <th className="p-4">Phí vận chuyển</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-white/5">
                  <tr>
                    <td className="p-4 flex items-center gap-2"><MapPin size={16} /> Nội thành TP.HCM</td>
                    <td className="p-4">Hỏa tốc 2H - 4H</td>
                    <td className="p-4 text-rose-500 font-medium">Theo Grab/Ahamove</td>
                  </tr>
                  <tr>
                    <td className="p-4 flex items-center gap-2"><MapPin size={16} /> TP.HCM (Tiêu chuẩn)</td>
                    <td className="p-4">1 - 2 ngày</td>
                    <td className="p-4">25.000đ (Free {'>'} 300k)</td>
                  </tr>
                  <tr>
                    <td className="p-4 flex items-center gap-2"><MapPin size={16} /> Hà Nội & Tỉnh khác</td>
                    <td className="p-4">2 - 4 ngày</td>
                    <td className="p-4">35.000đ (Free {'>'} 500k)</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Inspection Policy */}
            <section className="bg-stone-50 dark:bg-white/5 p-6 rounded-xl border border-stone-200 dark:border-white/10">
              <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
                <PackageSearch size={20} className="text-gold-500" />
                Chính sách đồng kiểm
              </h3>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm">
                Moso khuyến khích khách hàng <strong className="text-stone-900 dark:text-stone-200">kiểm tra hàng trước khi thanh toán</strong>. 
                Quý khách được quyền mở hộp carton bên ngoài để kiểm tra số lượng và tình trạng cảm quan của sản phẩm (không xé bao bì sản phẩm). 
                Nếu phát hiện lỗi, quý khách có quyền từ chối nhận hàng ngay tại thời điểm đó.
              </p>
            </section>

            {/* Packing Standard */}
            <section>
              <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100 mb-4">Quy cách đóng gói</h3>
              <div className="flex gap-4 items-start">
                 <div className="w-24 h-24 bg-stone-200 dark:bg-white/10 rounded-lg shrink-0 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Packing" />
                 </div>
                 <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                   Mọi đơn hàng từ Moso đều được đóng gói trong hộp carton 3 lớp cứng cáp, chèn giấy chống sốc và dán băng keo niêm phong in logo Moso. 
                   Với Set quà tặng, chúng tôi sử dụng hộp sơn mài/hộp giấy mỹ thuật cao cấp kèm túi giấy sang trọng.
                 </p>
              </div>
            </section>

            <div className="border-t border-stone-200 dark:border-white/10 pt-6 mt-2">
               <p className="text-xs text-stone-500 italic">
                 * Thời gian giao hàng có thể thay đổi vào các dịp Lễ, Tết hoặc do điều kiện thời tiết bất khả kháng. Moso sẽ thông báo kịp thời đến quý khách.
               </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShippingPolicy;