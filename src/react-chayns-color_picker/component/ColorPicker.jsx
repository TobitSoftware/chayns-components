import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ColorPicker.scss';
import {
    hexToRgb255, hsvToRgb1, rgb1ToHsv, rgb1ToRgb255, rgb255ToHex, rgb255ToRgb1,
} from '../utils/colorHelper';
import Bubble from '../../react-chayns-bubble/component/Bubble';
import ColorArea from './colorArea/ColorArea';
import HueSlider from './hueSlider/HueSlider';
import TransparencySlider from './transparencySlider/TransparencySlider';

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
        onChange: PropTypes.func.isRequired,
        onChangeEnd: PropTypes.func,
        transparency: PropTypes.bool,
        parent: PropTypes.instanceOf(Element),
    };

    static defaultProps = {
        bubblePosition: Bubble.position.BOTTOM_CENTER,
        onChangeEnd: null,
        transparency: false,
        parent: null,
    };

    constructor(props) {
        super(props);
        this.state = { color: this.getHsvColor(props.color), coordinates: { x: 0, y: 0 } };
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
            return rgb1ToHsv(rgb255ToRgb1(hexToRgb255(color)));
        }
        if (color.r) { // RGB(A) (0-255)
            return rgb1ToHsv(rgb255ToRgb1(color));
        }
        if (color.h) { // HSV(A)
            return color;
        }
        return {
            h: 0,
            s: 0,
            v: 0,
            a: 0,
        };
    };

    openBubble = () => {
        const rect = this.linkRef.current.getBoundingClientRect();
        this.setState({ coordinates: { x: rect.left + (rect.width / 2), y: rect.bottom } });
        this.bubbleRef.current.show();
        // Add event listeners to hide the bubble
        document.addEventListener('click', this.closeBubble);
        window.addEventListener('blur', this.closeBubble);
    };


    closeBubble = (event) => {
        const rect = this.bubbleContentRef.current.getBoundingClientRect();
        // Hide bubble and remove event listeners if click was outside of the bubble
        if (event.pageX < rect.left || event.pageX > rect.right || event.pageY < rect.top || event.pageY > rect.bottom) {
            document.removeEventListener('click', this.closeBubble);
            window.removeEventListener('blur', this.closeBubble);
            this.bubbleRef.current.hide();
        }
    };

    onChange = (color) => {
        const { onChange } = this.props;
        onChange(color);
        this.setState({ color });
    };

    render() {
        const {
            bubblePosition,
            onChangeEnd,
            transparency,
            parent,
        } = this.props;
        const {
            color,
            coordinates,
        } = this.state;
        const rgb255 = rgb1ToRgb255(hsvToRgb1(color));

        return [
            <div className="cc__color-picker" onClick={this.openBubble}>
                <div className="cc__color-picker__color-circle" style={{ backgroundColor: rgb255ToHex(rgb255) }} />
                <div
                    className="cc__color-picker__color-link chayns__color--headline chayns__border-color--headline"
                    ref={this.linkRef}
                >
                    {
                        `rgba(${rgb255.r},${rgb255.g},${rgb255.b}${transparency ? `,${rgb255.a}` : ''})`
                    }
                </div>
            </div>,
            <Bubble
                ref={this.bubbleRef}
                coordinates={coordinates}
                position={bubblePosition}
                parent={parent}
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
                </div>
            </Bubble>,
        ];
    }
}
