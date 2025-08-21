const PushBtn = () => {




    const sendPushNotification = async () => {

        const registration = await navigator.serviceWorker.ready;


        console.log("현재 알림 권한:", Notification.permission);

        if (Notification.permission !== "granted" || Notification.permission !== "default") {
            console.error("알림 권한이 없습니다.");
            console.log("현재 알림 권한:", Notification.permission);
            return;
        }

        console.log("현재 알림 권한:", Notification.permission);

        console.log("권한체크 통과")


        await registration.showNotification('테스트 알림', {
            body: '이것은 테스트 알림입니다.',
            tag: 'test',
            actions: [
                {action: 'open', title: '열기'},
                {action: 'close', title: '닫기'}
            ]
        });
    };

    const  sendEvent = async ()=>{
        await sendPushNotification();
        console.log("알림추가")
    }

    return (
        <button onClick={sendEvent}>테스트 알림 보내기 </button>
    )
}




export default PushBtn;