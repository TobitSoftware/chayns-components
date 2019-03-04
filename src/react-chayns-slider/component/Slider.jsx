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
        showValue: PropTypes.bool,
        valueFormatter: PropTypes.func,
        sliderSize: PropTypes.number,
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
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 0,
        value: null,
        style: null,
        className: null,
        showValue: false,
        valueFormatter: value => value,
        sliderSize: null,
        onChangeStart: null,
        onChange: null,
        onChangeEnd: null,
        thumbStyle: null,
        disabled: false,
        vertical: false,
        minRange: 5,
        maxRange: 50,
        defaultStartValue: 0,
        defaultEndValue: 100,
        startValue: null,
        endValue: null,
    };

    constructor(props) {
        super(props);
        this.target = null;
        this.bar = React.createRef();
        this.innerTrack = React.createRef();
        this.leftThumb = React.createRef();
        this.rightThumb = React.createRef();
        this.leftPercent = 40;
        this.rightPercent = 80;
    }

    thumbMouseDown = (e) => {
        this.target = e.target;
        document.addEventListener('mousemove', this.thumbMouseMove);
        document.addEventListener('mouseup', this.thumbMouseUp);
        document.addEventListener('mouseleave', this.thumbMouseUp);
        e.stopPropagation();
    };

    thumbMouseMove = (e) => {
        const {
            minRange, maxRange, min, max
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
            this.leftPercent = minPercent;
        }
        if (this.leftPercent > maxPercent - minRange) {
            this.leftPercent = maxPercent - minRange;
        }
        if (this.rightPercent < minPercent + minRange) {
            this.rightPercent = minPercent + minRange;
        }
        if (this.rightPercent > maxPercent) {
            this.rightPercent = maxPercent;
        }
        this.setElements();
        e.stopPropagation();
    };

    thumbMouseUp = () => {
        document.removeEventListener('mousemove', this.thumbMouseMove);
        document.removeEventListener('mouseup', this.thumbMouseUp);
        document.removeEventListener('mouseleave', this.thumbMouseUp);
        this.target = null;
    };

    innerTrackMouseDown = (e) => {
        document.addEventListener('mousemove', this.innerTrackMouseMove);
        document.addEventListener('mouseup', this.innerTrackMouseUp);
        document.addEventListener('mouseleave', this.innerTrackMouseUp);
        // this.cursorPosition = e.clientX - this.bar.current.offsetLeft - this.innerTrack.current.offsetLeft;

        e.stopPropagation();
    };

    innerTrackMouseMove = (e) => {
        const {
            minRange, maxRange, min, max
        } = this.props;

        const width = max - min;
        const minPercent = 0;
        const maxPercent = 100;
        const minRangePercent = (minRange / width) * 100;
        const maxRangePercent = (maxRange / width) * 100;

        let newPercent = this.leftPercent + ((e.movementX / this.bar.current.clientWidth) * 100);

        if(newPercent < minPercent) {
            newPercent = minPercent;
        }
        if(newPercent > maxPercent - (this.rightPercent - this.leftPercent)) {
            newPercent = maxPercent - (this.rightPercent - this.leftPercent);
        }
        this.rightPercent = this.rightPercent - this.leftPercent + newPercent;
        this.leftPercent = newPercent;


        this.setElements();
        e.stopPropagation();
    };

    innerTrackMouseUp = () => {
        document.removeEventListener('mousemove', this.innerTrackMouseMove);
        document.removeEventListener('mouseup', this.innerTrackMouseUp);
        document.removeEventListener('mouseleave', this.innerTrackMouseUp);
    };

    setElements = () => {
        this.leftThumb.current.style.left = `${this.leftPercent}%`;
        this.rightThumb.current.style.left = `${this.rightPercent}%`;
        this.innerTrack.current.style.left = `${this.leftPercent}%`;
        this.innerTrack.current.style.width = `${this.rightPercent - this.leftPercent}%`;
    };

    render() {
        const { className, style, disabled } = this.props;

        return (
            <div className={classNames('cc__slider', { 'cc__slider--disabled': disabled }, className)} style={style}>
                <div className="cc__slider__text">


                    33%
                </div>
                <div
                    className="cc__slider__bar"
                    ref={this.bar}
                    onMouseDown={this.barMouseDown}
                >
                    <div className="cc__slider__bar__track">
                        <div
                            className="cc__slider__bar__track__inner"
                            style={{ left: '40%', width: '40%' }}
                            onMouseDown={this.innerTrackMouseDown}
                            ref={this.innerTrack}
                        />
                    </div>
                    <div
                        className="cc__slider__bar__thumb cc__slider__bar__thumb--range cc__slider__bar__thumb--range-left"
                        style={{ left: '40%' }}
                        onMouseDown={this.thumbMouseDown}
                        ref={this.leftThumb}
                    >
                        <div className="cc__slider__bar__thumb__dot"/>
                    </div>
                    <div
                        className="cc__slider__bar__thumb cc__slider__bar__thumb--range cc__slider__bar__thumb--range-right"
                        style={{ left: '80%' }}
                        onMouseDown={this.thumbMouseDown}
                        ref={this.rightThumb}
                    >
                        <div className="cc__slider__bar__thumb__dot"/>
                    </div>
                </div>
            </div>
        );
    }
}
