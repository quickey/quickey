const THREAD_TIME_MS = 500;

export interface IThreadPauseObserverDelegate {
    didThreadResumed(observer: ThreadPauseObserver): void;
}

export default class ThreadPauseObserver {

    public delegate: IThreadPauseObserverDelegate;

    private _threadTimeWatcher: any;
    private _lastPerformanceTime: number;

    public static create(): ThreadPauseObserver {
        return new ThreadPauseObserver();
    }

    public static createWithDelegate(delegate: IThreadPauseObserverDelegate): ThreadPauseObserver {
        return new ThreadPauseObserver(delegate);
    }

    private constructor(delegate?: IThreadPauseObserverDelegate) {
        this.delegate = delegate;
    }

    public observe() {
        this.disconnect();
        this._setThreadTimeWatcher();
    }

    public disconnect() {
        clearTimeout(this._threadTimeWatcher);
        this._threadTimeWatcher = null;
    }

    private _setThreadTimeWatcher() {
        this._threadTimeWatcher = setTimeout(() => {

            const now = performance.now();

            if (this._lastPerformanceTime && now - (this._lastPerformanceTime + 10) > THREAD_TIME_MS) {
                this._triggerDelegate();
            }

            this._lastPerformanceTime = now;

            this._setThreadTimeWatcher();
        }, THREAD_TIME_MS);
    }

    private _triggerDelegate() {
        if (this.delegate) {
            this.delegate.didThreadResumed(this);
        }
    }
}