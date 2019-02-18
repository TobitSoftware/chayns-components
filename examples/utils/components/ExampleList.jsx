import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';

import SearchContext from '../SearchContext';
import ExpandableList from '../../../src/react-chayns-list/component/ExpandableList/ExpandableList';
import List from '../../../src/react-chayns-list/component/List';
import { Input } from '../../../src';

export default class ExampleList extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ]).isRequired,
    };

    state = {
        open: null,
        searchValue: '',
    };

    constructor(props) {
        super(props);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        const { component } = chayns.env.parameters;

        if (component) {
            this.handleOpen(component);
        }
    }

    handleOpen(id) {
        chayns.appendUrlParameter({
            component: String(id),
        });

        chayns.showBackButton(() => {
            this.setState({
                open: null,
            });
        });

        this.setState({
            open: String(id).toLowerCase(),
            searchValue: '',
        });
    }

    handleSearchChange(value) {
        this.setState({
            searchValue: value,
        });
    }

    render() {
        const { children } = this.props;
        const { open, searchValue } = this.state;

        return (
            <List className="examples">
                {!open && (<h1>ChaynsComponents</h1>)}
                {!open && (
                    <Input
                        icon={faSearch}
                        value={searchValue}
                        onChange={this.handleSearchChange}
                        placeholder="Search component"
                        customProps={{
                            autoFocus: true,
                        }}
                        dynamic
                    />
                )}
                <SearchContext.Provider
                    value={{
                        search: searchValue,
                    }}
                >
                    <ExpandableList.Context.Provider
                        value={{
                            open,
                            onOpen: this.handleOpen,
                        }}
                    >
                        {children}
                    </ExpandableList.Context.Provider>
                </SearchContext.Provider>
            </List>
        );
    }
}
