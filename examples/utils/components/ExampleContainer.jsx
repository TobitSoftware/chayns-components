import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';

import { Accordion, Icon } from '../../../src';
import connectExpandableContext from '../../../src/react-chayns-list/component/ExpandableList/connectExpandableContext';
import ListItem from '../../../src/react-chayns-list/component/ListItem';
import { connectSearchContext } from '../SearchContext';

let maxId = 1;

class ExampleContainer extends PureComponent {
    state = {
        hasError: false,
        error: null,
        info: null,
    };

    constructor(props) {
        super(props);

        const { id } = props;
        this.id = id || maxId++; /* eslint-disable-line no-plusplus */

        this.handleClick = this.handleClick.bind(this);
    }


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

    handleClick() {
        const { onOpen, id } = this.props;

        if (onOpen) {
            onOpen(id || this.id);
        }
    }

    render() {
        const {
            headline,
            children,
            open,
            onOpen,
            search,
            ...props
        } = this.props;
        const { hasError, error, info } = this.state;

        if (!open) {
            if (search && String(headline).toLowerCase().indexOf(String(search).toLowerCase()) === -1) {
                return null;
            }

            return (
                <ListItem
                    title={headline}
                    onClick={this.handleClick}
                />
            );
        }

        if (open && open !== String(this.id).toLowerCase()) {
            return null;
        }

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
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    headline: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    open: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    onOpen: PropTypes.func.isRequired,
    search: PropTypes.string,
};

ExampleContainer.defaultProps = {
    id: null,
    open: null,
    search: null,
};

export default connectSearchContext(connectExpandableContext(ExampleContainer));
