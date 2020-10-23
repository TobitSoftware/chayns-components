/**
 * @component
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import TappPortal from '../../react-chayns-tapp_portal/component/TappPortal';

/**
 * A floating bubble that is primarily used to power the `ContextMenu` and
 * `Tooltip` components.
 */
export default class Bubble extends PureComponent {
    static isPositionBottom(position) {
        const { BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT } = Bubble.position;

        return (
            [BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT].indexOf(position) !== -1
        );
    }

    constructor(props) {
        super(props);

        this.key = Math.random().toString();
        this.bubbleNode = React.createRef();

        this.state = {
            isActive: false,
            isHidden: true,
        };
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    show = () => {
        clearTimeout(this.timeout);

        this.setState({ isHidden: false });

        this.timeout = setTimeout(() => {
            this.setState({ isActive: true });
        });
    };

    hide = () => {
        clearTimeout(this.timeout);

        this.setState({ isActive: false });

        this.timeout = setTimeout(() => {
            this.setState({ isHidden: true });
        }, 500);
    };

    render() {
        const {
            position,
            parent,
            children,
            coordinates: { x, y },
            style,
            className,
            onMouseEnter,
            onMouseLeave,
            topDivStyle,
        } = this.props;

        const { isActive, isHidden } = this.state;

        const bubbleClasses = classNames(
            `cc__bubble cc__bubble--position${position}`,
            {
                'cc__bubble--active': isActive,
                'cc__bubble--hide': isHidden,
            }
        );

        return (
            <TappPortal parent={parent}>
                <div
                    className={bubbleClasses}
                    style={{ top: `${y}px`, left: `${x}px`, ...topDivStyle }}
                    ref={this.bubbleNode}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    key={`cc__bubble${this.key}`}
                >
                    <div
                        className={classNames('cc__bubble__overlay', className)}
                        style={style}
                    >
                        {children}
                    </div>
                </div>
            </TappPortal>
        );
    }
}

Bubble.position = {
    TOP_LEFT: 0,
    BOTTOM_LEFT: 1,
    BOTTOM_RIGHT: 2,
    TOP_RIGHT: 3,
    TOP_CENTER: 4,
    BOTTOM_CENTER: 5,
};

Bubble.propTypes = {
    /**
     * The children that will be rendered inside of the bubble.
     */
    children: PropTypes.node,

    /**
     * A classname string that will be set on the children wrapper element.
     */
    className: PropTypes.string,

    /**
     * A React style object that will be applied to the children wrapper
     * element.
     */
    style: PropTypes.PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * This specifies where the bubble will appear relative to its coordinates.
     * Possible values are: `0` for top left, `1` for bottom left, `2` for bottom
     * right, `3` for top right, `4` for top center and `5` for bottom center.
     */
    position: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),

    /**
     * A DOM element into which the `Bubble`-component will render.
     */
    parent:
        typeof Element !== 'undefined'
            ? PropTypes.instanceOf(Element)
            : () => {},

    /**
     * The coordinates where the Bubble will point to. Is provided in an object
     * format that should look like this: `{ x: <number>, y: <number> }`
     */
    coordinates: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),

    /**
     * A callback that will be called when the mouse enters the Bubble.
     */
    onMouseEnter: PropTypes.func,

    /**
     * A callback that will be called when the mouse leaves the Bubble.
     */
    onMouseLeave: PropTypes.func,

    /**
     * A React style object that will be supplied to the outer most element of
     * the Bubble.
     */
    topDivStyle: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
};

Bubble.defaultProps = {
    className: null,
    style: null,
    children: null,
    position: 0,
    parent: null,
    coordinates: null,
    onMouseEnter: null,
    onMouseLeave: null,
    topDivStyle: null,
};

Bubble.displayName = 'Bubble';
