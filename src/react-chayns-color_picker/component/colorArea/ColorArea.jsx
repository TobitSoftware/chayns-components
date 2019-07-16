import React, { Component } from 'react';
import './ColorArea.scss';
import PropTypes from 'prop-types';
import { toHex } from '../../utils/colorHelper';

function preventDefault(e) {
    e.preventDefault();
}

export default class ColorArea extends Component {
    static propTypes = {
        color: PropTypes.string.isRequired, // TODO rename to hue and change type
        preselectedColor: PropTypes.shape({
            r: PropTypes.number.isRequired,
            b: PropTypes.number.isRequired,
            g: PropTypes.number.isRequired,
        }).isRequired,
        height: PropTypes.number,
        width: PropTypes.number,
        onMove: PropTypes.func, // TODO rename to onChange
        onUp: PropTypes.func, // TODO rename to onChangeEnd
        // TODO add onChangeStart
    };

    static defaultProps = {
        height: 200,
        width: 300,
        onMove: null,
        onUp: null,
    };

    constructor(props) {
        super(props);
        this.state = { top: 0, left: 0 };
        this.canvas = React.createRef();
        // TODO error handling
    }

    componentDidMount() {
        // draw canvas and set selector after first mount
        this.drawCanvas();
        this.setSelector();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps // update if props changed (equal by reference)
            || JSON.stringify(this.state) !== JSON.stringify(nextState); // update if state changed (equal by value)
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.drawCanvas();
            const { color, preselectedColor } = this.props;
            // call onMove if color changed
            if (prevProps.color !== color) {
                this.move();
            }
            // move selector if preselected color changed
            if (prevProps.preselectedColor !== preselectedColor) {
                this.setSelector();
            }
        }
        // TODO error handling
    }

    setSelector() { // set selector to position of preselected color
        const { preselectedColor, height: heightProp, width: widthProp } = this.props;
        const ctx = this.canvas.current.getContext('2d');
        const { data, height, width } = ctx.getImageData(0, 0, widthProp, heightProp);
        for (let top = 0; top < height; top += 1) {
            for (let left = 0; left < width; left += 1) {
                const startIndex = (top * width + left) * 4;
                if ((data[startIndex] === preselectedColor.r && data[startIndex + 1] === preselectedColor.g && data[startIndex + 2] === preselectedColor.b)) {
                    this.setState({ top, left });
                    return;
                }
            }
        }
    }

    drawCanvas = () => { // draw the canvas
        const { color, height, width } = this.props;
        const ctx = this.canvas.current.getContext('2d');
        const gradient1 = ctx.createLinearGradient(0, 0, width - 1, 0);
        gradient1.addColorStop(0, '#fff');
        gradient1.addColorStop(1, toHex(color));
        ctx.fillStyle = gradient1;
        ctx.fillRect(0, 0, width, height);
        const gradient2 = ctx.createLinearGradient(0, 0, 0, height - 1);
        gradient2.addColorStop(0, 'transparent');
        gradient2.addColorStop(1, '#000');
        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, width, height);
    };

    getColor = () => { // get selected color from canvas
        const { left, top } = this.state;
        const imageData = this.canvas.current.getContext('2d').getImageData(left, top, 1, 1);
        return {
            r: imageData.data[0],
            g: imageData.data[1],
            b: imageData.data[2],
            a: imageData.data[3],
        };
    };

    down = (event) => {
        // prevent touch scroll
        event.preventDefault();
        // move the selector
        window.addEventListener('mousemove', this.move);
        window.addEventListener('touchmove', this.move);
        // end of moving
        window.addEventListener('mouseup', this.up);
        window.addEventListener('touchend', this.up);
        window.addEventListener('touchcancel', this.up);
        window.addEventListener('blur', this.up);
        document.addEventListener('mouseenter', this.mouseenter);
        // rect is used to get coordinates of area html element
        this.rect = event.target.getBoundingClientRect();
        // call onMove
        this.move(event);
    };

    move = (event) => {
        const { onMove } = this.props;
        const { rect } = this;
        let { top, left } = this.state;
        // set the user's coordinates
        if (event) {
            top = (event.changedTouches ? event.changedTouches[0].clientY : event.clientY) - rect.top;
            left = (event.changedTouches ? event.changedTouches[0].clientX : event.clientX) - rect.left;
        }
        // user leaves area
        if (rect) {
            if (top < 0) {
                top = 0;
            } else if (top >= rect.height) {
                top = rect.height - 1;
            }
            if (left < 0) {
                left = 0;
            } else if (left >= rect.width) {
                left = rect.width - 1;
            }
        }
        // move selector
        this.setState({ top, left });
        // call onMove
        if (onMove) {
            onMove(this.getColor());
        }
    };

    mouseenter = (event) => { // mouse enters window/webview/iframe
        if (event.buttons !== 1) { // left mouse click
            this.up();
        }
    };

    up = () => {
        const { onUp } = this.props;
        // remove event listeners
        window.removeEventListener('mousemove', this.move);
        window.removeEventListener('touchmove', this.move);
        window.removeEventListener('mouseup', this.up);
        window.removeEventListener('touchend', this.up);
        window.removeEventListener('touchcancel', this.up);
        window.removeEventListener('blur', this.up);
        document.removeEventListener('mouseenter', this.mouseenter);
        // call onUp
        if (onUp) {
            onUp(this.getColor());
        }
    };

    render() {
        const { height, width } = this.props;
        const { top, left } = this.state;

        return (
            <div className="cc__colorArea" onMouseDown={this.down} onTouchStart={this.down}>
                <canvas
                    className="cc__colorArea__area"
                    ref={this.canvas}
                    height={height}
                    width={width}
                    onTouchStart={preventDefault}
                />
                <div className="cc__colorArea__selector" style={{ top, left }} onTouchStart={preventDefault} />
            </div>
        );
    }
}
