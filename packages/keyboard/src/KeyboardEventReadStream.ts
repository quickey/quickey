import { IKeyboardInput } from "./interfaces";

export type KeyboardEventWriteStream = (e: IKeyboardInput) => boolean | void;

const createInputWriteStream = (input: IKeyboardInput) => (stream: KeyboardEventWriteStream) => stream(input) === false;

export default class KeyboardEventReadStream {
    private _isOpen: boolean;
    private _tabIndexAttached: boolean;
    private readonly _writers: KeyboardEventWriteStream[];

    constructor(private _event: string, private _target: EventTarget = document) {
        this._isOpen = true;
        this._writers = [];

        if (_target instanceof Element && !_target.hasAttribute("tabindex")) {
            _target.setAttribute("tabindex", "0");
            this._tabIndexAttached = true;
        }

        this._target.addEventListener(this._event, this._onEvent, { passive: true });
    }

    public get inOpen(): boolean {
        return this._isOpen;
    }

    public close() {
        this._isOpen = false;
        this._writers.length = 0;

        this._target.removeEventListener(this._event, this._onEvent);

        if (this._tabIndexAttached) {
            (this._target as Element).removeAttribute("tabindex");
            this._tabIndexAttached = false;
        }
    }

    public pipe(targetStream: KeyboardEventWriteStream) {
        if (this._writers.indexOf(targetStream) > -1) {
            return this;
        }

        this._writers.push(targetStream);

        return this;
    }

    public unpipe(targetStream: KeyboardEventWriteStream) {
        const targetStreamLocation = this._writers.indexOf(targetStream);

        if (targetStreamLocation > -1) {
            this._writers.splice(targetStreamLocation, 1);
        }

        return this;
    }

    private _onEvent = (e: KeyboardEvent) => {
        if (!this._writers.length) {
            return;
        }

        const write = createInputWriteStream({
            key: e.key.toLowerCase(),
            code: e.which
        });

        this._writers.find(write);
    }
}