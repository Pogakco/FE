export class ServerTime {
    private serverTime: Date;
    private localTime: Date;
    private syncTime: number;

    constructor(serverTime: Date) {
        this.serverTime = new Date(serverTime);
        this.localTime = new Date();
        this.syncTime = this.serverTime.getTime() - this.localTime.getTime();
    }

    public getServerDate(): Date {
        return new Date(new Date().getTime() + this.syncTime);
    }

    public getSyncTime(): number {
        return Math.round(this.syncTime / 1000);
    }
}
