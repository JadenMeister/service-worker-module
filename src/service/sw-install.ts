const updatefoundHandler = (registration) => () => {
    const newWorker = registration.installing;
    if (!newWorker) {
        console.log('기존에 새로운 서비스 워커가 없습니다.');
        return;
    }

    newWorker.addEventListener('statechange', statechangeHandler(newWorker));
};


const statechangeHandler = (newWorker) => (e) => {
    console.log('새로운 서비스워커 상태 변경', newWorker.state);
    if (newWorker.state !== 'installed') {
        return;
    }
    if (navigator.serviceWorker.controller) {
        console.info('새로운 서비스워커가 설치됨, 페이지 새로고침 필요');
    }
};

const registerSW = async (): Promise<void> => {

    const GRANTED = 'granted';
    const DENIED = 'denied';


    if (!('serviceWorker' in navigator)) {
        console.log('이 브라우저는 서비스워커를 지원하지 않습니다.');
        return;
    }

    try {

        const registration = await navigator.serviceWorker.register('/service-worker.js', {
            scope: '/'
        });
        console.log('서비스워커 등록 성공', registration.scope);

        checkWorkerState(registration);
        registration.addEventListener('updatefound', updatefoundHandler(registration));
        // checkNewWorker(registration);

        if ('Notification' in window) {
            const permissionStatus = await Notification.requestPermission();
            permissionStateCheck(permissionStatus);

        }


    } catch (error) {
        console.log('서비스워커 설치 실패', error);
    }

    function permissionStateCheck(status: NotificationPermission) {
        if (status === DENIED) {
            console.warn('알림 권한 상태: 거부됨');
            return;
        } else if (status === GRANTED) {
            console.log('알림 권한 상태: 허용됨');
        } else {
            console.log('알림 권한 상태: 기본값');
        }
    }

    //? 새로운 서비스워커가 있는지 ??

    function checkWorkerState(registration: ServiceWorkerRegistration) {
        const logState = (worker: ServiceWorker | null, type: string) => {
            if (worker) {
                console.log(`서비스워커 상태 - ${type}: ${worker.state}`);
            }
        };
        logState(registration.installing, '설치 중');
        logState(registration.waiting, '대기 중');
        logState(registration.active, '활성화 됨');

    }

};


export default registerSW;