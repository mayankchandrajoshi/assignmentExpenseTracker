declare module 'react-native-get-sms-android' {
    export interface Sms {
        _id: number;
        address: string;
        body: string;
        date: number;
        read: number;
        type: number;
    }

    export function list(
        filter: string,
        errorCallback: (fail: any) => void,
        callback: (count: number, smsList: string) => void,
    ): void;
}