/**
 * @component
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import Bubble from '../../react-chayns-bubble/component/Bubble';
import {
    hexStringToHsv,
    hsvToRgb,
    rgbToHexString,
    rgbToHsv,
    rgbToRgbString,
} from '../../utils/color';
import { isString } from '../../utils/is';
import ColorArea from './colorArea/ColorArea';
import ColorInput from './colorInput/ColorInput';
import './ColorPicker.scss';
import HueSlider from './hueSlider/HueSlider';
import TransparencySlider from './transparencySlider/TransparencySlider';

const getHsvColor = (color) => {
    if (isString(color)) {
        // HEX(A)
        return hexStringToHsv(color);
    }
    if (color.r !== undefined) {
        // RGB(A) (0-255)
        return rgbToHsv(color);
    }
    if (color.h !== undefined) {
        // HSV(A)
        return color;
    }
    return {
        h: 0,
        s: 0,
        v: 0,
        a: 1,
    };
};

/**
 * A RGB color picker.
 */
const ColorPicker = forwardRef(
    (
        {
            defaultColorModel,
            transparency,
            onChangeEnd,
            input,
            color,
            onBlur,
            inline,
            children,
            removeParentSpace,
            parent,
            onChange,
            style,
            className,
            bubblePosition,
            bubbleClassName,
            bubbleStyle,
        },
        reference
    ) => {
        // references
        const bubbleRef = useRef(null);
        const bubbleContentRef = useRef(null);
        const linkRef = useRef(null);
        const childrenRef = useRef(null);

        // state
        const [colorState, setColor] = useState(getHsvColor(color));
        const [coordinates, setCoordinates] = useState({
            x: 0,
            y: 0,
        });
        const [colorModel, setColorModel] = useState(
            defaultColorModel ||
                (transparency
                    ? ColorPicker.colorModels.RGB
                    : ColorPicker.colorModels.HEX)
        );

        // effects (lifecycle methods)
        useEffect(() => {
            setColor(getHsvColor(color));
        }, [color]);

        const closeBubble = useCallback(
            async (event) => {
                const rect = bubbleContentRef.current.getBoundingClientRect();
                const yOffset = chayns.env.isApp
                    ? (await chayns.getWindowMetrics()).pageYOffset
                    : 0;

                // Hide bubble and remove event listeners if click was outside of the bubble
                if (
                    event.pageX < rect.left ||
                    event.pageX > rect.right ||
                    event.pageY < rect.top + yOffset ||
                    event.pageY > rect.bottom + yOffset
                ) {
                    document.removeEventListener('click', closeBubble);
                    window.removeEventListener('blur', closeBubble);
                    bubbleRef.current.hide();
                    if (onBlur) {
                        onBlur(color);
                    }
                    if (chayns.env.isApp || chayns.env.isMyChaynsApp) {
                        chayns.allowRefreshScroll();
                    }
                }
            },
            [color, onBlur]
        );

        const openBubble = useCallback(async () => {
            if (inline) return;
            const ref = children ? childrenRef : linkRef;
            const rect = ref.current.getBoundingClientRect();

            let newX = rect.left + rect.width / 2;
            let newY =
                rect.bottom +
                (chayns.env.isApp
                    ? (await chayns.getWindowMetrics()).pageYOffset
                    : 0);

            if (removeParentSpace) {
                const parentRect = (
                    parent ||
                    document.getElementsByClassName('tapp')[0] ||
                    document.body
                ).getBoundingClientRect();
                newX -= parentRect.left;
                newY -= parentRect.top;
            }

            setCoordinates({
                x: newX,
                y: newY,
            });

            bubbleRef.current.show();
            // Add event listeners to hide the bubble
            document.addEventListener('click', closeBubble);
            window.addEventListener('blur', closeBubble);
            if (chayns.env.isApp || chayns.env.isMyChaynsApp) {
                chayns.disallowRefreshScroll();
            }
        }, [inline, children, removeParentSpace, closeBubble, parent]);

        const onChangeCallback = useCallback(
            (newColor) => {
                setColor(newColor);
                if (onChange) {
                    onChange(newColor);
                }
            },
            [setColor, onChange]
        );

        const onColorModelToggle = useCallback(() => {
            setColorModel(
                (colorModel + 1) % Object.keys(ColorPicker.colorModels).length
            );
        }, [setColorModel, colorModel]);

        const rgb255 = hsvToRgb(color);

        useImperativeHandle(reference, () => ({
            show: openBubble,
        }));

        if (inline) {
            return (
                <div
                    className={classNames('cc__color-picker', className)}
                    style={style}
                    onClick={openBubble}
                    key="div"
                    ref={childrenRef}
                >
                    <div
                        ref={bubbleContentRef}
                        className="cc__color-picker__bubble-content"
                    >
                        <ColorArea
                            color={colorState}
                            onChange={onChangeCallback}
                            onChangeEnd={onChangeEnd}
                        />
                        <HueSlider
                            color={colorState}
                            onChange={onChangeCallback}
                            onChangeEnd={onChangeEnd}
                            showTooltip={false}
                        />
                        {transparency && (
                            <TransparencySlider
                                color={colorState}
                                onChange={onChangeCallback}
                                onChangeEnd={onChangeEnd}
                            />
                        )}
                        {input && (
                            <ColorInput
                                color={colorState}
                                onChange={(value) => {
                                    onChangeCallback(value);
                                    onChangeEnd(value);
                                }}
                                onModelToggle={onColorModelToggle}
                                colorModel={colorModel}
                                transparency={transparency}
                            />
                        )}
                    </div>
                </div>
            );
        }

        return [
            <div
                className={classNames('cc__color-picker', className)}
                style={style}
                onClick={openBubble}
                key="div"
                ref={childrenRef}
            >
                {children || [
                    <div
                        key="circle"
                        className="cc__color-picker__color-circle"
                        style={{
                            backgroundColor: rgbToRgbString(rgb255, true),
                        }}
                    />,
                    <div
                        key="link"
                        className="cc__color-picker__color-link chayns__color--headline chayns__border-color--headline"
                        ref={linkRef}
                    >
                        {colorModel === ColorPicker.colorModels.RGB
                            ? rgbToRgbString(rgb255, transparency)
                            : rgbToHexString(rgb255, transparency)}
                    </div>,
                ]}
            </div>,
            <Bubble
                ref={bubbleRef}
                coordinates={coordinates}
                position={bubblePosition}
                parent={parent}
                className={bubbleClassName}
                style={bubbleStyle}
                key="bubble"
            >
                <div
                    ref={bubbleContentRef}
                    className="cc__color-picker__bubble-content"
                >
                    <ColorArea
                        color={color}
                        onChange={onChange}
                        onChangeEnd={onChangeEnd}
                    />
                    <HueSlider
                        color={color}
                        onChange={onChange}
                        onChangeEnd={onChangeEnd}
                        showTooltip={false}
                    />
                    {transparency && (
                        <TransparencySlider
                            color={color}
                            onChange={onChange}
                            onChangeEnd={onChangeEnd}
                        />
                    )}
                    {input && (
                        <ColorInput
                            color={color}
                            onChange={(value) => {
                                onChange(value);
                                onChangeEnd(value);
                            }}
                            onModelToggle={onColorModelToggle}
                            colorModel={colorModel}
                            transparency={transparency}
                        />
                    )}
                </div>
            </Bubble>,
        ];
    }
);

ColorPicker.propTypes = {
    /**
     * Display the color picker without a bubble.
     */
    inline: PropTypes.bool,

    /**
     * The current color. Either a HEX-string, an HSV(A)- or RGB(A)-object.
     */
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

    /**
     * The bubble position. The possible values are listed under the
     * `Bubble`-component.
     */
    bubblePosition: PropTypes.number,

    /**
     * Will be called when changing the color.
     */
    onChange: PropTypes.func,

    /**
     * Will be called after the color was changed.
     */
    onChangeEnd: PropTypes.func,

    /**
     * Will be called when the picker loses focus.
     */
    onBlur: PropTypes.func,

    /**
     * Wether the picker should show a transparency slider.
     */
    transparency: PropTypes.bool,

    /**
     * The parent node the bubble should be rendered into.
     */
    parent:
        typeof Element !== 'undefined'
            ? PropTypes.instanceOf(Element)
            : () => {},

    /**
     * The classname that will be set on the children wrapper.
     */
    className: PropTypes.string,

    /**
     * A React style object that will be assigned to the children wrapper
     * element.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),

    /**
     * A classname string that will be applied to the Bubble component.
     */
    bubbleClassName: PropTypes.string,

    /**
     * A React style object that will be applied to the Bubble component.
     */
    bubbleStyle: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),

    /**
     * Displays an input to type in the color.
     */
    input: PropTypes.bool,

    /**
     * The color model that is used by default.
     */
    defaultColorModel: PropTypes.number,

    /**
     * Children // TODO
     */
    children: PropTypes.node,

    /**
     * Removes space from the parent to the page borders from the tooltip
     * position. This is only needed if the parent is padded from the page and
     * has a relative positioning.
     */
    removeParentSpace: PropTypes.bool,
};

ColorPicker.defaultProps = {
    bubblePosition: Bubble.position.BOTTOM_CENTER,
    onChange: null,
    inline: false,
    onChangeEnd: null,
    onBlur: null,
    transparency: false,
    parent: null,
    className: null,
    style: null,
    bubbleClassName: null,
    bubbleStyle: null,
    input: false,
    defaultColorModel: null,
    children: null,
    removeParentSpace: false,
};

ColorPicker.colorModels = {
    HEX: 0,
    RGB: 1,
};

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
