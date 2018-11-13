export default class PubSub {
    private _subscriptions: any[];

    constructor() {
        this._subscriptions = [];
    }

    public update() {
        this._subscriptions.map((fn) => fn());
    }

    public subscribe(fn: () => any) {
        if (typeof fn !== "function") {
            return null;
        }
        this._subscriptions.push(fn);
        return () => this._subscriptions.splice(this._subscriptions.indexOf(fn), 1);
    }

    public removeAllSubscriptions() {
        this._subscriptions.length = 0;
    }
}