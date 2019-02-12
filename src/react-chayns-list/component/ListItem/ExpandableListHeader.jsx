import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

export default class ExpandableListHeader extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        image: PropTypes.string,
        onClick: PropTypes.func,
        hideIndicator: PropTypes.bool,
    };

    static defaultProps = {
        image: null,
        subtitle: null,
        onClick: null,
        hideIndicator: false,
    };

    render() {
        const {
            title,
            subtitle,
            image,
            onClick,
            hideIndicator,
        } = this.props;

        return (
            <div
                className={classnames('list-item__header', {
                    'list-item__header--clickable': onClick,
                })}
                onClick={onClick}
            >
                {!hideIndicator && (
                    <div className="list-item__indicator">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                )}
                {image && (
                    <div
                        className="list-item__image"
                        style={{
                            backgroundImage: `url(${image})`
                        }}
                    />
                )}
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
