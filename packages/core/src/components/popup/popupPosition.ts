import { PopupAlignment } from '../../types/popup';

export const POPUP_HORIZONTAL_PADDING = 23;
const POPUP_ANCHOR_OFFSET = 13;

interface PopupInsetPositionOptions {
    alignment: PopupAlignment;
    anchorX: number;
    boundaryLeft: number;
    boundaryWidth: number;
    width: number;
}

/** Constrain the popup surface while keeping its arrow attached to the trigger. */
export const getPopupInsetPosition = ({
    alignment,
    anchorX,
    boundaryLeft,
    boundaryWidth,
    width,
}: PopupInsetPositionOptions): { x: number; offset: number } => {
    const isLeft = alignment === PopupAlignment.TopLeft || alignment === PopupAlignment.BottomLeft;
    const isCenter =
        alignment === PopupAlignment.TopCenter || alignment === PopupAlignment.BottomCenter;
    let surfaceOffset = -POPUP_ANCHOR_OFFSET;
    if (isLeft) surfaceOffset = POPUP_ANCHOR_OFFSET - width;
    if (isCenter) surfaceOffset = -width / 2;

    const minLeft = boundaryLeft + POPUP_HORIZONTAL_PADDING;
    const maxLeft = Math.max(
        minLeft,
        boundaryLeft + boundaryWidth - POPUP_HORIZONTAL_PADDING - width,
    );
    const surfaceLeft = Math.max(minLeft, Math.min(maxLeft, anchorX + surfaceOffset));
    const x = surfaceLeft - surfaceOffset;

    return { x, offset: isLeft ? x - anchorX : anchorX - x };
};
