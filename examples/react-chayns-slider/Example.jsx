import React, { Component } from 'react';
import Slider from '../../src/react-chayns-slider/component/Slider';
import { Tooltip } from '../../src';

export default class SliderExample extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 100, startValue: 30, endValue: 70 };
    }


    render() {
        const { value, startValue, endValue } = this.state;
        console.log(value, startValue, endValue);
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
                        this.setState({ startValue: start, endValue: end });
                    }}
                />
                <Slider
                    showLabel
                    min={50}
                    max={150}
                    defaultValue={100}
                    onChange={(newValue) => {
                        this.setState({ value: newValue });
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
                        this.setState({ startValue: start, endValue: end });
                    }}
                />
                <Slider
                    showValueInThumb
                    showLabel
                    min={50}
                    max={150}
                    defaultValue={100}
                    onChange={(newValue) => {
                        this.setState({ value: newValue });
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
                        this.setState({ startValue: start, endValue: end });
                    }}
                />
                <Slider
                    vertical
                    showLabel
                    min={50}
                    max={150}
                    defaultValue={100}
                    onChange={(newValue) => {
                        this.setState({ value: newValue });
                    }}
                    step={10}
                />
                <Slider vertical showLabel disabled interval startValue={startValue} endValue={endValue}/>
                <Slider vertical showLabel disabled value={value} min={50} max={150}/>
            </div>
        );
    }
}
