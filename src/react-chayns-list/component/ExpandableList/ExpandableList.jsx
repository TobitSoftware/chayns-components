import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ExpandableContext from './ExpandableContext';
import AbstractList from '../AbstractList';

export default class ExpandableList extends Component {
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
        const { children, className } = this.props;

        return (
            <AbstractList className={classnames('list--expandable', className)}>
                <ExpandableContext.Provider value={this.providerState}>
                    {children}
                </ExpandableContext.Provider>
            </AbstractList>
        );
    }
}

ExpandableList.Context = ExpandableContext;

ExpandableList.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    className: PropTypes.string,
};

ExpandableList.defaultProps = {
    className: null,
};
