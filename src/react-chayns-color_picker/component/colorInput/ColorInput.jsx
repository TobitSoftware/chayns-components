import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ColorInput.scss';
import {
    getRgb255String,
    rgb1ToRgb255,
    hsvToRgb1,
    rgb1ToHsv,
    rgb255ToRgb1,
    hexToRgb255,
    rgb255ToHex,
} from '@chayns/colors';
import Input from '../../../react-chayns-input/component/Input';
import Icon from '../../../react-chayns-icon/component/Icon';
import { HEX_REGEX, RGB_REGEX } from '../../../utils/color/constants';
import { isNumber } from '../../../utils/is';
import { Accordion } from '../../../index';

class ColorInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: this.getInputValue(),
        };

        this.latestPropColor = this.getInputValue();
        this.isTyping = false;
    }

    componentDidUpdate(prevProps) {
        const { color, colorModel, transparency } = this.props;
        this.latestPropColor = prevProps.color;
        if (
            (prevProps.color !== color && !this.isTyping) ||
            prevProps.colorModel !== colorModel ||
            prevProps.transparency !== transparency
        ) {
            this.setColor();
            this.isTyping = false;
        }
    }

    onChange = (value) => {
        this.isTyping = true;
        const { onChange } = this.props;
        this.setState({ inputValue: value });
        const hsv = this.valueToHsv(value);
        if (onChange && hsv) {
            onChange(hsv);
        }
    };

    getInputValue = () => {
        const { color, transparency, colorModel } = this.props;
        const colorcopy = { h: color.h, s: color.s, v: color.v };
        if (transparency) {
            colorcopy.a = isNumber(color.a) ? color.a : 1;
        }
        if (colorModel) {
            // rgb(a)
            return getRgb255String(rgb1ToRgb255(hsvToRgb1(colorcopy)));
        }
        // hex(a)
        return rgb255ToHex(rgb1ToRgb255(hsvToRgb1(colorcopy)));
    };

    setColor = () => {
        this.setState({
            inputValue: this.getInputValue(),
        });
    };

    valueToHsv = (value) => {
        const { colorModel } = this.props;
        if (colorModel) {
            // rgb(a)
            const matches = value.match(RGB_REGEX);
            if (matches) {
                const rgb = {
                    r: parseInt(matches[1], 10),
                    g: parseInt(matches[2], 10),
                    b: parseInt(matches[3], 10),
                    a: matches[4] !== undefined ? parseFloat(matches[4]) : 1,
                };
                const hsv = rgb1ToHsv(rgb255ToRgb1(rgb));
                if (hsv) {
                    return hsv;
                }
            }
        } else {
            // hex(a)
            const matches = value.match(HEX_REGEX);
            if (matches) {
                const hsv = rgb1ToHsv(rgb255ToRgb1(hexToRgb255(matches[1])));
                if (hsv) {
                    return hsv;
                }
            }
        }
        return null;
    };

    onBlur = (value) => {
        this.isTyping = false;
        const { onChangeEnd } = this.props;
        this.setState({ inputValue: value });
        const hsv = this.valueToHsv(value);
        if (onChangeEnd && hsv) {
            onChangeEnd(hsv);
        }
    };

    render() {
        const { onModelToggle, colorModel, transparency, hideSwitchIcon } =
            this.props;
        const { inputValue } = this.state;
        let placeholder;
        let regex;
        if (colorModel) {
            // rgb(a)
            if (transparency) {
                placeholder = 'rgba(255,255,255,0.5)';
            } else {
                placeholder = 'rgb(255,255,255)';
            }
            regex = RGB_REGEX;
        } else {
            // hex(a)
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
                    design={Input.BORDER_DESIGN}
                    dynamic={Input.NO_DYNAMIC}
                    className="cc__color-input__input"
                />
                {!hideSwitchIcon && (
                    <Icon
                        className="chayns__color--headline cc__color-input__exchange-icon"
                        icon="fa fa-exchange-alt"
                        onClick={onModelToggle}
                    />
                )}
            </div>
        );
    }
}

export default function withColorInput({ showAllColorModels, ...props }) {
    if (showAllColorModels) {
        return (
            <Accordion
                head={'Erweitert'}
                style={{
                    marginBottom: 0,
                    marginTop: 0,
                    backgroundColor: 'transparent',
                }}
                dataGroup="cc_color-picker"
                icon="ts-angle-right"
            >
                <div className="accordion__content cc__color-input-accordion">
                    <ColorInput
                        {...props}
                        colorModel={0} // Cannot use ColorPicker.colorModel because of dependency cycle
                        hideSwitchIcon
                        className="test567"
                    />
                    <ColorInput
                        {...props}
                        colorModel={1} // Cannot use ColorPicker.colorModel because of dependency cycle
                        hideSwitchIcon
                        className="test567"
                    />
                </div>
            </Accordion>
        );
    }
    return (
        <Accordion
            head={'Erweitert'}
            style={{
                marginBottom: 0,
                marginTop: 0,
                backgroundColor: 'transparent',
            }}
            dataGroup="cc_color-picker"
            defaultOpened
            icon="ts-angle-right"
        >
            <ColorInput {...props} />
        </Accordion>
    );
}

withColorInput.propTypes = {
    showAllColorModels: PropTypes.bool,
};

withColorInput.defaultProps = {
    showAllColorModels: false,
};

ColorInput.propTypes = {
    color: PropTypes.shape({
        h: PropTypes.number.isRequired,
        s: PropTypes.number.isRequired,
        v: PropTypes.number.isRequired,
        a: PropTypes.number,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeEnd: PropTypes.func.isRequired,
    colorModel: PropTypes.number.isRequired,
    onModelToggle: PropTypes.func.isRequired,
    transparency: PropTypes.bool.isRequired,
    hideSwitchIcon: PropTypes.bool,
};

ColorInput.defaultProps = {
    hideSwitchIcon: false,
};

ColorInput.displayName = 'ColorInput';
