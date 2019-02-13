import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';

import { Accordion, Icon } from '../src';

class ExampleContainer extends PureComponent {
    state = {
        hasError: false,
        error: null,
        info: null,
    };

    static getMultilineText(text) {
        const componentArray = [];

        (text || '').split('\n').map((i) => {
            componentArray.push(i);
            componentArray.push(<br />);
        });

        return componentArray;
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            error,
            info,
        });
    }

    render() {
        const { headline, children, ...props } = this.props;
        const { hasError, error, info } = this.state;

        if (hasError) {
            return (
                <div
                    className="content__card dark"
                    style={{ margin: '20px 0', backgroundColor: 'red' }}
                >
                    <h1>{headline}</h1>
                    <div style={{ textAlign: 'center', fontSize: '80px', }}>
                        <Icon icon={faExclamationTriangle} />
                    </div>
                    <div>
                        <b>{error && error.message}</b>
                        <Accordion head="Stack">
                            {error && ExampleContainer.getMultilineText(error.stack)}
                        </Accordion>
                        <Accordion head="ComponentStack">
                            {info && ExampleContainer.getMultilineText(info.componentStack)}
                        </Accordion>
                    </div>
                </div>
            );
        }

        return (
            <div
                className="content__card dark"
                {...props}
                style={{ margin: '20px 0' }}
            >
                <h1>{headline}</h1>
                {children}
            </div>
        );
    }
}

ExampleContainer.propTypes = {
    headline: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default ExampleContainer;
