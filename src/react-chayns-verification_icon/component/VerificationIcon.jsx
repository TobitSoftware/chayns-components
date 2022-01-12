/**
 * @component
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const VerificationIcon = ({ name, design, verified }) => {
    if (!verified) {
        return name || null;
    }

    const className = clsx({
        'vcid-check': design === VerificationIcon.DEFAULT_DESIGN,
        'vcid-check--gray': design === VerificationIcon.GRAY_DESIGN,
        'vcid-check--blue': design === VerificationIcon.BLUE_DESIGN,
    });

    return (
        <>
            {name}{' '}
            <span className={className}>
                <span />
                <span />
                <span />
            </span>
        </>
    );
};

VerificationIcon.DEFAULT_DESIGN = 0;
VerificationIcon.GRAY_DESIGN = 1;
VerificationIcon.BLUE_DESIGN = 2;

VerificationIcon.propTypes = {
    /**
     * The username
     */
    name: PropTypes.string.isRequired,

    /**
     * The design of the icon. Use either `VerificationIcon.DEFAULT_DESIGN`,
     * `VerificationIcon.GRAY_DESIGN` or `VerificationIcon.BLUE_DESIGN`.
     */
    design: PropTypes.number,

    /**
     * Whether the user is verified
     */
    verified: PropTypes.bool,
};

VerificationIcon.defaultProps = {
    design: VerificationIcon.BLUE_DESIGN,
    verified: false,
};

export default VerificationIcon;
