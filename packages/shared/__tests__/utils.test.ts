'use strict';

import * as utils from "../src/utils";

describe('shared utils', () => {

    it('should create string guid with length', () => {
        const g = utils.guid();

        expect(g.length).toBe(8);
        expect(utils.guid(10).length).toBe(10);
        expect(typeof g).toBe("string");
    });

    it('should lower case string', () => {
        expect(utils.lc("Hello World")).toBe("hello world");
        expect(utils.lc("")).toBe("");
    });

    it('should return true for array of truthy values', () => {
        const arr = [1, 2, 3, 4];

        expect(utils.every(arr)).toBeTruthy();
    });

    it('should return false for array with falsy values', () => {
        const arr = [1, 2, 3, undefined, 4];

        expect(utils.every(arr)).toBeFalsy();
    });

    it('should return true for array with custom predicate', () => {
        const arr = [2, 4, 5, 3, 5];

        expect(utils.every(arr, (n) => n >= 2)).toBeTruthy();
    });

    it('should return false for array with custom predicate', () => {
        const arr = [2, 4, 5, 3, 5];

        expect(utils.every(arr, (n) => n >= 5)).toBeFalsy();
    });
});
