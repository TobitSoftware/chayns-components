import { getDevice } from 'chayns-api';
import React, { CSSProperties, forwardRef, ReactNode, useMemo } from 'react';
import { StyledScrollView } from './ScrollView.styles';

export type ScrollViewProps = {
    /**
     * The elements that should be shown inside the scrollview
     */
    children: ReactNode;
    /**
     * The maximum height of the scroll view.
     */
    maxHeight?: CSSProperties['height'];
    /**
     * The height of the scroll view.
     */
    height?: CSSProperties['height'];
    /**
     * The maximum width of the scroll view.
     */
    maxWidth?: CSSProperties['width'];
    /**
     * The width of the scroll view.
     */
    width?: CSSProperties['width'];
    /**
     * The overflow-x style of the scroll view.
     */
    overflowX?: 'scroll' | 'auto';
    /**
     * The overflow-y style of the scroll view.
     */
    overflowY?: 'scroll' | 'auto';
};

const ScrollView = forwardRef<HTMLDivElement, ScrollViewProps>(
    ({ maxHeight = 300, height, maxWidth, width, children, overflowX = 'auto', overflowY = 'auto' }, ref) => {
        const { browser } = getDevice();

        return useMemo(
            () => (
                <StyledScrollView
                    $browser={browser?.name}
                    $maxHeight={maxHeight}
                    $height={height}
                    $maxWidth={maxWidth}
                    $width={width}
                    $overflowX={overflowX}
                    $overflowY={overflowY}
                    ref={ref}
                >
                    {children}
                </StyledScrollView>
            ),
            [browser?.name, children, height, maxHeight, maxWidth, overflowX, overflowY, ref, width],
        );
    },
);

ScrollView.displayName = 'ScrollView';

export default ScrollView;
