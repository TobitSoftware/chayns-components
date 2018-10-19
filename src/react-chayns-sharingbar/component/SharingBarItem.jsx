import React, { Component } from 'react';
import PropTypes from 'prop-types';
import share from './sharingActions';
import Icon from '../../react-chayns-icon/component/Icon';
import Button from '../../react-chayns-button/component/Button';
import Tooltip from '../../react-chayns-tooltip/component/Tooltip';

export default class SharingBarItem extends Component {
    static propTypes = {
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
        const { name, icon, provider } = this.props;
        if (provider.action === 0) {
            return (
                <Tooltip content={{ text: 'Kopiert.' }} ref={ref => this.tooltip = ref} removeIcon>
                    <Button
                        className="sharing-bar__item"
                        title={name}
                        onClick={() => {
                            this.onClick();
                            this.tooltip.show();
                            clearTimeout(this.timeout)
                            this.timeout=setTimeout(()=>{
                                this.tooltip.hide();
                            }, 3000);
                        }}
                    >
                        <Icon icon={icon}/>
                    </Button>
                </Tooltip>
            );
        }
        return (
            <Button
                className="sharing-bar__item"
                title={name}
                onClick={this.onClick}
            >
                <Icon icon={icon}/>
            </Button>
        );
    }
}
