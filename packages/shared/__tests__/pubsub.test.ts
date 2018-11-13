'use strict';

import PubSub from "../src/PubSub";

describe('shared PubSub', () => {

    it('should create PubSub', () => {
        const ps = new PubSub();

        expect(ps).toBeDefined();
    });

    it('should activate subscription on update', () => {
        const ps = new PubSub();

        const subscription = jest.fn();

        ps.subscribe(subscription);

        ps.update();

        expect(subscription).toHaveBeenCalledTimes(1);
    });

    it('should not activate subscription when unsubscribed', () => {
        const ps = new PubSub();

        const subscription = jest.fn();

        const unsubscribe = ps.subscribe(subscription);

        unsubscribe();

        ps.update();

        expect(subscription).toHaveBeenCalledTimes(0);
    });

    it('should activate multiple subscriptions', () => {
        const ps = new PubSub();

        const subscription = jest.fn();

        ps.subscribe(subscription);

        ps.update();

        expect(subscription).toHaveBeenCalledTimes(1);
    });

    it('should activate only one subscription', () => {
        const ps = new PubSub();

        const subscription = jest.fn();
        const subscription2 = jest.fn();

        const unsubscribe = ps.subscribe(subscription);
        ps.subscribe(subscription2);

        unsubscribe();

        ps.update();

        expect(subscription).toHaveBeenCalledTimes(0);
        expect(subscription2).toHaveBeenCalledTimes(1);
    });

    it('should return `null` when using none function as an subscribe argument', () => {

        const ps = new PubSub();
        const subscription:any = 1;

        const unsubscribe = ps.subscribe(subscription as any);

        expect(unsubscribe).toBeNull();
    });
});
