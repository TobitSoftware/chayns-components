/**
 * @component
 */

import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { isNumber } from '../../utils/is';
import './slider.scss';

function preventDefault(e) {
    e.preventDefault();
}

/**
 * A horizontal track with a thumb that can be moved between a minimum and a
 * maximum value.
 */
export default class Slider extends PureComponent {
    constructor(props) {
        super(props);

        this.bar = React.createRef();
        this.innerTrack = React.createRef();
        this.leftThumb = React.createRef();
        this.leftDot = React.createRef();
        this.leftArrow = React.createRef();
        this.rightThumb = React.createRef();
        this.rightDot = React.createRef();
        this.rightArrow = React.createRef();
        this.label = React.createRef();
        this.thumb = React.createRef();
        this.dot = React.createRef();
        this.arrow = React.createRef();

        this.preventClick = false;

        this.target = null;

        if (props.interval) {
            this.leftPercent =
                (((props.startValue || isNumber(props.startValue)
                    ? props.startValue
                    : props.defaultStartValue) -
                    props.min) /
                    (props.max - props.min)) *
                100;
            this.rightPercent =
                (((props.endValue || isNumber(props.endValue)
                    ? props.endValue
                    : props.defaultEndValue) -
                    props.min) /
                    (props.max - props.min)) *
                100;
            if (props.vertical) {
                const left = this.leftPercent;
                this.leftPercent = 100 - this.rightPercent;
                this.rightPercent = 100 - left;
            }
        } else {
            this.percent =
                (((props.value || isNumber(props.value)
                    ? props.value
                    : props.defaultValue) -
                    props.min) /
                    (props.max - props.min)) *
                100;

            if (props.vertical) {
                this.percent = 100 - this.percent;
            }
        }

        this.setDirection();
    }

    componentDidMount() {
        const stepped = this.getSteppedPercents(this);
        this.setElements(stepped);
    }

    componentDidUpdate(prevProps) {
        const {
            interval,
            min,
            max,
            vertical,
            startValue,
            endValue,
            value,
        } = this.props;

        if (
            isNumber(value) ||
            (startValue && endValue) ||
            prevProps.min !== min ||
            prevProps.max !== max
        ) {
            if (interval) {
                let start =
                    typeof startValue === 'number'
                        ? startValue
                        : this.getRealValue(
                              this.leftPercent,
                              prevProps.min,
                              prevProps.max
                          );
                let end =
                    typeof endValue === 'number'
                        ? endValue
                        : this.getRealValue(
                              this.rightPercent,
                              prevProps.min,
                              prevProps.max
                          );

                if (start > max) {
                    start = max;
                } else if (start < min) {
                    start = min;
                }

                if (end > max) {
                    end = max;
                } else if (end < min) {
                    end = min;
                }

                this.leftPercent = ((start - min) / (max - min)) * 100;
                this.rightPercent = ((end - min) / (max - min)) * 100;
                if (vertical) {
                    const left = this.leftPercent;
                    this.leftPercent = 100 - this.rightPercent;
                    this.rightPercent = 100 - left;
                }
            } else {
                let v =
                    typeof value === 'number'
                        ? value
                        : this.getRealValue(
                              this.percent,
                              prevProps.min,
                              prevProps.max
                          );

                if (v > max) {
                    v = max;
                } else if (v < min) {
                    v = min;
                }

                this.percent = ((v - min) / (max - min)) * 100;
                if (vertical) {
                    this.percent = 100 - this.percent;
                }
            }
            const stepped = this.getSteppedPercents(this);
            this.setElements(stepped);
        }
        this.setDirection();
    }

    thumbDown = (e) => {
        const { onChangeStart, showValueInThumb, scaleOnDown } = this.props;
        this.target = e.target;
        const stepped = this.getSteppedPercents(this);
        this.onChange([onChangeStart], stepped);

        document.addEventListener('mousemove', this.thumbMove);
        document.addEventListener('mouseup', this.thumbUp);
        document.addEventListener('mouseleave', this.thumbUp);
        document.addEventListener('touchmove', this.thumbMove);
        document.addEventListener('touchend', this.thumbUp);
        document.addEventListener('touchcancel', this.thumbUp);

        if (
            scaleOnDown === null
                ? chayns.env.isMobile && showValueInThumb
                : scaleOnDown
        ) {
            this.bar.current.classList.add('cc__new-slider__bar--down');
        }
        this.setScrolling(false);

        e.stopPropagation();
    };

    thumbMove = (e) => {
        const {
            minInterval,
            maxInterval,
            min,
            max,
            onChange,
            interval,
            value,
            startValue,
            endValue,
        } = this.props;

        if (chayns.env.isIOS) {
            this.preventClick = true;
        }

        const width = max - min;
        const minPercent = 0;
        const maxPercent = 100;
        const minIntervalPercent = minInterval
            ? (minInterval / width) * 100
            : 0;
        const maxIntervalPercent = maxInterval
            ? (maxInterval / width) * 100
            : 100;
        const clientX = e.changedTouches
            ? e.changedTouches[0][this.clientX]
            : e[this.clientX];

        const rect = this.bar.current.getBoundingClientRect();
        const newPercent =
            ((clientX - rect[this.offsetLeft]) / rect[this.clientWidth]) * 100;
        if (interval) {
            if (
                this.target.classList.contains(
                    'cc__new-slider__bar__thumb--interval-left'
                )
            ) {
                this.leftPercent =
                    newPercent < minPercent ? minPercent : newPercent;
                if (this.leftPercent + minIntervalPercent > this.rightPercent) {
                    this.rightPercent = this.leftPercent + minIntervalPercent;
                }
                if (
                    maxInterval &&
                    this.leftPercent + maxIntervalPercent < this.rightPercent
                ) {
                    this.rightPercent = this.leftPercent + maxIntervalPercent;
                }
            } else if (
                this.target.classList.contains(
                    'cc__new-slider__bar__thumb--interval-right'
                )
            ) {
                this.rightPercent =
                    newPercent > maxPercent ? maxPercent : newPercent;
                if (this.leftPercent + minIntervalPercent > this.rightPercent) {
                    this.leftPercent = this.rightPercent - minIntervalPercent;
                }
                if (
                    maxInterval &&
                    this.leftPercent + maxIntervalPercent < this.rightPercent
                ) {
                    this.leftPercent = this.rightPercent - maxIntervalPercent;
                }
            }
            // prevent out of range
            if (this.rightPercent > maxPercent) {
                this.rightPercent = maxPercent;
            }
            if (this.leftPercent < minPercent) {
                this.leftPercent = minPercent;
            }
            if (this.leftPercent > maxPercent - minIntervalPercent) {
                this.leftPercent = maxPercent - minIntervalPercent;
            }
            if (this.rightPercent < minPercent + minIntervalPercent) {
                this.rightPercent = minPercent + minIntervalPercent;
            }
        } else {
            this.percent = newPercent;
            if (newPercent < minPercent) {
                this.percent = minPercent;
            } else if (newPercent > maxPercent) {
                this.percent = maxPercent;
            }
        }

        const stepped = this.getSteppedPercents(this);

        if (!(value || (startValue && endValue))) this.setElements(stepped);

        this.onChange([onChange], stepped);
        e.stopPropagation();
    };

    thumbUp = () => {
        const { onChangeEnd } = this.props;
        document.removeEventListener('mousemove', this.thumbMove);
        document.removeEventListener('mouseup', this.thumbUp);
        document.removeEventListener('mouseleave', this.thumbUp);
        document.removeEventListener('touchmove', this.thumbMove);
        document.removeEventListener('touchend', this.thumbUp);
        document.removeEventListener('touchcancel', this.thumbUp);
        this.target = null;
        const stepped = this.getSteppedPercents(this);
        this.setScrolling(true);
        this.bar.current.classList.remove('cc__new-slider__bar--down');
        this.onChange([onChangeEnd], stepped);
        if (this.preventClick) {
            setTimeout(() => {
                this.preventClick = false;
            }, 100);
        }
    };

    innerTrackDown = (e) => {
        const { onChangeStart, interval } = this.props;

        if (!interval) return;

        document.addEventListener('mousemove', this.innerTrackMove);
        document.addEventListener('mouseup', this.innerTrackUp);
        document.addEventListener('mouseleave', this.innerTrackUp);

        const stepped = this.getSteppedPercents(this);

        this.setScrolling(false);

        this.onChange([onChangeStart], stepped);

        e.stopPropagation();
    };

    innerTrackMove = (e) => {
        const { onChange, value, startValue, endValue } = this.props;

        const minPercent = 0;
        const maxPercent = 100;

        const rect = this.bar.current.getBoundingClientRect();
        let newPercent =
            this.leftPercent +
            (e[this.movementX] / rect[this.clientWidth]) * 100;

        if (newPercent < minPercent) {
            newPercent = minPercent;
        }
        if (newPercent > maxPercent - (this.rightPercent - this.leftPercent)) {
            newPercent = maxPercent - (this.rightPercent - this.leftPercent);
        }
        this.rightPercent = this.rightPercent - this.leftPercent + newPercent;
        this.leftPercent = newPercent;

        const stepped = this.getSteppedPercents(this);

        if (!(value || (startValue && endValue))) this.setElements(stepped);

        this.onChange([onChange], stepped);

        e.stopPropagation();
    };

    innerTrackUp = () => {
        const { onChangeEnd } = this.props;
        document.removeEventListener('mousemove', this.innerTrackMove);
        document.removeEventListener('mouseup', this.innerTrackUp);
        document.removeEventListener('mouseleave', this.innerTrackUp);

        const stepped = this.getSteppedPercents(this);

        this.setScrolling(true);

        this.onChange([onChangeEnd], stepped);
    };

    trackDown = (e) => {
        const {
            maxInterval,
            min,
            max,
            onChange,
            onChangeStart,
            onChangeEnd,
            interval,
            value,
            startValue,
            endValue,
        } = this.props;

        if (this.preventClick) {
            this.preventClick = false;
            return;
        }

        const rect = this.bar.current.getBoundingClientRect();
        const clickPercent =
            ((e[this.clientX] - rect[this.offsetLeft]) /
                rect[this.clientWidth]) *
            100;

        if (interval) {
            const width = max - min;
            const maxIntervalPercent = (maxInterval / width) * 100;
            if (
                this.leftPercent > clickPercent ||
                (chayns.env.isMobile &&
                    this.rightPercent > clickPercent &&
                    clickPercent - this.leftPercent <
                        this.rightPercent - clickPercent)
            ) {
                this.leftPercent = clickPercent;
                if (
                    maxInterval &&
                    this.rightPercent - this.leftPercent > maxIntervalPercent
                ) {
                    this.rightPercent = this.leftPercent + maxIntervalPercent;
                }
            } else if (
                this.rightPercent < clickPercent ||
                (chayns.env.isMobile &&
                    this.leftPercent < clickPercent &&
                    clickPercent - this.leftPercent >
                        this.rightPercent - clickPercent)
            ) {
                this.rightPercent = clickPercent;
                if (
                    maxInterval &&
                    this.rightPercent - this.leftPercent > maxIntervalPercent
                ) {
                    this.leftPercent = this.rightPercent - maxIntervalPercent;
                }
            }
        } else {
            this.percent = clickPercent;
        }

        const stepped = this.getSteppedPercents(this);

        if (!(value || (startValue && endValue))) this.setElements(stepped);

        this.onChange([onChange, onChangeStart, onChangeEnd], stepped);

        e.stopPropagation();
    };

    setElements = (percents) => {
        const {
            valueFormatter,
            showLabel,
            interval,
            vertical,
            showValueInThumb,
            min,
            max,
        } = this.props;

        const { leftPercent, rightPercent, percent } = percents;
        const multipleLeft = `${leftPercent}%`;
        const multipleRight = `${rightPercent}%`;
        const multipleWidth = `${rightPercent - leftPercent}%`;
        const single = `${percent}%`;
        let singleWidth = `${percent}%`;
        if (vertical) {
            singleWidth = `${100 - percent}%`;
        }

        // set elements
        if (vertical) {
            if (interval) {
                // Prevent scrolling on touch-devices
                this.leftThumb.current.addEventListener(
                    'touchstart',
                    preventDefault
                );
                this.rightThumb.current.addEventListener(
                    'touchstart',
                    preventDefault
                );
            } else {
                // Prevent scrolling on touch-devices
                this.thumb.current.addEventListener(
                    'touchstart',
                    preventDefault
                );
            }
        }
        if (interval) {
            this.leftThumb.current.style[this.left] = multipleLeft;
            this.rightThumb.current.style[this.left] = multipleRight;
            this.leftArrow.current.style[this.left] = multipleLeft;
            this.rightArrow.current.style[this.left] = multipleRight;
            this.innerTrack.current.style[this.left] = multipleLeft;
            this.innerTrack.current.style[this.width] = multipleWidth;
        } else {
            this.thumb.current.style[this.left] = single;
            this.arrow.current.style[this.left] = single;
            this.innerTrack.current.style[this.width] = singleWidth;
        }

        if (!vertical) {
            if (interval) {
                const left = this.getRealValue(leftPercent, min, max);
                const right = this.getRealValue(rightPercent, min, max);
                if (showLabel) {
                    this.label.current.innerText = valueFormatter(left, right);
                }
                if (showValueInThumb) {
                    this.leftDot.current.innerText = valueFormatter(left);
                    this.rightDot.current.innerText = valueFormatter(right);
                } else {
                    this.leftDot.current.setAttribute(
                        'data-value',
                        valueFormatter(left)
                    );
                    this.rightDot.current.setAttribute(
                        'data-value',
                        valueFormatter(right)
                    );
                }
            } else {
                const value = this.getRealValue(percent, min, max);
                if (showLabel) {
                    this.label.current.innerText = valueFormatter(value);
                }
                if (showValueInThumb) {
                    this.dot.current.innerText = valueFormatter(value);
                } else {
                    this.dot.current.setAttribute(
                        'data-value',
                        valueFormatter(value)
                    );
                }
            }
        }
    };

    getRealValue = (percent, min, max) => min + ((max - min) * percent) / 100;

    getSteppedPercents = (percents) => {
        const { min, max, step, interval } = this.props;
        let { leftPercent, rightPercent, percent } = percents;

        // set to steps
        if (step) {
            const width = max - min;
            const stepPercent = 100 / (width / step);
            if (interval) {
                const left = leftPercent % stepPercent;
                leftPercent -=
                    left < stepPercent / 2 ? left : left - stepPercent;
                const right = rightPercent % stepPercent;
                rightPercent -=
                    right < stepPercent / 2 ? right : right - stepPercent;
                return {
                    leftPercent,
                    rightPercent,
                };
            }
            const thumb = percent % stepPercent;
            percent -= thumb < stepPercent / 2 ? thumb : thumb - stepPercent;
            return { percent };
        }
        return percents;
    };

    onChange = (listeners, percents) => {
        const { min, max, interval, vertical } = this.props;
        let { leftPercent, rightPercent, percent } = percents;
        if (vertical) {
            const left = leftPercent;
            leftPercent = 100 - rightPercent;
            rightPercent = 100 - left;
            percent = 100 - percent;
        }
        const realInterval = max - min;
        if (interval) {
            const left = min + (realInterval * leftPercent) / 100;
            const right = min + (realInterval * rightPercent) / 100;
            listeners.forEach((l) => {
                if (l) l(left, right);
            });
        } else {
            const value =
                Math.round(1000 * (min + (realInterval * percent) / 100)) /
                1000;

            listeners.forEach((l) => {
                if (l) l(value);
            });
        }
        this.forceUpdate();
    };

    setDirection = () => {
        const { vertical } = this.props;
        if (vertical) {
            this.clientX = 'clientY';
            this.clientWidth = 'height';
            this.offsetLeft = 'top';
            this.offsetWidth = 'offsetHeight';
            this.movementX = 'movementY';
            this.left = 'top';
            this.right = 'bottom';
            this.width = 'height';
            this.marginLeft = 'marginTop';
            this.marginRight = 'marginBottom';
        } else {
            this.clientX = 'clientX';
            this.clientWidth = 'width';
            this.offsetLeft = 'left';
            this.offsetWidth = 'offsetWidth';
            this.movementX = 'movementX';
            this.left = 'left';
            this.right = 'right';
            this.width = 'width';
            this.marginLeft = 'marginLeft';
            this.marginRight = 'marginRight';
        }
    };

    setScrolling = (enabled) => {
        if (chayns.env.isApp) {
            if (enabled) {
                chayns.allowRefreshScroll();
            } else {
                chayns.disallowRefreshScroll();
            }
        }
    };

    render() {
        const {
            className,
            style,
            disabled,
            labelStyle,
            thumbStyle,
            showLabel,
            interval,
            trackStyle,
            innerTrackStyle,
            vertical,
            thumbWidth,
            showDots,
            min,
            max,
            step,
            valueFormatter,
        } = this.props;

        const breakpoints = showDots && step ? Array(Math.floor((max - min) / step) + 1).fill(0).map((_, i) => min + i * step) : null;

        return (
            <div
                className={classNames(
                    'cc__new-slider',
                    {
                        'cc__new-slider--disabled': disabled,
                        'cc__new-slider--vertical': vertical,
                        'cc__new-slider--dots': showDots,
                    },
                    className
                )}
                style={style}
            >
                {showLabel && !vertical ? (
                    <div
                        className="cc__new-slider__label"
                        ref={this.label}
                        style={labelStyle}
                    />
                ) : null}
                <div className="cc__new-slider__bar" ref={this.bar}>
                    {breakpoints ? (
                        breakpoints.map((breakpoint) => {
                            const realValue = this.getRealValue(this.percent, min, max);
                            const value = Math.round(realValue / step) * step;
                            const left = `${((breakpoint - min) / (max - min)) * 100}%`;
                            return (
                                <>
                                    <div
                                        className={classNames("cc__new-slider__bar__step__dot", { 'cc__new-slider__bar__step__dot--active': value >= breakpoint })}
                                        style={{ left }}
                                    />
                                    <div
                                        className={classNames("cc__new-slider__bar__step__dot-label")}
                                        style={{ left }}
                                    >
                                        {valueFormatter(breakpoint)}
                                    </div>
                                </>
                            );
                        })
                    ) : null}
                    <div
                        className="cc__new-slider__bar__track chayns__background-color--402"
                        onClick={this.trackDown}
                        style={trackStyle}
                    >
                        <div
                            className="cc__new-slider__bar__track__inner chayns__background-color--408"
                            onMouseDown={this.innerTrackDown}
                            ref={this.innerTrack}
                            style={{
                                ...innerTrackStyle,
                                ...(interval ? { left: 0 } : null),
                            }}
                        />
                    </div>
                    <div
                        className="cc__new-slider__bar__thumb-wrapper"
                        style={{
                            [this.width]: `calc(100% - ${
                                (thumbWidth || 20) - 20
                            }px`,
                            [this.marginLeft]: `${
                                (thumbWidth || 20) / 2 - 10
                            }px`,
                            [this.marginRight]: `${
                                (thumbWidth || 20) / 2 - 10
                            }px`,
                        }}
                    >
                        {interval ? (
                            [
                                <div
                                    key="left"
                                    className="cc__new-slider__bar__thumb cc__new-slider__bar__thumb--interval-left"
                                    onMouseDown={this.thumbDown}
                                    onTouchStart={this.thumbDown}
                                    ref={this.leftThumb}
                                >
                                    <div
                                        style={{
                                            ...(thumbWidth && {
                                                minWidth: thumbWidth,
                                            }),
                                            ...(thumbStyle && thumbStyle.left),
                                        }}
                                        className="cc__new-slider__bar__thumb__dot"
                                        ref={this.leftDot}
                                    />
                                </div>,
                                <div
                                    key="right"
                                    className="cc__new-slider__bar__thumb cc__new-slider__bar__thumb--interval-right"
                                    onMouseDown={this.thumbDown}
                                    onTouchStart={this.thumbDown}
                                    ref={this.rightThumb}
                                >
                                    <div
                                        style={{
                                            ...(thumbWidth && {
                                                minWidth: thumbWidth,
                                            }),
                                            ...(thumbStyle && thumbStyle.right),
                                        }}
                                        className="cc__new-slider__bar__thumb__dot"
                                        ref={this.rightDot}
                                    />
                                </div>,
                            ]
                        ) : (
                            <div
                                className="cc__new-slider__bar__thumb cc__new-slider__bar__thumb--interval-left"
                                onMouseDown={this.thumbDown}
                                onTouchStart={this.thumbDown}
                                ref={this.thumb}
                            >
                                <div
                                    style={{
                                        ...(thumbWidth && {
                                            minWidth: thumbWidth,
                                        }),
                                        ...thumbStyle,
                                    }}
                                    className="cc__new-slider__bar__thumb__dot"
                                    ref={this.dot}
                                />
                            </div>
                        )}
                    </div>
                    {interval ? (
                        [
                            <div
                                style={{
                                    background:
                                        thumbStyle?.left &&
                                        (thumbStyle.left.background ||
                                            thumbStyle.left.backgroundColor ||
                                            thumbStyle.left[
                                                'background-color'
                                            ]),
                                }}
                                ref={this.leftArrow}
                                key="left"
                                className="cc__new-slider__bar__mobile-arrow"
                            />,
                            <div
                                style={{
                                    background:
                                        thumbStyle?.right &&
                                        (thumbStyle.right.background ||
                                            thumbStyle.right.backgroundColor ||
                                            thumbStyle.right[
                                                'background-color'
                                            ]),
                                }}
                                ref={this.rightArrow}
                                key="right"
                                className="cc__new-slider__bar__mobile-arrow"
                            />,
                        ]
                    ) : (
                        <div
                            style={{
                                background:
                                    thumbStyle &&
                                    (thumbStyle.background ||
                                        thumbStyle.backgroundColor ||
                                        thumbStyle['background-color']),
                            }}
                            ref={this.arrow}
                            className="cc__new-slider__bar__mobile-arrow"
                        />
                    )}
                </div>
            </div>
        );
    }
}

Slider.propTypes = {
    /**
     * The minimum value of the slider.
     */
    min: PropTypes.number,

    /**
     * The maximum value of the slider.
     */
    max: PropTypes.number,

    /**
     * The amount of steps that the slider should be divided into.
     */
    step: PropTypes.number,

    /**
     * Whether to show dots at the possible breakpoints
     */
    showDots: PropTypes.number,

    /**
     * A default value for the slider.
     */
    defaultValue: PropTypes.number,

    /**
     * The current value of the slider.
     */
    value: PropTypes.number,

    /**
     * A React style object that will be applied to root element.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),

    /**
     * A classname string that will be applied to the root element.
     */
    className: PropTypes.string,

    /**
     * Wether the label should be shown. Only applies to horizontal sliders.
     */
    showLabel: PropTypes.bool,

    /**
     * A function to format the current value for display in the label.
     */
    valueFormatter: PropTypes.func,

    /**
     * A React style object that will be applied to the label.
     */
    labelStyle: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),

    /**
     * A callback that is invoked when the user starts changing the value.
     */
    onChangeStart: PropTypes.func,

    /**
     * A callback that is invoked when the user changes the value of the slider.
     */
    onChange: PropTypes.func,

    /**
     * A callback that is invoked when the user stops changing the slider value.
     */
    onChangeEnd: PropTypes.func,

    /**
     * A React style object that will be applied to the thumb.
     */
    thumbStyle: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),

    /**
     * Wether to ignore any user interaction and render the slider with a
     * disabled style.
     */
    disabled: PropTypes.bool,

    /**
     * Wether the slider should be vertical instead of horizontal.
     */
    vertical: PropTypes.bool,

    /**
     * Wether the slider should select a range instead of a single value. This
     * will add a second thumb for the user to adjust.
     */
    interval: PropTypes.bool,

    /**
     * The minimum range that can be selected by the two thumbs.
     */
    minInterval: PropTypes.number,

    /**
     * The maximum range that can be selected by the two thumbs.
     */
    maxInterval: PropTypes.number,

    /**
     * The default value for the left thumb.
     */
    defaultStartValue: PropTypes.number,

    /**
     * The default value for the right thumb.
     */
    defaultEndValue: PropTypes.number,

    /**
     * The current value of the left thumb.
     */
    startValue: PropTypes.number,

    /**
     * The current value of the right thumb.
     */
    endValue: PropTypes.number,

    /**
     * A React style object that will be applied to the track.
     */
    trackStyle: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),

    /**
     * A React style object that will be applied ot the inner track.
     */
    innerTrackStyle: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),

    /**
     * Wether the current value should be shown inside the thumb.
     */
    showValueInThumb: PropTypes.bool,

    /**
     * Wether the slider should be scaled when the user grabs it on mobile
     * devices.
     */
    scaleOnDown: PropTypes.bool,

    /**
     * The width of the thumb.
     */
    thumbWidth: PropTypes.number,
};

Slider.defaultProps = {
    min: 0,
    max: 100,
    step: null,
    showDots: false,
    defaultValue: 0,
    value: null,
    style: null,
    className: null,
    showLabel: false,
    valueFormatter: (value1, value2) =>
        value2
            ? `${Math.round(value1)} - ${Math.round(value2)}`
            : Math.round(value1),
    labelStyle: { minWidth: '50px' },
    onChangeStart: null,
    onChange: null,
    onChangeEnd: null,
    thumbStyle: null,
    disabled: false,
    vertical: false,
    interval: false,
    minInterval: null,
    maxInterval: null,
    defaultStartValue: 0,
    defaultEndValue: 0,
    startValue: null,
    endValue: null,
    trackStyle: null,
    innerTrackStyle: null,
    showValueInThumb: false,
    scaleOnDown: null,
    thumbWidth: null,
};

Slider.displayName = 'Slider';
