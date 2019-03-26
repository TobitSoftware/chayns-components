import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TappPortal from '../../react-chayns-tapp_portal/component/TappPortal';

export default class Bubble extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        style: PropTypes.object,
        position: PropTypes.number, /** 0 = top left, 1 = bottom left, 2 = bottom right, 3 = top right */
        parent: PropTypes.instanceOf(Element),
        coordinates: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }),
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
    };

    static defaultProps = {
        className: null,
        style: null,
        children: null,
        position: 0,
        parent: null,
        coordinates: null,
        onMouseEnter: null,
        onMouseLeave: null,
    };

    static position = {
        TOP_LEFT: 0,
        BOTTOM_LEFT: 1,
        BOTTOM_RIGHT: 2,
        TOP_RIGHT: 3,
        TOP_CENTER: 4,
        BOTTOM_CENTER: 5,
    };

    static isPositionBottom(position) {
        return position === Bubble.position.BOTTOM_LEFT
            || position === Bubble.position.BOTTOM_CENTER
            || position === Bubble.position.BOTTOM_RIGHT;
    }

    constructor(props) {
        super(props);

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);

        this.key = Math.random().toString();
        this.bubbleNode = React.createRef();
    }

    componentDidMount() {
        if (this.bubbleNode.current) {
            this.bubbleNode.current.classList.add('cc__bubble--hide');
        }
    }

    show() {
        if (!this.bubbleNode.current) {
            return;
        }

        clearTimeout(this.timeout);
        this.bubbleNode.current.classList.remove('cc__bubble--hide');
        this.timeout = setTimeout(() => {
            this.bubbleNode.current.classList.add('cc__bubble--active');
        });
    }

    hide() {
        if (!this.bubbleNode.current) {
            return;
        }

        clearTimeout(this.timeout);
        this.bubbleNode.current.classList.remove('cc__bubble--active');
        this.timeout = setTimeout(() => {
            this.bubbleNode.current.classList.add('cc__bubble--hide');
        }, 500);
    }


    render() {
        const {
            position, parent, children, coordinates, style, className, onMouseEnter, onMouseLeave
        } = this.props;
        const { x, y } = coordinates;

        return (
            <TappPortal parent={parent}>
                <div
                    className={`cc__bubble cc__bubble--position${position}`}
                    style={{ top: `${y}px`, left: `${x}px` }}
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
