/* eslint-disable @typescript-eslint/no-unsafe-call */
import { act, render } from '@testing-library/react';
import { motion } from 'motion/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Theme } from '../../color-scheme-provider/ColorSchemeProvider';
import List from '../List';
import ListItem from './ListItem';

vi.mock('@chayns/textstrings', () => ({
    useTranslation: () => ({
        t: (textString: { fallback?: string } | string) =>
            typeof textString === 'string' ? textString : textString.fallback,
    }),
}));

/**
 * Regression guard for the framer-motion layout-projection thrash.
 *
 * framer-motions layout projection (`layout` / `layout="position"`) is
 * viewport-global: all layout-projection nodes share a single projection tree, so
 * a layout change on *any* node forces a re-measurement of *all* nodes via
 * `getBoundingClientRect`. With many `ListItem`s this scales linearly with N.
 *
 * The tests below render a projection node (`motion.div layout`) *outside* the
 * list and change its layout. They then count how many `getBoundingClientRect`
 * calls hit the rendered `ListItem` elements:
 *  - default (no `shouldAnimateLayout`): the items are not projection nodes, so
 *    the external change does not re-measure them (reads === 0).
 *  - `shouldAnimateLayout`: the items join the shared projection tree, so they are
 *    re-measured by the unrelated external change (reads > 0).
 */

const ITEM_COUNT = 20;

let boundingRectCalls: number;
let originalGetBoundingClientRect: typeof Element.prototype.getBoundingClientRect;

const isInsideList = (element: Element) => Boolean(element.closest('.beta-chayns-list-item'));

beforeEach(() => {
    boundingRectCalls = 0;
    originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

    Element.prototype.getBoundingClientRect = function getBoundingClientRect(
        this: Element,
    ): DOMRect {
        if (isInsideList(this)) {
            boundingRectCalls += 1;
        }

        return originalGetBoundingClientRect.apply(this) as DOMRect;
    };
});

afterEach(() => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
});

const theme = {
    '100-rgb': '255, 255, 255',
    '102-rgb': '255, 255, 255',
    'headline-rgb': '0, 0, 0',
    cardBackgroundOpacity: 1,
    accordionLines: true,
    accordionIcon: 'fa-chevron-right',
    iconStyle: 'fa-regular',
} as unknown as Theme;

type HarnessProps = {
    shouldAnimateLayout: boolean;
    isExternalExpanded: boolean;
};

const Harness = ({ shouldAnimateLayout, isExternalExpanded }: HarnessProps) => (
    <ThemeProvider theme={theme}>
        {/* A layout-projection node completely outside of the list. */}
        <motion.div
            layout
            data-testid="outside"
            style={{ height: isExternalExpanded ? 500 : 100 }}
        />
        <List>
            {Array.from({ length: ITEM_COUNT }, (_, index) => (
                <ListItem
                    key={index}
                    title={`Item ${index}`}
                    shouldAnimateLayout={shouldAnimateLayout}
                />
            ))}
        </List>
    </ThemeProvider>
);

const flushFrames = async () => {
    await act(async () => {
        await new Promise((resolve) => {
            requestAnimationFrame(() => requestAnimationFrame(() => resolve(undefined)));
        });
    });
};

/**
 * Render the list, then trigger a layout change on the external projection node
 * and return the number of `getBoundingClientRect` calls that hit the list items.
 */
const measureExternalLayoutChange = async (shouldAnimateLayout: boolean) => {
    const { rerender } = render(
        <Harness shouldAnimateLayout={shouldAnimateLayout} isExternalExpanded={false} />,
    );

    await flushFrames();

    boundingRectCalls = 0;

    rerender(<Harness shouldAnimateLayout={shouldAnimateLayout} isExternalExpanded />);

    await flushFrames();

    return boundingRectCalls;
};

describe('ListItem layout projection', () => {
    it('does not re-measure items on external layout changes by default', async () => {
        const reads = await measureExternalLayoutChange(false);

        expect(reads).toBe(0);
    });

    it('re-measures items on external layout changes when shouldAnimateLayout is set', async () => {
        const reads = await measureExternalLayoutChange(true);

        expect(reads).toBeGreaterThan(0);
    });

    it('keeps the enter/exit animation for added/removed items without layout projection', async () => {
        const renderItems = (titles: string[]) => (
            <ThemeProvider theme={theme}>
                <List>
                    {titles.map((title) => (
                        <ListItem key={title} title={title} />
                    ))}
                </List>
            </ThemeProvider>
        );

        const { rerender, queryByText } = render(renderItems(['A', 'B', 'C']));

        await flushFrames();

        // Remove the first item. AnimatePresence must keep it mounted while its
        // exit (height/opacity) animation runs -- this is independent of the
        // (disabled) layout projection.
        rerender(renderItems(['B', 'C']));

        expect(queryByText('A')).not.toBeNull();
    });
});
