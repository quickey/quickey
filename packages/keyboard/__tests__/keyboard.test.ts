import { Keyboard } from "../src";

let keyboard: Keyboard;

afterEach(() => {
    keyboard && keyboard.destroy();
    keyboard = null;
});

describe('@quickey/keyboard', () => {

    it('should create Keyboard', () => {
        keyboard = new Keyboard(document);
        expect(keyboard).toBeDefined();
    });

    it('should stream on key down', () => {
        keyboard = new Keyboard(document);

        const writeStream = jest.fn();

        keyboard.getStream("keydown").pipe(writeStream);

        document.dispatchEvent(new KeyboardEvent("keydown", { which: 17, key: "Control" } as any));

        expect(writeStream).toHaveBeenCalledTimes(1);

        expect(writeStream).toBeCalledWith({ code: 17, key: "control" });
    });

    it('shoud stream on key up', () => {
        keyboard = new Keyboard(document);

        const writeStream = jest.fn();

        keyboard.getStream("keyup").pipe(writeStream);

        document.dispatchEvent(new KeyboardEvent("keyup", { which: 17, key: "Control" } as any));

        expect(writeStream).toHaveBeenCalledTimes(1);

        expect(writeStream).toBeCalledWith({ code: 17, key: "control" });
    });

    it('should not call stream when stream removed', () => {
        keyboard = new Keyboard(document);

        const writeStream = jest.fn();

        keyboard.getStream("keydown").pipe(writeStream);
        keyboard.getStream("keydown").unpipe(writeStream);

        document.dispatchEvent(new KeyboardEvent("keyup", { which: 17, key: "Control" } as any));

        expect(writeStream).toHaveBeenCalledTimes(0);
    });

    it('should report acrive keys count', () => {
        keyboard = new Keyboard(document);

        document.dispatchEvent(new KeyboardEvent("keydown", { which: 17, key: "Control" } as any));
        document.dispatchEvent(new KeyboardEvent("keydown", { which: 18, key: "Alt" } as any));

        expect(keyboard.activeKeys).toBe(2);
    });

    it('should report if key is active', () => {
        keyboard = new Keyboard(document);

        document.dispatchEvent(new KeyboardEvent("keydown", { which: 17, key: "Control" } as any));

        expect(keyboard.isKeyActive("control")).toBeTruthy();
    });

    it('should reset active keys record', () => {
        keyboard = new Keyboard(document);

        document.dispatchEvent(new KeyboardEvent("keydown", { which: 17, key: "Control" } as any));
        document.dispatchEvent(new KeyboardEvent("keydown", { which: 18, key: "Alt" } as any));
        document.dispatchEvent(new KeyboardEvent("keydown", { which: 46, key: "Delete" } as any));

        keyboard.reset();

        expect(keyboard.isKeyActive("control")).toBeFalsy();

        expect(keyboard.activeKeys).toBe(0);
    });

    it('should destroy keyboard and inner streams', () => {
        keyboard = new Keyboard(document);

        const writeStream = jest.fn();

        keyboard.getStream("keydown").pipe(writeStream);
        keyboard.getStream("keyup").pipe(writeStream);

        keyboard.destroy();

        expect(writeStream).toBeCalledTimes(0);

        expect(keyboard.getStream("keydown").inOpen).toBeFalsy();

        expect(keyboard.getStream("keyup").inOpen).toBeFalsy();
    });

    it('should stream on custom event target key down', () => {
        const div = document.createElement("div");

        keyboard = new Keyboard(div);

        const writeStream = jest.fn();

        keyboard.getStream("keydown").pipe(writeStream);

        div.dispatchEvent(new KeyboardEvent("keydown", { which: 17, key: "Control" } as any));

        expect(writeStream).toBeCalledTimes(1);
    });
});