# 🌟 Komi Portfolio - Anime Style Portfolio Website

Một trang web portfolio cá nhân với phong cách anime, được xây dựng bằng React và Vite. Trang web có thiết kế glassmorphism, hiệu ứng âm thanh tương tác, và nhiều tính năng thú vị khác.

## ✨ Tính năng chính

### 🎨 Giao diện
- **Thiết kế Glassmorphism**: Hiệu ứng kính mờ hiện đại
- **Dark Theme**: Chủ đề tối với màu tím/hồng
- **Responsive Design**: Tự động tối ưu cho mobile và desktop
- **Custom Cursor**: Con trỏ chuột tùy chỉnh (chỉ trên desktop)
- **Loading Screen**: Màn hình chờ với hiệu ứng click-to-enter
- **Adaptive Performance**: Tự động điều chỉnh hiệu ứng theo performance

### 🎵 Trình phát nhạc
- **Custom Music Player**: Trình phát nhạc tùy chỉnh với đầy đủ tính năng
- **Playlist Modal**: Danh sách phát với giao diện đẹp
- **Audio-Reactive Avatar**: Avatar phản ứng theo nhịp nhạc
- **Rainbow Border**: Viền cầu vồng chạy quanh avatar theo nhạc
- **Beat Detection**: Phát hiện nhịp bass để tạo hiệu ứng
- **Volume Control**: Điều khiển âm lượng (mặc định 50%)
- **Autoplay**: Tự động phát nhạc sau khi click vào trang

### 🖼️ Sections
- **Hero Section**: Giới thiệu với avatar có thể click để phóng to
- **Projects Grid**: Lưới dự án với modal chi tiết
- **Contact Section**: Liên hệ với Discord popup
- **Skills Display**: Hiển thị kỹ năng với hiệu ứng hover

### 📊 Visitor Tracking
- **Firebase Integration**: Theo dõi lượt xem realtime
- **Device Detection**: Nhận diện thiết bị và tên máy
- **Unique Counting**: Sử dụng FingerprintJS để tránh đếm trùng
- **Visitor List**: Xem danh sách người đã ghé thăm

### ⚡ Performance Optimization
- **Adaptive Performance System**: Tự động điều chỉnh hiệu ứng theo FPS
- **Mobile Optimization**: Tối ưu đặc biệt cho mobile
- **Smart Beat Detection**: Giảm CPU usage trên thiết bị yếu
- **Performance Indicator**: Hiển thị và điều khiển performance mode

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js 16+ 
- npm hoặc yarn

### Cài đặt dependencies
```bash
cd elaina-portfolio
npm install
```

### Chạy development server
```bash
npm run dev
```

### Build cho production
```bash
npm run build
```

## 🐳 Docker

### Build Docker image
```bash
docker build -t komi-portfolio .
```

### Chạy container
```bash
docker run -d -p 8080:80 komi-portfolio
```

## 🛠️ Công nghệ sử dụng

- **React 18** - UI Framework
- **Vite** - Build tool
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **Firebase** - Realtime Database
- **FingerprintJS** - Device fingerprinting
- **Web Audio API** - Beat detection
- **Docker** - Containerization

## ⚡ Performance Modes

### 🔥 High Performance Mode
- Rainbow border: 3s animation
- Full glow effects
- 60fps beat detection

### ⚖️ Medium Performance Mode  
- Rainbow border: 8s animation
- Moderate effects
- 30fps beat detection

### 🛡️ Low Performance Mode
- Rainbow border: 12s animation
- Minimal effects
- 10fps beat detection

**Click performance indicator (top-right) để switch modes!**

## 🎵 Cách thay đổi nhạc

1. Đặt file nhạc vào thư mục `public/music/`
2. Đặt tên file: `music1.mp3`, `music2.mp3`, `music3.mp3`...
3. Sửa playlist trong `src/App.jsx`

## 🖼️ Cách thay đổi hình ảnh

Đặt hình ảnh vào thư mục `public/images/`:
- `avatar.png` - Avatar chính
- `avatar-contact.png` - Avatar contact
- `background.jpg` - Background
- `favicon.ico` - Favicon

## 🔥 Firebase Setup

1. Tạo project Firebase mới
2. Bật Realtime Database
3. Cập nhật config trong `src/firebase.js`
4. Cập nhật Database Rules

## 🚀 Deployment

### Vercel
```bash
npm run build
# Upload dist folder
```

### Docker
```bash
docker build -t komi-portfolio .
docker run -d -p 80:80 komi-portfolio
```

## 🤖 AI Development Tools

Dự án tích hợp `.claude/` directory với AI-powered development tools:
- **Portfolio Optimizer**: Tự động tối ưu performance
- **Component Generator**: Tạo components theo design system
- **Smart Assistant**: AI assistant chuyên về portfolio

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

## 👨‍💻 Author

**Komi** - [GitHub](https://github.com/Komi-san-kugi)

## 📞 Support

- Discord: `komi_elaina`
- Facebook: [Komi](https://www.facebook.com/komilacuatoi.me)
- GitHub Issues

---

⭐ **Nếu project hữu ích, hãy cho một star nhé!** ⭐