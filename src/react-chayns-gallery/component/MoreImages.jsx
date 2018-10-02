import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class MoreImages extends PureComponent {
    static propTypes = {
        count: PropTypes.number.isRequired
    };

    render() {
        const { count } = this.props;
        return (
            <div className="more-images" data-more={`+${count}`}/>
        );
    }
}
