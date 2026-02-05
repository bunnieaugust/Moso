import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import Button from './ui/Button';

interface ReturnPolicyProps {
  onBack: () => void;
}

const ReturnPolicy: React.FC<ReturnPolicyProps> = ({ onBack }) => {
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
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
              <RefreshCw size={32} />
            </div>
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100">Chính Sách Đổi Trả</h1>
              <p className="text-stone-500 mt-1">Cam kết hài lòng 100% từ Moso</p>
            </div>
          </div>

          <div className="space-y-10 text-stone-700 dark:text-stone-300 leading-relaxed">
            <section>
              <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                <ShieldCheck size={20} className="text-gold-500" />
                1. Điều kiện đổi trả
              </h2>
              <p className="mb-4">
                Moso cam kết cung cấp sản phẩm chè dưỡng nhan chất lượng cao nhất. Chúng tôi hỗ trợ đổi trả trong vòng <strong className="text-gold-600 dark:text-gold-400">07 ngày</strong> kể từ ngày nhận hàng trong các trường hợp sau:
              </p>
              <ul className="space-y-3 pl-4 border-l-2 border-gold-500/30">
                <li className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-rose-500 mt-1 shrink-0" />
                  <span>Sản phẩm bị lỗi bao bì (rách, hở) hoặc hư hỏng do vận chuyển.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-rose-500 mt-1 shrink-0" />
                  <span>Sản phẩm giao sai loại, sai số lượng so với đơn đặt hàng.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-rose-500 mt-1 shrink-0" />
                  <span>Sản phẩm có dấu hiệu lạ về màu sắc hoặc mùi vị (do lỗi sản xuất).</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-rose-500 mt-1 shrink-0" />
                  <span>Gói tự sôi bị lỗi, không kích hoạt được nhiệt.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-gold-500" />
                2. Quy trình đổi trả
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-stone-50 dark:bg-white/5 p-6 rounded-xl border border-stone-200 dark:border-white/10">
                  <span className="text-4xl font-serif text-gold-500/20 mb-2 block">01</span>
                  <h3 className="font-bold mb-2">Thông báo</h3>
                  <p className="text-sm">Liên hệ Hotline hoặc Zalo Moso, cung cấp mã đơn hàng và ảnh/video lỗi sản phẩm.</p>
                </div>
                <div className="bg-stone-50 dark:bg-white/5 p-6 rounded-xl border border-stone-200 dark:border-white/10">
                  <span className="text-4xl font-serif text-gold-500/20 mb-2 block">02</span>
                  <h3 className="font-bold mb-2">Xác nhận</h3>
                  <p className="text-sm">CSKH Moso sẽ kiểm tra và xác nhận yêu cầu trong vòng 24h làm việc.</p>
                </div>
                <div className="bg-stone-50 dark:bg-white/5 p-6 rounded-xl border border-stone-200 dark:border-white/10">
                  <span className="text-4xl font-serif text-gold-500/20 mb-2 block">03</span>
                  <h3 className="font-bold mb-2">Xử lý</h3>
                  <p className="text-sm">Moso gửi sản phẩm mới đến tận nơi và thu hồi hàng lỗi (miễn phí vận chuyển).</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-4">
                3. Phương thức hoàn tiền
              </h2>
              <p className="mb-4">
                Trong trường hợp quý khách muốn hoàn tiền thay vì đổi sản phẩm mới, Moso sẽ thực hiện hoàn tiền qua tài khoản ngân hàng:
              </p>
              <ul className="list-disc list-inside space-y-2 text-stone-600 dark:text-stone-400">
                <li>Thời gian xử lý: 3-5 ngày làm việc sau khi nhận được hàng thu hồi.</li>
                <li>Phí chuyển khoản: Moso chịu 100%.</li>
              </ul>
            </section>

            <div className="bg-gold-500/10 border border-gold-500/20 p-6 rounded-xl mt-8">
              <p className="text-center font-medium text-gold-600 dark:text-gold-400">
                Mọi thắc mắc vui lòng liên hệ Hotline: <strong className="text-lg">1900 xxxx</strong> để được giải quyết nhanh nhất.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReturnPolicy;