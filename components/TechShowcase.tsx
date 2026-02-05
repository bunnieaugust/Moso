import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, Zap, Sparkles, Thermometer } from 'lucide-react';

const steps = [
  {
    id: "01",
    icon: <Zap className="w-5 h-5" />,
    title: "Kích hoạt",
    desc: "Bẻ gói kích hoạt nhiệt hoặc đổ nước vào gói tự sôi dưới đáy."
  },
  {
    id: "02",
    icon: <Thermometer className="w-5 h-5" />,
    title: "Tự đun nóng",
    desc: "Phản ứng tỏa nhiệt an toàn bắt đầu ngay lập tức."
  },
  {
    id: "03",
    icon: <Clock className="w-5 h-5" />,
    title: "8 Phút",
    desc: "Chờ đợi ngắn để đạt nhiệt độ lý tưởng 90°C."
  },
  {
    id: "04",
    icon: <Sparkles className="w-5 h-5" />,
    title: "Thưởng thức",
    desc: "Món chè dưỡng nhan nóng hổi, trọn vẹn hương vị."
  }
];

const TechShowcase: React.FC = () => {
  return (
    <section id="technology" className="py-24 relative overflow-hidden bg-stone-50 dark:bg-dark-950 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: Visual Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[4/3] lg:aspect-square bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center group"
          >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-br from-stone-900/50 via-black to-black" />
            
            {/* Heat Glow Effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-600/20 blur-[80px] rounded-full animate-pulse" />
            
            {/* Product Image */}
            <div className="relative z-10 transform transition-transform duration-700 group-hover:scale-105">
               <img 
                 src="https://images.unsplash.com/photo-1542353974-912b5d448496?q=80&w=600&auto=format&fit=crop" 
                 alt="Moso Self Heating" 
                 className="w-48 md:w-64 drop-shadow-[0_20px_50px_rgba(234,88,12,0.3)] object-contain mask-image-gradient opacity-90"
               />
               
               {/* Simulated Flame/Smoke Graphics */}
               <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-orange-500/80 animate-float opacity-50">
                  <Flame size={64} />
               </div>
            </div>

            {/* Floating Info Points */}
            <div className="absolute top-1/3 left-8 md:left-12 flex items-center gap-3 opacity-60">
               <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white">
                  <Zap size={14} />
               </div>
               <div className="hidden md:block w-24 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
               <span className="hidden md:block text-xs text-stone-400 font-mono">Heating Core</span>
            </div>

            <div className="absolute bottom-1/3 left-8 md:left-12 flex items-center gap-3 opacity-60">
               <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white">
                  <Thermometer size={14} />
               </div>
               <div className="hidden md:block w-24 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
               <span className="hidden md:block text-xs text-stone-400 font-mono">Safe Reaction</span>
            </div>

            {/* Temperature Card Overlay with Floating Animation */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               animate={{ y: [0, -12, 0] }} // Floating effect up and down
               transition={{ 
                 opacity: { duration: 0.5, delay: 0.5 },
                 scale: { duration: 0.5, delay: 0.5 },
                 y: {
                   duration: 4,
                   repeat: Infinity,
                   ease: "easeInOut"
                 }
               }}
               className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-lg z-20"
            >
               <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                  <Thermometer size={24} />
               </div>
               <div>
                  <div className="text-3xl font-bold text-white font-serif leading-none">90°C</div>
                  <div className="text-xs text-stone-300 font-medium mt-1">Nhiệt độ lý tưởng</div>
               </div>
            </motion.div>

            {/* Brand Watermark */}
            <div className="absolute top-8 inset-x-0 text-center pointer-events-none">
               <span className="text-gold-500/30 text-lg tracking-[0.5em] font-serif font-bold uppercase">Moso Technology</span>
            </div>
          </motion.div>

          {/* RIGHT: Content Steps */}
          <div className="space-y-10 pl-0 lg:pl-4">
            <div>
               <span className="text-gold-600 dark:text-gold-400 text-sm font-bold uppercase tracking-widest mb-2 block">Công nghệ đột phá</span>
               <h2 className="text-5xl md:text-6xl font-serif text-stone-900 dark:text-stone-100 mb-6 leading-tight">
                 Chè nóng <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-rose-500">mọi lúc, mọi nơi</span>
               </h2>
               <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed max-w-lg">
                 Công nghệ tự đun nóng độc quyền từ Moso, sử dụng phản ứng tỏa nhiệt an toàn để mang đến chén chè nóng hoàn hảo chỉ trong 8 phút, không cần điện hay lửa.
               </p>
            </div>

            <div className="grid gap-8">
               {steps.map((step, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.15 }}
                   className="flex gap-5 items-start group"
                 >
                    {/* Icon Box */}
                    <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-white/5 flex items-center justify-center text-gold-600 dark:text-gold-400 border border-stone-200 dark:border-white/10 shrink-0 mt-1 transition-colors group-hover:border-gold-500/30 group-hover:bg-gold-500/10">
                       {step.icon}
                    </div>
                    
                    {/* Text */}
                    <div>
                       <h4 className="text-xl font-serif text-stone-800 dark:text-stone-200 font-bold flex items-center gap-3">
                         <span className="text-sm font-sans font-bold text-stone-400/60">0{idx + 1}.</span>
                         {step.title}
                       </h4>
                       <p className="text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                         {step.desc}
                       </p>
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TechShowcase;