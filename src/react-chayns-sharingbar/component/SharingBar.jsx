import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt';
import SharingBarItem from './SharingBarItem';
import { getAvailableShareProviders, getDefaultShareLink } from './sharingHelper';
import Icon from '../../react-chayns-icon/component/Icon';
import ContextMenu from '../../react-chayns-contextmenu/component/ContextMenu';
import share from './sharingActions';

import './sharingBar.scss';

function SharingBar({
    link: linkProp,
    linkText,
    className,
    stopPropagation,
    style,
}) {
    const [sharingProvider, setSharingProvider] = useState([]);

    useEffect(() => {
        getAvailableShareProviders()
            .then((provider) => {
                setSharingProvider(provider.filter((item) => item.available));
            });
    }, []);

    const mobileShare = sharingProvider.find((app) => app.id === 10 || app.id === 11);

    let link = linkProp;
    if (!link) {
        link = getDefaultShareLink();
    }

    if (mobileShare) {
        return (
            <SharingBarItem
                icon={mobileShare.icon}
                name={mobileShare.name}
                provider={mobileShare}
                key={mobileShare.id}
                link={link}
                linkText={linkText}
                stopPropagation={stopPropagation}
            />
        );
    }

    const sharingItems = [];

    sharingProvider.filter((item) => item.available)
        .forEach((x) => {
            sharingItems.push({
                className: null,
                onClick: (e) => {
                    if (stopPropagation) e.stopPropagation();
                    share(x, link, linkText);
                },
                text: x.name,
                icon: x.icon,
            });
        });

    return (
        <div className={classNames('sharing-bar', className)} style={style}>
            <ContextMenu
                items={sharingItems}
                childrenStyle={{ display: 'inline' }}
            >
                <Icon icon={faShareAlt} className="sharing-bar__icon"/>
                <span className="sharing-bar__text">Teilen</span>
            </ContextMenu>
        </div>
    );
}

SharingBar.propTypes = {
    link: PropTypes.string,
    linkText: PropTypes.string,
    className: PropTypes.string,
    stopPropagation: PropTypes.bool,
    style: PropTypes.string,
};

SharingBar.defaultProps = {
    link: null,
    linkText: '',
    className: null,
    stopPropagation: false,
    style: null,
};

export default SharingBar;
