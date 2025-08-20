declare global {
    interface ExtendableEvent extends Event {
        waitUntil(promise: Promise<any>): void;
    }

    interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
        clients: Clients;
        registration: ServiceWorkerRegistration;

        addEventListener(type: "push", listener: (event: PushEvent) => void): void;

        addEventListener(type: "notificationclick", listener: (event: NotificationEvent) => void): void;

        addEventListener(type: string, listener: EventListener): void;

        removeEventListener(type: string, listener: EventListener): void;

        skipWaiting(): Promise<void>;
    }

    interface NotificationPermission {
        DEFAULT: string;
        DENIED: string;
        GRANTED: string;
    }

    interface PushMessageData {
        text(): string;

        json(): any;

        arrayBuffer(): ArrayBuffer;

        blob(): Blob;


        data: any;
    }


    declare var self: ServiceWorkerGlobalScope;

}

export {}