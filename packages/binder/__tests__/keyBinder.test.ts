'use strict';

import { KeyBinder } from "../src";

let keyBinder: KeyBinder;

const simulateKeyPress = (key: { which: number; key: string; }, eventTarget: EventTarget = document, holdKeyForMs?: number) => {
    eventTarget.dispatchEvent(new KeyboardEvent("keydown", key as any));

    if (holdKeyForMs) {
        setTimeout(() => eventTarget.dispatchEvent(new KeyboardEvent("keyup", key as any)), holdKeyForMs);
    } else {
        eventTarget.dispatchEvent(new KeyboardEvent("keyup", key as any));
    }
};

afterEach(() => {
    keyBinder && keyBinder.destroy();
    keyBinder = null;
});

describe('KeyBinder', () => {

    describe('general', () => {
        it('should create key binder with no options', () => {
            keyBinder = new KeyBinder();

            expect(keyBinder).toBeDefined();
        });

        it('should return disabled state', () => {
            keyBinder = new KeyBinder({ disabled: false });

            expect(keyBinder.disabled).toBe(false);

            keyBinder.disable();

            expect(keyBinder.disabled).toBe(true);
        });
    });

    describe('stream binding', () => {
        it('should activate action when stream binding recorded', async (done) => {

            keyBinder = new KeyBinder();

            keyBinder.delegate = {
                didMatchFound: jest.fn()
            };

            keyBinder.bind({
                keys: "I > D > D > Q > D"
            });

            [{ which: 73, key: "i" }, { which: 68, key: "d" }, { which: 68, key: "d" }, { which: 81, key: "q" }, { which: 68, key: "d" }]
                .forEach((eventParams) => simulateKeyPress(eventParams));

            expect(keyBinder.delegate.didMatchFound).toBeCalledTimes(1);

            done();
        });

        it('should not activate action when key delay is too long', async (done) => {
            keyBinder = new KeyBinder();

            keyBinder.delegate = {
                didMatchFound: jest.fn()
            };

            keyBinder.bind({
                keys: "I > D > D > Q > D",
                strict: false,
                delay: 20
            });

            await Promise.all([{ which: 73, key: "i" }, { which: 68, key: "d" }, { which: 68, key: "d" }, { which: 81, key: "q" }, { which: 68, key: "d" }].map((eventParams, i) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        simulateKeyPress(eventParams);
                        resolve();
                    }, 50 * i);
                });
            }));

            expect(keyBinder.delegate.didMatchFound).toBeCalledTimes(0);

            done();
        });
    });

    describe('connection binding', () => {
        it('should activate action when connection binding recorded', () => {

            keyBinder = new KeyBinder();

            keyBinder.delegate = {
                didMatchFound: jest.fn()
            };

            keyBinder.bind({
                keys: "Ctrl + H"
            });

            [{ which: 17, key: "Control" }, { which: 72, key: "h" }]
                .forEach((eventParams) => simulateKeyPress(eventParams, document, 10));

            expect(keyBinder.delegate.didMatchFound).toBeCalledTimes(1);
        });

        it('should not activate action when connection binding strict mode on', () => {

            keyBinder = new KeyBinder();

            keyBinder.delegate = {
                didMatchFound: jest.fn()
            };

            keyBinder.bind({
                keys: "Ctrl + H",
                strict: true
            });

            [{ which: 17, key: "Control" }, { which: 68, key: "s" }, { which: 72, key: "h" }]
                .forEach((eventParams) => simulateKeyPress(eventParams));

            expect(keyBinder.delegate.didMatchFound).toBeCalledTimes(0);
        });
    });

    describe('single binding', () => {
        it('should activate action when single binding recorded', () => {
            keyBinder = new KeyBinder();

            keyBinder.delegate = {
                didMatchFound: jest.fn()
            };

            keyBinder.bind({
                keys: "H"
            });

            [{ which: 72, key: "h" }]
                .forEach((eventParams) => simulateKeyPress(eventParams));

            expect(keyBinder.delegate.didMatchFound).toBeCalledTimes(1);
        });

        it('should activate action when single binding alias is recorded', () => {
            keyBinder = new KeyBinder();

            keyBinder.delegate = {
                didMatchFound: jest.fn()
            };

            keyBinder.bind({
                keys: "J",
                alias: [{ keys: "H" }]
            });

            [{ which: 72, key: "h" }]
                .forEach((eventParams) => simulateKeyPress(eventParams));

            expect(keyBinder.delegate.didMatchFound).toBeCalledTimes(1);
        });

        it('should activate action when stream binding alias is recorded', () => {
            keyBinder = new KeyBinder();

            keyBinder.delegate = {
                didMatchFound: jest.fn()
            };

            keyBinder.bind({
                keys: "J",
                alias: [{ keys: "I > D > D > Q > D" }]
            });

            [{ which: 73, key: "i" }, { which: 68, key: "d" }, { which: 68, key: "d" }, { which: 81, key: "q" }, { which: 68, key: "d" }]
                .forEach((eventParams) => simulateKeyPress(eventParams));

            expect(keyBinder.delegate.didMatchFound).toBeCalledTimes(1);
        });
    });
});
