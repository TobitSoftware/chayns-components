import React, { Component } from 'react';
import Slider from '../../src/react-chayns-slider/component/Slider';

export default class SliderExample extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 150, startValue: 40, endValue: 80 };
    }


    render() {
        const { value, startValue, endValue } = this.state;
        console.log(value, startValue, endValue);
        return (
            <div>
                <Slider interval/>
                <Slider/>
                <Slider
                    showLabel
                    interval
                    minInterval={10}
                    maxInterval={60}
                    onChange={(start, end) => {
                        this.setState({ startValue: start, endValue: end });
                    }}
                />
                <Slider
                    showLabel
                    min={50}
                    max={150}
                    onChange={(newValue) => {
                        this.setState({ value: newValue });
                    }}
                    step={10}
                />
                <Slider showLabel disabled interval startValue={startValue} endValue={endValue}/>
                <Slider showLabel disabled value={value} min={50} max={150}/>
            </div>
        );
    }
}
