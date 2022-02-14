import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Icon } from '../../../index';
import { hsvToRgb, hsvToRgbString, hsvToHexString } from '../../../utils/color';
import './colorSelection.scss';
import { hexToHsv } from '@chayns/colors';

const ColorSelection = ({
    color,
    customColorsArray,
    showCustomColors,
    showGlobalColors,
    onChange,
}) => {
    const globalColors = [
        '#F44336FF',
        '#FF5722FF',
        '#FF9800FF',
        '#FFC107FF',
        '#FFEB3BFF',
        '#CDDC39FF',
        '#8BC34AFF',
        '#4CAF50FF',
        '#009688FF',
        '#00BCD4FF',
        '#03A9F4FF',
        '#2196F3FF',
        '#3F51B5FF',
        '#673AB7FF',
        '#9C27B0FF',
        '#E91E63FF',
        '#FFFFFFFF',
        '#000000FF',
    ].map((c) => hexToHsv(c));

    const style = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    };
    const accordionStyle = {
        marginBottom: 0,
        // marginTop: 0,
        backgroundColor: 'transparent',
    };

    const onChangeHandler = (value) => {
        if (onChange && value) {
            onChange(value);
        }
    };

    const colorAlreadyExists = customColorsArray.find(
        (c) => hsvToHexString(c) === hsvToHexString(color)
    );
    const colorWithoutOpacity = { ...color, a: null };

    return (
        <div className="cc_color-selection">
            {showGlobalColors && (
                <Accordion
                    head="Globale Farben"
                    icon="ts-angle-right"
                    style={accordionStyle}
                    dataGroup="cc_color-picker"
                >
                    <div className="accordion__content" style={style}>
                        {globalColors.map((c) => (
                            <div
                                style={{
                                    width: '26px',
                                    height: '26px',
                                    margin: '2px',
                                    padding: '2px',
                                    borderRadius: '100%',
                                    border:
                                        hsvToHexString(c).toLowerCase() ===
                                        hsvToHexString(color).toLowerCase()
                                            ? `${hsvToHexString(c)} 1px solid`
                                            : '',
                                    position: 'relative',
                                }}
                            >
                                <div
                                    style={{
                                        cursor: 'pointer',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '100%',
                                        backgroundColor: hsvToHexString(c),
                                        position: 'relative',
                                    }}
                                    className="cc_color-selection__color"
                                    onClick={() => onChangeHandler(c)}
                                />
                            </div>
                        ))}
                    </div>
                </Accordion>
            )}
            {showCustomColors && customColorsArray && (
                <Accordion
                    head="Eigene Farben"
                    icon="ts-angle-right"
                    style={accordionStyle}
                    dataGroup="cc_color-picker"
                >
                    <div className="accordion__content" style={style}>
                        {customColorsArray.map((c) => (
                            <div
                                style={{
                                    width: '26px',
                                    height: '26px',
                                    margin: '2px',
                                    padding: '2px',
                                    borderRadius: '100%',
                                    border:
                                        hsvToHexString(c).toLowerCase() ===
                                        hsvToHexString(color).toLowerCase()
                                            ? `${hsvToHexString(c)} 1px solid`
                                            : '',
                                    position: 'relative',
                                }}
                            >
                                <div
                                    style={{
                                        cursor: 'pointer',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '100%',
                                        backgroundColor: hsvToHexString(c),
                                        position: 'relative',
                                    }}
                                    className="cc_color-selection__color"
                                    onClick={() => onChangeHandler(c)}
                                />
                            </div>
                        ))}
                        <div
                            style={{
                                cursor: colorAlreadyExists
                                    ? 'default'
                                    : 'pointer',
                                width: '22px',
                                height: '22px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                border: `${hsvToHexString(
                                    colorWithoutOpacity
                                )} 1px solid`,
                                margin: '4px',
                                filter: 'drop-shadow(0 0 1px #000000)',
                                opacity: colorAlreadyExists ? 0 : 1,
                                transition: 'opacity 0.25s',
                            }}
                            onClick={() => {
                                if (!colorAlreadyExists) {
                                    // TODO Send Callback
                                }
                            }}
                        >
                            <Icon
                                icon="fal fa-plus"
                                style={{
                                    fontSize: '14px',
                                    lineHeight: 1,
                                    color: hsvToHexString(colorWithoutOpacity),
                                }}
                            />
                        </div>
                    </div>
                </Accordion>
            )}
        </div>
    );
};

const colorPropType = PropTypes.oneOfType([
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
]);

ColorSelection.propTypes = {
    customColorsArray: PropTypes.arrayOf(colorPropType),
    showCustomColors: PropTypes.bool,
    showGlobalColors: PropTypes.bool,
    color: PropTypes.shape({
        h: PropTypes.number.isRequired,
        s: PropTypes.number.isRequired,
        v: PropTypes.number.isRequired,
        a: PropTypes.number,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
};

ColorSelection.defaultProps = {
    customColorsArray: null,
    showCustomColors: false,
    showGlobalColors: false,
};

export default ColorSelection;
