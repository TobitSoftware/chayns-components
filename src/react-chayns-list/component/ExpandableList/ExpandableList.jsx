import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ExpandableContext from './ExpandableContext';
import List from '../List';

export default class ExpandableList extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
        ]).isRequired,
    };

    static Context = ExpandableContext;

    state = {
        open: [],
    };

    constructor(props) {
        super(props);

        this.providerState = {
            onOpen: this.onOpen.bind(this),
            onClose: this.onClose.bind(this),
            onToggle: this.onToggle.bind(this),
        };
    }

    onOpen(id) {
        this.changeOpen(id);
    }

    onClose(id) {
        const { open } = this.state;

        if (open.indexOf(id) === -1) {
            return;
        }

        this.changeOpen(null);
    }

    onToggle(id) {
        let openId = null;
        const { open } = this.state;

        if (open.indexOf(id) === -1) {
            openId = id;
        }

        this.changeOpen(openId);
    }

    changeOpen(id) {
        this.providerState = {
            ...this.providerState,
            open: [id],
        };

        this.setState({
            open: [id],
        });
    }

    render() {
        const { children } = this.props;

        return (
            <List className="list--expandable">
                <ExpandableContext.Provider value={this.providerState}>
                    {children}
                </ExpandableContext.Provider>
            </List>
        );
    }
}
