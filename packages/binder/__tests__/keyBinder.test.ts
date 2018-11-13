'use strict';

import { KeyBinder } from "../src";

let keyBinder: KeyBinder;

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
        it('should activate action when stream binding recorded', () => {

            keyBinder = new KeyBinder();

            keyBinder.delegate = {
                didMatchFound: jest.fn()
            };

            keyBinder.bind({
                keys: "I > D > D > Q > D"
            });

            [{ which: 73, key: "i" }, { which: 68, key: "d" }, { which: 68, key: "d" }, { which: 81, key: "q" }, { which: 68, key: "d" }].forEach((eventParams) => {
                document.dispatchEvent(new KeyboardEvent("keydown", eventParams as any));
                document.dispatchEvent(new KeyboardEvent("keyup", eventParams as any));
            });

            expect(keyBinder.delegate.didMatchFound).toBeCalledTimes(1);
        });

        it('should not activate action when key delay is too long', async (done) => {
            keyBinder = new KeyBinder();

            keyBinder.delegate = {
                didMatchFound: jest.fn()
            };

            keyBinder.bind({
                keys: "I > D > D > Q > D",
                delay: 10
            });

            await Promise.all([{ which: 73, key: "i" }, { which: 68, key: "d" }, { which: 68, key: "d" }, { which: 81, key: "q" }, { which: 68, key: "d" }].map((eventParams, i) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        document.dispatchEvent(new KeyboardEvent("keydown", eventParams as any));
                        document.dispatchEvent(new KeyboardEvent("keyup", eventParams as any));
                        resolve();
                    }, 20 * i);
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

            [{ which: 17, key: "Control" }, { which: 72, key: "h" }].forEach((eventParams) => {
                document.dispatchEvent(new KeyboardEvent("keydown", eventParams as any));
            });

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

            [{ which: 17, key: "Control" }, { which: 68, key: "s" }, { which: 72, key: "h" }].forEach((eventParams) => {
                document.dispatchEvent(new KeyboardEvent("keydown", eventParams as any));
            });

            expect(keyBinder.delegate.didMatchFound).toBeCalledTimes(0);
        });
    });
});
