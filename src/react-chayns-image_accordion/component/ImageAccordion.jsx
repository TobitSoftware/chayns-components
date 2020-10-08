import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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
