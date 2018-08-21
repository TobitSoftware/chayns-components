import React, { Component } from 'react';
import ExampleContainer from '../ExampleContainer';

import Tooltip from '../../src/react-chayns-tooltip/component/Tooltip';
import Input from '../../src/react-chayns-input/component/Input';

import '../../src/react-chayns-tooltip/index.scss';

export default class Example extends Component {
    constructor() {
        super();

        this.state = {
            renderTooltip: true,
        };
    }

    componentDidMount() {
        // this.interval = window.setInterval(() => {
        //     this.setState({
        //         renderTooltip: !this.state.renderTooltip,
        //     });
        // }, 5000);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    render() {
        const { renderTooltip } = this.state;

        return(
            <ExampleContainer headline="Tooltip">
                {renderTooltip && (
                    <Tooltip
                        ref={(ref) => { this.tooltip = ref; }}
                        text="HelloWorld"
                    >
                        <Input />
                    </Tooltip>
                )}
            </ExampleContainer>
        );
    }
}
