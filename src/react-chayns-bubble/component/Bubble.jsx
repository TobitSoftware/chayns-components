/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TappPortal from '../../react-chayns-tapp_portal/component/TappPortal';

export default class Bubble extends PureComponent {
    static isPositionBottom(position) {
        const { BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT } = Bubble.position;

        return [BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT].indexOf(position) !== -1;
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

        const bubbleClasses = classNames(`cc__bubble cc__bubble--position${position}`, {
            'cc__bubble--active': isActive,
            'cc__bubble--hide': isHidden,
        });

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
    topDivStyle: PropTypes.object,
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
