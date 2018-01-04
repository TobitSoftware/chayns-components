import React from 'react';
import PropTypes from 'prop-types';


export default class SetupItem extends React.Component {
    static propTypes = {
        title: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
        children: PropTypes.element
    };

    static defaultProps = {
        title: null,
        children: null,
    };

    render() {
        return(
            this.props.children
        );
    }
}
