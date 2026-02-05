import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Leaf, Heart, Zap, Sparkles } from 'lucide-react';
import Button from './ui/Button';

interface AboutPageProps {
  onNavigate: (sectionId: string) => void;
}

const FadeInSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="bg-stone-50 dark:bg-dark-950 min-h-screen transition-colors duration-500">
      
      {/* 1. Hero Section - Text Heavy, Minimalist */}
      <section className="pt-48 pb-32 px-6 md:px-40 container mx-auto">
        <FadeInSection>
          <span className="block text-gold-600 dark:text-gold-400 text-xs uppercase tracking-[0.3em] mb-6 font-medium">
            Câu Chuyện Của Chúng Tôi
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-stone-900 dark:text-stone-100 leading-[0.95] mb-12">
            Đánh thức vẻ đẹp <br/> 
            <span className="italic text-stone-500 dark:text-stone-500">từ sâu bên trong.</span>
          </h1>
        </FadeInSection>
        
        <div className="grid md:grid-cols-12 gap-12 items-end">
           <div className="md:col-span-5 relative">
              <FadeInSection delay={0.2}>
                <div className="aspect-[3/4] overflow-hidden rounded-sm">
                   <motion.img 
                     style={{ y }}
                     src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop" 
                     alt="Tea Pouring Art" 
                     className="w-full h-[120%] object-cover"
                   />
                </div>
                <p className="mt-4 text-xs text-stone-400 uppercase tracking-widest text-right">Est. 2023 — Vietnam</p>
              </FadeInSection>
           </div>
           
           <div className="md:col-span-7 md:pl-12">
              <FadeInSection delay={0.4}>
                <p className="text-xl md:text-2xl text-stone-800 dark:text-stone-200 leading-relaxed font-light font-serif mb-8">
                  Moso ra đời không chỉ để bán những chén chè dưỡng nhan. Chúng tôi ra đời với khát vọng định nghĩa lại cách người phụ nữ hiện đại yêu chiều bản thân giữa nhịp sống hối hả.
                </p>
                <div className="space-y-6 text-stone-600 dark:text-stone-400 text-sm md:text-base leading-loose max-w-xl">
                  <p>
                    Lấy cảm hứng từ những phương thuốc bí truyền trong cung đình xưa, nơi các ngự y dày công chế biến yến sào, nhựa đào, tuyết yến để giữ gìn nhan sắc cho các bậc phi tần. Moso tin rằng, vẻ đẹp thực sự phải bắt nguồn từ sức khỏe bên trong.
                  </p>
                  <p>
                    Tuy nhiên, cuộc sống hiện đại không cho phép chúng ta dành hàng giờ để ninh nấu. Đó là lúc <strong className="text-stone-900 dark:text-stone-100">Moso</strong> xuất hiện — như một cầu nối giữa truyền thống nghìn năm và công nghệ tương lai.
                  </p>
                </div>
              </FadeInSection>
           </div>
        </div>
      </section>

      {/* 2. Vision & Mission Section (New - Yucca Style) */}
      <section className="py-20 px-6 md:px-40 container mx-auto">
        <FadeInSection>
          {/* Header Statement */}
          <div className="grid md:grid-cols-2 gap-12 mb-24">
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100 leading-tight">
              Cam kết trọn vẹn, <br />
              không ngừng <span className="italic text-gold-600 dark:text-gold-400">đổi mới.</span>
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed self-center font-light">
              Chất lượng hảo hạng là lời hứa của chúng tôi. Những gì chưa đạt chuẩn Moso sẽ được tinh chỉnh cho đến khi hoàn hảo.
            </p>
          </div>

          {/* Mission Row */}
          <div className="border-t border-stone-200 dark:border-white/10 py-16 grid md:grid-cols-12 gap-6 items-start group hover:bg-stone-100/50 dark:hover:bg-white/5 transition-colors px-4 -mx-4 rounded-xl">
            <div className="md:col-span-4 flex items-center gap-4">
              <div className="w-2 h-2 bg-stone-900 dark:bg-stone-100 rounded-full group-hover:scale-150 transition-transform duration-300" />
              <h3 className="text-3xl font-serif text-stone-900 dark:text-stone-100">Sứ Mệnh</h3>
            </div>
            <div className="md:col-span-8">
              <p className="text-stone-600 dark:text-stone-300 text-lg md:text-xl leading-relaxed max-w-3xl font-light">
                Chúng tôi cung cấp các giải pháp dưỡng nhan chuẩn y khoa, kết hợp tinh hoa thảo mộc Á Đông với công nghệ chế biến hiện đại, mang đến sự tiện lợi và an lành cho phụ nữ Việt.
              </p>
            </div>
          </div>

          {/* Vision Row */}
          <div className="border-t border-stone-200 dark:border-white/10 py-16 grid md:grid-cols-12 gap-6 items-start group hover:bg-stone-100/50 dark:hover:bg-white/5 transition-colors px-4 -mx-4 rounded-xl">
            <div className="md:col-span-4 flex items-center gap-4">
              <div className="w-2 h-2 bg-stone-900 dark:bg-stone-100 rounded-full group-hover:scale-150 transition-transform duration-300" />
              <h3 className="text-3xl font-serif text-stone-900 dark:text-stone-100">Tầm Nhìn</h3>
            </div>
            <div className="md:col-span-8">
              <p className="text-stone-600 dark:text-stone-300 text-lg md:text-xl leading-relaxed max-w-3xl font-light">
                Trở thành thương hiệu thực phẩm chăm sóc sắc đẹp hàng đầu, được biết đến với sự minh bạch, thực hành đạo đức và cam kết bền vững đối với sức khỏe cộng đồng.
              </p>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* 3. Philosophy / Values - Clean Grid */}
      <section className="py-20 border-t border-stone-200 dark:border-white/5 bg-white dark:bg-white/5">
         <div className="container mx-auto px-6 md:px-40">
            <div className="grid md:grid-cols-3 gap-16">
               <FadeInSection delay={0.1}>
                  <div className="w-12 h-12 rounded-full border border-stone-200 dark:border-white/10 flex items-center justify-center text-gold-600 mb-6">
                     <Leaf size={20} />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-4">Nguyên Bản & Tự Nhiên</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                     Chúng tôi từ chối mọi loại hương liệu nhân tạo và chất bảo quản. 
                     Táo đỏ từ Tân Cương, Hạt sen từ Hưng Yên, Nhựa đào từ vùng núi cao... 
                     Tất cả đều được tuyển chọn khắt khe để giữ trọn vẹn dược tính.
                  </p>
               </FadeInSection>

               <FadeInSection delay={0.2}>
                  <div className="w-12 h-12 rounded-full border border-stone-200 dark:border-white/10 flex items-center justify-center text-gold-600 mb-6">
                     <Zap size={20} />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-4">Tiên Phong Công Nghệ</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                     Công nghệ tiệt trùng Retort và Sấy thăng hoa giúp Moso làm điều không thể: 
                     Đóng gói sự tươi ngon của chén chè vừa nấu xong vào một hộp nhỏ gọn, 
                     tự làm nóng bất cứ lúc nào mà không cần bếp hay điện.
                  </p>
               </FadeInSection>

               <FadeInSection delay={0.3}>
                  <div className="w-12 h-12 rounded-full border border-stone-200 dark:border-white/10 flex items-center justify-center text-gold-600 mb-6">
                     <Heart size={20} />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 mb-4">Nghệ Thuật Sống</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                     Thưởng thức Moso không chỉ là ăn uống, đó là một nghi thức (ritual). 
                     8 phút chờ đợi chè tự sôi là 8 phút bạn sống chậm lại, 
                     lắng nghe cơ thể và tận hưởng khoảnh khắc thư giãn tuyệt đối.
                  </p>
               </FadeInSection>
            </div>
         </div>
      </section>

      {/* 4. Full width visual break */}
      <section className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
           <img 
             src="https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?q=80&w=2000&auto=format&fit=crop" 
             alt="Texture details" 
             className="w-full h-[120%] object-cover opacity-90 dark:opacity-70"
           />
           <div className="absolute inset-0 bg-black/20" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
           <FadeInSection>
             <div className="text-center text-white p-8 backdrop-blur-sm bg-white/5 border border-white/10 rounded-full w-64 h-64 md:w-80 md:h-80 flex flex-col items-center justify-center">
                <Sparkles size={32} className="mb-4 text-gold-300" />
                <p className="font-serif text-2xl md:text-3xl italic">"Vẻ đẹp là sự hài hòa."</p>
             </div>
           </FadeInSection>
        </div>
      </section>

      {/* 5. The Process / Tech Detail */}
      <section className="py-32 px-6 md:px-40 container mx-auto">
         <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
               <FadeInSection>
                  <span className="text-gold-600 dark:text-gold-400 uppercase tracking-widest text-xs font-bold mb-4 block">Quy Trình</span>
                  <h2 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100 mb-6">
                    Từ Nông Trại <br/> Đến Bàn Trà
                  </h2>
                  <div className="space-y-8 relative">
                     {/* Vertical Line */}
                     <div className="absolute left-[19px] top-2 bottom-2 w-px bg-stone-200 dark:bg-white/10" />
                     
                     {[
                       { title: "Tuyển chọn", desc: "Nguyên liệu loại 1 từ các vùng dược liệu nổi tiếng." },
                       { title: "Sơ chế thủ công", desc: "Làm sạch tạp chất tỉ mỉ bằng tay." },
                       { title: "Ninh kết hợp", desc: "Công thức phối ngũ hành cân bằng dưỡng chất." },
                       { title: "Retort & Đóng gói", desc: "Tiệt trùng ở 121°C, khóa trọn hương vị." }
                     ].map((step, idx) => (
                       <div key={idx} className="relative flex items-start gap-6">
                          <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-dark-900 border border-stone-200 dark:border-white/10 flex items-center justify-center text-xs font-bold text-stone-500 z-10 shrink-0">
                             {idx + 1}
                          </div>
                          <div className="pt-2">
                             <h4 className="text-stone-900 dark:text-stone-100 font-serif text-xl mb-1">{step.title}</h4>
                             <p className="text-stone-500 dark:text-stone-400 text-sm">{step.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </FadeInSection>
            </div>
            
            <div className="order-1 md:order-2 relative h-full min-h-[500px]">
               <FadeInSection delay={0.2}>
                  <img 
                    src="https://images.unsplash.com/photo-1564858852877-e24c25d8041e?q=80&w=800&auto=format&fit=crop" 
                    alt="Process" 
                    className="w-full h-full object-cover rounded-sm shadow-2xl"
                  />
                  <div className="absolute -bottom-8 -left-8 bg-white dark:bg-stone-800 p-6 shadow-xl border border-stone-100 dark:border-white/5 max-w-xs hidden md:block">
                     <p className="font-serif text-xl italic text-stone-800 dark:text-stone-200">
                        "Chúng tôi không chỉ bán sản phẩm, chúng tôi trao gửi sự tận tâm."
                     </p>
                  </div>
               </FadeInSection>
            </div>
         </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 text-center bg-stone-100 dark:bg-white/5">
         <FadeInSection>
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100 mb-6">
               Trải nghiệm sự tinh tế
            </h2>
            <p className="text-stone-500 dark:text-stone-400 mb-8 max-w-lg mx-auto">
               Hãy để Moso chăm sóc vẻ đẹp và sức khỏe của bạn mỗi ngày, bắt đầu từ một chén chè ấm nóng.
            </p>
            <Button 
               variant="primary" 
               onClick={() => onNavigate('shop')}
               className="px-12 py-4 text-base"
               icon={<ArrowRight size={18} />}
            >
               Khám Phá Bộ Sưu Tập
            </Button>
         </FadeInSection>
      </section>

    </div>
  );
};

export default AboutPage;