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
        if(this.props.expanded) {
            this.openOverlay();
        } else {
            this.closeOverlay();
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.expanded !== nextProps.expanded && nextProps.expanded !== this.state.showModal) {
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
        this.setState({
            showModal: false
        });

        if(this.props.onClose) {
            this.props.onClose();
        }

        this.closeTimeout = window.setTimeout(() => {
            this.setState({
                showTile: true
            });

            if(this.props.onClosed) {
                this.props.onClosed();
            }
        }, 650);
    };

    renderComponent = (props) => {
        const Component = this.props.component;

        if(!Component) return null;

        return (
            <Component
                {...this.props}
                {...this.getCustomProps()}
                {...props}
            >
                {this.props.children}
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
        const { showModal, modalTop, modalLeft, modalRight, modalWidth, modalDirection } = this.state;

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
                        expandedWidth={this.props.expandedWidth}
                        renderComponent={this.renderComponent}
                        closeOverlay={this.closeOverlay}
                    />
                )}
            </ReactTransitionGroup>
        );
    }

    render() {
        return (
            <span className="inspect-element-animation">
                {this.renderTile()}
                {this.renderModal()}
            </span>
        );
    }
}
