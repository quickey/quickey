import KeyboardEventReadStream from "./KeyboardEventReadStream";
import { IKeyboardInput } from "./interfaces";

class Keyboard {
    private _keyDownStream: KeyboardEventReadStream;
    private _keyUpStream: KeyboardEventReadStream;
    private _activeKeyRecord: Map<string, IKeyboardInput>;

    constructor() {
        this._keyDownStream = new KeyboardEventReadStream("keydown");
        this._keyUpStream = new KeyboardEventReadStream("keyup");

        this._keyDownStream.pipe(this._onKeyDown);
        this._keyUpStream.pipe(this._onKeyUp);
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

    public destroy() {
        this._keyDownStream.close();
        this._keyUpStream.close();
    }

    private _onKeyDown = (input: IKeyboardInput) => {
        this._activeKeyRecord.set(input.key, input);
    }

    private _onKeyUp = (input: IKeyboardInput) => {
        this._activeKeyRecord.delete(input.key);
    }
}

export default new Keyboard();