declare const self: ServiceWorkerGlobalScope;


const CACHE_VERSION = "v1";
const CACHE_NAME = `l-platform-${CACHE_VERSION}`;

// 설치 이벤트 핸들러
const installHandler = (event: ExtendableEvent) => {
    console.log("서비스워커 설치중 ")


    event.waitUntil(
        Promise.all([
            caches.open(CACHE_NAME).then(cache => {
                console.log("캐시 생성 ")
                return cache.addAll([
                    "/",
                    "/index.html",
                    "/static/js/bundle.js",
                    "/static/css/main.css",
                    "/favicon.ico"
                ]);
            }),
            self.skipWaiting()

        ])
    )
}


// 활성화 이벤트 핸들러
const activateHandler = (event: ExtendableEvent) => {
    console.log("서비스워커 활성화중");
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('오래된 캐시 삭제:', cacheName);
                        return caches.delete(cacheName);
                    }
                    return Promise.resolve();
                })
            );
        })
            // ? 즉시제어는 확인 해봐야함 페이지가 로드된 후 서비스 워커 변경 시 예상치못한 동작 발생 위험 있음, 네트워크 요청 메서드 변경시 문제가 될 수 있음
            .then(() => {
                console.log("서비스워커 활성화 완료");
                return self.clients.claim();
            })
    );

};
//TODO: 푸쉬 이벤트 핸들러 구현 후 알림 이벤트랑 동기화 작업 필요
// 푸쉬 이벤트 핸들러
const pushHandler = (event: PushEvent) => {
    console.log("푸쉬 메시지 수신", event)
    const options: NotificationOptions = {
        body: event.data ? event.data.text() : "새로운 알림이 있습니다.",
        actions: [
            {action: "open", title: "보기"},
            {action: "close", title: "닫기"}
        ]
    };
    event.waitUntil(
        self.registration.showNotification("L-platform 알림", options)
    )
}

//TODO: 알림 이벤트 구현
// 알림 클릭 이벤트 핸들러
const notificationClickHandler = (event: NotificationEvent) => {
    console.log('알림 클릭됨:', event);

    event.notification.close();

    if (event.action === 'open') {

        event.waitUntil(
            self.clients.openWindow('/')
        );
    } else if (event.action === 'close') {
        console.log('알림 닫기');
    } else {

        event.waitUntil(
            self.clients.openWindow('/')
        );
    }
};

self.addEventListener("notificationclick", notificationClickHandler);
self.addEventListener("push", pushHandler);
self.addEventListener("install", installHandler);
self.addEventListener("activate", activateHandler);




