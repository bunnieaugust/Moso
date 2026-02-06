import emailjs from '@emailjs/browser';

// --- CẤU HÌNH (BẠN HÃY KIỂM TRA KỸ LẠI CÁC ID NÀY) ---
// 1. Vào EmailJS -> Email Services -> Lấy ID (thường là service_xxxxx)
const SERVICE_ID = 'Moso_BeautyDessert'; 

// 2. Vào EmailJS -> Email Templates -> Lấy ID (thường là template_xxxxx)
// Bạn có thể dùng chung template hoặc tạo template mới cho Contact
const TEMPLATE_ID_USER = 'Moso_BeautyDessert'; 
const TEMPLATE_ID_ADMIN = 'Moso_BeautyDessert_Admin'; 

// 3. Vào Account -> General -> Public Key
const PUBLIC_KEY = 'TpSt6KFkgPrG_LLhT'; 

export const notifyNewRegistration = async (userName: string, userEmail: string, userPhone: string) => {
  
  // Khởi tạo EmailJS
  emailjs.init(PUBLIC_KEY);

  const currentTime = new Date().toLocaleString('vi-VN');

  const emailParams = {
    name: userName,
    email: userEmail,
    phone: userPhone,
    time: currentTime,
    type: 'Đăng Ký Thành Viên Mới', // Phân loại
    reply_to: userEmail
  };

  console.log("🚀 Đang gửi email đăng ký:", emailParams);

  try {
    await Promise.all([
      emailjs.send(SERVICE_ID, TEMPLATE_ID_USER, emailParams),
      emailjs.send(SERVICE_ID, TEMPLATE_ID_ADMIN, emailParams)
    ]);
    console.log("✅ Gửi email đăng ký THÀNH CÔNG!");
    return true;
  } catch (error) {
    console.error("❌ Gửi email thất bại:", error);
    return false; 
  }
};

// Hàm mới để xử lý Form Liên Hệ / Nhận Ưu Đãi
export const sendContactForm = async (data: { name: string; phone: string; email?: string; productInterest?: string; note?: string }) => {
  emailjs.init(PUBLIC_KEY);
  
  const currentTime = new Date().toLocaleString('vi-VN');

  const emailParams = {
    name: data.name,
    email: data.email || 'Không cung cấp',
    phone: data.phone,
    product_interest: data.productInterest,
    note: data.note || '',
    time: currentTime,
    type: 'Yêu Cầu Tư Vấn / Nhận Ưu Đãi', // Phân loại để Admin dễ lọc
    reply_to: data.email
  };

  console.log("🚀 Đang gửi email liên hệ:", emailParams);

  try {
    // Chỉ gửi cho Admin để thông báo có khách cần tư vấn (hoặc gửi cả User nếu muốn confirm)
    await emailjs.send(SERVICE_ID, TEMPLATE_ID_ADMIN, emailParams);
    
    console.log("✅ Gửi email liên hệ THÀNH CÔNG!");
    return true;
  } catch (error) {
    console.error("❌ Gửi email liên hệ thất bại:", error);
    return false;
  }
};