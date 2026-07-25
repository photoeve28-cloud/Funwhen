// Tên bộ nhớ đệm (cache) cho PWA PHOTO EVE
const CACHE_NAME = 'photoeve-v1';

// Danh sách các tệp cần lưu tạm để ứng dụng chạy nhanh
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// 1. Lắng nghe sự kiện cài đặt Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('PWA: Đã lưu các tệp vào cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// 2. Lắng nghe và xử lý yêu cầu khi người dùng mở App
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Trả về dữ liệu từ cache nếu có, nếu không thì tải từ mạng
      return response || fetch(event.request);
    })
  );
});
