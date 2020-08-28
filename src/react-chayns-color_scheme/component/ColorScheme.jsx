/* eslint-disable react/forbid-prop-types,no-restricted-syntax */
import React, { memo, useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { hexStringToRgb } from '../../utils/color';

const ColorScheme = ({ color, colorMode, children, style, cssVariables, setWindowFunction, ...props }) => {
    if (typeof chayns === 'undefined') return children;

    const [optionsState, setOptions] = useState({});

    useEffect(() => {
        if (setWindowFunction) {
            window.changeColorScheme = (options) => {
                setOptions(options);
                window.chayns.getGlobalData();
            };
        }
    }, []);

    const colorStyles = useMemo(() => {
        const c = optionsState.color || color;
        const cm = optionsState.colorMode || colorMode;
        if (c && typeof chayns.utils !== 'undefined') {
            const primaryRgbColor = hexStringToRgb(c);
            const bgRgbColor = hexStringToRgb(chayns.utils.colors.getColorFromPalette('100', c, cm));
            const styles = {
                color: 'var(--chayns-color--text)',
                '--chayns-color-rgb': `${primaryRgbColor.r}, ${primaryRgbColor.g}, ${primaryRgbColor.b}`,
                '--chayns-bg-rgb': `${bgRgbColor.r}, ${bgRgbColor.g}, ${bgRgbColor.b}`,
            };

            for (const colorName of chayns.utils.colors.getAvailableColorList()) {
                const hexColor = chayns.utils.colors.getColorFromPalette(colorName, c, cm);
                styles[`--chayns-color--${colorName}`] = hexColor;
                const rgbColor = hexStringToRgb(hexColor);
                styles[`--chayns-color-rgb--${colorName}`] = `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
            }
            return styles;
        }
        return null;
    }, [color, colorMode, optionsState]);

    return (
        <div style={{ ...style, ...colorStyles, ...cssVariables }} {...props}>
            {children}
        </div>
    );
};

ColorScheme.propTypes = {
    color: PropTypes.string,
    colorMode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    cssVariables: PropTypes.object,
    setWindowFunction: PropTypes.bool,
};

ColorScheme.defaultProps = {
    color: typeof chayns !== 'undefined' ? chayns.env.site.color : '',
    colorMode: typeof chayns !== 'undefined' ? chayns.env.site.colorMode : '',
    style: {},
    cssVariables: {},
    setWindowFunction: false,
};

ColorScheme.displayName = 'ColorScheme';

export default memo(ColorScheme);
