import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Slider from '../../../react-chayns-slider/component/Slider';
import { hsvToRgbString } from '../../../utils/color';

export default class HueSlider extends PureComponent {
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
        const thumbColor = hsvToRgbString({
            h: color.h,
            s: 1,
            v: 1,
            a: null,
        });
        return (
            <div>
                <Slider
                    innerTrackStyle={{ background: 'transparent' }}
                    /* eslint-disable-next-line max-len */
                    trackStyle={{ background: 'linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)' }}
                    thumbStyle={{ background: thumbColor }}
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

HueSlider.propTypes = {
    onChange: PropTypes.func,
    onChangeEnd: PropTypes.func,
    color: PropTypes.shape({
        h: PropTypes.number.isRequired,
        s: PropTypes.number.isRequired,
        v: PropTypes.number.isRequired,
    }).isRequired,
};

HueSlider.defaultProps = {
    onChange: null,
    onChangeEnd: null,
};

HueSlider.displayName = 'HueSlider';
