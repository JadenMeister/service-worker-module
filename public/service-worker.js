// // 현재 src/service-worker.ts를 JavaScript로 변환한 버전
// const CACHE_VERSION = "v1";
// const CACHE_NAME = `l-platform-${CACHE_VERSION}`;
//
// // 설치 이벤트 핸들러
// const installHandler = (event) => {
//   console.log("서비스워커 설치중 ");
//
//   event.waitUntil(
//       Promise.all([
//         caches.open(CACHE_NAME).then(cache => {
//           console.log("캐시 생성 ");
//           return cache.addAll([
//             "/",
//
//           ]);
//         }),
//         self.skipWaiting()
//       ])
//   );
// };
//
// // 활성화 이벤트 핸들러
// const activateHandler = (event) => {
//   console.log("서비스워커 활성화중");
//   event.waitUntil(
//       caches.keys().then(cacheNames => {
//         return Promise.all(
//             cacheNames.map(cacheName => {
//               if (cacheName !== CACHE_NAME) {
//                 console.log('오래된 캐시 삭제:', cacheName);
//                 return caches.delete(cacheName);
//               }
//               return Promise.resolve();
//             })
//         );
//       })
//           .then(() => {
//             console.log("서비스워커 활성화 완료");
//             return self.clients.claim();
//           })
//   );
// };
//
// self.addEventListener("install", installHandler);
// self.addEventListener("activate", activateHandler);