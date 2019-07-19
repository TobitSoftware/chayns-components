import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Slider from '../../../react-chayns-slider/component/Slider';
import {
    hsvToRgb1, rgb1ToRgb255, rgb255ToHex,
} from '../../utils/colorHelper';

export default class HueSlider extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        onChangeEnd: PropTypes.func,
        color: PropTypes.shape({
            h: PropTypes.number.isRequired,
            s: PropTypes.number.isRequired,
            v: PropTypes.number.isRequired,
        }).isRequired,
    };

    static defaultProps = {
        onChange: null,
        onChangeEnd: null,
    };

    onChange = (value) => {
        const { onChange, color } = this.props;
        if (onChange) {
            onChange({
                ...color,
                h: value,
            });
        }
    };

    onChangeEnd = (value) => {
        const { onChangeEnd, color } = this.props;
        if (onChangeEnd) {
            onChangeEnd({
                ...color,
                h: value,
            });
        }
    };

    render() {
        const { color } = this.props;
        const hex = rgb255ToHex(rgb1ToRgb255(hsvToRgb1({
            h: color.h, s: 1, v: 1, a: null,
        })));
        return (
            <div>
                <Slider
                    innerTrackStyle={{ background: 'transparent' }}
                    trackStyle={{ background: 'linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)' }}
                    thumbStyle={{ background: hex }}
                    onChange={this.onChange}
                    onChangeEnd={this.onChangeEnd}
                    min={0}
                    max={360}
                    value={color.h}
                />
            </div>
        );
    }
}
