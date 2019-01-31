/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { getGroupImage, handleImageError } from '../../utils/image';
import { getTextstring } from '../../utils/textstring';

export default class Receiver extends Component {
    static propTypes = {
        updateReceiverSearchString: PropTypes.func.isRequired,
        updateChosenReceivers: PropTypes.func.isRequired,
        chosenReceivers: PropTypes.array.isRequired,
        index: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        includedUsers: PropTypes.array,
        showIdInPopup: PropTypes.bool,
        locationId: PropTypes.number,
        personId: PropTypes.string,
        groupId: PropTypes.number,
        userId: PropTypes.number,
        imgUrl: PropTypes.string,
        siteId: PropTypes.string
    };

    static defaultProps = {
        showIdInPopup: false,
        includedUsers: [],
        locationId: null,
        personId: null,
        groupId: null,
        userId: null,
        siteId: null,
        imgUrl: ''
    };

    shouldComponentUpdate(nextProps) {
        const {
            chosenReceivers,
            includedUsers,
            showIdInPopup,
            locationId,
            personId,
            groupId,
            userId,
            siteId,
            imgUrl,
            index,
            name
        } = this.props;

        return !isEqual(chosenReceivers, nextProps.chosenReceivers)
            || !isEqual(includedUsers, nextProps.includedUsers)
            || showIdInPopup !== nextProps.showIdInPopup
            || locationId !== nextProps.locationId
            || personId !== nextProps.personId
            || groupId !== nextProps.groupId
            || siteId !== nextProps.siteId
            || userId !== nextProps.userId
            || imgUrl !== nextProps.imgUrl
            || index !== nextProps.index
            || name !== nextProps.name;
    }

    chooseReceiver(name, locationId, userId, groupId, personId, siteId) {
        const {
            updateReceiverSearchString,
            updateChosenReceivers,
            chosenReceivers,
            includedUsers
        } = this.props;

        let newReceiver = {};
        let receivers = [];

        if (locationId) {
            newReceiver = { name, locationId, siteId };
            receivers = chosenReceivers.filter(r => r.locationId !== locationId);
        } else if (userId) {
            newReceiver = { name, userId, personId };
            receivers = chosenReceivers.filter(r => r.userId !== userId);
        } else {
            newReceiver = { name, groupId, includedUsers };
            receivers = chosenReceivers.filter(r => r.groupId !== groupId);
        }

        receivers.push(newReceiver);

        const locationReceivers = receivers.filter(r => r.locationId !== undefined && r.locationId !== null);

        if (locationReceivers.length > 1) {
            receivers = receivers.filter(r => (r.locationId === undefined || r.locationId === null) || r.locationId === locationReceivers[locationReceivers.length - 1].locationId);

            chayns.dialog.alert(null, getTextstring('txt_chayns_interCom2_newThread_toManyLocations'));
        }

        updateChosenReceivers(receivers);
        updateReceiverSearchString('');
    }

    render() {
        const {
            showIdInPopup,
            includedUsers,
            locationId,
            personId,
            groupId,
            userId,
            siteId,
            imgUrl,
            index,
            name
        } = this.props;

        // eslint-disable-next-line no-nested-ternary
        const memberId = showIdInPopup && siteId !== null ? siteId : (showIdInPopup && personId !== null ? personId : null);
        const memberName = memberId !== null ? `${name} (${memberId})` : name;

        const receiverWrapperStyles = {};
        const receiverStyles = {};

        const isDarkMode = chayns.env.site.colorMode === 1;

        const receiverWrapperClasses = classNames('receiver-wrapper popup-item', {
            'chayns__background-color--white-1': !isDarkMode && index % 2 > 0,
            'chayns__background-color--dark-1': isDarkMode && index % 2 > 0
        });

        const receiverClasses = classNames('receiver popup-item', {
            'chayns__background-color--white-2': !isDarkMode,
            'chayns__background-color--dark-2': isDarkMode
        });

        return (
            <div
                onClick={this.chooseReceiver.bind(this, name, locationId, userId, groupId, personId, siteId)}
                className={receiverWrapperClasses}
                style={receiverWrapperStyles}
            >
                <div className={receiverClasses} style={receiverStyles}>
                    <div className="pic popup-item">
                        {groupId !== null ? (
                            getGroupImage(groupId, includedUsers.map(id => ({ userId: id })))
                        ) : (
                            <img className="popup-item" src={imgUrl} alt="" onError={handleImageError}/>
                        )}
                    </div>
                    <div className="receiver-name popup-item notranslate">
                        {memberName}
                    </div>
                </div>
            </div>
        );
    }
}
