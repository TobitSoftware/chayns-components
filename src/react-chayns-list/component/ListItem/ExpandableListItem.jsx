import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AbstractExpandableListItem from '../ExpandableList/AbstractExpandableListItem';
import ExpandableListHeader from './ExpandableListHeader';
import ExpandableList from '../ExpandableList/ExpandableList';

export default class ExpandableListItem extends Component {
    static propTypes = {};

    render() {
        const { children, ...props } = this.props;

        return (
            <AbstractExpandableListItem
                header={
                    <ExpandableList.Context.Consumer>
                        {c => <ExpandableListHeader onClick={c.onToggle} {...props} />}
                    </ExpandableList.Context.Consumer>
                }
                clickable
            >
                {children}
            </AbstractExpandableListItem>
        );
    }
}
