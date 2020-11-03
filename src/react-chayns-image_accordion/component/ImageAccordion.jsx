/**
 * @component
 */

import classNames from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * An accordion that has a big image and appears in a grid. Should be used
 * inside of an `ImageAccordionGroup`.
 */
export default class ImageAccordion extends React.PureComponent {
    render() {
        const { open, prevOpen, disabled, children } = this.props;

        return (
            <div
                className={classNames('image-accordion-content', {
                    show: open || prevOpen,
                    disabled,
                })}
            >
                {children}
            </div>
        );
    }
}

ImageAccordion.propTypes = {
    prevOpen: PropTypes.bool,
    children: PropTypes.instanceOf(Object),
    disabled: PropTypes.bool,
    open: PropTypes.bool,
};

ImageAccordion.defaultProps = {
    prevOpen: false,
    children: null,
    disabled: false,
    open: false,
};

ImageAccordion.displayName = 'ImageAccordion';
