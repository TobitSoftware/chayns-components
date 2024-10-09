import { getDevice } from 'chayns-api';
import React, { CSSProperties, FC, ReactNode, useMemo } from 'react';
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
};

const ScrollView: FC<ScrollViewProps> = ({ maxHeight, height, maxWidth, width, children }) => {
    const { browser } = getDevice();

    return useMemo(
        () => (
            <StyledScrollView
                $browser={browser?.name}
                $maxHeight={maxHeight}
                $height={height}
                $maxWidth={maxWidth}
                $width={width}
            >
                {children}
            </StyledScrollView>
        ),
        [browser?.name, children, height, maxHeight, maxWidth, width],
    );
};

ScrollView.displayName = 'ScrollView';

export default ScrollView;
