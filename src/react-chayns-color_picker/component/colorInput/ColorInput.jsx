import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ColorInput.scss';
import Input from '../../../react-chayns-input/component/Input';
import Icon from '../../../react-chayns-icon/component/Icon';
import { HEX_REGEX, RGB_REGEX } from '../../utils/constants';
import {
    getHexString,
    getRgb255String,
    hexToRgb255,
    hsvToRgb1,
    rgb1ToHsv,
    rgb1ToRgb255,
    rgb255ToHex,
    rgb255ToRgb1,
} from '../../utils/colorHelper';

export default class ColorInput extends Component {
    static propTypes = {
        color: PropTypes.shape({
            h: PropTypes.number.isRequired,
            s: PropTypes.number.isRequired,
            v: PropTypes.number.isRequired,
        }).isRequired,
        onChange: PropTypes.func.isRequired,
        colorModel: PropTypes.number.isRequired,
        onModelToggle: PropTypes.func.isRequired,
        transparency: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            inputValue: this.getInputValue(),
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setColor();
        }
    }

    onChange = (value) => {
        this.setState({ inputValue: value });
    };

    getInputValue = () => {
        const { color, transparency, colorModel } = this.props;

        if (colorModel) { // rgb(a)
            return getRgb255String(rgb1ToRgb255(hsvToRgb1(color)), transparency);
        }

        // hex(a)
        return getHexString(rgb255ToHex(rgb1ToRgb255(hsvToRgb1(color))), transparency);
    };

    setColor=() => {
        this.setState({
            inputValue: this.getInputValue(),
        });
    };

    onBlur = (value) => {
        const {
            colorModel, onChange,
        } = this.props;
        if (colorModel) { // rgb(a)
            const matches = value.match(RGB_REGEX);
            if (matches) {
                const rgb = {
                    r: matches[1],
                    g: matches[2],
                    b: matches[3],
                    a: matches[4] !== undefined ? matches[4] : 255,
                };
                const hsv = rgb1ToHsv(rgb255ToRgb1(rgb));
                if (onChange) {
                    onChange(hsv);
                }
            }
        } else { // hex(a)
            const matches = value.match(HEX_REGEX);
            if (matches) {
                const hsv = rgb1ToHsv(rgb255ToRgb1(hexToRgb255(matches[1])));
                if (onChange) {
                    onChange(hsv);
                }
            }
        }
    };

    render() {
        const { onModelToggle, colorModel, transparency } = this.props;
        const { inputValue } = this.state;
        let placeholder;
        let regex;
        if (colorModel) { // rgb(a)
            if (transparency) {
                placeholder = 'rgba(255,255,255,0.5)';
            } else {
                placeholder = 'rgb(255,255,255)';
            }
            regex = RGB_REGEX;
        } else { // hex(a)
            if (transparency) {
                placeholder = '#HEXa';
            } else {
                placeholder = '#HEX';
            }
            regex = HEX_REGEX;
        }

        return (
            <div className="cc__color-input">
                <Input
                    regExp={regex}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onEnter={this.onBlur}
                    customProps={{ spellCheck: 'false' }}
                />
                <Icon
                    className="chayns__color--headline cc__color-input__exchange-icon"
                    icon="fas fa-exchange"
                    onClick={onModelToggle}
                />
            </div>
        );
    }
}
