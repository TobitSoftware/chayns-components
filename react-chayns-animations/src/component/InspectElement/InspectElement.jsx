import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import Modal from './Modal';
import * as Constants from './constants';

export default class InspectElement extends React.Component {

    static PropTypes = {
        component: React.PropTypes.func.isRequired
    };

    constructor() {
        super();

        this.state = {
            showModal: false,
            showTile: true
        };
    }

    openOverlay = () => {
        window.clearTimeout(this.closeTimeout);

        const boundingClientRect = this._container.getBoundingClientRect();
        const bodyWidth = document.body.getBoundingClientRect().width;

        const tileMiddle = boundingClientRect.left + (boundingClientRect.width/2);
        const bodyMiddle = bodyWidth/2;

        this.setState({
            modalTop: `${boundingClientRect.top}px`,
            modalLeft: `${boundingClientRect.left}px`,
            modalRight: `${bodyWidth-boundingClientRect.right}px`,
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

        this.closeTimeout = window.setTimeout(() => {
            this.setState({
                showTile: true
            });
        }, 650);
    };

    getCustomProps() {
        return {
            openOverlay: this.openOverlay,
            closeOverlay: this.closeOverlay
        }
    }

    render() {
        return (
            <span className="inspect-element-animation">
                {this.renderTile()}
                {this.renderModal()}
            </span>
        );
    }

    renderComponent = (props) => {
        const Component = this.props.component;

        if(!Component) return null;



        if(!( Component.prototype instanceof React.Component )) return null;

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
        return (
            <span
                style={{
                    visibility: !this.state.showTile ? 'hidden' : 'visible'
                }}
                className="inspect-element-animation__tile"
                ref={(ref) => this._container = ref} >

                {this.renderComponent()}
            </span>
        );
    }

    renderModal() {
        const {showModal, modalTop, modalLeft, modalRight, modalWidth, modalDirection} = this.state;

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
                        renderComponent={this.renderComponent}
                        closeOverlay={this.closeOverlay}
                    />
                )}
            </ReactTransitionGroup>
        )
    }


}