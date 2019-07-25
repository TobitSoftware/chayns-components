import React, { PureComponent } from 'react';

import ProgressBar from '../../src/react-chayns-progress_bar/component/ProgressBar';
import '../../src/react-chayns-progress_bar/component/index.scss';
import AnimatedProgressBar from '../../src/react-chayns-progress_bar/component/AnimatedProgressBar';

export default class PositionInputExample extends PureComponent {
    state = {
        value: 0,
        value2: 0,
    };

    componentDidMount() {
        this.int = window.setInterval(() => {
            this.setState({
                value: ((this.state.value + 10) % 300),
            });
        }, 500);
    }

    componentWillUnmount() {
        window.clearInterval(this.int);
    }

    render() {
        const { value, value2 } = this.state;

        return (
            <div>
                <ProgressBar
                    value={value % 100}
                >
                    {'Uploading ...'}
                </ProgressBar>
                <ProgressBar
                    value={50}
                >
                    {'Uploading (static) ...'}
                </ProgressBar>
                <ProgressBar>
                    {'Converting ...'}
                </ProgressBar>
                <AnimatedProgressBar value={value < 100 ? value : null} ready={value > 200}>
                    {Math.floor(value / 100) === 0 && 'Uploading ...'}
                    {Math.floor(value / 100) === 1 && 'Converting ...'}
                    {Math.floor(value / 100) === 2 && 'Ready!'}
                </AnimatedProgressBar>
            </div>
        );
    }
}
