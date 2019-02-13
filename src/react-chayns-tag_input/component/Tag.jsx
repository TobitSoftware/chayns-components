import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tag extends Component {
    static propTypes = {
        tag: PropTypes.object,
    };

    static defaultProps = {
        tag: null,
    };

    render() {
        const { tag } = this.props;

        if (!tag || !tag.text) {
            return null;
        }

        return (
            <div className="tag">
                {tag.text}
            </div>
        );
    }
}
