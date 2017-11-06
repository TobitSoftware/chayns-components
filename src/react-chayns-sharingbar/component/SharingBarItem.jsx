import React from 'react';
import PropTypes from 'prop-types';
import { insertStyle } from '../../utils/insertStyle';
import share from './sharingActions';

export default class SharingBarItem extends React.Component {
    static propTypes ={
        icon: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        provider: PropTypes.object.isRequired,
        link: PropTypes.string.isRequired
    };

    componentDidMount() {
        let css = `
            .sharing-bar__item:active {
                background-color: ${chayns.getSchemeColor(100)}!important;
            }
        `;

        if (chayns.env.isDesktop) {
            css += `.sharing-bar__iten:hover {
                background-color: ${chayns.getSchemeColor(100)}!important;
            }`;
        }

        insertStyle('chayns-components-react-chayns-sharingbar', css);
    }

    onClick = () => {
        share(this.props.provider, this.props.link);
    };

    render() {
        return (
            <button className="sharing-bar__iten" title={this.props.name} style={{ backgroundColor: chayns.getSchemeColor(70) }} onClick={this.onClick}>
                <i className={this.props.icon}/>
            </button>
        );
    }
}

