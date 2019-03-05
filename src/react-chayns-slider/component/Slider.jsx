import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Slider extends Component {
    static propTypes = {
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,
        defaultValue: PropTypes.number,
        value: PropTypes.number,
        style: PropTypes.object,
        className: PropTypes.string,
        showLabel: PropTypes.bool,
        valueFormatter: PropTypes.func,
        labelStyle: PropTypes.object,
        onChangeStart: PropTypes.func,
        onChange: PropTypes.func,
        onChangeEnd: PropTypes.func,
        thumbStyle: PropTypes.object,
        disabled: PropTypes.bool,
        vertical: PropTypes.bool,
        minRange: PropTypes.number,
        maxRange: PropTypes.number,
        defaultStartValue: PropTypes.number,
        defaultEndValue: PropTypes.number,
        startValue: PropTypes.number,
        endValue: PropTypes.number,
    };

    static defaultProps = {
        min: 100,
        max: 1000,
        step: 20,
        defaultValue: 0,
        value: null,
        style: null,
        className: null,
        showLabel: false,
        valueFormatter: (value1, value2) => (value2 ? `${Math.round(value1)} - ${Math.round(value2)}` : Math.round(value1)),
        labelStyle: { minWidth: '60px' },
        onChangeStart: null,
        onChange: null,
        onChangeEnd: null,
        thumbStyle: null,
        disabled: false,
        vertical: false,
        minRange: 50,
        maxRange: 500,
        defaultStartValue: 250,
        defaultEndValue: 750,
        startValue: null,
        endValue: null,
    };

    constructor(props) {
        super(props);

        this.bar = React.createRef();
        this.innerTrack = React.createRef();
        this.leftThumb = React.createRef();
        this.rightThumb = React.createRef();
        this.label = React.createRef();

        this.target = null;
        this.leftPercent = ((props.defaultStartValue - props.min) / (props.max - props.min)) * 100;
        this.rightPercent = ((props.defaultEndValue - props.min) / (props.max - props.min)) * 100;
    }

    componentDidMount() {
        this.setElements();
    }

    thumbMouseDown = (e) => {
        const { onChangeStart } = this.props;
        this.target = e.target;
        document.addEventListener('mousemove', this.thumbMouseMove);
        document.addEventListener('mouseup', this.thumbMouseUp);
        document.addEventListener('mouseleave', this.thumbMouseUp);
        this.onChange([onChangeStart]);
        e.stopPropagation();
    };

    thumbMouseMove = (e) => {
        const {
            minRange, maxRange, min, max, onChange
        } = this.props;

        const width = max - min;
        const minPercent = 0;
        const maxPercent = 100;
        const minRangePercent = (minRange / width) * 100;
        const maxRangePercent = (maxRange / width) * 100;

        const newPercent = (((e.clientX - this.bar.current.offsetLeft) / this.bar.current.offsetWidth) * 100);
        if (this.target.classList.contains('cc__slider__bar__thumb--range')) {
            if (this.target.classList.contains('cc__slider__bar__thumb--range-left')) {
                this.leftPercent = newPercent;
                if (this.leftPercent + minRangePercent > this.rightPercent) {
                    this.rightPercent = this.leftPercent + minRangePercent;
                }
                if (this.leftPercent + maxRangePercent < this.rightPercent) {
                    this.rightPercent = this.leftPercent + maxRangePercent;
                }
            } else if (this.target.classList.contains('cc__slider__bar__thumb--range-right')) {
                this.rightPercent = newPercent;
                if (this.leftPercent + minRangePercent > this.rightPercent) {
                    this.leftPercent = this.rightPercent - minRangePercent;
                }
                if (this.leftPercent + maxRangePercent < this.rightPercent) {
                    this.leftPercent = this.rightPercent - maxRangePercent;
                }
            }
        }

        // prevent out of range
        if (this.leftPercent < minPercent) {
            // this.rightPercent = this.rightPercent + (minPercent - this.leftPercent); // TODO
            this.leftPercent = minPercent;
        }
        if (this.leftPercent > maxPercent - minRangePercent) {
            this.leftPercent = maxPercent - minRangePercent;
        }
        if (this.rightPercent < minPercent + minRangePercent) {
            this.rightPercent = minPercent + minRangePercent;
        }
        if (this.rightPercent > maxPercent) {
            // this.leftPercent = this.leftPercent - (this.rightPercent - maxPercent);// TODO
            this.rightPercent = maxPercent;
        }
        this.setElements();
        this.onChange([onChange]);
        e.stopPropagation();
    };

    thumbMouseUp = () => {
        const { onChangeEnd } = this.props;
        document.removeEventListener('mousemove', this.thumbMouseMove);
        document.removeEventListener('mouseup', this.thumbMouseUp);
        document.removeEventListener('mouseleave', this.thumbMouseUp);
        this.target = null;
        this.onChange([onChangeEnd]);
    };

    innerTrackMouseDown = (e) => {
        const { onChangeStart } = this.props;
        document.addEventListener('mousemove', this.innerTrackMouseMove);
        document.addEventListener('mouseup', this.innerTrackMouseUp);
        document.addEventListener('mouseleave', this.innerTrackMouseUp);
        // this.cursorPosition = e.clientX - this.bar.current.offsetLeft - this.innerTrack.current.offsetLeft;

        this.onChange([onChangeStart]);

        e.stopPropagation();
    };

    innerTrackMouseMove = (e) => {
        const { onChange } = this.props;

        const minPercent = 0;
        const maxPercent = 100;

        let newPercent = this.leftPercent + ((e.movementX / this.bar.current.clientWidth) * 100);

        if (newPercent < minPercent) {
            newPercent = minPercent;
        }
        if (newPercent > maxPercent - (this.rightPercent - this.leftPercent)) {
            newPercent = maxPercent - (this.rightPercent - this.leftPercent);
        }
        this.rightPercent = this.rightPercent - this.leftPercent + newPercent;
        this.leftPercent = newPercent;

        this.setElements();
        this.onChange([onChange]);
        e.stopPropagation();
    };

    innerTrackMouseUp = () => {
        const { onChangeEnd } = this.props;
        document.removeEventListener('mousemove', this.innerTrackMouseMove);
        document.removeEventListener('mouseup', this.innerTrackMouseUp);
        document.removeEventListener('mouseleave', this.innerTrackMouseUp);
        this.onChange([onChangeEnd]);
    };

    trackMouseDown = (e) => {
        const {
            maxRange, min, max, onChange, onChangeStart, onChangeEnd
        } = this.props;

        const width = max - min;
        const maxRangePercent = (maxRange / width) * 100;
        const clickPercent = ((e.clientX - this.bar.current.offsetLeft) / this.bar.current.clientWidth) * 100;
        if (this.leftPercent > clickPercent) {
            this.leftPercent = clickPercent;
            if (this.rightPercent - this.leftPercent > maxRangePercent) {
                this.rightPercent = this.leftPercent + maxRangePercent;
            }
        } else if (this.rightPercent < clickPercent) {
            this.rightPercent = clickPercent;
            if (this.rightPercent - this.leftPercent > maxRangePercent) {
                this.leftPercent = this.rightPercent - maxRangePercent;
            }
        }
        this.setElements();
        this.onChange([onChange, onChangeStart, onChangeEnd]);
        e.stopPropagation();
    };

    setElements = () => {
        const {
            valueFormatter, min, max, step, showLabel
        } = this.props;
        let { leftPercent, rightPercent } = this;
        // set to steps
        if (step) {
            const width = max - min;
            const stepPercent = 100 / (width / step);
            const left = this.leftPercent % stepPercent;
            leftPercent -= (left < stepPercent / 2) ? left : left - stepPercent;
            const right = this.rightPercent % stepPercent;
            rightPercent -= (right < stepPercent / 2) ? right : right - stepPercent;
        }
        // set elements
        this.leftThumb.current.style.left = `${leftPercent}%`;
        this.rightThumb.current.style.left = `${rightPercent}%`;
        this.innerTrack.current.style.left = `${leftPercent}%`;
        this.innerTrack.current.style.width = `${rightPercent - leftPercent}%`;
        if (showLabel) {
            const realRange = max - min;
            const left = min + (realRange * leftPercent / 100);
            const right = min + (realRange * rightPercent / 100);
            if (showLabel) {
                this.label.current.innerText = valueFormatter(left, right);
            }
        }
    };

    onChange = (listener) => {
        const { min, max } = this.props;
        const { leftPercent, rightPercent } = this;
        const realRange = max - min;
        const left = min + (realRange * leftPercent / 100);
        const right = min + (realRange * rightPercent / 100);
        listener.forEach((l) => {
            if (l) l(left, right);
        });
    };

    render() {
        const {
            className, style, disabled, labelStyle, thumbStyle, showLabel
        } = this.props;

        return (
            <div className={classNames('cc__slider', { 'cc__slider--disabled': disabled }, className)} style={style}>
                {
                    showLabel
                        ? <div className="cc__slider__label" ref={this.label} style={labelStyle}/>
                        : null
                }
                <div
                    className="cc__slider__bar"
                    ref={this.bar}
                >
                    <div className="cc__slider__bar__track" onClick={this.trackMouseDown}>
                        <div
                            className="cc__slider__bar__track__inner"
                            onMouseDown={this.innerTrackMouseDown}
                            ref={this.innerTrack}
                        />
                    </div>
                    <div
                        className="cc__slider__bar__thumb cc__slider__bar__thumb--range cc__slider__bar__thumb--range-left"
                        onMouseDown={this.thumbMouseDown}
                        ref={this.leftThumb}
                        style={thumbStyle && thumbStyle.left}
                    >
                        <div className="cc__slider__bar__thumb__dot"/>
                    </div>
                    <div
                        className="cc__slider__bar__thumb cc__slider__bar__thumb--range cc__slider__bar__thumb--range-right"
                        onMouseDown={this.thumbMouseDown}
                        ref={this.rightThumb}
                        style={thumbStyle && thumbStyle.right}
                    >
                        <div className="cc__slider__bar__thumb__dot"/>
                    </div>
                </div>
            </div>
        );
    }
}
