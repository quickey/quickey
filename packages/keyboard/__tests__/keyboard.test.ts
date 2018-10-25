import { Keyboard } from "../src";

let keyboard: Keyboard;

afterEach(() => {
    keyboard && keyboard.destroy();
    keyboard = null;
});

describe('@quickey/keyboard', () => {

    it('should create Keyboard', () => {
        keyboard = new Keyboard();
        expect(keyboard).toBeDefined();
    });

    it('should stream on key down', () => {
        keyboard = new Keyboard();

        const writeStream = jest.fn();

        keyboard.keydown.pipe(writeStream);

        document.dispatchEvent(new KeyboardEvent("keydown", { which: 17, key: "Control" } as any));

        expect(writeStream).toHaveBeenCalledTimes(1);

        expect(writeStream).toBeCalledWith({ code: 17, key: "control" });
    });

    it('shoud stream on key up', () => {
        keyboard = new Keyboard();

        const writeStream = jest.fn();

        keyboard.keyup.pipe(writeStream);

        document.dispatchEvent(new KeyboardEvent("keyup", { which: 17, key: "Control" } as any));

        expect(writeStream).toHaveBeenCalledTimes(1);

        expect(writeStream).toBeCalledWith({ code: 17, key: "control" });
    });

    it('should not call stream when stream removed', () => {
        keyboard = new Keyboard();

        const writeStream = jest.fn();

        keyboard.keydown.pipe(writeStream);
        keyboard.keydown.unpipe(writeStream);

        document.dispatchEvent(new KeyboardEvent("keyup", { which: 17, key: "Control" } as any));

        expect(writeStream).toHaveBeenCalledTimes(0);
    });

    it('should report acrive keys count', () => {
        keyboard = new Keyboard();

        document.dispatchEvent(new KeyboardEvent("keydown", { which: 17, key: "Control" } as any));
        document.dispatchEvent(new KeyboardEvent("keydown", { which: 18, key: "Alt" } as any));

        expect(keyboard.activeKeys).toBe(2);
    });

    it('should report if key is active', () => {
        keyboard = new Keyboard();

        document.dispatchEvent(new KeyboardEvent("keydown", { which: 17, key: "Control" } as any));

        expect(keyboard.isKeyActive("control")).toBeTruthy();
    });

    it('should reset active keys record', () => {
        keyboard = new Keyboard();

        document.dispatchEvent(new KeyboardEvent("keydown", { which: 17, key: "Control" } as any));
        document.dispatchEvent(new KeyboardEvent("keydown", { which: 18, key: "Alt" } as any));
        document.dispatchEvent(new KeyboardEvent("keydown", { which: 46, key: "Delete" } as any));

        keyboard.reset();

        expect(keyboard.isKeyActive("control")).toBeFalsy();

        expect(keyboard.activeKeys).toBe(0);
    });

    it('should destroy keyboard and inner streams', () => {
        keyboard = new Keyboard();

        const writeStream = jest.fn();

        keyboard.keydown.pipe(writeStream);
        keyboard.keyup.pipe(writeStream);

        keyboard.destroy();

        expect(writeStream).toBeCalledTimes(0);

        expect(keyboard.keydown.inOpen).toBeFalsy();

        expect(keyboard.keyup.inOpen).toBeFalsy();
    });
});