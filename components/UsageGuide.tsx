import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Flame, Clock, Zap, AlertTriangle, Thermometer } from 'lucide-react';

interface UsageGuideProps {
  onBack: () => void;
}

const UsageGuide: React.FC<UsageGuideProps> = ({ onBack }) => {
  const steps = [
    {
      title: "Chuẩn bị",
      desc: "Tách riêng bát chè và gói tự sôi. Đặt gói tự sôi nằm phẳng dưới đáy hộp nhựa đen bên ngoài.",
      icon: <Zap size={24} />,
    },
    {
      title: "Kích hoạt",
      desc: "Đổ nước lạnh (nước lọc thường) vào hộp đen đến vạch mức quy định (khoảng 150ml). Gói tự sôi sẽ bắt đầu phản ứng ngay lập tức.",
      icon: <Flame size={24} />,
    },
    {
      title: "Làm nóng",
      desc: "Nhanh chóng đặt bát chè lên trên hộp đen, đậy chặt nắp. Hơi nóng sẽ bao quanh làm nóng bát chè lên đến 90°C.",
      icon: <Thermometer size={24} />,
    },
    {
      title: "Thưởng thức",
      desc: "Chờ đúng 8 phút để các dưỡng chất như Tuyết Yến, Nhựa Đào nở đều và đạt độ dẻo ngon nhất. Mở nắp và thưởng thức.",
      icon: <Clock size={24} />,
    }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-stone-50 dark:bg-dark-950 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-40 max-w-5xl">
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
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100 mb-4">
            Hướng Dẫn Sử Dụng <br />
            <span className="text-gold-500 italic">Chén Tự Sôi Moso</span>
          </h1>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Để đạt được hương vị thơm ngon và giữ trọn vẹn dưỡng chất quý giá, 
            vui lòng thực hiện đúng quy trình 4 bước chuẩn spa dưới đây.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
             {steps.map((step, idx) => (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: idx * 0.1 }}
                 className="flex gap-4 p-6 bg-white dark:bg-white/5 rounded-2xl border border-stone-100 dark:border-white/5 hover:border-gold-500/30 transition-colors shadow-lg shadow-stone-200/50 dark:shadow-none"
               >
                 <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-gold-500/30">
                   {step.icon}
                 </div>
                 <div>
                   <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                     Bước {idx + 1}: {step.title}
                   </h3>
                   <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                     {step.desc}
                   </p>
                 </div>
               </motion.div>
             ))}
          </div>

          <div className="bg-stone-900 rounded-3xl overflow-hidden relative min-h-[400px]">
             {/* Simulated Illustration Graphic */}
             <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-black p-8 flex flex-col items-center justify-center text-center">
                <div className="w-48 h-48 rounded-full border-4 border-gold-500/20 flex items-center justify-center relative mb-8 animate-pulse">
                   <div className="w-40 h-40 rounded-full border-2 border-gold-500/40 flex items-center justify-center">
                      <Thermometer size={64} className="text-gold-500" />
                   </div>
                   <div className="absolute -top-4 -right-4 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                     Max 90°C
                   </div>
                </div>
                <h3 className="text-white font-serif text-2xl mb-2">Công Nghệ Retort</h3>
                <p className="text-stone-400 text-sm max-w-xs">
                  Giúp chè chín đều, hạt sen bở tơi mà không bị nát, giữ nguyên Vitamin và Collagen.
                </p>
             </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-500/20 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-4">
             <AlertTriangle className="text-rose-500" size={24} />
             <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100">Lưu Ý Quan Trọng</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-stone-700 dark:text-stone-300">
             <ul className="list-disc list-inside space-y-2">
               <li>Không xé gói tự sôi, không nếm hoặc ăn các chất bên trong gói tự sôi.</li>
               <li>Hơi nước bốc lên qua lỗ thông hơi rất nóng, cẩn thận tránh bị bỏng tay.</li>
               <li>Đặt hộp trên bề mặt phẳng, chịu nhiệt tốt (bàn kính, bàn gỗ).</li>
             </ul>
             <ul className="list-disc list-inside space-y-2">
               <li>Ngon hơn khi ăn ngay sau 8 phút ủ nóng.</li>
               <li>Nếu muốn ăn lạnh: Ủ nóng xong, để nguội và thêm đá. (Quy trình làm nóng giúp kích hoạt hương vị tốt hơn là ăn lạnh ngay từ đầu).</li>
             </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UsageGuide;