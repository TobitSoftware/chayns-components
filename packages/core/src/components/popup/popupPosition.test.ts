import { describe, expect, it } from 'vitest';
import { PopupAlignment } from '../../types/popup';
import { getPopupInsetPosition } from './popupPosition';

const alignments = Object.values(PopupAlignment).filter(
    (value): value is PopupAlignment => typeof value === 'number',
);

describe('popup inset positioning', () => {
    it.each(alignments)(
        'keeps the surface and arrow aligned within asymmetric bounds for alignment %s',
        (alignment) => {
            const isLeft =
                alignment === PopupAlignment.TopLeft || alignment === PopupAlignment.BottomLeft;
            const isCenter =
                alignment === PopupAlignment.TopCenter || alignment === PopupAlignment.BottomCenter;
            [30, 100, 250, 350].forEach((anchorX) => {
                const width = 240;
                const position = getPopupInsetPosition({
                    alignment,
                    anchorX,
                    width,
                    boundaryLeft: 17,
                    boundaryWidth: 330,
                });
                let surfaceLeft = position.x - 13;
                if (isLeft) surfaceLeft = position.x - width + 13;
                if (isCenter) surfaceLeft = position.x - width / 2;
                expect(surfaceLeft).toBeGreaterThanOrEqual(40);
                expect(surfaceLeft + width).toBeLessThanOrEqual(324);
                const arrowAnchor = isLeft
                    ? position.x - position.offset
                    : position.x + position.offset;
                expect(arrowAnchor).toBe(anchorX);
            });
        },
    );

    it('keeps scroll offsets in the same coordinate space', () => {
        const options = {
            alignment: PopupAlignment.BottomRight,
            anchorX: 350,
            width: 240,
            boundaryLeft: 17,
            boundaryWidth: 330,
        };
        const position = getPopupInsetPosition(options);
        const scrolled = getPopupInsetPosition({
            ...options,
            anchorX: options.anchorX + 120,
            boundaryLeft: options.boundaryLeft + 120,
        });
        expect(scrolled.x).toBe(position.x + 120);
        expect(scrolled.offset).toBe(position.offset);
    });
});
