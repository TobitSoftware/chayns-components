import { describe, expect, it } from 'vitest';
import { distributeSizes } from './SplitLayout.utils';

const views = {
    chat: { component: null, minSize: 320, maxSize: 600 },
    editor: { component: null, minSize: 300 },
};

describe('distributeSizes', () => {
    it('gives preserved views the remaining space when the flexible view is at its maximum', () => {
        const sizes = distributeSizes({
            views,
            viewIds: ['chat', 'editor'],
            containerSize: 1718,
            handleSize: 2,
            previousSizes: { chat: 600, editor: 300 },
            preserveViewIds: ['editor'],
        });

        expect(sizes).toEqual({ chat: 600, editor: 1116 });
    });

    it('keeps the total pane size equal to the available size', () => {
        const sizes = distributeSizes({
            views,
            viewIds: ['chat', 'editor'],
            containerSize: 1000,
            handleSize: 2,
            previousSizes: { chat: 400, editor: 300 },
            preserveViewIds: ['editor'],
        });

        expect(Object.values(sizes).reduce((sum, size) => sum + size, 0)).toBe(998);
    });
});
