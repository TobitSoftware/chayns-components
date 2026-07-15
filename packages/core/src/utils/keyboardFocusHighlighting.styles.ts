import { css } from 'styled-components';

/**
 * Shared focus ring for components with keyboard-only highlighting.
 * Apply this only when keyboard highlighting is enabled/active.
 */
export const keyboardFocusHighlightingRingCss = css`
    outline: solid 2px color-mix(in srgb, white 70%, transparent);
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.3);
    border-radius: 3px;
    outline-offset: 1px;
`;

/**
 * Circular focus ring variant for round controls (e.g. RadioButton).
 */
export const keyboardFocusHighlightingCircleRingCss = css`
    outline: solid 2px color-mix(in srgb, white 70%, transparent);
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.3);
    border-radius: 50%;
    outline-offset: 1px;
    color: white;
`;
