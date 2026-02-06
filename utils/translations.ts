export type Language = 'vi' | 'en';

export const translations = {
  vi: {
    nav: {
      shop: 'Cửa Hàng',
      about: 'Về Moso',
      contact: 'Liên Hệ',
      reviews: 'Đánh Giá',
      login: 'Đăng Nhập',
      welcome: 'Chào',
      logout: 'Đăng xuất',
      lookup: 'Tra cứu đơn',
      wishlist: 'Yêu thích'
    },
    hero: {
      badge: 'Tinh hoa chè cung đình',
      title1: 'Chè Dưỡng Nhan',
      title2: 'Tự Sôi',
      title3: 'Cao Cấp',
      desc: 'Tiên phong công nghệ <strong>Tiệt trùng Retort</strong> và <strong>Sấy thăng hoa</strong>. Moso mang đến chén chè dưỡng nhan nóng hổi chuẩn vị, giữ trọn dưỡng chất chỉ sau 8 phút tự sôi.',
      ctaPrimary: 'Khám Phá Menu',
      ctaSecondary: 'Câu Chuyện Moso',
      feature1: 'Công nghệ',
      feature2: 'Tự sôi',
      feature3: 'Chất bảo quản',
      scroll: 'Cuộn để khám phá'
    },
    story: {
      label: 'Triết Lý Moso',
      content: '"Không chỉ là chè dưỡng nhan, Moso là sự kết hợp hoàn hảo giữa y học cổ truyền và công nghệ thực phẩm hiện đại, mang đến sự tiện lợi mà vẫn giữ nguyên vẹn tinh túy của đất trời."'
    },
    products: {
      titlePrefix: 'Bộ Sưu Tập',
      titleSuffix: 'Chè Dưỡng Nhan',
      subtitle: 'Sự hòa quyện giữa thảo mộc cung đình và công nghệ chế biến hiện đại. Mỗi chén chè là một liệu pháp chăm sóc sức khỏe và sắc đẹp.',
      viewDetail: 'Xem chi tiết',
      items: {
        '1': { name: 'Chè Hồng Hạo', desc: 'Tinh chất hoa hồng, táo đỏ và long nhãn. Giúp hoạt huyết, đẹp da và điều hòa nội tiết cho phái đẹp.' },
        '2': { name: 'Chè Cúc Vàng', desc: 'Cúc hoa vàng và kỷ tử. Thanh can, giải nhiệt và giúp sáng mắt, ngủ sâu.' },
        '3': { name: 'Chè Đông Trùng', desc: 'Đông trùng hạ thảo và đẳng sâm. Phục hồi thể lực, tăng sức bền và bồi bổ khí huyết.' },
        '4': { name: 'Bộ Quà Tặng Ngũ Hành', desc: 'Bộ sưu tập đầy đủ 5 vị chè dưỡng nhan tự sôi: Nhân Sâm, Đông Trùng, Cúc Vàng, Hồng Hạo, Hạt Sen.' },
      }
    },
    tech: {
      badge: 'Công nghệ đột phá',
      title1: 'Chè nóng',
      title2: 'mọi lúc, mọi nơi',
      desc: 'Công nghệ tự đun nóng độc quyền từ Moso, sử dụng phản ứng tỏa nhiệt an toàn để mang đến chén chè nóng hoàn hảo chỉ trong 8 phút, không cần điện hay lửa.',
      tempTitle: 'Nhiệt độ lý tưởng',
      steps: [
        { title: 'Kích hoạt', desc: 'Bẻ gói kích hoạt nhiệt hoặc đổ nước vào gói tự sôi dưới đáy.' },
        { title: 'Tự đun nóng', desc: 'Phản ứng tỏa nhiệt an toàn bắt đầu ngay lập tức.' },
        { title: '8 Phút', desc: 'Chờ đợi ngắn để đạt nhiệt độ lý tưởng 90°C.' },
        { title: 'Thưởng thức', desc: 'Món chè dưỡng nhan nóng hổi, trọn vẹn hương vị.' }
      ]
    },
    testimonials: {
      label: 'Lời Hồi Đáp',
      title1: 'Khách hàng nói gì về',
      title2: 'Moso',
      questionMark: '?',
      rating: '4.9/5 từ hơn 2,000 đánh giá',
      items: [
        { name: 'Khánh Linh', role: 'Food Reviewer', content: 'Mình cực thích chè dưỡng nhan nhưng lười nấu. Moso là chân ái, chỉ cần đổ nước vào gói tự sôi là có chè nóng ăn ngay.' },
        { name: 'Thu Hà', role: 'Nhân viên ngân hàng', content: 'Mang đi làm ăn trưa rất tiện. Chén chè nhìn sang chảnh, hạt sen sấy thăng hoa mà ăn bùi như sen tươi.' },
        { name: 'Chị Mai', role: 'CEO', content: 'Set quà Tết Moso rất ấn tượng. Đối tác của tôi khen ngợi công nghệ lạ mắt và hương vị tinh tế.' },
        { name: 'Minh Thư', role: 'Sinh viên', content: 'Bao bì đẹp xỉu, chụp hình sống ảo hết nước chấm. Vị chè không bị ngọt gắt như ngoài hàng.' },
        { name: 'Cô Hạnh', role: 'Nội trợ', content: 'Mua cho cả nhà dùng thử, ai cũng khen. Tiện lợi cho người già không phải đun nấu lỉnh kỉnh.' },
        { name: 'Ngọc Lan', role: 'Designer', content: 'Thiết kế bao bì rất sang trọng, mình hay mua làm quà tặng sinh nhật cho bạn bè.' }
      ]
    },
    contact: {
      title1: 'Bạn Đã Sẵn Sàng',
      title2: 'Yêu Chiều Bản Thân?',
      desc: 'Đăng ký ngay để nhận ưu đãi <span class="text-rose-400 font-semibold">-20%</span> cho đơn hàng đầu tiên và trở thành thành viên VIP của cộng đồng Moso.',
      cta: 'Nhận Ưu Đãi Ngay',
      note: '* Số lượng ưu đãi có hạn trong tháng này'
    },
    footer: {
      explore: 'Khám Phá',
      support: 'Hỗ Trợ',
      links: {
         about: 'Về Chúng Tôi',
         story: 'Câu Chuyện',
         menu: 'Thực Đơn',
         blog: 'Blog',
         return: 'Chính sách đổi trả',
         guide: 'Hướng dẫn sử dụng',
         shipping: 'Vận chuyển',
         contact: 'Liên hệ'
      },
      subscribe: {
        title: 'Đăng ký nhận tin',
        placeholder: 'Email của bạn'
      },
      copyright: '© 2024 Moso Beauty Dessert.',
      privacy: 'Riêng tư',
      terms: 'Điều khoản'
    }
  },
  en: {
    nav: {
      shop: 'Shop',
      about: 'Our Story',
      contact: 'Contact',
      reviews: 'Reviews',
      login: 'Log In',
      welcome: 'Hi',
      logout: 'Log Out',
      lookup: 'Order Lookup',
      wishlist: 'Wishlist'
    },
    hero: {
      badge: 'Imperial Beauty Essence',
      title1: 'Premium',
      title2: 'Self-Heating',
      title3: 'Beauty Dessert',
      desc: 'Pioneering <strong>Retort Sterilization</strong> and <strong>Freeze-Drying</strong> technology. Moso delivers a hot, nutrient-rich beauty dessert soup ready in just 8 minutes.',
      ctaPrimary: 'Explore Menu',
      ctaSecondary: 'Moso Story',
      feature1: 'Technology',
      feature2: 'Self-Heat',
      feature3: 'Preservatives',
      scroll: 'Scroll to explore'
    },
    story: {
      label: 'Moso Philosophy',
      content: '"More than just beauty dessert soup, Moso is the perfect blend of traditional medicine and modern food technology, delivering convenience while preserving the essence of nature."'
    },
    products: {
      titlePrefix: 'The Collection',
      titleSuffix: 'Beauty Dessert',
      subtitle: 'A fusion of imperial herbs and modern processing technology. Each bowl is a therapy for health and beauty.',
      viewDetail: 'View Details',
      items: {
        '1': { name: 'Rosy Glow Tea', desc: 'Rose essence, red apple, and longan. Promotes blood circulation, beautifies skin, and balances hormones.' },
        '2': { name: 'Golden Chrysanthemum', desc: 'Golden chrysanthemum and goji berries. Clears heat, improves vision, and promotes deep sleep.' },
        '3': { name: 'Cordyceps Tea', desc: 'Cordyceps and Codonopsis. Restores physical strength, increases endurance, and nourishes vitality.' },
        '4': { name: 'Five Elements Gift Set', desc: 'Complete collection of 5 self-heating beauty soups: Ginseng, Cordyceps, Chrysanthemum, Rosy Glow, Lotus Seed.' },
      }
    },
    tech: {
      badge: 'Breakthrough Tech',
      title1: 'Hot Dessert',
      title2: 'Anytime, Anywhere',
      desc: 'Exclusive self-heating technology from Moso uses a safe exothermic reaction to deliver a perfectly hot dessert soup in just 8 minutes, no electricity or fire needed.',
      tempTitle: 'Ideal Temp',
      steps: [
        { title: 'Activate', desc: 'Break the heat activation pack or pour water into the self-heating pack at the bottom.' },
        { title: 'Self-Heat', desc: 'Safe exothermic reaction starts immediately.' },
        { title: '8 Minutes', desc: 'Short wait to reach ideal temperature of 90°C.' },
        { title: 'Enjoy', desc: 'Hot, full-flavored beauty dessert soup.' }
      ]
    },
    testimonials: {
      label: 'Feedback',
      title1: 'What customers say about',
      title2: 'Moso',
      questionMark: '?',
      rating: '4.9/5 from 2,000+ reviews',
      items: [
         { name: 'Khanh Linh', role: 'Food Reviewer', content: 'I love beauty tea but am too lazy to cook. Moso is a lifesaver, just add water to the self-heating pack and have hot tea immediately.' },
         { name: 'Thu Ha', role: 'Banker', content: 'Very convenient for lunch at work. The bowl looks luxurious, freeze-dried lotus seeds taste as good as fresh ones.' },
         { name: 'Ms. Mai', role: 'CEO', content: 'Moso Tet gift set is impressive. My partners praised the unique technology and refined taste.' },
         { name: 'Minh Thu', role: 'Student', content: 'Beautiful packaging, perfect for photos. The tea taste is not too sweet, feels very refreshing.' },
         { name: 'Ms. Hanh', role: 'Homemaker', content: 'Bought for the whole family, everyone loved it. Convenient for the elderly without cooking. Fast delivery.' },
         { name: 'Ngoc Lan', role: 'Designer', content: 'Packaging design is very luxurious, I often buy as birthday gifts for friends. Stable quality.' }
      ]
    },
    contact: {
      title1: 'Ready To',
      title2: 'Pamper Yourself?',
      desc: 'Sign up now to get <span class="text-rose-400 font-semibold">-20%</span> off your first order and become a VIP member of the Moso community.',
      cta: 'Get Offer Now',
      note: '* Limited offers available this month'
    },
    footer: {
      explore: 'Explore',
      support: 'Support',
      links: {
         about: 'About Us',
         story: 'Our Story',
         menu: 'Menu',
         blog: 'Blog',
         return: 'Return Policy',
         guide: 'Usage Guide',
         shipping: 'Shipping Policy',
         contact: 'Contact'
      },
      subscribe: {
        title: 'Newsletter',
        placeholder: 'Your email'
      },
      copyright: '© 2024 Moso Beauty Dessert.',
      privacy: 'Privacy',
      terms: 'Terms'
    }
  }
};