import React, { useState } from 'react';
import Button from './ui/Button';
import ContactModal from './ContactModal';

const Contact: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="contact" className="py-24 relative overflow-hidden">
        {/* Full bg image with overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=2070&auto=format&fit=crop" 
            alt="Tea ceremony" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto px-6 md:px-40 relative z-10 text-center">
          <div className="max-w-3xl mx-auto glass-panel p-12 rounded-[2rem] border border-white/10 shadow-2xl">
            <h2 className="font-serif text-4xl md:text-5xl text-stone-100 mb-6">
              Bạn Đã Sẵn Sàng <br/>
              <span className="text-gold-400 italic">Yêu Chiều Bản Thân?</span>
            </h2>
            <p className="text-stone-300 text-lg mb-8 font-light">
              Đăng ký ngay để nhận ưu đãi <span className="text-rose-400 font-semibold">-20%</span> cho đơn hàng đầu tiên 
              và trở thành thành viên VIP của cộng đồng Moso.
            </p>
            
            <Button 
              variant="primary" 
              className="px-10 py-4 text-lg"
              onClick={() => setIsModalOpen(true)}
            >
              Nhận Ưu Đãi Ngay
            </Button>
            
            <p className="mt-6 text-stone-500 text-xs uppercase tracking-widest">
              * Số lượng ưu đãi có hạn trong tháng này
            </p>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Contact;