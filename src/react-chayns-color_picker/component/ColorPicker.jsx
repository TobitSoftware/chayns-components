import React, {
    useState, useEffect, useRef, useCallback,
} from 'react';
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

const getHsvColor = (color) => {
    if (typeof color === 'string') { // HEX(A)
        return hexStringToHsv(color);
    }
    if (color.r !== undefined) { // RGB(A) (0-255)
        return rgbToHsv(color);
    }
    if (color.h !== undefined) { // HSV(A)
        return color;
    }
    return {
        h: 0,
        s: 0,
        v: 0,
        a: 1,
    };
};

export default function ColorPicker(props) {
    // references
    const bubbleRef = useRef(null);
    const bubbleContentRef = useRef(null);
    const linkRef = useRef(null);
    const childrenRef = useRef(null);

    // state
    const [color, setColor] = useState(getHsvColor(props.color));
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [colorModel, setColorModel] = useState(props.defaultColorModel
        || (props.transparency
            ? ColorPicker.colorModels.RGB
            : ColorPicker.colorModels.HEX
        ));

    // effects (lifecycle methods)
    useEffect(() => {
        setColor(getHsvColor(props.color));
    }, [props.color]);

    const closeBubble = useCallback(async (event) => {
        const rect = bubbleContentRef.current.getBoundingClientRect();
        const yOffset = chayns.env.isApp ? (await chayns.getWindowMetrics()).pageYOffset : 0;

        // Hide bubble and remove event listeners if click was outside of the bubble
        if (event.pageX < rect.left || event.pageX > rect.right || event.pageY < rect.top + yOffset || event.pageY > rect.bottom + yOffset) {
            document.removeEventListener('click', closeBubble);
            window.removeEventListener('blur', closeBubble);
            bubbleRef.current.hide();
            if (chayns.env.isApp || chayns.env.isMyChaynsApp) {
                chayns.allowRefreshScroll();
            }
        }
    }, [bubbleContentRef, bubbleRef]);

    const openBubble = useCallback(async () => {
        const ref = props.children ? childrenRef : linkRef;
        const rect = ref.current.getBoundingClientRect();
        setCoordinates({
            x: rect.left + (rect.width / 2),
            y: rect.bottom + (chayns.env.isApp ? (await chayns.getWindowMetrics()).pageYOffset : 0),
        });
        bubbleRef.current.show();
        // Add event listeners to hide the bubble
        document.addEventListener('click', closeBubble);
        window.addEventListener('blur', closeBubble);
        if (chayns.env.isApp || chayns.env.isMyChaynsApp) {
            chayns.disallowRefreshScroll();
        }
    }, [props.children, childrenRef, linkRef, setCoordinates, bubbleRef]);

    const onChange = useCallback((newColor) => {
        setColor(newColor);
        if (props.onChange) {
            props.onChange(newColor);
        }
    }, [setColor, props.onChange]);

    const onColorModelToggle = useCallback(() => {
        setColorModel((colorModel + 1) % Object.keys(ColorPicker.colorModels).length);
    }, [setColorModel, colorModel]);

    const rgb255 = hsvToRgb(color);

    return [
        <div
            className={classNames('cc__color-picker', props.className)}
            style={props.style}
            onClick={openBubble}
            key="div"
            ref={childrenRef}
        >
            {
                props.children
                || [
                    <div
                        key="circle"
                        className="cc__color-picker__color-circle"
                        style={{ backgroundColor: rgbToRgbString(rgb255, true) }}
                    />,
                    <div
                        key="link"
                        className="cc__color-picker__color-link chayns__color--headline chayns__border-color--headline"
                        ref={linkRef}
                    >
                        {
                            colorModel === ColorPicker.colorModels.RGB
                                ? rgbToRgbString(rgb255, props.transparency)
                                : rgbToHexString(rgb255, props.transparency)
                        }
                    </div>,
                ]
            }
        </div>,
        <Bubble
            ref={bubbleRef}
            coordinates={coordinates}
            position={props.bubblePosition}
            parent={props.parent}
            className={props.bubbleClassName}
            style={props.bubbleStyle}
            key="bubble"
        >
            <div ref={bubbleContentRef} className="cc__color-picker__bubble-content">
                <ColorArea
                    color={color}
                    onChange={onChange}
                    onChangeEnd={props.onChangeEnd}
                />
                <HueSlider
                    color={color}
                    onChange={onChange}
                    onChangeEnd={props.onChangeEnd}
                />
                {props.transparency && (
                    <TransparencySlider
                        color={color}
                        onChange={onChange}
                        onChangeEnd={props.onChangeEnd}
                    />
                )}
                {props.input && (
                    <ColorInput
                        color={color}
                        onChange={onChange}
                        onModelToggle={onColorModelToggle}
                        colorModel={colorModel}
                        transparency={props.transparency}
                    />
                )}
            </div>
        </Bubble>,
    ];
}

ColorPicker.propTypes = {
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
    defaultColorModel: PropTypes.number,
    children: PropTypes.node,
};

ColorPicker.defaultProps = {
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
    children: null,
};

ColorPicker.colorModels = {
    HEX: 0,
    RGB: 1,
};
