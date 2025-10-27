import React, { FC } from 'react';
import { ColorPickerPopup } from '@chayns-components/color-picker';

const Component: FC = () => {
    return (
        <ColorPickerPopup
            shouldShowPresetColors
            shouldShowTransparencySlider
            shouldShowMoreOptions
            shouldUseSiteColors
        />
    );
};

Component.displayName = 'Component';

export default Component;
