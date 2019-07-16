import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from '../../../react-chayns-slider/component/Slider';
import { toHex } from '../../utils/colorHelper';
import './TransparencySlider.scss';

export default class TransparencySlider extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        color: PropTypes.shape({
            r: PropTypes.number.isRequired,
            g: PropTypes.number.isRequired,
            b: PropTypes.number.isRequired,
            a: PropTypes.number.isRequired,
        }).isRequired,
    };

    onChange = (value) => {
        const { color, onChange } = this.props;
        onChange({
            ...color,
            a: 255 - Math.round(value),
        });
    };

    render() {
        const { color } = this.props;
        return (
            <div>
                <Slider
                    className="cc__transparencySlider"
                    innerTrackStyle={{ backgroundColor: 'transparent' }}
                    trackStyle={{
                        background: `linear-gradient(90deg, ${toHex(color)}, transparent)`,
                    }}
                    thumbStyle={{ backgroundColor: toHex(color, true) }}
                    onChange={this.onChange}
                    min={0}
                    max={255}
                    value={255 - color.a}
                />
            </div>
        );
    }
}
