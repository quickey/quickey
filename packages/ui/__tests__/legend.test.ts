'use strict';

import { createQuickeyLegend } from "../src";

describe('quickey legend', () => {

    it('should render quickey legend', () => {
        const container = document.createElement("div");
        document.body.appendChild(container);

        createQuickeyLegend({
            ids: [],
            el: container
        });

        expect(container.querySelectorAll(".quickey-legend").length).toBe(1);
        document.body.removeChild(container);
    });

    it('should unmount quickey legend', () => {
        const container = document.createElement("div");
        document.body.appendChild(container);

        const unmount = createQuickeyLegend({
            ids: [],
            el: container
        });

        unmount();

        expect(container.querySelectorAll(".quickey-legend").length).toBe(0);
        document.body.removeChild(container);
    });
});
