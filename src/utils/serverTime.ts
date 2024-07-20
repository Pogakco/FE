export class ServerTime {
    private serverTime: Date;
    private localTime: Date;
    private syncTime: number;

    constructor(serverTime: Date) {
        this.serverTime = new Date(serverTime);
        this.localTime = new Date();
        console.log("서버 시간 :",this.serverTime)
        console.log("클라이언트 시간 :",this.localTime)
        this.syncTime = this.serverTime.getTime() - this.localTime.getTime();
        console.log("시간 차 :", Math.round(this.syncTime / 1000))
    }

    public getServerDate(): Date {
        return new Date(new Date().getTime() + this.syncTime);
    }

    public getSyncTime(): number {
        return Math.round(this.syncTime / 1000);
    }
}
