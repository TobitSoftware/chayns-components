import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SharingBarItem from './SharingBarItem';
import { getAvailableShareProviders, getDefaultShareLink } from './sharingHelper';

export default class SharingBar extends Component {
    static propTypes = {
        link: PropTypes.string,
        className: PropTypes.string
    };

    static defaultProps = {
        link: null,
        className: null
    };

    constructor() {
        super();
        this.state = {
            sharingProvider: []
        };
    }

    componentWillMount() {
        getAvailableShareProviders().then((provider) => {
            const { link } = this.props;

            const sharingItems = [];

            provider.map((item) => {
                if(item.available) {
                    sharingItems.push((
                        <SharingBarItem
                            icon={item.icon}
                            name={item.name}
                            provider={item}
                            key={item.id}
                            link={link || getDefaultShareLink()}
                        />
                    ));
                }
            });

            this.setState({
                sharingProvider: sharingItems // TODO: save data in state and not components
            });
        });
    }

    render() {
        const { className } = this.props;
        const { sharingProvider } = this.state;

        return (
            <div className={`sharing-bar__item-list ${className}`}>
                {sharingProvider}
            </div>
        );
    }
}
