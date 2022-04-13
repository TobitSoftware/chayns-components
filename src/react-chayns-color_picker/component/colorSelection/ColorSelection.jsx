import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { hexToHsv } from '@chayns/colors';
import clsx from 'clsx';
import Icon from '../../../react-chayns-icon/component/Icon';
import { hsvToHexString } from '../../../utils/color';
import './colorSelection.scss';

const ColorSelection = ({
    color,
    customColorsArray,
    showCustomColors,
    showGlobalColors,
    onChange,
    onCreateCustomColor,
    onRemoveCustomColor,
}) => {
    const globalColors = useMemo(
        () => [
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
            '#f44336',
            '#ff9800',
            '#ffeb3b',
            '#009688',
            '#795548',
            '#8bc34a',
            '#4caf50',
            '#9c27b0',
            '#3f51b5',
            '#03a9f4',
            '#005eb8',
            chayns.utils.colors.get(),
        ],
        []
    );

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
    const onRemoveCustomColorHandler = (value) => {
        if (onRemoveCustomColor && value) {
            onRemoveCustomColor(value);
        }
    };
    const activeColorHex = useMemo(() => hsvToHexString(color), [color]);

    const colors = useMemo(() => {
        const colorsArr = [];
        if (showGlobalColors) {
            colorsArr.push(...globalColors);
        }
        if (showCustomColors) {
            colorsArr.push(
                ...customColorsArray
                    .map((c) => hsvToHexString(c).toLowerCase())
                    .filter(
                        (c) => !showGlobalColors || !globalColors.includes(c)
                    )
            );
        }
        return colorsArr;
    }, [showGlobalColors, showCustomColors, globalColors, customColorsArray]);

    const colorAlreadyExists = useMemo(
        () => colors.some((c) => c === activeColorHex),
        [activeColorHex, colors]
    );

    const isGlobalColor = useMemo(
        () => globalColors.some((c) => c === activeColorHex),
        [activeColorHex, globalColors]
    );

    if (!showCustomColors && !showGlobalColors) {
        return null;
    }
    return (
        <div className="cc_color-selection">
            <div className="cc_color-selection--inner scrollbar">
                {colors.map((c) => (
                    <div className="cc_color-selection--wrapper">
                        {activeColorHex === c && (
                            <div className="cc_color-selection--active" />
                        )}
                        <div
                            className={clsx(
                                'cc_color-selection__color--wrapper'
                            )}
                        >
                            <div
                                style={{
                                    '--color': c,
                                }}
                                className="cc_color-selection__color"
                                onClick={() => onChangeHandler(hexToHsv(c))}
                            />
                            <div className="cc_color-selection__transparency" />
                        </div>
                    </div>
                ))}
                <div className="cc_color-selection--wrapper">
                    <div className={clsx('cc_color-selection__color--wrapper')}>
                        <div
                            style={{
                                opacity: isGlobalColor ? 0.5 : 1,
                                '--color': 'transparent',
                                color: '#ffffff!important',
                                border: 'none',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            className="cc_color-selection__color"
                            onClick={() => {
                                if (!isGlobalColor) {
                                    if (!colorAlreadyExists) {
                                        onCreateCustomColorHandler(color);
                                    } else {
                                        onRemoveCustomColorHandler(color);
                                    }
                                }
                            }}
                        >
                            {(!colorAlreadyExists || isGlobalColor) && (
                                <Icon
                                    icon="fas fa-plus"
                                    style={{
                                        fontSize: '14px',
                                        lineHeight: 1,
                                    }}
                                />
                            )}
                            {colorAlreadyExists && !isGlobalColor && (
                                <Icon
                                    icon="fas fa-trash"
                                    style={{
                                        fontSize: '10px',
                                        lineHeight: 1,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
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
    onRemoveCustomColor: PropTypes.func.isRequired,
};

ColorSelection.defaultProps = {
    customColorsArray: null,
    showCustomColors: false,
    showGlobalColors: false,
};

export default ColorSelection;
