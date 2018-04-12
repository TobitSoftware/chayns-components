import React from 'react';
import { showOverlay, hideOverlay } from '../utils/OverlayHelper';

const connectToOverlay = () => (BaseComponent) => {
    return props => (
        <BaseComponent
            showOverlay={showOverlay}
            hideOverlay={hideOverlay}
            {...props}
        />
    );
};

export default connectToOverlay;
