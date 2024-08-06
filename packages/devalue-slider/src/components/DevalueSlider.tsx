import React, { useState } from 'react';
import { sleep } from '../utils/common';
import Slider from './Slider';

export type DevalueSliderProps = {
    securityColor?: string;
};

const DevalueSlider: React.FC<DevalueSliderProps> = ({ securityColor = 'red' }) => {
    console.log('render devalue slider');
    const [showSlider, setShowSlider] = useState(true);

    const handleRedeemed = async () => {
        await sleep(5000);
    };

    // if (!showSlider) {
    //     return null;
    // }

    return <Slider onRedeemed={handleRedeemed} securityColor={securityColor} />;
};

export default DevalueSlider;
