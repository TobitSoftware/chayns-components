/**
 * @component
 */

import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import insertStyle from '../../utils/insertStyle';
import isInteger from '../../utils/isInteger';

const CLOSED = 0;
const PRE_CLOSING = 4;
const CLOSING = 1;
const OPENING = 2;
const OPENED = 3;

const DEFAULT_OPEN_TIMEOUT = 500;
const DEFAULT_CLOSE_TIMEOUT = 500;

const DEFAULT_CLASSNAME = 'expandable_content';

const DEFAULT_CLASSNAMES = {
    opened: 'animation__accordion--open',
    opening: 'animation__accordion--open',
    closed: 'animation__accordion--close',
    closing: 'animation__accordion--close',
};

const DEFAULT_TIMEOUTS = {
    opening: DEFAULT_OPEN_TIMEOUT,
    closing: DEFAULT_CLOSE_TIMEOUT,
};

/**
 * A component collapses or expands its children based on the `open`-prop.
 */
export default class ExpandableContent extends Component {
    static getMaxHeight(state, style) {
        if (state === PRE_CLOSING) {
            return null;
        }

        if (state === CLOSED || state === CLOSING) {
            return '0px';
        }

        if (style && style.maxHeight) {
            return style.maxHeight;
        }

        if (state === OPENING) {
            return '9999px';
        }

        return 'initial';
    }

    static getClassNames(state, classNames) {
        if (!classNames) {
            return null;
        }

        if (
            (state === CLOSING || state === PRE_CLOSING) &&
            classNames.closing
        ) {
            return classNames.closing;
        }

        if (state === CLOSED && classNames.closed) {
            return classNames.closed;
        }

        if (state === OPENING && classNames.opening) {
            return classNames.opening;
        }

        if (state === OPENED && classNames.opened) {
            return classNames.opened;
        }

        return null;
    }

    constructor(props) {
        super(props);

        this.state = {
            currentState: props.open ? OPENED : CLOSED,
        };

        this.contentRendered = props.open;
    }

    componentDidMount() {
        insertStyle(
            'expandable_content',
            '.expandable_content { max-height: 9999px; }'
        );
    }

    componentDidUpdate(prevProps) {
        const { open, timeout } = this.props;

        if (open === prevProps.open) {
            return;
        }

        if (open) {
            this.open(timeout && timeout.opening);
        } else {
            this.close(timeout && timeout.closing);
        }
    }

    open(timeout) {
        clearTimeout(this.timeout);

        this.setState({
            currentState: OPENING,
        });

        this.timeout = window.setTimeout(
            () => {
                this.setState({
                    currentState: OPENED,
                });
            },
            isInteger(timeout) ? timeout : DEFAULT_OPEN_TIMEOUT
        );

        this.contentRendered = true;
    }

    close(timeout) {
        clearTimeout(this.timeout);

        requestAnimationFrame(() => {
            this.setState({
                currentState: PRE_CLOSING,
            });

            this.timeout = requestAnimationFrame(() => {
                this.setState({
                    currentState: CLOSING,
                });
            });

            this.timeout = window.setTimeout(
                () => {
                    this.setState({
                        currentState: CLOSED,
                    });
                },
                isInteger(timeout) ? timeout : DEFAULT_CLOSE_TIMEOUT
            );
        });
    }

    render() {
        const {
            style,
            className,
            classNames,
            open,
            timeout,
            children,
            removeContentClosed,
            ...props
        } = this.props;
        const { currentState } = this.state;

        const divStyle = {
            ...style,
            overflow: (style && style.overflow) || 'hidden',
            maxHeight: ExpandableContent.getMaxHeight(currentState, style),
        };

        const newClassNames = classnames(
            className,
            classNames === DEFAULT_CLASSNAMES ? DEFAULT_CLASSNAME : null,
            ExpandableContent.getClassNames(currentState, classNames)
        );

        return (
            <div style={divStyle} className={newClassNames} {...props}>
                {(currentState !== CLOSED ||
                    (this.contentRendered && !removeContentClosed)) &&
                    children}
            </div>
        );
    }
}

ExpandableContent.propTypes = {
    /**
     * An object of classname strings that should be applied in the different
     * states.
     */
    classNames: PropTypes.shape({
        opening: PropTypes.string,
        opened: PropTypes.string,
        closing: PropTypes.string,
        closed: PropTypes.string,
    }),

    /**
     * This controls the animation timeouts for opening and closing.
     */
    timeout: PropTypes.shape({
        opening: PropTypes.number,
        closing: PropTypes.number,
    }),

    /**
     * Wether the content should be visible. If changed, a height transition
     * will start.
     */
    open: PropTypes.bool.isRequired,

    /**
     * A React style object that is passed to the wrapper `<div>`-element.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * A classname string that is applied to the wrapper element.
     */
    className: PropTypes.string,

    /**
     * The children of the component.
     */
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,

    /**
     * Wether the content should be removed when the component is closed and the
     * content would not be visible anyways.
     */
    removeContentClosed: PropTypes.bool,
};

ExpandableContent.defaultProps = {
    classNames: DEFAULT_CLASSNAMES,
    timeout: DEFAULT_TIMEOUTS,
    style: null,
    className: null,
    removeContentClosed: false,
};

ExpandableContent.displayName = 'ExpandableContent';
