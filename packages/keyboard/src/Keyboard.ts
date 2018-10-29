import KeyboardEventReadStream from "./KeyboardEventReadStream";
import { IKeyboardInput } from "./interfaces";

export default class Keyboard {
    private _keyDownStream: KeyboardEventReadStream;
    private _keyUpStream: KeyboardEventReadStream;
    private _activeKeyRecord: Map<string, IKeyboardInput>;

    constructor(private _target: EventTarget) {
        this._activeKeyRecord = new Map<string, IKeyboardInput>();
        this._keyDownStream = new KeyboardEventReadStream("keydown", _target);
        this._keyUpStream = new KeyboardEventReadStream("keyup", _target);

        this._keyDownStream.pipe(this._onKeyDown);
        this._keyUpStream.pipe(this._onKeyUp);
    }

    public get target(): EventTarget {
        return this._target;
    }

    public get keyup(): KeyboardEventReadStream {
        return this._keyUpStream;
    }

    public get keydown(): KeyboardEventReadStream {
        return this._keyDownStream;
    }

    public get activeKeys(): number {
        return this._activeKeyRecord.size;
    }

    public isKeyActive(key: string): boolean {
        return this._activeKeyRecord.has(key);
    }

    public reset() {
        this._activeKeyRecord.clear();
    }

    public destroy() {
        this._keyDownStream.close();
        this._keyUpStream.close();
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