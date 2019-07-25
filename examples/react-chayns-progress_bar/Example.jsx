import React, { PureComponent } from 'react';

import ProgressBar from '../../src/react-chayns-progress_bar/component/ProgressBar';
import '../../src/react-chayns-progress_bar/component/index.scss';

export default class PositionInputExample extends PureComponent {
    state = {
        value: 0,
    };

    componentDidMount() {
        this.int = window.setInterval(() => {
            this.setState({
                value: this.state.value >= 100 ? 0 : (this.state.value + 10),
            });
        }, 500);
    }

    componentWillUnmount() {
        window.clearInterval(this.int);
    }

    render() {
        return (
            <div>
                <ProgressBar
                    value={this.state.value}
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
            </div>
        );
    }
}
