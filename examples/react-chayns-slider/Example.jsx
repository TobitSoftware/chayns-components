import React, { useState } from 'react';
import Slider from '../../src/react-chayns-slider/component/Slider';
import { Tooltip } from '../../src';

const SliderExample = () => {
    const [value, setValue] = useState(100);
    const [startValue, setStartValue] = useState(30);
    const [endValue, setEndValue] = useState(70);

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <Tooltip
                    position={Tooltip.position.BOTTOM_CENTER}
                    minWidth={150}
                    content={{
                        html: <Slider/>,
                    }}
                    bindListeners
                >
                    <p>Tooltip with Slider</p>
                </Tooltip>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Tooltip
                    position={Tooltip.position.BOTTOM_CENTER}
                    content={{
                        html: <Slider vertical style={{ maxHeight: '100px', marginBottom: '20px' }}/>,
                    }}
                    minWidth="auto"
                    bindListeners
                >
                    <p>Tooltip with Slider (vertical)</p>
                </Tooltip>
            </div>
            <Slider interval/>
            <Slider/>
            <Slider
                showLabel
                interval
                minInterval={10}
                maxInterval={60}
                defaultStartValue={30}
                defaultEndValue={70}
                onChange={(start, end) => {
                    setStartValue(start);
                    setEndValue(end);
                }}
            />
            <Slider
                showLabel
                min={50}
                max={150}
                defaultValue={100}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                step={10}
            />
            <Slider
                showValueInThumb
                showLabel
                interval
                minInterval={10}
                maxInterval={60}
                defaultStartValue={30}
                defaultEndValue={70}
                onChange={(start, end) => {
                    setStartValue(start);
                    setEndValue(end);
                }}
            />
            <Slider
                showValueInThumb
                showLabel
                min={50}
                max={150}
                defaultValue={100}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                step={10}
            />
            <Slider showLabel disabled interval startValue={startValue} endValue={endValue}/>
            <Slider showLabel disabled value={value} min={50} max={150}/>
            <Slider vertical interval/>
            <Slider vertical/>
            <Slider
                vertical
                showLabel
                interval
                minInterval={10}
                maxInterval={60}
                defaultStartValue={30}
                defaultEndValue={70}
                onChange={(start, end) => {
                    setStartValue(start);
                    setEndValue(end);
                }}
            />
            <Slider
                vertical
                showLabel
                min={50}
                max={150}
                defaultValue={100}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                step={10}
            />
            <Slider vertical showLabel disabled interval startValue={startValue} endValue={endValue}/>
            <Slider vertical showLabel disabled value={value} min={50} max={150}/>
        </div>
    );
};

export default SliderExample;
