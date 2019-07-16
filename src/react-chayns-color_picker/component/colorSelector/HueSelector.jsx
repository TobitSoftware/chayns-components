import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from '../../../react-chayns-slider/component/Slider';
import './HueSelector.scss';
import { toHex } from '../../utils/colorHelper';

export default class HueSelector extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        hue: PropTypes.shape({
            r: PropTypes.number.isRequired,
            g: PropTypes.number.isRequired,
            b: PropTypes.number.isRequired,
        }).isRequired,
    };

    getHue = (value) => {
        this.lastValue = value;
        const { onChange } = this.props;
        if (value < 17) {
            onChange({
                r: 255,
                g: Math.round(255 * value / 17),
                b: 0,
            });
        } else if (value < 33) {
            onChange({
                r: Math.round(255 - (255 * (value - 17) / 17)),
                g: 255,
                b: 0,
            });
        } else if (value < 50) {
            onChange({
                r: 0,
                g: 255,
                b: Math.round(255 * (value - 33) / 17),
            });
        } else if (value < 67) {
            onChange({
                r: 0,
                g: Math.round(255 - (255 * (value - 50) / 17)),
                b: 255,
            });
        } else if (value < 83) {
            onChange({
                r: Math.round(255 * (value - 67) / 17),
                g: 0,
                b: 255,
            });
        } else {
            onChange({
                r: 255,
                g: 0,
                b: Math.round(255 - (255 * (value - 83) / 17)),
            });
        }
    };

    getValue = () => {
        const { hue } = this.props;
        if (!this.lastValue) {
            return 0;
        }
        if (!hue.b) {
            if (hue.r > hue.g) {
                return ((hue.g / 255) * 17);// red-yellow / 0% - 17%
            }
            return 33 - ((hue.r / 255) * 17);// yellow-green / 17% - 33%
        }
        if (!hue.r) {
            if (hue.g > hue.b) {
                return 33 + (hue.b / 255) * 17; // green - lightblue / 33% - 50%
            }
            return 67 - (hue.g / 255) * 17; // lightblue - blue / 50% - 67%
        }
        if (!hue.g) {
            if (hue.r < hue.b) {
                return 67 + (hue.r / 255) * 17; // blue - pink / 67% - 83%
            }
            return 100 - ((hue.b / 255) * 17); // pink - red / 83% - 100%
        }
        return 0;
    };

    render() {
        const { hue } = this.props;
        return (
            <div>
                <Slider
                    innerTrackStyle={{ background: 'transparent' }}
                    trackStyle={{ background: 'linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)' }}
                    thumbStyle={{ background: toHex(hue) }}
                    onChange={this.getHue}
                    min={0}
                    max={100}
                    value={this.getValue()}
                />
            </div>
        );
    }
}
