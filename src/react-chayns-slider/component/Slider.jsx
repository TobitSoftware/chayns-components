/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import noUiSlider from 'nouislider';

export default class Slider extends React.Component {
    static propTypes = {
        onSlide: PropTypes.func,
        minValue: PropTypes.number,
        maxValue: PropTypes.number,
        step: PropTypes.number,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        id: PropTypes.number,
        // eslint-disable-next-line react/no-unused-prop-types
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        disabled: PropTypes.bool,
        backgroundColor: PropTypes.string,
        colorPicker: PropTypes.bool,
    };

    static defaultProps = {
        onSlide: () => {
        },
        minValue: 0,
        maxValue: 5,
        step: 1,
        value: 1,
        id: null,
        label: '',
        disabled: false,
        backgroundColor: null,
        colorPicker: false,
    };

    componentDidMount() {
        const { id } = this.props;
        const rangeConfig = {
            minValue: this.props.minValue,
            maxValue: this.props.maxValue,
            step: this.props.step,
        } || {};
        const {
            value, minValue, maxValue, step,
        } = this.calculateValues(this.props.value, rangeConfig.minValue, rangeConfig.maxValue, rangeConfig.step, id);
        noUiSlider.create(this.slider, {
            start: value,
            step,
            connect: [true, false],
            range: {
                min: minValue,
                max: maxValue,
            },
        });
        if (this.props.disabled) {
            this.slider.setAttribute('disabled', true);
        }
        this.slider.childNodes[0].childNodes[0].childNodes[0].style.backgroundColor = !this.props.colorPicker && (this.props.backgroundColor || chayns.env.site.color);
        this.slider.noUiSlider.on('update', (values) => {
            this.props.onSlide(this.props.colorPicker ? this.getHexValue(values) : values);
        });
    }

    getHexValue(val) {
        const hsl = require('hsl-to-hex');
        const hex = hsl(val, 100, 50);
        return hex;
    }

    // eslint-disable-next-line class-methods-use-this
    calculateValues(value, minValue, maxValue, step) {
        if (!chayns.utils.isNumber(minValue)) {
            minValue = 0;
        }

        if (!chayns.utils.isNumber(maxValue)) {
            maxValue = minValue + 1;
        }
        if (!chayns.utils.isNumber(step)) {
            step = (maxValue - minValue) / ((this.props.maxValue - this.props.minValue) / this.props.step);
        }
        if (maxValue - minValue < step) {
            step = maxValue - minValue;
        }
        if (this.props.colorPicker) {
            minValue = 0;
            maxValue = 360;
            step = 1;
        }
        if (this.props.colorPicker && (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value))) {
            const hexToHsl = require('hex-to-hsl');
            [value] = hexToHsl(value);
        } else {
            if (!chayns.utils.isNumber(value)) {
                value = minValue + step;
            }
            if (this.props.colorPicker && !(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value))) {
                value = minValue + step;
            }
        }
        if (value < minValue) {
            value = minValue;
        }
        if (value > maxValue) {
            value = maxValue;
        }

        return {
            value,
            minValue,
            maxValue,
            step,
        };
    }

    render() {
        return (
            <div className={`slider_wrapper${this.props.disabled ? ' disabled' : ''} `}>
                <span className="slider__label"> {this.props.label} </span>
                <div className="sliderContainer">
                    <div
                        className={`slider ${this.props.colorPicker && 'colorPicker'}`}
                        ref={(slider) => {
                            this.slider = slider;
                        }}
                    />
                </div>
            </div>
        );
    }
}
