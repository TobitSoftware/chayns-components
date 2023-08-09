/**
 * @component
 */

import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ContextMenu from '../../react-chayns-contextmenu/component/ContextMenu';
import Icon from '../../react-chayns-icon/component/Icon';
import share from './sharingActions';
import './sharingBar.scss';
import {
    getAvailableShareProviders,
    getDefaultShareLink,
} from './sharingHelper';
import TextString from '../../react-chayns-textstring/component/TextString';

/**
 * A context menu for sharing a link and some text on various platforms.
 */
const SharingBar = ({
    link: linkProp,
    linkText,
    className,
    stopPropagation,
    style,
    children,
}) => {
    const [sharingProvider, setSharingProvider] = useState([]);
    const [textStringsLoaded, setTextStringsLoaded] = useState(false);

    useEffect(() => {
        getAvailableShareProviders().then((provider) => {
            setSharingProvider(provider.filter((item) => item.available));
        });
        if (!children) {
            TextString.loadLibrary('ChaynsComponents').then(() => {
                setTextStringsLoaded(true);
            });
        }
    }, [children]);
    const mobileShare = sharingProvider.find(
        (app) => app.id === 10 || app.id === 11
    );

    let link = linkProp;
    if (!link) {
        link = getDefaultShareLink();
    }

    if (!children && !textStringsLoaded) {
        return null;
    }

    const indicator = children || [
        <Icon
            key="icon"
            icon="fal fa-share-alt"
            className="sharing-bar__icon"
        />,
        <TextString
            key="textstring"
            stringName="txt_chayns_components_sharingbar_share"
        >
            <span className="sharing-bar__text" />
        </TextString>,
    ];

    if (mobileShare) {
        const onClick = (e) => {
            share(mobileShare, link, linkText);

            if (stopPropagation) e.stopPropagation();
        };

        return (
            <div
                className={classNames('sharing-bar', className)}
                style={style}
                onClick={onClick}
            >
                {indicator}
            </div>
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
                stringName: x.name,
                icon: x.icon,
            });
        });
    return (
        <div className={classNames('sharing-bar', className)} style={style}>
            <ContextMenu
                items={sharingItems}
                childrenStyle={{ display: 'inline' }}
                disableDialog={chayns.env.isDialog}
            >
                {indicator}
            </ContextMenu>
        </div>
    );
};

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

    /**
     * The children nodes of the `SharingBar`.
     */
    children: PropTypes.node,
};

SharingBar.defaultProps = {
    link: null,
    linkText: '',
    className: null,
    stopPropagation: false,
    style: null,
    children: null,
};

SharingBar.displayName = 'SharingBar';

export default SharingBar;
