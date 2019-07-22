import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ColorPicker.scss';
import Bubble from '../../react-chayns-bubble/component/Bubble';
import ColorArea from './colorArea/ColorArea';
import HueSlider from './hueSlider/HueSlider';
import TransparencySlider from './transparencySlider/TransparencySlider';
import ColorInput from './colorInput/ColorInput';

import {
    hexStringToHsv,
    hsvToRgb,
    rgbToHexString,
    rgbToHsv,
    rgbToRgbString,
} from '../../utils/color';

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
        bubblePosition: PropTypes.number,
        onChange: PropTypes.func,
        onChangeEnd: PropTypes.func,
        transparency: PropTypes.bool,
        parent: PropTypes.instanceOf(Element),
        className: PropTypes.string,
        style: PropTypes.object,
        bubbleClassName: PropTypes.string,
        bubbleStyle: PropTypes.object,
        input: PropTypes.bool,
        defaultColorModel: PropTypes.number, // TODO add to readme
    };

    static defaultProps = {
        bubblePosition: Bubble.position.BOTTOM_CENTER,
        onChange: null,
        onChangeEnd: null,
        transparency: false,
        parent: null,
        className: null,
        style: null,
        bubbleClassName: null,
        bubbleStyle: null,
        input: false,
        defaultColorModel: null,
    };

    static colorModels = {
        HEX: 0,
        RGB: 1,
    };

    constructor(props) {
        super(props);
        this.state = {
            color: this.getHsvColor(props.color),
            coordinates: { x: 0, y: 0 },
            colorModel: props.defaultColorModel
                || (props.transparency
                    ? ColorPicker.colorModels.RGB
                    : ColorPicker.colorModels.HEX
                ),
        };
        this.bubbleRef = React.createRef();
        this.bubbleContentRef = React.createRef();
        this.linkRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        const { color } = this.props;
        if (color !== prevProps.color) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ color: this.getHsvColor(color) });
        }
    }

    getHsvColor = (color) => {
        if (typeof color === 'string') { // HEX(A)
            return hexStringToHsv(color);
        }
        if (color.r) { // RGB(A) (0-255)
            return rgbToHsv(color);
        }
        if (color.h) { // HSV(A)
            return color;
        }
        return {
            h: 0,
            s: 0,
            v: 0,
            a: 1,
        };
    };

    openBubble = () => {
        const rect = this.linkRef.current.getBoundingClientRect();
        this.setState({ coordinates: { x: rect.left + (rect.width / 2), y: rect.bottom } });
        this.bubbleRef.current.show();
        // Add event listeners to hide the bubble
        document.addEventListener('click', this.closeBubble);
        window.addEventListener('blur', this.closeBubble);
        if (chayns.env.isApp || chayns.env.isMyChaynsApp) {
            chayns.disallowRefreshScroll();
        }
    };


    closeBubble = (event) => {
        const rect = this.bubbleContentRef.current.getBoundingClientRect();
        // Hide bubble and remove event listeners if click was outside of the bubble
        if (event.pageX < rect.left || event.pageX > rect.right || event.pageY < rect.top || event.pageY > rect.bottom) {
            document.removeEventListener('click', this.closeBubble);
            window.removeEventListener('blur', this.closeBubble);
            this.bubbleRef.current.hide();
            if (chayns.env.isApp || chayns.env.isMyChaynsApp) {
                chayns.allowRefreshScroll();
            }
        }
    };

    onChange = (color) => {
        const { onChange } = this.props;
        this.setState({ color });
        if (onChange) {
            onChange(color);
        }
    };

    onColorModelToggle = () => {
        const { colorModel } = this.state;
        this.setState({ colorModel: (colorModel + 1) % Object.keys(ColorPicker.colorModels).length });
    };

    render() {
        const {
            bubblePosition,
            onChangeEnd,
            transparency,
            parent,
            className,
            style,
            bubbleClassName,
            bubbleStyle,
            input,
        } = this.props;
        const {
            color,
            coordinates,
            colorModel,
        } = this.state;
        const rgb255 = hsvToRgb(color);

        return [
            <div
                className={classNames('cc__color-picker', className)}
                style={style}
                onClick={this.openBubble}
                key="div"
            >
                <div
                    className="cc__color-picker__color-circle"
                    style={{ backgroundColor: rgbToRgbString(rgb255, true) }}
                />
                <div
                    className="cc__color-picker__color-link chayns__color--headline chayns__border-color--headline"
                    ref={this.linkRef}
                >
                    {
                        colorModel === ColorPicker.colorModels.RGB
                            ? rgbToRgbString(rgb255, transparency)
                            : rgbToHexString(rgb255, transparency)
                    }
                </div>
            </div>,
            <Bubble
                ref={this.bubbleRef}
                coordinates={coordinates}
                position={bubblePosition}
                parent={parent}
                className={bubbleClassName}
                style={bubbleStyle}
                key="bubble"
            >
                <div ref={this.bubbleContentRef} className="cc__color-picker__bubble-content">
                    <ColorArea
                        color={color}
                        onChange={this.onChange}
                        onChangeEnd={onChangeEnd}
                    />
                    <HueSlider
                        color={color}
                        onChange={this.onChange}
                        onChangeEnd={onChangeEnd}
                    />
                    {
                        !transparency
                        || (
                            <TransparencySlider
                                color={color}
                                onChange={this.onChange}
                                onChangeEnd={onChangeEnd}
                            />
                        )
                    }
                    {
                        !input
                        || (
                            <ColorInput
                                color={color}
                                onChange={this.onChange}
                                onModelToggle={this.onColorModelToggle}
                                colorModel={colorModel}
                                transparency={transparency}
                            />
                        )
                    }
                </div>
            </Bubble>,
        ];
    }
}
