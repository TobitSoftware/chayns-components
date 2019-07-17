import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ColorPicker.scss';
import ColorSelector from './colorSelector/ColorSelector';
import { hexToRgb255, rgb1ToHsv, rgb255ToRgb1 } from '../utils/colorHelper';

export default class ColorPicker extends Component {
    static propTypes = {
        color: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.shape({
                r: PropTypes.number.isRequired,
                g: PropTypes.number.isRequired,
                b: PropTypes.number.isRequired,
                a: PropTypes.number,
            }).isRequired,
            PropTypes.shape({
                h: PropTypes.number.isRequired,
                s: PropTypes.number.isRequired,
                v: PropTypes.number.isRequired,
                a: PropTypes.number,
            }).isRequired,
        ]).isRequired,
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        let color;
        if (typeof props.color === 'string') { // HEX(A)
            color = rgb1ToHsv(rgb255ToRgb1(hexToRgb255(props.color)));
        } else if (props.color.r) { // RGB(A) (0-255)
            color = rgb1ToHsv(rgb255ToRgb1(props.color));
        } else if (props.color.h) { // HSV(A)
            // eslint-disable-next-line prefer-destructuring
            color = props.color;
        }
        this.state = { color };
    }

    componentDidUpdate(prevProps, prevState) {
        // TODO Update color in state
    }

    render() {
        const { color } = this.state;

        return (
            <div>
                <ColorSelector color={color} />
            </div>
        );
    }
}
