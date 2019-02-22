import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getText from '../utils/getText';
import Button from '../../react-chayns-button/component/Button';

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
            <div
                className="load-more"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
            >
                <Button
                    onClick={this.handleOnClick}
                >
                    {getText('LOAD_MORE')}
                </Button>
            </div>
        );
    }
}
