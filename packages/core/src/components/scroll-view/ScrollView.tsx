import React, { CSSProperties, FC, ReactNode, useMemo } from 'react';
import { StyledScrollView } from './ScrollView.styles';
import { getDevice } from 'chayns-api';

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

const ScrollView: FC<ScrollViewProps> = ({ maxHeight = '300px', children }) => {
    const { browser } = getDevice();

    return useMemo(
        () => (
            <StyledScrollView browser={browser?.name} maxHeight={maxHeight}>
                {children}
            </StyledScrollView>
        ),
        [browser?.name, children, maxHeight],
    );
};

ScrollView.displayName = 'ScrollView';

export default ScrollView;
