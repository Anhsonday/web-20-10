# 🌹 Trang Web Kỷ Niệm Ngày Phụ Nữ Việt Nam 20/10

Trang web kỷ niệm Ngày Phụ nữ Việt Nam 20/10 với giao diện sang trọng, lãng mạn, hiệu ứng cánh hoa rơi, âm thanh piano du dương, hộp quà bí mật, công cụ tạo thiệp chúc mừng tải ảnh trực tiếp, giỏ hoa yêu thương và quẻ may mắn.

---

## ✨ Các Tính Năng Nổi Bật

1. **Hiệu ứng Cánh Hoa & Tinh Tú Tương Tác**: Sử dụng HTML5 Canvas mượt mà, cánh hoa hồng bay lượn và phản hồi nhẹ nhàng khi lướt chuột/chạm.
2. **Nhạc Nền Không Lời Lãng Mạn (Web Audio API)**: Bản hòa tấu piano êm dịu tích hợp sẵn, không lo bị lỗi link nhạc hay bản quyền.
3. **Hộp Quà Bí Mật 20/10**: Mở quà với hiệu ứng pháo giấy confetti và bức thư viết tay cảm động (chọn theo đối tượng: Mẹ, Vợ/Người yêu, Chị em, Cô giáo, Bạn bè).
4. **Trình Tạo Thiệp Chúc Tùy Biến**:
   - Tùy chỉnh tên người nhận, người gửi, lời chúc.
   - Chọn nhanh 4 chủ đề màu sắc sang trọng (Hồng Nhung, Ánh Kim, Tím Lavender, Ngọc Bích).
   - Nút **Sao chép lời chúc**, **Tải ảnh thiệp PNG sắc nét** (vẽ tự động bằng Canvas), và **Chia sẻ**.
5. **Vườn Hoa Tri Ân (Tạo Giỏ Hoa)**: Tự tay hái hoa (Hồng, Hướng Dương, Tulip, Sen, Cẩm Chướng, Cúc Họa Mi) và gửi gắm thông điệp ý nghĩa.
6. **Rút Quẻ May Mắn 20/10**: Bộ bài 3D lật mở những lời chúc phước lành và may mắn cho ngày đặc biệt.

---

## 🚀 Hướng Dẫn Xem Thử Trên Máy (Local Preview)

Bạn có thể mở trực tiếp file `index.html` bằng trình duyệt (Chrome, Safari, Edge...), hoặc chạy server nhỏ:

```bash
# Sử dụng Python (đã có sẵn trên Mac):
python3 -m http.server 3000

# Hoặc dùng npx serve:
npx serve .
```

Sau đó mở trình duyệt tại: `http://localhost:3000`

---

## 🌐 Hướng Dẫn Đẩy Lên Vercel (Miễn Phí 100%)

Dự án này là trang tĩnh thuần (HTML, CSS, JS), cực kỳ nhẹ, tối ưu và tương thích 100% với Vercel. Bạn có thể chọn 1 trong 3 cách sau:

### Cách 1: Đẩy Bằng Vercel CLI (Nhanh nhất - 1 phút)

1. Mở Terminal tại thư mục này:
   ```bash
   cd "/Users/sonhuynh081104/Downloads/Web_20:10"
   ```
2. Cài đặt và chạy lệnh Vercel:
   ```bash
   npx vercel
   ```
3. Nhập email/tài khoản Vercel của bạn khi được hỏi, nhấn `Enter` đồng ý các thiết lập mặc định. Sau vài giây bạn sẽ nhận được đường link website trực tiếp (ví dụ: `https://web-20-10-xxxx.vercel.app`)!
4. Khi muốn cập nhật bản chính thức (Production):
   ```bash
   npx vercel --prod
   ```

---

### Cách 2: Kéo Thả Trực Tiếp Lên Vercel Dashboard (Không cần gõ lệnh)

1. Truy cập [https://vercel.com](https://vercel.com) và đăng nhập (bằng GitHub hoặc Email).
2. Vào trang **Dashboard**, chọn **Add New...** -> **Project**.
3. Bạn có thể nén thư mục này thành file `.zip` hoặc kéo thả thư mục vào Vercel (hoặc qua [Vercel Drop](https://vercel.com/new)).
4. Nhấn **Deploy** là xong!

---

### Cách 3: Đẩy Lên GitHub rồi Liên Kết Vercel (Khuyên dùng nếu muốn lưu code lâu dài)

1. Tạo một repository mới trên GitHub (ví dụ: `web-20-10`).
2. Khởi tạo Git và đẩy code lên:
   ```bash
   git init
   git add .
   git commit -m "feat: website ky niem 20/10"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan-cua-ban>/web-20-10.git
   git push -u origin main
   ```
3. Đăng nhập Vercel, chọn **Add New Project** -> Chọn repository vừa tạo -> Bấm **Deploy**. Vercel sẽ tự động cấp phát domain miễn phí dạng `*.vercel.app` với HTTPS/SSL tự động!
