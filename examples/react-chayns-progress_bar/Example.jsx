import React, { PureComponent } from 'react';

import ProgressBar from '../../src/react-chayns-progress_bar/component/ProgressBar';

export default class PositionInputExample extends PureComponent {
    state = {
        value: 0,
    };

    componentDidMount() {
        this.interval = window.setInterval(() => {
            const { value } = this.state;

            this.setState({
                value: (value + 10) % 300,
            });
        }, 500);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    render() {
        const { value } = this.state;

        return (
            <div>
                <ProgressBar value={value % 100}>Uploading ...</ProgressBar>
                <ProgressBar value={50}>Uploading (static) ...</ProgressBar>
                <ProgressBar>Converting ...</ProgressBar>
                <ProgressBar
                    value={value < 100 ? value : null}
                    ready={value > 200}
                >
                    {Math.floor(value / 100) === 0 && 'Uploading ...'}
                    {Math.floor(value / 100) === 1 && 'Converting ...'}
                    {Math.floor(value / 100) === 2 && 'Ready!'}
                </ProgressBar>
            </div>
        );
    }
}
