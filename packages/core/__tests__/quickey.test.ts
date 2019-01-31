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

    it('should get title', () => {
        const title = "DOOM Cheats";

        quickey = new Quickey({
            title
        });

        expect(quickey).toBeDefined();
        expect<string>(quickey.title).toBe(title);
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

    it('should trigger action callback when binding fulfilled', () => {
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

    it('should addAction by single action', () => {
        quickey = new Quickey();

        const id = "action1";

        quickey
            .addAction({
                id,
                keys: "Ctrl + 1",
                callback: () => { }
            });

        expect(quickey.getAction(id)).toBeDefined();
    });

    it('should addAction by array of actions', () => {
        quickey = new Quickey();

        const id1 = "action1";
        const id2 = "action2";

        quickey
            .addAction([{
                id: id1,
                keys: "Ctrl + 1",
                callback: () => { }
            }, {
                id: id2,
                keys: "Ctrl + 2",
                callback: () => { }
            }]);

        expect(quickey.getAction(id1)).toBeDefined();
        expect(quickey.getAction(id2)).toBeDefined();
    });

    it('should addAction by keys and callback', () => {
        quickey = new Quickey();

        const callback = jest.fn();

        quickey.addAction("Ctrl + 1", callback);

        expect(quickey.actions.length).toBe(1);
        expect(quickey.actions[0].callback).toBe(callback);
    });

    it('should call subscription when action added', () => {
        const updateSubscription = jest.fn();

        quickey = new Quickey();

        quickey.subscribe(updateSubscription);

        quickey
            .addAction({
                keys: "Ctrl + Alt + Delete",
                callback: () => { }
            });

        expect(updateSubscription).toBeCalledTimes(1);
    });

    it('should call subscription when action removed', () => {
        const updateSubscription = jest.fn();

        quickey = new Quickey();

        quickey
            .addAction({
                id: "action_1",
                keys: "Ctrl + Alt + Delete",
                callback: () => { }
            });

        quickey.subscribe(updateSubscription);

        quickey.removeAction("action_1");

        expect(updateSubscription).toBeCalledTimes(1);
    });
});