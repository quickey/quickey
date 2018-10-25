import Quickey from "../src/Quickey";

let quickey: Quickey;

afterEach(() => {
    quickey && quickey.destroy();
    quickey = null;
});

describe('Quickey', () => {

    it('should create Quickey with no options', () => {
        quickey = new Quickey();
        expect(quickey).toBeDefined();
    });

    it('should get title and description', () => {
        const title = "DOOM Cheats";
        const description = "This is the DOOM game cheats activator";

        quickey = new Quickey({
            title,
            description
        });

        expect(quickey).toBeDefined();
        expect<string>(quickey.title).toBe(title);
        expect<string>(quickey.description).toBe(description);
    });

    it('should return instance after adding or removing action', () => {
        quickey = new Quickey();

        quickey
            .addAction({
                id: "action_1",
                keys: "Ctrl + Alt + Delete",
                callback: () => { }
            })
            .removeAction("action_1")
    });

    it('should call `onDestroy` callback', () => {
        const onDestroy = jest.fn();

        quickey = new Quickey({
            onDestroy
        });

        quickey.destroy();

        expect(onDestroy).toHaveBeenCalledTimes(1);
    });

    it('should trigger action callback when combination fulfilled', () => {
        const actionCallback = jest.fn();

        quickey = new Quickey({
            actions: [{
                keys: "Ctrl + Alt + Delete",
                callback: actionCallback
            }]
        });

        [{ which: 17, key: "Control" }, { which: 18, key: "Alt" }, { which: 46, key: "Delete" }]
            .map((eventParams) => document.dispatchEvent(new KeyboardEvent("keydown", eventParams as any)));

        expect(actionCallback).toHaveBeenCalledTimes(1);
    });

    it('should remove action', () => {
        const actionCallback = jest.fn();

        quickey = new Quickey({
            actions: [{
                id: "action_1",
                keys: "Ctrl + Alt + Delete",
                callback: actionCallback
            }]
        });

        quickey.removeAction("action_1");

        [{ which: 17, key: "Control" }, { which: 18, key: "Alt" }, { which: 46, key: "Delete" }]
            .map((eventParams) => document.dispatchEvent(new KeyboardEvent("keydown", eventParams as any)) && eventParams)
            .map((eventParams) => document.dispatchEvent(new KeyboardEvent("keyup", eventParams as any)));

        expect(actionCallback).toHaveBeenCalledTimes(0);
    });
});