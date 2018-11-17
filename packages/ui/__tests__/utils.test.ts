'use strict';

import { multiWordFilter } from "../src/utils";

describe('utils', () => {

    it('should filter multi word', () => {
        const text = "the quick brown fox jumps over the lazy dog typing test";
        const result = multiWordFilter(text, "quick fox lazy");

        expect(result).toBeTruthy();
    });
});
