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
        parent: PropTypes.node,
        coordinates: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }),
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        // show: PropTypes.bool,
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
        // show: false,
    };

    constructor(props) {
        super(props);

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);

        this.key = Math.random().toString();
    }

    componentDidMount() {
        this.tooltipNode.classList.add('cc__tooltip--hide');
    }

    // componentDidUpdate(prevProps) {
    //     const { show } = this.props;
    //     if (show && !prevProps.show) {
    //         this.show();
    //     } else if (!show && prevProps.show) {
    //         this.hide();
    //     }
    // }

    show() {
        clearTimeout(this.timeout);
        this.tooltipNode.classList.remove('cc__tooltip--hide');
        this.timeout = setTimeout(() => {
            this.tooltipNode.classList.add('cc__tooltip--active');
        });
    }

    hide() {
        clearTimeout(this.timeout);
        this.tooltipNode.classList.remove('cc__tooltip--active');
        this.timeout = setTimeout(() => {
            this.tooltipNode.classList.add('cc__tooltip--hide');
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
                    className={`cc__tooltip cc__tooltip--position${position}`}
                    style={{ ...{ top: `${y}px` }, ...(position < 2 ? { right: `-${x}px`, } : { left: `${x}px` }) }}
                    ref={(node) => {
                        this.tooltipNode = node;
                    }}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    key={`cc__tooltip${this.key}`}
                >
                    <div
                        className={classNames('cc__tooltip__overlay', className)}
                        style={style}
                    >
                        {children}
                    </div>
                </div>
            </TappPortal>
        );
    }
}
