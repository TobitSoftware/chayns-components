/**
 * @component
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import TappPortal from '../../react-chayns-tapp_portal/component/TappPortal';

let currentId = 0;

/**
 * A floating bubble that is primarily used to power the `ContextMenu` and
 * `Tooltip` components.
 */
const Bubble = React.forwardRef((props, ref) => {
    const {
        position,
        parent,
        topDivStyle,
        onMouseEnter,
        onMouseLeave,
        className,
        children,
        style,
        coordinates,
    } = props;

    const bubbleRef = useRef();
    const [key] = useState(() => `cc__bubble${++currentId}`);

    const timeoutRef = useRef();

    useEffect(() => () => clearTimeout(timeoutRef.current), []);

    const [isActive, setIsActive] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    useImperativeHandle(
        ref,
        () => ({
            show() {
                setIsHidden(false);
                clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => setIsActive(true));
            },
            hide() {
                setIsActive(false);
                clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => setIsHidden(true), 500);
            },
        }),
        []
    );

    const bubbleClasses = classNames(
        `cc__bubble cc__bubble--position${position}`,
        isActive && 'cc__bubble--active',
        isHidden && 'cc__bubble--hide'
    );

    const { x, y } = coordinates;

    return (
        <TappPortal parent={parent}>
            <div
                className={bubbleClasses}
                style={{ top: `${y}px`, left: `${x}px`, ...topDivStyle }}
                ref={bubbleRef}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                key={key}
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
});

Bubble.position = {
    TOP_LEFT: 0,
    BOTTOM_LEFT: 1,
    BOTTOM_RIGHT: 2,
    TOP_RIGHT: 3,
    TOP_CENTER: 4,
    BOTTOM_CENTER: 5,
};

Bubble.isPositionBottom = (position) => {
    const { BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT } = Bubble.position;

    return [BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT].includes(position);
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

export default Bubble;
