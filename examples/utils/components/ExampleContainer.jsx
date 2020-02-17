import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons/faBookOpen';

import { Accordion, ContextMenu, Icon } from '../../../src';
import connectExpandableContext from '../../../src/react-chayns-list/component/ExpandableList/connectExpandableContext';
import ListItem from '../../../src/react-chayns-list/component/ListItem';
import { connectSearchContext } from '../SearchContext';

let maxId = 1;

const BASE_GITHUB_URL = 'https://github.com/TobitSoftware/chayns-components/tree/master';

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

        this.items = [{
            className: null,
            onClick: this.handleExampleClick.bind(this),
            text: 'Sourcecode (GitHub)',
            icon: faCode,
        }];

        if (props.readme) {
            this.items.push({
                className: null,
                onClick: this.handleReadmeClick.bind(this),
                text: 'Readme (GitHub)',
                icon: faBookOpen,
            });
        }

        this.handleClick = this.handleClick.bind(this);
    }


    static getMultilineText(text) {
        const componentArray = [];

        (text || '').split('\n').forEach((i) => {
            componentArray.push(i);
            componentArray.push(<br/>);
        });

        return componentArray;
    }

    handleClick() {
        const { onOpen, id } = this.props;

        if (onOpen) {
            onOpen(id || this.id);
        }
    }

    handleExampleClick() {
        const { examplePath } = this.props;
        const url = `${BASE_GITHUB_URL}/examples/${examplePath}`;
        chayns.openUrlInBrowser(url);
    }

    handleReadmeClick() {
        const { readme, id } = this.props;

        if (!readme) {
            return;
        }

        const url = `${BASE_GITHUB_URL}/src/${id}/README.md`;
        chayns.openUrlInBrowser(url);
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
            error,
            info,
        });
    }

    render() {
        const {
            headline,
            children,
            open,
            search,
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
                    right={(
                        <ContextMenu
                            childrenStyle={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                height: '100%',
                            }}
                            items={this.items}
                            position={1}
                            stopPropagation
                        />
                    )}
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
                    <div style={{ textAlign: 'center', fontSize: '80px' }}>
                        <Icon icon={faExclamationTriangle}/>
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

        return [
            <div
                style={{
                    display: 'flex',
                }}
                key="exampleHeader"
            >
                <h1
                    style={{
                        flexGrow: 1,
                    }}
                >
                    {headline}
                </h1>
                <ContextMenu
                    items={this.items}
                    position={1}
                />
            </div>,
            children,
        ];
    }
}

ExampleContainer.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    headline: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    open: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    onOpen: PropTypes.func.isRequired,
    search: PropTypes.string,
    examplePath: PropTypes.string,
    readme: PropTypes.bool,
};

ExampleContainer.defaultProps = {
    id: null,
    open: null,
    search: null,
    examplePath: null,
    readme: false,
};

export default connectSearchContext(connectExpandableContext(ExampleContainer));
