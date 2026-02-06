

export type Language = 'vi' | 'en';

export const translations = {
  vi: {
    nav: {
      shop: 'Cửa Hàng',
      about: 'Về Moso',
      contact: 'Liên Hệ',
      resources: 'Khám Phá', 
      login: 'Đăng Nhập',
      welcome: 'Chào',
      logout: 'Đăng xuất',
      lookup: 'Tra cứu đơn',
      wishlist: 'Yêu thích',
      resourceMenu: {
        waitlist: 'Đăng Ký Waitlist',
        rewards: 'Moso Rewards',
        blogs: 'Case Studies & Blogs',
        faqs: 'Hỏi đáp (FAQs)'
      }
    },
    authPopover: {
      hello: 'Xin chào',
      myOrders: 'Đơn hàng của tôi',
      logout: 'Đăng xuất',
      membershipTitle: 'Moso Membership',
      rewardsTitle: 'Moso Rewards.',
      rewardsDesc: 'Đăng nhập hoặc Đăng ký để tích điểm và nhận hoàn tiền <strong class="text-gold-600">5%</strong> cho mỗi đơn hàng.',
      learnMore: 'Tìm hiểu thêm',
      accountTitle: 'Tài khoản',
      login: 'Đăng Nhập',
      noAccount: 'Chưa có tài khoản?',
      register: 'Đăng ký ngay'
    },
    authModal: {
      welcomeBack: 'Chào Mừng Trở Lại',
      subtitle: 'Đăng nhập để tiếp tục trải nghiệm mua sắm',
      emailPlaceholder: 'Email của bạn',
      passwordPlaceholder: 'Mật khẩu',
      forgotPassword: 'Quên mật khẩu?',
      loginBtn: 'Đăng Nhập',
      loggingIn: 'Đang Đăng Nhập...',
      noAccount: 'Chưa có tài khoản?',
      registerNow: 'Đăng ký ngay'
    },
    cartDrawer: {
      title: 'Giỏ Hàng',
      emptyTitle: 'Giỏ Hàng Trống',
      emptyDesc: 'Chưa có sản phẩm nào được chọn. <br/> Hãy khám phá thực đơn dưỡng nhan ngay!',
      exploreBtn: 'Khám Phá Menu',
      total: 'Tổng cộng',
      taxIncluded: 'Đã bao gồm thuế',
      checkoutBtn: 'Thanh Toán Ngay'
    },
    wishlistModal: {
      title: 'Yêu Thích',
      emptyTitle: 'Danh sách trống',
      emptyDesc: 'Bạn chưa lưu sản phẩm nào. <br/> Hãy thả tim cho món chè bạn yêu thích nhé!',
      viewProductsBtn: 'Xem Sản Phẩm'
    },
    orderLookup: {
      title: 'Tra Cứu Đơn Hàng',
      desc: 'Kiểm tra trạng thái đơn hàng của bạn bằng Mã đơn hàng và Email đặt hàng.',
      orderIdLabel: 'Mã đơn hàng',
      orderIdPlaceholder: 'VD: 882194',
      emailLabel: 'Email đặt hàng',
      emailPlaceholder: 'email@example.com',
      submitBtn: 'Tra Cứu Ngay',
      errorMissing: 'Vui lòng nhập đầy đủ thông tin'
    },
    rewardsPage: {
      title: 'Moso Rewards',
      subtitle: 'Đặc quyền thượng hạng dành riêng cho bạn',
      desc: 'Tham gia chương trình khách hàng thân thiết để tích lũy điểm thưởng trên mỗi đơn hàng và mở khóa những ưu đãi độc quyền chỉ có tại Moso.',
      joinBtn: 'Tham Gia Ngay',
      loginBtn: 'Đăng Nhập',
      howTitle: 'Cách Thức Hoạt Động',
      steps: [
        { title: 'Đăng Ký', desc: 'Tạo tài khoản miễn phí và nhận ngay 50 điểm thưởng chào mừng.' },
        { title: 'Tích Điểm', desc: 'Nhận 1 điểm cho mỗi 10.000đ chi tiêu khi mua sắm các sản phẩm Moso.' },
        { title: 'Đổi Quà', desc: 'Sử dụng điểm để đổi lấy voucher giảm giá hoặc sản phẩm quà tặng đặc biệt.' }
      ],
      tiersTitle: 'Hạng Thành Viên',
      tiers: [
        { 
          name: 'Silver', 
          requirement: '0 - 200 điểm', 
          benefits: ['Tích điểm 1x', 'Quà sinh nhật voucher 50k', 'Ưu đãi tháng sinh nhật'] 
        },
        { 
          name: 'Gold', 
          requirement: '200+ điểm', 
          benefits: ['Tích điểm 1.5x', 'Quà sinh nhật voucher 100k', 'Freeship mọi đơn hàng', 'Quyền mua sớm sản phẩm mới'] 
        },
        { 
          name: 'Diamond', 
          requirement: '500+ điểm', 
          benefits: ['Tích điểm 2x', 'Quà sinh nhật Set cao cấp', 'Freeship hỏa tốc 2h', 'Chăm sóc khách hàng riêng 1:1', 'Sự kiện VIP Private'] 
        }
      ],
      waysToEarnTitle: 'Cách Kiếm Điểm',
      ways: [
        { action: 'Mua sắm', points: '1 điểm / 10.000đ' },
        { action: 'Đăng ký tài khoản', points: '50 điểm' },
        { action: 'Đánh giá sản phẩm', points: '20 điểm' },
        { action: 'Theo dõi Instagram', points: '10 điểm' },
        { action: 'Giới thiệu bạn bè', points: '100 điểm' }
      ],
      faqBadge: 'Hỗ Trợ',
      faqTitle: 'Thắc Mắc Về Rewards',
      faqs: [
        { q: 'Làm thế nào để tham gia Moso Rewards?', a: 'Rất đơn giản! Bạn chỉ cần tạo tài khoản trên website Moso. Bạn sẽ tự động trở thành thành viên hạng Silver và nhận ngay 50 điểm thưởng.' },
        { q: 'Điểm thưởng có hết hạn không?', a: 'Điểm thưởng sẽ có hiệu lực trong vòng 12 tháng kể từ lần mua hàng cuối cùng. Moso sẽ gửi email nhắc nhở trước khi điểm của bạn hết hạn.' },
        { q: 'Làm sao để kiểm tra hạng thành viên?', a: 'Đăng nhập vào tài khoản, truy cập mục "Moso Rewards". Tại đây bạn sẽ thấy số điểm hiện tại, hạng thành viên và các ưu đãi đang có.' },
        { q: 'Tôi có thể chuyển điểm cho người khác không?', a: 'Hiện tại Moso chưa hỗ trợ tính năng chuyển điểm giữa các tài khoản. Điểm thưởng chỉ áp dụng cho chủ sở hữu tài khoản.' }
      ]
    },
    blogPage: {
      subtitle: 'Tạp Chí & Câu Chuyện',
      title: 'Góc Nhìn Moso',
      readMore: 'Đọc bài viết',
      backToBlog: 'Quay lại danh sách',
      relatedTitle: 'Bài Viết Liên Quan',
      categories: {
        all: 'Tất cả',
        ingredient: 'Nguyên liệu & Dược tính',
        lifestyle: 'Phong cách sống',
        caseStudy: 'Case Study'
      },
      articles: [
        {
          id: 1,
          category: 'lifestyle',
          title: 'Nghệ thuật thưởng trà dưỡng nhan trong nhịp sống hiện đại',
          excerpt: 'Tìm lại sự cân bằng giữa bộn bề công việc với nghi thức 8 phút tự sôi của Moso. Một khoảng lặng cần thiết để tái tạo năng lượng.',
          image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1000&auto=format&fit=crop',
          date: '12 Tháng 10, 2023',
          content: `
            <p>Trong cuộc sống hối hả ngày nay, việc dành thời gian cho bản thân dường như trở thành một điều xa xỉ. Chúng ta thường bị cuốn vào vòng xoáy công việc, gia đình và các mối quan hệ xã hội mà quên mất rằng, cơ thể và tâm trí cũng cần được nghỉ ngơi.</p>
            <h3>Khoảng Lặng Cần Thiết</h3>
            <p>Moso không chỉ mang đến một sản phẩm chè dưỡng nhan, mà còn là một giải pháp tinh thần. 8 phút chờ đợi gói tự sôi hoạt động không phải là thời gian chết, mà là "thời gian vàng" để bạn tĩnh tâm.</p>
            <p>Hãy thử tưởng tượng: Bạn ngồi xuống, kích hoạt gói chè, ngắm nhìn hơi nước bốc lên nhẹ nhàng và hương thơm thảo mộc lan tỏa. Đó là lúc bạn gác lại mọi lo toan, hít thở sâu và cảm nhận sự bình yên.</p>
            <h3>Dưỡng Nhan Từ Bên Trong</h3>
            <p>Sự kết hợp giữa các nguyên liệu quý như Tuyết Yến, Nhựa Đào, và Táo Đỏ không chỉ giúp thanh nhiệt, giải độc mà còn nuôi dưỡng làn da từ sâu bên trong. Thay vì những thức uống công nghiệp nhiều đường, một bát chè Moso ấm nóng là lựa chọn hoàn hảo cho sức khỏe.</p>
          `
        },
        {
          id: 2,
          category: 'ingredient',
          title: 'Hành trình của Nhựa Đào: Từ vùng núi Vân Nam đến bát chè Moso',
          excerpt: 'Khám phá quy trình thu hoạch thủ công và chế biến tỉ mỉ của nhựa đào - "nước mắt" của cây đào, bí quyết cho làn da căng mọng.',
          image: 'https://images.unsplash.com/photo-1512223792601-592a9809eed4?q=80&w=1000&auto=format&fit=crop',
          date: '05 Tháng 10, 2023',
          content: `
            <p>Nhựa đào, hay còn được gọi mỹ miều là "lệ đào", là chất nhựa tiết ra từ thân cây đào. Tại Moso, chúng tôi chỉ sử dụng loại nhựa đào được thu hoạch tự nhiên từ những cây đào cổ thụ tại vùng núi cao Vân Nam.</p>
            <h3>Quy Trình Thu Hoạch Kỳ Công</h3>
            <p>Người nông dân phải chờ đợi những ngày nắng ráo để thu hoạch nhựa. Sau khi lấy về, nhựa đào thô phải trải qua quá trình ngâm nở và nhặt bỏ tạp chất hoàn toàn thủ công. Chỉ những viên nhựa đào trong veo như hổ phách mới được chọn lựa.</p>
            <h3>Công Dụng Tuyệt Vời</h3>
            <p>Nhựa đào chứa hàm lượng collagen thực vật cực kỳ cao, giúp da đàn hồi, giảm nếp nhăn và cấp ẩm tự nhiên. Khi kết hợp cùng Tuyết Yến, đây trở thành bộ đôi "thần dược" cho nhan sắc phái đẹp.</p>
          `
        },
        {
          id: 3,
          category: 'caseStudy',
          title: 'Moso x Doanh Nghiệp: Giải pháp quà tặng sức khỏe cao cấp',
          excerpt: 'Cách Moso giúp các tập đoàn lớn thể hiện sự quan tâm tinh tế đến đối tác và nhân viên thông qua set quà tặng Ngũ Hành.',
          image: 'https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?q=80&w=1000&auto=format&fit=crop',
          date: '28 Tháng 09, 2023',
          content: `
            <p>Tặng quà doanh nghiệp không chỉ là trao đi một vật phẩm, mà còn là gửi gắm thông điệp về sự trân trọng và quan tâm. Moso tự hào là đối tác quà tặng của nhiều tập đoàn lớn trong các dịp Lễ, Tết.</p>
            <h3>Tại Sao Chọn Moso?</h3>
            <ul>
              <li><strong>Sự Khác Biệt:</strong> Công nghệ tự sôi độc đáo tạo ấn tượng mạnh mẽ cho người nhận.</li>
              <li><strong>Thông Điệp Sức Khỏe:</strong> Thể hiện sự quan tâm thiết thực đến sức khỏe của đối tác.</li>
              <li><strong>Thiết Kế Sang Trọng:</strong> Bao bì tinh tế, đậm chất Á Đông nhưng vẫn hiện đại.</li>
            </ul>
            <p>Bộ quà tặng "Ngũ Hành" của Moso không chỉ đẹp về hình thức mà còn cân bằng về dinh dưỡng, mang lại sự hài lòng tuyệt đối.</p>
          `
        },
        {
          id: 4,
          category: 'ingredient',
          title: 'Tại sao Sấy Thăng Hoa giữ trọn 98% dưỡng chất?',
          excerpt: 'So sánh công nghệ sấy nhiệt truyền thống và sấy thăng hoa. Lý do hạt sen Moso vẫn giữ được độ bở tơi và hương vị nguyên bản.',
          image: 'https://images.unsplash.com/photo-1615486511484-92e572499c23?q=80&w=1000&auto=format&fit=crop',
          date: '15 Tháng 09, 2023',
          content: `
            <p>Sấy thăng hoa (Freeze Drying) là công nghệ tiên tiến nhất hiện nay trong bảo quản thực phẩm. Khác với sấy nhiệt làm biến đổi cấu trúc và mất vitamin, sấy thăng hoa hoạt động ở nhiệt độ âm sâu.</p>
            <h3>Cơ Chế Hoạt Động</h3>
            <p>Nước trong nguyên liệu sẽ đông đá, sau đó chuyển trực tiếp từ thể rắn sang thể khí trong môi trường chân không. Điều này giúp nguyên liệu giữ nguyên hình dáng, màu sắc và đặc biệt là 98% hàm lượng dinh dưỡng.</p>
            <h3>Trải Nghiệm Khác Biệt</h3>
            <p>Khi thưởng thức hạt sen sấy thăng hoa trong chè Moso, bạn sẽ cảm nhận được độ bở tơi, ngọt bùi như hạt sen tươi vừa mới nấu, hoàn toàn không bị cứng hay sượng như sấy nhiệt thông thường.</p>
          `
        },
        {
          id: 5,
          category: 'lifestyle',
          title: 'Detox cơ thể sau Tết với thực đơn 7 ngày cùng Moso',
          excerpt: 'Gợi ý lộ trình thanh lọc cơ thể, giảm tải cho dạ dày sau những bữa tiệc tùng liên miên.',
          image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000&auto=format&fit=crop',
          date: '10 Tháng 02, 2024',
          content: '<p>Sau Tết là thời điểm cơ thể cảm thấy nặng nề nhất. Hãy cùng Moso thiết lập lại cân bằng với liệu trình 7 ngày thanh lọc...</p>'
        },
        {
          id: 6,
          category: 'ingredient',
          title: 'Đông Trùng Hạ Thảo - Vàng mềm của Tây Tạng',
          excerpt: 'Tìm hiểu về loại dược liệu quý hiếm bậc nhất và cách Moso đưa nó vào bát chè dưỡng nhan hằng ngày.',
          image: 'https://images.unsplash.com/photo-1606914469725-e39c3ebc8d89?q=80&w=1000&auto=format&fit=crop',
          date: '05 Tháng 01, 2024',
          content: '<p>Đông trùng hạ thảo từ lâu đã được xem là thần dược...</p>'
        },
        {
          id: 7,
          category: 'caseStudy',
          title: 'Review chân thực từ Beauty Blogger Hà Trúc',
          excerpt: 'Hà Trúc nói gì về trải nghiệm "ăn chè kiểu mới" với công nghệ tự sôi của Moso?',
          image: 'https://images.unsplash.com/photo-1616606103915-dea7be788566?q=80&w=1000&auto=format&fit=crop',
          date: '20 Tháng 12, 2023',
          content: '<p>Là một người kỹ tính trong việc chọn thực phẩm...</p>'
        },
        {
          id: 8,
          category: 'lifestyle',
          title: 'Quà tặng 8/3: Gửi trọn yêu thương đến người phụ nữ quan trọng',
          excerpt: 'Tại sao set quà sức khỏe lại lên ngôi thay vì hoa và mỹ phẩm trong năm nay?',
          image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=1000&auto=format&fit=crop',
          date: '01 Tháng 03, 2024',
          content: '<p>Phụ nữ hiện đại ngày càng quan tâm đến sức khỏe...</p>'
        },
        {
          id: 9,
          category: 'ingredient',
          title: 'Phân biệt Tuyết Yến và Mủ Trôm',
          excerpt: 'Hai loại nguyên liệu thường bị nhầm lẫn. Cách nhận biết Tuyết Yến thượng hạng.',
          image: 'https://images.unsplash.com/photo-1515543984318-7e1748253805?q=80&w=1000&auto=format&fit=crop',
          date: '15 Tháng 11, 2023',
          content: '<p>Tuyết yến thực chất là nhựa cây Gum Tragacanth...</p>'
        },
        {
          id: 10,
          category: 'caseStudy',
          title: 'Hành trình 1 năm Moso chinh phục thị trường Việt',
          excerpt: 'Những con số biết nói và câu chuyện đầy cảm hứng của đội ngũ sáng lập.',
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
          date: '01 Tháng 11, 2023',
          content: '<p>Từ một ý tưởng nhỏ trong căn bếp...</p>'
        }
      ]
    },
    faqPage: {
      title: 'Câu Hỏi Thường Gặp',
      subtitle: 'Giải đáp mọi thắc mắc của bạn về Moso',
      backHome: 'Quay lại trang chủ',
      categories: {
        product: 'Sản phẩm & Công nghệ',
        shipping: 'Vận chuyển & Giao nhận',
        storage: 'Bảo quản & Sử dụng',
        order: 'Đặt hàng & Thanh toán',
        rewards: 'Hội viên & Ưu đãi'
      },
      questions: [
        {
          category: 'product',
          q: 'Công nghệ tự sôi hoạt động như thế nào?',
          a: 'Gói tự sôi của Moso sử dụng phản ứng tỏa nhiệt an toàn giữa hỗn hợp khoáng chất (như vôi sống) và nước. Khi tiếp xúc với nước, gói này sinh nhiệt cực nhanh, làm nóng bát chè phía trên lên đến 90°C trong vòng 8 phút mà không cần điện hay lửa.'
        },
        {
          category: 'product',
          q: 'Sản phẩm có chất bảo quản không?',
          a: 'Hoàn toàn không. Moso sử dụng công nghệ tiệt trùng Retort (xử lý nhiệt độ cao áp suất cao) sau khi đóng gói kín, giúp tiêu diệt vi khuẩn và kéo dài thời gian bảo quản tự nhiên lên đến 12 tháng mà không cần phụ gia hóa học.'
        },
        {
          category: 'product',
          q: 'Nguyên liệu có đảm bảo nguồn gốc không?',
          a: 'Có. Chúng tôi tuyển chọn táo đỏ từ Tân Cương, hạt sen từ Hưng Yên, và các dược liệu quý từ những vùng trồng đạt chuẩn. Mọi nguyên liệu đều trải qua quy trình kiểm định khắt khe trước khi chế biến.'
        },
        {
          category: 'shipping',
          q: 'Thời gian giao hàng là bao lâu?',
          a: 'Nội thành TP.HCM: Giao hỏa tốc 2-4h. Các tỉnh thành khác: 2-4 ngày làm việc tùy khu vực.'
        },
        {
          category: 'shipping',
          q: 'Phí vận chuyển được tính như thế nào?',
          a: 'Miễn phí vận chuyển cho đơn hàng từ 500.000đ. Với đơn hàng nhỏ hơn, phí ship đồng giá 25.000đ nội thành và 35.000đ ngoại thành/tỉnh.'
        },
        {
          category: 'storage',
          q: 'Sản phẩm có cần bảo quản tủ lạnh không?',
          a: 'Không bắt buộc. Bạn có thể để ở nhiệt độ phòng nơi thoáng mát. Tuy nhiên, nếu muốn ăn lạnh, bạn có thể để tủ mát trước khi dùng (không dùng gói tự sôi trong trường hợp này).'
        },
        {
          category: 'storage',
          q: 'Hạn sử dụng của sản phẩm là bao lâu?',
          a: '12 tháng kể từ ngày sản xuất in trên bao bì. Nên sử dụng ngay sau khi mở nắp bát chè.'
        },
        {
          category: 'order',
          q: 'Tôi có thể kiểm tra hàng trước khi nhận không?',
          a: 'Moso khuyến khích bạn đồng kiểm (xem ngoại quan, số lượng) với shipper trước khi thanh toán. Tuy nhiên, không được xé bao bì sản phẩm.'
        },
        {
          category: 'order',
          q: 'Chính sách đổi trả như thế nào?',
          a: 'Đổi mới 1-1 trong vòng 7 ngày nếu sản phẩm bị lỗi bao bì, hư hỏng do vận chuyển hoặc lỗi từ nhà sản xuất (gói tự sôi không nóng).'
        },
        {
          category: 'rewards',
          q: 'Làm thế nào để tham gia Moso Rewards?',
          a: 'Rất đơn giản! Bạn chỉ cần tạo tài khoản trên website Moso. Bạn sẽ tự động trở thành thành viên hạng Silver và nhận ngay 50 điểm thưởng.' 
        },
        {
          category: 'rewards',
          q: 'Điểm thưởng có hết hạn không?',
          a: 'Điểm thưởng sẽ có hiệu lực trong vòng 12 tháng kể từ lần mua hàng cuối cùng. Moso sẽ gửi email nhắc nhở trước khi điểm của bạn hết hạn.'
        },
        {
          category: 'rewards',
          q: 'Làm sao để kiểm tra hạng thành viên?',
          a: 'Đăng nhập vào tài khoản, truy cập mục "Moso Rewards". Tại đây bạn sẽ thấy số điểm hiện tại, hạng thành viên và các ưu đãi đang có.'
        },
        {
          category: 'rewards',
          q: 'Tôi có thể chuyển điểm cho người khác không?',
          a: 'Hiện tại Moso chưa hỗ trợ tính năng chuyển điểm giữa các tài khoản. Điểm thưởng chỉ áp dụng cho chủ sở hữu tài khoản.'
        }
      ]
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
      addToCart: 'Thêm vào giỏ',
      bestSeller: 'BÁN CHẠY',
      viewAll: 'Xem Tất Cả Sản Phẩm',
      items: {
        '1': { 
          name: 'Chè Hồng Hạo', 
          desc: 'Tinh chất hoa hồng, táo đỏ và long nhãn. Giúp hoạt huyết, đẹp da và điều hòa nội tiết cho phái đẹp.',
          ingredients: ['Hoa hồng', 'Táo đỏ', 'Long nhãn', 'Kỷ tử', 'Đường phèn'],
          benefits: ['Hoạt huyết', 'Đẹp da', 'Điều hòa nội tiết'],
          usage: 'Xé gói kích nhiệt, cho vào đáy cốc. Đổ nước nguội đến vạch. Đặt bát chè lên trên, đậy nắp và chờ 8 phút để thưởng thức.'
        },
        '2': { 
          name: 'Chè Cúc Vàng', 
          desc: 'Cúc hoa vàng và kỷ tử. Thanh can, giải nhiệt và giúp sáng mắt, ngủ sâu.',
          ingredients: ['Cúc hoa vàng', 'Kỷ tử', 'Tuyết yến', 'Nhựa đào'],
          benefits: ['Thanh nhiệt', 'Sáng mắt', 'An thần'],
          usage: 'Xé gói kích nhiệt, cho vào đáy cốc. Đổ nước nguội đến vạch. Đặt bát chè lên trên, đậy nắp và chờ 8 phút để thưởng thức.'
        },
        '3': { 
          name: 'Chè Đông Trùng', 
          desc: 'Đông trùng hạ thảo và đẳng sâm. Phục hồi thể lực, tăng sức bền và bồi bổ khí huyết.',
          ingredients: ['Đông trùng hạ thảo', 'Đẳng sâm', 'Hạt sen', 'Táo đỏ'],
          benefits: ['Bồi bổ khí huyết', 'Tăng sức đề kháng', 'Phục hồi sức khỏe'],
          usage: 'Xé gói kích nhiệt, cho vào đáy cốc. Đổ nước nguội đến vạch. Đặt bát chè lên trên, đậy nắp và chờ 8 phút để thưởng thức.'
        },
        '4': { 
          name: 'Bộ Quà Tặng Ngũ Hành', 
          desc: 'Bộ sưu tập đầy đủ 5 vị chè dưỡng nhan tự sôi: Nhân Sâm, Đông Trùng, Cúc Vàng, Hồng Hạo, Hạt Sen.',
          ingredients: ['5 vị chè tự sôi', 'Hộp quà cao cấp', 'Thiệp chúc mừng'],
          benefits: ['Quà tặng sang trọng', 'Chăm sóc toàn diện'],
          usage: 'Mỗi hộp nhỏ bên trong có hướng dẫn sử dụng riêng. Dùng công nghệ tự sôi 8 phút.'
        },
      }
    },
    shopPage: {
      heroTitle: 'Bộ Sưu Tập Quà Tặng',
      heroSubtitle: 'Mùa Lễ Hội',
      shopNow: 'Mua Ngay',
      collectionTitle: 'Bộ Sưu Tập Moso',
      categories: 'Danh Mục',
      catAll: 'Tất cả',
      catTea: 'Chè Dưỡng Nhan',
      catGift: 'Set Quà Tặng',
      sort: 'Sắp Xếp',
      sortNewest: 'Mới nhất',
      sortPriceAsc: 'Giá: Thấp đến Cao',
      sortPriceDesc: 'Giá: Cao đến Thấp',
      addToCart: 'Thêm vào giỏ',
      empty: 'Không tìm thấy sản phẩm phù hợp.',
      viewAllBtn: 'Xem tất cả sản phẩm'
    },
    productDetail: {
      backHome: 'Trang chủ',
      menu: 'Thực Đơn',
      reviews: 'đánh giá',
      authentic: 'Chính hãng',
      quantity: 'Số lượng',
      addToCart: 'Thêm Vào Giỏ',
      buyNow: 'Mua Ngay',
      fastShip: 'Giao hàng siêu tốc 2h',
      returnPolicy: 'Đổi trả trong 7 ngày',
      tabs: {
        desc: 'Chi tiết',
        ingredients: 'Thành phần',
        guide: 'Hướng dẫn'
      },
      related: 'Có thể bạn sẽ thích',
      techTitle: 'Công nghệ tự sôi 3 bước'
    },
    aboutPage: {
      subtitle: 'Câu Chuyện Của Chúng Tôi',
      title: 'Đánh thức vẻ đẹp <br/> <span class="italic text-stone-500">từ sâu bên trong.</span>',
      est: 'Est. 2023 — Vietnam',
      intro1: 'Moso ra đời không chỉ để bán những chén chè dưỡng nhan. Chúng tôi ra đời với khát vọng định nghĩa lại cách người phụ nữ hiện đại yêu chiều bản thân giữa nhịp sống hối hả.',
      intro2: 'Lấy cảm hứng từ những phương thuốc bí truyền trong cung đình xưa, nơi các ngự y dày công chế biến yến sào, nhựa đào, tuyết yến để giữ gìn nhan sắc cho các bậc phi tần. Moso tin rằng, vẻ đẹp thực sự phải bắt nguồn từ sức khỏe bên trong.',
      intro3: 'Tuy nhiên, cuộc sống hiện đại không cho phép chúng ta dành hàng giờ để ninh nấu. Đó là lúc <strong class="text-stone-900 dark:text-stone-100">Moso</strong> xuất hiện — như một cầu nối giữa truyền thống nghìn năm và công nghệ tương lai.',
      commitmentTitle: 'Cam kết trọn vẹn, <br /> không ngừng <span class="italic text-gold-600 dark:text-gold-400">đổi mới.</span>',
      commitmentDesc: 'Chất lượng hảo hạng là lời hứa của chúng tôi. Những gì chưa đạt chuẩn Moso sẽ được tinh chỉnh cho đến khi hoàn hảo.',
      missionTitle: 'Sứ Mệnh',
      missionDesc: 'Chúng tôi cung cấp các giải pháp dưỡng nhan chuẩn y khoa, kết hợp tinh hoa thảo mộc Á Đông với công nghệ chế biến hiện đại, mang đến sự tiện lợi và an lành cho phụ nữ Việt.',
      visionTitle: 'Tầm Nhìn',
      visionDesc: 'Trở thành thương hiệu thực phẩm chăm sóc sắc đẹp hàng đầu, được biết đến với sự minh bạch, thực hành đạo đức và cam kết bền vững đối với sức khỏe cộng đồng.',
      value1Title: 'Nguyên Bản & Tự Nhiên',
      value1Desc: 'Chúng tôi từ chối mọi loại hương liệu nhân tạo và chất bảo quản. Táo đỏ từ Tân Cương, Hạt sen từ Hưng Yên, Nhựa đào từ vùng núi cao... Tất cả đều được tuyển chọn khắt khe để giữ trọn vẹn dược tính.',
      value2Title: 'Tiên Phong Công Nghệ',
      value2Desc: 'Công nghệ tiệt trùng Retort và Sấy thăng hoa giúp Moso làm điều không thể: Đóng gói sự tươi ngon của chén chè vừa nấu xong vào một hộp nhỏ gọn, tự làm nóng bất cứ lúc nào mà không cần bếp hay điện.',
      value3Title: 'Nghệ Thuật Sống',
      value3Desc: 'Thưởng thức Moso không chỉ là ăn uống, đó là một nghi thức (ritual). 8 phút chờ đợi chè tự sôi là 8 phút bạn sống chậm lại, lắng nghe cơ thể và tận hưởng khoảnh khắc thư giãn tuyệt đối.',
      quote: '"Vẻ đẹp là sự hài hòa."',
      processBadge: 'Quy Trình',
      processTitle: 'Từ Nông Trại <br/> Đến Chén Ngọc',
      steps: [
        { title: "Tuyển chọn", desc: "Nguyên liệu loại 1 từ các vùng dược liệu nổi tiếng." },
        { title: "Sơ chế thủ công", desc: "Làm sạch tạp chất tỉ mỉ bằng tay." },
        { title: "Ninh kết hợp", desc: "Công thức phối ngũ hành cân bằng dưỡng chất." },
        { title: "Retort & Đóng gói", desc: "Tiệt trùng ở 121°C, khóa trọn hương vị." }
      ],
      processQuote: '"Chúng tôi không chỉ bán sản phẩm, chúng tôi trao gửi sự tận tâm."',
      ctaTitle: 'Trải nghiệm sự tinh tế',
      ctaDesc: 'Hãy để Moso chăm sóc vẻ đẹp và sức khỏe của bạn mỗi ngày, bắt đầu từ một chén chè ấm nóng.',
      ctaBtn: 'Khám Phá Bộ Sưu Tập'
    },
    contactPage: {
      back: 'Quay lại',
      title: 'Liên Hệ',
      desc: 'Moso luôn sẵn lòng lắng nghe bạn. Bạn cần tư vấn về bí quyết dưỡng nhan? Đó là niềm đam mê lớn nhất của chúng tôi. Hãy kết nối trực tiếp với đội ngũ tận tâm ngay bên dưới.',
      headquarters: 'Trụ Sở Chính',
      viewMap: 'Xem bản đồ',
      info: 'Thông tin',
      formTitle: 'Gửi tin nhắn',
      fields: {
        topic: 'Chủ đề liên hệ',
        topicOptions: {
          product: 'Tư vấn sản phẩm',
          order: 'Vấn đề đơn hàng',
          partner: 'Hợp tác doanh nghiệp',
          other: 'Khác'
        },
        name: 'Họ tên',
        phone: 'Số điện thoại',
        email: 'Email liên hệ',
        needs: 'Nhu cầu của bạn',
        needsOptions: {
          beauty: 'Tư vấn dưỡng nhan',
          gift: 'Quà tặng doanh nghiệp',
          partner: 'Hợp tác đại lý',
          other: 'Khác'
        },
        message: 'Nội dung chi tiết',
        submit: 'Gửi Thông Tin'
      },
      faqBadge: 'Hỗ Trợ Khách Hàng',
      faqTitle: 'Câu Hỏi Thường Gặp'
    },
    waitlistPage: {
      back: 'Quay lại',
      successTitle: 'Đăng Ký Thành Công',
      successDesc: 'Cảm ơn bạn đã tham gia danh sách chờ của Moso. Chúng tôi sẽ gửi những thông tin mới nhất và ưu đãi độc quyền vào email của bạn sớm nhất.',
      backHome: 'Quay lại trang chủ',
      title: 'Điều gì tiếp theo <br/> tại Moso?',
      desc: 'Tham gia danh sách email của chúng tôi, là người đầu tiên biết về những hiểu biết chuyên sâu trong ngành và các sản phẩm mới ra mắt.',
      form: {
        firstName: 'Tên *',
        lastName: 'Họ *',
        email: 'Email *',
        phone: 'Số điện thoại',
        interest: 'Sản phẩm bạn quan tâm nhất?',
        consent: 'Tôi đồng ý nhận thông tin liên lạc qua email từ Moso về các sản phẩm và chương trình mới.',
        submit: 'Đăng Ký Ngay'
      }
    },
    registerPage: {
      title: 'Đăng ký tài khoản',
      desc: 'Nhận ngay mã giảm giá <span class="font-semibold text-gold-600">10%</span> gửi về email và hoàn tiền <span class="font-semibold text-gold-600">5%</span> cho mọi đơn hàng.',
      placeholders: {
        name: 'Họ và tên',
        email: 'Địa chỉ Email',
        password: 'Mật khẩu'
      },
      agree: 'Đồng ý với <a href="#" class="underline decoration-stone-400 hover:text-gold-600">Điều khoản</a> và <a href="#" class="underline decoration-stone-400 hover:text-gold-600">Chính sách bảo mật</a>.',
      subscribe: 'Nhận thông tin ưu đãi và tin tức.',
      submit: 'Tạo Tài Khoản',
      or: 'hoặc',
      google: 'Đăng nhập với Google',
      haveAccount: 'Đã có tài khoản?',
      login: 'Đăng nhập',
      quote: '"Vẻ đẹp bắt nguồn từ sự thuần khiết."',
      quoteDesc: 'Tham gia cộng đồng Moso để nhận những bí quyết dưỡng nhan độc quyền.'
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
         { name: 'Minh Thu', role: 'Sinh viên', content: 'Bao bì đẹp xỉu, chụp hình sống ảo hết nước chấm. Vị chè không bị ngọt gắt như ngoài hàng.' },
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
      resources: 'Discover',
      login: 'Log In',
      welcome: 'Hi',
      logout: 'Log Out',
      lookup: 'Order Lookup',
      wishlist: 'Wishlist',
      resourceMenu: {
        waitlist: 'Join Waitlist',
        rewards: 'Moso Rewards',
        blogs: 'Case Studies & Blogs',
        faqs: 'FAQs'
      }
    },
    authPopover: {
      hello: 'Hello',
      myOrders: 'My Orders',
      logout: 'Log Out',
      membershipTitle: 'Moso Membership',
      rewardsTitle: 'Moso Rewards.',
      rewardsDesc: 'Login or Register to earn points.',
      learnMore: 'Learn more',
      accountTitle: 'Account',
      login: 'Log In',
      noAccount: 'No account yet?',
      register: 'Register now'
    },
    authModal: {
      welcomeBack: 'Welcome Back',
      subtitle: 'Log in to continue shopping',
      emailPlaceholder: 'Your Email',
      passwordPlaceholder: 'Password',
      forgotPassword: 'Forgot password?',
      loginBtn: 'Log In',
      loggingIn: 'Logging In...',
      noAccount: 'No account yet?',
      registerNow: 'Register now'
    },
    cartDrawer: {
      title: 'Cart',
      emptyTitle: 'Empty Cart',
      emptyDesc: 'No products selected yet. <br/> Explore our menu now!',
      exploreBtn: 'Explore Menu',
      total: 'Total',
      taxIncluded: 'Tax included',
      checkoutBtn: 'Checkout Now'
    },
    wishlistModal: {
      title: 'Wishlist',
      emptyTitle: 'Empty List',
      emptyDesc: 'You haven\'t saved any products yet.',
      viewProductsBtn: 'View Products'
    },
    orderLookup: {
      title: 'Order Lookup',
      desc: 'Check your order status using Order ID and Email.',
      orderIdLabel: 'Order ID',
      orderIdPlaceholder: 'Ex: 882194',
      emailLabel: 'Order Email',
      emailPlaceholder: 'email@example.com',
      submitBtn: 'Track Now',
      errorMissing: 'Please fill in all information'
    },
    rewardsPage: {
      title: 'Moso Rewards',
      subtitle: 'Exclusive perks just for you',
      desc: 'Join our loyalty program to earn points on every order and unlock exclusive offers.',
      joinBtn: 'Join Now',
      loginBtn: 'Log In',
      howTitle: 'How It Works',
      steps: [
        { title: 'Register', desc: 'Create a free account and get 50 welcome points.' },
        { title: 'Earn Points', desc: 'Get 1 point for every 10,000đ spent.' },
        { title: 'Redeem', desc: 'Use points to redeem vouchers or special gifts.' }
      ],
      tiersTitle: 'Membership Tiers',
      tiers: [
        {
          name: 'Silver',
          requirement: '0 - 200 points',
          benefits: ['1x Point Earning', 'Birthday Voucher 50k', 'Birthday Month Offer']
        },
        {
          name: 'Gold',
          requirement: '200+ points',
          benefits: ['1.5x Point Earning', 'Birthday Voucher 100k', 'Free Shipping', 'Early Access']
        },
        {
          name: 'Diamond',
          requirement: '500+ points',
          benefits: ['2x Point Earning', 'Premium Birthday Gift Set', '2h Express Free Shipping', '1:1 VIP Support', 'Private VIP Events']
        }
      ],
      waysToEarnTitle: 'Ways to Earn',
      ways: [
        { action: 'Shopping', points: '1 point / 10,000đ' },
        { action: 'Register', points: '50 points' },
        { action: 'Review', points: '20 points' },
        { action: 'Follow Instagram', points: '10 points' },
        { action: 'Refer a Friend', points: '100 points' }
      ],
      faqBadge: 'Support',
      faqTitle: 'Rewards FAQs',
      faqs: [
        { q: 'How do I join Moso Rewards?', a: 'Simply create an account on our website. You will automatically become a Silver member and receive 50 welcome points.' },
        { q: 'Do points expire?', a: 'Points are valid for 12 months from your last purchase. We will email you before they expire.' },
        { q: 'How do I check my tier?', a: 'Log in to your account and go to "Moso Rewards". You will see your current points, tier, and benefits.' },
        { q: 'Can I transfer points?', a: 'Currently, points are non-transferable and apply only to the account holder.' }
      ]
    },
    blogPage: {
      subtitle: 'Magazine & Stories',
      title: 'Moso Perspectives',
      readMore: 'Read Article',
      backToBlog: 'Back to Blog',
      relatedTitle: 'Related Articles',
      categories: {
        all: 'All',
        ingredient: 'Ingredients',
        lifestyle: 'Lifestyle',
        caseStudy: 'Case Study'
      },
      articles: []
    },
    faqPage: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to your common questions about Moso',
      backHome: 'Back to home',
      categories: {
        product: 'Product & Technology',
        shipping: 'Shipping & Delivery',
        storage: 'Storage & Usage',
        order: 'Order & Payment',
        rewards: 'Membership & Rewards'
      },
      questions: []
    },
    hero: {
      badge: 'Royal Essence',
      title1: 'Beauty Tea',
      title2: 'Self-Heating',
      title3: 'Premium',
      desc: 'Pioneering <strong>Retort Sterilization</strong> and <strong>Freeze Drying</strong> technology. Moso brings you a hot, nutritious beauty tea in just 8 minutes.',
      ctaPrimary: 'Explore Menu',
      ctaSecondary: 'Moso Story',
      feature1: 'Technology',
      feature2: 'Self-heating',
      feature3: 'Preservative',
      scroll: 'Scroll to explore'
    },
    story: {
      label: 'Moso Philosophy',
      content: '"Not just beauty tea, Moso is the perfect combination of traditional medicine and modern food technology, bringing convenience while preserving the essence of nature."'
    },
    products: {
      titlePrefix: 'Collection',
      titleSuffix: 'Beauty Tea',
      subtitle: 'The harmony between royal herbs and modern processing technology. Each bowl of tea is a therapy for health and beauty.',
      viewDetail: 'View Detail',
      addToCart: 'Add to Cart',
      bestSeller: 'BEST SELLER',
      viewAll: 'View All Products',
      items: {}
    },
    shopPage: {
      heroTitle: 'Gift Collection',
      heroSubtitle: 'Holiday Season',
      shopNow: 'Shop Now',
      collectionTitle: 'Moso Collection',
      categories: 'Categories',
      catAll: 'All',
      catTea: 'Beauty Tea',
      catGift: 'Gift Sets',
      sort: 'Sort By',
      sortNewest: 'Newest',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      addToCart: 'Add to Cart',
      empty: 'No products found.',
      viewAllBtn: 'View all products'
    },
    productDetail: {
      backHome: 'Home',
      menu: 'Menu',
      reviews: 'reviews',
      authentic: 'Authentic',
      quantity: 'Quantity',
      addToCart: 'Add To Cart',
      buyNow: 'Buy Now',
      fastShip: '2h Express Delivery',
      returnPolicy: '7 Days Return',
      tabs: {
        desc: 'Details',
        ingredients: 'Ingredients',
        guide: 'Guide'
      },
      related: 'You might also like',
      techTitle: '3-Step Self-Heating Tech'
    },
    aboutPage: {
      subtitle: 'Our Story',
      title: 'Awaken beauty <br/> <span class="italic text-stone-500">from deep within.</span>',
      est: 'Est. 2023 — Vietnam',
      intro1: 'Moso was born not just to sell beauty tea. We were born with the desire to redefine how modern women pamper themselves amidst the hustle and bustle.',
      intro2: 'Inspired by ancient royal remedies, Moso believes that true beauty must come from health within.',
      intro3: 'However, modern life doesn\'t allow hours of cooking. That\'s when <strong class="text-stone-900 dark:text-stone-100">Moso</strong> appears — bridging thousand-year tradition and future technology.',
      commitmentTitle: 'Full commitment, <br /> constant <span class="italic text-gold-600 dark:text-gold-400">innovation.</span>',
      commitmentDesc: 'Premium quality is our promise.',
      missionTitle: 'Mission',
      missionDesc: 'Providing medical-standard beauty solutions, combining Eastern herbal essence with modern technology.',
      visionTitle: 'Vision',
      visionDesc: 'To become the leading beauty nutrition brand, known for transparency and ethical practices.',
      value1Title: 'Original & Natural',
      value1Desc: 'We refuse all artificial flavors and preservatives.',
      value2Title: 'Tech Pioneer',
      value2Desc: 'Retort and Freeze Drying technology allows Moso to do the impossible: Pack freshness into a compact box.',
      value3Title: 'Art of Living',
      value3Desc: 'Enjoying Moso is a ritual. 8 minutes of waiting is 8 minutes to slow down.',
      quote: '"Beauty is harmony."',
      processBadge: 'Process',
      processTitle: 'From Farm <br/> To Gem Bowl',
      steps: [
        { title: "Selection", desc: "Premium ingredients." },
        { title: "Manual Prep", desc: "Meticulous cleaning." },
        { title: "Combination", desc: "Balanced formula." },
        { title: "Retort & Packing", desc: "Sterilized at 121°C." }
      ],
      processQuote: '"We don\'t just sell products, we deliver dedication."',
      ctaTitle: 'Experience sophistication',
      ctaDesc: 'Let Moso take care of your beauty and health every day.',
      ctaBtn: 'Explore Collection'
    },
    contactPage: {
      back: 'Back',
      title: 'Contact',
      desc: 'Moso is always ready to listen to you. Need advice? Contact us below.',
      headquarters: 'Headquarters',
      viewMap: 'View map',
      info: 'Info',
      formTitle: 'Send message',
      fields: {
        topic: 'Topic',
        topicOptions: {
          product: 'Product Advice',
          order: 'Order Issues',
          partner: 'Partnership',
          other: 'Other'
        },
        name: 'Full Name',
        phone: 'Phone',
        email: 'Email',
        needs: 'Your Needs',
        needsOptions: {
          beauty: 'Beauty Advice',
          gift: 'Corporate Gifts',
          partner: 'Agency Partnership',
          other: 'Other'
        },
        message: 'Message',
        submit: 'Send Message'
      },
      faqBadge: 'Support',
      faqTitle: 'FAQs'
    },
    waitlistPage: {
      back: 'Back',
      successTitle: 'Registration Successful',
      successDesc: 'Thank you for joining. We will send updates soon.',
      backHome: 'Back Home',
      title: 'What\'s next <br/> at Moso?',
      desc: 'Join our list for exclusive updates.',
      form: {
        firstName: 'First Name *',
        lastName: 'Last Name *',
        email: 'Email *',
        phone: 'Phone',
        interest: 'Product of interest?',
        consent: 'I agree to receive communications from Moso.',
        submit: 'Register Now'
      }
    },
    registerPage: {
      title: 'Create Account',
      desc: 'Get <span class="font-semibold text-gold-600">10%</span> off and <span class="font-semibold text-gold-600">5%</span> cashback.',
      placeholders: {
        name: 'Full Name',
        email: 'Email Address',
        password: 'Password'
      },
      agree: 'Agree to <a href="#" class="underline decoration-stone-400 hover:text-gold-600">Terms</a> and <a href="#" class="underline decoration-stone-400 hover:text-gold-600">Privacy Policy</a>.',
      subscribe: 'Subscribe to newsletter.',
      submit: 'Create Account',
      or: 'or',
      google: 'Login with Google',
      haveAccount: 'Have account?',
      login: 'Log in',
      quote: '"Beauty comes from purity."',
      quoteDesc: 'Join Moso community for exclusive beauty secrets.'
    },
    tech: {
      badge: 'Breakthrough Tech',
      title1: 'Hot tea',
      title2: 'anytime, anywhere',
      desc: 'Exclusive self-heating technology.',
      tempTitle: 'Ideal Temperature',
      steps: [
        { title: 'Activate', desc: 'Break the activation pack.' },
        { title: 'Self-heating', desc: 'Safe exothermic reaction starts.' },
        { title: '8 Minutes', desc: 'Wait for ideal 90°C.' },
        { title: 'Enjoy', desc: 'Hot, nutritious beauty tea.' }
      ]
    },
    testimonials: {
      label: 'Feedback',
      title1: 'What customers say about',
      title2: 'Moso',
      questionMark: '?',
      rating: '4.9/5 from 2,000+ reviews',
      items: []
    },
    contact: {
      title1: 'Ready To',
      title2: 'Pamper Yourself?',
      desc: 'Sign up now for <span class="text-rose-400 font-semibold">-20%</span> on your first order.',
      cta: 'Get Offer Now',
      note: '* Limited quantity this month'
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
        shipping: 'Shipping',
        contact: 'Contact'
      },
      subscribe: {
        title: 'Subscribe',
        placeholder: 'Your Email'
      },
      copyright: '© 2024 Moso Beauty Dessert.',
      privacy: 'Privacy',
      terms: 'Terms'
    }
  }
};
