import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExampleList extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ]).isRequired,
    };

    render() {
        const { children } = this.props;

        return (
            <div className="examples">
                {children}
            </div>
        );
    }
}
