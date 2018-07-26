import React from 'react';
import PropTypes from 'prop-types';
import ReactTransitionGroup from 'react-transition-group/TransitionGroup';

import Modal from './Modal';
import * as Constants from './constants';

export default class InspectElement extends React.Component {
    static propTypes = {
        component: PropTypes.func.isRequired,
        expandedWidth: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        children: PropTypes.node,
        expanded: PropTypes.bool,
        onClose: PropTypes.func,
        onClosed: PropTypes.func,
    };

    static defaultProps = {
        expanded: false,
        children: null,
        expandedWidth: null,
        onClose: null,
        onClosed: null,
    };

    constructor() {
        super();

        this.state = {
            showModal: false,
            showTile: true
        };
    }

    componentDidMount() {
        const { expanded } = this.props;

        if(expanded) {
            this.openOverlay();
        } else {
            this.closeOverlay();
        }
    }

    componentWillReceiveProps(nextProps) {
        const { expanded } = this.props;
        const { showModal } = this.state;

        if(expanded !== nextProps.expanded && nextProps.expanded !== showModal) {
            if(nextProps.expanded) {
                this.openOverlay();
            } else {
                this.closeOverlay();
            }
        }
    }

    getCustomProps() {
        return {
            openOverlay: this.openOverlay,
            closeOverlay: this.closeOverlay
        };
    }

    openOverlay = () => {
        window.clearTimeout(this.closeTimeout);

        if(window.debugLevel >= 1) {
            console.debug('inspect-element component: openOverlay', this.props, this.state);
        }

        const boundingClientRect = this._container.getBoundingClientRect();
        const bodyWidth = document.body.getBoundingClientRect().width;

        const tileMiddle = boundingClientRect.left + (boundingClientRect.width / 2);
        const bodyMiddle = bodyWidth / 2;

        this.setState({
            modalTop: `${boundingClientRect.top}px`,
            modalLeft: `${boundingClientRect.left}px`,
            modalRight: `${bodyWidth - boundingClientRect.right}px`,
            modalWidth: `${boundingClientRect.width}px`,
            modalDirection: tileMiddle < bodyMiddle ? Constants.DIRECTION_LEFT : Constants.DIRECTION_RIGHT,
            showModal: true,
            showTile: false
        });
    };

    closeOverlay = () => {
        const { onClose, onClosed } = this.props;

        if(window.debugLevel >= 1) {
            console.debug('inspect-element component: closeOverlay', this.props, this.state);
        }

        this.setState({
            showModal: false
        });

        if(onClose) {
            onClose();
        }

        this.closeTimeout = window.setTimeout(() => {
            this.setState({
                showTile: true
            });

            if(onClosed) {
                onClosed();
            }
        }, 650);
    };

    renderComponent = (props) => {
        const { component: Component, children } = this.props;

        if(!Component) return null;

        return (
            <Component
                {...this.props}
                {...this.getCustomProps()}
                {...props}
            >
                {children}
            </Component>
        );
    };

    renderTile() {
        const { showTile, modalWidth } = this.state;

        return (
            <span
                style={{
                    visibility: !showTile ? 'hidden' : 'visible',
                    width: modalWidth
                }}
                className="inspect-element-animation__tile"
                ref={(ref) => { this._container = ref; }}
            >
                {this.renderComponent()}
            </span>
        );
    }

    renderModal() {
        const { expandedWidth } = this.props;
        const {
            showModal,
            modalTop,
            modalLeft,
            modalRight,
            modalWidth,
            modalDirection,
        } = this.state;

        return (
            <ReactTransitionGroup>
                {showModal && (
                    <Modal
                        show={showModal}
                        top={modalTop}
                        left={modalLeft}
                        right={modalRight}
                        width={modalWidth}
                        direction={modalDirection}
                        expandedWidth={expandedWidth}
                        renderComponent={this.renderComponent}
                        closeOverlay={this.closeOverlay}
                    />
                )}
            </ReactTransitionGroup>
        );
    }

    render() {
        if(window.debugLevel >= 1) {
            console.debug('render inspect-element component', this.props, this.state);
        }

        return (
            <span className="inspect-element-animation">
                {this.renderTile()}
                {this.renderModal()}
            </span>
        );
    }
}
