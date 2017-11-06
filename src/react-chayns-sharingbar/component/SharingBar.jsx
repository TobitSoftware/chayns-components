import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SharingBarItem from './SharingBarItem';
import { getAvailableShareProviders, getDefaultShareLink } from './sharingHelper';

export default class SharingBar extends React.Component {
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
            const sharingItems = [];

            provider.map((item) => {
                if(item.available) {
                    sharingItems.push((
                        <SharingBarItem
                            icon={item.icon}
                            name={item.name}
                            provider={item}
                            key={item.id}
                            link={this.props.link || getDefaultShareLink()}
                        />
                    ));
                }
            });

            this.setState({
                sharingProvider: sharingItems
            });
        });
    }

    render() {
        const className = this.props.className;

        const classNames = classnames({
            'sharing-bar__item-list': 'sharing-bar__item-list',
            [className]: className
        });

        return (
            <div className={classNames}>
                {this.state.sharingProvider}
            </div>
        );
    }
}
