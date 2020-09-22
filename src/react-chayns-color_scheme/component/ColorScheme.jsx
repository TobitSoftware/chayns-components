/* eslint-disable react/forbid-prop-types,no-restricted-syntax */
import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { getAvailableColorList, getColorFromPalette } from '@chayns/colors';
import { hexStringToRgb } from '../../utils/color';

const ColorScheme = (props) => {
    // eslint-disable-next-line prefer-const
    let { color, colorMode, secondaryColor, children, style, cssVariables, ...otherProps } = props;
    if (color !== null || secondaryColor !== null || colorMode !== null) {
        if (typeof chayns !== 'undefined') {
            if (color === null) {
                color = chayns.env.site.color;
            }
            if (colorMode === null) {
                colorMode = 0;
            }
        } else {
            if (color === null) {
                color = '#8e8e8e';
            }
            if (colorMode === null) {
                colorMode = 0;
            }
        }
        if (secondaryColor === null) {
            secondaryColor = color;
        }
    }

    const colorStyles = useMemo(() => {
        if (color) {
            const primaryRgbColor = hexStringToRgb(color);
            const bgRgbColor = hexStringToRgb(getColorFromPalette('100', {
                color,
                secondaryColor,
                colorMode,
            }));
            const styles = {
                color: 'var(--chayns-color--text)',
                '--chayns-color-rgb': `${primaryRgbColor.r}, ${primaryRgbColor.g}, ${primaryRgbColor.b}`,
                '--chayns-bg-rgb': `${bgRgbColor.r}, ${bgRgbColor.g}, ${bgRgbColor.b}`,
            };

            // eslint-disable-next-line no-unused-vars
            for (const colorName of getAvailableColorList()) {
                const hexColor = getColorFromPalette(colorName, {
                    color,
                    secondaryColor,
                    colorMode,
                });
                styles[`--chayns-color--${colorName}`] = hexColor;
                const rgbColor = hexStringToRgb(hexColor);
                styles[`--chayns-color-rgb--${colorName}`] = `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
            }
            return styles;
        }
        return null;
    }, [color, secondaryColor, colorMode]);

    return (
        <div style={{ ...style, ...colorStyles, ...cssVariables }} {...otherProps}>
            {children}
        </div>
    );
};

ColorScheme.propTypes = {
    color: PropTypes.string,
    secondaryColor: PropTypes.string,
    colorMode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    cssVariables: PropTypes.object,
};

ColorScheme.defaultProps = {
    color: null,
    secondaryColor: null,
    colorMode: null,
    style: {},
    cssVariables: {},
};

ColorScheme.displayName = 'ColorScheme';

export default memo(ColorScheme);
