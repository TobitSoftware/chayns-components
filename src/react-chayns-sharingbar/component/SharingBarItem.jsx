/* eslint-disable no-return-assign,react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import share from './sharingActions';
import Icon from '../../react-chayns-icon/component/Icon';

export default class SharingBarItem extends Component {
    onClick = (e) => {
        const {
            link,
            linkText,
            provider,
            stopPropagation,
        } = this.props;

        share(provider, link, linkText);

        if (stopPropagation) e.stopPropagation();
    };

    render() {
        const {
            icon,
        } = this.props;

        return (
            <div onClick={this.onClick}>
                <Icon icon={icon} className="sharing-bar__icon"/>
                <span className="sharing-bar_text">Teilen</span>
            </div>
        );
    }
}

SharingBarItem.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.object.isRequired]).isRequired,
    provider: PropTypes.object.isRequired,
    link: PropTypes.string.isRequired,
    stopPropagation: PropTypes.bool.isRequired,
    linkText: PropTypes.string,
};

SharingBarItem.defaultProps = {
    linkText: '',
};
