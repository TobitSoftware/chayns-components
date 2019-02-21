import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import Icon from '../../react-chayns-icon/component/Icon';
import getText from '../utils/getText';

export default class LoadMore extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        type: PropTypes.string.isRequired,
    };

    handleOnClick = () => {
        const { onClick, type } = this.props;

        if (onClick) {
            onClick(type);
        }
    };

    render() {
        return (
            <div onClick={this.handleOnClick} >
                <Icon icon={faPlus} />
                <div className="load-more__text">
                    {getText('LOAD_MORE')}
                </div>
            </div>
        );
    }
}
