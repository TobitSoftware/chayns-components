/**
 * @component
 */

import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import './SliderButton.scss';

/**
 * A linear set of buttons which are mutually exclusive.
 */
const SliderButton = (props) => {
    const {
        className,
        style,
        items,
        onChange,
        onDragStop,
        onDragStart,
        selectedItemId,
        disabled,
        initialAnimation,
    } = props;

    // We assume the buttons each have a width of 64px because it is specified
    // in the scss ($itemWidth). 0.25 is added to prevent a bug where text of
    // the marker does not match the text of the hovered item.
    const itemWidth = 64; // $itemWidth in scss
    const [markerPosX, setMarkerPosX] = useState(
        initialAnimation
            ? 0
            : items.findIndex((item) => item.id === selectedItemId) *
                  itemWidth +
                  0.25
    );
    const [dragStartPosX, setDragStartPosX] = useState(null);
    const [dragStartMarkerPosX, setDragStartMarkerPosX] = useState(null);
    const [lastSelectedIndex, setLastSelectedIndex] = useState(selectedItemId);

    const sliderButtonRef = useRef();
    const sliderButton = sliderButtonRef?.current;

    const firstItemRef = useRef();
    let firstItem = firstItemRef?.current;

    const markerRef = useRef();
    let marker = markerRef?.current;

    const handleChange = (newIndex) => {
        if (newIndex !== lastSelectedIndex) {
            setLastSelectedIndex(newIndex);

            if (onChange) {
                onChange(items[newIndex]);
            }
        }
    };

    const getHoveredItemIndex = (markerPositionX = markerPosX) => {
        if (firstItem && firstItem.clientWidth > 0) {
            const markerHalfPosX = markerPositionX + firstItem.clientWidth / 2;
            return Math.floor(markerHalfPosX / firstItem.clientWidth);
        }

        return 0;
    };

    const setMarkerIndex = (index) => {
        if (firstItem && index > -1 && index < items.length) {
            const newMarkerPosX = index * firstItem.clientWidth;

            // Element.animate() does not work on iOS, so we need transition
            setLastSelectedIndex(index);
            setMarkerPosX(newMarkerPosX);
            marker.style.transition =
                'left 0.2s cubic-bezier(0.42, 0, 0.29, 1.36)';
        }
    };

    const startDrag = (posX) => {
        if (!disabled) {
            chayns.disallowRefreshScroll();

            // Element.animate() does not work on iOS, so we need transition
            // Transition have to be removed if the user drags the marker
            marker.style.transition = '';

            setDragStartPosX(posX);
            setDragStartMarkerPosX(markerPosX);

            if (onDragStart) {
                onDragStart();
            }
        }
    };

    const stopDrag = () => {
        if (dragStartPosX) {
            chayns.allowRefreshScroll();

            setDragStartPosX(null);
            setDragStartMarkerPosX(null);

            const hoveredItemIndex = getHoveredItemIndex();
            setMarkerIndex(hoveredItemIndex);

            if (onDragStop) {
                onDragStop(items[hoveredItemIndex]);
            }
        }
    };

    const handleMovement = (posX) => {
        if (dragStartPosX) {
            const maxMarkerPosX =
                sliderButton && firstItem
                    ? sliderButton.clientWidth - firstItem.clientWidth
                    : 0;
            let newMarkerPosX = dragStartMarkerPosX + posX - dragStartPosX;

            if (newMarkerPosX < 0) {
                newMarkerPosX = 0;
            } else if (newMarkerPosX > maxMarkerPosX) {
                newMarkerPosX = maxMarkerPosX;
            }

            const newSelectedIndex = getHoveredItemIndex(newMarkerPosX);

            handleChange(newSelectedIndex);
            setMarkerPosX(newMarkerPosX);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        firstItem = firstItemRef.current;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        marker = markerRef.current;

        if (selectedItemId) {
            const i = items.findIndex((item) => item.id === selectedItemId);
            setMarkerIndex(i);
        }
    }, []);

    useEffect(() => {
        if (!dragStartPosX) {
            const i = items.findIndex((item) => item.id === selectedItemId);
            setMarkerIndex(i);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItemId]);

    useEffect(() => {
        const listener = [
            {
                type: 'mousemove',
                cb: (ev) => handleMovement(ev.clientX),
            },
            {
                type: 'touchmove',
                cb: (ev) => handleMovement(ev.touches[0].clientX),
            },
            {
                type: 'mouseup',
                cb: () => stopDrag(),
            },
            {
                type: 'touchend',
                cb: () => stopDrag(),
            },
        ];

        listener.forEach((lst) => window.addEventListener(lst.type, lst.cb));

        return () => {
            listener.forEach((lst) =>
                window.removeEventListener(lst.type, lst.cb)
            );
        };
    });

    const hoveredItemIndex = getHoveredItemIndex();

    return (
        <div
            className={classNames(
                'sliderButton',
                { [className]: className },
                { 'sliderButton--disabled': disabled }
            )}
            style={style}
            ref={sliderButtonRef}
        >
            {items.map((item, i) => (
                <div
                    key={item.id}
                    className="sliderButton__item button button--disabled" // disabled to remove hover animation
                    ref={(ref) => {
                        if (i === 0) {
                            firstItemRef.current = ref;
                        }
                    }}
                    onClick={() => {
                        if (!disabled) {
                            setMarkerIndex(i);
                            handleChange(i);
                        }
                    }}
                >
                    <div className="sliderButton__item__content">
                        {item.text}
                    </div>
                </div>
            ))}
            <div
                className={classNames('sliderButton__item__marker', 'button')}
                style={{
                    left: `${markerPosX}px`,
                }}
                onMouseDown={(ev) => {
                    if (!chayns.env.isMobile) {
                        startDrag(ev.clientX);
                    }
                }}
                onTouchStart={(ev) => startDrag(ev.touches[0].clientX)}
                ref={markerRef}
            >
                <div className="sliderButton__item__content">
                    {items[hoveredItemIndex].text}
                </div>
            </div>
        </div>
    );
};

SliderButton.propTypes = {
    /**
     * A classname string that will be applied to the container element.
     */
    className: PropTypes.string,

    /**
     * A React style objec that will be applied to the container element.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * An array of option items.
     */
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        })
    ),

    /**
     * A callback that is invoked when the selection changes.
     */
    onChange: PropTypes.func,

    /**
     * A callback that is invoked when the user starts dragging the control.
     */
    onDragStop: PropTypes.func,

    /**
     * A callback that is invoked when the user stops dragging.
     */
    onDragStart: PropTypes.func,

    /**
     * The `id` of the item that should be selected.
     */
    selectedItemId: PropTypes.number,

    /**
     * Wether the `SliderButton` should ignore user interaction and be rendered
     * in a disabled style.
     */
    disabled: PropTypes.bool,

    /**
     * Whether there should be an animation when the component is mounted.
     */
    initialAnimation: PropTypes.bool,
};

SliderButton.defaultProps = {
    className: null,
    style: null,
    items: [
        {
            id: 0,
            text: 'Auf',
        },
        {
            id: 1,
            text: 'Stopp',
        },
        {
            id: 2,
            text: 'Zu',
        },
    ],
    onChange: null,
    onDragStop: null,
    onDragStart: null,
    selectedItemId: 0,
    disabled: false,
    initialAnimation: true,
};

SliderButton.displayName = 'SliderButton';

export default SliderButton;
