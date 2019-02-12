import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

export default class ExpandableListHeader extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        image: PropTypes.string,
    };

    static defaultProps = {
        image: null,
        subtitle: null,
    };

    render() {
        const {
            title,
            subtitle,
            image,
        } = this.props;

        return (
            <div className="list-item__header">
                <div className="list-item__indicator">
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <div
                    className="list-item__image"
                    style={{
                        backgroundImage: `url(${image})`
                    }}
                />
                <div className="list-item__titles">
                    <div className="list-item__title ellipsis">
                        {title}
                    </div>
                    <div className="list-item__subtitle ellipsis">
                        {subtitle}
                    </div>
                </div>
                <div className="list-item__spacer" />
                <div className="list-item__right">Test</div>
            </div>
        );
    }
}
