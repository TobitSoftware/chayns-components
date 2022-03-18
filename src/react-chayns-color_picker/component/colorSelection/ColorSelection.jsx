import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Icon } from '../../../index';
import { hsvToHexString } from '../../../utils/color';
import './colorSelection.scss';
import { hexToHsv } from '@chayns/colors';
import clsx from 'clsx';

const ColorSelection = ({
    color,
    customColorsArray,
    showCustomColors,
    showGlobalColors,
    onChange,
    onCreateCustomColor,
}) => {
    const globalColors = [
        '#000000',
        '#434343',
        '#666666',
        '#999999',
        '#b7b7b7',
        '#cccccc',
        '#d9d9d9',
        '#efefef',
        '#f3f3f3',
        '#ffffff',
        '#980000',
        '#ff0000',
        '#ff9900',
        '#ffff00',
        '#00ff00',
        '#00ffff',
        '#4a86e8',
        '#0000ff',
        '#9900ff',
        '#ff00ff',
    ].map((c) => hexToHsv(c));

    const style = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    };
    const accordionStyle = {
        border: 'none',
        marginBottom: 0,
        marginTop: '5px',
        backgroundColor: 'transparent',
    };

    const onChangeHandler = (value) => {
        if (onChange && value) {
            onChange(value);
        }
    };

    const onCreateCustomColorHandler = (value) => {
        if (onCreateCustomColor && value) {
            onCreateCustomColor(value);
        }
    };

    const colorAlreadyExists = customColorsArray.find(
        (c) => hsvToHexString(c) === hsvToHexString(color)
    );
    const colorWithoutOpacity = {
        ...color,
        a: 1,
    };

    const activeColorHex = useMemo(() => hsvToHexString(color), [color]);

    return (
        <div className="cc_color-selection">
            {showGlobalColors && (
                <Accordion
                    head="Globale Farben"
                    icon="ts-angle-right"
                    style={accordionStyle}
                    dataGroup="cc_color-picker"
                    isWrapped
                >
                    <div className="cc_color-selection--inner">
                        {globalColors.map((c) => (
                            <div className="cc_color-selection--wrapper">
                                {activeColorHex === hsvToHexString(c) && (
                                    <div className="cc_color-selection--active" />
                                )}
                                <div
                                    className={clsx(
                                        'cc_color-selection__color--wrapper'
                                    )}
                                >
                                    <div
                                        style={{
                                            '--color': hsvToHexString(c),
                                        }}
                                        className="cc_color-selection__color"
                                        onClick={() => onChangeHandler(c)}
                                    />
                                    <div className="cc_color-selection__transparency" />
                                </div>
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
                    isWrapped
                >
                    <div className="cc_color-selection--inner">
                        {customColorsArray.map((c) => (
                            <div className="cc_color-selection--wrapper">
                                {activeColorHex === hsvToHexString(c) && (
                                    <div className="cc_color-selection--active" />
                                )}
                                <div
                                    className={clsx(
                                        'cc_color-selection__color--wrapper'
                                    )}
                                >
                                    <div
                                        style={{
                                            '--color': hsvToHexString(c),
                                        }}
                                        className="cc_color-selection__color"
                                        onClick={() => onChangeHandler(c)}
                                    />
                                    <div className="cc_color-selection__transparency" />
                                </div>
                            </div>
                        ))}
                        {!colorAlreadyExists && (
                            <div className="cc_color-selection--wrapper">
                                <div
                                    className={clsx(
                                        'cc_color-selection__color--wrapper'
                                    )}
                                >
                                    <div
                                        style={{
                                            '--color': 'transparent', //chayns color text,
                                            color: '#ffffff!important',
                                            border: 'none',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        className="cc_color-selection__color"
                                        onClick={() => {
                                            if (!colorAlreadyExists) {
                                                onCreateCustomColorHandler(
                                                    color
                                                );
                                            }
                                        }}
                                    >
                                        <Icon
                                            icon="fas fa-plus"
                                            style={{
                                                fontSize: '14px',
                                                lineHeight: 1,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
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
    onCreateCustomColor: PropTypes.func.isRequired,
};

ColorSelection.defaultProps = {
    customColorsArray: null,
    showCustomColors: false,
    showGlobalColors: false,
};

export default ColorSelection;
