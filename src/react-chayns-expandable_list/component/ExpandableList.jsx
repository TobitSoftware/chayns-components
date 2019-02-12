import React, { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';

import ExpandableContext from './ExpandableContext';

export default class ExpandableList extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
        ]).isRequired,
    };

    state = {
        open: null,
    };

    constructor() {
        super();

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

        if (id !== open) {
            return;
        }

        this.changeOpen(null);
    }

    onToggle(id) {
        let openId = null;
        const { open } = this.state;

        if (id !== open) {
            openId = id;
        }

        this.changeOpen(openId);
    }

    changeOpen(id) {
        this.providerState = assign({}, this.providerState, {
            open: id,
        });

        this.setState({
            open: id,
        });
    }

    render() {
        const { children } = this.props;

        return (
            <div className="expandable-list">
                <ExpandableContext.Provider value={this.providerState}>
                    {children}
                </ExpandableContext.Provider>
            </div>
        );
    }
}
