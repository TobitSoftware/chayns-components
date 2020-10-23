/**
 * @component
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ContextMenu from '../../react-chayns-contextmenu/component/ContextMenu';
import Icon from '../../react-chayns-icon/component/Icon';
import share from './sharingActions';
import './sharingBar.scss';
import SharingBarItem from './SharingBarItem';
import {
    getAvailableShareProviders,
    getDefaultShareLink,
} from './sharingHelper';

/**
 * A context menu for sharing a link and some text on various platforms.
 */
function SharingBar({
    link: linkProp,
    linkText,
    className,
    stopPropagation,
    style,
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
                <Icon icon="fal fa-share-alt" className="sharing-bar__icon" />
                <span className="sharing-bar__text">Teilen</span>
            </ContextMenu>
        </div>
    );
}

SharingBar.propTypes = {
    /**
     * The link that should be shared.
     */
    link: PropTypes.string,

    /**
     * A text that will be added in front of the shared link.
     */
    linkText: PropTypes.string,

    /**
     * A classname string that will be applied to the container element.
     */
    className: PropTypes.string,

    /**
     * Wether click events should be prevented from propagating to parent
     * elements.
     */
    stopPropagation: PropTypes.bool,

    /**
     * A React style object that will be applied to the container element.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
};

SharingBar.defaultProps = {
    link: null,
    linkText: '',
    className: null,
    stopPropagation: false,
    style: null,
};

SharingBar.displayName = 'SharingBar';

export default SharingBar;
