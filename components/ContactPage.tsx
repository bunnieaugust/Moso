
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Instagram, Facebook, Youtube, Send, MapPin, Mail, Phone, ChevronDown, Check } from 'lucide-react';
import Button from './ui/Button';
import FadeIn from './ui/FadeIn';
import { Language, translations } from '../utils/translations';

interface ContactPageProps {
  onBack: () => void;
  language?: Language;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack, language = 'vi' }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    interests: [] as string[],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const t = translations[language].contactPage;

  const interestOptions = [
    { id: 'beauty', label: t.fields.needsOptions.beauty },
    { id: 'gift', label: t.fields.needsOptions.gift },
    { id: 'partner', label: t.fields.needsOptions.partner },
    { id: 'other', label: t.fields.needsOptions.other }
  ];

  // FAQs data mapping (omitted for brevity, assume same data as previous)
  const faqs = language === 'vi' ? [
    {
      question: "Sản phẩm Moso có hạn sử dụng bao lâu?",
      answer: "Nhờ công nghệ tiệt trùng Retort hiện đại, chè Moso có hạn sử dụng lên đến 12 tháng ở nhiệt độ thường mà không cần chất bảo quản. Tuy nhiên, để giữ hương vị tươi ngon nhất, chúng tôi khuyến khích sử dụng trong vòng 6 tháng kể từ ngày sản xuất."
    },
    // ... other questions
    {
      question: "Cách sử dụng gói tự sôi như thế nào?",
      answer: "Rất đơn giản! Bạn chỉ cần xé gói kích nhiệt đặt vào đáy hộp nhựa đen, đổ nước lạnh (nước lọc thường) đến vạch mức quy định, đặt bát chè lên trên và đậy nắp thật chặt. Chờ 8 phút cho chè nóng đến 90°C là có thể thưởng thức."
    },
    {
      question: "Tôi có cần bảo quản lạnh không?",
      answer: "Không bắt buộc. Sản phẩm có thể bảo quản ở nhiệt độ phòng, nơi thoáng mát, tránh ánh nắng trực tiếp. Tuy nhiên, nếu bạn thích ăn lạnh, có thể để ngăn mát tủ lạnh trước khi dùng (không sử dụng gói tự sôi trong trường hợp này)."
    },
    {
      question: "Moso có giao hàng hỏa tốc không?",
      answer: "Có. Tại khu vực nội thành TP.HCM, Moso hỗ trợ giao hàng hỏa tốc trong 2-4 giờ. Đối với các tỉnh thành khác, thời gian giao hàng tiêu chuẩn là từ 2-4 ngày làm việc."
    },
    {
      question: "Chính sách đổi trả hàng như thế nào?",
      answer: "Chúng tôi hỗ trợ đổi mới 1-1 trong vòng 07 ngày nếu sản phẩm bị lỗi bao bì (phồng, rách), hư hỏng do vận chuyển hoặc gói tự sôi không hoạt động. Vui lòng quay video khi mở hàng để được hỗ trợ nhanh nhất."
    }
  ] : [
    {
      question: "What is the shelf life of Moso products?",
      answer: "Thanks to modern Retort sterilization technology, Moso tea has a shelf life of up to 12 months at room temperature without preservatives. However, for the freshest taste, we recommend using it within 6 months from the date of manufacture."
    },
    // ... other questions
    {
      question: "How do I use the self-heating pack?",
      answer: "It's very simple! Just tear the heat activation pack and place it at the bottom of the black plastic box, pour cold water (regular filtered water) to the indicated line, place the tea bowl on top, and close the lid tightly. Wait 8 minutes for the tea to heat up to 90°C and enjoy."
    },
    {
      question: "Do I need to refrigerate it?",
      answer: "Not required. The product can be stored at room temperature in a cool, dry place away from direct sunlight. However, if you prefer it cold, you can keep it in the fridge before serving (do not use the self-heating pack in this case)."
    },
    {
      question: "Does Moso offer express delivery?",
      answer: "Yes. In the inner city of Ho Chi Minh City, Moso supports express delivery within 2-4 hours. For other provinces, the standard delivery time is 2-4 working days."
    },
    {
      question: "What is the return policy?",
      answer: "We support 1-to-1 exchange within 07 days if the product has packaging defects (bloating, tearing), damage due to shipping, or the self-heating pack does not work. Please record a video when opening the package for the fastest support."
    }
  ];

  const handleInterestToggle = (id: string) => {
    setFormState(prev => {
      const exists = prev.interests.includes(id);
      if (exists) {
        return { ...prev, interests: prev.interests.filter(item => item !== id) };
      } else {
        return { ...prev, interests: [...prev.interests, id] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(language === 'vi' ? "Cảm ơn bạn đã liên hệ. Moso sẽ phản hồi sớm nhất!" : "Thank you for contacting us. Moso will respond shortly!");
      setFormState({ name: '', email: '', phone: '', topic: '', interests: [], message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-dark-950 transition-colors duration-500 pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-20 lg:px-40">
        
        {/* Back Button */}
        <button 
          onClick={onBack} 
          className="group flex items-center gap-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors text-xs tracking-[0.2em] uppercase font-medium mb-16"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t.back}
        </button>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-32">
          {/* LEFT COLUMN: Info & Map */}
          <div className="space-y-12">
            <FadeIn direction="up">
              <h1 className="font-serif text-6xl md:text-7xl text-stone-900 dark:text-stone-100 leading-none mb-8">
                {t.title}
              </h1>
              <p className="text-stone-600 dark:text-stone-400 text-lg font-light leading-relaxed max-w-md">
                {t.desc}
              </p>
            </FadeIn>

            {/* STYLED CONTACT INFO CARD */}
            <FadeIn direction="scale-up" delay={0.1} className="relative group">
              {/* Glow Effect Background */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-500/20 via-rose-500/10 to-gold-500/20 rounded-[2.2rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative bg-white dark:bg-stone-900/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-stone-100 dark:border-white/10 shadow-xl shadow-stone-200/50 dark:shadow-black/50 overflow-hidden">
                {/* Decorative Background Blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

                <div className="grid sm:grid-cols-2 gap-10 relative z-10">
                  {/* Address Section */}
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-white/5 flex items-center justify-center text-gold-600 dark:text-gold-400 border border-stone-200 dark:border-white/5 shadow-inner">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3">{t.headquarters}</h3>
                      <address className="not-italic text-stone-900 dark:text-stone-200 font-serif text-xl leading-relaxed">
                        123 Nguyễn Huệ,<br />
                        Phường Bến Nghé,<br />
                        Quận 1, TP.HCM
                      </address>
                      <a 
                        href="https://www.google.com/maps" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-gold-600 dark:text-gold-400 hover:text-gold-500 mt-3 font-medium group/link"
                      >
                        {t.viewMap} <ArrowUpRight size={14} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>

                  {/* Contact Info Section */}
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-white/5 flex items-center justify-center text-gold-600 dark:text-gold-400 border border-stone-200 dark:border-white/5 shadow-inner">
                      <Phone size={22} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3">{t.info}</h3>
                      <div className="space-y-2">
                        <a href="mailto:hello@moso.vn" className="block text-stone-900 dark:text-stone-200 font-serif text-xl hover:text-gold-600 transition-colors">
                          hello@moso.vn
                        </a>
                        <a href="tel:1900888999" className="block text-stone-900 dark:text-stone-200 font-serif text-xl hover:text-gold-600 transition-colors">
                          1900 888 999
                        </a>
                      </div>
                      
                      <div className="flex gap-3 pt-4">
                        {[Facebook, Instagram, Youtube].map((Icon, i) => (
                          <a key={i} href="#" className="w-10 h-10 rounded-full border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-400 hover:text-white hover:bg-gold-500 hover:border-gold-500 transition-all duration-300">
                            <Icon size={18} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Map Integration */}
            <FadeIn direction="up" delay={0.2} className="w-full aspect-[2/1] bg-stone-200 dark:bg-white/5 rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative group border border-stone-200 dark:border-white/10 shadow-lg">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.424167419736!2d106.70175531533418!3d10.7746922620963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4682442d33%3A0x53c94488b394747!2zMTIzIMSQLiBOZ3V54buFbiBIdeG7hywgQuG6v24gTmdow6ksIFF14bqtbiAxLCBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e0!3m2!en!us!4v1620000000000!5m2!en!us"
                className="w-full h-full border-0 opacity-80 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border border-black/5 dark:border-white/10 rounded-[2rem]" />
            </FadeIn>
          </div>

          {/* RIGHT COLUMN: Minimal Form */}
          <div className="lg:pt-8">
            <FadeIn 
              direction="left"
              delay={0.3}
              className="bg-white dark:bg-white/5 p-8 md:p-12 rounded-[2rem] border border-stone-100 dark:border-white/5 shadow-2xl shadow-stone-200/50 dark:shadow-none sticky top-32"
            >
              <h3 className="font-serif text-3xl text-stone-900 dark:text-stone-100 mb-8">{t.formTitle}</h3>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* ... Form Content ... */}
                <div className="space-y-6">
                  {/* Subject Dropdown */}
                  <div className="group relative">
                    <div className="relative">
                      <select 
                        id="topic"
                        value={formState.topic}
                        onChange={e => setFormState({...formState, topic: e.target.value})}
                        className="peer w-full bg-transparent border-b border-stone-300 dark:border-stone-700 py-3 pr-8 text-stone-900 dark:text-stone-100 outline-none focus:border-gold-600 dark:focus:border-gold-400 transition-colors appearance-none cursor-pointer text-lg"
                      >
                        <option value="" disabled selected className="hidden"></option>
                        <option value="tu-van" className="bg-white dark:bg-stone-900">{t.fields.topicOptions.product}</option>
                        <option value="don-hang" className="bg-white dark:bg-stone-900">{t.fields.topicOptions.order}</option>
                        <option value="hop-tac" className="bg-white dark:bg-stone-900">{t.fields.topicOptions.partner}</option>
                        <option value="khac" className="bg-white dark:bg-stone-900">{t.fields.topicOptions.other}</option>
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={16} />
                    </div>
                    <label 
                      htmlFor="topic"
                      className="absolute left-0 -top-3.5 text-xs text-stone-500 dark:text-stone-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-gold-600 dark:peer-focus:text-gold-400"
                    >
                      {t.fields.topic}
                    </label>
                  </div>

                  {/* Other Inputs */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group relative">
                      <input 
                        type="text" 
                        id="name"
                        required
                        value={formState.name}
                        onChange={e => setFormState({...formState, name: e.target.value})}
                        className="peer w-full bg-transparent border-b border-stone-300 dark:border-stone-700 py-3 text-stone-900 dark:text-stone-100 outline-none focus:border-gold-600 dark:focus:border-gold-400 transition-colors placeholder-transparent text-lg"
                        placeholder="Name"
                      />
                      <label 
                        htmlFor="name"
                        className="absolute left-0 -top-3.5 text-xs text-stone-500 dark:text-stone-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-gold-600 dark:peer-focus:text-gold-400"
                      >
                        {t.fields.name}
                      </label>
                    </div>

                    <div className="group relative">
                      <input 
                        type="tel" 
                        id="phone"
                        value={formState.phone}
                        onChange={e => setFormState({...formState, phone: e.target.value})}
                        className="peer w-full bg-transparent border-b border-stone-300 dark:border-stone-700 py-3 text-stone-900 dark:text-stone-100 outline-none focus:border-gold-600 dark:focus:border-gold-400 transition-colors placeholder-transparent text-lg"
                        placeholder="Phone"
                      />
                      <label 
                        htmlFor="phone"
                        className="absolute left-0 -top-3.5 text-xs text-stone-500 dark:text-stone-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-gold-600 dark:peer-focus:text-gold-400"
                      >
                        {t.fields.phone}
                      </label>
                    </div>
                  </div>

                  <div className="group relative">
                    <input 
                      type="email" 
                      id="email"
                      required
                      value={formState.email}
                      onChange={e => setFormState({...formState, email: e.target.value})}
                      className="peer w-full bg-transparent border-b border-stone-300 dark:border-stone-700 py-3 text-stone-900 dark:text-stone-100 outline-none focus:border-gold-600 dark:focus:border-gold-400 transition-colors placeholder-transparent text-lg"
                      placeholder="Email"
                    />
                    <label 
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-xs text-stone-500 dark:text-stone-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-gold-600 dark:peer-focus:text-gold-400"
                    >
                      {t.fields.email}
                    </label>
                  </div>

                  {/* Interests Checkboxes */}
                  <div>
                    <span className="block text-xs text-stone-500 dark:text-stone-400 mb-3">{t.fields.needs}</span>
                    <div className="flex flex-wrap gap-3">
                      {interestOptions.map((option) => {
                        const isSelected = formState.interests.includes(option.id);
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => handleInterestToggle(option.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
                              isSelected 
                                ? 'bg-stone-900 dark:bg-stone-100 border-stone-900 dark:border-stone-100 text-white dark:text-stone-900' 
                                : 'bg-transparent border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-gold-500'
                            }`}
                          >
                            {isSelected && <Check size={12} />}
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="group relative">
                    <textarea 
                      id="message"
                      rows={3}
                      value={formState.message}
                      onChange={e => setFormState({...formState, message: e.target.value})}
                      className="peer w-full bg-transparent border-b border-stone-300 dark:border-stone-700 py-3 text-stone-900 dark:text-stone-100 outline-none focus:border-gold-600 dark:focus:border-gold-400 transition-colors placeholder-transparent text-lg resize-none"
                      placeholder="Message"
                    ></textarea>
                    <label 
                      htmlFor="message"
                      className="absolute left-0 -top-3.5 text-xs text-stone-500 dark:text-stone-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-gold-600 dark:peer-focus:text-gold-400"
                    >
                      {t.fields.message}
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full md:w-auto px-10 py-4 text-sm tracking-widest uppercase shadow-none hover:shadow-lg"
                    isLoading={isSubmitting}
                  >
                    {t.fields.submit}
                  </Button>
                </div>
              </form>
            </FadeIn>
          </div>
        </div>

        {/* FAQ Section - Clean Accordion Style */}
        <FadeIn 
          direction="up"
          delay={0.4}
          className="max-w-4xl mx-auto mt-20 md:mt-32"
        >
          <div className="text-center mb-16">
            <span className="text-gold-600 dark:text-gold-400 uppercase tracking-widest text-xs font-bold mb-3 block">{t.faqBadge}</span>
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">{t.faqTitle}</h2>
          </div>

          <div className="space-y-4">
             {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="border-b border-stone-200 dark:border-white/10 last:border-0"
                >
                   <button
                     onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                     className="w-full py-6 flex items-center justify-between text-left group"
                   >
                      <span className={`font-serif text-xl transition-colors duration-300 ${openFaqIndex === index ? 'text-gold-600 dark:text-gold-400' : 'text-stone-800 dark:text-stone-200 group-hover:text-gold-500'}`}>
                         {faq.question}
                      </span>
                      <span className={`text-stone-400 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180 text-gold-500' : 'group-hover:text-gold-500'}`}>
                         <ChevronDown size={20} />
                      </span>
                   </button>
                   <AnimatePresence>
                      {openFaqIndex === index && (
                         <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                         >
                            <p className="pb-8 text-stone-600 dark:text-stone-400 font-light leading-relaxed text-lg">
                               {faq.answer}
                            </p>
                         </motion.div>
                      )}
                   </AnimatePresence>
                </div>
             ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default ContactPage;
