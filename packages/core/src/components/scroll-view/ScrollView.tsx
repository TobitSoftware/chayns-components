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
    maxHeight: CSSProperties['height'];
};

const ScrollView: FC<ScrollViewProps> = ({ maxHeight = '300px', children }) =>
    useMemo(
        () => <StyledScrollView maxHeight={maxHeight}>{children}</StyledScrollView>,
        [children, maxHeight],
    );

ScrollView.displayName = 'ScrollView';

export default ScrollView;
