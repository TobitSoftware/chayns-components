import React, { Component } from 'react';
import PropTypes from 'prop-types';
import share from './sharingActions';
import Icon from '../../react-chayns-icon/component/Icon';

export default class SharingBarItem extends Component {
    static propTypes ={
        icon: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.object.isRequired]).isRequired,
        name: PropTypes.string.isRequired,
        provider: PropTypes.object.isRequired,
        link: PropTypes.string.isRequired
    };

    onClick = () => {
        const { provider, link } = this.props;

        share(provider, link);
    };

    render() {
        const { name, icon } = this.props;

        return (
            <button
                type="button"
                className="sharing-bar__item button"
                title={name}
                onClick={this.onClick}
            >
                <Icon icon={icon}/>
            </button>
        );
    }
}
