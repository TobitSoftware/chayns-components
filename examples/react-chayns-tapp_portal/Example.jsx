import React, { Component } from 'react';
import Button from '../../src/react-chayns-button/component/Button';
import TappPortal from '../../src/react-chayns-tapp_portal/component/TappPortal';

export default class Example extends Component {
    state = {
        show: false,
        absolute: false,
    };

    handleToggleVisibility = () => {
        const { show } = this.state;

        this.setState({
            show: !show,
        });
    };

    handleTogglePositioning = () => {
        const { absolute } = this.state;

        this.setState({
            absolute: !absolute,
        });
    };

    renderElement(text) {
        const { absolute } = this.state;

        return (
            <div
                style={{
                    position: absolute ? 'absolute' : 'relative',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50px',
                    backgroundColor: '#666666',
                }}
            >
                {text}
            </div>
        );
    }

    render() {
        const { show } = this.state;

        return (
            <div
                style={{
                    position: 'relative',
                    height: '100px',
                }}
            >
                <Button
                    onClick={this.handleToggleVisibility}
                >
                    {'Toggle visibility'}
                </Button>
                <Button
                    onClick={this.handleTogglePositioning}
                >
                    {'Toggle positioning'}
                </Button>
                <TappPortal>
                    {show && this.renderElement('Inside portal')}
                </TappPortal>
                {show && this.renderElement('Outside portal')}
            </div>
        );
    }
}
