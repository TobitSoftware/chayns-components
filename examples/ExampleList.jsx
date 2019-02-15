import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExpandableList from '../src/react-chayns-list/component/ExpandableList/ExpandableList';
import List from '../src/react-chayns-list/component/List';

export default class ExampleList extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ]).isRequired,
    };

    state = {
        open: null,
    };

    constructor(props) {
        super(props);

        this.handleOpen = this.handleOpen.bind(this);
    }

    componentDidMount() {
        const { component } = chayns.env.parameters;

        if (component) {
            this.handleOpen(component);
        }
    }

    handleOpen(id) {
        this.setState({
            open: String(id),
        });
    }

    render() {
        const { children } = this.props;
        const { open } = this.state;

        return (
            <List className="examples">
                <ExpandableList.Context.Provider
                    value={{
                        open,
                        onOpen: this.handleOpen,
                    }}
                >
                    {children}
                </ExpandableList.Context.Provider>
            </List>
        );
    }
}
