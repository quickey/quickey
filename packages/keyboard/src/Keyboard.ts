import KeyboardEventReadStream from "./KeyboardEventReadStream";
import { IKeyboardInput } from "./interfaces";

export default class Keyboard {
    private _streams: { [index: string]: KeyboardEventReadStream };
    private _activeKeyRecord: Map<string, IKeyboardInput>;

    constructor(private _target: EventTarget) {
        this._activeKeyRecord = new Map<string, IKeyboardInput>();
        this._streams = {};

        this.getStream("keydown").pipe(this._onKeyDown);
        this.getStream("keyup").pipe(this._onKeyUp);
    }

    public get target(): EventTarget {
        return this._target;
    }

    public get activeKeys(): number {
        return this._activeKeyRecord.size;
    }

    public getStream(event: string): KeyboardEventReadStream {
        return this._streams[event] || this.createEventReadStream(event);
    }

    public createEventReadStream(event: string): KeyboardEventReadStream {
        if (this._streams[event]) {
            return;
        }

        return this._streams[event] = new KeyboardEventReadStream(event, this._target);
    }

    public isKeyActive(key: string): boolean {
        return this._activeKeyRecord.has(key);
    }

    public reset() {
        this._activeKeyRecord.clear();
    }

    public destroy() {
        this._closeAllStreams();
    }

    private _closeAllStreams() {
        for (const event in this._streams) {
            this._closeStream(event);
        }
    }

    private _closeStream(event: string) {
        if (this._streams[event] && this._streams[event].inOpen) {
            this._streams[event].close();
        }
    }

    private _onKeyDown = (input: IKeyboardInput) => {
        if (this.isKeyActive(input.key)) {
            return false;
        }

        this._activeKeyRecord.set(input.key, input);
    }

    private _onKeyUp = (input: IKeyboardInput) => {
        this._activeKeyRecord.delete(input.key);
    }
}