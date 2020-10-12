/**
 * @component
 */

import { getAvailableColorList, getColorFromPalette } from '@chayns/colors';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { hexStringToRgb } from '../../utils/color';

/**
 * This component adjusts the color scheme for all children components.
 */
const ColorScheme = (props) => {
    let { color, colorMode, secondaryColor } = props;

    const { children, style, cssVariables, ...otherProps } = props;

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
            const bgRgbColor = hexStringToRgb(
                getColorFromPalette('100', {
                    color,
                    secondaryColor,
                    colorMode,
                })
            );
            const styles = {
                color: 'var(--chayns-color--text)',
                '--chayns-color-rgb': `${primaryRgbColor.r}, ${primaryRgbColor.g}, ${primaryRgbColor.b}`,
                '--chayns-bg-rgb': `${bgRgbColor.r}, ${bgRgbColor.g}, ${bgRgbColor.b}`,
            };

            // eslint-disable-next-line no-restricted-syntax
            for (const colorName of getAvailableColorList()) {
                const hexColor = getColorFromPalette(colorName, {
                    color,
                    secondaryColor,
                    colorMode,
                });
                styles[`--chayns-color--${colorName}`] = hexColor;
                const rgbColor = hexStringToRgb(hexColor);
                styles[
                    `--chayns-color-rgb--${colorName}`
                ] = `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
            }
            return styles;
        }
        return null;
    }, [color, secondaryColor, colorMode]);

    return (
        <div
            style={{ ...style, ...colorStyles, ...cssVariables }}
            {...otherProps}
        >
            {children}
        </div>
    );
};

ColorScheme.propTypes = {
    /**
     * The color to use for child components in hex format.
     */
    color: PropTypes.string,

    /**
     * A secondary color to use for child components in hex format.
     */
    secondaryColor: PropTypes.string,

    /**
     * A color mode to use for child components.
     */
    colorMode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Children of the component.
     */
    children: PropTypes.node.isRequired,

    /**
     * Styles to be set on the wrapper `<div>`-element.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * An object of CSS variables that should be set on the `<div>`-wrapper.
     * Should look like this: `{ "--my-css-var": 100 }`.
     */
    cssVariables: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
};

ColorScheme.defaultProps = {
    color: null,
    secondaryColor: null,
    colorMode: null,
    style: {},
    cssVariables: {},
};

ColorScheme.displayName = 'ColorScheme';

export default ColorScheme;
