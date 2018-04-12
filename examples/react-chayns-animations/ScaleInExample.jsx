import React, { Component } from 'react';
import ScaleInExampleChild from './ScaleInExampleChild';
import connectToOverlay from '../../src/react-chayns-animations/decorator/connectToOverlay';

class ScaleInExample extends Component {
    static propTypes = {};

    constructor() {
        super();

        this.state = {
            show: false,
        };

        this.onCloseOverlay = this.onCloseOverlay.bind(this);
        this.onShowOverlay = this.onShowOverlay.bind(this);
    }

    onCloseOverlay() {
        this.setState({
            show: false,
        });

        this.props.hideOverlay({
            color: 'rgba(0, 0, 0, 0.8)',
            transitionTime: 550,
        });
    }

    onShowOverlay() {
        this.setState({
            show: true,
        });

        this.props.showOverlay({
            color: 'rgba(0, 0, 0, 0.8)',
            transitionTime: 550,
            zIndex: 5,
            onClose: () => { this.onCloseOverlay(); },
        });
    }

    render() {
        return (
            <ScaleInExampleChild
                in={this.state.show}
                hideOverlay={this.onCloseOverlay}
                showOverlay={this.onShowOverlay}
            />
        );
    }
}

export default connectToOverlay()(ScaleInExample);
