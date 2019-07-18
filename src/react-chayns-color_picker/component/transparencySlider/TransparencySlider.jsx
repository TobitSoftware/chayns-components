import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Slider from '../../../react-chayns-slider/component/Slider';
import {
    hsvToRgb1, rgb1ToRgb255, rgb255ToHex,
} from '../../utils/colorHelper';
import './TransparencySlider.scss';

export default class TransparencySlider extends PureComponent {
    static propTypes = {
        onChange: PropTypes.func,
        onChangeEnd: PropTypes.func,
        color: PropTypes.shape({
            h: PropTypes.number.isRequired,
            s: PropTypes.number.isRequired,
            v: PropTypes.number.isRequired,
            a: PropTypes.number.isRequired,
        }).isRequired,
    };

    static defaultProps = {
        onChange: null,
        onChangeEnd: null,
    };

    onChange = (value) => {
        const { color, onChange } = this.props;
        if (onChange) {
            onChange({
                ...color,
                a: 1 - value,
            });
        }
    };

    onChangeEnd = (value) => {
        const { color, onChangeEnd } = this.props;
        if (onChangeEnd) {
            onChangeEnd({
                ...color,
                a: 1 - value,
            });
        }
    };

    render() {
        const { color } = this.props;
        return (
            <div>
                <Slider
                    className="cc__transparencySlider"
                    innerTrackStyle={{ backgroundColor: 'transparent' }}
                    trackStyle={{
                        background: `linear-gradient(90deg, ${rgb255ToHex(rgb1ToRgb255(hsvToRgb1({ ...color, a: null })))}, transparent)`,
                    }}
                    thumbStyle={{ backgroundColor: rgb255ToHex(rgb1ToRgb255(hsvToRgb1(color))) }}
                    onChange={this.onChange}
                    onChangeEnd={this.onChangeEnd}
                    min={0}
                    max={1}
                    value={1 - color.a}
                />
            </div>
        );
    }
}
