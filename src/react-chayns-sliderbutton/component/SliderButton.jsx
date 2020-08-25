/* eslint-disable no-unused-expressions */
/* eslint-disable react/forbid-prop-types */
import React, {
    useState,
    useRef,
    useEffect,
} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './sliderButton.css';

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
    } = props;

    const [markerPosX, setMarkerPosX] = useState(0);
    const [dragStartPosX, setDragStartPosX] = useState(null);
    const [dragStartMarkerPosX, setDragStartMarkerPosX] = useState(null);
    const [lastSelectedIndex, setLastSelectedIndex] = useState(0);

    const sliderButtonRef = useRef();
    const sliderButton = sliderButtonRef && sliderButtonRef.current;

    const firstItemRef = useRef();
    let firstItem = firstItemRef && firstItemRef.current;

    const markerRef = useRef();
    let marker = markerRef && markerRef.current;

    const handleChange = (newIndex) => {
        if (newIndex !== lastSelectedIndex) {
            setLastSelectedIndex(newIndex);
            onChange && onChange(items[newIndex]);
        }
    };

    const getHoveredItemIndex = (markerPositionX = markerPosX) => {
        if (firstItem) {
            const markerHalfPosX = markerPositionX + firstItem.clientWidth / 2;
            const index = Math.floor(markerHalfPosX / firstItem.clientWidth);

            return index;
        }

        return 0;
    };

    const setMarkerIndex = (index) => {
        if (firstItem && index > -1 && index < items.length) {
            const newMarkerPosX = index * firstItem.clientWidth;

            // Element.animate() does not work on iOS, so we need transition
            const onAnimationEnd = () => setMarkerPosX(newMarkerPosX);

            marker.style.left = `${newMarkerPosX}px`;
            marker.style.transition = 'left 0.2s cubic-bezier(0.42, 0, 0.29, 1.36)';
            marker.removeEventListener('webkitTransitionEnd', onAnimationEnd);
            marker.addEventListener('webkitTransitionEnd', onAnimationEnd);
        }
    };

    const startDrag = (posX) => {
        if (!disabled) {
            // Element.animate() does not work on iOS, so we need transition
            marker.style.transition = '';

            setDragStartPosX(posX);
            setDragStartMarkerPosX(markerPosX);

            onDragStart && onDragStart();
        }
    };

    const stopDrag = () => {
        if (dragStartPosX) {
            setDragStartPosX(null);
            setDragStartMarkerPosX(null);
            setMarkerIndex(getHoveredItemIndex());

            onDragStop && onDragStop();
        }
    };

    const handleMovement = (posX) => {
        if (dragStartPosX) {
            const maxMarkerPosX = sliderButton && firstItem ? sliderButton.clientWidth - firstItem.clientWidth : 0;
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
        firstItem = firstItemRef.current;
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
            listener.forEach((lst) => window.removeEventListener(lst.type, lst.cb));
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
            {
                items.map((item, i) => (
                    <div
                        key={item.id}
                        className="sliderButton__item"
                        style={{ backgroundColor: chayns.env.site.color }}
                        ref={(ref) => {
                            if (i === 0) {
                                firstItemRef.current = ref;
                            }
                        }}
                        onClick={() => {
                            setMarkerIndex(i);
                            handleChange(i);
                        }}
                    >
                        <div className="sliderButton__item__content">{item.text}</div>
                    </div>
                ))
            }
            <div
                className={classNames(
                    { button: !disabled },
                    'sliderButton__item',
                    'sliderButton__item__marker'
                )}
                style={{
                    backgroundColor: chayns.env.site.color,
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
                <div className="sliderButton__item__content">{items[hoveredItemIndex].text}</div>
            </div>
        </div>
    );
};

SliderButton.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.any,
        text: PropTypes.string,
    })),
    onChange: PropTypes.func,
    onDragStop: PropTypes.func,
    onDragStart: PropTypes.func,
    selectedItemId: PropTypes.number,
    disabled: PropTypes.bool,
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
};

SliderButton.displayName = 'SliderButton';

export default SliderButton;
