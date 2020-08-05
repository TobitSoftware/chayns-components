import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { hexStringToRgb } from '../../utils/color';

const colorNames = [
    '000',
    '001',
    '002',
    '003',
    '004',
    '005',
    '006',
    '007',
    '008',
    '009',
    '100',
    '101',
    '102',
    '103',
    '104',
    '105',
    '106',
    '107',
    '108',
    '109',
    '200',
    '201',
    '202',
    '203',
    '204',
    '205',
    '206',
    '207',
    '208',
    '209',
    '300',
    '301',
    '302',
    '303',
    '304',
    '305',
    '306',
    '307',
    '308',
    '309',
    'primary',
    'headline',
    'text',
];

const ColorScheme = ({ color, colorMode, children, style, ...props }) => {
    const styles = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const colorName of colorNames) {
        const hexColor = chayns.utils.colors.getColorFromPalette(colorName, color, colorMode);
        styles[`--chayns-color--${colorName}`] = hexColor;
        const rgbColor = hexStringToRgb(hexColor);
        styles[`--chayns-color-rgb--${colorName}`] = `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;
    }

    return (
        <div style={{ ...style, ...styles }} {...props}>
            {children}
        </div>
    );
};

ColorScheme.propTypes = {
    color: PropTypes.string,
    colorMode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
};

ColorScheme.defaultProps = {
    color: chayns.env.site.color,
    colorMode: chayns.env.site.colorMode,
    style: {},
};

export default ColorScheme;
