import emailjs from '@emailjs/browser';

// --- CẤU HÌNH (BẠN HÃY KIỂM TRA KỸ LẠI CÁC ID NÀY) ---
// 1. Vào EmailJS -> Email Services -> Lấy ID (thường là service_xxxxx)
const SERVICE_ID = 'Moso_BeautyDessert'; 

// 2. Vào EmailJS -> Email Templates -> Lấy ID (thường là template_xxxxx)
const TEMPLATE_ID_USER = 'Moso_BeautyDessert'; 
const TEMPLATE_ID_ADMIN = 'Moso_BeautyDessert_Admin'; 

// 3. Vào Account -> General -> Public Key
const PUBLIC_KEY = 'TpSt6KFkgPrG_LLhT'; 

export const notifyNewRegistration = async (userName: string, userEmail: string, userPhone: string) => {
  
  // Khởi tạo EmailJS ngay lập tức (Giúp tránh lỗi chưa load thư viện)
  emailjs.init(PUBLIC_KEY);

  const currentTime = new Date().toLocaleString('vi-VN');

  const emailParams = {
    name: userName,
    email: userEmail,
    phone: userPhone,
    time: currentTime,
    reply_to: userEmail
  };

  console.log("🚀 Đang gửi email với thông tin:", emailParams);

  try {
    // Gửi email
    await Promise.all([
      emailjs.send(SERVICE_ID, TEMPLATE_ID_USER, emailParams),
      emailjs.send(SERVICE_ID, TEMPLATE_ID_ADMIN, emailParams)
    ]);

    console.log("✅ Gửi email THÀNH CÔNG!");
    return true;
  } catch (error) {
    console.error("❌ Gửi email THẤT BẠI:", error);
    
    // HIỂN THỊ LỖI LÊN MÀN HÌNH ĐỂ BẠN DỄ THẤY
    // Sau khi test xong có thể xóa dòng alert này
    alert(`Lỗi gửi mail: ${JSON.stringify(error)}. Hãy kiểm tra lại Service ID và Template ID.`);
    
    return false; 
  }
};