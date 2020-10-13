import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    getAvailableShareProviders,
    getDefaultShareLink,
} from './sharingHelper';
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
    children,
}) {
    const [sharingProvider, setSharingProvider] = useState([]);

    useEffect(() => {
        getAvailableShareProviders().then((provider) => {
            setSharingProvider(provider.filter((item) => item.available));
        });
    }, []);

    const mobileShare = sharingProvider.find(
        (app) => app.id === 10 || app.id === 11
    );

    let link = linkProp;
    if (!link) {
        link = getDefaultShareLink();
    }

    if (mobileShare) {
        const onClick = (e) => {
            share(mobileShare, link, linkText);

            if (stopPropagation) e.stopPropagation();
        };

        return <div onClick={onClick}>{children}</div>;
    }

    const sharingItems = [];

    sharingProvider
        .filter((item) => item.available)
        .forEach((x) => {
            sharingItems.push({
                className: null,
                onClick: (e) => {
                    if (stopPropagation && e && e.stopPropagation)
                        e.stopPropagation();
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
                {children}
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
    children: PropTypes.node,
};

SharingBar.defaultProps = {
    link: null,
    linkText: '',
    className: null,
    stopPropagation: false,
    style: null,
    children: [
        <Icon icon="fal fa-share-alt" className="sharing-bar__icon" />,
        <span className="sharing-bar__text">Teilen</span>,
    ],
};

SharingBar.displayName = 'SharingBar';

export default SharingBar;
