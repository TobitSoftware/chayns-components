import React, { FC, useState } from 'react';
import { HighlightSlider } from '@chayns-components/core';

const Component: FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <HighlightSlider
            count={13}
            currentIndex={currentIndex}
            onIndexChange={(index) => setCurrentIndex(index)}
        />
    );
};

Component.displayName = 'Component';

export default Component;
